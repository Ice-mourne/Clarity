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
;(() => { // - - checks if data base needs updating
    fetch(`https://ice-mourne.github.io/Clarity-A-DIM-Companion-json/version/?${Math.random()}`)
    .then(resp => resp.json())
    .then(json_version => {
        let manifest_version = localStorage.getItem('d2-manifest-version')
        if (!local_get('clarity_info') || true) {
            run_manifest()
        } else if (!local_get('clarity_info').json_version || !local_get('clarity_info').manifest_version) {
            run_manifest()
        } else if(local_get('clarity_info').json_version != json_version.version || local_get('clarity_info').manifest_version != manifest_version) {
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
                filter_weapons(element)
                break
            case 2: // itemType:2 'armor'
                if (element[1].inventory.tierTypeName == 'Exotic') filter_armor(element)
                break
            case 19: // itemType:19 'mod', itemSubType:0 'None'                  
                if (element[1].itemSubType == 0) filter_perks_and_sluff(element)
                break
        }
    }
    function filter_weapons(data_old) {
        const id = data_old[0]
        const data = data_old[1]
        new_inventory_item[id] = {
            'name': data.displayProperties.name,
            'icon': data.displayProperties.icon, // icon link
            'item_type': data.itemTypeDisplayName, // (sniper, ...)
            'item_tier': data.inventory.tierTypeName, // (legendary, ...)
            'stats': {
                'stat_group': '', // (0-100, 10-100)
                'base_stats': '',
                'investment_stats': ''
            },
            'slot_type': '', // (kinetic, energy, heavy)
            'ammo_type': '', // (primary, special, heavy)
            
            'sockets': '', // perks, frame
            'damage_type': '', // damage type
            'formulas': '',
            'item_type': 'weapon'
        }
        new_inventory_item[id].stats.stat_group = new_stat_group(stat_group[data.stats.statGroupHash].scaledStats) // stat group (0-100, 10-100)
        function new_stat_group(data) {
            let stat_group = {}
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                stat_group[element.statHash] = element.displayInterpolation
            }
            return stat_group
        }
        new_inventory_item[id].stats.base_stats = new_base_stats(data.stats.stats) // base stats
        function new_base_stats(data) {
            data = Object.entries(data)
            let base_stats = {}
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                base_stats[element[0]] = element[1].value
            }
            return base_stats
        }
        new_inventory_item[id].stats.investment_stats = new_investment_stats(data.investmentStats) // investment_stats
        function new_investment_stats(data) {
            let investment_stats = {}
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                investment_stats[element.statTypeHash] = element.value
            }
            return investment_stats
        }
        new_inventory_item[id].slot_type = new_slot_type(data.equippingBlock.equipmentSlotTypeHash) // slot type
        function new_slot_type(data) {
            return inventory_bucket[data].displayProperties.name.replace(' Weapons', '')
             
        }
        new_inventory_item[id].ammo_type = new_ammo_type(data.equippingBlock.ammoType) // ammo type
        function new_ammo_type(data) {
            if (data == 1) return 'primary'
            if (data == 2) return 'special'
            if (data == 3) return 'heavy'
        }
        new_inventory_item[id].sockets = new_sockets(data.sockets.socketEntries, data.sockets.socketCategories) // sockets
        function new_sockets(data, index) {
            let perks = {}
            for (let i = 0; i < index.length; i++) {
                const element = index[i]
                let socket_name = socket_category[element.socketCategoryHash].displayProperties.name.toLowerCase().replace(' ', '_')
                if (socket_name != 'weapon_cosmetics' && socket_name != 'weapon_mods') {
                    perks[socket_name] = thing = []
                    for (let y = 0; y < element.socketIndexes.length; y++) {
                        const ele = element.socketIndexes[y]
                        if (data[ele].singleInitialItemHash != '2285418970') thing.push(perk_filter(ele, socket_name)) // excluding tracker
                    }
                }
            }
            function perk_filter(ele, socket_name){
                new_stuff = {}
                if (socket_name == 'intrinsic_traits') new_stuff['frame'] = data[ele].singleInitialItemHash // frame
                if (socket_name == 'weapon_perks') {
                    if (data[ele].reusablePlugItems && data[ele].reusablePlugItems.length != 0) { // curated perk list
                        new_stuff['curated_perks'] = curated_perks = []
                        let curated = data[ele].reusablePlugItems
                        for (let i = 0; i < curated.length; i++) {
                            const element = curated[i]
                            curated_perks.push(element.plugItemHash)
                        }
                    } 
                    if (data[ele].reusablePlugSetHash) {
                        new_stuff['reusable_perk_list'] = reusable_perks = [] // reusable perk list
                        let reusable_list = plug_set[data[ele].reusablePlugSetHash].reusablePlugItems
                        for (let i = 0; i < reusable_list.length; i++) {
                            const element = reusable_list[i]
                            reusable_perks.push({'can_roll': element.currentlyCanRoll, 'perk_id': element.plugItemHash})
                        }
                    }
                    if (data[ele].randomizedPlugSetHash) {
                        new_stuff['random_perk_list'] = random_perks = [] // random perk list
                        let random_list = plug_set[data[ele].randomizedPlugSetHash].reusablePlugItems
                        for (let i = 0; i < random_list.length; i++) {
                            const element = random_list[i]
                            random_perks.push({'can_roll': element.currentlyCanRoll, 'perk_id': element.plugItemHash})
                        }
                    }
                }
                return new_stuff
            }
            return perks
        }
        new_inventory_item[id].damage_type = new_damage_type(data.defaultDamageTypeHash) // damage type
        function new_damage_type(data) {
            return damage_type_list[data].displayProperties.name
        }
        new_inventory_item[id].formulas = new_formulas(data.itemTypeDisplayName, data.sockets.socketEntries, data.sockets.socketCategories) // formulas
        function new_formulas(type, socket, index) {
            for (let i = 0; i < index.length; i++) {
                const element = index[i];
                let socket_name = socket_category[element.socketCategoryHash].displayProperties.name.toLowerCase().replace(' ', '_')
                if (socket_name == 'intrinsic_traits') {
                    let frame_id = socket[element.socketIndexes[0]].singleInitialItemHash
                    let frame_name = inventory_item[frame_id].displayProperties.name
                    if (formulas[type][frame_name]) return formulas[type][frame_name]
                }
            }
        }
    }
    function filter_armor(data_old) {
        const id = data_old[0]
        const data = data_old[1]
        new_inventory_item[id] = {
            'name': data.displayProperties.name,
            'icon': data.displayProperties.icon,
            'type': data.itemTypeDisplayName, // helm, chest, ...
            'perks': '', // exotic perk
            'item_type': 'armor'
        }
        new_inventory_item[id].perks = new_armor(data.sockets.socketEntries)
        function new_armor(perk_list) {
            for (let i = perk_list.length - 1; i >= 0 ; i--) {
                const element = perk_list[i]
                if (element.socketTypeHash == '965959289' || element.socketTypeHash == '635551670') {
                    let name = inventory_item[element.singleInitialItemHash].displayProperties.name
                    let description = (armor_perks[name]) ? armor_perks[name] : `<div class='new_pd'>${inventory_item[element.singleInitialItemHash].displayProperties.description}</div>`
                    return {
                        'name': name,
                        'description': description,
                    }
                }
            }
        }
    }
    function filter_perks_and_sluff(data_old) {
        const id = data_old[0]
        const data = data_old[1]
        let name = data.displayProperties.name
        let conditional_description = (data.investmentStats.length != 0) ? {'text': `<div></div>`} : {'text': `<div class='new_pd'>${data.displayProperties.description}</div>`}
        let description = (weapon_perks[name]) ? weapon_perks[name] : conditional_description
        new_inventory_item[id] = {
            'name': data.displayProperties.name,
            'icon': data.displayProperties.icon,
            'description': description,
            'item_type': 'perk'
        }
        if (data.investmentStats.length != 0) new_inventory_item[id].investment_stats = data.investmentStats
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
        headers: {
            'X-API-Key': key,
            'Authorization': token
        }
    })
    .then(u => u.json())
    .then(json => {
        find_items(json)
    })
    let instanced_items = {}
    let inventory_item = local_get('clarity_inventory_item')
    function find_items(data) {
        let items = data.Response.profileInventory.data.items;
        for (let i = 0; i < items.length; i++) {
            const element = items[i]
            if (element.itemInstanceId && inventory_item[element.itemHash]) {
                add_data_to_instanced_items(inventory_item[element.itemHash], element.itemInstanceId)
            }
        }
        function add_data_to_instanced_items(item_data, unique_id){
            instanced_items[unique_id] = {
                'manifest': item_data,
                'stats': data.Response.itemComponents.stats.data[unique_id].stats, // calculated stats
                'active_perks': data.Response.itemComponents.sockets.data[unique_id].sockets // active perks, frame, shader, ect...
            }
            try {instanced_items[unique_id].plugs = data.Response.itemComponents.reusablePlugs.data[unique_id].plugs} catch {} // all perks not all possible but all rolled nothing on weapons with out random perks
        }
        session_set_json('instanced_items', instanced_items)
        console.log(`-  -  Clarity DIM companion  -  - > Instanced item data was updated --> Execution time: ${window.performance.now() - start} ms`);
    }
}