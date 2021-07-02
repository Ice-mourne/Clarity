function _weapon_pressed(unique_item){
    let jd          = local_get('clarity_locations').extra_weapon_stats
    let manifest    = local_get('clarity_inventory_item')
    let range_stat  = (unique_item.stats[1240592695]) ? unique_item.stats[1240592695].value : undefined
    let reload_stat = (unique_item.stats[4188031367]) ? unique_item.stats[4188031367].value : undefined
    let zoom        = unique_item.manifest.stats.base_stats[3555269338]
    let zoom_multi  = 1
    for (let i = 0; i < unique_item.active_perks.length; i++) { // find perks with zoom and add to zoom value // also look for zoom multiplayer perks
        const element  = unique_item.active_perks[i].plugHash
            zoom_multi = (element == 2846385770 || element == 1140096971) ? 1.1 : 1
        let perk_stats = (manifest[element] && manifest[element].investment_stats) ? manifest[element].investment_stats : 0
        for (let y = 0; y < perk_stats.length; y++) {
            const ele = perk_stats[y]
            if (!ele.isConditionallyActive && ele.statTypeHash == 3555269338) zoom += ele.value
        }
    }
    let formulas = unique_item.manifest.formulas
    if (formulas){
        if (formulas.a){
            let reload_time = (formulas.a * reload_stat * reload_stat + formulas.b * reload_stat + formulas.c).toFixed(2)
            add_new_stat(reload_time, 'Reload Time', 'Time it takes to reload weapon in seconds\nFormulas are made by Van Holden', 's')
        }
        if (formulas.vpp){
            let new_zoom = (zoom - formulas.zoom_tier) / 10 + formulas.zrm
            let weapon_range = ((range_stat * formulas.vpp + formulas.base_range) * new_zoom * zoom_multi).toFixed(2) // formula for range
            add_new_stat(weapon_range, 'DMG Fall-off ADS', 'Distance at which damage fall-off begin\nFormulas are made by Mmonx', 'm')
        }
    }
    function add_new_stat(stat_value, stat_name, stat_title, last_letter){
        create_element({'ele_type': 'div', 'stat_window': jd.wep_stats, 'class': jd.wep_stat_name_class,  'text': stat_name,  'title': stat_title})
        create_element({'ele_type': 'div', 'stat_window': jd.wep_stats, 'class': jd.wep_stat_value_class, 'text': stat_value                     })
        create_element({'ele_type': 'div', 'stat_window': jd.wep_stats,                                   'text': last_letter                    })
    }
    add_new_perks(unique_item, manifest)
}
function weapon_pressed(unique_item){
    let jd          = local_get('clarity_locations').extra_weapon_stats
    let manifest    = local_get('clarity_inventory_item')
    let investment_stats = unique_item.manifest.stats.investment_stats
    unique_item.manifest.sockets.indexes.forEach(element => { // for each perk index usually 1,2,3,4 and 6,7 mod, masterwork
        let perk_id = unique_item.active_perks[element].plugHash
        if(manifest[perk_id] && manifest[perk_id].investment_stats) manifest[perk_id].investment_stats.forEach(element => { // if perk with id x has inv stats then add inv stat 
            if (!element.isConditionallyActive && investment_stats[element.statTypeHash]) investment_stats[element.statTypeHash] += element.value
        })
    })
    Object.entries(investment_stats).forEach(element => {
        _stat_calculator(element[0], element[1], unique_item)
    })


    function stat_calculator(id, value, unique_item){
        let stat_group = unique_item.manifest.stats.stat_group[id]
        if (stat_group){
            let new_value = Math.min(Math.max(value,0.1),99.9)
            let end = stat_group.find(x => x.value >= new_value)
            let start = stat_group.reverse().find(x => x.value <= new_value)
            if(stat_group.length == 1) end = start = {'value': stat_group[0].value, 'weight': stat_group[0].weight}
            console.log(id, value);
            console.log(start);
            console.log(end);




            let t = (value - start.value) / (end.value - start.value)
            let gameValue = start.weight + t * (end.weight - start.weight)
            console.log(gameValue)
        }
    }
    function _stat_calculator(){
        let stat_group = []
        let value = 5

        let new_value = Math.min(Math.max(value,0.1),99.9)
        let end = stat_group.find(x => x.value >= new_value)
        let start = stat_group.reverse().find(x => x.value <= new_value)


        console.log(`start: ${start}`);
        console.log(`end: ${end}`);
    }
    











}