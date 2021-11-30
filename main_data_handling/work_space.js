// const weapon_masterworks = { // all masterworks weapon type can get
//     'Auto Rifle':          {'stability': clarity_random_data.masterworks.stability, 'handling': clarity_random_data.masterworks.handling, 'reload':    clarity_random_data.masterworks.reload,    'range':    clarity_random_data.masterworks.range   },
//     'Combat Bow':          {'stability': clarity_random_data.masterworks.stability, 'handling': clarity_random_data.masterworks.handling, 'draw_time': clarity_random_data.masterworks.draw_time, 'accuracy': clarity_random_data.masterworks.accuracy},
//     'Fusion Rifle':        {'stability': clarity_random_data.masterworks.stability, 'handling': clarity_random_data.masterworks.handling, 'reload':    clarity_random_data.masterworks.reload,    'range':    clarity_random_data.masterworks.range,	'charge_time': clarity_random_data.masterworks.charge_time},
//     'Grenade Launcher':    {'stability': clarity_random_data.masterworks.stability, 'handling': clarity_random_data.masterworks.handling, 'blast':     clarity_random_data.masterworks.blast,     'velocity': clarity_random_data.masterworks.velocity},
//     'Hand Cannon':         {'stability': clarity_random_data.masterworks.stability, 'handling': clarity_random_data.masterworks.handling, 'reload':    clarity_random_data.masterworks.reload,    'range':    clarity_random_data.masterworks.range   },
//     'Linear Fusion Rifle': {'stability': clarity_random_data.masterworks.stability, 'handling': clarity_random_data.masterworks.handling, 'reload':    clarity_random_data.masterworks.reload,    'range':    clarity_random_data.masterworks.range,	'charge_time': clarity_random_data.masterworks.charge_time},
//     'Machine Gun':         {'stability': clarity_random_data.masterworks.stability, 'handling': clarity_random_data.masterworks.handling, 'reload':    clarity_random_data.masterworks.reload,    'range':    clarity_random_data.masterworks.range   },
//     'Pulse Rifle':         {'stability': clarity_random_data.masterworks.stability, 'handling': clarity_random_data.masterworks.handling, 'reload':    clarity_random_data.masterworks.reload,    'range':    clarity_random_data.masterworks.range   },
//     'Rocket Launcher':     {'stability': clarity_random_data.masterworks.stability, 'handling': clarity_random_data.masterworks.handling, 'blast':     clarity_random_data.masterworks.blast,     'velocity': clarity_random_data.masterworks.velocity},
//     'Scout Rifle':         {'stability': clarity_random_data.masterworks.stability, 'handling': clarity_random_data.masterworks.handling, 'reload':    clarity_random_data.masterworks.reload,    'range':    clarity_random_data.masterworks.range   },
//     'Shotgun':             {'stability': clarity_random_data.masterworks.stability, 'handling': clarity_random_data.masterworks.handling, 'reload':    clarity_random_data.masterworks.reload,    'range':    clarity_random_data.masterworks.range   },
//     'Sidearm':             {'stability': clarity_random_data.masterworks.stability, 'handling': clarity_random_data.masterworks.handling, 'reload':    clarity_random_data.masterworks.reload,    'range':    clarity_random_data.masterworks.range   },
//     'Sniper Rifle':        {'stability': clarity_random_data.masterworks.stability, 'handling': clarity_random_data.masterworks.handling, 'reload':    clarity_random_data.masterworks.reload,    'range':    clarity_random_data.masterworks.range   },
//     'Submachine Gun':      {'stability': clarity_random_data.masterworks.stability, 'handling': clarity_random_data.masterworks.handling, 'reload':    clarity_random_data.masterworks.reload,    'range':    clarity_random_data.masterworks.range   },
//     'Sword':               {'impact'   : clarity_random_data.masterworks.impact}
// }

// function weapon(item, manifest, wep_formulas) {
//     const socket_indexes = {
//         'intrinsic': item.sockets.socketCategories.find(socket_category => socket_category.socketCategoryHash == 3956125808).socketIndexes[0],
//         'perks': item.sockets.socketCategories.find(socket_category => socket_category.socketCategoryHash == 4241085061)?.socketIndexes,
//         'mods': item.sockets.socketCategories.find(socket_category => socket_category.socketCategoryHash == 2685412949)?.socketIndexes
//     }

//     const sockets = {
//         curated_random(type) {
//             if(!socket_indexes.perks) return null // some white weapons don't have perks
//             let perk_array = socket_indexes.perks.flatMap(index => {
//                 const socket_entry = item.sockets.socketEntries[index]
//                 const socket_type_id = manifest.socket_type[socket_entry.socketTypeHash]

//                 if(!clarity_random_data.perk_types[socket_type_id.plugWhitelist[0].categoryHash]) return [] // check if perk type is actually perk // kill tracker is "perk" because bongo

