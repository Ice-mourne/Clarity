;(() => {
    let dim_url = document.querySelector('body').baseURI
    let version = dim_url.slice(8, dim_url.search('.destiny'))
    fetch(`https://ice-mourne.github.io/Database-for-Clarity/Database/locations.json?${Math.random()}`)
    .then(resp => resp.json())
    .then(data => local_storage('clarity_locations', data[version]))
    .then(() => window.dispatchEvent(new Event('storage')))
})()
if (local_storage('clarity_user') && local_storage('clarity_authorization')) work_on_item_info() // if data required is present update item info // this runs on startup
function work_on_item_info() {
    let nr = local_storage('clarity_settings').version
    Promise.all([
        fetch(`https://ice-mourne.github.io/Database-for-Clarity/Database/weapon_formulas.json?${Math.random()}`) // 0
        .then(resp => resp.json()),
        fetch(`https://ice-mourne.github.io/Clarity-A-DIM-Companion-json/exotic_armor_perks/?${Math.random()}`) // 1
        .then(resp => resp.json()),
        fetch(`https://ice-mourne.github.io/Database-for-Clarity/Database/weapon_perks.json?${Math.random()}`) // 2
        .then(resp => resp.json()),
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        fetch(`https://www.bungie.net/Platform/Destiny2/${local_storage('clarity_user').platform}/Profile/${local_storage('clarity_user').id}/?components=102,201,205,304,305,310`, {
            method: 'GET',
            mode: 'cors', // if you digging hare looking for API key or something DM me and i will help you get one and explain how to use it
            headers: {
                'X-API-Key': atob(nr.k),
                'Authorization': `Bearer ${local_storage('clarity_authorization').access_token}`
            }
        })
        .then(u => u.json()),
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        indexed_DB('keyval-store', 'keyval', 'd2-manifest') // 4 - d2 manifest
        .then(resp => resp)
    ])
    .then(json_data => {
        let wep_formulas = json_data[0]
        let exotic_armor_perks = json_data[1]
        let wep_perks = json_data[2]
        let user_data = json_data[3].Response

        let manifest = [
            json_data[4].DestinyInventoryItemDefinition, // 0 inventory_item
            json_data[4].DestinyStatGroupDefinition, // 1 stat_group
            json_data[4].DestinyStatDefinition, // 2 stat_names
            json_data[4].DestinyItemCategoryDefinition, // 3 item_category
            json_data[4].DestinyDamageTypeDefinition, // 4 damage_type
            json_data[4].DestinyPlugSetDefinition // 5 plug_sets
        ]
        filter_inventory_item(user_data, manifest, /**/ wep_formulas, exotic_armor_perks, wep_perks)
    })
}

