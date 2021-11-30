;( () => { // check if necessary users data is present // if not get user data
	const auth      = local_storage('clarity_authorization')
	const user      = local_storage('clarity_user')
	let ask_to_auth = local_storage('clarity_temp')

	const href = window.location.href
	const nr = (href.includes('beta.destiny')) ? {'i':'37074'} : {'i':'37290'}

	if ((!auth || !user) && !ask_to_auth) {ask_for_authorization(); return}

	if(href.includes('?code=')) {get_access_tokens(); return}

	refresh_token() // refresh on startup
	window.addEventListener('page_visible', () => {
		let expires_in = auth.access_expiration_date * 1000 - Date.now()
		if (expires_in < 60 * 1000) refresh_token()
	})

	function ask_for_authorization() {
		let auth_box    = element_creator('div', {'className': 'Clarity_authorization_box'})
		let auth_text   = element_creator('div', {'className': 'Clarity_authorization_text'  ,                       'textContent': 'Clarity, A DIM Companion \nNeeds your permission to view your Destiny characters and vault'})
		let auth_button = element_creator('div', {'className': 'Clarity_authorization_button', 'id': 'clarity_auth', 'textContent': 'Authorize with Bungie.net'})
		let bottom_text = element_creator('div', {'className': 'Clarity_authorization_text'  ,                       'textContent': `Clarity, A DIM Companion does not collect any users data and is unable to send data anywhere except bungie.net`})
		let x_button    = element_creator('img', {'className': 'Clarity_authorization_exit_button'}, {'img': 'images/close.png'})

		x_button   .addEventListener('click', () => document.querySelector('.Clarity_authorization_box').remove())
		auth_button.addEventListener('click', () => {
			local_storage('clarity_temp', true)
			window.location.href = `https://www.bungie.net/en/OAuth/Authorize?client_id=${nr.i}&response_type=code`
		})
		auth_box.append(auth_text, auth_button, bottom_text, x_button)
		document.querySelector('body').append(auth_box)
	}

	function get_access_tokens() {
		localStorage.removeItem('clarity_temp')
		let code = href.match(/(?<=\?code=).*/)[0] // looks for code= and grabs everything after it
		fetch_bungie('authorization', code)
		.then(resp => {
			let x = resp
			x.access_expiration_date = x.expires_in + Math.floor(Date.now() / 1000)
			x.refresh_expiration_date = x.refresh_expires_in + Math.floor(Date.now() / 1000)
			local_storage('clarity_authorization', x)
		})
		.then(() => {
			fetch_bungie('current_user')
			.then(data => {
				let user_info = {
					'platform': data.Response.profiles[0].membershipType,
					'id': data.Response.profiles[0].membershipId
				}
				local_storage('clarity_user', user_info)
			})
			.then(() => {
				window.location.href = href.match(/.*\.com\//)[0] // get everything before .com including .com and redirect to that link
			})
		})
	}

	function refresh_token() {
		fetch_bungie('token_refresh')
		.then(resp => {
			let x = resp
			x.access_expiration_date = x.expires_in + Math.floor(Date.now() / 1000)
			x.refresh_expiration_date = x.refresh_expires_in + Math.floor(Date.now() / 1000)
			local_storage('clarity_authorization', x)
			window.dispatchEvent(new Event('auth_complete'))
		})
	}
}) ()

async function fetch_bungie(auth_type, code) {
	const auth = local_storage('clarity_authorization')
	const user = local_storage('clarity_user')
	const href = window.location.href
	const nr = (href.includes('beta.destiny')) ?
		{'k':'Y2RhN2I2ZTRmYzlmNDlhZGE0ZmVkNjE4ZTExODQxYWI=','i':'37074','s':'MzcwNzQ6eHhYUU1zMjl1OTBBcnpCVi50U2J1MU1Bei01Z1ZoeXdPSmNET3NNWjdjaw=='} :
		{'k':'N2I4ZWExNGM0MjZjNGE1MDg1M2MyM2JjZTJkZDU1ZGE=','i':'37290','s':'MzcyOTA6LTA4RnV3RWJ1Wk1TSU03bElvSWNoeVl2bHJkSXpWVlFQMUdUbWk4OVBIcw=='}
	let info = {
		authorization: {
			'link':'App/OAuth/Token/',
			'method': 'POST',
			'authorization': `Basic ${nr.s}`,
			'content_type': 'application/x-www-form-urlencoded',
			'body': `grant_type=authorization_code&code=${code}`
		},
		token_refresh: {
			'link':'App/OAuth/Token/',
			'method': 'POST',
			'authorization': `Basic ${nr.s}`,
			'content_type': 'application/x-www-form-urlencoded',
			'body': `grant_type=refresh_token&refresh_token=${auth?.refresh_token}`
		},
		current_user: {
			'link': `Destiny2/254/Profile/${auth?.membership_id}/LinkedProfiles/?getAllMemberships=true`,
			'method': 'GET',
			// 'authorization': `Bearer ${auth?.access_token}`
		},
		user_info: {
			'link': `Destiny2/${user?.platform}/Profile/${user?.id}/?components=100,102,103,200,201,202,205,300,301,305,306,307,800,308,310,309,900,1100,1200`,//102,201,205,304,305,310`,
			'method': 'GET',
			'authorization': `Bearer ${auth?.access_token}`
		}
	}
	return new Promise((resolve, reject) => {
		fetch(`https://www.bungie.net/Platform/${info[auth_type].link}`, {
			method: info[auth_type].method,
			mode: 'cors',
			headers: {
				'X-API-Key': atob(nr.k),
				'authorization': info[auth_type].authorization,
				'Content-Type': info[auth_type].content_type
			},
			body: info[auth_type].body
		})
		.then(resp => {
			if (resp.ok) return resp.json()
			handle_errors(resp, auth_type)
		})
		.then(resp => resolve(resp))
	})
	function handle_errors(err, auth_type) {                                                                            // todo better error handling
		switch (err.status) {
			case 500: // internal bungie error // simulate auth pressing to try again
				local_storage('clarity_temp', true)
				window.location.href = `https://www.bungie.net/en/OAuth/Authorize?client_id=${nr.i}&response_type=code`
				break
		}
		console.error(`%c Something then wrong with auth => ${auth_type}`, 'font-size: large;')
		console.log(err.status)
		console.log(err)
		console.error(`%c End of error logs for => ${auth_type}`, 'font-size: large;')
	}
}