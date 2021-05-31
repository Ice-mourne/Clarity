function rework_weapon_perks() {
    setTimeout(() => {
        let od_perk_list = get_in_content('ItemPerksList-m_sockets-1BlL6')
        let perk_list = od_perk_list.querySelectorAll('.ItemPerksList-m_socket-3UNFZ')
        let extracted_list = []
        for (let i = 0; i < perk_list.length; i++) {
            const list = perk_list[i]
            let img_link = []
            for (let i = 0; i < list.querySelectorAll('.item-img').length; i++) {
                const column = list.querySelectorAll('.item-img')[i]
                let active = column.parentElement.parentElement.classList.contains('ItemPerksList-m_plugged-20h7g')
                let wislist = column.nextSibling != undefined
                let link = `${column.src.replace('https://www.bungie.net/common/destiny2_content/icons/', '')}`
                // let perk_object = {}
                // perk_object['link'] = link
                // perk_object['active'] = active
                // perk_object['wislist'] = wislist
                // img_link.push(perk_object) 
                img_link.push({'link': link, 'active': active, 'wislist': wislist})
            }
            extracted_list.push(img_link)
        }
        work_on_perks(extracted_list)
        //od_perk_list.remove()
    }, 1)
}
function work_on_perks(extracted_list){
    let perk_icons = local_get('clarity_perk_mod_icon')
    create_element({'ele_type': 'div', 'stat_window': '.item-details', 'class': 'perk_column_container'})
    for (let i = 0; i < extracted_list.length; i++) {
        const perks = extracted_list[i]
        create_element({'ele_type': 'div', 'stat_window': '.perk_column_container', 'class': 'perk_container',  'id': `perk_list_${i}`}) // place for all perks
        create_element({'ele_type': 'div', 'stat_window': `#perk_list_${i}`,        'class': 'perk_description'                       }) // perk description container
        for (let y = 0; y < perks.length; y++) {
            const perk = perks[y]
            let perk_class = (perk.active == true) ? 'perk_class active_perk' : 'perk_class'
            create_element({                 'ele_type': 'div',  'stat_window': `#perk_list_${i}`,              'class': perk_class,                                 'id': `perk_${y}`                                                         }) // perk rows
            create_element({                 'ele_type': 'img',  'stat_window': `#perk_list_${i} > #perk_${y}`, 'class': 'perk_img',                                 'src': `https://www.bungie.net/common/destiny2_content/icons/${perk.link}`}) // perk img
            if(perk.wislist) create_element({'ele_type': 'span', 'stat_window': `#perk_list_${i} > #perk_${y}`, 'class': 'fas fa-thumbs-up thumbs-up perk_thumbs_up'                                                                           }) // perk thumbs up
            create_element({                 'ele_type': 'div',  'stat_window': `#perk_list_${i} > #perk_${y}`, 'class': 'perk_name',                                'text': perk_icons[perk.link][0]                                          }) // perk name
        }
    }
    let perk_column = get_in_content('perk_column_container')
    perk_column.querySelectorAll('.perk_class').forEach(element => {
        element.addEventListener('click', event => {
            let target = event.currentTarget.parentElement.firstChild
            if (target.textContent == '') {
                let perk = event.currentTarget.getElementsByClassName('perk_img')[0].src.replace('https://www.bungie.net/common/destiny2_content/icons/', '')
                add_perk_description(target, perk_icons[perk][0], perk_icons[perk][1]) // location of cick event, perk name, perk id
            }else {
                target.textContent = ''
            }
        })
    })
    perk_column.querySelectorAll('.perk_description').forEach(element => {
        element.addEventListener('click', event => {
            event.currentTarget.textContent = ''
        })
    })
}
function add_perk_description(target, name, perk_id) {
    let weapon_perks = local_get('clarity_weapon_perks')
    let perk_mod_info = JSON.parse(localStorage.getItem('clarity_perk_mod_info'))
    
    let weapon_formulas = JSON.parse(localStorage.getItem('clarity_weapon_formulas'))
    if(weapon_perks[name]) target.innerHTML = weapon_perks[name].text
    perk_stat_cauculation(perk_id)
}
function perk_stat_cauculation(perk_id) {
    let wep_id = get_in_content('.ItemPopupHeader-m_title-2hFLg > a').href.match(/([0-9])\d{5,}/)[0]
    let weapon_info = local_get('clarity_weapon_info')[wep_id]
    let perk_info =   local_get('clarity_perk_mod_info')[perk_id].investmentStats // ----------------  Object.entries(JSON.parse(localStorage.getItem('clarity_perk_mod_info'))[perk_id].investmentStats)
    let stat_group =  local_get('clarity_stat_group_info')[weapon_info.stat_group_hash] // weapons stat group with all perks
    let stat_name =   local_get('clarity_stat_names') // weapons stat group with all perks
    let base_stat = weapon_info.base_stats
    let final_stats = []
    for (let i = 0; i < perk_info.length; i++) {
        const element = perk_info[i]
        if (stat_group[element[0]]) {
            let start = get_stat_group(element, stat_group)[0]
            let end =   get_stat_group(element, stat_group)[1]
            let value = get_stat_group(element, stat_group)[2]

            t = (value - start.value) / (end.value - start.value)
            gameValue = Math.round( (start.weight + t * (end.weight - start.weight))  ) - base_stat[element[0]]
            let stat_value = (gameValue < 0) ? `${gameValue}` : `+${gameValue}`

            final_stats.push(`${stat_value} ${stat_name[element[0]].name}`)
            
            console.log(element[0], gameValue)
            console.log( value,  (start.weight + t * (end.weight - start.weight)) - base_stat[element[0]]   );
        }
    }
    function get_stat_group(element, stat_group) {
        let perk_stat_group = stat_group[element[0]] // stat group for specific perk
        let array = [] // array of investment values used to find index
        for (const key in perk_stat_group) {
            if (Object.hasOwnProperty.call(perk_stat_group, key)) {
                const element = perk_stat_group[key]
                array.push(element.value)
            }
        }
        let value = weapon_info.investment_stats[element[0]] + element[1] // investment stat after adding perk

        let lsv = Math.min(Math.max(value, 0), 99.9) // limited to 0 - 99.9 to get valid value for start index
        let value_start = array.reverse().find(e => e <= lsv);
        array.reverse() // above is reversing arrays direction and this sets back to normal
        let index_start = array.indexOf(value_start)

        let lse = Math.min(Math.max(value, 0.1), 100) // limited to 0 - 99.9 to get valid value for start index
        let value_end = array.find(e => e >= lse)
        let index_end = array.indexOf(value_end)

        return [perk_stat_group[index_start], perk_stat_group[index_end], value]
    }
    for (let i = 0; i < perk_info.length; i++) {
        const element = perk_info[i];
        if (element[0] == '2715839340' || element[0] == '3555269338' || element[0] == '1345609583') { // exeption hare are perks like zoom they are added with out calculation
            final_stats.push(`+${element[1]} ${stat_name[element[0]].name}`)
        }
    }
    console.log(final_stats);

    return final_stats
}
