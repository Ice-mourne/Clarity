//  🡳 🡳  - - - - - - - - - saves DIM version
(()=>{
    let url = document.querySelector("body").baseURI;
    let version = url.slice(8, url.search('.destiny'));
    localStorage.setItem('clarity_dim_version', version);
})();
//  🡱 🡱  - - - - - - - - - saves DIM version
function run_data_handler(){
    fetch(`https://ice-mourne.github.io/Clarity-A-DIM-Companion-json/version/?${Math.random()}`)
    .then(resp => {
        return resp.json();
    })
    .then(json_version => {
        if(localStorage.getItem('d2-manifest-version') != localStorage.getItem('clarity-d2-version') || localStorage.getItem('clarity_json_version') != json_version.version){
            let db;
            const indexed_DB_open = indexedDB.open('clarity_json', 1);
            indexed_DB_open.onupgradeneeded = e => {
                db = e.target.result;
                db.createObjectStore('clarity_DB');
            };
            indexed_DB_open.onsuccess = e => {
                db = e.target.result;
                add_data_indexDB();
                localStorage.setItem('clarity-d2-version', localStorage.getItem('d2-manifest-version'));
            };
            function add_data_indexDB(){
                // 🡳 🡳  - - - - - - - - - Get data from indexedDB
                indexedDB.open('keyval-store').onsuccess = e => {
                    let db = e.target.result;
                    let tx = db.transaction('keyval', 'readonly');
                    let store = tx.objectStore('keyval');
                    let data = store.get('d2-manifest');
                    data.onsuccess = ()=> {
                        run_inventory_item_filter(Object.entries(data.result.DestinyInventoryItemDefinition));
                        run_stat_group_filter(Object.entries(data.result.DestinyStatGroupDefinition));
                        run_perk_list_filter(Object.entries(data.result.DestinyPlugSetDefinition));
                        // DestinyStatDefinition for stat names?
                    };
                };
                //  🡱 🡱  - - - - - - - - - Get data from indexedDB

                //  🡳 🡳  - - - - - - - - - Inventory item
                function run_inventory_item_filter(data){
                    let weapon_info = {};
                    let armor_info = {};
                    let perk_mod_info = {};
                    for (let i = 0; i < data.length; i++){
                        const element = data[i];
                        switch (true){
                            //  🡳 🡳  - - - - - - - - - Filter weapons
                            case element[1].itemType == 3:
                                let f_weps = {
                                    'name': element[1].displayProperties.name,
                                    'icon': element[1].displayProperties.icon,
                                    'type': element[1].itemTypeDisplayName, // smg, fusion, ect
                                    'tier': element[1].inventory.tierTypeName, // legendary, ect
                                    'stat_group_hash': element[1].stats.statGroupHash, // min max stat group
                                    'frame': element[1].sockets.socketEntries[0].singleInitialItemHash,
                                    'slot_hash': element[1].equippingBlock.equipmentSlotTypeHash, // kinetic, energy, power
                                    'ammo': element[1].equippingBlock.ammoType, // primary, special 
                                    'damage_type_hash': element[1].defaultDamageTypeHash // void, solar
                                };
                                let n_perks = {};
                                for (let i = 0; i < element[1].sockets.socketEntries.length; i++){
                                    const p = element[1].sockets.socketEntries[i];
                                    n_perks[i] = {
                                        'ranom_perk_list': p.randomizedPlugSetHash,
                                        'static_perk_list': p.reusablePlugSetHash,
                                        'curated_perk_list': p.reusablePlugItems
                                    };
                                };
                                let n_base_stats = {};
                                for (let i = 0; i < Object.entries(element[1].stats.stats).length; i++){
                                    const z = Object.entries(element[1].stats.stats)[i];
                                    n_base_stats[z[0]] = z[1].value;
                                };


                                let inv_stats = {};
                                for (let i = 0; i < element[1].investmentStats.length; i++){
                                    const inv = element[1].investmentStats[i];
                                    inv_stats[inv.statTypeHash] = inv.value
                                };

                                f_weps.investment_stats = inv_stats;
                                f_weps.perks = n_perks;
                                f_weps.base_stats = n_base_stats;
                                weapon_info[element[0]] = f_weps;
                                break;
                            //  🡱 🡱  - - - - - - - - - Filter weapons

                            //  🡳 🡳  - - - - - - - - - Filter armor
                            case element[1].itemType == 2 && element[1].inventory.tierTypeName == 'Exotic': // item tipe armor & tier exotic
                                let f_armor = {
                                    'name': element[1].displayProperties.name,
                                    'icon': element[1].displayProperties.icon,
                                    'type': element[1].itemTypeDisplayName, // helm, chest
                                    'perks': element[1].sockets.socketEntries[11].singleInitialItemHash // exotic perk ---------------------------------- fix this
                                };
                                armor_info[element[0]] = f_armor;
                                break;
                            //  🡱 🡱  - - - - - - - - - Filter armor

                            //  🡳 🡳  - - - - - - - - - Filter weapon frames, exotic armor mods, weapon mods, masterworks, weapon catalists, weapon mods, armor mods
                            case element[1].itemType == '19' && element[1].displayProperties.name != '': // item type mod & dose it have name
                                let f_perks_mods = {
                                    'name': element[1].displayProperties.name,
                                    'icon': element[1].displayProperties.icon,
                                }
                                let n_stat = {};
                                for (let i = 0; i < element[1].investmentStats.length; i++){
                                    const stats = element[1].investmentStats[i];
                                    n_stat[stats.statTypeHash] = stats.value;
                                };
                                f_perks_mods.investmentStats = n_stat; // to perk mods add object 'inv stats' and in new object insert stats
                                perk_mod_info[element[0]] = f_perks_mods;
                                break;
                            //  🡱 🡱  - - - - - - - - - Filter weapon frames, exotic armor mods, weapon mods, masterworks, weapon catalists, weapon mods, armor mods
                        };
                    };
                    localStorage.setItem('clarity_weapon_info', JSON.stringify(weapon_info));
                    localStorage.setItem('clarity_armor_info', JSON.stringify(armor_info));
                    localStorage.setItem('clarity_perk_mod_info', JSON.stringify(perk_mod_info));
                };
                //  🡱 🡱  - - - - - - - - - Inventory item

                //  🡳 🡳  - - - - - - - - - Stat group
                function run_stat_group_filter(data){
                    let stat_group_info = {};
                    for (let i = 0; i < data.length; i++){
                        const element = data[i];
                        let n_group = {};
                        for (let i = 0; i < element[1].scaledStats.length; i++){
                            const group = element[1].scaledStats[i];
                            n_group[group.statHash] = group.displayInterpolation;
                        };
                        stat_group_info[element[0]] = n_group;
                    };
                    localStorage.setItem('clarity_stat_group_info', JSON.stringify(stat_group_info));
                };
                //  🡱 🡱  - - - - - - - - - Stat group

                //  🡳 🡳  - - - - - - - - - Perk list
                function run_perk_list_filter(data){ // lists of perks weapons can get
                    let perk_list_info = {};
                    for (let i = 0; i < data.length; i++){
                        const element = data[i];
                        if (!element[1].isFakePlugSet){
                            let n_list = [];
                            for (let i = 0; i < element[1].reusablePlugItems.length; i++){
                                const list = element[1].reusablePlugItems[i];
                                if (list.currentlyCanRoll) {
                                    n_list.push(list.plugItemHash);
                                };
                            };
                            perk_list_info[element[0]] = n_list;
                            perk_list_info[element[0]] = n_list;
                        };
                    };
                    localStorage.setItem('clarity_perk_list_info', JSON.stringify(perk_list_info));
                };
                //  🡱 🡱  - - - - - - - - - Perk list
                
                //  🡳 🡳  - - - - - - - - - Get and store custom json
                fetch(`https://ice-mourne.github.io/Clarity-A-DIM-Companion-json/exotic_armor_perks/?${Math.random()}`)
                .then(resp => { return resp.json() })
                .then(data => { localStorage.setItem('clarity_exotic_armor_description', JSON.stringify(data)) });

                fetch(`https://ice-mourne.github.io/Clarity-A-DIM-Companion-json/weapon_formulas/?${Math.random()}`)
                .then(resp => { return resp.json() })
                .then(data => { localStorage.setItem('clarity_weapon_formulas', JSON.stringify(data)) });

                fetch(`https://ice-mourne.github.io/Clarity-A-DIM-Companion-json/weapon_perks/?${Math.random()}`)
                .then(resp => { return resp })
                .then(data => { localStorage.setItem('clarity_weapon_perks', JSON.stringify(data)) });

                let dim_v = (localStorage.getItem('clarity_dim_version') == 'beta') ? 'beta_dim_locations' : 'app_dim_locations';
                fetch(`https://ice-mourne.github.io/Clarity-A-DIM-Companion-json/${dim_v}/?${Math.random()}`)
                .then(resp => { return resp.json() })
                .then(data => { localStorage.setItem('clarity_dim_div_locations', JSON.stringify(data)) });

                //  🡱 🡱  - - - - - - - - - Get and store custom json
                localStorage.setItem('clarity_json_version', json_version.version);
                alert('Clarity, A DIM Companion\nDatabase was updated please refresh the page for updates to take effect\nSorry for inconvenience');
            };
        };
    });
};









