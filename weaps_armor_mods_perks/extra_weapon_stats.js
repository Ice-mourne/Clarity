function weapon_pressed(){
    let json_divs = JSON.parse(localStorage.getItem('clarity_dim_div_locations')).extra_weapon_stats;
    let wep_link = document.getElementById(json_divs.stat_window).nextSibling.querySelector(json_divs.wep_link).href.replace('https://destinytracker.com/destiny-2/db/items/', '').replace('?perks=', ',').split(',');
    let perks = JSON.parse(localStorage.getItem('clarity_perk_mod_info'));
    let weapons = JSON.parse(localStorage.getItem('clarity_weapon_info'));
    let formulas = JSON.parse(localStorage.getItem('clarity_weapon_formulas'));
    //let stat_group = JSON.parse(localStorage.getItem('clarity_stat_group_info'))

    //  🡳 🡳  - - - - - - - - -  Gets stat values
    let reload_inv = weapons[wep_link[0]].investment_stats[4188031367];
    let range_inv = weapons[wep_link[0]].investment_stats[1240592695];
    let zoom_mult = 1;
    let zoom = weapons[wep_link[0]].investment_stats[3555269338];
    for (let i = 0; i < wep_link.length; i++){
        const id = wep_link[i];
        if (perks[id] != undefined){
            if (perks[id].investmentStats[4188031367] != undefined){
                reload_inv += perks[id].investmentStats[4188031367];
            };
            if (perks[id].investmentStats[1240592695] != undefined){
                range_inv += perks[id].investmentStats[1240592695];
            };
            if (perks[id] == 2846385770 || perks[id] == 1140096971){ // rangefinder and similar perks
                zoom_mult = 1.1;
            };
            if (perks[id].investmentStats[3555269338] != undefined){
                zoom += perks[id].investmentStats[3555269338];
            };
        };
    };
    //  🡱 🡱  - - - - - - - - - Gets stat values

    //  🡳 🡳  - - - - - - - - - Finds weapons witch need adding stats to
    let weapon_type;
    if (weapons[wep_link[0]].type == 'Grenade Launcher'){
        weapon_type = (weapons[wep_link[0]].ammo == 2) ? "Special GL": "Heavy GL";
    } else{weapon_type = weapons[wep_link[0]].type};
    let w_f_numbers = formulas[weapon_type][perks[weapons[wep_link[0]].frame].name]; // number for weapon formulas
    if (w_f_numbers != undefined){
        sessionStorage.setItem('w_f_numbers', JSON.stringify(w_f_numbers));
        if (w_f_numbers.a != undefined){
            let reload_stat = 10 + Math.min(Math.max(reload_inv, 10),100) * 0.9; 
            let reload_time = (w_f_numbers.a * reload_stat * reload_stat + w_f_numbers.b * reload_stat + w_f_numbers.c).toFixed(2);
            add_new_stat(reload_time, 'Reload Time', 'Time it takes to reload weapon in seconds\nFormulas are made by Van Holden', 's');
            sessionStorage.setItem('reload_stat', reload_stat);
            sessionStorage.setItem('reload_time', reload_time);
        };
        if (w_f_numbers.vpp != undefined){
            let range_stat = 10 + Math.min(Math.max(range_inv, 10),100) * 0.9;
            let new_zomm = (zoom - w_f_numbers.zoom_tier) / 10 + w_f_numbers.zrm;
            let weapon_range = ((range_stat * w_f_numbers.vpp + w_f_numbers.base_range) * new_zomm * zoom_mult).toFixed(2); // formula for range
            add_new_stat(weapon_range, 'DMG Fall-off ADS', 'Distance at which damage fall-off begin\nFormulas are made by Mmonx', 'm');
            sessionStorage.setItem('range_stat', range_stat);
            sessionStorage.setItem('weapon_range', weapon_range);
        };
    };
    //  🡱 🡱  - - - - - - - - - Finds weapons witch need adding stats to

    //  🡳 🡳  - - - - - - - - - Adds new stats
    function add_new_stat(stat_value, stat_name, stat_title, last_letter){
        let name_div = document.createElement('div');
        let value_div = document.createElement('div');
        let bar_div = document.createElement('div');
        name_div.textContent = stat_name;
        name_div.title = stat_title;
        value_div.textContent = stat_value;
        bar_div.textContent = last_letter;
        let stat_window = document.getElementById(json_divs.stat_window).nextSibling.getElementsByClassName(json_divs.wep_stats)[0];
        stat_window.appendChild(name_div).className = json_divs.wep_stat_name_class;
        stat_window.appendChild(value_div).className = json_divs.wep_stat_value_class;
        stat_window.appendChild(bar_div);
    };
    //  🡱 🡱  - - - - - - - - - Adds new stats
    //let new_link = `https://d2gunsmith.com/w/${wep_link[0]}?s=${wep_link[2]},${wep_link[3]},${wep_link[4]},${wep_link[5]},`; // move to d2_gunsmith
    //document.getElementById(json_divs.stat_window).nextSibling.querySelector(json_divs.wep_link).href = new_link;
};

