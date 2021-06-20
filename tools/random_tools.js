/**
 * Get element in stats window
 * Works as getElementByClassName if . or # is first letter works as querySelector
 * @param {string} className Class name
 * @returns {HTMLElement} A reference to the first object with the specified value
*/
function get_in_content(className) {
    let content = document.getElementById('content').nextSibling
    if(className[0] == '.' || className[0] == '#') return content.querySelector(className)
    return content.getElementsByClassName(className)[0]
}
/**
 * Get json object from local storage
 * @param {string} key 
 * @returns {JSON} JsonObject
 */
function local_get(key) {
    return JSON.parse(localStorage.getItem(key))
}
/**
 * Set json object to session storage
 * @param {string} key 
 * @param {JSON} value 
 */
function session_set_json(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
}