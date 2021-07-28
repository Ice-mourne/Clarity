/*
;(() => {
    fetch('https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/', {
        method: 'GET',
        mode: 'cors',
        headers: {'X-API-Key': '2b16c291fcff48cbac86bd5f1d0bbc9d', 'Authorization': `Bearer ${local_get('authorization').accessToken.value}`}
    })
    .then(u => u.json())
    .then(data => {
        let user_info = {'platform': data.Response.destinyMemberships[0].LastSeenDisplayNameType, 'id': data.Response.destinyMemberships[0].membershipId}
        localStorage.setItem('clarity_user', JSON.stringify(user_info))
    })
})()
;(() => { // - - checks if database needs updating
    fetch(`https://ice-mourne.github.io/Clarity-A-DIM-Companion-json/version/?${Math.random()}`)
    .then(resp => resp.json())
    .then(json_version => {
        let dim_local        = localStorage.getItem('d2-manifest-version')
        let clarity_local    = local_get('clarity_info')
        let clarity_inv_item = local_get('clarity_inventory_item')
        let check_if_data_present = dim_local && clarity_local && json_version && clarity_inv_item
        if (check_if_data_present && dim_local != clarity_local.manifest_version && clarity_local.json_version != json_version.version) {
            localStorage.setItem('clarity_info', JSON.stringify({'json_version': json_version.version, 'manifest_version': manifest_version}))
            update_clarity_inventory_item()
        } else {console.log('-  -  Clarity DIM companion  -  - > Clarity inventory item already up to date'); get_manifest()}
    })
})()
function get_manifest() {  // - - Get data from indexedDB
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
                filter_inventory_item(stat_group, inventory_bucket, socket_category, plug_set, damage_type_list, inventory_item, formulas, armor_perks, weapon_perks)
            }) 
        }
    }
}
*/
//-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -

