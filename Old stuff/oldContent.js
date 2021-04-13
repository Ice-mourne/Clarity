
//make item icon in to buttons??? probably no



/* 
chrome.runtime.onMessage.addListener(function(request){
    
    const window = document.querySelector('._2XbZ9');

    const weapon_type = window.querySelector('.Xyg7s');
    const weapon_frame = window.querySelector('._2XDzu div');
    const weapon_stats = window.querySelectorAll('._3utrN');

    //var divthing = document.createElement("img");
    //divthing.setAttribute("class", "div-thing");
    //var div = document.getElementsByClassName("._3ywbI");


    document.querySelector('div._3ywbI').id = 'stats';      // add id named 'stats' to stats window
    let div = document.getElementById('stats')              // gets location of newly created stats id in stats window

    //create empty div
    let stuff = document.createElement('div')               // create div element in stats window
    div.appendChild(stuff)                                  // places created div in stats window

    //div for range stat name
    let stuff2 = document.createElement('div')               // create div element in stats window
    div.appendChild(stuff2)                                  // places created div in stats window
    stuff2.id = 'rangeMetters' 
    stuff2.textContent = 'Reload Time'
    stuff2.className = '_1XPu7'

    //div for range stat value
    let stuff3 = document.createElement('div')               // create div element in stats window
    div.appendChild(stuff3)                                  // places created div in stats window
    stuff3.id = 'rangeMettersValue' 
    let realoadValue = weapon_stats[5].textContent
    //stuff3.textContent = cauculation

    let cauculation = ((0.00316922 * realoadValue * realoadValue + -0.870122 * realoadValue + 92.5862) / 30).toFixed(2) + 's'
    stuff3.textContent = cauculation
    console.log(cauculation)

    //const weapon_image = document.querySelector('.item');
    //weapon_image.onclick = console.log(weapon_image)
    //console.log(weapon_image)



    //console.log(weapon_type.textContent);
    //console.log(weapon_frame.textContent);
    //console.log(weapon_stats[2].textContent);
    //console.log(weapon_stats[5].textContent);


    var i;
    for (i = 1; i < 100; i++) {
        document.querySelector(".item-drag-container:nth-child(" + i + ") ").id = 'rangeMetters'
        document.querySelector(".item-drag-container:nth-child(" + i + ") > div > div ").id = 'rangeMetters'


    // get the element you want to add the button to
    var myDiv = document.getElementById("rangeMetters" + i);

    // create the button object and add the text to it
    var button = document.createElement("BUTTON");

    // add the button to the div
    myDiv.appendChild(button);
    
    }


    document.getElementById('6917529261070909520').addEventListener('click',function(){
        console.log('btnComment worked')
     });

})

const window2 = document.querySelector('._2XbZ9');

//const weapon_type = window.querySelector('.Xyg7s');

window2.onload = function() {
    console.log("Hello World");
};



document.addEventListener("click", myFunction);

function myFunction() {
  console.log("Hello World");
}


document.addEventListener('click', function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement,
        text = target.textContent || target.innerText;   
}, false);


if ( jQuery("#rangeMetters").is(":visible") ) {
console.log('sup1')
}


$(window).on('load', function(){
console.log('sup');
})



$(document).on('change','._3mQRO', function() {
    // Handler for .load() called.
    console.log('sup');
  });


$('._1XPu7').ready(function(){
    console.log('sup');
    console.log($('._1XPu7'));
    })

$( "#rangeMetters" ).click(function() {
    console.log('sup2');
  });

  $(document).on('click', '#rangeMetters', function () {
    console.log('sup4');
});

document.addEventListener("DOMContentLoaded", function(){
    console.log('sup');
});


$(window).on('load', function () {

const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.addedNodes.length) {
        console.log('Added', mutation.addedNodes)
      }
    })
  })
  //console.log(bears);
  const bears = document.querySelector('#app')
  observer.observe(bears, {
    childList: true,
  })

});
  */


$('document').ready( function () {
    setTimeout(function(){
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
              if (mutation.addedNodes.length) {

                const window = document.querySelector('._2XbZ9');
                const weapon_stats = window.querySelectorAll('._3utrN');
                document.querySelector('div._3ywbI').id = 'stats';      // add id named 'stats' to stats window
                let div = document.getElementById('stats')              // gets location of newly created stats id in stats window

                let stuff2 = document.createElement('div')               // create div element in stats window
                div.appendChild(stuff2)                                  // places created div in stats window
                stuff2.id = 'rangeMetters' 
                stuff2.textContent = 'Reload Time'
                stuff2.className = '_1XPu7'

                let stuff3 = document.createElement('div')               // create div element in stats window
                div.appendChild(stuff3)                                  // places created div in stats window
                stuff3.id = 'rangeMettersValue'
                stuff3.className = '_3utrN' 
                let realoadValue = weapon_stats[5].textContent
                //stuff3.textContent = cauculation
                let cauculation = ((0.00316922 * realoadValue * realoadValue + -0.870122 * realoadValue + 92.5862) / 30).toFixed(2) + 's'
                stuff3.textContent = cauculation


                //console.log('Added', mutation.addedNodes)
              }
            })
          })
          //console.log(bears);
          const bears = document.querySelector('#app > div > div')
          observer.observe(bears, {
            childList: true,
          })
        },5000)
      });


/*
const myList = document.querySelector('#app > div > div')
const observer = new MutationObserver(mutations => {
    console.log('mutations');
})
observer.observe(myList, {
    childList: true
})
*/