//                 const perks = manifest.plug_sets[socket_entry[type]]?.reusablePlugItems
//                 const look_in = (type == 'randomizedPlugSetHash') // if on random perks
//                 ? perks                                           // just look for random perks
//                 : perks                                           // if not look if there are any curated perks
//                 || socket_entry.reusablePlugItems                 // if where are no curated perks look in hare for curated perks

//                 return [look_in?.map(perk => {
//                     return {
//                         'can_roll': perk.currentlyCanRoll,
//                         'id': perk.plugItemHash
//                     }
//                 })]
//             })
//             .filter(perk => perk) // removes pesky undefined values

//             return (perk_array.length != 0) ? perk_array : null
//         },
//         mods() {
//             if(!socket_indexes.mods) return null
//             let wep_adept = (item.displayProperties.name.match(/ \(Timelost\)| \(Adept\)/)) ? true : false
//             let mod_array = socket_indexes.mods.flatMap(index => {
//                 const socket_entry = item.sockets.socketEntries[index]
//                 if(socket_entry.singleInitialItemHash != 2323986101) return [] // check if its empty mod socket

//                 return manifest.plug_sets[socket_entry.reusablePlugSetHash]?.reusablePlugItems.flatMap(mod => {
//                     if(mod.plugHash == 2323986101) return [] // ignore empty mod socket
//                     if(wep_adept) return mod.plugItemHash // return all mods
//                     let mod_adept = manifest.inventory_item[mod.plugItemHash].displayProperties.name.includes('Adept')
//                     if(!mod_adept) return mod.plugItemHash // return non adept mods
//                     if(mod_adept) return [] // return empty
//                 })
//             })
//             return (mod_array.length != 0) ? mod_array : null
//         },
//         masterwork() {
//             if(item.inventory.tierTypeName == 'Exotic') {
//                 return socket_indexes.mods.flatMap(index => {
//                     const socket_entry = item.sockets.socketEntries[index]
//                     if(socket_entry.singleInitialItemHash == 1498917124) return {'catalyst': [socket_entry.reusablePlugItems[0].plugItemHash]} // if empty catalyst socked
//                     return socket_entry.reusablePlugItems.flatMap(catalyst => {
//                         if(manifest.inventory_item[catalyst.plugItemHash].displayProperties.name == 'Upgrade Masterwork') return {'catalyst': [catalyst.plugItemHash]}
//                         return []
//                     })
//                 })[0]
//             }
//             else {
//                 if(item.inventory.tierTypeName == 'Legendary') return weapon_masterworks[item.itemTypeDisplayName]
//             }
//         }
//     }
//     const stats = {
//         investment() {
//             return item.investmentStats.reduce((acc, val) => {
//                 if(clarity_random_data.stat_blacklist[val.statTypeHash]) return acc// ignore these stat id's
//                 return ({ ...acc, [val.statTypeHash]: val.value})
//             }, {})
//         },
//         stats() {
//             let stats = item.stats.stats
//             return Object.keys(stats).reduce((acc, val) => {
//                 if(clarity_random_data.stat_blacklist[val]) return acc// ignore these stat id's
//                 return ({ ...acc, [val]: stats[val].value})
//             }, {})
//         },
//         stat_group() {
//             return manifest.stat_group[item.stats.statGroupHash].scaledStats.reduce((acc, val) =>
//                 ({ ...acc, [val.statHash]: val.displayInterpolation}), {}
//             )
//         }
//     }
//     function formula_numbers() {
//         const type = item.itemTypeDisplayName
//         const frame = item.sockets.socketEntries[socket_indexes.intrinsic].singleInitialItemHash
//         if (!wep_formulas[type][frame]) return null // incase frame info is missing not added
//         let category_name = wep_formulas[type][frame].category
//         return wep_formulas[type].category[category_name]
//     }

//     return {
//         'name': item.displayProperties.name,
//         'icon': item.displayProperties.icon.replace('/common/destiny2_content/icons/', ''),
//         'type': item.itemTypeDisplayName, // hand cannon, sniper, shotgun...
//         'ammo': clarity_random_data.ammo[item.equippingBlock.ammoType], // primary, special, heavy...
//         'slot': manifest.item_category[item.itemCategoryHashes[0]].shortTitle, // kinetic, energy, power...
//         'damage_type': manifest.damage_type[item.defaultDamageTypeHash].displayProperties.name, // arch, solar, void...
//         'item_type': 'weapon',
//         'tier': item.inventory.tierTypeName, // legendary, exotic...
//         'formula_numbers': formula_numbers(),
//         'sockets': {
//             'perks': {
//                 'random':  sockets.curated_random('randomizedPlugSetHash'), // random perks weapon can roll
//                 'curated': sockets.curated_random('reusablePlugSetHash'),   // curated perks weapon can roll
//             },
//             'frame': item.sockets.socketEntries[socket_indexes.intrinsic].singleInitialItemHash,
//             'mods': sockets.mods(), // all mods weapon can use
//             'masterwork': sockets.masterwork()
//         },
//         'stats': {
//             'investment': stats.investment(),
//             'base': stats.stats(),
//             'stat_group': stats.stat_group()
//         }
//     }
// }