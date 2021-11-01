window.addEventListener('weapon_pressed', e => info_about_weapon(e.detail))
function info_about_weapon(unique_id) {
    let parser_start = Date.now()

    const unique_item = clarity_user_data[unique_id]
    const static_item = clarity_manifest[unique_item.id]

    const perks = unique_item.sockets.perks.active // todo for testing this is fine but this has to be upgraded to support selected perks // also include frame mods ect

    // const stats = get_item_stats()

    console.log(unique_item); //----------------------------------------------------------------
    console.log(static_item); //----------------------------------------------------------------



    function reload_calculator(extra_stat, extra_multiplier) {
        //--- step 1 check if reload can be calculated
        const formula = static_item.formula_numbers?.reload
        if (!formula) return

        //--- step 2 define base stats
        let stat = stats[4188031367] // id reload speed
        let multiplier = 1
        let mag_multiplier = (formula.mag_multiplier) ? stats[3871231066] : 1 // id magazine
        let empty_multiplier = 1

        //--- step 3 update base values
        let dual_loader = false
        perks.forEach(perk => {
            let perk_info = clarity_manifest[perk].stats.reload
            if(!perk_info) return

            // perk stat
            stat += (perk_info.always_active?.stat) ? perk_info.always_active.stat : 0

            // static multiplier
            multiplier *= (perk_info.always_active?.multiplier) ? perk_info.always_active.multiplier : 1

            // empty multiplier
            if(clarity_manifest[perk].stats.activation_condition == 'empty_magazine') {
                empty_multiplier *= perk_info.conditional[0] // [0] you can't have magazine more empty then empty and because of that it will be only one number
            }

            // dual loader
            if(perk == 25606670) dual_loader = true
        })
        if(dual_loader) mag_multiplier = Math.ceil(mag_multiplier / 2 )

        //--- step 4 handle conditional perk stats
        extra_stat = extra_stat || []
        extra_multiplier = extra_multiplier || []

        stat = extra_stat.reduce((acc, val) => acc + val, stat)
        stat = Math.min(Math.max(stat, 10), 100)

        multiplier = extra_multiplier.reduce((acc, val) => acc * val, multiplier)

        //--- step 5 use data to calculate reload
        let normal = ((formula.a * stat * stat + formula.b * stat + formula.c) * mag_multiplier / multiplier).toFixed(2)
        return {
            'default': normal * 1,
            'empty'  : normal * empty_multiplier,
        }
    }
    // console.log(reload_calculator()) //----------------------------------------------------------------

    function range_calculator(extra_stat, extra_multiplier) {
        //--- step 1 check if reload can be calculated
        const formula = static_item.formula_numbers?.range
        if (!formula) return

        //--- step 2 define base stats
        let stat_range = stats[1240592695] // id range
        let stat_zoom  = stats[3555269338] // id zoom
        let multiplier = 1

        //--- step 3 update base values
        perks.forEach(perk => {
            let perk_info = clarity_manifest[perk].stats.range
            if(!perk_info) return

            // perk stat
            stat_range += (perk_info.always_active?.stat) ? perk_info.always_active.stat : 0

            // static multiplier
            multiplier *= (perk_info.always_active?.multiplier) ? perk_info.always_active.multiplier : 1
        })
        //--- step 4 handle conditional perk stats
        extra_stat = extra_stat || []
        extra_multiplier = extra_multiplier || []

        stat_range = extra_stat.reduce((acc, val) => acc + val, stat_range)
        stat_range = Math.min(Math.max(stat_range, 10), 100)

        multiplier = extra_multiplier.reduce((acc, val) => acc * val, multiplier)

        //--- step 5 use data to calculate range
        let new_zoom = (stat_zoom - formula.zrm_tier) / 10 + formula.zrm
        let HIP_min = stat_range * formula.vpp + formula.base_min
        let HIP_max = (formula.scale) ? stat_range * formula.vpp + formula.base_max : formula.base_max
        return {
            'ADS_min': HIP_min * new_zoom * multiplier,
            'ADS_max': HIP_max * new_zoom * multiplier,
            'HIP_min': HIP_min * 1,
            'HIP_max': HIP_max * 1,
        }
    }
    // console.log(range_calculator()) //----------------------------------------------------------------

    function handling_calculator(stat, formula, multiplier) {
        formula = formula.handling
        stat = Math.min(Math.max(stat, 10), 100)
        multiplier = (multiplier) ? multiplier : 1

        let stow_numbers  = formula.handling.stow
        let ready_numbers = formula.handling.ready
        return {
            "stow":  (stow_numbers.vpp  * stat + stow_numbers.number)  * multiplier,
            "ready": (ready_numbers.vpp * stat + ready_numbers.number) * multiplier,
        }
    }


    // let weapon_stats = {
    //     base: static_item.stats.base,
    //     mod: get_item_stats(),
    //     masterwork: get_item_stats(),
    //     reduction: get_item_stats()
    // }



    console.log(`%c Info added in: ${Date.now() - parser_start} ms`, 'border: 3px solid yellow; padding: 2px')
}

