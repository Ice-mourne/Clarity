(() => {
    //--- weapon press event
    document.querySelector('#app').addEventListener('click', weapon_click_listener, {passive: true})
    function weapon_click_listener(event) {
        if(!event) return
        const target = event.path.find(element =>
            element.className == 'item' && element.id // weapon or armor
        )
        if (!target) return

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

    //--- add weapon info
    function update_weapon_in_inventory(unique_id) {
        const unique_item = clarity_user_data[unique_id],
              static_item = clarity_manifest[unique_item.id],
              rolled_perks = unique_item.sockets.perks.rolled || unique_item.sockets.perks.active.map(perk => [perk]),
              active_perks = unique_item.sockets.perks.active

        let wep_stats = new Wep_stats(unique_id)
        const stats = {
            perks: wep_stats.create_perk_list('active')
            .remove_perks(['mod', 'masterwork'])
            .calculate_stats()
            .subtracted_stats,

            all: {
                ...wep_stats.create_perk_list('active')
                .calculate_stats('normal')
                .round_stats('stats'),
                ...wep_stats.add_range_reload()
            },
            mod: wep_stats.remove_perks(['mod'])
            .calculate_stats()
            .subtract_stats()
            .subtracted_stats,

            masterwork: wep_stats.remove_perks(['masterwork'])
            .calculate_stats()
            .subtract_stats()
            .subtracted_stats,
        }

        let perk_box_data = weapon_templates.perk_box(rolled_perks, active_perks),
            perk_box_frag = fragment_creator(perk_box_data),
            weapon_stats_data = weapon_templates.weapon_stats(static_item, stats),
            weapon_stats_frag = fragment_creator(weapon_stats_data)

        let perk_location = local_storage('clarity_settings').class_names.locations.item_info.perks,
            stats_location = local_storage('clarity_settings').class_names.locations.item_info.stats,
            actual_perk_location = document.querySelector(`.item-popup ${stats_location}`)?.parentElement || document.querySelector('.item-popup .weapon_stats')

        async function check_element(dim_selector) {
            while (document.querySelector(dim_selector) == undefined) {
                await new Promise(resolve => requestAnimationFrame(resolve))
            }
            return
        }
        check_element(perk_location)
        .then(() => {
            document.querySelector(`.item-popup ${perk_location}`)?.replaceWith(perk_box_frag)
            actual_perk_location?.replaceWith(weapon_stats_frag)
        })
    }

    //--- weapon description press event
    document.querySelector('#app').addEventListener('click', perk_click_listener, {passive: true})
    function perk_click_listener(event) {
        const target = event.path.find(element =>
            element.attributes?.perk_id ||
            element.className == 'description'
        )
        if (!target) return

        const perk_list = target.parentElement,
              description = perk_list.firstElementChild,
              id = target.attributes.perk_id?.value

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

            if(cond.open && selected_active) return // if it had description (no longer dose) do nothing
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
}) ()






