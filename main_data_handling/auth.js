authorization_button() // has to run on startup and then auth button is pressed
function authorization_button() {
	;( () => { // check if necessary users data is present // if not get user data
		let auth_token = local_get('clarity_authorization')
		let user = local_get('clarity_user')
		if (auth_token && user) return renew_access_tokens(auth_token)
		get_access_tokens()
	}) ()
	function renew_access_tokens(auth_token) {
		let expires_in = auth_token.access_expiration_date * 1000 - Date.now()
		handle_auth()
		document.addEventListener('visibilitychange', () => { 
			if (document.visibilityState == 'visible' && expires_in < 60 * 1000) handle_auth()
		})
		function handle_auth() {
			authorization('refresh_token&refresh_token', auth_token.refresh_token)
			.then(resp => {
				let x = resp
				x.access_expiration_date = x.expires_in + Math.floor(Date.now() / 1000)
				x.refresh_expiration_date = x.refresh_expires_in + Math.floor(Date.now() / 1000)
				localStorage.setItem('clarity_authorization', JSON.stringify(x))
				localStorage.removeItem('clarity_temp') // remove old auth code because its single use
			})
			.catch(err => console.error('%c Authorization refresh failed', 'font-size: large;', err))
		}
	}
	function get_access_tokens() {
		const href = window.location.href
		if (local_get('clarity_temp')) {
			if (href.includes('?code=')) { // if in code window get code and redirect back
				localStorage.setItem('clarity_temp', href.split('?code=')[1])
				if (href.includes('beta')) { // just looking where to redirect 
					window.location.href = 'https://beta.destinyitemmanager.com/'
				} else {
					window.location.href = 'https://app.destinyitemmanager.com/'
				}
			}
			// after rededication key was set in local storage and can be used
			let auth_code = localStorage.getItem('clarity_temp')
			authorization('authorization_code&code', auth_code)
			.then(resp => {
				let x = resp
				x.access_expiration_date = x.expires_in + Math.floor(Date.now() / 1000)
				x.refresh_expiration_date = x.refresh_expires_in + Math.floor(Date.now() / 1000)
				localStorage.setItem('clarity_authorization', JSON.stringify(x))
				localStorage.removeItem('clarity_temp') // remove old auth code because its single use
			})
			.then(() => {
				get_clarity_user_info()
				.then(data => {
					let user_info = {'platform': data.Response.destinyMemberships[0].LastSeenDisplayNameType, 'id': data.Response.destinyMemberships[0].membershipId}
					localStorage.setItem('clarity_user', JSON.stringify(user_info))
				})
				.then(() => work_on_item_info()) // runs code in handle_data.json
				.catch(err => console.error('%c Failed to get user info', 'font-size: large;', err))
			})
			.catch(err => console.error('%c Authorization failed', 'font-size: large;', err))
		}
	}
	function authorization(type, code){
		return new Promise((resolve, reject) => {
			fetch('https://www.bungie.net/Platform/App/OAuth/Token/', {
				method: 'POST',
				mode: 'cors', // if you digging hare looking for API key or something DM me and i will help you get one and explain how to use it
				headers: JSON.parse(atob('eyJYLUFQSS1LZXkiOiIyYWRiZWVkNzI2ZGI0MmYwODUyNDdiZjA4ZjkyNmIwMSIsImF1dGhvcml6YXRpb24iOiJCYXNpYyBNemN3T0RjNlJtMVRXblZZVkV4eE1FUndTVE5pY1hGeFVIbDBaa1o0ZFVjM01qUTNSVXBET1VkRU5HVkVNR28wV1E9PSIsIkNvbnRlbnQtVHlwZSI6ImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCJ9')),
				body: `grant_type=${type}=${code}`
			})
			.then(resp => {
				if (resp.ok) return resp.json()
				reject(resp)
			})
			.then(x => resolve(x))
			.catch(err => reject(err))
		})
	}
	function get_clarity_user_info() {
		return new Promise((resolve, reject) => {
			fetch('https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/', {
				method: 'GET',
				mode: 'cors', // if you digging hare looking for API key or something DM me and i will help you get one and explain how to use it
				headers: {'X-API-Key': atob('MmFkYmVlZDcyNmRiNDJmMDg1MjQ3YmYwOGY5MjZiMDE='), 'Authorization': `Bearer ${local_get('clarity_authorization').access_token}`}
			})
			.then(resp => {
				if (resp.ok) return resp.json()
				reject(resp)
			})
			.then(x => resolve(x))
			.catch(err => reject(err))
		})
	}
}
function ask_for_authorization() {
	let auth_token = local_get('clarity_authorization')
	let user = local_get('clarity_user')
	if (!auth_token && !user) {
		let auth_box = element_creator('div', {'className': 'Clarity_authorization_box'})
		let auth_text = element_creator('div', {'className': 'Clarity_authorization_text', 'textContent': 'Clarity, A DIM Companion \nNeeds your permission to view your Destiny characters and vault'})
		let auth_button = element_creator('div', {'className': 'Clarity_authorization_button', 'id': 'clarity_auth', 'textContent': 'Authorize with Bungie.net'})
		let bottom_text = element_creator('div', {'className': 'Clarity_authorization_text', 'textContent': `Clarity, A DIM Companion doesn't collet any users data and is unable to send data anywhere except bungie.net \nUnless you are in destiny massive breakdown discord then you are doomed`})
		let x_button = element_creator('img', {'className': 'Clarity_authorization_exit_button'}, {'img': 'images/close.png'})
		x_button.addEventListener('click', () => document.querySelector('.Clarity_authorization_box').remove())
		auth_button.addEventListener('click', () => {
			localStorage.setItem('clarity_temp', 'true')
			window.location.href = 'https://www.bungie.net/en/OAuth/Authorize?client_id=37087&response_type=code'
		})
		auth_box.append(auth_text, auth_button, bottom_text, x_button)
		document.querySelector('.Header-m_header-QeSPR').append(auth_box)
	}
}