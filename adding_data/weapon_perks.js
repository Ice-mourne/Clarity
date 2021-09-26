window.addEventListener('weapon_pressed', e => _add_info_to_weapon(e.detail))
// todo maybe store investment stats as array instead of object
function _add_info_to_weapon(item) {



    console.time('perks')
    let manifest = indexed_DB('keyval-store', 'keyval', 'd2-manifest')
    .then(x=> {console.timeEnd('perks')})
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
}