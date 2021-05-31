function armor_pressed(){
    try {
        let jd = local_get('clarity_dim_div_locations').exotic_armor
        let perk_descriptions = local_get('clarity_exotic_armor_description')
        //let stat_window = document.getElementById(jd.stat_window).nextSibling
        let perk_name = get_in_content(jd.perk_name).textContent
        if(perk_descriptions[perk_name] != undefined){
            let loc_for_new_div = get_in_content(jd.loc_for_new_div)
            get_in_content(jd.description).remove('div')
            get_in_content(jd.armor_perk_name).style.cssText = 'width: 100%; margin-block: auto; margin-inline-start: 5px; flex: 80%; font-size: 13px;'
            loc_for_new_div.style.cssText = "flex-wrap: wrap;"
            create_div = document.createElement('div')
            // HTML comes from an external source controlled by me but for peace of mind I still use the "DOMPurify" sanitizer to clean it. Sorce sanitizer https://github.com/cure53/DOMPurify/ , Sorce HTML https://ice-mourne.github.io/Clarity-A-DIM-Companion-json/exotic_armor_perks/
            create_div.innerHTML = DOMPurify.sanitize(perk_descriptions[perk_name], {USE_PROFILES: {html: true}}) 
            loc_for_new_div.appendChild(create_div)
        }
    } catch{}
}