function get_item_stats(static_item, perks) {
    let inv = {...static_item.stats.investment}
    perks.forEach(perk => { // go over perks in list and add stats from each perk to inv
        if(perk) Object.entries(clarity_manifest[perk].investment)
        .forEach(([stat_id, stat_val]) => {
            if(stat_val.conditional) return
            inv[stat_id] = inv[stat_id] + stat_val.value || stat_val.value // try adding numbers if NaN add value
        })
    })

    let stats = {}
    Object.entries(inv).forEach(([stat_id, stat_val]) => {
        const inv_stat = Math.min(Math.max(stat_val, 0), 100) // min max to keep values in range of possible
        const stat_group = static_item.stats.stat_group[stat_id]
        switch (stat_id * 1) { // making sure id is number
            case 1345609583: // Aim Assistance
            case 2715839340: // Recoil Direction
            case 3555269338: // Zoom
                if(inv_stat != 0) stats[stat_id] = inv_stat
                break
            case 1931675084: // Inventory size
                if(static_item.type == 'Combat Bow') stats[stat_id] = calculate()
                break
            default:
                if (!stat_group) return // its possible to have change time stat on bow or impact on grenade launcher but they can't have that and stat group will be undefined
                stats[stat_id] = calculate()
        }
        function calculate() {
            let calculated_stat = 0
            if (stat_group.length > 1) {
                const end_index = stat_group.findIndex(x => x.value >= inv_stat)

                let start = (end_index == 0) ? stat_group[0] : stat_group[end_index - 1]
                let end   = (end_index <= 1) ? stat_group[1] : stat_group[end_index]

                let t = (inv_stat - start.value) / (end.value - start.value)
                t = Math.max(t, 0) // t can't ever be less than 0

                calculated_stat = start.weight + t * (end.weight - start.weight)
            } else {
                calculated_stat = stat_group[0].weight + (inv_stat - stat_group[0].value)
            }
            if (calculated_stat) return calculated_stat
        }
    })

    let stat_names = clarity_random_data.stat_names
    let named_stats = {}
    Object.entries(stats).forEach(([id, name]) => named_stats[stat_names[id]] = name)
    // console.log(named_stats)
    return stats
}

