function armor_pressed(){
    try {
        let json_divs = JSON.parse(localStorage.getItem('clarity_dim_div_locations')).exotic_armor;
        let perk_descriptions = JSON.parse(localStorage.getItem('clarity_exotic_armor_description'));
        let stat_window = document.getElementById(json_divs.stat_window).nextSibling;
        let perk_name = stat_window.getElementsByClassName(json_divs.perk_name)[0].textContent;
        if(perk_descriptions[perk_name] != undefined){
            let loc_for_new_div = stat_window.getElementsByClassName(json_divs.loc_for_new_div)[0];
            stat_window.getElementsByClassName(json_divs.description)[0].remove('div');
            stat_window.getElementsByClassName(json_divs.armor_perk_name)[0].style.cssText = 'width: 100%; margin-block: auto; margin-inline-start: 5px; flex: 80%; font-size: 13px;';
            loc_for_new_div.style.cssText = "flex-wrap: wrap;";
            create_div = document.createElement('div');
            // HTML comes from an external source controlled by me but for peace of mind I still use the "DOMPurify" sanitizer to clean it. Sorce sanitizer https://github.com/cure53/DOMPurify/ , Sorce HTML https://ice-mourne.github.io/Clarity-A-DIM-Companion-json/exotic_armor_perks/
            create_div.innerHTML = DOMPurify.sanitize(perk_descriptions[perk_name], {USE_PROFILES: {html: true}}); 
            loc_for_new_div.appendChild(create_div);
        };
    } catch{};
};