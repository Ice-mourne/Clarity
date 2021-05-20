function weapon_perk_pressed(perk_name, loc_for_new_div){
    //let json_divs = JSON.parse(localStorage.getItem('clarity_dim_div_locations')).weapon_perks;
    let perk_descriptions = JSON.parse(localStorage.getItem('clarity_weapon_perks'));
    //let stat_window = document.getElementById(json_divs.stat_window).nextSibling;
    if (document.getElementById('new_wep_perk') != undefined){
        document.getElementById('new_wep_perk').remove('div');
        try { document.getElementById('new_wep_perk').id = ""; } catch {};
    };
    
    if(perk_descriptions[perk_name] != undefined){
        let t_num_arr = []; // array for final reload time numbers
        if(perk_descriptions[perk_name]['t_num'] != undefined ){
            let t_num = perk_descriptions[perk_name]['t_num'];
            let m_num = (perk_descriptions[perk_name]['m_num'] != undefined) ? perk_descriptions[perk_name]['m_num'] : [1, 1 ,1 ,1 ,1 ,1 ,1 ,1];
            for (let i = 0; i < t_num.length; i++){
                const element = t_num[i];
                const multiplier = m_num[i];
                let reload_stat = Math.min(Math.max(sessionStorage.getItem('reload_stat') * 1 + element, 10),100);
                let w_f_numbers = JSON.parse(sessionStorage.getItem('w_f_numbers'));
                let reload_time = ((w_f_numbers.a * reload_stat * reload_stat + w_f_numbers.b * reload_stat + w_f_numbers.c) * multiplier).toFixed(2);
                t_num_arr.push(reload_time);
                t_num_arr.push((reload_time - sessionStorage.getItem('reload_time')).toFixed(2));
            };
        };
        let replace_time = perk_descriptions[perk_name]['text'].replace('t_num_1', t_num_arr[0]).replace('t_num_2', t_num_arr[1]).replace('t_num_3', t_num_arr[2]).replace('t_num_4', t_num_arr[3]).replace('t_num_5', t_num_arr[4]);
        let replace_time2 = replace_time.replace('t_num_6', t_num_arr[5]).replace('t_num_7', t_num_arr[6]).replace('t_num_8', t_num_arr[7]).replace('t_num_9', t_num_arr[8]).replace('t_num_10', t_num_arr[9]);
        let replace_range = replace_time2//.replace('r_num_1', r_num_arr[0]).replace('r_num_2', r_num_arr[1]).replace('r_num_3', r_num_arr[2]).replace('r_num_4', r_num_arr[3]).replace('r_num_5', r_num_arr[4]);

        loc_for_new_div.style.cssText = 'display: flex; flex-flow: wrap;';
        loc_for_new_div.firstChild.style.cssText = 'flex: 1 1 60%;';
        create_div = document.createElement('div');
        // HTML comes from an external source controlled by me but for peace of mind I still use the "DOMPurify" sanitizer to clean it. Sorce sanitizer https://github.com/cure53/DOMPurify/ , Sorce HTML https://ice-mourne.github.io/Clarity-A-DIM-Companion-json/weapon_perks/
        create_div.innerHTML = DOMPurify.sanitize(replace_range, {USE_PROFILES: {html: true}}); 
        loc_for_new_div.appendChild(create_div).id = 'new_wep_perk';
    } else {
        try {
            loc_for_new_div.querySelector('.ItemPerksList-m_perkInfo-2opoU > div').style.cssText = 'display: block;';
            loc_for_new_div.querySelector('.ItemPerksList-m_perkInfo-2opoU > .plug-stats').style.cssText = 'display: grid;';
        } catch {};
    };
};