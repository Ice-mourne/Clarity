;(()=>{ // - - saves DIM version
    let url = document.querySelector('body').baseURI
    let version = url.slice(8, url.search('.destiny'))
    localStorage.setItem('clarity_dim_version', version)
    run_data_handler()
})()
function run_data_handler(){ // - - Check if database needs updating
    fetch(`https://ice-mourne.github.io/Clarity-A-DIM-Companion-json/version/?${Math.random()}`)
    .then(resp => resp.json())
    .then(json_version => {
        if(localStorage.getItem('d2-manifest-version') != localStorage.getItem('clarity-d2-version') || localStorage.getItem('clarity_json_version') != json_version.version){
            work_on_data()
            localStorage.setItem('clarity_json_version', json_version.version)
        } else {
            run_dark_mode()
            info_button_observer()
        }
    })
}
function work_on_data() { // - - Get data from indexedDB
    indexedDB.open('keyval-store').onsuccess = e => {
        let db = e.target.result
        let tx = db.transaction('keyval', 'readonly')
        let store = tx.objectStore('keyval')
        let data = store.get('d2-manifest')
        data.onsuccess = () => {
            run_inventory_item_filter(Object.entries(data.result.DestinyInventoryItemDefinition))
            run_stat_group_filter(Object.entries(data.result.DestinyStatGroupDefinition))
            run_perk_list_filter(Object.entries(data.result.DestinyPlugSetDefinition))
            run_stat_name_filter(Object.entries(data.result.DestinyStatDefinition))
            run_custom_json()
        }
    }
}
function run_inventory_item_filter(data){
    let weapon_info = {}
    let armor_info = {}
    let perk_mod_info = {}
    let perk_mod_icon = {}
    
    for (let i = 0; i < data.length; i++){
        const element = data[i]
        switch (true){
            case element[1].itemType == 3:
                filter_weapons(element)
                break
            case element[1].itemType == 2 && element[1].inventory.tierTypeName == 'Exotic': // item tipe armor & tier exotic
                filter_armor(element)
                break
            case element[1].itemType == '19' && element[1].displayProperties.name != '': // item type mod & dose it have name
                filter_mods_and_sruff(element)
                filter_perk_by_icon(element)
                break
        }
    }
    function filter_weapons(e) {
        const element = e
        const new_perks = {} //  - - Weapon perks
        for (let i = 0; i < element[1].sockets.socketEntries.length; i++){
            const p = element[1].sockets.socketEntries[i]
            new_perks[i] = {
                'ranom_perk_list': p.randomizedPlugSetHash,
                'static_perk_list': p.reusablePlugSetHash,
                'curated_perk_list': p.reusablePlugItems
            }
        }
        const new_base_stats = {} // - - Base weapon stats
        for (let i = 0; i < Object.entries(element[1].stats.stats).length; i++){
            const z = Object.entries(element[1].stats.stats)[i]
            new_base_stats[z[0]] = z[1].value
        }
    
        const investment_stats = {} // - - Investment weapon stats
        for (let i = 0; i < element[1].investmentStats.length; i++){ 
            const inv = element[1].investmentStats[i]
            investment_stats[inv.statTypeHash] = inv.value
        }
        let f_weps = { //  - - Filter weapons
            'name': element[1].displayProperties.name,
            'icon': element[1].displayProperties.icon,
            'type': element[1].itemTypeDisplayName, // smg, fusion, ect
            'tier': element[1].inventory.tierTypeName, // legendary, ect
            'stat_group_hash': element[1].stats.statGroupHash, // min max stat group
            'frame': element[1].sockets.socketEntries[0].singleInitialItemHash,
            'slot_hash': element[1].equippingBlock.equipmentSlotTypeHash, // kinetic, energy, power
            'ammo': element[1].equippingBlock.ammoType, // primary, special 
            'damage_type_hash': element[1].defaultDamageTypeHash, // void, solar
            'perks': new_perks,
            'base_stats': new_base_stats,
            'investment_stats': investment_stats
        }
        
        weapon_info[element[0]] = f_weps
    }
    function filter_armor(e) {
        const element = e
        let f_armor = {
            'name': element[1].displayProperties.name,
            'icon': element[1].displayProperties.icon,
            'type': element[1].itemTypeDisplayName, // helm, chest
            'perks': element[1].sockets.socketEntries[11].singleInitialItemHash // exotic perk
        }
        armor_info[element[0]] = f_armor
    }
    function filter_mods_and_sruff(e) {
        const element = e
        let z = ['Emote', 'Armor Ornament', 'Weapon Ornament', 'Titan Universal Ornament'];
        if (!(z.indexOf(element[1].itemTypeDisplayName) > -1)) {
            const new_stat = []
            for (let i = 0; i < element[1].investmentStats.length; i++){
                const stats = element[1].investmentStats[i]
                new_stat.push([stats.statTypeHash, stats.value])
            }
            let f_perks_mods = {
                'name': element[1].displayProperties.name,
                'icon': element[1].displayProperties.icon,
                'investmentStats': new_stat
            }
            perk_mod_info[element[0]] = f_perks_mods
        }
    }
    function filter_perk_by_icon(e) {
        const element = e
        let z = ['Arrow', 'Barrel', 'Battery', 'Blade', 'Bowstring', 'Grip', 'Guard', 'Launcher Barrel', 'Magazine', 'Scope', 'Sight', 'Stock', 'Trait'];
        if (z.indexOf(element[1].itemTypeDisplayName) > -1) {
            let name = element[1].displayProperties.name
            let icon = String(element[1].displayProperties.icon).replace('/common/destiny2_content/icons/', '')
            perk_mod_icon[icon] = [name, element[0]]
        }
    }
    localStorage.setItem('clarity_weapon_info', JSON.stringify(weapon_info))
    localStorage.setItem('clarity_armor_info', JSON.stringify(armor_info))
    localStorage.setItem('clarity_perk_mod_info', JSON.stringify(perk_mod_info))
    localStorage.setItem('clarity_perk_mod_icon', JSON.stringify(perk_mod_icon)) // used to find perks using img link
    
}
function run_stat_group_filter(data){
    let stat_group_info = {}
    for (let i = 0; i < data.length; i++){
        const element = data[i]
        let n_group = {}
        for (let i = 0; i < element[1].scaledStats.length; i++){
            const group = element[1].scaledStats[i]
            n_group[group.statHash] = group.displayInterpolation
        }
        stat_group_info[element[0]] = n_group
    }
    localStorage.setItem('clarity_stat_group_info', JSON.stringify(stat_group_info))
}
function run_perk_list_filter(data){ // lists of perks weapons can get
    let perk_list_info = {}
    for (let i = 0; i < data.length; i++){
        const element = data[i]
        if (!element[1].isFakePlugSet){
            let n_list = []
            for (let i = 0; i < element[1].reusablePlugItems.length; i++){
                const list = element[1].reusablePlugItems[i]
                if (list.currentlyCanRoll) {
                    n_list.push(list.plugItemHash)
                }
            }
            perk_list_info[element[0]] = n_list
            perk_list_info[element[0]] = n_list
        }
    }
    localStorage.setItem('clarity_perk_list_info', JSON.stringify(perk_list_info))
}
function run_stat_name_filter(data) {
    let stat_names = {} // used to find perks using img link
    for (let i = 0; i < data.length; i++){
        const element = data[i]
        if (element[1].statCategory == 1 && element[1].displayProperties.name != '') {
            let f_stats = {'name': element[1].displayProperties.name}
            stat_names[element[0]] = f_stats
        }
    }
    localStorage.setItem('clarity_stat_names', JSON.stringify(stat_names))
}
function run_custom_json(){
    console.log('custom js');
    fetch(`https://ice-mourne.github.io/Clarity-A-DIM-Companion-json/exotic_armor_perks/?${Math.random()}`)
    .then(resp => { return resp.json() })
    .then(data => { localStorage.setItem('clarity_exotic_armor_description', JSON.stringify(data)) })

    fetch(`https://ice-mourne.github.io/Clarity-A-DIM-Companion-json/weapon_formulas/?${Math.random()}`)
    .then(resp => { return resp.json() })
    .then(data => { localStorage.setItem('clarity_weapon_formulas', JSON.stringify(data)) })

    fetch(`https://ice-mourne.github.io/Clarity-A-DIM-Companion-json/weapon_perks/?${Math.random()}`)
    .then(resp => { return resp.json() })
    .then(data => { localStorage.setItem('clarity_weapon_perks', JSON.stringify(data)) })

    let dim_v = (localStorage.getItem('clarity_dim_version') == 'beta') ? 'beta_dim_locations' : 'app_dim_locations'
    fetch(`https://ice-mourne.github.io/Clarity-A-DIM-Companion-json/${dim_v}/?${Math.random()}`)
    .then(resp => { return resp.json() })
    .then(data => { localStorage.setItem('clarity_dim_div_locations', JSON.stringify(data)) })

    run_dark_mode()
    info_button_observer()
}