window.addEventListener('update_item_info', work_on_item_info)
window.addEventListener('auth_complete', work_on_item_info, {once: true})
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
            // masterwork: json_data[1].masterwork, // todo add this to database
        }
        let user_data = json_data[2].Response

        let manifest = {
            inventory_item: json_data[3].DestinyInventoryItemDefinition,
            stat_group:     json_data[3].DestinyStatGroupDefinition,
            stat_names:     json_data[3].DestinyStatDefinition,
            item_category:  json_data[3].DestinyItemCategoryDefinition,
            damage_type:    json_data[3].DestinyDamageTypeDefinition,
            plug_sets:      json_data[3].DestinyPlugSetDefinition,
            socket_type:    json_data[3].DestinySocketTypeDefinition,
        }
        sort_data(user_data, manifest, wep_formulas, community_data)
    })
}
function sort_data(user_data, manifest, wep_formulas, community_data) {
    console.time('timer')
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
    let item_list = {}
    for (let i = 0; i < item_ids.length; i++) {
        const unique_id = item_ids[i][0]
        const item = manifest.inventory_item[item_ids[i][1]]
        if (item.itemType == 3                                           ) item_list[unique_id] = weapon(unique_id, item)
        if (item.itemType == 2 && item.inventory.tierTypeName == 'Exotic') item_list[unique_id] = armor(unique_id, item)
    }
    function weapon(unique_id, item) {
        function check_type(id, use_manifest) {
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
                7906839,    // Trait // named frame in API
                2718120384  // Magazine gl
            ]

            if (use_manifest) return perk_types.includes(manifest.inventory_item[id].plug.plugCategoryHash) // return true if its one of listed perk types
            return perk_types.includes(id)
        }
        let socket_indexes = {
            'intrinsic': item.sockets.socketCategories.find(socket_category => socket_category.socketCategoryHash == 3956125808).socketIndexes,
            'perks': item.sockets.socketCategories.find(socket_category => socket_category.socketCategoryHash == 4241085061).socketIndexes,
            'mods': item.sockets.socketCategories.find(socket_category => socket_category.socketCategoryHash == 2685412949)?.socketIndexes
        }
        const ms_list = {
            "stability": [
                1590375901,
                1590375902,
                1590375903,
                1590375896,
                1590375897,
                1590375898,
                1590375899,
                1590375892,
                1590375893,
                384158423
            ],
            "range": [
                150943607,
                150943604,
                150943605,
                150943602,
                150943603,
                150943600,
                150943601,
                150943614,
                150943615,
                2697220197
            ],
            "handling": [
                518224747,
                518224744,
                518224745,
                518224750,
                518224751,
                518224748,
                518224749,
                518224738,
                518224739,
                186337601
            ],
            "impact": [
                1486919755,
                1486919752,
                1486919753,
                1486919758,
                1486919759,
                1486919756,
                1486919757,
                1486919746,
                1486919747,
                3486498337
            ],
            "reload": [
                4283235143,
                4283235140,
                4283235141,
                4283235138,
                4283235139,
                4283235136,
                4283235137,
                4283235150,
                4283235151,
                758092021
            ],
            "blast": [
                3928770367,
                3928770364,
                3928770365,
                3928770362,
                3928770363,
                3928770360,
                3928770361,
                3928770358,
                3928770359,
                3803457565
            ],
            "velocity": [
                4105787909,
                4105787910,
                4105787911,
                4105787904,
                4105787905,
                4105787906,
                4105787907,
                4105787916,
                4105787917,
                1154004463
            ],
            "charge_time": [
                3353797898,
                3353797897,
                3353797896,
                3353797903,
                3353797902,
                3353797901,
                3353797900,
                3353797891,
                3353797890,
                3128594062
            ],
            "draw_time": [
                2203506848,
                2203506851,
                2203506850,
                2203506853,
                2203506852,
                2203506855,
                2203506854,
                2203506857,
                2203506856,
                1639384016
            ],
            "accuracy": [
                892374263,
                892374260,
                892374261,
                892374258,
                892374259,
                892374256,
                892374257,
                892374270,
                892374271,
                2993547493
            ]
        }
        const weapon_masterworks = {
            'Auto Rifle':          {'stability': ms_list.stability, 'handling': ms_list.handling, 'reload':    ms_list.reload,    'range':    ms_list.range   },
            'Combat Bow':          {'stability': ms_list.stability, 'handling': ms_list.handling, 'draw_time': ms_list.draw_time, 'accuracy': ms_list.accuracy},
            'Fusion Rifle':        {'stability': ms_list.stability, 'handling': ms_list.handling, 'reload':    ms_list.reload,    'range':    ms_list.range,	'charge_time': ms_list.charge_time},
            'Grenade Launcher':    {'stability': ms_list.stability, 'handling': ms_list.handling, 'blast':     ms_list.blast,     'velocity': ms_list.velocity},
            'Hand Cannon':         {'stability': ms_list.stability, 'handling': ms_list.handling, 'reload':    ms_list.reload,    'range':    ms_list.range   },
            'Linear Fusion Rifle': {'stability': ms_list.stability, 'handling': ms_list.handling, 'reload':    ms_list.reload,    'range':    ms_list.range,	'charge_time': ms_list.charge_time},
            'Machine Gun':         {'stability': ms_list.stability, 'handling': ms_list.handling, 'reload':    ms_list.reload,    'range':    ms_list.range   },
            'Pulse Rifle':         {'stability': ms_list.stability, 'handling': ms_list.handling, 'reload':    ms_list.reload,    'range':    ms_list.range   },
            'Rocket Launcher':     {'stability': ms_list.stability, 'handling': ms_list.handling, 'blast':     ms_list.blast,     'velocity': ms_list.velocity},
            'Scout Rifle':         {'stability': ms_list.stability, 'handling': ms_list.handling, 'reload':    ms_list.reload,    'range':    ms_list.range   },
            'Shotgun':             {'stability': ms_list.stability, 'handling': ms_list.handling, 'reload':    ms_list.reload,    'range':    ms_list.range   },
            'Sidearm':             {'stability': ms_list.stability, 'handling': ms_list.handling, 'reload':    ms_list.reload,    'range':    ms_list.range   },
            'Sniper Rifle':        {'stability': ms_list.stability, 'handling': ms_list.handling, 'reload':    ms_list.reload,    'range':    ms_list.range   },
            'Submachine Gun':      {'stability': ms_list.stability, 'handling': ms_list.handling, 'reload':    ms_list.reload,    'range':    ms_list.range   },
            'Sword':               {'impact': ms_list.impact}
        }
        function ammo_type() {
            switch (item.equippingBlock.ammoType) {
                case 1:
                    return 'primary'
                case 2:
                    return 'special'
                case 3:
                    return 'heavy'
            }
        }
        const perks = {
            active() {
                return user_data.itemComponents.sockets.data[unique_id].sockets
                .flatMap(perk => {
                    return (
                        perk.isEnabled &&
                        perk.isVisible &&
                        check_type(perk.plugHash, true)
                    ) ? perk.plugHash : []
                })
            },
            rolled() {
                const data = user_data.itemComponents.reusablePlugs.data[unique_id]?.plugs
                if(!data) return
                let perk_array = Object.entries(data)
                .map(perk_slot => {
                    return perk_slot[1].flatMap(perk => {
                        return (
                            perk.canInsert &&
                            perk.enabled &&
                            check_type(perk.plugItemHash, true)
                        ) ? perk.plugItemHash : []
                    })
                })
                .filter(array => array.length != 0)

                return (perk_array.length != 0) ? perk_array : undefined
            },
            curated_random(type) {
                let perk_array = socket_indexes.perks.flatMap(index => {
                    const socket_entry = item.sockets.socketEntries[index]
                    const socket_type_id = manifest.socket_type[socket_entry.socketTypeHash]

                    if(!check_type(socket_type_id.plugWhitelist[0].categoryHash, false)) return [] // check if perk type is actually perk // kill tracker is "perk" because bongo

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

                return (perk_array.length != 0) ? perk_array : undefined
            }
        }
        const mods = {
            active() {
                return user_data.itemComponents.sockets.data[unique_id].sockets.find(perks_mods =>
                    manifest.inventory_item[perks_mods.plugHash]?.itemTypeDisplayName == 'Weapon Mod'
                )?.plugHash
            },
            all() {
                if(!socket_indexes.mods) return undefined
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
                return (mod_array.length != 0) ? mod_array : undefined
            }
        }
        const masterwork = {
            active() {
                return user_data.itemComponents.sockets.data[unique_id].sockets.find(masterwork => {
                    let x = manifest.inventory_item[masterwork.plugHash]?.plug.plugCategoryIdentifier
                    if(!x) return false
                    return (x.includes('masterwork') && !x.includes('tracker'))
                })?.plugHash
            },
            all() {
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
                    if(/1480404414|1935470627|1885944937|3291498656/.test(val.statTypeHash)) return acc// ignore these stat id's
                    return ({ ...acc, [val.statTypeHash]: val.value})
                }, {})
            },
            stats() {
                let stats = item.stats.stats
                return Object.keys(stats).reduce((acc, val) => {
                    if(/1480404414|1935470627|1885944937|3291498656/.test(val)) return acc// ignore these stat id's
                    return ({ ...acc, [val]: stats[val].value})
                }, {})
            },
            stat_group() {
                return manifest.stat_group[item.stats.statGroupHash].scaledStats.reduce((acc, val) =>
                    ({ ...acc, [val.statHash]: val.displayInterpolation}), {}
                )
            }
        }
        return {
            'name': item.displayProperties.name,
            'icon': item.displayProperties.icon.replace('/common/destiny2_content/icons/', ''),
            'type': item.itemTypeDisplayName, // hand cannon, sniper, shotgun...
            'ammo': ammo_type(), // primary, special, heavy...
            'slot': manifest.item_category[item.itemCategoryHashes[0]].shortTitle, // kinetic, energy, power...
            'damage_type': manifest.damage_type[item.defaultDamageTypeHash].displayProperties.name, // arch, solar, void...
            'item_type': 'weapon',
            'tier': item.inventory.tierTypeName, // legendary, exotic...
            'perks': {
                'active':  perks.active(), // currently selected perks // unique item
                'rolled':  perks.rolled(), // selectable perks // unique item
                'random':  perks.curated_random('randomizedPlugSetHash'), // random perks weapon can roll
                'curated': perks.curated_random('reusablePlugSetHash'),   // curated perks weapon can roll
                'frame':   item.sockets.socketEntries[0].singleInitialItemHash
            },
            'mods': {
                'active': mods.active(), // mod on unique weapon // if weapon dont have mod them empty socked id // if weapon can't have mod undefined
                'all': mods.all() // all mods weapon can use
            },
            'masterwork': {
                'active': masterwork.active(), // todo
                'all': masterwork.all(), // todo
            },
            'stats': {
                'investment': stats.investment(), // todo
                'stats': stats.stats(), // todo
                'stat_group': stats.stat_group() // todo
            }
        }
    }
    function armor(unique_id, item) {
        const perk_id = user_data.itemComponents.sockets.data[unique_id].sockets[11].plugHash
        return {
            'name': item.displayProperties.name,
            'icon': item.displayProperties.icon.replace('/common/destiny2_content/icons/', ''),
            'perk': {
                'id': perk_id,
                'name': manifest.inventory_item[perk_id].displayProperties.name,
                'icon': manifest.inventory_item[perk_id].displayProperties.icon.replace('/common/destiny2_content/icons/', '')
            },
            'item_type': 'armor',
            'tier': item.inventory.tierTypeName
        }
    }
    console.timeEnd('timer')
    add_more_info(item_list, manifest, wep_formulas, community_data)
    local_storage('clarity_inventory', item_list)
    // console.log(JSON.parse(JSON.stringify(item_list)))
}
function add_more_info(item_list, manifest, wep_formulas, community_data) {
    Object.entries(item_list).forEach(item => {
        if(item[1].item_type == 'weapon') update_weapon(item)
        // update_armor()
    })

    function update_weapon(item) {
        const perks_loc = item_list[item[0]].perks
        // active perks
        perks_loc.active = perks_loc.active.reduce((acc, val) => {
            return ({ ...acc, [val]: wep_mods_perk_info(val, 'weapon_perks')})
        }, {})
        // rolled perks
        perks_loc.rolled = perks_loc.rolled?.map(perks =>
            perks.map(perk => {
                return {
                    [perk]: wep_mods_perk_info(perk, 'weapon_perks')
                }
            })
        )
        // random perks
        perks_loc.random = perks_loc.random?.map(perks =>
            perks.map(perk => {
                return {
                    'can_roll': perk.can_roll,
                    [perk.id]: wep_mods_perk_info(perk.id, 'weapon_perks')
                }
            })
        )
        // curated perks
        perks_loc.curated = perks_loc.curated.map(perks =>
            perks.map(perk => {
                return {
                    'can_roll': perk.can_roll,
                    [perk.id]: wep_mods_perk_info(perk.id, 'weapon_perks')
                }
            })
        )
        // frame
        perks_loc.frame = {[perks_loc.frame]: wep_mods_perk_info(perks_loc.frame, 'weapon_frames')}

        const mods_loc = item_list[item[0]].mods
        // mods active
        mods_loc.active = {[mods_loc.active]: wep_mods_perk_info(mods_loc.active, 'weapon_mods')}
        // mods all
        mods_loc.all = mods_loc.all?.reduce((acc, val) => {
            return ({ ...acc, [val]: wep_mods_perk_info(val, 'weapon_mods')})
        }, {})

        const masterwork_loc = item_list[item[0]].masterwork
        // masterwork active
        masterwork_loc.active = {[masterwork_loc.active]: wep_mods_perk_info(masterwork_loc.active, 'weapon_frames')} // todo change weapon_frames to masterwork
        // masterwork all
        if(masterwork_loc.all) masterwork_loc.all = Object.entries(masterwork_loc.all).reduce((acc, val) => {
            return ({ ...acc, [val[0]]: val[1].map(masterwork => {
                return wep_mods_perk_info(masterwork, 'weapon_mods') // todo change weapon_mods to masterwork
            })})
        }, {})
    }


    console.log(item_list);



    function wep_mods_perk_info(id, type) {
        if(!id) return
        function description() {
            let community_description = community_data[type][id]?.description
            if(community_description) return community_description
            return [
                {
                    "lineText": [
                        {
                            "text": manifest.inventory_item[id].displayProperties.description
                        }
                    ]
                }
            ]
        }
        function investment() {
            let stats = manifest.inventory_item[id].investmentStats.map(stat => {
                return {
                    'id': stat.statTypeHash,
                    'value': stat.value
                }
            })
            return (stats.length != 0) ? stats : undefined
        }
        return {
            'name': manifest.inventory_item[id].displayProperties.name,
            'icon': manifest.inventory_item[id].displayProperties.icon.replace('/common/destiny2_content/icons/', ''),
            'description': description(),
            'investment': investment()
        }
    }
}