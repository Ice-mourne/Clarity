(() => { // create settings on first launch or incase cache was cleared
    if (local_get('clarity_settings') && local_get('clarity_settings').settings_version != 1) return
    let dim_url = document.querySelector('body').baseURI
    let dim_version = dim_url.slice(8, dim_url.search('.destiny'))
    function version() {
        if(dim_version == 'beta') return {'k':'Y2RhN2I2ZTRmYzlmNDlhZGE0ZmVkNjE4ZTExODQxYWI=','i':'37074','s':'MzcwNzQ6eHhYUU1zMjl1OTBBcnpCVi50U2J1MU1Bei01Z1ZoeXdPSmNET3NNWjdjaw=='}
        if(dim_version == 'app') return {'k':'N2I4ZWExNGM0MjZjNGE1MDg1M2MyM2JjZTJkZDU1ZGE=','i':'37290','s':'MzcyOTA6LTA4RnV3RWJ1Wk1TSU03bElvSWNoeVl2bHJkSXpWVlFQMUdUbWk4OVBIcw=='}
    }
    let settings = {
        'dark_mode': false,
        'dark_mode_colors': {
            'background_color_1': 'hsl(240, 21%, 16%)',
            'background_color_2': 'hsl(240, 30%, 4%)',
            'masterwork_item': 'hsl(50, 90%, 65%)',
            'masterwork_item_text': 'hsl(0, 0%, 0%)'
        },
        'settings_version': 2,
        'version': version()
    }
    local_set('clarity_settings', settings)
}) ()
function element_creator(type, properties, extra) {
    let element = document.createElement(type)
    Object.entries(properties).forEach(property => {
        element[property[0]] = property[1]
    })
    if(extra?.img) element.src = chrome.runtime.getURL(extra.img)
    return element
}
//--- - - - - - - - - - - - - - - - - - - - - - - - - - Storage related stuff - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 ** Get or store data to local storage with automatic JSON conversions.
 ** Then value is present store data otherwise get data from local storage.
 * @param {string} key local storage name
 * @param {*} value optional value to store
 */
 function local_storage(key, value) {
    if(value) {
        let new_value
        try {
            new_value = JSON.stringify(value)
        }
        catch {
            new_value = value
        }
        localStorage.setItem(key, new_value)
        return
    }

    let item = localStorage.getItem(key)
    try {
        return JSON.parse(item)
    }
    catch {
        return item
    }
}
/**
 ** Get or store data to session storage with automatic JSON conversions.
 ** Then value is present store data otherwise get data from session storage.
 * @param {string} key session storage name
 * @param {*} value optional value to store
 */
function session_storage(key, value) {
    if(value) {
        let new_value
        try {
            new_value = JSON.stringify(value)
        }
        catch {
            new_value = value
        }
        sessionStorage.setItem(key, new_value)
        return
    }

    let item = sessionStorage.getItem(key)
    try {
        return JSON.parse(item)
    }
    catch {
        return item
    }
}
/**
 ** Get promise with data from indexedDB
 *
 * Todo: Add option to store data and better error handling also but ehh
 * @param {string} db Database name
 * @param {string} store Stores name in database
 * @param {string} key Key identifying location of data
 * @returns Promise with requested content from IndexedDB
 */