function reload_calculator(static_item, stats, perks, extra_stat, extra_multiplier) {
    //--- step 1 check if reload can be calculated
    const formula = static_item.formula_numbers?.reload
    if (!formula) return

    //--- step 2 define base stats
    let stat = stats[4188031367] // id reload speed
    let multiplier = 1
    let mag_multiplier = (formula.mag_multiplier) ? stats[3871231066] : 1 // id magazine
    let empty_multiplier = 1

    //--- step 3 update base values
    let dual_loader = null
    perks.forEach(([type, perk]) => {
        // dual loader
        if(perk == 25606670) dual_loader = true

        let perk_info = clarity_manifest[perk]?.stats.reload
        if(!perk_info) return

        // perk stat
        stat += (perk_info.always_active?.stat) ? perk_info.always_active.stat : 0

        // static multiplier
        multiplier *= (perk_info.always_active?.multiplier) ? perk_info.always_active.multiplier : 1

        // empty multiplier
        if(clarity_manifest[perk].stats.activation_condition == 'empty_magazine') {
            empty_multiplier *= perk_info.conditional[0] // [0] you can't have magazine more empty then empty and because of that it will be only one number
        }
    })
    if(dual_loader) mag_multiplier = Math.ceil(mag_multiplier / 2 )

    //--- step 4 handle conditional perk stats
    // extra_stat = extra_stat || []
    // extra_multiplier = extra_multiplier || []

    stat += extra_stat || 0 //extra_stat.reduce((acc, val) => acc + val, stat)
    stat = Math.min(Math.max(stat, 10), 100)

    multiplier *= extra_multiplier || 1 //extra_multiplier.reduce((acc, val) => acc * val, multiplier)

    //--- step 5 use data to calculate reload
    let normal = ((formula.a * stat * stat + formula.b * stat + formula.c) * mag_multiplier / multiplier).toFixed(2)
    return {
        'default': normal * 1,
        'empty'  : normal * empty_multiplier,
    }
}

function range_calculator(static_item, stats, perks, extra_stat, extra_multiplier) {
    //--- step 1 check if reload can be calculated
    const formula = static_item.formula_numbers?.range
    if (!formula) return

    //--- step 2 define base stats
    let stat_range = stats[1240592695] // id range
    let stat_zoom  = stats[3555269338] // id zoom
    let multiplier = 1

    //--- step 3 update base values
    perks.forEach(([type, perk]) => {
        let range_info = clarity_manifest[perk]?.stats.range
        if(range_info) {
            // perk stat
            stat_range += (range_info.always_active?.stat) ? range_info.always_active.stat : 0

            // static multiplier
            multiplier *= (range_info.always_active?.multiplier) ? range_info.always_active.multiplier : 1
        }

        let zoom_info = clarity_manifest[perk]?.stats.zoom
        if(zoom_info) {
            // perk stat
            stat_zoom += (zoom_info.always_active?.stat) ? zoom_info.always_active.stat : 0

            // static multiplier
            multiplier *= (zoom_info.always_active?.multiplier) ? zoom_info.always_active.multiplier : 1
        }
    })
    //--- step 4 handle conditional perk stats
    // extra_stat = extra_stat || []
    // extra_multiplier = extra_multiplier || []

    stat_range += extra_stat || 0 //extra_stat.reduce((acc, val) => acc + val, stat_range)
    stat_range = Math.min(Math.max(stat_range, 10), 100)

    multiplier *= extra_multiplier || 1// extra_multiplier.reduce((acc, val) => acc * val, multiplier)

    //--- step 5 use data to calculate range
    let new_zoom = (stat_zoom - formula.zrm_tier) / 10 + formula.zrm
    let HIP_min = stat_range * formula.vpp + formula.base_min
    let HIP_max = (formula.scale) ? stat_range * formula.vpp + formula.base_max : formula.base_max
    return {
        'ADS_min': (HIP_min * new_zoom * multiplier).toFixed(2) * 1,
        'ADS_max': (HIP_max * new_zoom * multiplier).toFixed(2) * 1,
        'HIP_min': (HIP_min).toFixed(2) * 1,
        'HIP_max': (HIP_max).toFixed(2) * 1,
    }
}

function handling_calculator(static_item, stats, extra_stat, extra_multiplier) {
    //--- step 1 check if handling can be calculated
    const formula = static_item.formula_numbers?.range
    if (!formula) return

    //--- step 2 define base stats
    let stat = stats[943549884] // id handling
    let multiplier = 1

    //--- step 3 handle conditional perk stats
    stat += extra_stat || 0
    stat = Math.min(Math.max(stat, 10), 100)

    multiplier *= extra_multiplier || 1

    //--- step 4 use data to calculate handling
    let stow_numbers  = formula.handling.stow
    let ready_numbers = formula.handling.ready
    return {
        "stow":  ((stow_numbers.vpp  * stat + stow_numbers.number)  * multiplier).toFixed(2) * 1,
        "ready": ((ready_numbers.vpp * stat + ready_numbers.number) * multiplier).toFixed(2) * 1,
    }
}