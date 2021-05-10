let perk_descriptions;
let json_divs_data;
function allow_run_armor_indexedDB(){
    indexedDB.open('clarity_json').onsuccess = e => {
        let db = e.target.result;
        let tx = db.transaction('clarity_DB', 'readonly');
        let store = tx.objectStore('clarity_DB');
        perk_descriptions = store.get('exotic_armor_description');
        json_divs_data = store.get('beta_dim_locations');
    };
};

function armor_pressed(){
    let json_divs = json_divs_data.result.exotic_armor;
    let stat_window = document.getElementById(json_divs.stat_window).nextSibling;
    let perk_name = stat_window.getElementsByClassName(json_divs.perk_name)[0].textContent;
    if(perk_descriptions.result[perk_name] != undefined){
        let new_div_loc = stat_window.getElementsByClassName(json_divs.new_div_loc)[0];
        stat_window.getElementsByClassName(json_divs.description)[0].remove('div');
        stat_window.getElementsByClassName(json_divs.new_div_css)[0].style.cssText = "width: 100%; margin-block: auto; margin-inline-start: 5px; flex: 80%; font-size: 13px;";
        new_div_loc.style.cssText = "flex-wrap: wrap;";
        create_div = document.createElement('div');
        create_div.innerHTML = DOMPurify.sanitize(perk_descriptions.result[perk_name], {USE_PROFILES: {html: true}}); // HTML comes from an external source controlled by me but for peace of mind I still use the "DOMPurify" sanitizer to clean it. Sorce https://github.com/cure53/DOMPurify/
        new_div_loc.appendChild(create_div)
    };
};


