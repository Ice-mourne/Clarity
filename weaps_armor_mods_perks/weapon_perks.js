function rework_weapon_perks() {
    get_in_content('item-details').querySelectorAll('.ItemPerksList-m_socket-3UNFZ').forEach(element => {
        let description_container = document.createElement('div')
        let before = element.getElementsByClassName('ItemPerksList-m_plug-O8be3')[0]
        element.insertBefore(description_container, before).className = 'perk_description'
        element.className += ' perk_container'
    })
    // adds event listeners to new descriptions and perk name / image
    get_in_content('ItemPerksList-m_sockets-1BlL6').querySelectorAll('.perk_description').          forEach(e => {e.addEventListener('click', click_new_perk)})
    get_in_content('ItemPerksList-m_sockets-1BlL6').querySelectorAll('.ItemPerksList-m_plug-O8be3').forEach(e => {e.addEventListener('click', click_DIM_perk, {once: true})})
    let pause_event = true
    function click_new_perk(event) { // closes open perk in DIM and removes text from new description then cicked on new description
        pause_event = false
        let o = event.currentTarget.parentElement.querySelector('.ItemPerksList-m_selected-1ZTN0 > .ItemPerksList-m_perkInfo-2opoU > div')
        if (o) o.click()
        event.currentTarget.textContent = ''
    }
    function click_DIM_perk(event){
        let target = event.currentTarget
        setTimeout(() => {
            if (pause_event) {
                let x = target.querySelector('.ItemPerksList-m_perkInfo-2opoU > div')
                if (!x) target.click()
                let new_description = document.createElement('div')
                // handle description
                let p = target.querySelector('.ItemPerksList-m_perkInfo-2opoU > h2')
                let perk_name = (p) ? p.textContent : ''
                let perk_description = local_get('clarity_weapon_perks')[perk_name]
                let final_description = add_meningfull_numbers(perk_description)
                if(perk_description) new_description.innerHTML = final_description
                // handle description
            
                // handle stats
                if(target.getElementsByClassName('plug-stats')[0]){
                    let stats = target.getElementsByClassName('plug-stats')[0].cloneNode(true)
                    let range_stat
                    let reload_stat
                    let check = 0
                    for (let i = 0; i < stats.childNodes.length; i++) {
                        const element = stats.childNodes[i].textContent
                        if ((element == 'Range' || element == 'Zoom') && check == 0) {
                            let final_range = range_plug(stats)
                            if (final_range != 'NaNm') { // checks if final_range is vaid value
                                range_stat = document.createElement('div')
                                stat_value = document.createElement('div')
                                stat_name = document.createElement('div')
                                range_stat.appendChild(stat_value).textContent = final_range
                                range_stat.appendChild(stat_name).textContent = 'Fall_off distance'
                            }
                            check += 1
                        }
                        if (element == 'Reload Speed') {
                            let reload = stats.childNodes[i - 1].textContent.replace('+', '') * 1
                            reload_stat = document.createElement('div')
                            stat_value = document.createElement('div')
                            stat_name = document.createElement('div')
                            reload_stat.appendChild(stat_value).textContent = reload_plug(reload)
                            reload_stat.appendChild(stat_name).textContent = 'Reload time'
                        }
                    }
                    if(range_stat) new_description.appendChild(range_stat).className = 'plug-stats'
                    if(reload_stat) new_description.appendChild(reload_stat).className = 'plug-stats'
                    new_description.appendChild(stats).className = 'plug-stats'
                }
                // handle stats

                if (target.parentElement.firstChild.textContent == '') {
                    target.parentElement.firstChild.appendChild(new_description)
                } else if (new_description.isEqualNode(target.parentElement.firstChild.firstChild)){
                    target.parentElement.firstChild.textContent = ''
                    target.click()
                } else {
                    target.parentElement.firstChild.textContent = ''
                    target.parentElement.firstChild.appendChild(new_description)
                }
            }
            pause_event = true
            target.addEventListener('click', click_DIM_perk, {once: true})
        },1)
    }
    let w_f_numbers = JSON.parse(sessionStorage.getItem('w_f_numbers'))
    function add_meningfull_numbers(data){
        let updated = (data) ? data.text : ""
        if (data && data.reload_stat) {
            let old_stat = sessionStorage.getItem('reload_stat') * 1
            let time =     sessionStorage.getItem('reload_time') * 1
            for (let i = 0; i < data.reload_stat.length; i++) {
                let multi = data.reload_multi[i]
                let stat =  data.reload_stat[i]
                let reload_stat = min_max(stat + old_stat)
                let reload_time = ((w_f_numbers.a * reload_stat * reload_stat + w_f_numbers.b * reload_stat + w_f_numbers.c) * multi)

                updated = updated.replace(`relo_t_${i}`, `${reload_time.toFixed(2)}s`)
                updated = updated.replace(`relo_r_${i}`, `${(reload_time - time).toFixed(2)}s`)
            }
        }
        if (data && data.range_stat) {
            let old_stat = sessionStorage.getItem('range_stat') * 1
            let metters =  sessionStorage.getItem('weapon_range') * 1
            let old_zoom = sessionStorage.getItem('zoom') * 1
            for (let i = 0; i < data.range_stat.length; i++) {
                let zoom_mult = data.zoom_mult[i]
                let new_zoom = data.zoom[i] + old_zoom
                let stat =  data.range_stat[i]
                let range_stat = min_max(stat + old_stat)
                let range_metters = (range_stat * w_f_numbers.vpp + w_f_numbers.base_range) * new_zoom * zoom_mult

                let final_range = (range_metters - metters > 0) ? `+${(range_metters - metters).toFixed(2)}` : (range_metters - metters).toFixed(2)
                updated = updated.replace(`range_${i}`, `${final_range}m`)
                if(final_range == 'NaN') updated = data.text_fallback
            }
        }
        function min_max(stat) {
            return Math.min(Math.max(stat, 10),100)
        }
        return updated
    }
    function range_plug(stats) {
        let range = sessionStorage.getItem('range_stat') * 1
        let zoom = sessionStorage.getItem('zoom') * 1
        for (let i = 0; i < stats.childNodes.length; i++) {
            const element = stats.childNodes[i].textContent
            if (element == 'Range') range -= stats.childNodes[i - 1].textContent.replace('+', '') * 1 // range value
            if (element == 'Zoom')  zoom  -= stats.childNodes[i - 1].textContent.replace('+', '') / 10 // converted zoom value
        }
        let metters =  sessionStorage.getItem('weapon_range') * 1
        let new_range = (range * w_f_numbers.vpp + w_f_numbers.base_range) * zoom
        return (metters - new_range) > 0 ? `+${(metters - new_range).toFixed(2)}m` : `${(metters - new_range).toFixed(2)}m`
    }
    function reload_plug(perk_reload) {
        let stat = sessionStorage.getItem('reload_stat') * 1 - perk_reload
        let time =  sessionStorage.getItem('reload_time') * 1

        let reload_time = (w_f_numbers.a * stat * stat + w_f_numbers.b * stat + w_f_numbers.c)
        return (time - reload_time) > 0 ? `+${(time - reload_time).toFixed(2)}s` : `${(time - reload_time).toFixed(2)}s`
    }
}