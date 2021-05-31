function allow_drag(){
    drag_gun_Element(document.getElementById("gunsmith"))
    function drag_gun_Element(elmnt){
        var max_height = window.innerHeight
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
        if (document.getElementById(elmnt.id + "_text")){
            document.getElementById(elmnt.id + "_text").onmousedown = dragMouseDown
        } else{
            elmnt.onmousedown = dragMouseDown
        }
        function dragMouseDown(e){
            e = e || window.event
            e.preventDefault()
            pos3 = e.clientX
            pos4 = e.clientY
            document.onmouseup = closeDragElement
            document.onmousemove = elementDrag
        }
        function elementDrag(e){
            setTimeout(() => {
                e = e || window.event
                e.preventDefault()
                pos1 = pos3 - e.clientX
                pos2 = pos4 - e.clientY
                pos3 = e.clientX
                pos4 = e.clientY
                if ((elmnt.offsetTop - pos2) >= 0 && (elmnt.offsetTop - pos2) <= max_height * 0.90) {
                    elmnt.style.top = (elmnt.offsetTop - pos2) + "px"
                }
                if ((elmnt.offsetLeft - pos1) >= -300) {
                    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px"
                }
            }, 1)
        }
        function closeDragElement(){
            document.onmouseup = null
            document.onmousemove = null
        }
    }
}
function gunsmit_button(){
    let json_divs = JSON.parse(localStorage.getItem('clarity_dim_div_locations')).d2_gunsmith
    let stat_window = document.getElementById(json_divs.stat_window).nextSibling
    if(!document.getElementById('gunsmith_button')){
        create_element({'ele_type': 'div', 'sw_before_last': json_divs.location, 'id': 'gunsmith_button',      'class': json_divs.class    })
        create_element({'ele_type': 'img', 'location': '#gunsmith_button',                                     'img': 'images/gunsmith.png'})
        create_element({'ele_type': 'span','location': '#gunsmith_button',       'id': 'gunsmith_button_text', 'text': 'D2 Gunsmith'       })
    }
    if (!get_in_content(json_divs.buton_text_hide)){
        document.getElementById('gunsmith_button_text').style.cssText = 'display: none;'
    }
    stat_window.getElementsByClassName(json_divs.click_event)[0].addEventListener('click', _e => {
        if (!get_in_content(json_divs.buton_text_hide)){
            document.getElementById('gunsmith_button_text').style.cssText = 'display: none;'
        } else {
            document.getElementById('gunsmith_button_text').style.cssText = 'display: unset;'
        }
    })
    document.getElementById('gunsmith_button').addEventListener('click', _e => {
        if (!document.getElementById('gunsmith')){
            open_gunsmith()
        } else {
            document.getElementById('gunsmith').remove()
        }
    })
}
function open_gunsmith(){
    let json_divs = local_get('clarity_dim_div_locations').d2_gunsmith
    let wep_ids = get_in_content(json_divs.link).href.replace('https://destinytracker.com/destiny-2/db/items/', '').replace('?perks=', ',').replace('4248210736', '0').split(',')
    let wep_link = `https://d2gunsmith.com/w/${wep_ids[0]}?s=${wep_ids[2]},${wep_ids[3]},${wep_ids[4]},${wep_ids[5]},0,0`
    create_element({'ele_type': 'div',    'id': 'gunsmith',             'location': '.store-cell'                                                                    }) // main window to strore everithing
    create_element({'ele_type': 'div',    'id': 'gunsmith_header',      'location': '#gunsmith'                                                                      }) // header
    create_element({'ele_type': 'div',    'id': 'gunsmith_header_text', 'location': '#gunsmith_header', 'text': 'D2 Gunsmith'                                        }) // text in header header
    create_element({'ele_type': 'img',    'id': 'gunsmith_close',       'location': '#gunsmith_header', 'img': 'images/gunsmith_close.png'                           }) // image close button
    create_element({'ele_type': 'iframe', 'id': 'gunsmith_iframe',      'location': '#gunsmith',        'src': wep_link ,                  'type': 'text/html'       }) // D2 Gunsmith page
    document.getElementById('gunsmith_close').addEventListener('click', _e => {
        document.getElementById('gunsmith').remove()
    })
    allow_drag() 
}