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
                if(perk_description) new_description.innerHTML = perk_description.text
                // handle description
            
                // handle stats
                if(target.getElementsByClassName('plug-stats')[0]){
                    let stats = target.getElementsByClassName('plug-stats')[0].cloneNode(true)
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
}


