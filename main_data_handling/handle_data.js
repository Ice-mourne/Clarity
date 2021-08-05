;( () => {    
    let dim_url = document.querySelector('body').baseURI
    let version = dim_url.slice(8, dim_url.search('.destiny'))
    fetch(`https://ice-mourne.github.io/Database-for-Clarity/Database/locations.json?${Math.random()}`)
    .then(resp => resp.json())
    .then(data => localStorage.setItem('clarity_locations', JSON.stringify(data[version])))
}) ()
if (local_get('clarity_user') && local_get('clarity_authorization')) work_on_item_info() // if data required is present update item info // this runs on startup
function work_on_item_info() {
    let nr = local_get('clarity_settings').version
    Promise.all([
        fetch(`https://ice-mourne.github.io/Clarity-A-DIM-Companion-json/weapon_formulas/?${Math.random()}`) // 0
        .then(resp => resp.json()),
        fetch(`https://ice-mourne.github.io/Clarity-A-DIM-Companion-json/exotic_armor_perks/?${Math.random()}`) // 1
        .then(resp => resp.json()),
        fetch(`https://ice-mourne.github.io/Clarity-A-DIM-Companion-json/weapon_perks/?${Math.random()}`) // 2
        .then(resp => resp.json()),
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        fetch(`https://www.bungie.net/Platform/Destiny2/${local_get('clarity_user').platform}/Profile/${local_get('clarity_user').id}/?components=102,201,205,304,305,310`, {
            method: 'GET',
            mode: 'cors', // if you digging hare looking for API key or something DM me and i will help you get one and explain how to use it
            headers: { 'X-API-Key': atob(nr.k), 'Authorization': 'Bearer ' + local_get('clarity_authorization').access_token }
        })
        .then(u => u.json()),
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        get_from_indexedDB('keyval-store', 'keyval', 'd2-manifest') // 4 - d2 manifest
        .then(resp => resp)
    ])
    .then(json_data => {
        let wep_formulas        = json_data[0]
        let exotic_armor_perks  = json_data[1]
        let wep_perks           = json_data[2]
        let user_data           = json_data[3]
    
        let manifest = [
            json_data[4].DestinyInventoryItemDefinition,
            json_data[4].DestinyStatGroupDefinition,
            json_data[4].DestinyStatDefinition,
            json_data[4].DestinyItemCategoryDefinition,
            json_data[4].DestinyDamageTypeDefinition,
            json_data[4].DestinyPlugSetDefinition
        ]
        filter_inventory_item(user_data, ...manifest, /**/ wep_formulas, exotic_armor_perks, wep_perks)
    })
}
function filter_inventory_item(user_data, inventory_item, stat_group, stat_names, item_category, damage_type_json, plug_set, /**/ wep_formulas, exotic_armor_perks, wep_perks) {
    console.time('timer')
    let item_ids = find_item_ids(user_data, inventory_item)
    let new_item_list = {}
    for (let i = 0; i < item_ids.length; i++) {
        const unique_id = item_ids[i][0]
        const item = inventory_item[item_ids[i][1]]
        if (item_ids[i][2] == 3) {
            new_item_list[unique_id] = {
                // update key on startup not only on window change
                'name':        item.displayProperties.name,
                'icon':        item.displayProperties.icon.replace('/common/destiny2_content/icons/', ''),
                'type':        item.itemTypeDisplayName, // hand cannon, sniper, shotgun...
                'ammo':        ammo(item), // primary, special, heavy...
                'slot':        item_category[ item.itemCategoryHashes[0] ].shortTitle, // kinetic, energy, power...
                'damage_type': damage_type_json[ item.defaultDamageTypeHash ].displayProperties.name, // arch, solar, void...
                'item_type':   'weapon',
                'perks':       perks(item, unique_id, user_data),
                'stats':       stats(unique_id, item),
            }
        } else {
            new_item_list[unique_id] = {
                'name': item.displayProperties.name,
                'icon': item.displayProperties.icon.replace('/common/destiny2_content/icons/', ''),
                'perk':armor_perks(item),
                'item_type': 'armor',
                'tier': item.inventory.tierTypeName
            }
        }
    }
    function armor_perks(item) {
        if(item.inventory.tierTypeName == 'Exotic') {
            let perk_id = item.sockets.socketEntries.find(x => x.socketTypeHash == 1486702312 || x.socketTypeHash == 965959289).singleInitialItemHash
            let info = {
                'description': get_description(),
                'name': inventory_item[perk_id].displayProperties.name,
                'icon': inventory_item[perk_id].displayProperties.icon.replace('/common/destiny2_content/icons/', ''),
            }
            function get_description() {
                if(exotic_armor_perks[inventory_item[perk_id].displayProperties.name]) {
                    return exotic_armor_perks[inventory_item[perk_id].displayProperties.name]
                } else {
                    return `<div class="new_pd">${inventory_item[perk_id].displayProperties.description}</div>`
                }
            }
            return info
        }
    }
    function ammo(data) { // ammo type
        switch (data.equippingBlock.ammoType) {
            case 1:
                return 'primary'
            case 2:
                return 'special'
            case 3:
                return 'heavy'
        }
    }
    function perks(item, unique_id, user_data) {
        return {
            'active_perks': active_perks(),
            'perks': all_perks()
        }
        function active_perks() {
            //           Arrow,      Barrel,     Battery,    Blade,      Bowstring,  Grip,       Guard,     Launcher Barrel, Magazine,   Scope,      Stock,     Trait    Magazine gl
            let perks = [1257608559, 2833605196, 1757026848, 1041766312, 3809303875, 3962145884, 683359327, 1202604782,      1806783418, 2619833294, 577918720, 7906839, 2718120384]
            return user_data.Response.itemComponents.sockets.data[unique_id].sockets
                .filter(active_perk => active_perk.plugHash != undefined && perks.indexOf(inventory_item[active_perk.plugHash].plug.plugCategoryHash) > -1)
                .map(active_perk => active_perk.plugHash)
        }
        function all_perks() {
            let all_perks = []
            let random_perks = user_data.Response.itemComponents.reusablePlugs.data[unique_id]
            item.sockets.socketCategories.find(x => x.socketCategoryHash == 4241085061).socketIndexes
                .filter(x => x < 6)
                .forEach(get_perk_ids) // possible indexes 1,2,3,4, 8,9 only 1-4 used
            return all_perks
            function get_perk_ids(index) {
                let perk_list = []
                if (random_perks && random_perks.plugs[1]) {
                    try {
                        random_perks.plugs[index].forEach(perk => perk_list.push(get_perk_info(perk.plugItemHash, index)))
                    } catch  { // bungie fuck up and Hawkmoon and Quickfang don't have index 2 this will take perk info from manifest
                        let reusable_plug_set_id = item.sockets.socketEntries[index].reusablePlugSetHash
                        plug_set[reusable_plug_set_id].reusablePlugItems.forEach(perk => perk_list.push(get_perk_info(perk.plugItemHash, index)))
                    }
                } else {
                    let reusable_plug_set_id = item.sockets.socketEntries[index].reusablePlugSetHash
                    let reusable_plug_items  = item.sockets.socketEntries[index].reusablePlugItems
                    if (reusable_plug_set_id) { // in some cases items socket 4 doesn't have plug set hash example Ticuu's Divination
                        plug_set[reusable_plug_set_id].reusablePlugItems.forEach(perk => perk_list.push(get_perk_info(perk.plugItemHash, index)))
                    } else if (reusable_plug_items) {
                        reusable_plug_items.forEach(perk => perk_list.push(get_perk_info(perk.plugItemHash, index)))
                    }
                }
                if (perk_list.length != 0) all_perks.push(perk_list)
            }
            function get_perk_info(perk_id, index) {
                const perk = inventory_item[perk_id]
                return {
                    'id':          perk_id,
                    'name':        perk.displayProperties.name,
                    'icon':        perk.displayProperties.icon.replace('/common/destiny2_content/icons/', ''),
                    'description': build_description(perk_id, item, unique_id, user_data, index)
                }
            }
        }
    }
    function build_description(perk_id, item, unique_id, user_data, index) {
        const perk_info_json = wep_perks[perk_id]
        const formula = get_formula(item, wep_formulas)
        const weapon_stat_group = get_stat_group(item, stat_group)
        const investment_stats = get_item_investment_stats(unique_id, item.hash, user_data, inventory_item)
        let description = ''
        if (perk_info_json) { // adds stat number to description
            description = perk_info_json.text
            let min_max = (number) => Math.min(Math.max(number, 10), 100)
            if (perk_info_json.range_stat) {
                for (let i = 0; i < perk_info_json.range_stat.length; i++) {
                    let range_stat    = stat_calculator(investment_stats[1240592695], weapon_stat_group[1240592695], 1240592695)
                    let zoom_stat     = stat_calculator(investment_stats[3555269338], weapon_stat_group[3555269338], 3555269338)
                    let range_default = range_calculator(formula, range_stat, zoom_stat, 1)
                    let range_mod     = range_calculator(formula, min_max(range_stat + perk_info_json.range_stat[i]), zoom_stat + perk_info_json.zoom[i], perk_info_json.zoom_mult[i])

                    let range = range_mod - range_default
                    let final_range = (range > 0) ? `+${range}` : range

                    description = description.replace(`range_${i}`, `${(final_range * 1).toFixed(2)}m`)
                    if(final_range == 'NaN') description = perk_info_json.text_fallback
                }
            }
            if (perk_info_json.reload_stat) {
                for (let i = 0; i < perk_info_json.reload_stat.length; i++) {
                    let reload_stat = stat_calculator(investment_stats[4188031367], weapon_stat_group[4188031367], 4188031367)
                    let reload_time_default = reload_calculator(formula, reload_stat, 1) * 1
                    let reload_time_mod = reload_calculator(formula, min_max(reload_stat + perk_info_json.reload_stat[i]), 1) * 1
    
                    description = description.replace(`relo_t_${i}`, `${reload_time_mod.toFixed(2)}s`)
                    description = description.replace(`relo_r_${i}`, `${(reload_time_mod - reload_time_default).toFixed(2)}s`)
                }
            }
        } else { // if perk doesn't have custom description just add default
            if (inventory_item[perk_id].investmentStats.length == 0) { // except for perks with stats
                description = `<div class='new_pd'>${inventory_item[perk_id].displayProperties.description}</div>`
            }
        }
        if (inventory_item[perk_id].investmentStats.length != 0) {
            let active_perk_id = user_data.Response.itemComponents.sockets.data[unique_id].sockets[index].plugHash // active perk in this group
            let new_inv_stats = {...investment_stats} // investment stats with out active perk
            inventory_item[active_perk_id].investmentStats.forEach(stat => new_inv_stats[stat.statTypeHash] -= stat.value) // remove active perk stats
            
            let stat_list = `<table class="Clarity_weapon_stats"><tbody>`
            let check = true // sets to false if range was added to prevent adding multiple times incase perks has zoom and range stat
            inventory_item[perk_id].investmentStats.forEach(stat => {
                const stat_id = stat.statTypeHash
                let with_perk = stat_calculator(new_inv_stats[stat_id] + stat.value, weapon_stat_group[stat_id], stat.statTypeHash)
                let with_out_perk = stat_calculator(new_inv_stats[stat_id], weapon_stat_group[stat_id], stat.statTypeHash)
                let value = Math.round((with_perk - with_out_perk) * 10 ) / 10
                let final_value = (value > 0) ? `+${value}` : value
                if (value) {
                    let name = stat_names[stat_id].displayProperties.name
                    stat_list += `<tr><th>${final_value}</th><td>${name}</td></tr>`
                }
                if (check && (stat_id == 1240592695 || stat_id == 3555269338)) { // if range or zoom stat
                    let range_stat = {
                        'perk': with_perk,
                        'default': with_out_perk
                    }
                    let zoom_stat = {
                        'perk': stat_calculator(investment_stats[3555269338], weapon_stat_group[3555269338], 3555269338),
                        'default': stat_calculator(new_inv_stats[3555269338], new_inv_stats[3555269338], 3555269338)
                    }
                    let range = {
                        'perk': range_calculator(formula, range_stat.perk, zoom_stat.perk, 1),
                        'default': range_calculator(formula, range_stat.default, zoom_stat.default, 1)
                    }
                    let final_range = (range.perk - range.default > 0) ? `+${(range.perk - range.default).toFixed(2)}` : (range.perk - range.default).toFixed(2)
                    if (final_range != 0) {
                        stat_list += `<tr><th>${final_range}m</th><td>Range meters</td></tr>`
                        check = false
                    }
                }
                if (stat_id == 4188031367) { // if reload stat
                    let reload_stat = {
                        'perk': with_perk,
                        'default': with_out_perk
                    }
                    let reload = {
                        'perk': reload_calculator(formula, reload_stat.perk, 1),
                        'default': reload_calculator(formula, reload_stat.default, 1)
                    }
                    let final_reload = (reload.perk - reload.default > 0) ? `+${(reload.perk - reload.default).toFixed(2)}` : (reload.perk - reload.default).toFixed(2)
                    stat_list += `<tr><th>${final_reload}s</th><td>Reload time</td></tr>`
                }
            })
            stat_list += `</tbody></table>`
            description += stat_list
        }
        return description
    }
    function stats(unique_id, item) { // add in game range and reload
        let final_stats = {}
        let investment_stats = get_item_investment_stats(unique_id, item.hash, user_data, inventory_item)
        let weapon_stat_group = {}
        stat_group[item.stats.statGroupHash].scaledStats.map(stat_array => {weapon_stat_group[stat_array.statHash] = stat_array.displayInterpolation})
        if (user_data.Response.itemComponents.sockets.data[unique_id].sockets.findIndex(x => x.plugHash == 3511092054) != -1) { // if item has elemental capacitor then add stats
            let elemental_cap = {}
            let inv_stats_array = Object.entries(investment_stats)
            for (let i = 0; i < inv_stats_array.length; i++) { // loop over investment stats
                const id = inv_stats_array[i][0]
                const stat = inv_stats_array[i][1]
                elemental_cap[id] = stat_calculator(stat, weapon_stat_group[id], id)
            }
            final_stats['elemental_cap'] = elemental_cap
        }
        const formula = get_formula(item, wep_formulas)
        if (formula) {
            let extra_stats = []
            if (formula.vpp) {
                let perk_with_multi = user_data.Response.itemComponents.sockets.data[unique_id].sockets.findIndex(perk => perk.plugHash == 2846385770 || perk.plugHash == 1140096971)
                let zoom_multi = (perk_with_multi != -1) ? 1.1 : 1
                let range_stat     = stat_calculator(investment_stats[1240592695], weapon_stat_group[1240592695], 1240592695)
                let zoom_stat      = stat_calculator(investment_stats[3555269338], weapon_stat_group[3555269338], 3555269338)
                let range_distance = range_calculator(formula, range_stat, zoom_stat, zoom_multi)
                extra_stats.push({'name': 'Range', 'value': range_distance, 'letter': 'm'})
            }
            if (formula.a) {
                let reload_stat = stat_calculator(investment_stats[4188031367], weapon_stat_group[4188031367], 4188031367)
                let reload_time = reload_calculator(formula, reload_stat, 1)
                extra_stats.push({'name': 'Reload', 'value': reload_time, 'letter': 's'})
            }
            final_stats['extra_stats'] = extra_stats
        }
        return final_stats
    }
    localStorage.setItem('clarity_data', JSON.stringify(new_item_list))
    console.timeEnd('timer')
}