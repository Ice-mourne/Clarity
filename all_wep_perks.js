
// let jd       = /*local_get('clarity_dim_div_locations').all_wep_perks*/ '.ItemPopupHeader-m_title-2hFLg > a'
// //let wep_id   = get_in_content(jd).href.replace('https://destinytracker.com/destiny-2/db/items/', '').replace('?perks=', ',').split(',')[0]
// //let weapon   = local_get('clarity_weapon_info'    )[wep_id]
// let perks    = local_get('clarity_perk_mod_info'  )
// let formulas = local_get('clarity_weapon_formulas')


// // e95057f2035b410aa6163fd31511f2b1
// // 81F1DA78-60B0-4D60-B60C-83C20FF814EB
// // 2b16c291fcff48cbac86bd5f1d0bbc9d

// let super_duper_secret_code = '2b16c291fcff48cbac86bd5f1d0bbc9d'
// //let inv_item_url = 'https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/31057037'
// let inv_item_url = 'https://www.bungie.net/Platform/Destiny2/3/Profile/4611686018489069826/?components=102'

// let inv_item_json

function log_item(item){
    let identifier_id = (item.parentElement) ? item.parentElement.id : (item.parentElement.parentElement) ? item.parentElement.parentElement.id : ''
    let membership_type = 3
    let membership_id = /*local_get('dim-last-membership-id') for some reason its incorrect key*/ '4611686018489069826'
    let accessToken = 'Bearer ' + local_get('authorization').accessToken.value
    let url = `https://www.bungie.net/Platform/Destiny2/${membership_type}/Profile/${membership_id}/?components=102,201,205,310`


    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-API-Key': super_duper_secret_code,
            'Authorization': accessToken,
            //'Content-Type': 'application/json',
            //referrer: "about:client",
            //referrerPolicy: "",

        },
        //credentials: "include",
        //redirect: "follow",
        

    })
    .then(u => u.json())
    .then(json => {
        inv_item_json = json
        tratata()
    })

    function tratata(){ 
        //console.log('done');
        get_data()
        //console.log(inv_item_json)
    }
}


function get_data() {
    //console.time('timer')
    let perks = inv_item_json.Response.itemComponents.reusablePlugs.data
    let items = {}
    // get instanced item id in vault and add item id and item perks
    for (let i = 0; i < inv_item_json.Response.profileInventory.data.items.length; i++) {
        const element = inv_item_json.Response.profileInventory.data.items[i]
        if (element.itemInstanceId) {
            let stats = perks[element.itemInstanceId]
            items[element.itemInstanceId] = [element.itemHash, stats]
        }
    }
    // get instanced item id in inventory and add item id and item perks
    let characters = Object.entries(inv_item_json.Response.characterInventories.data)
    for (let i = 0; i < characters.length; i++) {
        for (let y = 0; y < characters[i][1].items.length; y++) {
            const element = characters[i][1].items[y]
            if (element.itemInstanceId) {
                let stats = perks[element.itemInstanceId]
                items[element.itemInstanceId] = [element.itemHash, stats]
            }
        }
    }

    // add perks to instanced item id
    session_set_json('instance_id-item_info', items)
    //console.timeEnd('timer')
}