// Don't judge me its first time I did anything with java script and I have close to no coding experience or knowledge :D
// Looks then website is loaded stuff like "$('document').ready() , $(window).on('load') " and "addEventListener" fires way to early this will activate then user press on your crapy weapon first time
let DIMs_stalker = new MutationObserver(function (observe ,rageQuit) {
    let DIM_Detailed_Item_Explanations = document.querySelector('._3ywbI');
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
document.querySelectorAll('._2--vS').forEach(item => {
    item.addEventListener('click', event => {
        filterGodRols()
    })
  })    
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
    divText.textContent = 'ADS Range'; // add text to new div
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

/*

//-------------------------------------------------DEBUG-BUTON------------------------------------------------------------//
chrome.runtime.onMessage.addListener(function(request){

    console.log((zoomValue - b_zoom) / 10 + hf_VPP);
    console.log('AutoRifle' + 'AdaptiveFrame');
})
//------------------------------------------------------------------------------------------------------------------------//

*/