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
    ** fragment_creator([
    **   {
    **       ele_type: 'string' || ele_ns: {ns: name space url, type: 'string'} || `don't include and it will default to div`,
    **       local_img: img location // used for browser extensions
    **       attribute name: 'string', // attribute name => for example div, id, img, style, ect...
    **       event_listener: [
    **          {type: 'string', fn: callback function}, // add as many as you want
    **       ],
    **       set_attribute: [
    **          {name: 'string', value: 'string'}, // add as many as you want
    **       ],
    **       append: [
    **          {
    **              // same as previously but everything hare will be appended to this element
    **          }
    **       ]
    **   }
    **   {
    **      // new object new element
    **      // values same as above
    **   }
    ** ])
*/
function fragment_creator(properties) {
    let fragment = document.createDocumentFragment()
    create_element(properties, fragment)
    function create_element(properties, fragment) {
        properties.forEach(obj => {
            // node_type is always specified internally
            let element
            if(obj.ele_type) {
                element = document.createElement(obj.ele_type)
            } else if(obj.ele_ns) {
                element = document.createElementNS(obj.ele_ns.ns, obj.ele_ns.type)
            } else {
                element = document.createElement('div')
            }

            if(obj.local_img) element.src = chrome.runtime.getURL(obj.local_img)

            let {ele_type, ele_ns_type, local_img, ...clean_obj} = obj // deleting to avoid pointlessly trying to add them

            Object.entries(clean_obj).forEach(([property, value]) => {
                if(property == 'event_listener') value.forEach(obj => element.addEventListener(obj.type, obj.fn))
                if(property == 'set_attribute')  value.forEach(obj => element.setAttribute(obj.name, obj.value))
                if(property == 'append') create_element(value, element)

                // property is always specified internally
                element[property] = value
            })
            fragment.append(element)
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

function element_creator_desc(type, properties) {
    let element = document.createElement(type)
    Object.entries(properties).forEach(property => {
        if(property[1]) element[property[0]] = property[1]
    })
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