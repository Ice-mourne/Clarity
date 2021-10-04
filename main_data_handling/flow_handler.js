;( () => { //--- some things can't work without DIM div names
    let version = window.location.href.match(/beta(?=.destiny)|app(?=.destiny)/)[0] // match beta or app before .destiny
    fetch(`https://ice-mourne.github.io/Database-for-Clarity/Database/locations.json?${Math.random()}`)
    .then(resp => resp.json())
    .then(data => local_storage('clarity_locations', data[version]))
    .then(() => window.dispatchEvent(new Event('clarity_locations'))) // basically tells locations are ready
    .then(() => start())
}) ()
;( () => { //--- create settings on first launch or incase cache was cleared
    const current_settings = local_storage('clarity_settings')
    if (current_settings && current_settings.settings_version != 1) return
    let settings = {
        'dark_mode': false,
        'dark_mode_colors': {
            'background_color_1': 'hsl(240, 21%, 16%)',
            'background_color_2': 'hsl(240, 30%, 4%)',
            'masterwork_item': 'hsl(50, 90%, 65%)',
            'masterwork_item_text': 'hsl(0, 0%, 0%)'
        },
        'settings_version': 2,
    }
    local_storage('clarity_settings', settings)
}) ()
//--- events
// everything hare runs after div names are fetched
// stuff in hare is used to control order on startup mostly
//? update_item_info
//--- after auth complete look if database need refreshing
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
    ;( () => { //--- after auth complete look if database need refreshing
        window.addEventListener('auth_complete', () => {
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

    ;( () => { //--- looks looks for items like weapons and armor
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

    ;( () => { //--- used for auth and bungie / my database data parser refresh
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState == 'visible') window.dispatchEvent(new Event('page_visible'))
        })
    }) ()

    ;( () => { //--- looks for header
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

    ;( () => { //--- looks for item clicks
        window.addEventListener('inventory_ready', () => {
            document.getElementById('app').addEventListener('click', event => {
                let unique_id
                function get_unique_id(target, x) {
                    if (!target) return
                    if (target.classList.contains('item') && target.id) unique_id = target.id
                    if (x < 3) get_unique_id(target.parentElement, x + 1)
                }
                get_unique_id(event.target, 0)

                let item_type = clarity_user_data[unique_id]?.item_type
                switch (item_type) {
                    case 'weapon':
                        window.dispatchEvent(new CustomEvent('weapon_pressed', {detail: unique_id}))
                        break
                    case 'armor':
                        window.dispatchEvent(new CustomEvent('armor_pressed', {detail: unique_id}))
                        break
                }
            })
        }, {once: true})
    }) ()
}