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


;( () => { //--- looks looks for items like weapons and armor
    let inventory_observer = new MutationObserver((_, quit) => {
        if (document.getElementsByClassName('item')[0]) {
            window.dispatchEvent(new Event('inventory_ready'))
            quit.disconnect()
        }
    })
    inventory_observer.observe(document, {
        childList: true,
        subtree: true
    })
}) ()

;( () => { //--- looks for item clicks
    window.addEventListener('inventory_ready', () => {
        document.getElementById('app').addEventListener('click', event => {
            if(!clarity_user_data) handle_data() // browser can delete this if it was deleted get new data

            let isOrganizer = document.location.href.indexOf('organizer') > 0

            //TODO : replace with proper jquery 
            function SearchElemRecursively(target, callback, levels, current = 0) {
                if (!target) return            
                let ret = callback(target);
                
                return (!ret && current < levels) ? 
                    SearchElemRecursively(target.parentElement, callback, levels, current + 1) :
                    ret
            }

            let itemElement = SearchElemRecursively(event.target, (elem) => {
                if (elem.classList.contains('item')) {
                       if(elem.parentElement.classList.contains('item-drag-container'))
                            return elem;
                }
            }, 3)

            let unique_id

            if(itemElement && itemElement.id){
                unique_id = itemElement.id
            } 
            else if (isOrganizer) {

                let isOpeningSheet = SearchElemRecursively(event.target, (elem) => {
                        return (elem.classList.contains('item-popup'))
                }, 5)

                if(!isOpeningSheet) {
                    let itemPopup = $(document.body).find('.item-popup').get(0)

                    if(itemPopup.children().find(event.target).lenght) {
                        //avoiding click from inside the popup
                        return
                    } else {
                        let openSheetLink = itemPopup.find('a')[0]
                        //try to get data opening the sheet page
                        if(openSheetLink) {
                            openSheetLink.click()
                            return
                        }
                    }              
                } 
                else if (isOpeningSheet && !event.isTrusted) {
                    try {
                        if(event.isTrusted == false) { //if its our simulated click

                            let subBucket = $(document.body).find('.sub-bucket')[0]
                            unique_id = $(subBucket).children('.item')[0].id //item id on full sheet
                            
                            let closeSheet = $(document.body).find('.sheet-close')[0]
                            if(closeSheet)
                                closeSheet.click()
                        }

                    } catch (error) {
                        console.log('Error getting itemid ' + error)
                    }
                }
            }

            if(unique_id) {
                let item_type = clarity_user_data[unique_id]?.item_type
                switch (item_type) {
                    case 'weapon':
                        window.dispatchEvent(new CustomEvent('weapon_pressed', {detail: unique_id}))
                        break
                    case 'armor':
                        window.dispatchEvent(new CustomEvent('armor_pressed', {detail: unique_id}))
                        break
                }

                return
            }


        })
    }, {once: true})
}) ()

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