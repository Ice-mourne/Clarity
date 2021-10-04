window.addEventListener('weapon_pressed', e => _add_info_to_weapon(e.detail))
function _add_info_to_weapon(unique_id) {
    let parser_start = Date.now()

    const unique_item = clarity_user_data[unique_id]
    const static_item = clarity_manifest[unique_item.id]
    const stats = get_item_stats(unique_item.sockets.perks.active)

    console.log(unique_item);
    console.log(static_item);

    function get_item_stats(perks) {
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

    function reload_calculator(/*stat, magazine, formulaa, multiplayer, active_perks*/) {
        const formula = static_item.formula_numbers?.reload
        if (!formula) return // if item doesn't have formula just return
        const mag_multiplayer = (formula.mag_multiplayer) ? stats[3871231066] : 1
        const stat = stats[4188031367]
        const empty_multi = (formula.conditional == 'empty magazine') ? stats[3871231066] : 1


        // stat = Math.min(Math.max(stat, 10), 100)
        // multiplayer = (multiplayer) ? multiplayer : 1

        // let shotgun_multiplayer = 1
        // if(formula.use_multiplayer) {
        //     let check = active_perks.findIndex(x => x.plugHash == 25606670) // check if dual loader is active perk
        //     shotgun_multiplayer = (check != -1) ? Math.ceil(magazine / 2) : magazine
        // }
        let normal = ((formula.a * stat * stat + formula.b * stat + formula.c) / mag_multiplayer).toFixed(2)

        // let list = [806997698, 878286503, 996573084, 2353477480, 3364911712, 3920852688] // list of all rapid fire frame id's
        // let empty_multi = (active_perks.findIndex(x => list.findIndex(z => z == x.plugHash ) != -1) == -1) ? 1 : 0.8 // multiplayer for rapid fire frames then mag is empty
        // let empty = normal * empty_multi
        return {
            'default': normal * 1,
            // 'empty': empty * 1,
            // 'difference': (normal - empty) * 1 // difference between normal reload and reload them mag is empty
        }
    }

    console.log(reload_calculator());






    // let manifest = indexed_DB('keyval-store', 'keyval', 'd2-manifest')
    // .then(x=> {console.timeEnd('perks')})
    //item.perks.active.forEach(x => manifest.DestinyInventoryItemDefinition[x].investmentStats.forEach(z => z.value))






    // function inv_stats_w_perks() {
    //     let stats = item.stats.investment
    //     item.perks.active.map(perk => {

    //     })
    // }



    // const stats = {
    //     inv_stats_w_perks: inv_stats_w_perks()
    // }









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