async function indexed_DB(db, store, key) {
    const x = await new Promise((resolve, reject) => {
        let indexed_db = window.indexedDB.open(db)
        indexed_db.onsuccess = e => {
            let db_1 = e.target.result
            let tx = db_1.transaction(store, 'readonly')
            let st = tx.objectStore(store)
            let data = st.get(key)
            data.onsuccess = () => resolve(data.result)
            data.onerror = () => reject(data)
        }
        indexed_db.onerror = () => reject(data)
        // onerror was put like what ever because newer had problems and didn't bother to make anything decent
    })
    return x
}
/**
 * @param {string} path Path to the configuration
 * @param {*} value value to configure
 */
 function update_clarity_settings(path, value) {
    let stuff = local_get('clarity_settings')
    stuff[path] = value
    local_set('clarity_settings', stuff)
}
//--- - - - - - - - - - - - - - - - - - - - - - - - - - Calculators - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * Calculates in game stat
 * @param {number} investment_stat Investment stat value
 * @param {array} stat_group Stat group array for specific perk and weapon
 * @param {number} id Stat hash
 * @returns {number} Calculated in game stat
 */
 function stat_calculator(investment_stat, stat_group, id) {
    if(isNaN(investment_stat)) return;
    let inv_stat = Math.min(Math.max(investment_stat, 0), 100) // min max to keep values in range of possible
    switch (id * 1) { // making sure id is number
        case 1345609583: // Aim Assistance
        case 2715839340: // Recoil Direction
        case 3555269338: // Zoom
            return inv_stat
        case 1240592695: // Range
        case 4188031367: // Reload Speed
        case 155624089:  // Stability
        case 2837207746: // Swing Speed
        case 2523465841: // Velocity
            return 10 + inv_stat * 0.9
        case 1931675084: // Inventory size
            // no clue what to do with it
            break
        default:
            return calculate()
    }
    function calculate() {
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
/**
 ** Calculates weapon normal & empty magazine reload time
 * @param {number} stat Calculated weapon reload stat
 * @param {object} formula Numbers used in formula for weapon
 * @param {number} magazine Magazine size
 * @param {array} active_perks Array of active perks
 * @param {number} multiplayer Multiplayer present on perks like drop mag
 * @returns {object} In game weapon reload time in seconds
 */
function reload_calculator(stat, magazine, formula, multiplayer, active_perks) {
    formula = formula.reload
    stat = Math.min(Math.max(stat, 10), 100)
    multiplayer = (multiplayer) ? multiplayer : 1

    let shotgun_multiplayer = 1
    if(formula.use_multiplayer) {
        let check = active_perks.findIndex(x => x.plugHash == 25606670) // check if dual loader is active perk
        shotgun_multiplayer = (check != -1) ? Math.ceil(magazine / 2) : magazine
    }
    let normal = ((formula.a * stat * stat + formula.b * stat + formula.c) * multiplayer / shotgun_multiplayer).toFixed(2)

    let list = [806997698, 878286503, 996573084, 2353477480, 3364911712, 3920852688] // list of all rapid fire frame id's
    let empty_multi = (active_perks.findIndex(x => list.findIndex(z => z == x.plugHash ) != -1) == -1) ? 1 : 0.8 // multiplayer for rapid fire frames then mag is empty
    let empty = normal * empty_multi
    return {
        'default': normal * 1,
        'empty': empty * 1,
        'difference': (normal - empty) * 1 // difference between normal reload and reload them mag is empty
    }
}
/**
 ** Calculates weapon ADS & HIP Min & Max range
 * @param {number} range_stat Calculated weapon range stat
 * @param {number} zoom_stat Calculated weapon zoom stat
 * @param {object} formula Numbers used in formula for weapon
 * @param {number} multiplayer Optional multiplayer
 * @returns {object} In game range in meters
 */
function range_calculator(range_stat, zoom_stat, formula, multiplayer) {
    formula = formula.range
    range_stat = Math.min(Math.max(range_stat, 10), 100)
    multiplayer = (multiplayer) ? multiplayer : 1

    let new_zoom = (zoom_stat - formula.zoom_tier) / 10 + formula.zrm
    let HIP_min = range_stat * formula.vpp + formula.base_range
    let HIP_max = (formula.scale) ? range_stat * formula.vpp + formula.max_base_range : max_base_range
    return {
        'ADS_min': HIP_min * new_zoom * multiplayer,
        'ADS_max': HIP_max * new_zoom * multiplayer,
        'HIP_min': HIP_min * 1,
        'HIP_max': HIP_max * 1,
    }
}
/**
 ** Calculates weapon ready & stow speed
 * @param {number} stat Calculated weapon handling stat
 * @param {object} formula Numbers used in formula for weapon
 * @param {number} multiplayer  Multiplayer present on Threatdetector and some other things
 * @returns {object} In game weapon stow ready time in seconds
 */
function handling_calculator(stat, formula, multiplayer) {
    formula = formula.handling
    stat = Math.min(Math.max(stat, 10), 100)
    multiplayer = (multiplayer) ? multiplayer : 1

    let stow_numbers  = formula.handling.stow
    let ready_numbers = formula.handling.ready
    return {
        "stow":  (stow_numbers.vpp  * stat + stow_numbers.number)  * multiplayer,
        "ready": (ready_numbers.vpp * stat + ready_numbers.number) * multiplayer,
    }
}
//--- - - - - - - - - - - - - - - - - - - - - - - - - - Filtering data - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * Finds numbers used in formulas used to calculate in game stats
 * @param {object} item weapon from manifest
 * @param {object} formulas fetched json with formulas
 * @returns {object} numbers for formulas
 */
function get_formula(item, formulas) {
    let item_type = item.itemTypeDisplayName
    let z = item.sockets.socketCategories.find(x => x.socketCategoryHash == 3956125808)
    let frame_id = item.sockets.socketEntries[z.socketIndexes[0]].singleInitialItemHash
    return formulas[item_type][frame_id]
}
/**
 * Finds unique and static id's for weapons and armor
 * @param {object} user_data
 * @param {object} inventory_item
 * @returns {array} array with unique and static id's
 */
function find_item_ids(user_data, inventory_item) {
    let item_ids = []
    function find_hare(items) {
        for (let i = 0; i < items.length; i++) {
            if (items[i].itemInstanceId && (inventory_item[items[i].itemHash].itemType == 3 || inventory_item[items[i].itemHash].itemType == 2)) { // if has instanced id and is weapon or armor
                let x = []
                x.push(items[i].itemInstanceId)
                x.push(items[i].itemHash)
                x.push(inventory_item[items[i].itemHash].itemType)
                item_ids.push(x)
            }
        }
    }
    find_hare(user_data.profileInventory.data.items)
    Object.entries(user_data.characterInventories.data).forEach(x => find_hare(x[1].items))
    Object.entries(user_data.characterEquipment  .data).forEach(x => find_hare(x[1].items))
    return item_ids
}
/**
 * Finds all weapon investment stats
 * @param {number} unique_id unique item id generated for users item
 * @param {number} static_id universal id used in inventory item
 * @param {object} user_data json containing all user data
 * @param {object} inventory_item inventory item from manifest
 * @returns {object} object with stat id's and investment stats
 */
 function get_item_investment_stats(unique_id, static_id, user_data, inventory_item) {
    let investment_stats = {}
    user_data.itemComponents.sockets.data[unique_id].sockets
    .filter(perk => perk.isEnabled && perk.isVisible && perk.plugHash != 3511092054)
    .map(perk => filter_and_add_stats(inventory_item[perk.plugHash].investmentStats)) // perk stats

    filter_and_add_stats(inventory_item[static_id].investmentStats) // weapon stats

    function filter_and_add_stats(data) {
        data.filter(x => x.statTypeHash != 1885944937 && x.statTypeHash != 1935470627 && x.statTypeHash != 1480404414 && x.statTypeHash != 3291498656) // filter out crap stats
        .map(stat => {
            if (investment_stats[stat.statTypeHash]) {
                investment_stats[stat.statTypeHash] += stat.value
            } else {
                investment_stats[stat.statTypeHash] = stat.value
            }
        })
    }
    return investment_stats
}
/**
 * Finds all stat groups on weapon
 * @param {object} item Specific item from manifest
 * @param {object} stat_group Stat group json
 * @returns {object} Object with stat groups for all stats
 */
function get_stat_group(item, stat_group) {
    stat_group_object = {}
    stat_group[item.stats.statGroupHash].scaledStats.forEach(x => {stat_group_object[x.statHash] = x.displayInterpolation})
    return stat_group_object
}



function get_active_perks() {
    //           Arrow,      Barrel,     Battery,    Blade,      Bowstring,  Grip,       Guard,     Launcher Barrel, Magazine,   Scope,      Stock,     Trait    Magazine gl
    let perks = [1257608559, 2833605196, 1757026848, 1041766312, 3809303875, 3962145884, 683359327, 1202604782,      1806783418, 2619833294, 577918720, 7906839, 2718120384]
    return user_data.itemComponents.sockets.data[unique_id].sockets
        .filter(active_perk => active_perk.plugHash != undefined && perks.indexOf(inventory_item[active_perk.plugHash].plug.plugCategoryHash) > -1)
        .map(active_perk => active_perk.plugHash)
}
//--- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
