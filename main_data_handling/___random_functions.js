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
 * @param {number} investment_stat
 * @param {array} stat_group
 * @param {number} id
 * @returns {number}
 */
function stat_calculator(investment_stat, stat_group, id) {
    if(isNaN(investment_stat)) return false
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
        default:
            if (stat_group && id != 1931675084) return calculate() // its inventory size id no clue what to do with it
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
 * @param {number} unique_id unique item id generated for users item
 * @param {number} static_id universal id used in inventory item
 * @param {object} user_data data containing user data
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
        data.filter(x => x.statTypeHash != 1885944937 && x.statTypeHash != 1935470627 && x.statTypeHash != 1480404414 && x.statTypeHash != 3291498656)
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
function reload_calculator(formula, stat, multiplayer) {
    return ((formula.a * stat * stat + formula.b * stat + formula.c) * multiplayer).toFixed(2)
}
function range_calculator(formula, range_stat, zoom_stat, zoom_multiplayer) {
    let new_zoom = (zoom_stat - formula.zoom_tier) / 10 + formula.zrm
    return ((range_stat * formula.vpp + formula.base_range) * new_zoom * zoom_multiplayer).toFixed(2)
}
function get_formula(item, formula_json) {
    let item_type = item.itemTypeDisplayName
    let z = item.sockets.socketCategories.find(x => x.socketCategoryHash == 3956125808)
    let frame_id = item.sockets.socketEntries[z.socketIndexes[0]].singleInitialItemHash
    let directions = (formula_json[item_type][frame_id]) ? formula_json[item_type][frame_id].value : false
    return (formula_json[item_type][directions]) ? formula_json[item_type][directions] : false
}
function get_stat_group(item, stat_group) {
    stat_group_object = {}
    stat_group[item.stats.statGroupHash].scaledStats.forEach(x => {stat_group_object[x.statHash] = x.displayInterpolation})
    return stat_group_object
}
/**
 * @param {string} db IndexedDB name
 * @param {string} store Store name
 * @param {string} key Key name
 * @returns {Promise} Promise with data
 */
function get_from_indexedDB(db, store, key) {
    return new Promise((resolve, reject) => {
        let dim_indexed_db = window.indexedDB.open(db)
        dim_indexed_db.onsuccess = e => {
            let db = e.target.result
            let tx = db.transaction(store, 'readonly')
            let st = tx.objectStore(store)
            let data = st.get(key)
            data.onsuccess = () => resolve(data.result)
        }
    })
}