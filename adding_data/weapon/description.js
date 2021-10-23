window.addEventListener('weapon_pressed', e => add_weapon_perks(e.detail)) // add_weapon_perks(e.detail)
function add_weapon_perks(unique_id) {

    const unique_item = clarity_user_data[unique_id]
    const static_item = clarity_manifest[unique_item.id]

    const rolled_perks = unique_item.sockets.perks.rolled || unique_item.sockets.perks.active.map(perk => [perk])
    const active_perks = unique_item.sockets.perks.active


    // let all_perks = document.createElement('div')

    let perk_event_listener = event => { // add remove description on perk press
        const selected_perk = event.currentTarget,
              selected_perk_class_list = selected_perk.classList,
              perk_list = selected_perk.parentElement,
              description = perk_list.firstChild

        if (selected_perk_class_list.contains('Clarity_selected')) {
            description.textContent = ''
            selected_perk_class_list.remove('Clarity_selected')
            perk_list.querySelector('.Clarity_active').classList.remove('Clarity_disable')
        } else {
            perk_list.querySelectorAll('.Clarity_perk').forEach(p => p.classList.remove('Clarity_selected', 'Clarity_disable'))
            description.textContent = ''
            description.append(fragment_creator(clarity_manifest[selected_perk.id].description) || 'empty')
            if (!selected_perk_class_list.contains('Clarity_active')) {
                selected_perk_class_list.add('Clarity_selected')
                perk_list.querySelector('.Clarity_active').classList.add('Clarity_disable')
            } else {selected_perk_class_list.add('Clarity_selected')}
        }
    }
    let description_close_event_listener = event => { // remove description on description press
        event.currentTarget.textContent = ''
        event.currentTarget.parentElement.querySelectorAll('.Clarity_perk').forEach(p => p.classList.remove('Clarity_selected', 'Clarity_disable'))
    }

    let all_perks = rolled_perks.map(perk_list => {
        return {
            className: 'Clarity_perk_list',
            append: perk_list.map(perk => {
                return {
                    className: `Clarity_perk ${(active_perks.includes(perk)) ? 'Clarity_active' : ''}`,
                    id: perk,
                    event_listener: [
                        {type: 'click', fn: perk_event_listener}
                    ],
                    append: [
                        {
                            className: 'Clarity_icon_container',
                            append: [
                                {
                                    ele_type: 'img',
                                    src: `https://www.bungie.net/common/destiny2_content/icons/${clarity_manifest[perk].icon}`
                                }
                            ]
                        },
                        {
                            className: 'Clarity_perk_name',
                            textContent: clarity_manifest[perk].name
                        }
                    ]
                }
            })
        }
    })
    all_perks.forEach(perk_list => perk_list.append.unshift(
        {
            className: 'Clarity_description',
            event_listener: [
                {type: 'click', fn: description_close_event_listener}
            ],
        }
    ))
    let new_perks = fragment_creator(all_perks)

    let perk_location = local_storage('clarity_settings').class_names.locations.item_info.perks

    let clarity_main_box = document.createElement('div')
    clarity_main_box.className = 'Clarity_weapon_perks_box'
    clarity_main_box.append(new_perks)

    document.querySelector(perk_location).replaceWith(clarity_main_box)
}
