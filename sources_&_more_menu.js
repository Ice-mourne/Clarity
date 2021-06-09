//  (っ◔◡◔)っ 
function info_button_observer(){
    let jd = JSON.parse(localStorage.getItem('clarity_dim_div_locations')).sources_and_more_menu
    let observer = new MutationObserver((_o, quit) => {
        let header = document.querySelector(`.${jd.header_button} > a:nth-child(1)`)
        if (header){
            info_button(jd)
            quit.disconnect()
        }
    })
    observer.observe(document, {
        childList: true,
        subtree: true
    })
}
function info_button(jd){
    create_element({'ele_type':'div', 'text':'Sources & More',  'id':'infoButton', 'class':jd.button_class, 'loc_before':`.${jd.header_button} > a:nth-child(1)`}) // create button 'Sources & More'
    create_element({'ele_type':'div', 'location':'#infoButton', 'id':'new_menu',   'css':'display: none;'})

    create_element({'ele_type':'div', 'location':'#new_menu',        'class':'menu_top_text_1'})
    create_element({'ele_type':'p',   'location':'.menu_top_text_1', 'class':'important_information', 'text':`Extension is created and maintained by Icemourne\nTo report bugs and ask for new features\nDM on discord Icemourne#8622 or join Massive Breakdown`})
    create_element({'ele_type':'div', 'location':'#new_menu', 'class':'menu_top_text_2', 'text':'Links to Sources used creating this extension'})

    create_element({'ele_type':'img', 'location':'#new_menu', 'class':'menu_img',        'img': 'images/spreadsheet.png'})
    create_element({'ele_type':'a',   'location':'#new_menu', 'class':'menu_link',       'text':'Mods, Abilities, and More by Pip1n',                   'target':'_blank', 'href':'https://docs.google.com/spreadsheets/d/1WaxvbLx7UoSZaBqdFr1u32F2uWVLo-CJunJB4nlGUE4/'})
    create_element({'ele_type':'img', 'location':'#new_menu', 'class':'menu_img',        'img': 'images/spreadsheet.png'})
    create_element({'ele_type':'a',   'location':'#new_menu', 'class':'menu_link',       'text':'Damage Buffs, Debuffs, and Modifiers by Court',        'target':'_blank', 'href':'https://docs.google.com/spreadsheets/d/1i1KUwgVkd8qhwYj481gkV9sZNJQCE-C3Q-dpQutPCi4/'})
    create_element({'ele_type':'img', 'location':'#new_menu', 'class':'menu_img',        'img': 'images/spreadsheet.png'})
    create_element({'ele_type':'a',   'location':'#new_menu', 'class':'menu_link',       'text':'Reload Speed started by Van Holden updated by Sereni', 'target':'_blank', 'href':'https://docs.google.com/spreadsheets/d/13heG_rKRB9UU5DpvRbl1q11WGFs8QPPzpFA60uIOT8w/'})
    create_element({'ele_type':'img', 'location':'#new_menu', 'class':'menu_img',        'img': 'images/range_calc.png'})
    create_element({'ele_type':'a',   'location':'#new_menu', 'class':'menu_link',       'text':'Weapon Range Calculator by Mmonx',                     'target':'_blank', 'href':'https://destinyindepth.com/range_calculator/'})

    create_element({'ele_type':'div', 'location':'#new_menu', 'class':'menu_top_text_3', 'text': 'Other useful links'})

    create_element({'ele_type':'img', 'location':'#new_menu', 'class':'menu_img',  'img': 'images/gunsmith.png'})
    create_element({'ele_type':'a',   'location':'#new_menu', 'class':'menu_link', 'text':'D2 Gunsmith by dre',                'target':'_blank', 'href':'https://d2gunsmith.com/'})
    create_element({'ele_type':'img', 'location':'#new_menu', 'class':'menu_img',  'img': 'images/spreadsheet.png'})
    create_element({'ele_type':'a',   'location':'#new_menu', 'class':'menu_link', 'text':'Weapon Stats & TTK by Mercules904', 'target':'_blank', 'href':'https://docs.google.com/spreadsheets/d/1_6zsM7kzvg0aUT8YtM_-Wg_5K1gKDOlrwfVzutEjq-s/'})
    create_element({'ele_type':'img', 'location':'#new_menu', 'class':'menu_img',  'img': 'images/spreadsheet.png'})
    create_element({'ele_type':'a',   'location':'#new_menu', 'class':'menu_link', 'text':'Weapon DPS by SkyWarrior',          'target':'_blank', 'href':'https://docs.google.com/spreadsheets/d/12vF7ckMzN4hex-Tse4HPiVs_d9huFOKlvUoq5V41nxU/'})

    create_element({'ele_type':'div', 'location':'#new_menu', 'class':'menu_top_text_4', 'text':'Settings'})

    let dark_mode = (localStorage.getItem('dark_mode') == 'on') ? 'Disable' : 'Enable'
    create_element({'ele_type':'div', 'location':'#new_menu', 'class':'dark_mode_button', 'id':'darker_mode_toggle', 'text':`${dark_mode} Dark Mode`})
}
create_element({'ele_type':'style', 'location':'html', 'id':'dark_mode'})
function enable_dark_mode(){
    let jd = JSON.parse(localStorage.getItem('clarity_dim_div_locations')).sources_and_more_menu
    document.getElementById('dark_mode').textContent = `
        ${jd.dark_mode_line_1} {background: radial-gradient(circle at 50% 70px, #202031 0%, #07070d 100%);}
        ${jd.dark_mode_line_2} {background: radial-gradient(circle at 50% 70px, #202031 0%, #07070d 100%); background-position: center top; background-repeat: no-repeat; background-size: 100vw 100vh;}
        ${jd.dark_mode_line_3} {background-color: #0000; color: #dddddd;}
        ${jd.dark_mode_line_4} {border: 1px solid #202031;}
        ${jd.dark_mode_line_5} {border-color: transparent;}
        ${jd.dark_mode_line_6} {color: #1379b4;}
        ${jd.dark_mode_line_7} {background-color: #ffffff00;}
        `
}
function run_dark_mode(){
    if(localStorage.getItem('dark_mode') == 'on'){
        enable_dark_mode()
    }
}
function header_button(event){
    //  🡳 🡳  - - - - - - - - - Info button open / close
    let new_menu = document.getElementById('new_menu')
    let button_pressed = event.target == document.getElementById('infoButton')
    let window_open = new_menu.style.display == 'none'
    let black_list = event.target.id != 'darker_mode_toggle' && event.target.id != 'new_menu' && event.target.className != 'menu_img'
    if(button_pressed && window_open){
        new_menu.style.display = 'grid'
    } else if(black_list){
        new_menu.style.display = 'none'
    }
    //  🡱 🡱  - - - - - - - - - Info button open / close

    //  🡳 🡳  - - - - - - - - - Dark mode on / off
    if(event.target.id == 'darker_mode_toggle'){
        let darker_mode_toggle = document.getElementById('darker_mode_toggle') // dark mode button
        if(event.target.textContent == 'Enable Dark Mode'){
            enable_dark_mode()
            darker_mode_toggle.textContent = 'Disable Dark Mode'
            localStorage.setItem('dark_mode', 'on')
        }else{
            document.getElementById('dark_mode').textContent = 'empty'
            darker_mode_toggle.textContent = 'Enable Dark Mode'
            localStorage.setItem('dark_mode', 'off')
        }
    }
    //  🡱 🡱  - - - - - - - - - Dark mode on / off
}