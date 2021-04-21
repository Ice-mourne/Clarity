// Don't judge me its first time I did anything with java script and I have close to no coding experience or knowledge :D
// Looks then website is ready for manipulation
let DIMs_stalker = new MutationObserver((observe ,rageQuit) =>{
    let DIM_Detailed_Item_Explanations = document.getElementsByClassName('item')[0];
    if (DIM_Detailed_Item_Explanations){
        infoButton(); // new menu with sorces used
        startGrinding(); // Tryger to run script looking for selections
        rageQuit.disconnect();
    };
});
DIMs_stalker.observe(document, {
    childList: true,
    subtree: true
});
// >> ----------------- Looks where user clicked
function startGrinding (){
    document.getElementById('app').addEventListener('click', event => {
        // >> ----------------- Info button open / close
        var ul = document.querySelector('#infoButton > ul');
        if(event.target == document.getElementById('infoButton') && ul.attributeStyleMap.size == 1){
            ul.style.cssText = 'position: absolute;margin: auto;display: flex;flex-direction: column;background: black;padding: 7px;border-radius: 5px;margin-inline-start: -8px;margin-block-start: 105px;box-shadow: 0 -1px 24px 4px #161626;cursor: default;';
        } else{
            ul.style.cssText = 'display: none;';
        }
        // << ----------------- Info button open / close
        // >> ----------------- check if user pressed on weapon perk BETA only
        if(document.querySelector('.link.menuItem.logoLink > img').className == 'logo beta'){
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
                                        document.querySelector(`#${perkID} > [class^="ItemPerksList-m_perkInfo-"] > p`).style.cssText = 'display: none;'
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
                armor_pressed()
            };
        };
        // << ----------------- check if user pressed on armor
    });
};
// << ----------------- Looks where user clicked
// >> ----------------- Adds reload to weapon stat window
function runAddReload(a, b ,c){
    // gets info
    let version = document.querySelector('.link.menuItem.logoLink > img').className == 'logo release';
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
    let version = document.querySelector('.link.menuItem.logoLink > img').className == 'logo release';
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
                    let version = document.querySelector('.link.menuItem.logoLink > img').className == 'logo release';
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
function infoButton(){
    let div = document.createElement('div');
    let ul = document.createElement('ul');
    let li = document.createElement('li');
    let headerLocation = document.querySelector('.header-links');
    let beforeThis = document.querySelector("#header > div.header-links > a:nth-child(1)"); // location of last thing in header
    headerLocation.insertBefore(div, beforeThis); // add div as first div because its bakvards visualy
    div.className = 'link menuItem';
    div.textContent = 'Place holder';
    div.id = 'infoButton';
    div.appendChild(ul).style.cssText = 'display: none;' // add ul to div and set css to hide by default
    ul.appendChild(li).style.cssText = 'display: grid;grid-template-columns: repeat(1, min-content) 1fr;'; // add li to ul and set some css

    add_new_link('https://i.imgur.com/5NFXV9I.png', 'https://docs.google.com/spreadsheets/d/1WaxvbLx7UoSZaBqdFr1u32F2uWVLo-CJunJB4nlGUE4/', "Pip1n's Spreadsheet")
    add_new_link('https://i.imgur.com/5NFXV9I.png', 'https://docs.google.com/spreadsheets/d/1i1KUwgVkd8qhwYj481gkV9sZNJQCE-C3Q-dpQutPCi4/', "Court's Spreadsheet")
    //add_new_link('img_link', 'link', "name")
    //add_new_link('img_link', 'link', "name")
    //add_new_link('img_link', 'link', "name")
    //add_new_link('img_link', 'link', "name")
    //add_new_link('img_link', 'link', "name")
    //add_new_link('img_link', 'link', "name")

    function add_new_link(img_link, link, name){
    let seet_img_div = document.createElement('div')
    let shett_img_element = document.createElement('img')
    let a = document.createElement('a');
    li.appendChild(seet_img_div).appendChild(shett_img_element).style.cssText = 'width: 20px;cursor: default;';
    shett_img_element.src = img_link;
    li.appendChild(a).className = 'link menuItem';
    a.href = link;
    a.textContent = name;
    a.target = '_blank';
    };
};
// << ----------------- new menu with sorces used





