window.addEventListener('update_item_info', work_on_item_info)
function work_on_item_info() {
    Promise.all([
        fetch(`https://ice-mourne.github.io/Database-for-Clarity/Database/weapon_formulas.json?${Math.random()}`)
        .then(resp => resp.json()),
        fetch(`https://ice-mourne.github.io/Database-for-Clarity/Database/D2_community_data.json?${Math.random()}`)
        .then(resp => resp.json()),

        fetch_bungie('user_info'),
        indexed_DB('keyval-store', 'keyval', 'd2-manifest')
    ])
    .then(json_data => {
        let wep_formulas = json_data[0]
        let community_data = {
            exotic_armor:   json_data[1].exotic_armor,
            armor_mods:     json_data[1].armor_mods,
            weapon_perks:   json_data[1].weapon_perks,
            weapon_frames:  json_data[1].weapon_frames,
            weapon_mods:    json_data[1].weapon_mods,
            // exotic_weapons: json_data[1].exotic_weapons, // todo add this to database
        }
        let user_data = json_data[2].Response

        let manifest = {
            inventory_item: json_data[3].DestinyInventoryItemDefinition,
            stat_group:     json_data[3].DestinyStatGroupDefinition,
            stat_names:     json_data[3].DestinyStatDefinition,
            item_category:  json_data[3].DestinyItemCategoryDefinition,
            damage_type:    json_data[3].DestinyDamageTypeDefinition,
            plug_sets:      json_data[3].DestinyPlugSetDefinition
        }
        // filter_inventory_item(user_data, manifest, /**/ wep_formulas, community_data) //-!- old
        get_basic_info(user_data, manifest)
    })
}
function get_basic_info(user_data, manifest) {
    function find_item_ids() {
        let item_ids = []
        function find_hare(items) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].itemInstanceId) { // if has instanced id
                    let x = []
                    x.push(items[i].itemInstanceId)
                    x.push(items[i].itemHash)
                    item_ids.push(x)
                }
            }
        }
        find_hare(user_data.profileInventory.data.items)
        Object.entries(user_data.characterInventories.data).forEach(x => find_hare(x[1].items))
        Object.entries(user_data.characterEquipment  .data).forEach(x => find_hare(x[1].items))
        return item_ids
    }
    let item_ids = find_item_ids()
    let new_item_list = {}
    for (let i = 0; i < item_ids.length; i++) {
        const unique_id = item_ids[i][0]
        const item = manifest.inventory_item[item_ids[i][1]]
        if (item.itemType == 3                                           ) new_item_list[unique_id] = weapon(unique_id, item)
        // if (item.itemType == 2 && item.inventory.tierTypeName == 'Exotic') new_item_list[unique_id] = armor(unique_id, item)
    }
    function weapon(unique_id, item) {
        // let weapon_data = new Weapon_constructor(user_data, manifest, /**/ wep_formulas, wep_perks, unique_id, item)
        return {
            'name': item.displayProperties.name,
            'icon': item.displayProperties.icon.replace('/common/destiny2_content/icons/', ''),
            'type': item.itemTypeDisplayName, // hand cannon, sniper, shotgun...
            'ammo': ammo_type(), // primary, special, heavy...
            'slot': manifest.item_category[item.itemCategoryHashes[0]].shortTitle, // kinetic, energy, power...
            'damage_type': manifest.damage_type[item.defaultDamageTypeHash].displayProperties.name, // arch, solar, void...
            'item_type': 'weapon',
            'perks': {
                'active_perks': user_data.itemComponents.sockets.data[unique_id].sockets,
                'perks': item.sockets.socketCategories
            },
            // 'stats': weapon_filter.stats(),
        }
        function ammo_type() { // ammo type
            switch (item.equippingBlock.ammoType) {
                case 1:
                    return 'primary'
                case 2:
                    return 'special'
                case 3:
                    return 'heavy'
            }
        }
    }
    function armor(item) {
        return {
            'name': item.displayProperties.name,
            'icon': item.displayProperties.icon.replace('/common/destiny2_content/icons/', ''),
            'perk': new Filter_armor.armor_perks(item, inventory_item, exotic_armor_perks),
            'item_type': 'armor',
            'tier': item.inventory.tierTypeName
        }
    }
    console.log(new_item_list);



}








function filter_inventory_item(user_data, manifest, /**/ wep_formulas, community_data) {
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
            'stats': weapon_filter.stats(),
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

