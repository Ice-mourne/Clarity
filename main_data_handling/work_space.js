function build_description() {
    const custom_description = wep_perks[perk_id]
    const formula = get_formula(item, wep_formulas) // object with range, reload, ect numbers
    const stuff = [
        weapon_stat_group = get_stat_group(item, stat_group),
        investment_stats = get_item_investment_stats(unique_id, item.hash, user_data, inventory_item),
        active_perks = user_data.itemComponents.sockets.data[unique_id].sockets
        .filter(active_perk => active_perk.plugHash != undefined && perk_types.indexOf(inventory_item[active_perk.plugHash].plug.plugCategoryHash) > -1)
        .map(active_perk => active_perk.plugHash)
    ]
    let description = ''
    if (custom_description) {
        let new_description = new Replace_placeholders(custom_description, formula, stuff, perk_id, inventory_item)
        if (custom_description.range    && formula.range)    new_description.range()
        //if (custom_description.reload   && formula.reload)   new_description.reload()
        //if (custom_description.handling && formula.handling) new_description.handling() // TODO: add handling
        description = new_description.complete()
    } else { // if perk doesn't have custom description just add default
        if (json.inventory_item[perk_id].investmentStats.length == 0) { // except for perks with stats
            description = `<div class='new_pd'>${json.inventory_item[perk_id].displayProperties.description}</div>`
        }
    }
    // this deals with perk stats only
    if (inventory_item[perk_id].investmentStats.length != 0) description = add_perk_stats()
}
class Replace_placeholders {
    constructor(description, formula, stuff, perk_id, inventory_item) {
        this.description    = description
        this.formula        = formula
        this.stat_group     = stuff[0]
        this.inv_stats      = stuff[1]
        this.active_perks   = stuff[2]
        this.perk_id        = perk_id
        this.inventory_item = inventory_item

        this.reload_id   = 4188031367
        this.magazine_id = 3871231066
        this.handling_id = 943549884

        this.new_description = description.text
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
            'loop':        this.description.range.conditional?.loop, // juts number in database determining how many placeholders where are
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
    complete() {
        return this.new_description
    }
}

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
            'multiplayer': this.multiplayer.range
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