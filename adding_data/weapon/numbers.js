window.addEventListener('weapon_pressed', e => info_about_weapon(e.detail))
function info_about_weapon(unique_id) {
    let parser_start = Date.now()

    const unique_item = clarity_user_data[unique_id]
    const static_item = clarity_manifest[unique_item.id]

    const perks = unique_item.sockets.perks.active // todo for testing this is fine but this has to be upgraded to support selected perks // also include frame mods ect

    const stats = get_item_stats()

    console.log(unique_item); //----------------------------------------------------------------
    console.log(static_item); //----------------------------------------------------------------

    function get_item_stats() {
        let inv = {...static_item.stats.investment}
        perks.forEach(perk => { // go over perks in list and add stats from each perk to inv
            Object.entries(clarity_manifest[perk].investment)
            .forEach(stat => inv[stat[0]] = inv[stat[0]] + stat[1] || stat[1]) // try adding numbers if NaN add value
        })
        let stats = {}
        Object.entries(inv).forEach(stat => {
            let inv_stat = Math.min(Math.max(stat[1], 0), 100) // min max to keep values in range of possible
            let stat_group = static_item.stats.stat_group[stat[0]]
            switch (stat[0] * 1) { // making sure id is number
                case 1345609583: // Aim Assistance
                case 2715839340: // Recoil Direction
                case 3555269338: // Zoom
                case 1931675084: // Inventory size
                    stats[stat[0]] = inv_stat
                    break
                case 1240592695: // Range
                case 4188031367: // Reload Speed
                case 155624089:  // Stability
                case 2837207746: // Swing Speed
                case 2523465841: // Velocity
                    stats[stat[0]] =  10 + inv_stat * 0.9
                    break
                default:
                    if (!stat_group) return // its possible to have change time stat on bow or impact on grenade launcher but they can't have that and stat group will be undefined
                    stats[stat[0]] =  calculate()
            }
            function calculate() {
                let end_index = stat_group.findIndex(x => x.value >= inv_stat)
                if (stat_group.length > 1) {
                    let start = (end_index == 0) ? stat_group[0] : stat_group[end_index - 1]
                    let end   = (end_index <= 1) ? stat_group[1] : stat_group[end_index]
                    let t = (inv_stat - start.value) / (end.value - start.value)
                    return start.weight + t * (end.weight - start.weight)
                }
                if (stat_group.length == 1) return stat_group[0].weight + (inv_stat - stat_group[0].value)
            }
        })
        return stats
    }

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
                empty_multiplier *= perk_info.conditional[0] // [0] because you can't have magazine more empty then empty and because of that it will be only one number
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
    console.log(reload_calculator()) //----------------------------------------------------------------

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
    console.log(range_calculator()) //----------------------------------------------------------------

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






    // let extra_stat_box = document.createDocumentFragment()
    // if(data_base[unique_id].stats.extra_stats) data_base[unique_id].stats.extra_stats.forEach(stat => {
    //     let extra_stat_name = element_creator('div', {'className': 'Clarity_weapon_stat_name', 'textContent': stat.name})
    //     let extra_stat_value = element_creator('div', {'className': 'Clarity_weapon_stat_value', 'textContent': stat.value})
    //     let extra_stat_letter = element_creator('div', {'textContent': stat.letter})
    //     extra_stat_box.append(extra_stat_name, extra_stat_value, extra_stat_letter)
    // })
    // document.querySelector(jd.weapon_stats).append(extra_stat_box)
    // // - - - - - - - - - - - - - - - - - - - -
    // let main_box = element_creator('div', {'className': 'Clarity_main_box'})
    // data_base[unique_id].perks.perks.forEach(add_perk_list)
    // function add_perk_list(perk_list) {
    //     let perk_list_  = element_creator('div', {'className': 'Clarity_perk_list'  })
    //     let description = element_creator('div', {'className': 'Clarity_description'})
    //     perk_list_.append(description)
    //     perk_list.forEach(x => {add_perk(x, perk_list_)})
    //     main_box.append(perk_list_)
    //     description.addEventListener('click', event => { // remove description on description press
    //         event.currentTarget.textContent = ''
    //         event.currentTarget.parentElement.querySelectorAll('.Clarity_perk').forEach(p => p.classList.remove('Clarity_selected', 'Clarity_disable'))
    //     })
    // }
    // function add_perk(perk, element) {
    //     let class_name = (data_base[unique_id].perks.active_perks.indexOf(perk.id) != -1) ? 'Clarity_perk Clarity_active' : 'Clarity_perk'
    //     let perk_ = element_creator('div', {'className': class_name})
    //     add_to_perk_box(perk, perk_)
    //     element.append(perk_)
    //     perk_.addEventListener('click', event => { // add remove description on perk press
    //         const current = event.currentTarget
    //         if (current.classList.contains('Clarity_selected')) {
    //             current.parentElement.firstChild.textContent = ''
    //             current.classList.remove('Clarity_selected')
    //             current.parentElement.querySelector('.Clarity_active').classList.remove('Clarity_disable')
    //         } else {
    //             current.parentElement.querySelectorAll('.Clarity_perk').forEach(p => p.classList.remove('Clarity_selected', 'Clarity_disable'))
    //             current.parentElement.firstChild.innerHTML = perk.description
    //             if (!current.classList.contains('Clarity_active')) {
    //                 current.classList.add('Clarity_selected')
    //                 current.parentElement.querySelector('.Clarity_active').classList.add('Clarity_disable')
    //             } else {current.classList.add('Clarity_selected')}
    //         }
    //     })
    // }
    // function add_to_perk_box(perk, element) {
    //     let icon_container = element_creator('div', {'className': 'Clarity_icon_container'})
    //     let icon           = element_creator('img', {'src': `https://www.bungie.net/common/destiny2_content/icons/${perk.icon}`})
    //     icon_container.append(icon)
    //     let name = element_creator('div', {'className': 'Clarity_perk_name', 'textContent': perk.name})
    //     element.append(icon_container, name)
    // }
    // let all_perks_mods = document.getElementById('content').nextSibling.getElementsByClassName('item-details')[0]
    // document.getElementById('content').nextSibling.querySelector(jd.all_weapon_perks).remove()
    // all_perks_mods.append(main_box)
    console.log(`%c Info added in: ${Date.now() - parser_start} ms`, 'border: 3px solid yellow; padding: 2px')
}