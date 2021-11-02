window.addEventListener('weapon_pressed', e => add_weapon_perks(e.detail)) // add_weapon_perks(e.detail)
function add_weapon_perks(unique_id) {
    console.time('speed test 9000')
    let perk_location = local_storage('clarity_settings').class_names.locations.item_info.perks
    document.querySelector(perk_location).style.cssText = 'display: none;'

    add_stats(unique_id, 'active')

    const unique_item = clarity_user_data[unique_id]
    const static_item = clarity_manifest[unique_item.id]

    const rolled_perks = unique_item.sockets.perks.rolled || unique_item.sockets.perks.active.map(perk => [perk])
    const active_perks = unique_item.sockets.perks.active


    // let all_perks = document.createElement('div')

    let perk_event_listener = event => { // add remove description on perk press
        const selected_perk = event.currentTarget,
              selected_perk_class_list = selected_perk.classList,
              perk_list = selected_perk.parentElement,
              description = perk_list.firstChild,
              item_info = add_stats(unique_id, 'selected')

        if (selected_perk_class_list.contains('Clarity_selected')) {
            description.textContent = ''
            selected_perk_class_list.remove('Clarity_selected')
            perk_list.querySelector('.Clarity_active').classList.remove('Clarity_disable')
        } else {
            perk_list.querySelectorAll('.Clarity_perk').forEach(p => p.classList.remove('Clarity_selected', 'Clarity_disable'))
            if (!selected_perk_class_list.contains('Clarity_active')) {
                selected_perk_class_list.add('Clarity_selected')
                perk_list.querySelector('.Clarity_active').classList.add('Clarity_disable')
            } else {selected_perk_class_list.add('Clarity_selected')}

            description.textContent = ''
            description.append(
                fragment_creator(
                    update_perk_description(selected_perk.id, item_info)
                ) || 'empty'
            )
        }
        add_stats(unique_id, 'selected')
    }
    let description_close_event_listener = event => { // remove description on description press
        event.currentTarget.textContent = ''
        event.currentTarget.parentElement.querySelectorAll('.Clarity_perk').forEach(p => p.classList.remove('Clarity_selected', 'Clarity_disable'))
        add_stats(unique_id, 'selected')
    }

    function update_perk_description(id, wep_stats) {
        const perk = clarity_manifest[id]
        let description = JSON.stringify(perk.description)

        if(perk.stats.reload?.conditional || perk.stats.range?.conditional || perk.stats.handling?.conditional) { // return clarity_manifest[id].description
            if(perk.stats.range) {
                let stat = perk.stats.range.conditional.stat
                let multi = perk.stats.range.conditional.multiplier
                let length = (stat.length > multi.length) ? stat : multi

                for (let i = 0; i < length.length; i++) {
                    description = description.replace(
                        `{rang_${i}}`,
                        range_calculator(static_item, wep_stats.stats, wep_stats.all_perk_ids, stat[i], multi[i]).ADS_min// - item_info.range_reload.range
                    )
                }
            }

            if(perk.stats.reload) {
                let stat = perk.stats.reload.conditional.stat
                let multi = perk.stats.reload.conditional.multiplier
                let length = (stat.length > multi.length) ? stat : multi

                for (let i = 0; i < length.length; i++) {
                    description = description.replace(
                        `{relo_${i}}`,
                        reload_calculator(static_item, wep_stats.stats, wep_stats.all_perk_ids, stat[i], multi[i]).default
                    )
                }
            }

            if(perk.stats.handling) {
                let stat = perk.stats.handling.conditional.stat
                let multi = perk.stats.handling.conditional.multiplier
                let length = (stat.length > multi.length) ? stat : multi

                for (let i = 0; i < length.length; i++) {
                    let stats = handling_calculator(static_item, wep_stats.stats, stat[i], multi[i])
                    description = description.replace(
                        `{hand_s_${i}}`,
                        stats.stow
                    )
                    description = description.replace(
                        `{hand_r_${i}}`,
                        stats.ready
                    )
                }
            }
        }
        if(Object.keys(perk.investment).length) {
            let perk_stats = new Wep_stats(unique_id)
            perk_stats.create_perk_list('selected').calculate_stats('normal')

            let stats = perk_stats.remove_perks([id]).calculate_stats().subtract_stats().subtracted_stats
            Object.keys(perk.investment).forEach(id => {
                if(
                    (
                        clarity_random_data.stat_order_by_wep_type[static_item.type]
                        &&
                        !clarity_random_data.stat_order_by_wep_type[static_item.type].find(list => list == id)
                    )
                    ||
                    !stats[id]
                ) {
                    let reg_exp = new RegExp(`{"ele_type":"div","className":"Clarity_stat","append":\\[{"ele_type":"div","textContent":"{stat\\-id=${id}.*?]}`)
                    description = description.replace(reg_exp, '').replace(/\[,{/g, '[{').replace(/},]/g, '}]').replace(/,,/g, ',')
                    return
                }

                description = description.replace(
                    `{stat-id=${id}}`,
                    parseFloat(stats[id].toFixed(1))
                )
            })

        }
        return JSON.parse(description)
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

    let clarity_main_box = document.createElement('div')
    clarity_main_box.className = 'Clarity_weapon_perks_box'
    clarity_main_box.append(new_perks)

    document.querySelector(perk_location)?.replaceWith(clarity_main_box)
    console.timeEnd('speed test 9000')
}
