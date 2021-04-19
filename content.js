// Don't judge me its first time I did anything with java script and I have close to no coding experience or knowledge :D
// Looks then website is loaded stuff like "$('document').ready() , $(window).on('load') " and "addEventListener" fires way to early this will activate then items are loaded
let DIMs_stalker = new MutationObserver(function (observe ,rageQuit) {
    let DIM_Detailed_Item_Explanations = document.querySelector('._2--vS');
    if (DIM_Detailed_Item_Explanations){
        startGrinding(); // Tryger to run script looking for selections
        rageQuit.disconnect();
    };
});
DIMs_stalker.observe(document, {
    childList: true,
    subtree: true
});

//------------------------------------------------------------------------------------------------------------------------//
// Looks then you press on your trash rools
function startGrinding (){
    
    infoButton();
    document.querySelector('#app').addEventListener('click', event => {
        //----------------- Info button part
        var ul = document.querySelector('#infoButton > ul');
        if(event.target == document.querySelector('#infoButton') && ul.attributeStyleMap.size == 1){
            ul.style.cssText = 'position: absolute;margin: auto;display: flex;flex-direction: column;background: black;padding: 7px;border-radius: 5px;margin-inline-start: -8px;margin-block-start: 105px;box-shadow: 0 -1px 24px 4px #161626;cursor: default;';
        } else{
            ul.style.cssText = 'display: none;';
        }
        //-----------------

        if(document.querySelector('._3mQRO') == null){} // checks if item stat window is open 
        else{
            let target = event.target.parentElement.parentElement;
            let target2 = event.target.parentElement.parentElement.parentElement;

            let kineticWep = target.classList.contains('item-type-Kinetic');
            let energyWep = target.classList.contains('item-type-Energy');
            let powerWep = target.classList.contains('item-type-Power');

            let kineticWep2 = target2.classList.contains('item-type-Kinetic');
            let energyWep2 = target2.classList.contains('item-type-Energy');
            let powerWep2 = target2.classList.contains('item-type-Power');

            if(kineticWep || energyWep || powerWep || kineticWep2 || energyWep2 || powerWep2) {
                filterGodRols();
                hoverOver();
            };
        };
    });
};

//------------------------------------------------------------------------------------------------------------------------//
// Reload
// Finaly i can start adding stats to weapons
function runAddReload(a, b ,c){

 // gets info
    let realoadValue = document.querySelectorAll("._3utrN")[5].textContent; // get reload stat value
    let statsWindow = document.querySelector('._3ywbI'); // stats window location

 // text part of stat window ui
    let divText = document.createElement('div'); // create div
    statsWindow.appendChild(divText); // add div to stats window
    divText.className = '_1XPu7'; // add name to new div
    divText.textContent = 'Reload Time'; // add text to new div
    divText.title = 'Time it takes to reload weapon in seconds\nFormulas are made by Van Holden';

 // nubers part of ui
    let divNumber = document.createElement('div'); // create div
    statsWindow.appendChild(divNumber); // add div to stats window
    divNumber.className = '_3utrN'; // add name to new div
    let cauculation = (a * realoadValue * realoadValue + b * realoadValue + c).toFixed(2); // formula for reload
    divNumber.textContent = cauculation; // add value

 // bars part of ui
    let divBar = document.createElement('div'); // create div
    statsWindow.appendChild(divBar); // add div to stats window
    divBar.textContent = 's'; // add text to new div
};

//------------------------------------------------------------------------------------------------------------------------//
// Range 
// zrm = Zoom range multiplayer // hf_VPP = Hip-Fire VPP // br_hf = Base Range Hip-Fire // b_zoom = Base Zoom
function runAddRange(zrm, hf_VPP, br_hf, b_zoom){

    // gets and add info
    let rangeValue = document.querySelectorAll("._3utrN")[2].textContent; // get range stat value
    let zoomValue = document.querySelectorAll("._3utrN")[7].textContent; // get zoom stat value
    let statsWindow = document.querySelector('._3ywbI'); // stats window location

// text part of stat window ui
    let divText = document.createElement('div'); // create div
    statsWindow.appendChild(divText); // add div to stats window
    divText.className = '_1XPu7'; // add name to new div
    divText.textContent = 'DMG Fall-off ADS'; // add text to new div
    divText.title = 'Distance at which damage fall-off begin\nFormulas are made by Mmonx';

// nubers part of ui
    let divNumber = document.createElement('div'); // create div
    statsWindow.appendChild(divNumber); // add div to stats window
    divNumber.className = '_3utrN'; // add name to new div
    let newZomm = (zoomValue - b_zoom) / 10 + zrm;
    let cauculation = ( (rangeValue * hf_VPP + br_hf) * newZomm ).toFixed(2); // formula for range
    divNumber.textContent = cauculation; // add value

// bars part of ui
    let divBar = document.createElement('div'); // create div
    statsWindow.appendChild(divBar); // add div to stats window
    divBar.textContent = 'm'; // add text to new div
}

