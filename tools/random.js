async function fetch_database(file) {
    return new Promise((resolve, reject) => {
        fetch(`https://ice-mourne.github.io/Database-for-Clarity/Database/${file}.json?${Math.random()}`)
        .then(resp => resp.json())
        .then(resp => resolve(resp))
        .catch(err => console.error(`%c ${file} Download from database failed`, 'font-size: large;', err))
    })
}

/**
    ** Creates HTML fragment
    * @param {array} properties Array of objects with properties
    * @returns {HTMLElement} HTML Fragment containing HTML Elements
*/
function fragment_creator(properties) {
    let fragment = document.createDocumentFragment()
    create_element(properties, fragment)
    function create_element(properties, fragment) {
        properties.forEach(obj => {
            let element = document.createElement(obj.type)
            Object.entries(obj).forEach(property => {
                if(property[0] == 'local_img') element.src = chrome.runtime.getURL(property[1])
                if(property[0] == 'event_listener') element.addEventListener(property[1])
                if(property[0] == 'append') create_element(property[1], element)
                if(property[0] == 'type' || property[0] == 'append' || property[0] == 'event_listener') return
                element[property[0]] = property[1]
            })
            fragment.appendChild(element)
        })
    }
    return fragment
}


;( () => { //--- create settings on first launch or incase local storage was cleared
    const current_settings = local_storage('clarity_settings')
    if (current_settings && current_settings.settings_version != 1) return
    let settings = {
        'dark_mode': false,
        'dark_mode_colors': {
            'background_color_1': 'hsl(240, 21%, 16%)',
            'background_color_2': 'hsl(240, 30%, 4%)',
            'masterwork_item': 'hsl(50, 90%, 65%)',
            'masterwork_item_text': 'hsl(0, 0%, 0%)'
        },
        'settings_version': 2,
    }
    local_storage('clarity_settings', settings)
}) ()

//--- Delete stuff bellow ----------------------------------------------------------------------------------------------

/** //! clarity menu is still using this
** Creates HTML element
** Example ('div', {'className': myClassName, 'textContent': 'some text'},)
* @param {string} type - HTML object (div, span, a, img)
*
* @param {object} properties - HTML attributes: value ({ClassName: myClass, textContent: text})
* @param {object} extra - description
* @returns {HTMLElement}
*/
function element_creator(type, properties, extra) {
    let element = document.createElement(type)
    Object.entries(properties).forEach(property => {
        element[property[0]] = property[1]
    })
    if(extra?.img) element.src = chrome.runtime.getURL(extra.img)
    return element
}

/**
    ** Calculates weapon ready & stow speed
    * @param {number} stat Calculated weapon handling stat
    * @param {object} formula Numbers used in formula for weapon
    * @param {number} multiplayer  Multiplayer present on Threatdetector and some other things
    * @returns {object} In game weapon stow ready time in seconds
*/
function handling_calculator(stat, formula, multiplayer) {
    formula = formula.handling
    stat = Math.min(Math.max(stat, 10), 100)
    multiplayer = (multiplayer) ? multiplayer : 1

    let stow_numbers  = formula.handling.stow
    let ready_numbers = formula.handling.ready
    return {
        "stow":  (stow_numbers.vpp  * stat + stow_numbers.number)  * multiplayer,
        "ready": (ready_numbers.vpp * stat + ready_numbers.number) * multiplayer,
    }
}