/*
//Look then DIM has loaded

var observDIM = new MutationObserver(function () {


    var DIM_Page = document.querySelector('._3ywbI');
    var DIM_Page2 = $('div[class^="item-popup"]')

    if (DIM_Page || DIM_Page2) {
        // then DIM loaded do this
        document.querySelector('._3ywbI').id = 'stats';
        console.log("added");

      //me.disconnect();
      return;
    }

    
  });
  observDIM.observe(document, {
    childList: true,
    subtree: true
  });

// End of observer stuff


$('document').ready( function () {
    setTimeout(function(){
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
              if (mutation.addedNodes.length) {



                
                const window = document.querySelector('._2XbZ9');
                const weapon_stats = window.querySelectorAll('._3utrN');
                document.querySelector('div._3ywbI').id = 'stats';      // add id named 'stats' to stats window
                let div = document.getElementById('stats')              // gets location of newly created stats id in stats window

                let stuff2 = document.createElement('div')               // create div element in stats window
                div.appendChild(stuff2)                                  // places created div in stats window
                stuff2.id = 'rangeMetters' 
                stuff2.textContent = 'Reload Time'
                stuff2.className = '_1XPu7'

                let stuff3 = document.createElement('div')               // create div element in stats window
                div.appendChild(stuff3)                                  // places created div in stats window
                stuff3.id = 'rangeMettersValue'
                stuff3.className = '_3utrN' 
                let realoadValue = weapon_stats[5].textContent
                //stuff3.textContent = cauculation
                let cauculation = ((0.00316922 * realoadValue * realoadValue + -0.870122 * realoadValue + 92.5862) / 30).toFixed(2) + 's'
                stuff3.textContent = cauculation


                console.log('Added', mutation.addedNodes)
              }
            })
          })
          //console.log(bears);
          const bears = document.querySelector('#app > div > div')
          observer.observe(bears, {
            childList: true,
            })

    },5000)
});

*/

/*

    let stuff2 = document.createElement('div')               // create div element in stats window
    div.appendChild(stuff2)                                  // places created div in stats window
    stuff2.id = 'rangeMetters' 
    stuff2.textContent = 'Reload Time'
    stuff2.className = '_1XPu7'
    let stuff3 = document.createElement('div')               // create div element in stats window
    div.appendChild(stuff3)                                  // places created div in stats window
    stuff3.id = 'rangeMettersValue'
    stuff3.className = '_3utrN' 
    let cauculation = (a * realoadValue * realoadValue + b * realoadValue + c).toFixed(2) + 's' // formula for reload
    stuff3.textContent = cauculation */




/*


    function lookInDiv(){
        //console.log(document.querySelector('._3ywbI').nodeType); // node type gives error if querySelector is null
        let nodeTypeNumer = document.querySelector('._3ywbI')
        if(nodeTypeNumer.nodeType == 1)
        console.log('this one');
    }
    lookInDiv()
    console.log(mutation.addedNodes);
    */




/*
const window = document.querySelector('._2XbZ9');
const weapon_stats = window.querySelectorAll('._3utrN');
document.querySelector('div._3ywbI').id = 'stats';      // add id named 'stats' to stats window
let div = document.getElementById('stats')              // gets location of newly created stats id in stats window

let stuff2 = document.createElement('div')               // create div element in stats window
div.appendChild(stuff2)                                  // places created div in stats window
stuff2.id = 'rangeMetters' 
stuff2.textContent = 'Reload Time'
stuff2.className = '_1XPu7'

let stuff3 = document.createElement('div')               // create div element in stats window
div.appendChild(stuff3)                                  // places created div in stats window
stuff3.id = 'rangeMettersValue'
stuff3.className = '_3utrN' 
let realoadValue = weapon_stats[5].textContent
//stuff3.textContent = cauculation
let cauculation = ((0.00316922 * realoadValue * realoadValue + -0.870122 * realoadValue + 92.5862) / 30).toFixed(2) + 's'
stuff3.textContent = cauculation


console.log('Added', mutation.addedNodes)






*/


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    /*
    let observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes.length) {
                filterGodRols(mutation); // Tryger to look if guardian pressed on god rool
                console.log(mutation);
            };
        });
    }); 
    let config1 = {childList: true};
    let config2 = {childList: true};
    let lordOfWolfs = document.querySelector('#app > div > div');
    let whisperOfTheWorm = document.querySelector('#a11y-status-message');
    observer.observe(lordOfWolfs, config1);
    observer.observe(whisperOfTheWorm, config2); 

    $('._2--vS').each(function(eq, el) {
        el = $(el);
        if (typeof(el.attr('id')) === "undefined") {
          el.prop('id', 'div-dfg');
          console.log(el.prop('id'));
        }
      });

      
    $.each($('div.sub-bucket unequipped div.item-drag-container.item-type-Energy'), function(ind) {
        $(this).attr('id', 'slide-' + parseInt(ind + 1));
     });


//$("div-dfg").keydown(function(){
 //   console.log('pressed')
 //  })

//
document.querySelectorAll('._2--vS').forEach(function (item){
    item.addEventListener('click')
})


//------------------------------------------------
//document.getElementById('div-dfg').addEventListener('click',function(){
 //   console.log('btnComment worked')
//})
//--------------------------------------------    
 //   let weapon_image = document.querySelector('#div-dfg');
 //   weapon_image.onclick = console.log(weapon_image)
//--------------------------------------

   
*/




