function hoverOver(){
    setTimeout(function(){
        document.querySelectorAll('[class^="socket-container"]').forEach(item => {
            item.addEventListener('mouseover', event => {
                let perk_stalker = new MutationObserver(function (observe ,Quit) {
                    let perk_Explanations = document.querySelector('._1kew0');
                    if (perk_Explanations){
                        change_On_Hover_Over();
                        Quit.disconnect();
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

function infoButton(){
    let div = document.createElement('div'); // create div
    let seet_img_div1 = document.createElement('div'); // create div for img
    let seet_img_div2 = document.createElement('div'); // create div for img
    let ul = document.createElement('ul'); // create ul
    let li = document.createElement('li'); // create li
    let shett_img_element1 = document.createElement('img')
    let shett_img_element2 = document.createElement('img')
    let a1 = document.createElement('a');
    let a2 = document.createElement('a');
    let a3 = document.createElement('a');
    let a4 = document.createElement('a');

    let headerLocation = document.querySelector('.header-links');
    let beforeThis = document.querySelector("#header > div.header-links > a:nth-child(1)"); // location of last thing in header
    
    headerLocation.insertBefore(div, beforeThis); // add div to hold new button
    div.className = 'link menuItem'; // add class name
    div.textContent = 'Place holder'; // name new button
    div.id = 'infoButton'

    ul.style.cssText = 'display: none;';

    div.appendChild(ul); // add ul 
    ul.appendChild(li); // add li
    li.style.cssText = 'display: grid;grid-template-columns: repeat(1, min-content) 1fr;' // add scc to li

    li.appendChild(seet_img_div1)
    seet_img_div1.appendChild(shett_img_element1)
    shett_img_element1.style.cssText = 'width: 20px;cursor: default;'
    shett_img_element1.src = 'https://i.imgur.com/5NFXV9I.png'
    li.appendChild(a1);
    a1.href = 'https://docs.google.com/spreadsheets/d/1WaxvbLx7UoSZaBqdFr1u32F2uWVLo-CJunJB4nlGUE4/edit#gid=1158705568';
    a1.textContent = "Pip1n's Spreadsheet";
    a1.target = '_blank'
    a1.className = 'link menuItem'

    li.appendChild(seet_img_div2)
    seet_img_div2.appendChild(shett_img_element2)
    shett_img_element2.style.cssText = 'width: 20px;cursor: default;'
    shett_img_element2.src = 'https://i.imgur.com/5NFXV9I.png'
    li.appendChild(a2);
    a2.href = 'https://docs.google.com/spreadsheets/d/1i1KUwgVkd8qhwYj481gkV9sZNJQCE-C3Q-dpQutPCi4/edit#gid=242217075';
    a2.textContent = "Court's Spreadsheet";
    a2.target = '_blank'
    a2.className = 'link menuItem'
/*
    li.appendChild(a3);
    a3.href = 'https://docs.google.com/spreadsheets/d/1WaxvbLx7UoSZaBqdFr1u32F2uWVLo-CJunJB4nlGUE4/edit#gid=1158705568';
    a3.textContent = "Pip1n's Spreadsheet";
    a3.target = '_blank'
    a3.className = 'link menuItem'

    li.appendChild(a4);
    a4.href = 'https://docs.google.com/spreadsheets/d/1i1KUwgVkd8qhwYj481gkV9sZNJQCE-C3Q-dpQutPCi4/edit#gid=242217075';
    a4.textContent = "Court's Spreadsheet";
    a4.target = '_blank'
    a4.className = 'link menuItem'
    */
};






