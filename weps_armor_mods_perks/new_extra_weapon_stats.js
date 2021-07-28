function _weapon_pressed(unique_item){
    let jd          = local_get('clarity_locations').extra_weapon_stats
    let manifest    = local_get('clarity_inventory_item')
    let range_stat  = (unique_item.stats[1240592695]) ? unique_item.stats[1240592695].value : undefined
    let reload_stat = (unique_item.stats[4188031367]) ? unique_item.stats[4188031367].value : undefined
    let zoom        = unique_item.manifest.stats.base_stats[3555269338]
    let zoom_multi  = 1
    for (let i = 0; i < unique_item.active_perks.length; i++) { // find perks with zoom and add to zoom value // also look for zoom multiplayer perks
        const element  = unique_item.active_perks[i].plugHash
            zoom_multi = (element == 2846385770 || element == 1140096971) ? 1.1 : 1
        let perk_stats = (manifest[element] && manifest[element].investment_stats) ? manifest[element].investment_stats : 0
        for (let y = 0; y < perk_stats.length; y++) {
            const ele = perk_stats[y]
            if (!ele.isConditionallyActive && ele.statTypeHash == 3555269338) zoom += ele.value
        }
    }
    let formulas = unique_item.manifest.formulas
    if (formulas){
        if (formulas.a){
            let reload_time = (formulas.a * reload_stat * reload_stat + formulas.b * reload_stat + formulas.c).toFixed(2)
            add_new_stat(reload_time, 'Reload Time', 'Time it takes to reload weapon in seconds\nFormulas are made by Van Holden', 's')
        }
        if (formulas.vpp){
            let new_zoom = (zoom - formulas.zoom_tier) / 10 + formulas.zrm
            let weapon_range = ((range_stat * formulas.vpp + formulas.base_range) * new_zoom * zoom_multi).toFixed(2) // formula for range
            add_new_stat(weapon_range, 'DMG Fall-off ADS', 'Distance at which damage fall-off begin\nFormulas are made by Mmonx', 'm')
        }
    }
    function add_new_stat(stat_value, stat_name, stat_title, last_letter){
        create_element({'ele_type': 'div', 'stat_window': jd.wep_stats, 'class': jd.wep_stat_name_class,  'text': stat_name,  'title': stat_title})
        create_element({'ele_type': 'div', 'stat_window': jd.wep_stats, 'class': jd.wep_stat_value_class, 'text': stat_value                     })
        create_element({'ele_type': 'div', 'stat_window': jd.wep_stats,                                   'text': last_letter                    })
    }
    add_new_perks(unique_item, manifest)
}
function _add_new_perks(unique_item, manifest){
    let perk_slot_count = 0 // number of active perks
    let location = get_in_content('.item-details.sockets')
    let fragment = document.createDocumentFragment() 
    let main_container = fragment.appendChild(document.createElement('div'))// box holding all perks
        main_container.className = 'wep_perk_main_container'
    for (let i = 0; i < unique_item.active_perks.length; i++) {
        const element = unique_item.active_perks[i]
        if(manifest[element.plugHash] && manifest[element.plugHash].item_type == 'perk') perk_slot_count += 1
    }
    if (unique_item.plugs && unique_item.plugs[1]) {add_perk_slots_random_roll()} else {add_perk_slots_curated_roll()}
    function add_perk_slots_random_roll() {
        for (let i = perk_slot_count; i > 0; i--) {
            perk_list = document.createElement('div')
            main_container.appendChild(perk_list).className = 'wep_perk_list'
            let description_container = document.createElement('div')
            perk_list.appendChild(description_container).className = 'description_container'
            description_container.addEventListener('click', e => {e.currentTarget.textContent = ''; e.currentTarget.id = ''})
            //let unique_item_plugs_length = (unique_item.plugs[i]) ? unique_item.plugs[i].length : 0
            for (let y = 0; y < unique_item.plugs[i].length; y++) {
                perk_container = document.createElement('div')
                let container_class_name = 'perk_container'
                for (let x = 0; x < unique_item.active_perks.length; x++) {
                    const element = unique_item.active_perks[x]
                    if (element.plugHash == unique_item.plugs[i][y].plugItemHash) container_class_name = 'perk_container active_perk'
                }
                perk_list.appendChild(perk_container).className = container_class_name
                add_perk_details(unique_item.plugs[i][y].plugItemHash, perk_container)
                perk_container.addEventListener('click', e => {add_wep_perk_description(e, manifest, unique_item)})
                perk_container.id = unique_item.plugs[i][y].plugItemHash
            }
        }
    }
    function add_perk_slots_curated_roll(){
        for (let i = perk_slot_count; i > 0; i--) {
            perk_list = document.createElement('div')
            main_container.appendChild(perk_list).className = 'wep_perk_list'
            let description_container = document.createElement('div')
            perk_list.appendChild(description_container).className = 'description_container'
            description_container.addEventListener('click', e => {e.currentTarget.textContent = ''; e.currentTarget.id = ''})
            //let unique_item_plugs_length = (unique_item.plugs[i]) ? unique_item.plugs[i].length : 0
            // for (let y = 0; y < unique_item.plugs[i].length; y++) {
            //     perk_container = document.createElement('div')
            //     let container_class_name = 'perk_container'
            //     for (let x = 0; x < unique_item.active_perks.length; x++) {
            //         const element = unique_item.active_perks[x]
            //         if (element.plugHash == unique_item.plugs[i][y].plugItemHash) container_class_name = 'perk_container active_perk'
            //     }
            //     perk_list.appendChild(perk_container).className = container_class_name
            //     add_perk_details(unique_item.plugs[i][y].plugItemHash, perk_container)
            //     perk_container.addEventListener('click', e => {add_wep_perk_description(e, manifest, unique_item)})
            //     perk_container.id = unique_item.plugs[i][y].plugItemHash
            // }
        }
    }
    function add_perk_details(perk_id, location){
        let perk_info      = manifest[perk_id]
        let icon_container = document.createElement('div')
        let icon           = document.createElement('img')
        icon_container.appendChild(icon).src                 = `https://www.bungie.net/${perk_info.icon}`
        location.      appendChild(icon_container).className = 'wep_perk_icon'

        let name_container       = document.createElement('div')
        name_container.className = 'perk_name'
        location.appendChild(name_container).textContent = perk_info.name
    }
    //location.getElementsByClassName('ItemPerksList-m_sockets-1BlL6')[0].delete
    location.appendChild(fragment)
}
function add_wep_perk_description(event, manifest, unique_item){
    let target                = event.currentTarget
    let description_container = target.parentElement.firstChild
    let perk_id               = target.id
    let new_description       = DOMPurify.sanitize(manifest[perk_id].description.text, {USE_PROFILES: {html: true}}) // manifest[perk_id].description.text
    if (description_container.id == perk_id) {
        description_container.textContent = ''
        description_container.id          = ''
    } else {
        description_container.innerHTML = new_description
        description_container.id        = perk_id
        add_stats_to_perks()
    }
    function add_stats_to_perks(){
        let investment_stats = []
        for (let i = 0; i < unique_item.active_perks.length; i++) {
            if (manifest[unique_item.active_perks[i].plugHash] && manifest[unique_item.active_perks[i].plugHash].investment_stats) {
                const ele = manifest[unique_item.active_perks[i].plugHash].investment_stats
                for (let y = 0; y < ele.length; y++) {
                    const element = ele[y];
                    if (!element.isConditionallyActive) investment_stats.push({'id': element.statTypeHash, 'value': element.value})
                }
            }
        }
        let all_inv_stats = Array.from(investment_stats.reduce((m, {id, value}) => m.set(id, (m.get(id) || 0) + value), new Map), ([id, value]) => ({id, value}))




        let complete_inv_stats = {}
        //let min_max_sss = {}
        for (let i = 0; i < all_inv_stats.length; i++) {
            const element = all_inv_stats[i]
            complete_inv_stats[element.id] = unique_item.manifest.stats.investment_stats[element.id] + element.value
            calculate_stats(complete_inv_stats, undefined, unique_item.manifest.stats.stat_group[element.id], element.id)

        }
        // find min and max https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
        // findIndex()

        function calculate_stats(inv_stat, base_stat, stat_group, id) {
            let x = []
            stat_group.forEach(element => {x.push(element.value)});
            console.log(x);
        }
        //console.log(min_max_sss);
        



    }
}