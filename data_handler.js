
;(() => {    
    let dim_url = document.querySelector('body').baseURI
    let key = '2b16c291fcff48cbac86bd5f1d0bbc9d'
    let url = `https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/`
    let token = 'Bearer ' + local_get('authorization').accessToken.value
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-API-Key': key,
            'Authorization': token
        }
    })
    .then(u => u.json())
    .then(data => {
        let user_info = {'platform': data.Response.destinyMemberships[0].LastSeenDisplayNameType, 'id': data.Response.destinyMemberships[0].membershipId}
        localStorage.setItem('clarity_user', JSON.stringify(user_info))
    })
    let version = dim_url.slice(8, dim_url.search('.destiny'))
    localStorage.setItem('clarity_dim_version', version)

    fetch(`https://ice-mourne.github.io/Clarity-A-DIM-Companion-json/dim_locations/?${Math.random()}`)
    .then(resp => resp.json())
    .then(data => localStorage.setItem('clarity_locations', JSON.stringify(data[version])))
    .then( _ => {
        run_dark_mode()
        info_button_observer()
    })
})()
;(() => { // - - checks if database needs updating
    fetch(`https://ice-mourne.github.io/Clarity-A-DIM-Companion-json/version/?${Math.random()}`)
    .then(resp => resp.json())
    .then(json_version => {
        let manifest_version = localStorage.getItem('d2-manifest-version')
        const c_info   = local_get('clarity_info')
        const inv_item = local_get('clarity_inventory_item')
        if (!c_info || !inv_item || !c_info.json_version || !c_info.manifest_version || c_info.json_version != json_version.version || c_info.manifest_version != manifest_version) {
            run_manifest()
        } else {
            console.log('-  -  Clarity DIM companion  -  - > Clarity inventory item already up to date')
            add_data_to_instanced_items()
            enable_refresh_button()
        }
        function run_manifest() {
            let info = {
                'json_version': json_version.version,
                'manifest_version': manifest_version
            }
            localStorage.setItem('clarity_info', JSON.stringify(info))
            get_manifest()
        }
    })
})()
function get_manifest() {  // - - Get data from indexedDB
    let start = window.performance.now()
    indexedDB.open('keyval-store').onsuccess = e => {
        let db = e.target.result
        let tx = db.transaction('keyval', 'readonly')
        let store = tx.objectStore('keyval')
        let data = store.get('d2-manifest')
        data.onsuccess = () => {
            let stat_group       = data.result.DestinyStatGroupDefinition
            let inventory_bucket = data.result.DestinyInventoryBucketDefinition
            let socket_category  = data.result.DestinySocketCategoryDefinition
            let plug_set         = data.result.DestinyPlugSetDefinition
            let damage_type_list = data.result.DestinyDamageTypeDefinition
            let inventory_item   = data.result.DestinyInventoryItemDefinition
            Promise.all([
                fetch(`https://ice-mourne.github.io/Clarity-A-DIM-Companion-json/weapon_formulas/?${Math.random()}`)
                .then(resp => resp.json()),
                fetch(`https://ice-mourne.github.io/Clarity-A-DIM-Companion-json/exotic_armor_perks/?${Math.random()}`)
                .then(resp => resp.json()),
                fetch(`https://ice-mourne.github.io/Clarity-A-DIM-Companion-json/weapon_perks/?${Math.random()}`)
                .then(resp => resp.json())
            ])
            .then(json_data => {
                let formulas = json_data[0]
                let armor_perks = json_data[1]
                let weapon_perks = json_data[2]
                filter_inventory_item(Object.entries(inventory_item), stat_group, inventory_bucket, socket_category, plug_set, damage_type_list, formulas, inventory_item, armor_perks, weapon_perks, start)
            }) 
        }
    }
}
function filter_inventory_item(data, stat_group, inventory_bucket, socket_category, plug_set, damage_type_list, formulas, inventory_item, armor_perks, weapon_perks, start) {
    let new_inventory_item = {}
    for (let i = 0; i < data.length; i++){
        const element = data[i]
        switch (element[1].itemType){
            case 3: // itemType:3 'Weapon'
                if (element[1].defaultDamageType != 0) filter_weapons(element)
                break
            case 2: // itemType:2 'armor'
                if (element[1].inventory.tierTypeName == 'Exotic') filter_armor(element)
                break
            case 19: // itemType:19 'mod'
                if (element[1].displayProperties.name && element[1].displayProperties.hasIcon && element[1].plug) {
                    //           Arrow,      Barrel,     Battery,    Blade,      Bowstring,  Grip,       Guard,     Launcher Barrel, Magazine,   Scope,      Stock,     Trait    Magazine gl
                    let perks = [1257608559, 2833605196, 1757026848, 1041766312, 3809303875, 3962145884, 683359327, 1202604782,      1806783418, 2619833294, 577918720, 7906839, 2718120384]
                    if (perks.indexOf(element[1].plug.plugCategoryHash) > -1) {filter_perks_and_sluff(element, 'perk'); break}
                    //            Intrinsic
                    let frames = [1744546145]
                    if (frames.indexOf(element[1].plug.plugCategoryHash) > -1) {filter_perks_and_sluff(element, 'frame'); break}
                    //                Range,      Handling,  Accuracy,   Impact,     Stability,  Draw,      Charge,     Blast,      Velocity,   Reload                               
                    let masterwork = [1392237582, 199786516, 1238043140, 2458812152, 1762223024, 482070447, 2827428737, 1847616696, 2321551094, 717646604]
                    if (masterwork.indexOf(element[1].plug.plugCategoryHash) > -1) {filter_perks_and_sluff(element, 'masterwork'); break}
                    //                              
                    if (element[1].itemTypeDisplayName == 'Weapon Mod') {filter_perks_and_sluff(element, 'w_mod'); break}
                    //
                    if (element[1].plug.uiPlugLabel == 'masterwork') {filter_perks_and_sluff(element, 'catalyst'); break} // == masterwork applies to catalysts
                    filter_perks_and_sluff(element, 'other'); break
                } 
                break
        }
    }
    function filter_weapons(data_arr) {
        const id = data_arr[0]
        const data = data_arr[1]
        new_inventory_item[id] = {
            'name': data.displayProperties.name,
            'icon': data.displayProperties.icon, // icon link
            'weapon_type': data.itemTypeDisplayName, // (sniper, ...)
            'item_tier': data.inventory.tierTypeName, // (legendary, ...)
            'stats': {
                'stat_group':       new_stat_group(), // (0-100, 10-100)
                'base_stats':       new_base_stats(),
                'investment_stats': new_investment_stats()
            },
            'slot_type': inventory_bucket[data.equippingBlock.equipmentSlotTypeHash].displayProperties.name.replace(' Weapons', ''), // (kinetic, energy, heavy)
            'ammo_type': new_ammo_type(), // (primary, special, heavy)
            
            'sockets': new_sockets(), // perks, frame
            'damage_type': damage_type_list[data.defaultDamageTypeHash].displayProperties.name, // damage type
            'formulas': new_formulas(),
            'item_type': 'weapon'
        }
        function new_stat_group() { // stat group (0-100, 10-100)
            let x = {}
            stat_group[data.stats.statGroupHash].scaledStats.forEach(element => {
                x[element.statHash] = element.displayInterpolation
            })
            return x
        }
        function new_base_stats() { // base stats
            let x = {}
            Object.entries(data.stats.stats).forEach(element => {
                if (element[0] != 1885944937 && element[0] != 1935470627 && element[0] != 1480404414 && element[0] != 3291498656) x[element[0]] = element[1].value
            })
            return x 
        }
        function new_investment_stats() { // investment_stats
            let x = {}
            data.investmentStats.forEach(element => {
                if (element.statTypeHash != 1885944937 && element.statTypeHash != 1935470627 && element.statTypeHash != 1480404414 && element.statTypeHash != 3291498656) x[element.statTypeHash] = element.value
            })
            return x 
        }
        function new_ammo_type() { // ammo type
            const ammo = data.equippingBlock.ammoType
            if (ammo == 1) return 'primary'
            if (ammo == 2) return 'special'
            if (ammo == 3) return 'heavy'
        }
        function new_sockets() { // sockets
            let perks = {}
            perks.indexes = []
            data.sockets.socketCategories.forEach(element => { // add weapon frame and find perk indexes
                if (element.socketCategoryHash == 3956125808) element.socketIndexes.forEach(element => { // frame
                    perks.frame = data.sockets.socketEntries[element].singleInitialItemHash
                    perks.indexes.push(element)
                })
                if (element.socketCategoryHash == 4241085061) element.socketIndexes.forEach(element => { // (element.socketCategoryHash == 4241085061) => perk socket list // for each item in list will give sockets is 1,2,3,4,9 or similar 9 is tracker
                    if (data.sockets.socketEntries[element].singleInitialItemHash != 2285418970) { // excluding tracker because it is perk??? Bungie stop smoking crack
                        perks[element] = filter_perks(element) // element = perk socket index 1, 2, 3, 4 -- usually
                        perks.indexes.push(element)
                    }
                })
                if (element.socketCategoryHash == 2685412949) element.socketIndexes.forEach(element => { // mod and masterwork indexes
                    perks.indexes.push(element)
                })
            })
            function filter_perks(index){
                let perk = {}
                const element = data.sockets.socketEntries[index]
                    const curated = element.reusablePlugItems
                    if (curated && curated.length != 0) { // curated perk list
                        perk.curated_perks = x = []
                        curated.forEach(element => { x.push(element.plugItemHash) })
                    }
                    if (element.reusablePlugSetHash) { // reusable perk list
                        perk.reusable_perk_list = x = []
                        plug_set[element.reusablePlugSetHash].reusablePlugItems.forEach(element => { x.push({'can_roll': element.currentlyCanRoll, 'perk_id': element.plugItemHash}) })
                    }
                    if (element.randomizedPlugSetHash) { // random perk list
                        perk.random_perks = x = []
                        plug_set[element.randomizedPlugSetHash].reusablePlugItems.forEach(element => { x.push({'can_roll': element.currentlyCanRoll, 'perk_id': element.plugItemHash}) })
                    }
                return perk
            }
            return perks
        }
        function new_formulas() { // formulas
            const type = data.itemTypeDisplayName
            for (let i = 0; i < data.sockets.socketCategories.length; i++) { 
                const element = data.sockets.socketCategories[i]
                if (element.socketCategoryHash == 3956125808) { // if socket category = INTRINSIC TRAITS
                    let frame_index = element.socketIndexes[0] // weapons frames index in socketEntries
                    let frame_id    = data.sockets.socketEntries[frame_index].singleInitialItemHash
                    let frame_name  = inventory_item[frame_id].displayProperties.name
                    if (formulas[type][frame_name]) return formulas[type][frame_name]
                }
            }
        }
    }
    function filter_armor(data_arr) {
        const id = data_arr[0]
        const data = data_arr[1]
        new_inventory_item[id] = {
            'name': data.displayProperties.name,
            'icon': data.displayProperties.icon,
            'type': data.itemTypeDisplayName, // helm, chest, ...
            'perks': new_armor(), // exotic perk
            'item_type': 'armor'
        }
        function new_armor() {
            data.sockets.socketEntries.forEach(element => {
                if (element.socketTypeHash == '965959289' || element.socketTypeHash == '635551670') {
                    let name = inventory_item[element.singleInitialItemHash].displayProperties.name
                    let description = (armor_perks[name]) ? armor_perks[name] : `<div class='new_pd'>${inventory_item[element.singleInitialItemHash].displayProperties.description}</div>`
                    return {
                        'name': name,
                        'description': description,
                    }
                }
            })
        }
    }
    function filter_perks_and_sluff(data_arr, item_type) {
        const id   = data_arr[0]
        const data = data_arr[1]
        let name   = data.displayProperties.name
        if (item_type != 'other'){
            new_inventory_item[id] = {
                'name': name,
                'icon': data.displayProperties.icon,
                'item_type': item_type,
                "description": new_description(),
                "investment_stats": new_investment_stats()
            }
            function new_description(){
                if (data.investmentStats.length == 0) return (weapon_perks[name]) ? weapon_perks[name] : {'text': `<div class='new_pd'>${data.displayProperties.description}</div>`} 
            }
            function new_investment_stats(){
                if (data.investmentStats.length != 0){
                    let x = []
                    data.investmentStats.forEach(element => {
                        if (element.value != 0 && element.statTypeHash != 1885944937 && element.statTypeHash != 1935470627 && element.statTypeHash != 1480404414 && element.statTypeHash != 3291498656) x.push(element)
                    })
                    return x
                }
            }
        } else {
            new_inventory_item[id] = {
                'name': name,
                'item_type': item_type
            }
        }
    }
    new_inventory_item['712324018'] = { // extra perk
        'name': 'Transformative',
        'icon': '/common/destiny2_content/icons/f2ff6ea4498ad2d808b4af21e93cf5fe.png',
        'item_type': 'perk',
    }
    localStorage.setItem('clarity_inventory_item', JSON.stringify(new_inventory_item))
    console.log(`-  -  Clarity DIM companion  -  - > Clarity inventory item was updated --> Execution time: ${window.performance.now() - start} ms`)
    add_data_to_instanced_items()
    enable_refresh_button()
}
function enable_refresh_button(){ // instanced item data refresh
    // let jd = JSON.parse(localStorage.getItem('clarity_locations')).sources_and_more_menu
    let observer = new MutationObserver((_o, quit) => {
        let loc = document.querySelector('.Header-m_headerRight-Fbed4 > .Header-m_menuItem-3G0SM')
        if (loc){
            loc.addEventListener('click', add_data_to_instanced_items)
            quit.disconnect()
        }
    })
    observer.observe(document, {
        childList: true,
        subtree: true
    })
    document.addEventListener('keypress', e => {
        if (e.key == 'r' && e.defaultPrevented) add_data_to_instanced_items()
    })
    document.addEventListener('visibilitychange', _ => {
        if (document.visibilityState == 'visible') add_data_to_instanced_items()
    })
}
function add_data_to_instanced_items() {
    let start = window.performance.now()
    let type = local_get('clarity_user').platform
    let id = local_get('clarity_user').id
    let array = [102,201,205,304,305,310]
    let key = '2b16c291fcff48cbac86bd5f1d0bbc9d'
    let token = 'Bearer ' + local_get('authorization').accessToken.value
    let url = `https://www.bungie.net/Platform/Destiny2/${type}/Profile/${id}/?components=${array}`
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: { 'X-API-Key': key, 'Authorization': token }
    })
    .then(u => u.json()).then(json => find_items(json))
    let instanced_items = {}
    let inventory_item = local_get('clarity_inventory_item')
    function find_items(data) {
        let api_end = window.performance.now()
        let items = []
        items = data.Response.profileInventory.data.items
        Object.entries(data.Response.characterInventories.data).forEach(element => { items = items.concat(element[1].items) })
        Object.entries(data.Response.characterEquipment  .data).forEach(element => { items = items.concat(element[1].items) })
        for (let i = 0; i < items.length; i++) {
            const element = items[i]
            if (element.itemInstanceId && inventory_item[element.itemHash] && inventory_item[element.itemHash].item_type != 'other') {
                add_data_to_instanced_items(inventory_item[element.itemHash], element.itemInstanceId)
            }
        }
        function add_data_to_instanced_items(item_data, unique_id){
            instanced_items[unique_id] = {
                'manifest': item_data,
                'stats': data.Response.itemComponents.stats.data[unique_id].stats, // calculated stats
                'active_perks': data.Response.itemComponents.sockets.data[unique_id].sockets, // active perks, frame, shader, ect...
            }
            try {instanced_items[unique_id].plugs = data.Response.itemComponents.reusablePlugs.data[unique_id].plugs} catch {} // all perks not all possible but all rolled nothing on weapons with out random perks
        }
        session_set_json('instanced_items', instanced_items)
        // console.log(`-  -  Clarity DIM companion  -  - > Instanced item data was updated
        // Execution time: 
        //     API call: ${api_end - start} ms
        //     Processing data: ${window.performance.now() - api_end} ms
        //     Total: ${window.performance.now() - start} ms`
        // )
    }
}
// 305 active perks, 310  perks on weapon, 307 item id