function filter_inventory_item(user_data, manifest, /**/ wep_formulas, exotic_armor_perks, wep_perks) {
    console.time('timer') // checking how long it takes to get all data reformated
    const json = {
        'inventory_item': manifest[0],
        'item_category': manifest[3],
        'damage_type': manifest[4],
    }
    let item_ids = find_item_ids(user_data, json.inventory_item)
    let new_item_list = {}
    for (let i = 0; i < item_ids.length; i++) {
        const unique_id = item_ids[i][0]
        const item = json.inventory_item[item_ids[i][1]]
        if (item_ids[i][2] == 3) { // if item type is weapon
            new_item_list[unique_id] = make_new_weapon(unique_id, item)
        } // else
        // if (item_ids[i][2] == 2 && item.inventory.tierTypeName == 'Exotic') { // if item type is armor and exotic
        //     new_item_list[unique_id] = make_new_armor(unique_id, item)
        // }
    }
    function make_new_weapon(unique_id, item) {
        let weapon_data = new Weapon_constructor(user_data, manifest, /**/ wep_formulas, wep_perks, unique_id, item)
        return {
            'name': item.displayProperties.name,
            'icon': item.displayProperties.icon.replace('/common/destiny2_content/icons/', ''),
            'type': item.itemTypeDisplayName, // hand cannon, sniper, shotgun...
            'ammo': weapon_data.ammo_type(), // primary, special, heavy...
            'slot': json.item_category[item.itemCategoryHashes[0]].shortTitle, // kinetic, energy, power...
            'damage_type': json.damage_type[item.defaultDamageTypeHash].displayProperties.name, // arch, solar, void...
            'item_type': 'weapon',
            'perks': {
                'active_perks': weapon_data.active_perks(),
                'perks': weapon_data.all_perks()
            },
            //'stats': weapon_filter.stats(),
        }
    }
    function make_new_armor(item) {
        return {
            'name': item.displayProperties.name,
            'icon': item.displayProperties.icon.replace('/common/destiny2_content/icons/', ''),
            'perk': new Filter_armor.armor_perks(item, inventory_item, exotic_armor_perks),
            'item_type': 'armor',
            'tier': item.inventory.tierTypeName
        }
    }
}
class Weapon_constructor {
    constructor(user_data, manifest, /**/ wep_formulas, wep_perks, unique_id, item) {
        this.user_data = user_data
        this.inventory_item = manifest[0]
        this.plug_set = manifest[5]
        this.unique_id = unique_id
        this.item = item

        this.perk_types = [
            1257608559, // Arrow
            2833605196, // Barrel
            1757026848, // Battery
            1041766312, // Blade
            3809303875, // Bowstring
            3962145884, // Grip
            683359327,  // Guard
            1202604782, // Launcher Barrel
            1806783418, // Magazine
            2619833294, // Scope
            577918720,  // Stock
            7906839,    // Trait
            2718120384  // Magazine gl
        ]
        this.data_for_descriptions = [
            manifest,
            wep_formulas,
            user_data,
            unique_id,
            item,
            wep_perks,
            this.active_perk_list
        ]
    }
    ammo_type() { // ammo type
        switch (this.item.equippingBlock.ammoType) {
            case 1:
                return 'primary'
            case 2:
                return 'special'
            case 3:
                return 'heavy'
        }
    }
    all_perks() { // makes array with arrays holding perk id's
        let completed_list = this.item.sockets.socketCategories
        .find(x => x.socketCategoryHash == 4241085061).socketIndexes
        .map(index => this.find_perk_ids(index)) // find perk sockets and loop over them
        return completed_list
    }
    find_perk_ids(index) {
        let random_perks = this.user_data.itemComponents.reusablePlugs.data[this.unique_id] // random perk array from user data
        let perk_list = []
        if (random_perks?.plugs[index]) { // check if weapon has random perks
            perk_list = random_perks.plugs[index]
        } else { // if no random perks get static perks
            let reusable_plug_set_id = this.item.sockets.socketEntries[index].reusablePlugSetHash
            let reusable_plug_items = this.item.sockets.socketEntries[index].reusablePlugItems
            if (reusable_plug_set_id) {
                perk_list = this.plug_set[reusable_plug_set_id].reusablePlugItems
            } else if (reusable_plug_items) {
                perk_list = reusable_plug_items
            }
        }
        return perk_list
        .map(perk => {
            if (this.perk_types.includes(this.inventory_item[perk.plugItemHash].plug.plugCategoryHash)) return perk.plugItemHash
        })
        .filter(perk_ids => perk_ids != undefined)
        .map(perk_id => this.get_perk_description(perk_id, index))
    }
    get_perk_description(perk_id, index) {
        let description = new Description_maker(this.data_for_descriptions, perk_id, index)
        let perk = this.inventory_item[perk_id]
        return {
            'id': perk_id,
            'name': perk.displayProperties.name,
            'icon': perk.displayProperties.icon.replace('/common/destiny2_content/icons/', ''),
            'description': description.build()
        }
    }
    active_perks() {
        let active_perk_list = this.user_data.itemComponents.sockets.data[this.unique_id].sockets
        .map(perk => {
            if (!perk.isEnabled && !perk.isVisible) return
            if (this.perk_types.includes(this.inventory_item[perk.plugHash].plug.plugCategoryHash)) return perk.plugHash
        })
        .filter(perk_ids => perk_ids != undefined)
        this.active_perk_list = active_perk_list
    }
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
class Description_maker {
    constructor(data_array, perk_id, index) {
        const data = {
            'manifest':   data_array[0],
            'stat_group': data_array[1],
            'user_data':  data_array[2],
            'unique_id':  data_array[3],
            'item':       data_array[4],
        }

        this.perk_id = perk_id // used
        this.index   = index

        this.inventory_item = data.manifest[0] // used
        this.stat_group     = data.manifest[1] // used
        this.stat_names     = data.manifest[2]
        this.damage_type    = data.manifest[4]

        this.formula   = get_formula(data.item, data.stat_group) // [4] this weapon [1] all formulas
        this.inv_stats = get_item_investment_stats(data.unique_id, data.item.hash, data.user_data, this.inventory_item)
        this.perk_info = data_array[5][perk_id]
    }
    build() {
        let description
        if (this.perk_info) {
            if (this.perk_info.range    && this.formula.range)    this.range()
            // if (this.perk_info.reload   && this.formula.reload)   new_description.reload()
            // if (this.perk_info.handling && this.formula.handling) new_description.handling() // TODO: add handling
            description = this.complete()
        } else { // if perk doesn't have custom description just add default
            if (this.inventory_item[this.perk_id].investmentStats.length == 0) { // except for perks with stats
                description = `<div class='new_pd'>${this.inventory_item[this.perk_id].displayProperties.description}</div>`
            }
        }
        // this deals with perk stats only
        // if (inventory_item[perk_id].investmentStats.length != 0) description = add_perk_stats()
    }
    range() {
        let range_id = 1240592695
        let zoom_id  = 3555269338
        let perk_inv_stats = { // find perk investment stat
            'range': this.inventory_item[this.perk_id].investmentStats.find(stat => {stat.statTypeHash == range_id; return stat.value}),
            'zoom':  this.inventory_item[this.perk_id].investmentStats.find(stat => {stat.statTypeHash == zoom_id;  return stat.value}),
        }
        let inv_stats = {
            'range': this.inv_stats[range_id] - (perk_inv_stats.range != -1) ? perk_inv_stats.range : 0,
            'zoom':  this.inv_stats[zoom_id]  - (perk_inv_stats.zoom  != -1) ? perk_inv_stats.zoom  : 0,
        }
        let stat_group = {
            'range': this.stat_group[range_id],
            'zoom':  this.stat_group[zoom_id],
        }
        let perk_with_range_multiplier = this.active_perks.find(perk_id => description[perk_id].range.normal?.multiplayer) // look for perk with range multiplayer
        let default_stats = {
            'range': stat_calculator(inv_stats.range, stat_group.range, range_stat_id),
            'zoom': stat_calculator( inv_stats.zoom,  stat_group.zoom,  zoom_stat_id),
            'multiplayer': (perk_with_range_multiplier) ? description[perk_with_range_multiplier].range.normal.multiplayer : 1, // if perk with multiplayer exists get multiplayer otherwise set to 1
        }
        let conditional_stats = {
            'loop':        this.description.range.conditional?.loop, // number in database determining how many placeholders where are
            'range':       this.description.range.conditional?.stat,
            'multiplayer': this.description.range.conditional?.multiplayer,
        }
        let default_range = range_calculator(default_stats.range, default_stats.zoom, this.formula, default_stats.multiplayer).ADS_min
        for (let i = 0; i < conditional_stats.loop; i++) {
            let min_max = number => Math.min(Math.max(number, 10), 100)
            let modded_stats = {
                'range':       default_stats.range       + (conditional_stats.range[i])       ? conditional_stats.range[i]       : 0,
                'zoom':        default_stats.zoom_stat   + (conditional_stats.zoom[i])        ? conditional_stats.zoom[i]        : 0,
                'multiplayer': default_stats.multiplayer + (conditional_stats.multiplayer[i]) ? conditional_stats.multiplayer[i] : 0,
            }
            let modded_range = range_calculator(min_max(modded_stats.range), modded_stats.zoom, this.formula, modded_stats.multiplayer).ADS_min
            let range_difference = (modded_range - default_range).toFixed(2)
            let completed_range = (range_difference > 0) ? `+${range_difference}` : range_difference // if stat is positive adds + otherwise leaves as it is

            this.new_description = this.new_description.replace(`range_${i}`, `${completed_range}m`)
        }
    }
    reload() {

    }
    handling() {

    }
    complete() {
        return this.new_description
    }
}


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------





//function filter_inventory_item(user_data, manifest, /**/ wep_formulas, exotic_armor_perks, wep_perks) {
/*    console.time('timer')
    const json = {
        'inventory_item': manifest[0],
        'item_category': manifest[3],
        'damage_type_json': manifest[4],
    }
    let item_ids = find_item_ids(user_data, json.inventory_item)
    let new_item_list = {}
    for (let i = 0; i < item_ids.length; i++) {
        const unique_id = item_ids[i][0]
        const item = json.inventory_item[item_ids[i][1]]
        if (item_ids[i][2] == 3) { // if item type is weapon
            new_item_list[unique_id] = {
                // update key on startup not only on window change
                'name': item.displayProperties.name,
                'icon': item.displayProperties.icon.replace('/common/destiny2_content/icons/', ''),
                'type': item.itemTypeDisplayName, // hand cannon, sniper, shotgun...
                'ammo': ammo_type(item), // primary, special, heavy...
                'slot': json.item_category[item.itemCategoryHashes[0]].shortTitle, // kinetic, energy, power...
                'damage_type': json.damage_type[item.defaultDamageTypeHash].displayProperties.name, // arch, solar, void...
                'item_type': 'weapon',
                'perks': {
                    'active_perks': get_active_perks(user_data, json.inventory_item, unique_id),
                    'perks': get_all_perks(item, unique_id)
                },
                'stats': weapon_filter.stats(),
            }
            return
        }
        if (item_ids[i][2] == 2 && item.inventory.tierTypeName == 'Exotic') { // if item type is armor and exotic
            new_item_list[unique_id] = {
                'name': item.displayProperties.name,
                'icon': item.displayProperties.icon.replace('/common/destiny2_content/icons/', ''),
                'perk': new Filter_armor.armor_perks(item, inventory_item, exotic_armor_perks),
                'item_type': 'armor',
                'tier': item.inventory.tierTypeName
            }
        }
    }

    function ammo_type(item) { // ammo type
        switch (item.equippingBlock.ammoType) {
            case 1:
                return 'primary'
            case 2:
                return 'special'
            case 3:
                return 'heavy'
        }
    }

    function get_all_perks(item, unique_id) { // makes array with arrays holding perk id's
        item.sockets.socketCategories.find(x => x.socketCategoryHash == 4241085061).socketIndexes.forEach(find_perk_ids) // for each socked index
        let random_perks = user_data.Response.itemComponents.reusablePlugs.data[unique_id]
        all_perks_with_descriptions = []

        function find_perk_ids(index) {
            let perk_list = []
            if (random_perks?.plugs[index]) { // check if weapon has random perks
                random_perks.plugs[index].forEach(perk_id => perk_list.push(get_perk_info(perk_id, item, unique_id, index)))
            } else { // if no random perks get static perks
                let reusable_plug_set_id = item.sockets.socketEntries[index].reusablePlugSetHash
                let reusable_plug_items = item.sockets.socketEntries[index].reusablePlugItems
                if (reusable_plug_set_id) {
                    json.plug_set[reusable_plug_set_id].reusablePlugItems.forEach(perk_id => perk_list.push(get_perk_info(perk_id, item, unique_id, index)))
                } else if (reusable_plug_items) {
                    reusable_plug_items.forEach(perk_id => perk_list.push(get_perk_info(perk_id, item, unique_id, index)))
                }
            }
            let perk_types = [
                1257608559, // Arrow
                2833605196, // Barrel
                1757026848, // Battery
                1041766312, // Blade
                3809303875, // Bowstring
                3962145884, // Grip
                683359327,  // Guard
                1202604782, // Launcher Barrel
                1806783418, // Magazine
                2619833294, // Scope
                577918720,  // Stock
                7906839,    // Trait
                2718120384  // Magazine gl
            ]
            perk_list.filter(perk_id => json.inventory_item[perk_id].plug.plugCategoryHash.indexOf(x => x == perk_types) != -1) // get rid of trash pretending to be perk
            all_perks_ids.push(perk_list)
        }
        return all_perks_with_descriptions
    }

    function get_perk_info(perk_id, item, unique_id, index) {
        return {
            'id': perk_id,
            'name': perk.displayProperties.name,
            'icon': perk.displayProperties.icon.replace('/common/destiny2_content/icons/', ''),
            'description': build_description(perk_id, item, unique_id, index)
        }
    }
    //--- - - - - - - - - - - - - - - - - - - - - - - - - - Building perk descriptions - - - - - - - - - - - - - - - - - - - - - - - - -
    function build_description(perk_id, item, unique_id, index) {
        const custom_description = wep_perks[perk_id]
        const formula = get_formula(item, wep_formulas) // object with range, reload, ect numbers
        const weapon_stat_group = get_stat_group(item, stat_group)
        const investment_stats = get_item_investment_stats(unique_id, item.hash, user_data, inventory_item)

        let description = ''
        if (custom_description) {
            description = perk_info_json.text
            const active_perks = get_active_perks(user_data, json.inventory_item, unique_id)
                //--- - - - - - - - - - - - - - - - - - - - - - - - - - Replace range placeholders - - - - - - - - - - - - - - - - - - - - - - - - -
            if (custom_description.range && formula.range) {
                let range_stat_id    = 1240592695
                let zoom_stat_id     = 3555269338
                let rangefinder_id   = 2846385770
                let seraph_rounds_id = 1140096971

                let default_stats = {
                    'range': stat_calculator(investment_stats[range_stat_id], weapon_stat_group[range_stat_id], range_stat_id),
                    'zoom': stat_calculator(investment_stats[zoom_stat_id], weapon_stat_group[zoom_stat_id], zoom_stat_id),
                    'multiplayer': (
                            (perk_id != rangefinder_id || perk_id != seraph_rounds_id) // check current perk
                            &&
                            active_perks.indexOf(x => (x == rangefinder_id || x == seraph_rounds_id)) != -1 // check active perk
                        ) ? 1.1 : 1 // if current perk is not range finder or seraph rounds and one of active perks is range finder or seraph rounds add 1.1 multiplayer
                }
                let range_default = range_calculator(default_stats.range, default_stats.zoom, formula, default_stats.multiplayer).ADS_min // damage fall off start in meters
                const perk_stats = custom_description.range

                for (let i = 0; i < custom_description.range.loop; i++) { // loop over placeholders and replace them with values
                    let modded_stats = {
                        'range': default_stats.range + (perk_stats.range[i]) ? perk_stats.range[i] : 0,
                        'zoom': default_stats.zoom_stat + (perk_stats.zoom[i]) ? perk_stats.zoom[i] : 0,
                        'multiplayer': default_stats.multiplayer + (perk_stats.multiplayer[i]) ? perk_stats.multiplayer[i] : 0
                    }
                    let range_mod = range_calculator(modded_stats.range, modded_stats.zoom, formula, modded_stats.multiplayer).ADS_min // damage fall off start in meters
                    let stat_range = (range_mod - range_default).toFixed(2)

                    let range = (stat_range > 0) ? `+${stat_range}` : stat_range

                    description = description.replace(`range_${i}`, `${range}m`)
                }
            } else if (custom_description.range) { description = custom_description.text_fallback } // for weapons with unlimited range for example sniper with range finder
            //-!- - - - - - - - - - - - - - - - - - - - - - - - - - Replace range placeholders - - - - - - - - - - - - - - - - - - - - - - - - -

            //--- - - - - - - - - - - - - - - - - - - - - - - - - - Replace reload placeholders - - - - - - - - - - - - - - - - - - - - - - - - -
            if (custom_description.reload && formula.reload) {
                let reload_stat_id = 4188031367
                let magazine_stat_id = 3871231066

                let default_stats = {
                    'reload': stat_calculator(investment_stats[reload_stat_id], weapon_stat_group[reload_stat_id], reload_stat_id),
                    'magazine': stat_calculator(investment_stats[magazine_stat_id], weapon_stat_group[magazine_stat_id], magazine_stat_id),
                }
                let reload_default = reload_calculator(default_stats.reload, default_stats.magazine, formula, 1, active_perks).default // reload time in seconds
                const perk_stats = custom_description.reload
                for (let i = 0; i < custom_description.reload.loop; i++) {
                    let mod_reload_stat = (perk_stats.reload[i]) ? perk_stats.reload[i] + default_stats.reload : default_stats.reload

                    let reload_mod = reload_calculator(mod_reload_stat, default_stats.magazine, formula, perk_stats.multiplayer[i], active_perks)

                    description = description.replace(`relo_t_${i}`, `${reload_time_mod.toFixed(2)}s`)
                    description = description.replace(`relo_r_${i}`, `${(reload_time_mod - reload_time_default).toFixed(2)}s`)
                }
            }
            //-!- - - - - - - - - - - - - - - - - - - - - - - - - - Replace reload placeholders - - - - - - - - - - - - - - - - - - - - - - - - -

            //--- - - - - - - - - - - - - - - - - - - - - - - - - - Replace handling placeholders - - - - - - - - - - - - - - - - - - - - - - - - -
            // TODO: add handling
            if (custom_description.handling && formula.handling && false) {
                let handling_stat_id = 943549884
            }
            //-!- - - - - - - - - - - - - - - - - - - - - - - - - - Replace handling placeholders - - - - - - - - - - - - - - - - - - - - - - - - -
        } else { // if perk doesn't have custom description just add default
            if (json.inventory_item[perk_id].investmentStats.length == 0) { // except for perks with stats
                description = `<div class='new_pd'>${json.inventory_item[perk_id].displayProperties.description}</div>`
            }
        }














        if (perk_info_json) { // adds stat number to description
            if (perk_info_json.range_stat) {
                for (let i = 0; i < perk_info_json.range_stat.length; i++) {
                    let range_stat = stat_calculator(investment_stats[1240592695], weapon_stat_group[1240592695], 1240592695)
                    let zoom_stat = stat_calculator(investment_stats[3555269338], weapon_stat_group[3555269338], 3555269338)
                    let range_default = range_calculator(formula, range_stat, zoom_stat, 1)
                    let range_mod = range_calculator(formula, min_max(range_stat + perk_info_json.range_stat[i]), zoom_stat + perk_info_json.zoom[i], perk_info_json.zoom_mult[i])

                    let range = range_mod - range_default
                    let final_range = (range > 0) ? `+${range}` : range

                    description = description.replace(`range_${i}`, `${(final_range * 1).toFixed(2)}m`)
                    if (final_range == 'NaN') description = perk_info_json.text_fallback // for weapons with unlimited range
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
            let new_inv_stats = {...investment_stats } // investment stats with out active perk
            inventory_item[active_perk_id].investmentStats.forEach(stat => new_inv_stats[stat.statTypeHash] -= stat.value) // remove active perk stats

            let stat_list = `<table class="Clarity_weapon_stats"><tbody>`
            let check = true // sets to false if range was added to prevent adding multiple times incase perks has zoom and range stat
            inventory_item[perk_id].investmentStats.forEach(stat => {
                const stat_id = stat.statTypeHash
                let with_perk = stat_calculator(new_inv_stats[stat_id] + stat.value, weapon_stat_group[stat_id], stat.statTypeHash)
                let with_out_perk = stat_calculator(new_inv_stats[stat_id], weapon_stat_group[stat_id], stat.statTypeHash)
                let value = Math.round((with_perk - with_out_perk) * 10) / 10
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
    //-!- - - - - - - - - - - - - - - - - - - - - - - - - - Building perk descriptions - - - - - - - - - - - - - - - - - - - - - - - - -

    local_storage(new_item_list)
    console.timeEnd('timer')
}

*/










// class Filter_weapon {
//     constructor(user_data, manifest, /**/ wep_formulas, wep_perks, unique_id, item) {
//         this.user_data = user_data
//         this.inventory_item = manifest[0]
//         this.stat_names = manifest[2]
//         this.damage_type = manifest[4]
//         this.plug_set = manifest[5]
//         this.wep_perks = wep_perks
//         this.unique_id = unique_id
//         this.item = item

//         this.wep_formulas = get_formula(item, wep_formulas)
//         this.stat_group = get_stat_group(this.item, manifest[1])
//         this.active_perks = active_perks(user_data, this.inventory_item, unique_id) // array of active perk id's
//     }





//     get_perk_info(perk_id, item, unique_id, user_data, index) {
//         this.all_perks_ids.forEach(perk_list => {
//             perk_list.forEach(perk => {
//                 perk
//             })
//         })
//         return {
//             'id': perk_id,
//             'name': perk.displayProperties.name,
//             'icon': perk.displayProperties.icon.replace('/common/destiny2_content/icons/', ''),
//             'description': build_description(perk_id, item, unique_id, user_data, index)
//         }
//     }




//     build_description(perk_id, item, unique_id, user_data, index) {
//         const custom_description = wep_perks[perk_id]
//         const formula = get_formula(item, wep_formulas) // object with range, reload, ect numbers
//         const weapon_stat_group = get_stat_group(item, stat_group)
//         const investment_stats = get_item_investment_stats(unique_id, item.hash, user_data, inventory_item)



//         // const perk_info_json = wep_perks[perk_id]
//         let description = ''
//         if (custom_description) {
//             description = perk_info_json.text

//             //--- - - - - - - - - - - - - - - - - - - - - - - - - - Replace range placeholders - - - - - - - - - - - - - - - - - - - - - - - - -
//             if (custom_description.range && formula.range) {
//                 let default_range_multiplayer = ((perk_id != 2846385770 || perk_id != 1140096971) && active_perks.indexOf(x => (x == 2846385770 || x == 1140096971)) != -1) ? 1.1 : 1 // then perk with multiplayer is not current perk but is active perk 1.1 multiplayer
//                 let range_stat = stat_calculator(investment_stats[1240592695], weapon_stat_group[1240592695], 1240592695)
//                 let zoom_stat = stat_calculator(investment_stats[3555269338], weapon_stat_group[3555269338], 3555269338)
//                 let range_default = range_calculator(range_stat, zoom_stat, formula, default_range_multiplayer)

//                 for (let i = 0; i < custom_description.range.loop; i++) {


//                     range_calculator(range_stat, zoom_stat, formula, zoom_multiplayer)

//                     const perk_stats = custom_description.range
//                     let modded_stats = {
//                         'range': min_max(range_stat + (perk_stats.range[i]) ? perk_stats.range[i] : 0),
//                         'zoom': zoom_stat + (perk_stats.zoom[i]) ? perk_stats.zoom[i] : 0,
//                         'zoom_multiplayer': (perk_stats.zoom_mult[i]) ? perk_stats.zoom_mult[i] : 0
//                     }

//                     let range_default = range_calculator(formula, range_stat, zoom_stat, 1)
//                     let range_mod = range_calculator(formula, min_max(range_stat + custom_description.range[i]), zoom_stat + custom_description.zoom[i], custom_description.zoom_mult[i])

//                     let range = range_mod - range_default
//                     let final_range = (range > 0) ? `+${range}` : range

//                     description = description.replace(`range_${i}`, `${(final_range * 1).toFixed(2)}m`)
//                 }
//             } else if (custom_description.range) { description = custom_description.text_fallback } // for weapons with unlimited range for example sniper with range finder
//             //--- - - - - - - - - - - - - - - - - - - - - - - - - - Replace reload placeholders - - - - - - - - - - - - - - - - - - - - - - - - -
//             if (perk_info_json.reload_stat && formula.reload) {
//                 for (let i = 0; i < perk_info_json.reload_stat.length; i++) {
//                     let reload_stat = stat_calculator(investment_stats[4188031367], weapon_stat_group[4188031367], 4188031367)
//                     let reload_time_default = reload_calculator(formula, reload_stat, 1) * 1
//                     let reload_time_mod = reload_calculator(formula, min_max(reload_stat + perk_info_json.reload_stat[i]), 1) * 1

//                     description = description.replace(`relo_t_${i}`, `${reload_time_mod.toFixed(2)}s`)
//                     description = description.replace(`relo_r_${i}`, `${(reload_time_mod - reload_time_default).toFixed(2)}s`)
//                 }
//             }
//         }














//         if (perk_info_json) { // adds stat number to description
//             if (perk_info_json.range_stat) {
//                 for (let i = 0; i < perk_info_json.range_stat.length; i++) {
//                     let range_stat = stat_calculator(investment_stats[1240592695], weapon_stat_group[1240592695], 1240592695)
//                     let zoom_stat = stat_calculator(investment_stats[3555269338], weapon_stat_group[3555269338], 3555269338)
//                     let range_default = range_calculator(formula, range_stat, zoom_stat, 1)
//                     let range_mod = range_calculator(formula, min_max(range_stat + perk_info_json.range_stat[i]), zoom_stat + perk_info_json.zoom[i], perk_info_json.zoom_mult[i])

//                     let range = range_mod - range_default
//                     let final_range = (range > 0) ? `+${range}` : range

//                     description = description.replace(`range_${i}`, `${(final_range * 1).toFixed(2)}m`)
//                     if (final_range == 'NaN') description = perk_info_json.text_fallback // for weapons with unlimited range
//                 }
//             }
//             if (perk_info_json.reload_stat) {
//                 for (let i = 0; i < perk_info_json.reload_stat.length; i++) {
//                     let reload_stat = stat_calculator(investment_stats[4188031367], weapon_stat_group[4188031367], 4188031367)
//                     let reload_time_default = reload_calculator(formula, reload_stat, 1) * 1
//                     let reload_time_mod = reload_calculator(formula, min_max(reload_stat + perk_info_json.reload_stat[i]), 1) * 1

//                     description = description.replace(`relo_t_${i}`, `${reload_time_mod.toFixed(2)}s`)
//                     description = description.replace(`relo_r_${i}`, `${(reload_time_mod - reload_time_default).toFixed(2)}s`)
//                 }
//             }
//         } else { // if perk doesn't have custom description just add default
//             if (inventory_item[perk_id].investmentStats.length == 0) { // except for perks with stats
//                 description = `<div class='new_pd'>${inventory_item[perk_id].displayProperties.description}</div>`
//             }
//         }
//         if (inventory_item[perk_id].investmentStats.length != 0) {
//             let active_perk_id = user_data.Response.itemComponents.sockets.data[unique_id].sockets[index].plugHash // active perk in this group
//             let new_inv_stats = {...investment_stats } // investment stats with out active perk
//             inventory_item[active_perk_id].investmentStats.forEach(stat => new_inv_stats[stat.statTypeHash] -= stat.value) // remove active perk stats

//             let stat_list = `<table class="Clarity_weapon_stats"><tbody>`
//             let check = true // sets to false if range was added to prevent adding multiple times incase perks has zoom and range stat
//             inventory_item[perk_id].investmentStats.forEach(stat => {
//                 const stat_id = stat.statTypeHash
//                 let with_perk = stat_calculator(new_inv_stats[stat_id] + stat.value, weapon_stat_group[stat_id], stat.statTypeHash)
//                 let with_out_perk = stat_calculator(new_inv_stats[stat_id], weapon_stat_group[stat_id], stat.statTypeHash)
//                 let value = Math.round((with_perk - with_out_perk) * 10) / 10
//                 let final_value = (value > 0) ? `+${value}` : value
//                 if (value) {
//                     let name = stat_names[stat_id].displayProperties.name
//                     stat_list += `<tr><th>${final_value}</th><td>${name}</td></tr>`
//                 }
//                 if (check && (stat_id == 1240592695 || stat_id == 3555269338)) { // if range or zoom stat
//                     let range_stat = {
//                         'perk': with_perk,
//                         'default': with_out_perk
//                     }
//                     let zoom_stat = {
//                         'perk': stat_calculator(investment_stats[3555269338], weapon_stat_group[3555269338], 3555269338),
//                         'default': stat_calculator(new_inv_stats[3555269338], new_inv_stats[3555269338], 3555269338)
//                     }
//                     let range = {
//                         'perk': range_calculator(formula, range_stat.perk, zoom_stat.perk, 1),
//                         'default': range_calculator(formula, range_stat.default, zoom_stat.default, 1)
//                     }
//                     let final_range = (range.perk - range.default > 0) ? `+${(range.perk - range.default).toFixed(2)}` : (range.perk - range.default).toFixed(2)
//                     if (final_range != 0) {
//                         stat_list += `<tr><th>${final_range}m</th><td>Range meters</td></tr>`
//                         check = false
//                     }
//                 }
//                 if (stat_id == 4188031367) { // if reload stat
//                     let reload_stat = {
//                         'perk': with_perk,
//                         'default': with_out_perk
//                     }
//                     let reload = {
//                         'perk': reload_calculator(formula, reload_stat.perk, 1),
//                         'default': reload_calculator(formula, reload_stat.default, 1)
//                     }
//                     let final_reload = (reload.perk - reload.default > 0) ? `+${(reload.perk - reload.default).toFixed(2)}` : (reload.perk - reload.default).toFixed(2)
//                     stat_list += `<tr><th>${final_reload}s</th><td>Reload time</td></tr>`
//                 }
//             })
//             stat_list += `</tbody></table>`
//             description += stat_list
//         }
//         return description
//     }
//     stats(unique_id, item) { // add in game range and reload
//         let final_stats = {}
//         let investment_stats = get_item_investment_stats(unique_id, item.hash, user_data, inventory_item)
//         let weapon_stat_group = {}
//         stat_group[item.stats.statGroupHash].scaledStats.map(stat_array => { weapon_stat_group[stat_array.statHash] = stat_array.displayInterpolation })
//         if (user_data.Response.itemComponents.sockets.data[unique_id].sockets.findIndex(x => x.plugHash == 3511092054) != -1) { // if item has elemental capacitor then add stats
//             let elemental_cap = {}
//             let inv_stats_array = Object.entries(investment_stats)
//             for (let i = 0; i < inv_stats_array.length; i++) { // loop over investment stats
//                 const id = inv_stats_array[i][0]
//                 const stat = inv_stats_array[i][1]
//                 elemental_cap[id] = stat_calculator(stat, weapon_stat_group[id], id)
//             }
//             final_stats['elemental_cap'] = elemental_cap
//         }
//         const formula = get_formula(item, wep_formulas)
//         if (formula) {
//             let extra_stats = []
//             if (formula.vpp) {
//                 let perk_with_multi = user_data.Response.itemComponents.sockets.data[unique_id].sockets.findIndex(perk => perk.plugHash == 2846385770 || perk.plugHash == 1140096971)
//                 let zoom_multi = (perk_with_multi != -1) ? 1.1 : 1
//                 let range_stat = stat_calculator(investment_stats[1240592695], weapon_stat_group[1240592695], 1240592695)
//                 let zoom_stat = stat_calculator(investment_stats[3555269338], weapon_stat_group[3555269338], 3555269338)
//                 let range_distance = range_calculator(formula, range_stat, zoom_stat, zoom_multi)
//                 extra_stats.push({ 'name': 'Range', 'value': range_distance, 'letter': 'm' })
//             }
//             if (formula.a) {
//                 let reload_stat = stat_calculator(investment_stats[4188031367], weapon_stat_group[4188031367], 4188031367)
//                 let reload_time = reload_calculator(formula, reload_stat, 1)
//                 extra_stats.push({ 'name': 'Reload', 'value': reload_time, 'letter': 's' })
//             }
//             final_stats['extra_stats'] = extra_stats
//         }
//         return final_stats
//     }
// }



// class Filter_armor {
//     constructor(item, inventory_item, exotic_armor_perks) {
//         this.perk_id = item.sockets.socketEntries.find(x => x.socketTypeHash == 1486702312 || x.socketTypeHash == 965959289).singleInitialItemHash
//         this.perk_name = inventory_item[this.perk_id].displayProperties.name
//         this.custom_description = exotic_armor_perks[this.perk_name]
//     }
//     armor_perks() {
//         return {
//             'description': (custom_description) ? custom_description : `<div class="new_pd">${inventory_item[this.perk_id].displayProperties.description}</div>`,
//             'name': this.perk_name,
//             'icon': inventory_item[this.perk_id].displayProperties.icon.replace('/common/destiny2_content/icons/', ''),
//         }
//     }
// }









// function armor_perks(item) {
//     if(item.inventory.tierTypeName == 'Exotic') {
//         let perk_id = item.sockets.socketEntries.find(x => x.socketTypeHash == 1486702312 || x.socketTypeHash == 965959289).singleInitialItemHash
//         let info = {
//             'description': get_description(),
//             'name': inventory_item[perk_id].displayProperties.name,
//             'icon': inventory_item[perk_id].displayProperties.icon.replace('/common/destiny2_content/icons/', ''),
//         }
//         function get_description() {
//             if(exotic_armor_perks[inventory_item[perk_id].displayProperties.name]) {
//                 return exotic_armor_perks[inventory_item[perk_id].displayProperties.name]
//             } else {
//                 return `<div class="new_pd">${inventory_item[perk_id].displayProperties.description}</div>`
//             }
//         }
//         return info
//     }
// }
// function ammo(data) { // ammo type
//     switch (data.equippingBlock.ammoType) {
//         case 1:
//             return 'primary'
//         case 2:
//             return 'special'
//         case 3:
//             return 'heavy'
//     }
// }
// function perks(item, unique_id, user_data) {
//     return {
//         'active_perks': active_perks(),
//         'perks': all_perks()
//     }
//     function active_perks() {
//         //           Arrow,      Barrel,     Battery,    Blade,      Bowstring,  Grip,       Guard,     Launcher Barrel, Magazine,   Scope,      Stock,     Trait    Magazine gl
//         let perks = [1257608559, 2833605196, 1757026848, 1041766312, 3809303875, 3962145884, 683359327, 1202604782,      1806783418, 2619833294, 577918720, 7906839, 2718120384]
//         return user_data.Response.itemComponents.sockets.data[unique_id].sockets
//             .filter(active_perk => active_perk.plugHash != undefined && perks.indexOf(inventory_item[active_perk.plugHash].plug.plugCategoryHash) > -1)
//             .map(active_perk => active_perk.plugHash)
//     }
//     function all_perks() {
//         let all_perks = []
//         let random_perks = user_data.Response.itemComponents.reusablePlugs.data[unique_id]
//         item.sockets.socketCategories.find(x => x.socketCategoryHash == 4241085061).socketIndexes
//             .filter(x => x < 6)
//             .forEach(get_perk_ids) // possible indexes 1,2,3,4, 8,9 only 1-4 used // because bongo can't ever be consistent some times perks are on index 5
//         return all_perks
//         function get_perk_ids(index) {
//             let perk_list = []
//             if (random_perks && random_perks.plugs[1]) {
//                 try {
//                     random_perks.plugs[index].forEach(perk => perk_list.push(get_perk_info(perk.plugItemHash, index)))
//                 } catch  { // bungie fuck up and Hawkmoon and Quickfang don't have index 2 this will take perk info from manifest
//                     let reusable_plug_set_id = item.sockets.socketEntries[index].reusablePlugSetHash
//                     plug_set[reusable_plug_set_id].reusablePlugItems.forEach(perk => perk_list.push(get_perk_info(perk.plugItemHash, index)))
//                 }
//             } else {
//                 let reusable_plug_set_id = item.sockets.socketEntries[index].reusablePlugSetHash
//                 let reusable_plug_items  = item.sockets.socketEntries[index].reusablePlugItems
//                 if (reusable_plug_set_id) { // in some cases items socket 4 doesn't have plug set hash example Ticuu's Divination
//                     plug_set[reusable_plug_set_id].reusablePlugItems.forEach(perk => perk_list.push(get_perk_info(perk.plugItemHash, index)))
//                 } else if (reusable_plug_items) {
//                     reusable_plug_items.forEach(perk => perk_list.push(get_perk_info(perk.plugItemHash, index)))
//                 }
//             }
//             if (perk_list.length != 0) all_perks.push(perk_list)
//         }
//         function get_perk_info(perk_id, index) {
//             const perk = inventory_item[perk_id]
//             return {
//                 'id':          perk_id,
//                 'name':        perk.displayProperties.name,
//                 'icon':        perk.displayProperties.icon.replace('/common/destiny2_content/icons/', ''),
//                 'description': build_description(perk_id, item, unique_id, user_data, index)
//             }
//         }
//     }
// }
// function build_description(perk_id, item, unique_id, user_data, index) {
//     const perk_info_json = wep_perks[perk_id]
//     const formula = get_formula(item, wep_formulas)
//     const weapon_stat_group = get_stat_group(item, stat_group)
//     const investment_stats = get_item_investment_stats(unique_id, item.hash, user_data, inventory_item)
//     let description = ''
//     if (perk_info_json) { // adds stat number to description
//         description = perk_info_json.text
//         let min_max = (number) => Math.min(Math.max(number, 10), 100)
//         if (perk_info_json.range_stat) {
//             for (let i = 0; i < perk_info_json.range_stat.length; i++) {
//                 let range_stat    = stat_calculator(investment_stats[1240592695], weapon_stat_group[1240592695], 1240592695)
//                 let zoom_stat     = stat_calculator(investment_stats[3555269338], weapon_stat_group[3555269338], 3555269338)
//                 let range_default = range_calculator(formula, range_stat, zoom_stat, 1)
//                 let range_mod     = range_calculator(formula, min_max(range_stat + perk_info_json.range_stat[i]), zoom_stat + perk_info_json.zoom[i], perk_info_json.zoom_mult[i])

//                 let range = range_mod - range_default
//                 let final_range = (range > 0) ? `+${range}` : range

//                 description = description.replace(`range_${i}`, `${(final_range * 1).toFixed(2)}m`)
//                 if(final_range == 'NaN') description = perk_info_json.text_fallback
//             }
//         }
//         if (perk_info_json.reload_stat) {
//             for (let i = 0; i < perk_info_json.reload_stat.length; i++) {
//                 let reload_stat = stat_calculator(investment_stats[4188031367], weapon_stat_group[4188031367], 4188031367)
//                 let reload_time_default = reload_calculator(formula, reload_stat, 1) * 1
//                 let reload_time_mod = reload_calculator(formula, min_max(reload_stat + perk_info_json.reload_stat[i]), 1) * 1

//                 description = description.replace(`relo_t_${i}`, `${reload_time_mod.toFixed(2)}s`)
//                 description = description.replace(`relo_r_${i}`, `${(reload_time_mod - reload_time_default).toFixed(2)}s`)
//             }
//         }
//     } else { // if perk doesn't have custom description just add default
//         if (inventory_item[perk_id].investmentStats.length == 0) { // except for perks with stats
//             description = `<div class='new_pd'>${inventory_item[perk_id].displayProperties.description}</div>`
//         }
//     }
//     if (inventory_item[perk_id].investmentStats.length != 0) {
//         let active_perk_id = user_data.Response.itemComponents.sockets.data[unique_id].sockets[index].plugHash // active perk in this group
//         let new_inv_stats = {...investment_stats} // investment stats with out active perk
//         inventory_item[active_perk_id].investmentStats.forEach(stat => new_inv_stats[stat.statTypeHash] -= stat.value) // remove active perk stats

//         let stat_list = `<table class="Clarity_weapon_stats"><tbody>`
//         let check = true // sets to false if range was added to prevent adding multiple times incase perks has zoom and range stat
//         inventory_item[perk_id].investmentStats.forEach(stat => {
//             const stat_id = stat.statTypeHash
//             let with_perk = stat_calculator(new_inv_stats[stat_id] + stat.value, weapon_stat_group[stat_id], stat.statTypeHash)
//             let with_out_perk = stat_calculator(new_inv_stats[stat_id], weapon_stat_group[stat_id], stat.statTypeHash)
//             let value = Math.round((with_perk - with_out_perk) * 10 ) / 10
//             let final_value = (value > 0) ? `+${value}` : value
//             if (value) {
//                 let name = stat_names[stat_id].displayProperties.name
//                 stat_list += `<tr><th>${final_value}</th><td>${name}</td></tr>`
//             }
//             if (check && (stat_id == 1240592695 || stat_id == 3555269338)) { // if range or zoom stat
//                 let range_stat = {
//                     'perk': with_perk,
//                     'default': with_out_perk
//                 }
//                 let zoom_stat = {
//                     'perk': stat_calculator(investment_stats[3555269338], weapon_stat_group[3555269338], 3555269338),
//                     'default': stat_calculator(new_inv_stats[3555269338], new_inv_stats[3555269338], 3555269338)
//                 }
//                 let range = {
//                     'perk': range_calculator(formula, range_stat.perk, zoom_stat.perk, 1),
//                     'default': range_calculator(formula, range_stat.default, zoom_stat.default, 1)
//                 }
//                 let final_range = (range.perk - range.default > 0) ? `+${(range.perk - range.default).toFixed(2)}` : (range.perk - range.default).toFixed(2)
//                 if (final_range != 0) {
//                     stat_list += `<tr><th>${final_range}m</th><td>Range meters</td></tr>`
//                     check = false
//                 }
//             }
//             if (stat_id == 4188031367) { // if reload stat
//                 let reload_stat = {
//                     'perk': with_perk,
//                     'default': with_out_perk
//                 }
//                 let reload = {
//                     'perk': reload_calculator(formula, reload_stat.perk, 1),
//                     'default': reload_calculator(formula, reload_stat.default, 1)
//                 }
//                 let final_reload = (reload.perk - reload.default > 0) ? `+${(reload.perk - reload.default).toFixed(2)}` : (reload.perk - reload.default).toFixed(2)
//                 stat_list += `<tr><th>${final_reload}s</th><td>Reload time</td></tr>`
//             }
//         })
//         stat_list += `</tbody></table>`
//         description += stat_list
//     }
//     return description
// }
// function stats(unique_id, item) { // add in game range and reload
//     let final_stats = {}
//     let investment_stats = get_item_investment_stats(unique_id, item.hash, user_data, inventory_item)
//     let weapon_stat_group = {}
//     stat_group[item.stats.statGroupHash].scaledStats.map(stat_array => {weapon_stat_group[stat_array.statHash] = stat_array.displayInterpolation})
//     if (user_data.Response.itemComponents.sockets.data[unique_id].sockets.findIndex(x => x.plugHash == 3511092054) != -1) { // if item has elemental capacitor then add stats
//         let elemental_cap = {}
//         let inv_stats_array = Object.entries(investment_stats)
//         for (let i = 0; i < inv_stats_array.length; i++) { // loop over investment stats
//             const id = inv_stats_array[i][0]
//             const stat = inv_stats_array[i][1]
//             elemental_cap[id] = stat_calculator(stat, weapon_stat_group[id], id)
//         }
//         final_stats['elemental_cap'] = elemental_cap
//     }
//     const formula = get_formula(item, wep_formulas)
//     if (formula) {
//         let extra_stats = []
//         if (formula.vpp) {
//             let perk_with_multi = user_data.Response.itemComponents.sockets.data[unique_id].sockets.findIndex(perk => perk.plugHash == 2846385770 || perk.plugHash == 1140096971)
//             let zoom_multi = (perk_with_multi != -1) ? 1.1 : 1
//             let range_stat     = stat_calculator(investment_stats[1240592695], weapon_stat_group[1240592695], 1240592695)
//             let zoom_stat      = stat_calculator(investment_stats[3555269338], weapon_stat_group[3555269338], 3555269338)
//             let range_distance = range_calculator(formula, range_stat, zoom_stat, zoom_multi)
//             extra_stats.push({'name': 'Range', 'value': range_distance, 'letter': 'm'})
//         }
//         if (formula.a) {
//             let reload_stat = stat_calculator(investment_stats[4188031367], weapon_stat_group[4188031367], 4188031367)
//             let reload_time = reload_calculator(formula, reload_stat, 1)
//             extra_stats.push({'name': 'Reload', 'value': reload_time, 'letter': 's'})
//         }
//         final_stats['extra_stats'] = extra_stats
//     }
//     return final_stats
// }