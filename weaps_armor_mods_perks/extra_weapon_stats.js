function weapon_pressed(){
    let jd =       local_get('clarity_dim_div_locations').extra_weapon_stats
    let wep_link = get_in_content(jd.wep_link).href.replace('https://destinytracker.com/destiny-2/db/items/', '').replace('?perks=', ',').split(',')
    let perks =    local_get('clarity_perk_mod_info')
    let weapon =   local_get('clarity_weapon_info')[wep_link[0]]
    let formulas = local_get('clarity_weapon_formulas')
    //let stat_group = JSON.parse(localStorage.getItem('clarity_stat_group_info'))

    //  🡳 🡳  - - - - - - - - -  Gets stat values
    let reload_inv = weapon.investment_stats[4188031367]
    let range_inv =  weapon.investment_stats[1240592695]
    let zoom =       weapon.investment_stats[3555269338]
    let zoom_mult =  1
    for (let i = 0; i < wep_link.length; i++){
        const id = wep_link[i]
        if (perks[id]){
            if (perks[id].investmentStats[4188031367]) reload_inv += perks[id].investmentStats[4188031367]
            if (perks[id].investmentStats[1240592695]) range_inv  += perks[id].investmentStats[1240592695]
            if (perks[id].investmentStats[3555269338]) zoom       += perks[id].investmentStats[3555269338]
            if (perks[id] == 2846385770 || perks[id] == 1140096971) zoom_mult = 1.1 // rangefinder and similar perks
        }
    }
    //  🡱 🡱  - - - - - - - - - Gets stat values
    
    //  🡳 🡳  - - - - - - - - - Finds weapons witch need adding stats to
    let weapon_type
    if (weapon.type == 'Grenade Launcher'){
        weapon_type = (weapon.ammo == 2) ? "Special GL": "Heavy GL"
    } else{weapon_type = weapon.type}
    let w_f_numbers = formulas[weapon_type][perks[weapon.frame].name] // number for weapon formulas
    if (w_f_numbers){
        sessionStorage.setItem('w_f_numbers', JSON.stringify(w_f_numbers))
        if (w_f_numbers.a){
            let reload_stat = 10 + Math.min(Math.max(reload_inv, 10),100) * 0.9 
            let reload_time = (w_f_numbers.a * reload_stat * reload_stat + w_f_numbers.b * reload_stat + w_f_numbers.c).toFixed(2)
            add_new_stat(reload_time, 'Reload Time', 'Time it takes to reload weapon in seconds\nFormulas are made by Van Holden', 's')
            sessionStorage.setItem('reload_stat', reload_stat)
            sessionStorage.setItem('reload_time', reload_time)
        }
        if (w_f_numbers.vpp){
            let range_stat = 10 + Math.min(Math.max(range_inv, 10),100) * 0.9
            let new_zomm = (zoom - w_f_numbers.zoom_tier) / 10 + w_f_numbers.zrm
            let weapon_range = ((range_stat * w_f_numbers.vpp + w_f_numbers.base_range) * new_zomm * zoom_mult).toFixed(2) // formula for range
            add_new_stat(weapon_range, 'DMG Fall-off ADS', 'Distance at which damage fall-off begin\nFormulas are made by Mmonx', 'm')
            sessionStorage.setItem('range_stat', range_stat)
            sessionStorage.setItem('weapon_range', weapon_range)
        }
    }
    //  🡱 🡱  - - - - - - - - - Finds weapons witch need adding stats to

    //  🡳 🡳  - - - - - - - - - Adds new stats
    function add_new_stat(stat_value, stat_name, stat_title, last_letter){
        debugger
        create_element({'ele_type': 'div', 'stat_window': jd.wep_stats, 'class': jd.wep_stat_name_class,  'text': stat_name,  'title': stat_title})
        create_element({'ele_type': 'div', 'stat_window': jd.wep_stats, 'class': jd.wep_stat_value_class, 'text': stat_value                     })
        create_element({'ele_type': 'div', 'stat_window': jd.wep_stats,                                   'text': last_letter                    })
    }
    //  🡱 🡱  - - - - - - - - - Adds new stats
    //let new_link = `https://d2gunsmith.com/w/${wep_link[0]}?s=${wep_link[2]},${wep_link[3]},${wep_link[4]},${wep_link[5]},` // move to d2_gunsmith
    //document.getElementById(jd.stat_window).nextSibling.querySelector(jd.wep_link).href = new_link
}

