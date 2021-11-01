;(() => {
    Promise.all([
        fetch(`https://ice-mourne.github.io/Database-for-Clarity/Database/weapon_formulas.json?${Math.random()}`)
        .then(resp => resp.json()),
        // fetch(`https://ice-mourne.github.io/Database-for-Clarity/Database/D2_community_data.json?${Math.random()}`)
        fetch(`https://raw.githubusercontent.com/Clovis-Breh/Icemournes-D2-database/data_holder/D2_community_data.json?${Math.random()}`)
        .then(resp => resp.json()),

        indexed_DB('keyval-store', 'keyval', 'd2-manifest')
    ])
    .then(data => {
        let parser_start = Date.now()
        let wep_formulas = data[0]
        let community_data = {
            ...data[1].exotic_armor,
            ...data[1].armor_mods,
            ...data[1].weapon_perks,
            ...data[1].weapon_frames,
            ...data[1].weapon_mods,
            // ...data[1].masterwork // todo add this to database
        }
        let manifest = {
            inventory_item: data[2].DestinyInventoryItemDefinition,
            stat_group:     data[2].DestinyStatGroupDefinition,
            stat_names:     data[2].DestinyStatDefinition,
            item_category:  data[2].DestinyItemCategoryDefinition,
            damage_type:    data[2].DestinyDamageTypeDefinition,
            plug_sets:      data[2].DestinyPlugSetDefinition,
            socket_type:    data[2].DestinySocketTypeDefinition,
        }

        let items = Object.entries(manifest.inventory_item)
        let dirty_clarity_manifest = {}

        for (let i = 0; i < items.length; i++) {
            const id   = items[i][0]
            const item = items[i][1]

            let blacklist = {
                id() {
                    const blacklist = {
                        1744115122: 'exotic weapon'
                    }
                    if (blacklist[id]) return true
                    return false
                },
                armor() {
                    return item.inventory.tierTypeName == 'Exotic'
                },
                mods() {
                    let types = 'Ghost | Ornament|Emote|Ship |Legacy Armor Mod|Deprecated Armor Mod|Transmat Effect|Shader'
                    if (item.itemTypeDisplayName.match(types)) return false
                    if (!item.displayProperties.icon) return false
                    return true
                },
            }

            if (blacklist.id()) continue
            if (item.itemType == 3)                       {dirty_clarity_manifest[id] = weapon  (item, manifest, wep_formulas); continue}
            if (item.itemType == 2  && blacklist.armor()) {dirty_clarity_manifest[id] = armor   (item, manifest              ); continue} // at the moment i have no use for non exotic armor
            if (item.itemType == 19 && blacklist.mods())  {dirty_clarity_manifest[id] = mod_perk(item, community_data        ); continue}
            if (id == '712324018') /* pain */             {dirty_clarity_manifest[id] = mod_perk(item, community_data        ); continue}
        }

        function removeEmptyValues(obj) {
            for (var propName in obj) {
                if ((!obj[propName] || obj[propName].length === 0) && obj[propName] != 0) {
                    delete obj[propName];
                } else if (typeof obj[propName] === 'object') {
                    removeEmptyValues(obj[propName]);
                }
            }
            return obj;
        }
        clarity_manifest = removeEmptyValues(dirty_clarity_manifest)

        console.log(`%c Manifest parsed in: ${Date.now() - parser_start} ms`, 'border: 3px solid green; padding: 2px')
    })
    .then(() => {
        window.addEventListener('update_item_info', user_data)
        user_data()
    })
    const weapon_masterworks = { // all masterworks weapon type can get
        'Auto Rifle':          {'stability': clarity_random_data.masterworks.stability, 'handling': clarity_random_data.masterworks.handling, 'reload':    clarity_random_data.masterworks.reload,    'range':    clarity_random_data.masterworks.range   },
        'Combat Bow':          {'stability': clarity_random_data.masterworks.stability, 'handling': clarity_random_data.masterworks.handling, 'draw_time': clarity_random_data.masterworks.draw_time, 'accuracy': clarity_random_data.masterworks.accuracy},
        'Fusion Rifle':        {'stability': clarity_random_data.masterworks.stability, 'handling': clarity_random_data.masterworks.handling, 'reload':    clarity_random_data.masterworks.reload,    'range':    clarity_random_data.masterworks.range,	'charge_time': clarity_random_data.masterworks.charge_time},
        'Grenade Launcher':    {'stability': clarity_random_data.masterworks.stability, 'handling': clarity_random_data.masterworks.handling, 'blast':     clarity_random_data.masterworks.blast,     'velocity': clarity_random_data.masterworks.velocity},
        'Hand Cannon':         {'stability': clarity_random_data.masterworks.stability, 'handling': clarity_random_data.masterworks.handling, 'reload':    clarity_random_data.masterworks.reload,    'range':    clarity_random_data.masterworks.range   },
        'Linear Fusion Rifle': {'stability': clarity_random_data.masterworks.stability, 'handling': clarity_random_data.masterworks.handling, 'reload':    clarity_random_data.masterworks.reload,    'range':    clarity_random_data.masterworks.range,	'charge_time': clarity_random_data.masterworks.charge_time},
        'Machine Gun':         {'stability': clarity_random_data.masterworks.stability, 'handling': clarity_random_data.masterworks.handling, 'reload':    clarity_random_data.masterworks.reload,    'range':    clarity_random_data.masterworks.range   },
        'Pulse Rifle':         {'stability': clarity_random_data.masterworks.stability, 'handling': clarity_random_data.masterworks.handling, 'reload':    clarity_random_data.masterworks.reload,    'range':    clarity_random_data.masterworks.range   },
        'Rocket Launcher':     {'stability': clarity_random_data.masterworks.stability, 'handling': clarity_random_data.masterworks.handling, 'blast':     clarity_random_data.masterworks.blast,     'velocity': clarity_random_data.masterworks.velocity},
        'Scout Rifle':         {'stability': clarity_random_data.masterworks.stability, 'handling': clarity_random_data.masterworks.handling, 'reload':    clarity_random_data.masterworks.reload,    'range':    clarity_random_data.masterworks.range   },
        'Shotgun':             {'stability': clarity_random_data.masterworks.stability, 'handling': clarity_random_data.masterworks.handling, 'reload':    clarity_random_data.masterworks.reload,    'range':    clarity_random_data.masterworks.range   },
        'Sidearm':             {'stability': clarity_random_data.masterworks.stability, 'handling': clarity_random_data.masterworks.handling, 'reload':    clarity_random_data.masterworks.reload,    'range':    clarity_random_data.masterworks.range   },
        'Sniper Rifle':        {'stability': clarity_random_data.masterworks.stability, 'handling': clarity_random_data.masterworks.handling, 'reload':    clarity_random_data.masterworks.reload,    'range':    clarity_random_data.masterworks.range   },
        'Submachine Gun':      {'stability': clarity_random_data.masterworks.stability, 'handling': clarity_random_data.masterworks.handling, 'reload':    clarity_random_data.masterworks.reload,    'range':    clarity_random_data.masterworks.range   },
        'Sword':               {'impact'   : clarity_random_data.masterworks.impact}
    }
    function covert_description(description_array, item) {
        let custom_description = description_array?.map(line => {
            if(!line.table) { // if normal line
                return {
                    node_type: 'div',
                    className: line.lineClass,
                    append: line.lineText?.map(stuff => {
                        return {
                            node_type: 'span',
                            className: stuff.textClass,
                            textContent: stuff.text
                        }
                    })
                }
            }
            if(line.table) { // if table
                return {
                    node_type: 'div',
                    className: 'CDB-table',
                    append: line.table.map(line_in_table => {
                        return {
                            node_type: 'div',
                            className: line_in_table.lineClass,
                            append: line_in_table.lineText.map(stuff => {
                                return {
                                    node_type: 'div',
                                    className: stuff.textClass,
                                    textContent: stuff.text
                                }
                            })
                        }
                    })
                }
            }
        }) || []

        let stat_ids = clarity_random_data.stat_order.map(stat_order => {
            if(item.investmentStats?.find(stat => stat.statTypeHash == stat_order[0] && stat.value != 0)) return stat_order[0]
        })
        .filter(x => x)

        let stats_description = stat_ids.map(stat_id => {
            return {
                node_type: 'div',
                className: 'Clarity_stat',
                append: [
                    {
                        node_type: 'div',
                        textContent: `{stat-id=${stat_id}} `
                    },
                    {
                        node_type: 'div',
                        textContent: clarity_random_data.stat_names[stat_id]
                    }
                ]
            }
        }) || []
        return [...stats_description, ...custom_description]
    }
    function weapon(item, manifest, wep_formulas) {
        const socket_indexes = {
            'intrinsic': item.sockets.socketCategories.find(socket_category => socket_category.socketCategoryHash == 3956125808).socketIndexes[0],
            'perks': item.sockets.socketCategories.find(socket_category => socket_category.socketCategoryHash == 4241085061)?.socketIndexes,
            'mods': item.sockets.socketCategories.find(socket_category => socket_category.socketCategoryHash == 2685412949)?.socketIndexes
        }
        const sockets = {
            curated_random(type) {
                if(!socket_indexes.perks) return null // some white weapons don't have perks
                let perk_array = socket_indexes.perks.flatMap(index => {
                    const socket_entry = item.sockets.socketEntries[index]
                    const socket_type_id = manifest.socket_type[socket_entry.socketTypeHash]

                    if(!clarity_random_data.perk_types[socket_type_id.plugWhitelist[0].categoryHash]) return [] // check if perk type is actually perk // kill tracker is "perk" because bongo

                    const perks = manifest.plug_sets[socket_entry[type]]?.reusablePlugItems
                    const look_in = (type == 'randomizedPlugSetHash') // if on random perks
                    ? perks                                           // just look for random perks
                    : perks                                           // if not look if there are any curated perks
                    || socket_entry.reusablePlugItems                 // if where are no curated perks look in hare for curated perks

                    return [look_in?.map(perk => {
                        return {
                            'can_roll': perk.currentlyCanRoll,
                            'id': perk.plugItemHash
                        }
                    })]
                })
                .filter(perk => perk) // removes pesky undefined values

                return (perk_array.length != 0) ? perk_array : null
            },
            mods() {
                if(!socket_indexes.mods) return null
                let wep_adept = (item.displayProperties.name.match(/ \(Timelost\)| \(Adept\)/)) ? true : false
                let mod_array = socket_indexes.mods.flatMap(index => {
                    const socket_entry = item.sockets.socketEntries[index]
                    if(socket_entry.singleInitialItemHash != 2323986101) return [] // check if its empty mod socket

                    return manifest.plug_sets[socket_entry.reusablePlugSetHash]?.reusablePlugItems.flatMap(mod => {
                        if(mod.plugHash == 2323986101) return [] // ignore empty mod socket
                        if(wep_adept) return mod.plugItemHash // return all mods
                        let mod_adept = manifest.inventory_item[mod.plugItemHash].displayProperties.name.includes('Adept')
                        if(!mod_adept) return mod.plugItemHash // return non adept mods
                        if(mod_adept) return [] // return empty
                    })
                })
                return (mod_array.length != 0) ? mod_array : null
            },
            masterwork() {
                if(item.inventory.tierTypeName == 'Exotic') {
                    return socket_indexes.mods.flatMap(index => {
                        const socket_entry = item.sockets.socketEntries[index]
                        if(socket_entry.singleInitialItemHash == 1498917124) return {'catalyst': [socket_entry.reusablePlugItems[0].plugItemHash]} // if empty catalyst socked
                        return socket_entry.reusablePlugItems.flatMap(catalyst => {
                            if(manifest.inventory_item[catalyst.plugItemHash].displayProperties.name == 'Upgrade Masterwork') return {'catalyst': [catalyst.plugItemHash]}
                            return []
                        })
                    })[0]
                }
                else {
                    if(item.inventory.tierTypeName == 'Legendary') return weapon_masterworks[item.itemTypeDisplayName]
                }
            }
        }
        const stats = {
            investment() {
                return item.investmentStats.reduce((acc, val) => {
                    if(clarity_random_data.stat_blacklist[val.statTypeHash]) return acc// ignore these stat id's
                    return ({ ...acc, [val.statTypeHash]: val.value})
                }, {})
            },
            stats() {
                let stats = item.stats.stats
                return Object.keys(stats).reduce((acc, val) => {
                    if(clarity_random_data.stat_blacklist[val]) return acc// ignore these stat id's
                    return ({ ...acc, [val]: stats[val].value})
                }, {})
            },
            stat_group() {
                return manifest.stat_group[item.stats.statGroupHash].scaledStats.reduce((acc, val) =>
                    ({ ...acc, [val.statHash]: val.displayInterpolation}), {}
                )
            }
        }
        function formula_numbers() {
            const type = item.itemTypeDisplayName
            const frame = item.sockets.socketEntries[socket_indexes.intrinsic].singleInitialItemHash
            if (!wep_formulas[type][frame]) return null // incase frame info is missing not added
            let category_name = wep_formulas[type][frame].category
            return wep_formulas[type].category[category_name]
        }

        return {
            'name': item.displayProperties.name,
            'icon': item.displayProperties.icon.replace('/common/destiny2_content/icons/', ''),
            'type': item.itemTypeDisplayName, // hand cannon, sniper, shotgun...
            'ammo': clarity_random_data.ammo[item.equippingBlock.ammoType], // primary, special, heavy...
            'slot': manifest.item_category[item.itemCategoryHashes[0]].shortTitle, // kinetic, energy, power...
            'damage_type': manifest.damage_type[item.defaultDamageTypeHash].displayProperties.name, // arch, solar, void...
            'item_type': 'weapon',
            'tier': item.inventory.tierTypeName, // legendary, exotic...
            'formula_numbers': formula_numbers(),
            'sockets': {
                'perks': {
                    'random':  sockets.curated_random('randomizedPlugSetHash'), // random perks weapon can roll
                    'curated': sockets.curated_random('reusablePlugSetHash'),   // curated perks weapon can roll
                },
                'frame': item.sockets.socketEntries[socket_indexes.intrinsic].singleInitialItemHash,
                'mods': sockets.mods(), // all mods weapon can use
                'masterwork': sockets.masterwork()
            },
            'stats': {
                'investment': stats.investment(),
                'base': stats.stats(),
                'stat_group': stats.stat_group()
            }
        }
    }
    function armor(item, manifest) {
        function perk() {
            let plug_set_id = item.sockets.socketEntries[11].reusablePlugSetHash
            if (!plug_set_id) return null
            return manifest.plug_sets[plug_set_id].reusablePlugItems.map(perk => perk.plugItemHash)
        }
        return {
            'name': item.displayProperties.name,
            'icon': item.displayProperties.icon.replace('/common/destiny2_content/icons/', ''),
            'perk': perk(),
            'item_type': 'armor',
            'tier': item.inventory.tierTypeName
        }
    }
    function mod_perk(item, community_data) {
        function description() {
            let community_description = community_data[item.hash]?.description

            if(community_description || item.investmentStats.length != 0) {
                return covert_description(community_description, item)
            } else {
                return [{
                    node_type: 'div',
                    textContent: item.displayProperties.description
                }]
            }
            //else if(item.investmentStats.length != 0) {
            //     return item.investmentStats.map(stat => {
            //         return {
            //             node_type: 'div',
            //             className: 'Clarity_stat',
            //             append: [
            //                 {
            //                     node_type: 'div',
            //                     textContent: `{stat-id=${stat.statTypeHash}} `
            //                 },
            //                 {
            //                     node_type: 'div',
            //                     textContent: clarity_random_data.stat_names[stat.statTypeHash]
            //                 }
            //             ]
            //         }
            //     })
            // }
            // return (community_description) ? covert_description(community_description) :
        }
        function investment() {
            return item.investmentStats?.reduce((acc, stat) => {
                if(clarity_random_data.stat_blacklist[stat.statTypeHash]) return acc// ignore these stat id's
                return ({ ...acc, [stat.statTypeHash]: {value: stat.value, conditional: stat.isConditionallyActive}})
            }, {})
        }

        return {
            'name': item.displayProperties.name,
            'icon': item.displayProperties.icon.replace('/common/destiny2_content/icons/', ''),
            'item_type': 'mod_perk',
            'description': description(),
            'investment': investment(),
            'stats': {
                'reload': community_data[item.hash]?.stats?.reload,
                'range': community_data[item.hash]?.stats?.range,
                'handling': community_data[item.hash]?.stats?.handling,
            }
        }
    }
})()

