;( () => { //--- some things can't work without DIM's class names
    const jd = local_storage('clarity_settings')
    try {
        jd.class_names.locations.refresh_button
        jd.class_names.locations.dim_header
        window.dispatchEvent(new Event('clarity_locations'))
        start()
    } catch {
        get_class_names(true)
        return
    }
    get_class_names(false)
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


// ;( () => { //--- looks looks for items like weapons and armor
//     let inventory_observer = new MutationObserver((_, quit) => {
//         if (document.getElementsByClassName('item')[0]) {
//             window.dispatchEvent(new Event('inventory_ready'))
//             quit.disconnect()
//         }
//     })
//     inventory_observer.observe(document, {
//         childList: true,
//         subtree: true
//     })
// }) ()

// ;( () => { //--- looks for item clicks
//     window.addEventListener('inventory_ready', () => {
//         document.getElementById('app').addEventListener('click', event => {
//             let unique_id
//             function get_unique_id(target, x) {
//                 if (!target) return
//                 if (target.classList.contains('item') && target.id) {
//                     if(!target.parentElement.classList.contains('item-drag-container')) return // this will prevent adding descriptions to wrong place
//                     unique_id = target.id
//                 }
//                 if (x < 3) get_unique_id(target.parentElement, x + 1)
//             }
//             get_unique_id(event.target, 0)

//             let item_type = clarity_user_data[unique_id]?.item_type
//             switch (item_type) {
//                 case 'weapon':
//                     window.dispatchEvent(new CustomEvent('weapon_pressed', {detail: unique_id}))
//                     break
//                 case 'armor':
//                     window.dispatchEvent(new CustomEvent('armor_pressed', {detail: unique_id}))
//                     break
//             }
//         })
//     }, {once: true})
// }) ()

;( () => { //--- used for auth and bungie / my database data parser refresh
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState == 'visible') window.dispatchEvent(new Event('page_visible'))
    })
}) ()

function start() {
    const jd = local_storage('clarity_settings')
    const refresh_button = jd.class_names.locations.refresh_button
    const dim_header = jd.class_names.locations.dim_header

    ;( () => { //--- after auth complete look if database need refreshing
        window.addEventListener('auth_complete', () => {
            document.querySelector(refresh_button).parentElement.addEventListener('click', () => {
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

    ;( () => { //--- looks for header
        let observer = new MutationObserver((_, quit) => {
            let header = document.querySelector(dim_header)
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
}







(() => {
    document.querySelector('#app').addEventListener('click', click_listener, {passive: true})
    function click_listener(event) {
        if(!event) return
        const target = event.path.find(element =>
            element.id == 'app' ||
            element.className == 'item' && element.id // weapon or armor
        )
        if(target.id == 'app') return // this is just to stop looking then #app was reached

        async function check_element(dim_selector) {
            while (document.querySelector(dim_selector) == undefined) {
                await new Promise(resolve => requestAnimationFrame(resolve))
            }
            return
        }
        check_element('.item-popup .item-details')
        .then(() => {
            let item_type = clarity_user_data[target.id]?.item_type
            switch (item_type) {
                case 'weapon':
                    window.dispatchEvent(new CustomEvent('weapon_pressed', {detail: target.id}))
                    break
                case 'armor':
                    window.dispatchEvent(new CustomEvent('armor_pressed', {detail: target.id}))
                    break
            }
        })
    }

    document.querySelector('#app').addEventListener('mouseover', mouse_listener, {passive: true})
    function mouse_listener(event) {
        if(!event) return
        // const target = event.path.find(element =>
        //     element.id == 'app' ||
        //     element.className == 'icon_container' && element.parentElement.attributes.perk_id // weapon or armor
        // )
        // console.log(event.target)

        if(event.target.parentElement.attributes.perk_id) {

            const target = document.querySelector('#app')
            window.dispatchEvent(new CustomEvent('perk_hover'), {detail: target})
            return
        }
        // if(target.id == 'app') {
            window.dispatchEvent(new CustomEvent('mouse_out'))
        //     return
        // }
    }













}) ()