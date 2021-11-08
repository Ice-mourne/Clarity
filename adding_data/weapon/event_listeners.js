(() => {
    //--- weapon press event
    document.querySelector('#app').addEventListener('click', weapon_click_listener, {passive: true})
    function weapon_click_listener(event) {
        if(!event) return
        const target = event.path.find((element, index) =>
            element.className == 'item' && element.id || // weapon or armor
            index >= 4
        )
        let item_type = clarity_user_data[target.id]?.item_type
        if (item_type) {
            async function check_element(dim_selector) {
                while (document.querySelector(dim_selector) == undefined) {
                    await new Promise(resolve => requestAnimationFrame(resolve))
                }
                return
            }
            check_element('.item-popup .item-details')
            .then(() => {
                update_weapon_in_inventory(target.id)
            })
        }
    }

    //--- weapon description press event
    document.querySelector('#app').addEventListener('click', weapon_description_click_listener, {passive: true})
    function weapon_description_click_listener(event) {
        const target = event.path.find(element => element.attributes?.perk_id || element.attributes.class?.value == 'description')
        
        let perk_list = target.parentElement
        let description = perk_list.firstElementChild
        let id = target.attributes.perk_id?.value
        let item_info = add_stats(unique_id, 'selected')

        const cond = {
            active: target.classList.contains('active'),
            open: description.textContent != '',
            add_description: perk_list.parentElement.className == 'weapon_perk_box_new'
        }

        description.textContent = '' // remove description
        perk_list.querySelectorAll('.perk') // get all perks
        .forEach(p => p.classList.remove('selected', 'disable')) // reset class list

        if(!id) return // if id undefined that means user clicked on description

        if (cond.active) { // if pressed on active perk
            let selected_active = (perk_list.querySelector('.selected')) ? true : false

            if(cond.open && !selected_active) return // if it had description (no longer dose) do nothing
            if(cond.add_description) description.textContent = 'test text active'// .append(
            //     fragment_creator(
            //         update_perk_description(id * 1, item_info)
            //     ) || 'empty'
            // )
        } else {
            let selected = target.classList.contains('selected')
            if(cond.open && selected) return

            perk_list.querySelector('.active').classList.add('disable') // close active perk
            target.classList.add('selected') // open selected
            if(cond.add_description) description.textContent = 'test text selected' //.append(
            //     fragment_creator(
            //         update_perk_description(id * 1, item_info)
            //     ) || 'empty'
            // )
        }
    }















    document.querySelector('#app').addEventListener('mouseover', mouse_listener, {passive: true})
    function mouse_listener(event) {
        if(!event) return
        // const target = event.path.find(element =>
        //     element.id == 'app' ||
        //     element.className == 'icon_container' && element.parentElement.attributes.perk_id // weapon or armor
        // )
        // console.log(event.target)

        if(event.target.parentElement.attributes.perk_id) {

            const target = document.querySelector('#app')
            window.dispatchEvent(new CustomEvent('perk_hover'), {detail: target})
            return
        }
        // if(target.id == 'app') {
            window.dispatchEvent(new CustomEvent('mouse_out'))
        //     return
        // }
    }













}) ()