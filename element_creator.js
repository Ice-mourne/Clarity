function create_element(p) {
    let e = document.createElement(p['ele_type']);
    if(p['text']) e.textContent = p['text'];
    if(p['id']) e.id = p['id'];
    if(p['class']) e.className = p['class'];
    if(p['css']) e.style.cssText = p['css'];
    if(p['href']) e.href = p['href'];
    if(p['src']) e.src = p['src'];
    if(p['img']) e.src = chrome.runtime.getURL(p['img']);
    if(p['type']) e.type = p['type'];
    switch (true) {
        case p['location'] != undefined:
            let location = document.querySelector(p['location']);
            location.appendChild(e);
            break;
        case p['stat_window'] != undefined:
            let stat_window = document.getElementById('content').nextSibling.querySelector(p['stat_window']);
            stat_window.appendChild(e);
            break;
        case p['sw_before_last'] != undefined:
            let last_hare = document.getElementById('content').nextSibling.querySelectorAll(p['sw_before_last']) // place to look
            let last_element = last_hare[last_hare.length - 1] // location of last 
            last_element.parentElement.insertBefore(e, last_element) // it will insert before last
            break;
    };
};
/*
params = {
    'ele_type': 'div',
    'text': 'some text',
    'id': 'id_i_guess',
    'class': 'class_name',
    'css': 'color: #548433;',
    'href': 'google.com',
    'src': 'link_or_something'
    'img': 'local location'
    'type': 'type i guess used for iframe'
    'location': '#some_id',
    'stat_window': '.in_stat_window'
    'sw_before_last': 'after this element'
};
create_element({'ele_type': '', 'text': '', 'id': '',  'class': '', 'css': '', 'href': '', 'src': '',  'location': '', 'stat_window': ''})
*/
