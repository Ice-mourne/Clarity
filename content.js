// Don't judge me its first time I did anything with java script and I have close to no coding experience or knowledge :D
/*
        ╭━┳━╭━╭━╮╮
        ┃┈┈┈┣▅╋▅┫┃
        ┃┈┃┈╰━╰━━━━━━╮
        ╰┳╯┈┈┈┈┈┈┈┈┈◢▉◣
         ┃┈┈┈┈┈┈┈┈┈┈▉▉▉
         ┃┈┈┈┈┈┈┈┈┈┈◥▉◤
         ┃┈┈┈┈╭━┳━━━━╯
         ┣━━━━━━┫
*/
//  🡳 🡳  - - - - - - - - - Looks then website is ready for manipulation
let DIMs_stalker = new MutationObserver((observe, rageQuit) =>{
    let DIM_Detailed_Item_Explanations = document.getElementsByClassName('item')[0];
    if (DIM_Detailed_Item_Explanations){
        //run_data_handler();
        start_looking_for_clicks();
        rageQuit.disconnect();
    };
});
DIMs_stalker.observe(document, {
    childList: true,
    subtree: true
});
//  🡱 🡱  - - - - - - - - - Looks then website is ready for manipulation  

//  🡳 🡳  - - - - - - - - - (^._.^) Looks where user clicked
function start_looking_for_clicks(){
    let cick = 0;
    document.getElementById('app').addEventListener('click', event => {
        //  🡳 🡳  - - - - - - - - - Fix for jumpy item menu and proper positioning
        let location = document.getElementById('content').nextSibling;
        var rect = document.body.getBoundingClientRect().right;
        var rect1 = event.target.getBoundingClientRect().right;
        let left_rigt = (rect - 460) > rect1;
        function ciker(){
            let bot_offset = window.innerHeight - (location.firstChild.clientHeight + 80) / 2 - event.target.getBoundingClientRect().top;
            let set_bot = 0;
            if (bot_offset < 0) {
                set_bot = bot_offset;
            };
            if (cick == 0){
                location.firstChild.style.cssText = 'display: none;';
                setTimeout(() => {
                    if (left_rigt) {
                        location.firstChild.style.cssText = `position: absolute; inset: ${set_bot}px auto auto 0px; transform: translate(0px, -50%);`;
                    }else {
                        location.firstChild.style.cssText = `position: absolute; inset: ${set_bot}px 0px auto auto; transform: translate(-65px, -50%);`;
                    };
                },20);
                location.getElementsByClassName('ItemPopupContainer-m_desktopActions-gtrWN')[0].style.cssText = 'transform: translate(0px, 15%);';
            };
            if (cick > 0){
                if (left_rigt) {
                    location.firstChild.style.cssText = `position: absolute; inset: ${set_bot}px auto auto 0px; transform: translate(0px, -50%);`;
                }else {
                    location.firstChild.style.cssText = `position: absolute; inset: ${set_bot}px 0px auto auto; transform: translate(-65px, -50%);`;
                };
                location.getElementsByClassName('ItemPopupContainer-m_desktopActions-gtrWN')[0].style.cssText = 'transform: translate(0px, 15%);';
                cick += 1;
            };
            cick += 1;
        };
        if (!location.classList.contains('item-popup')){
            cick = 0;
        };
        //     |\_/|   - - - - 🡱 🡱 - - - - Fix for jumpy item menu and proper positioning
        //   ( > º < )
        //    `>>x<<´
        //    /  O  \  - - - - 🡳 🡳 - - - - Click filter
        try{
            let t1 = event.target.title; // mods
            let t2 = event.target.parentElement.title; // weapon, armor
            let t3 = event.target.parentElement.parentElement.title; // weapon, 
            switch (true) {
                case t2.match(/(Helmet|Gauntlets|Chest Armor|Leg Armor)$/) != null || t3.match(/(Helmet|Gauntlets|Chest Armor|Leg Armor)$/) != null:
                    armor_pressed(); // sends armor name
                    ciker();
                    //compare_button_event();
                    break;
                case t2.match(/(Shotgun|Sidearm|Combat Bow|Hand Cannon|Sword| Rifle| Launcher| Gun)$/) != null || t3.match(/(Shotgun|Sidearm|Combat Bow|Hand Cannon|Sword| Rifle| Launcher| Gun)$/) != null:
                    gunsmit_button()
                    weapon_pressed(event.target);
                    ciker();
                    //compare_button_event();
                    weapon_perks_event();
                    filterGodRols(); // rework pending
                    hoverOver(); // rework pending
                    break;
                case t1.match(/( Armor Mod|Class Item Mod| Light Mod| Cell Mod| Well Mod| Raid Mod|Nightmare Mod|Weapon Mod)$/) != null: // Probably only for records page
                    //mod_pressed();
                    break;
            };
        } catch{};
        function compare_button_event(){
            let compare_button = document.getElementById('content').nextSibling.getElementsByClassName('fa-balance-scale-left')[0].parentElement;
            compare_button.addEventListener('click', e => {
                //compare_pressed();
            });
        };
        function weapon_perks_event(){
            let perk_list = document.getElementById('content').nextSibling.querySelectorAll('.ItemPerksList-m_plug-O8be3');
            for(let i = 0; i < perk_list.length; i++){
                const element = perk_list[i];
                element.id = 'perk_'+[i];
            };
            perk_list.forEach(element => {
                element.addEventListener('click', event => {
                    let target_id = event.currentTarget.id;
                    let perk_observer = new MutationObserver((observe, quit) => {
                    if(document.getElementById(target_id).querySelector('.ItemPerksList-m_perkInfo-2opoU > div') != null){
                        let perk_name = document.getElementById(target_id).querySelector('.ItemPerksList-m_perkInfo-2opoU > h2').textContent;
                        let loc_for_new_div = document.getElementById(target_id).parentElement
                        //perk_pressed(perk_name); // old can be deleted -----------------------------------------------------------------------------------------------------------------------------------------------------
                        weapon_perk_pressed(perk_name, loc_for_new_div);
                    };
                    quit.disconnect();
                    });
                    perk_observer.observe(document.getElementById('content').nextSibling.getElementsByClassName('ItemPerksList-m_sockets-1BlL6')[0], {
                        childList: true,
                        subtree: true
                    });
                });
            });
        };
        header_button(event); // new menu stuff
        //     (\_/)   - - - - 🡱 🡱 - - - - Click filter
        //    (='.'=)
        //    (")_(")
    });
};
//  🡱 🡱  - - - - - - - - - (^._.^) Looks where user clicked
function hoverOver(){
    setTimeout(function(){
        document.querySelectorAll('[class^="socket-container"]').forEach(item => {
            item.addEventListener('mouseover', event => {
                let perk_stalker = new MutationObserver(function (observe ,quit) {
                    let version = document.querySelector('._1xEii') !== null;
                    let perk_Explanations = (version) ? document.querySelector('._1kew0') : document.querySelector('[class^="PressTip-m_tooltip-"]');
                    if (perk_Explanations){
                        change_On_Hover_Over();
                        quit.disconnect();
                    };
                });
                perk_stalker.observe(document, {
                    childList: true,
                    subtree: true
                });
            });
        });  
    },10);
};

