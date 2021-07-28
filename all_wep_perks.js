function weapon_pressed(unique_item){
    let jd       = local_get('clarity_locations').extra_weapon_stats
    let manifest = local_get('clarity_inventory_item')
    let investment_stats = unique_item.manifest.stats.investment_stats
    unique_item.manifest.sockets.indexes.forEach(element => { // for each perk index usually 1,2,3,4 | 6,7 mod, masterwork | 0 frame
        let perk_id = unique_item.active_perks[element].plugHash
        if(manifest[perk_id] && manifest[perk_id].investment_stats && perk_id != 3511092054){ // exception for elemental capacitor
            manifest[perk_id].investment_stats.forEach(element => {
                if (investment_stats[element.statTypeHash] != undefined) investment_stats[element.statTypeHash] += element.value
            })
        }
    })
    let formula = unique_item.manifest.formulas
    if (formula){
        if (formula.a){
            let in_game_reload = stat_calculator(investment_stats[4188031367], unique_item.manifest.stats.stat_group[4188031367], 4188031367)
            let magazine       = stat_calculator(investment_stats[3871231066], unique_item.manifest.stats.stat_group[3871231066], 3871231066)
            let weapon_type    = unique_item.manifest.weapon_type
            let reload_time    = reload_calculator(in_game_reload, magazine, weapon_type, formula, unique_item.active_perks)
            add_new_stat(reload_time, 'Reload Time', 'Time it takes to reload weapon in seconds\nFormulas are made by Van Holden', 's')
        }
        if (formula.vpp){
            let in_game_range = stat_calculator(investment_stats[1240592695], unique_item.manifest.stats.stat_group[1240592695], 1240592695)
            let in_game_zoom  = stat_calculator(investment_stats[3555269338], unique_item.manifest.stats.stat_group[3555269338], 3555269338)
            let weapon_range  = range_calculator(in_game_range, in_game_zoom, formula, unique_item.active_perks)
            add_new_stat(weapon_range, 'DMG Fall-off ADS', 'Distance at which damage fall-off begin\nFormulas are made by Mmonx', 'm')
        }
    }
    function add_new_stat(stat_value, stat_name, stat_title, last_letter){
        create_element({'ele_type': 'div', 'stat_window': jd.wep_stats, 'class': jd.wep_stat_name_class,  'text': stat_name,  'title': stat_title})
        create_element({'ele_type': 'div', 'stat_window': jd.wep_stats, 'class': jd.wep_stat_value_class, 'text': stat_value                     })
        create_element({'ele_type': 'div', 'stat_window': jd.wep_stats,                                   'text': last_letter                    })
    }
    add_new_perks(unique_item, manifest, investment_stats, jd)
}
function add_new_perks(unique_item, manifest, investment_stats, jd) {
    let element_storage = document.createDocumentFragment()
    let perk_column = document.createElement('div')

    let perk_id_column = []
    if (unique_item.plugs && unique_item.plugs[1]) { // true then weapon has random perks
        for (let i = 1; i < 6; i++) {
            if(unique_item.plugs[i]) {
                let perk_id_list = []
                unique_item.plugs[i].forEach(element => {
                    if (manifest[element.plugItemHash].item_type == 'perk') {
                        perk_id_list.push(element.plugItemHash)
                    }
                })
                if(perk_id_list.length != 0) perk_id_column.push(perk_id_list)
            } 
        }
    } else {
        for (let i = 1; i <= 6; i++) {
            let perk_id_list = []
            if(unique_item.manifest.sockets[i] && unique_item.manifest.sockets[i].reusable_perk_list) {
                unique_item.manifest.sockets[i].reusable_perk_list.forEach(element => {
                    perk_id_list.push(element.perk_id)
                })
            } else if(unique_item.active_perks[i]) {
                let x = manifest[unique_item.active_perks[i].plugHash]
                if (x && x.item_type == 'perk') {
                    perk_id_list.push(unique_item.active_perks[i].plugHash)
                } 
            }
            if(perk_id_list.length != 0) perk_id_column.push(perk_id_list)
        }
    }
    perk_id_column.reverse()
    perk_id_column.forEach(column => {
        let perk_list = document.createElement('div')
        column.forEach(perk_id => {
            create_new_perk(perk_list, perk_id)
            fix_elemental_capacitor(investment_stats, unique_item, perk_id) // elemental capacitor fix
        })
        perk_column.appendChild(perk_list).className = 'wep_perk_list'
        
        let description_container = document.createElement('div')
        perk_list.appendChild(description_container).className = 'description_container'
        description_container.addEventListener('click', e => {e.currentTarget.textContent = ''; e.currentTarget.id = ''})
    })
    element_storage.appendChild(perk_column).className = 'wep_perk_main_container'
    let location = get_in_content('.item-details.sockets')
    location.appendChild(element_storage)

    function create_new_perk(perk_list, perk_id) {
        let perk = document.createElement('div')
        add_perk_details(perk_id, perk)
        let check = unique_item.active_perks.findIndex(x => x.plugHash == perk_id)
        perk.addEventListener('click', e => {add_wep_perk_description(e, investment_stats, manifest, unique_item)})
        perk.id = perk_id
        perk_list.appendChild(perk).className = (check != -1) ? 'wep_perk active_perk' : 'wep_perk'
    }
    function add_perk_details(perk_id, perk){
        let perk_info      = manifest[perk_id]
        let icon_container = document.createElement('div')
        let icon           = document.createElement('img')
        icon_container.appendChild(icon).src                 = `https://www.bungie.net/${perk_info.icon}`
        perk.          appendChild(icon_container).className = 'wep_perk_icon'

        let name_container       = document.createElement('div')
        name_container.className = 'perk_name'
        perk.appendChild(name_container).textContent = perk_info.name
    }
    test_function()
}
function add_wep_perk_description(event, investment_stats, manifest, unique_item){
    let target                = event.currentTarget
    let description_container = target.parentElement.lastChild
    let perk_id               = target.id
    let new_description       = (manifest[perk_id].description) ? manifest[perk_id].description.text : '' // manifest[perk_id].description.text
    if (description_container.id == perk_id) {
        description_container.textContent = ''
        description_container.id          = ''
    } else {
        description_container.innerHTML = DOMPurify.sanitize(new_description, {USE_PROFILES: {html: true}})
        description_container.id        = perk_id
        let perk_stats_div = document.createElement('div')
        get_perk_stat(perk_stats_div)
        description_container.appendChild(perk_stats_div).className = 'new_pd wep_perk_stats'
    }
    function get_perk_stat(perk_stats_div){
        if(manifest[perk_id].investment_stats) manifest[perk_id].investment_stats.forEach(element => {
            let active_perk_id = target.parentElement.getElementsByClassName('active_perk')[0].id
            let new_inv_stats = {}
            if(manifest[active_perk_id].investment_stats){
                manifest[active_perk_id].investment_stats.forEach(element => {
                    if (investment_stats[element.statTypeHash] != undefined) new_inv_stats[element.statTypeHash] = investment_stats[element.statTypeHash] - element.value
                })
            }
            if(manifest[perk_id].investment_stats && !target.classList.contains('active_perk')){
                manifest[perk_id].investment_stats.forEach(element => {
                    if (investment_stats[element.statTypeHash] != undefined && new_inv_stats[element]) new_inv_stats[element.statTypeHash] = new_inv_stats[element.statTypeHash] + element.value
                    if (investment_stats[element.statTypeHash] != undefined && !new_inv_stats[element]) new_inv_stats[element.statTypeHash] = investment_stats[element.statTypeHash] + element.value
                })
            }


            let perk_stat
            if (target.classList.contains('active_perk')) {
                let with_perk     = stat_calculator(investment_stats[element.statTypeHash], unique_item.manifest.stats.stat_group[element.statTypeHash], element.statTypeHash)
                let with_out_perk = stat_calculator(new_inv_stats   [element.statTypeHash], unique_item.manifest.stats.stat_group[element.statTypeHash], element.statTypeHash)
                    perk_stat     = Math.round(with_perk - with_out_perk)
            } else {
                let with_out_perk = stat_calculator(investment_stats[element.statTypeHash], unique_item.manifest.stats.stat_group[element.statTypeHash], element.statTypeHash)
                let with_perk     = stat_calculator(new_inv_stats   [element.statTypeHash], unique_item.manifest.stats.stat_group[element.statTypeHash], element.statTypeHash)
                    perk_stat     = Math.round(with_perk - with_out_perk)
            }


            let s = document.createElement('div')
            s.className = 'wep_stat_value'
            perk_stats_div.appendChild(s).textContent = (perk_stat < 0) ? perk_stat : `+${perk_stat}`

            let x = {
                1591432999: 'Accuracy', 1345609583: 'Aim Assistance', 925767036: 'Ammo Capacity', 3614673599: 'Blast Radius', 3022301683: 'Charge Rate', 2961396640: 'Charge Time', 447667954: 'Draw Time', 2762071195: 'Guard Efficiency', 3736848092: 'Guard Endurance', 209426660: 'Guard Resistance',
                943549884: 'Handling', 4043523819: 'Impact', 1931675084: 'Inventory Size', 3871231066: 'Magazine', 1240592695: 'Range', 2715839340: 'Recoil Direction', 4188031367: 'Reload Speed', 4284893193: 'Rounds Per Minute', 155624089: 'Stability', 2837207746: 'Swing Speed', 2523465841: 'Velocity', 3555269338: 'Zoom',
            }
            let n = document.createElement('div')
            n.className = 'wep_stat_name'
            perk_stats_div.appendChild(n).textContent = x[element.statTypeHash]
        })
    }
}
function test_function(){
    let x = {
        4684454:{
            'number':1
        },
        45384348:{
            'number':2
        },
        78542135:{
            'number':3
        },
        45658438:{
            'number':4
        }
    }
    let z = {
        4684454:{
            'number':1
        },
        45658438:{
            'number':4
        },
        45384348:{
            'number':2
        },
        78542135:{
            'number':3
        }

    }




    console.log(_.isEqual(x, z));



}

