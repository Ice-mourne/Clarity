get_manifest()
function get_manifest() {  // - - Get data from indexedDB
    indexedDB.open('keyval-store').onsuccess = e => {
        let db = e.target.result
        let tx = db.transaction('keyval', 'readonly')
        let store = tx.objectStore('keyval')
        let data = store.get('d2-manifest')
        data.onsuccess = () => {
            let stat_group = data.result.DestinyStatGroupDefinition
            let inventory_bucket = data.result.DestinyInventoryBucketDefinition
            let socket_category = data.result.DestinySocketCategoryDefinition
            let plug_set = data.result.DestinyPlugSetDefinition
            filter_inventory_item(Object.entries(data.result.DestinyInventoryItemDefinition), stat_group, inventory_bucket, socket_category, plug_set)
        }
    }
}
function filter_inventory_item(data, stat_group, inventory_bucket, socket_category, plug_set) {
    let new_inventory_item = {}
    for (let i = 0; i < data.length; i++){
        const element = data[i]
        switch (true){
            case element[1].itemType == 3: // itemType:3 "Weapon"
                filter_weapons(element)
                break
            case element[1].itemType == 2 && element[1].inventory.tierTypeName == 'Exotic': // item type armor & tier exotic
                //filter_armor(element)
                break
            case element[1].itemType == '19' && element[1].displayProperties.name != '': // item type mod & dose it have name
                //filter_mods_and_sluff(element)
                //filter_perk_by_icon(element)
                break
        }
    }
    function filter_weapons(data_old) {
        const id = data_old[0]
        const data = data_old[1]
        console.log(data.displayProperties.name);
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
            
            'sockets': '',
            'defaultDamageTypeHash': data.defaultDamageTypeHash, // damage type id
        }
        new_inventory_item[id].stats.stat_group = new_stat_group(stat_group[data.stats.statGroupHash].scaledStats) // stat group (0-100, 10-100)
        function new_stat_group(data) {
            let stat_group = []
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                stat_group.push([element.statHash, element.displayInterpolation])
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
            return inventory_bucket[data].displayProperties.name
             
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
                if (socket_name != 'weapon_cosmetics') {
                    perks[socket_name] = thing = []
                    for (let y = 0; y < element.socketIndexes.length; y++) {
                        const ele = element.socketIndexes[y];
                        thing.push(perk_filter(ele, socket_name))
                    }
                }
            }
            function perk_filter(ele, socket_name){
                new_stuff = {}
                if (data[ele].reusablePlugItems && data[ele].reusablePlugItems.length != 0) new_stuff['reusable_perks'] = data[ele].reusablePlugSetHash
                //if (data[ele].singleInitialItemHash) new_stuff['single_initial_item'] = data[ele].singleInitialItemHash
                //if (data[ele].reusablePlugSetHash  ) new_stuff['reusable_plug_set'  ] = plug_set[data[ele].reusablePlugSetHash].reusablePlugItems
                //if (data[ele].randomizedPlugSetHash) new_stuff['randomized_plug_set'] = plug_set[data[ele].randomizedPlugSetHash].reusablePlugItems
                return new_stuff
            }
            return perks
        }
    }




}