Promise.all([
    fetch(`https://ice-mourne.github.io/Clarity-A-DIM-Companion-json/weapon_formulas/?${Math.random()}`) // 0
    .then(resp => resp.json()),
    fetch(`https://ice-mourne.github.io/Clarity-A-DIM-Companion-json/exotic_armor_perks/?${Math.random()}`) // 1
    .then(resp => resp.json()),
    fetch(`https://ice-mourne.github.io/Clarity-A-DIM-Companion-json/weapon_perks/?${Math.random()}`) // 2
    .then(resp => resp.json()),
    fetch(`https://api.npoint.io/d65cad7674a67c509fd8/?${Math.random()}`) // 3
    .then(resp => resp.json()),
    fetch(`https://www.bungie.net/common/destiny2_content/json/en/DestinyInventoryItemDefinition-1a7d8d39-ca62-40af-becd-98bca27ed617.json`) // 4
    .then(resp => resp.json()),
    fetch(`https://www.bungie.net/common/destiny2_content/json/en/DestinyStatGroupDefinition-1a7d8d39-ca62-40af-becd-98bca27ed617.json`) // 5
    .then(resp => resp.json()),
    fetch(`https://www.bungie.net/common/destiny2_content/json/en/DestinyStatDefinition-1a7d8d39-ca62-40af-becd-98bca27ed617.json`) // 6 stat names
    .then(resp => resp.json())
])
.then(json_data => {
    let formulas = json_data[0]
    let armor_perks = json_data[1]
    let weapon_perks = json_data[2]
    let user_data = json_data[3]
    let inventory_item = json_data[4]
    let stat_group = json_data[5]
    let stat_names = json_data[6]
    //filter_inventory_item(stat_group, inventory_bucket, socket_category, plug_set, damage_type_list, inventory_item, formulas, armor_perks, weapon_perks)
    filter_inventory_item(user_data, inventory_item, stat_group, stat_names)
}) 
function stat_calculator(investment_stat, stat_group, id) {
    let inv_stat = Math.min(Math.max(investment_stat, 0), 100) // min max to keep values in range of possible
    if (id == 1345609583 || id == 2715839340 || id == 3555269338) return inv_stat // final stat is investment stat
    if (id == 1240592695 || id == 4188031367 || id == 155624089 || id == 2837207746 || id == 2523465841) return 10 + inv_stat * 0.9 // easy calculation
    if (stat_group && id != 1931675084){ // its inventory size id no clue what to do with it
        let end_index = stat_group.findIndex(x => x.value >= inv_stat)
        if (stat_group.length > 1){
            let start = (end_index == 0) ? stat_group[0] : stat_group[end_index - 1]
            let end   = (end_index <= 1) ? stat_group[1] : stat_group[end_index]
            let t = (inv_stat - start.value) / (end.value - start.value)
            return start.weight + t * (end.weight - start.weight)
        }
        if (stat_group.length == 1) return stat_group[0].weight + (inv_stat - stat_group[0].value)
    }
}
//-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
function filter_inventory_item(user_data, inventory_item, stat_group, stat_names) {
    let start = new Date().getTime();
    //  🡳 🡳  - - - - - - - - - get unique item id's and id's of all items user has and store in item_ids array
    let items = []
    items = user_data.Response.profileInventory.data.items
    Object.entries(user_data.Response.characterInventories.data).forEach(element => { items = items.concat(element[1].items) })
    Object.entries(user_data.Response.characterEquipment  .data).forEach(element => { items = items.concat(element[1].items) })
    let item_ids = []
    for (let i = 0; i < items.length; i++) {
        if (items[i].itemInstanceId && (inventory_item[items[i].itemHash].itemType == 3 || inventory_item[items[i].itemHash].itemType == 2)) { // if has instanced id and is weapon or armor
            let x = []
            x.push(items[i].itemInstanceId)
            x.push(items[i].itemHash)
            item_ids.push(x)
        }
    } //  🡱 🡱  - - - - - - - - - get unique item id's and id's of all items user has and store in item_ids array



    
    for (let i = 0; i < 1; i++) { // item_ids.length
        const unique_id = item_ids[i][0]
        const static_id = item_ids[i][1]
        let final_weapon_info = {
            'calculated_stats': convert_final_stat(get_item_investment_stats(unique_id, static_id), static_id)
        }
        console.log(static_id);
        console.log(final_weapon_info);
    }

    
    console.log(item_ids.length);


    function get_item_investment_stats(unique_id, static_id) {
        let investment_stats = {}
        for (let i = 0; i < user_data.Response.itemComponents.sockets.data[unique_id].sockets.length; i++) { // gets investment stats from perks
            const perk = user_data.Response.itemComponents.sockets.data[unique_id].sockets[i]
            if (perk.isEnabled && perk.isVisible && perk.plugHash != 3511092054) { // exception for elemental capacitor
                for (let y = 0; y < inventory_item[perk.plugHash].investmentStats.length; y++) {
                    const perk_investment_stat = inventory_item[perk.plugHash].investmentStats[y];
                    if(investment_stats[perk_investment_stat.statTypeHash]) { // if stat exists add to stats value otherwise create stat with value
                        investment_stats[perk_investment_stat.statTypeHash] += perk_investment_stat.value
                    } else {
                        investment_stats[perk_investment_stat.statTypeHash] = perk_investment_stat.value
                    }
                }
            }
        }
        for (let i = 0; i < inventory_item[static_id].investmentStats.length; i++) { // gets investment stats from weapon
            const weapon_investment_stat = inventory_item[static_id].investmentStats[i];
            if(investment_stats[weapon_investment_stat.statTypeHash]) { // if stat exists add to stats value otherwise create stat with value
                investment_stats[weapon_investment_stat.statTypeHash] += weapon_investment_stat.value
            } else {
                investment_stats[weapon_investment_stat.statTypeHash] = weapon_investment_stat.value
            }
        }
        return filtered_inv_stats = Object.entries(investment_stats).filter(x => x[0] != 1885944937 && x[0] != 1935470627 && x[0] != 1480404414 && x[0] != 3291498656) // filter out bad stats like power or nameless
    }
    function convert_final_stat(stats_array, static_id) {
        console.log(stats_array);
        let calculated_stat = {}
        for (let i = 0; i < stats_array.length; i++) { // stats_array.length;
            const stat_id    = stats_array[i][0]
            const stat_value = stats_array[i][1]
            const weapon_stat_group = stat_group[inventory_item[static_id].stats.statGroupHash].scaledStats.find(x => x.statHash == stat_id)
            calculated_stat[stat_names[stat_id].displayProperties.name] = stat_calculator(stat_value, weapon_stat_group.displayInterpolation, stat_id)

            // console.log(weapon_stat_group);
            // let x = stat_calculator(stat_value, weapon_stat_group.displayInterpolation, stat_id)
            // console.log(x);
        }
        return calculated_stat
    }










    console.log(new Date().getTime() - start);
}