function user_data() {
    clarity_user_data = {}
    Promise.all([
        fetch_bungie('user_info'),
        indexed_DB('keyval-store', 'keyval', 'd2-manifest')
    ])
    .then(data => {
        let parser_start = Date.now()
        let user_data = data[0].Response
        let manifest = {
            inventory_item: data[1].DestinyInventoryItemDefinition,
            stat_group:     data[1].DestinyStatGroupDefinition,
            stat_names:     data[1].DestinyStatDefinition,
            item_category:  data[1].DestinyItemCategoryDefinition,
            damage_type:    data[1].DestinyDamageTypeDefinition,
            plug_sets:      data[1].DestinyPlugSetDefinition,
            socket_type:    data[1].DestinySocketTypeDefinition,
        }

        let all_items = user_data.profileInventory.data.items
        Object.values(user_data.characterInventories.data).forEach(x => all_items = all_items.concat(x.items))
        Object.values(user_data.characterEquipment  .data).forEach(x => all_items = all_items.concat(x.items))

        for (let i = 0; i < all_items.length; i++) {
            const unique_id = all_items[i].itemInstanceId
            if(!unique_id) continue // check if it has instanced (unique) id
            let item = manifest.inventory_item[all_items[i].itemHash]
            if (item.itemType == 3) {
                clarity_user_data[unique_id] = get_unique_items(unique_id, user_data, manifest, all_items[i].itemHash, 'weapon')
            }
            if (item.itemType == 2  && item.inventory.tierTypeName == 'Exotic') {
                clarity_user_data[unique_id] = get_unique_items(unique_id, user_data, manifest, all_items[i].itemHash, 'armor')
            }
        }
        console.log(`%c User data parsed in: ${Date.now() - parser_start} ms`, 'border: 3px solid green; padding: 2px')
    })
    function get_unique_items(unique_id, user_data, manifest, id, type) {
        function check_type(id) {
            let perk_types = clarity_random_data.perk_types
            if (perk_types[manifest.inventory_item[id].plug.plugCategoryHash]) return true
            return false
        }
        const sockets = {
            perks: {
                active() {
                    return user_data.itemComponents.sockets.data[unique_id].sockets
                    .flatMap(perk => {
                        return (
                            perk.isEnabled &&
                            perk.isVisible &&
                            check_type(perk.plugHash)
                        ) ? perk.plugHash : []
                    })
                },
                rolled() {
                    const data = user_data.itemComponents.reusablePlugs.data[unique_id]?.plugs
                    if(!data) return
                    let perk_array = Object.values(data)
                    .map(perk_slot => {
                        return perk_slot.flatMap(perk => {
                            return (
                                perk.canInsert &&
                                perk.enabled &&
                                check_type(perk.plugItemHash)
                            ) ? perk.plugItemHash : []
                        })
                    })
                    .filter(array => array.length != 0)

                    return (perk_array.length != 0) ? perk_array : undefined
                }
            },
            masterwork() {
                return user_data.itemComponents.sockets.data[unique_id].sockets.find(masterwork => {
                    let x = manifest.inventory_item[masterwork.plugHash]?.plug.plugCategoryIdentifier
                    if(!x) return false
                    return (x.includes('masterwork') && !x.includes('tracker'))
                })?.plugHash
            },
            mod() {
                return user_data.itemComponents.sockets.data[unique_id].sockets.find(perks_mods =>
                    manifest.inventory_item[perks_mods.plugHash]?.itemTypeDisplayName == 'Weapon Mod'
                )?.plugHash
            }
        }
        try {
            clarity_manifest[id].name
        } catch  {
            id
            debugger
        }
        if (type == 'weapon') return {
            'name': clarity_manifest[id].name,
            'id': id,
            'item_type': type,
            'sockets': {
                'perks': {
                    'active': sockets.perks.active(),
                    'rolled': sockets.perks.rolled()
                },
                'masterwork': sockets.masterwork(),
                'mod': sockets.mod()
            }
        }
        return {
            'name': clarity_manifest[id].name,
            'id': id,
            'item_type': type,
            'sockets': {
                'perks': user_data.itemComponents.sockets.data[unique_id].sockets[11].plugHash
            }
        }

    }
}

