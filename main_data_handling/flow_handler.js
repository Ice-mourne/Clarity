( () => { //--- some things can't work without DIM div names
    let version = window.location.href.match(/beta(?=.destiny)|app(?=.destiny)/)[0] // match beta or app before .destiny
    fetch(`https://ice-mourne.github.io/Database-for-Clarity/Database/locations.json?${Math.random()}`)
    .then(resp => resp.json())
    .then(data => local_storage('clarity_locations', data[version]))
    .then(() => window.dispatchEvent(new Event('clarity_locations'))) // basically tells locations are ready
    .then(() => start())
}) ()
//--- events
// everything hare runs after div names are fetched
// stuff in hare is used to control order on startup mostly
//? update_item_info
// used for parsing data from bungie
// called after auth is complete and refresh button pressed, r button pressed or window gets in focus
//? inventory_ready
// called then items like weapons and armor are loaded in inventory also inventory screen has to be open
//? page_visible
// called then page gets in focus
//? header_ready
// used for clarity menu
// called then header is loaded

function start() {
    const jd = local_storage('clarity_locations').flow_handler
    ( () => { //--- looks then everything need is ready then starts data parser
        window.addEventListener('auth_complete', () => {
            let jd = {'refresh_button': '.Header-m_menuItem-dhe8c'} // TODO remove this shit and add one for app version
            document.querySelector(jd.refresh_button).addEventListener('click', () => {
                window.dispatchEvent(new Event('update_item_info'))
            })
            window.addEventListener('page_visible', () => {
                window.dispatchEvent(new Event('update_item_info'))
            })
            document.addEventListener('keydown', event => {
                if(event.target.tagName.toLowerCase() == 'input' || event.target.tagName.toLowerCase() == 'textarea') return
                if(event.code != "KeyR") return
                window.dispatchEvent(new Event('update_item_info'))
            })
        }, {once: true})
    }) ()

    ( () => { //--- looks looks for items like weapons and armor
        let jd = {'items': '.item'} // TODO remove this shit and add one for app version
        let inventory_observer = new MutationObserver((_, quit) => {
            if (document.querySelector(jd.items)) {
                window.dispatchEvent(new Event('inventory_ready'))
                quit.disconnect()
            }
        })
        inventory_observer.observe(document, {
            childList: true,
            subtree: true
        })
    }) ()

    ( () => { //--- used for auth and bungie / my database data parser refresh
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState == 'visible') window.dispatchEvent(new Event('page_visible'))
        })
    }) ()

    ( () => { //--- looks for header
        let observer = new MutationObserver((_, quit) => {
            let header = document.querySelector(jd.dim_header)
            if (header){
                window.dispatchEvent(new Event('header_ready'))
                quit.disconnect()
            }
        })
        observer.observe(document, {
            childList: true,
            subtree: true
        })
    }) ()

    ( () => { //--- empty

    }) ()
}