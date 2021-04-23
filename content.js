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
// Looks then website is ready for manipulation
let DIMs_stalker = new MutationObserver((observe ,rageQuit) =>{
    let DIM_Detailed_Item_Explanations = document.getElementsByClassName('item')[0];
    if (DIM_Detailed_Item_Explanations){
        infoButton()
        startGrinding(); // Tryger to run script looking for selections
        rageQuit.disconnect();
    };
});
DIMs_stalker.observe(document, {
    childList: true,
    subtree: true
});
//  🡳 🡳  - - - - - - - - - (^._.^) Looks where user clicked
function startGrinding (){
    document.getElementById('app').addEventListener('click', event => {
        header_button(event)
        // >> ----------------- check if user pressed on weapon perk BETA only
        if(document.querySelector('.link.menuItem.logoLink > img') == null){
            let perk = document.querySelectorAll('[class^="ItemPerksList-m_plug-"]');
            var p = 1;
            for(var i=0; i< perk.length; i++){
            perk[i].id = 'perk'+p;
            p++;
            };
            document.querySelectorAll('[class^="ItemPerksList-m_plug-"]').forEach(perk => {
                if(perk.getAttribute('listener') !== 'true'){
                    perk.addEventListener('click', event => {
                        if(event.currentTarget.querySelector('[class^="ItemPerksList-m_perkInfo-"] > div') == null ){
                            let perkID = event.currentTarget.id;
                            //---------------------
                            let perk_stalker = new MutationObserver(function (observe ,quit) {
                                let perk_description = document.querySelector('[class^="ItemPerksList-m_perkInfo-"]');
                                if (perk_description){
                                    let perks_name = document.querySelector(`#${perkID} > [class^="ItemPerksList-m_perkInfo-"] > h2`).textContent;
                                    if(document.querySelector(`#${perkID} > [class^="ItemPerksList-m_perkInfo-"] > p`) != null){
                                        document.querySelector(`#${perkID} > [class^="ItemPerksList-m_perkInfo-"] > p`).style.cssText = 'display: none;';
                                    }
                                    perk_pressed(perks_name);
                                    quit.disconnect();
                                };
                            });
                            perk_stalker.observe(document, {
                                childList: true,
                                subtree: true
                            });
                            perk.removeAttribute('listener'); // removing because it would not work second time othervise
                        }else{
                            perk.removeAttribute('listener');
                        };
                    },{once: true});
                };
                perk.setAttribute('listener', 'true'); // adding attribute to avoid adding 10000 listereners
            });
        };
        // << ----------------- check if user pressed on weapon perk BETA only
        // >> ----------------- Look if user pressed on weapon
        // >> ----------------- fix for stupid error in beta DIM then you press on weapon perk name or description
        let check1 = event.target.parentElement == null;
        let check2 = (check1) ? true : event.target.parentElement.parentElement == null;
        let check3 = (check2) ? true : event.target.parentElement.parentElement.parentElement == null;
        // << ----------------- fix for stupid error in beta DIM then you press on weapon perk name or description
        if(check3 == false){
            let target = event.target.parentElement.parentElement;
            let target2 = event.target.parentElement.parentElement.parentElement;

            let kineticWep = target.classList.contains('item-type-Kinetic') || target2.classList.contains('item-type-Kinetic');
            let energyWep = target.classList.contains('item-type-Energy') || target2.classList.contains('item-type-Energy');
            let powerWep = target.classList.contains('item-type-Power') || target2.classList.contains('item-type-Power');

            if(kineticWep || energyWep || powerWep) {
                filterGodRols();
                hoverOver();
            };
        };
        // << ----------------- Look if user pressed on weapon
        // >> ----------------- check if user pressed on armor
        if((document.getElementsByClassName("item-details-body")[0] != null) && (check3 == false)){
            let target = event.target.parentElement.parentElement;
            let target2 = event.target.parentElement.parentElement.parentElement;

            let helmet = target.classList.contains('item-type-Helmet') || target2.classList.contains('item-type-Helmet');
            let gauntlets = target.classList.contains('item-type-Gauntlets') || target2.classList.contains('item-type-Gauntlets');
            let chest = target.classList.contains('item-type-Chest') || target2.classList.contains('item-type-Chest');
            let legs = target.classList.contains('item-type-Leg') || target2.classList.contains('item-type-Leg');

            if(helmet || gauntlets || chest || legs) {
                armor_pressed();
            };
        };
        // << ----------------- check if user pressed on armor
    });
};
//  🡱 🡱  - - - - - - - - - (^._.^) Looks where user clicked
// >> ----------------- Adds reload to weapon stat window
function runAddReload(a, b ,c){
    // gets info
    let version = document.querySelector('.link.menuItem.logoLink > img') !== null;
    let realoadValue = (version) ? document.getElementsByClassName("_3utrN")[5].textContent : document.querySelectorAll('[class^="ItemStat-m_value"]')[5].textContent;
    let name_class = (version) ? document.getElementsByClassName('_1XPu7')[0].className : document.querySelector('[class^="ItemStat-m_statName"]').className;
    let value_class = (version) ? document.getElementsByClassName('_3utrN')[0].className : document.querySelector('[class^="ItemStat-m_value"]').className;
    let statsWindow = (version) ? document.getElementsByClassName('_3ywbI')[0] : document.querySelector('[class^="ItemStats-m_stats"]');

    // text part of stat window ui
    let divText = document.createElement('div');
    statsWindow.appendChild(divText).className = name_class; // add div with proper class name
    divText.textContent = 'Reload Time'; // add text to new div
    divText.title = 'Time it takes to reload weapon in seconds\nFormulas are made by Van Holden';
    // nubers part of ui
    let divNumber = document.createElement('div');
    statsWindow.appendChild(divNumber).className = value_class; // add div with proper class name
    let cauculation = (a * realoadValue * realoadValue + b * realoadValue + c).toFixed(2); // formula for reload
    divNumber.textContent = cauculation; // add value

    // bars part of ui
    let divBar = document.createElement('div');
    statsWindow.appendChild(divBar);
    divBar.textContent = 's';
};
// << ----------------- Adds reload to weapon stat window
// >> ----------------- Adds range to weapon stat window
// zrm = Zoom range multiplayer // hf_VPP = Hip-Fire VPP // br_hf = Base Range Hip-Fire // b_zoom = Base Zoom
function runAddRange(zrm, hf_VPP, br_hf, b_zoom){
    // gets info
    let version = document.querySelector('.link.menuItem.logoLink > img') !== null;
    let rangeValue = (version) ? document.getElementsByClassName("_3utrN")[2].textContent : document.querySelectorAll('[class^="ItemStat-m_value"]')[2].textContent;
    let zoomValue = (version) ? document.getElementsByClassName("_3utrN")[7].textContent : document.querySelectorAll('[class^="ItemStat-m_value"]')[7].textContent;
    let name_class = (version) ? document.getElementsByClassName('_1XPu7')[0].className : document.querySelector('[class^="ItemStat-m_statName"]').className;
    let value_class = (version) ? document.getElementsByClassName('_3utrN')[0].className : document.querySelector('[class^="ItemStat-m_value"]').className;
    let statsWindow = (version) ? document.getElementsByClassName('_3ywbI')[0] : document.querySelector('[class^="ItemStats-m_stats"]');

// text part of stat window ui
    let divText = document.createElement('div');
    statsWindow.appendChild(divText).className = name_class; // add div with proper class name
    divText.textContent = 'DMG Fall-off ADS';
    divText.title = 'Distance at which damage fall-off begin\nFormulas are made by Mmonx';

// nubers part of ui
    let divNumber = document.createElement('div');
    statsWindow.appendChild(divNumber).className = value_class; // add div with proper class name
    let newZomm = (zoomValue - b_zoom) / 10 + zrm;
    let cauculation = ( (rangeValue * hf_VPP + br_hf) * newZomm ).toFixed(2); // formula for range
    divNumber.textContent = cauculation; // add value

// bars part of ui
    let divBar = document.createElement('div');
    statsWindow.appendChild(divBar);
    divBar.textContent = 'm';
}
// << ----------------- Adds range to weapon stat window
function hoverOver(){
    setTimeout(function(){
        document.querySelectorAll('[class^="socket-container"]').forEach(item => {
            item.addEventListener('mouseover', event => {
                let perk_stalker = new MutationObserver(function (observe ,quit) {
                    let version = document.querySelector('.link.menuItem.logoLink > img') !== null;
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
// >> ----------------- new menu with sorces used
//document.body.onload = function(){infoButton()};
function infoButton(){
    let css_window = 'position:absolute; margin:auto; display:none; flex-direction:column; background:black; padding:7px; border-radius:5px; margin-inline-start:-8px; top:45px; box-shadow:0 -1px 24px 4px #161626; cursor:default;'
    let css_text = 'padding: 5px; align-self: center; color: #e8a534;'
    let css_grid = 'display: grid;grid-template-columns: repeat(1, min-content) 1fr;';
    let version = document.querySelector('.link.menuItem.logoLink > img') !== null;
    let header_location = (version) ? document.querySelector('.header-links') : document.querySelector('[class^="Header-m_headerLinks-"]')
    let dark_mode_button = (localStorage.getItem('dark_mode') == 'on') ? 'Disable Dark Mode' : 'Enable Dark Mode'
    let beta_class = (version == false) ? document.querySelector('[class^="Header-m_headerLinks-"] > a:nth-child(2)').className : ''
    let class_name = (version) ? 'link menuItem' : beta_class
    untangle_mess('div', [['class', class_name], ['id','infoButton']], 'Sources & More', header_location, false) // create button 'Sources & More'
    untangle_mess('ul', [['id', 'infoLinks'], ['style', css_window]], undefined, document.getElementById('infoButton'), true) // create window for stuff
    let new_window = document.getElementById('infoLinks')
    untangle_mess('div', [['style', css_text]], 'Links to Sources used creating this extension', new_window, true) // top text
    untangle_mess('li', [['id', 'source_links'], ['style', css_grid]], undefined, new_window, true) // links to source matirial
    untangle_mess('div', [['style', css_text]], 'Other useful links', new_window, true) // mid text
    untangle_mess('li', [['id', 'useful_links'], ['style', css_grid]], undefined, new_window, true) // links to useful stuff
    untangle_mess('div', [['style', css_text]], 'Settings', new_window, true) // settings text
    untangle_mess('div', [['id', 'settings_location'], ['style', css_grid]], undefined, new_window, true) // place to store settings
    untangle_mess('div', [['class', class_name], ['id','darker_mode_togle'], ['style','padding: 5px; cursor: pointer;'], ['dark_mode',localStorage.getItem('dark_mode')]], dark_mode_button, document.getElementById('settings_location'), true) // dark mode button
    //untangle_mess('', [['', ']], undefined, document.getElementById(''),true)

    function untangle_mess(element_type, att_to_set, text_conten, ele_location, extra){
        let element = document.createElement(element_type);
        if(att_to_set[0] !== undefined) element.setAttribute(att_to_set[0][0], att_to_set[0][1]);
        if(att_to_set[1] !== undefined) element.setAttribute(att_to_set[1][0], att_to_set[1][1]);
        if(att_to_set[2] !== undefined) element.setAttribute(att_to_set[2][0], att_to_set[2][1]);
        if(att_to_set[3] !== undefined) element.setAttribute(att_to_set[3][0], att_to_set[3][1]);
        if(text_conten !== undefined) element.textContent = text_conten;
        if(extra){
            ele_location.appendChild(element)
        }else{
            let beforeThis = (version) ? document.querySelector("#header > .header-links > a:nth-child(1)") : document.querySelector('[class^="Header-m_headerLinks-"] > a:nth-child(1)') // location of last thing in header
            ele_location.insertBefore(element, beforeThis); // add div as first div because its bakvards visualy
        };
    };

    let sources_links = document.getElementById('source_links')
    let useful_links = document.getElementById('useful_links')
    create_new_link('https://i.imgur.com/5NFXV9I.png', 'https://docs.google.com/spreadsheets/d/1WaxvbLx7UoSZaBqdFr1u32F2uWVLo-CJunJB4nlGUE4/', "Mods, Abilities, and More by Pip1n", sources_links);
    create_new_link('https://i.imgur.com/5NFXV9I.png', 'https://docs.google.com/spreadsheets/d/1i1KUwgVkd8qhwYj481gkV9sZNJQCE-C3Q-dpQutPCi4/', "Damage Buffs, Debuffs, and Modifiers by Court", sources_links);
    create_new_link('https://i.imgur.com/5NFXV9I.png', 'https://docs.google.com/spreadsheets/d/13heG_rKRB9UU5DpvRbl1q11WGFs8QPPzpFA60uIOT8w/', "Reload Speed started by Van Holden updated by Sereni", sources_links);
    create_new_link('https://i.imgur.com/GQclAc8.png', 'https://destinyindepth.com/range_calculator/', "Weapon Range Calculator by Mmonx", sources_links);

    create_new_link('https://d2gunsmith.com/logo512.png', 'https://d2gunsmith.com/', "D2 Gunsmith by dre", useful_links);
    create_new_link('https://i.imgur.com/5NFXV9I.png', 'https://docs.google.com/spreadsheets/d/1_6zsM7kzvg0aUT8YtM_-Wg_5K1gKDOlrwfVzutEjq-s/', "Weapon Stats & TTK by Mercules904 ", useful_links);
    create_new_link('https://i.imgur.com/5NFXV9I.png', 'https://docs.google.com/spreadsheets/d/12vF7ckMzN4hex-Tse4HPiVs_d9huFOKlvUoq5V41nxU/', "Weapon DPS by SkyWarrior", useful_links);
    //create_new_link('img_link', 'link', "name", useful_links);

    function create_new_link(img_link, link, name, li){
        let seet_img_div = document.createElement('div');
        let shett_img_element = document.createElement('img');
        let a = document.createElement('a');
        li.appendChild(seet_img_div).appendChild(shett_img_element).style.cssText = 'height: 20px; cursor: default;';
        shett_img_element.src = img_link;
        li.appendChild(a).className = class_name;
        a.href = link;
        a.textContent = name;
        a.target = '_blank';
    };
};

let dark_mode = document.createElement('style');
document.body.parentElement.appendChild(dark_mode).id = 'dark_mode';
function enable_dark_mode(){
        let css1 = '.app::before {background: radial-gradient(circle at 50% 70px, #202031 0%, #07070d 100%);background-position: center top;background-repeat: no-repeat;}';
        let css2 = '#header, .Header-m_header-1eaLe, .HeaderShadowDiv-m_cover-1R3rf, .store-header, ._1R3rf {background: radial-gradient(circle at 50% 70px, #202031 0%, #07070d 100%);background-position: center top;background-repeat: no-repeat;background-size: 100vw 100vh;}';
        let css3 = '.ItemTable-m_table-ANdPB>div, .ANdPB>div {background-color: #242437;}';
        let css4 = 'div[class^="BadgeInfo-m_badge"], .hcIF4 {background-color: #0000;color: #dddddd;}';
        let css5 = '.item-img {border: 1px solid #202031;}';
        let css6 = '.ItemIcon-m_borderless-1AaJE, ._1AaJE {border-color: transparent;}';
        let css7 = '.rating-icon.godroll {color: #1379b4;}';
        dark_mode.textContent = css1 + css2 + css3 + css4 + css5 + css6 + css7;
};
if(localStorage.getItem('dark_mode') == 'on'){
    enable_dark_mode();
};

//  (っ◔◡◔)っ  new menu with sources used
function header_button(event){  
    //  🡳 🡳  - - - - - - - - - Info button open / close
    let new_window = document.querySelector('#infoButton > ul'); 
    let button_pressed = event.target == document.getElementById('infoButton');
    let winow_open = new_window.style.display == 'none';
    let black_list = event.target.id !== 'darker_mode_togle';
    if(button_pressed && winow_open){
        new_window.style.display = 'flex';
    } else if(black_list){
        new_window.style.display = 'none';
    };
    //  🡱 🡱  - - - - - - - - - Info button open / close

    //  🡳 🡳  - - - - - - - - - Dark mode on / off
    if(event.target.id == 'darker_mode_togle'){
        let darker_mode_togle = document.getElementById('darker_mode_togle'); // dark mode button
        if(event.target.getAttribute('dark_mode') !== 'on'){
            enable_dark_mode();
            darker_mode_togle.setAttribute('dark_mode', 'on');
            darker_mode_togle.textContent = 'Disable Dark Mode';
            localStorage.setItem('dark_mode', 'on');
        }else{
            document.getElementById('dark_mode').textContent = 'empty';
            darker_mode_togle.setAttribute('dark_mode', 'off');
            darker_mode_togle.textContent = 'Enable Dark Mode';
            localStorage.setItem('dark_mode', 'off');
        };
    };
    //  🡱 🡱  - - - - - - - - - Dark mode on / off

    //  🡳 🡳  - - - - - - - - - 

    //  🡱 🡱  - - - - - - - - - 
};



