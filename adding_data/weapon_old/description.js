function add_weapon_perks(unique_id) {
    if(document.querySelector('.sheet-container > .sheet-header')) return


    window.addEventListener('perk_hover', e => console.log(e.detail))
    window.addEventListener('mouse_out', e => console.log(e))


    const templates = {
        weapon_perks(rolled_perks, active_perks) {
            console.log(this)
            let click_event = event => {
                const target = event.path.find(element => element.attributes?.perk_id || element.attributes.class?.value == 'description')
                console.log(event.path)
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
            // let mouse_enter_event = event => {
            //     let perk_id = event.target.parentElement.attributes.perk_id.value
            //     if(!perk_id) return
            //     // let description = document.createElement('div')
            //     // description.id = 'hover_description'

            //     let position = event.target.getBoundingClientRect()
            //     let body_position = document.body.getBoundingClientRect()
            //     // description.style.cssText = `top:${position.top}px; left:${position.left + position.width / 2}px`
            //     console.log(position)
            //     console.log(body_position)
    
            //     // description.textContent = 'test text hover'
            //     document.body.append(fragment_creator(hover_description(position, body_position, perk_id)))
            // }
            // let mouse_leave_event = () => {
            //     document.querySelector('#hover_description').remove()
            // }

            return [
                {
                    ele_type: 'div',
                    className: 'weapon_perk_box_new',
                    event_listener: [
                        {type: 'click', fn: click_event}
                    ],
                    append: rolled_perks.map(perk_list)
                }
            ]
            function perk_list(perk_list) {
                return {
                    ele_type: 'div',
                    className: 'perk_list',
                    append: [description(), ...perk_list.map(perk)]
                }
            }
            function description() {
                return {
                    ele_type: 'div',
                    className: 'description',
                }
            }
            function hover_description(position, body_position, perk_id) {
                return [{
                    ele_type: 'div',
                    id: 'hover_description',
                    css_text: `top:${position.top - body_position.top}px; left:${position.left + position.width / 2}px`,
                    append: [
                        {
                            ele_type: 'div',
                            className: 'perk_name',
                            textContent: clarity_manifest[perk_id].name
                        },
                        {
                            ele_type: 'div',
                            className: 'perk_description',
                            append_element: fragment_creator(
                                update_perk_description(perk_id, add_stats(unique_id, 'selected'))
                            )
                        }
                    ]
                }]
            }
            function perk(perk) {
                return {
                    className: `perk ${(active_perks.includes(perk)) ? 'active' : ''}`,
                    set_attribute: [
                        {name: 'perk_id', value: perk},
                    ],
                    append: [
                        {
                            className: 'icon_container',
                            // event_listener: [
                            //     {type: 'mouseenter', fn: mouse_enter_event},
                            //     {type: 'mouseleave', fn: mouse_leave_event}
                            // ],
                            append: [
                                {
                                    ele_type: 'img',
                                    src: `https://www.bungie.net/common/destiny2_content/icons/${clarity_manifest[perk].icon}`
                                }
                            ]
                        },
                        {
                            className: 'perk_name',
                            textContent: clarity_manifest[perk].name
                        }
                    ]
                }
            }
        },
        weapon_perk_description() {

        }
    }

                                                                                                                        //




    console.time('speed test 9000')
    let perk_location = local_storage('clarity_settings').class_names.locations.item_info.perks

    // document.querySelector(perk_location).style.cssText = 'display: none;'

    add_stats(unique_id, 'active')

    const unique_item = clarity_user_data[unique_id]
    const static_item = clarity_manifest[unique_item.id]

    const rolled_perks = unique_item.sockets.perks.rolled || static_item.sockets.perks.curated.map(list => list.map(perk => perk.id)) //|| unique_item.sockets.perks.active.map(perk => [perk])
    const active_perks = unique_item.sockets.perks.active


    console.time('speed test')
    let stuff = templates.weapon_perks(rolled_perks, active_perks)
    console.timeEnd('speed test')

    let stop123


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

    function perks() {
        let perks_box = /*html*/ `
            <div class="Clarity_weapon_perks_box">
                ${rolled_perks.map(perk_list).join('\n')}
            </div>
        `
        function perk_list(perk_list) {
            return /*html*/ `
                <div class="Clarity_perk_list">
                    <div class="Clarity_description"></div>
                    ${perk_list.map(perk).join('\n')}
                </div>
            `
        }
        function perk(id) {
            return /*html*/ `
                <div class="Clarity_perk ${(active_perks.includes(id)) ? 'Clarity_active' : ''}" perk_id="${id}">
                    <div class="Clarity_icon_container">
                        <img src="https://www.bungie.net/common/destiny2_content/icons/${clarity_manifest[id].icon}">
                    </div>
                    <div class="Clarity_perk_name">${clarity_manifest[id].name}</div>
                </div>
            `
        }
        let frag = DOMPurify.sanitize(perks_box, {RETURN_DOM: true, ADD_ATTR: ['perk_id']}).firstElementChild

        frag.addEventListener('mouseleave', event => {

            console.log(event);
            return
            const target = event.path.find(element => element.attributes?.perk_id || element.attributes.class?.value == 'Clarity_description')

            let perk_list = target.parentElement
            let description = perk_list.firstElementChild
            let id = target.attributes.perk_id?.value
            let item_info = add_stats(unique_id, 'selected')

            const cond = {
                active: target.classList.contains('Clarity_active'),
                open: description.textContent != ''
            }

            description.textContent = '' // remove description
            perk_list.querySelectorAll('.Clarity_perk') // get all perks
            .forEach(p => p.classList.remove('Clarity_selected', 'Clarity_disable')) // reset class list

            if(!id) return // if id undefined that means user clicked on description

            if (cond.active) { // if pressed on active perk
                let selected_active = (perk_list.querySelector('.Clarity_selected')) ? true : false

                if(cond.open && !selected_active) return // if it had description (no longer dose) do nothing
                description.textContent = 'test text active'// .append(
                //     fragment_creator(
                //         update_perk_description(id * 1, item_info)
                //     ) || 'empty'
                // )
            } else {
                let selected = target.classList.contains('Clarity_selected')
                if(cond.open && selected) return

                perk_list.querySelector('.Clarity_active').classList.add('Clarity_disable') // close active perk
                target.classList.add('Clarity_selected') // open selected
                description.textContent = 'test text selected' //.append(
                //     fragment_creator(
                //         update_perk_description(id * 1, item_info)
                //     ) || 'empty'
                // )
            }
            return

            perk_list.querySelectorAll('.Clarity_perk') // get all perks
            .forEach(p => p.classList.remove('Clarity_selected', 'Clarity_disable')) // reset class list


            if (!target.classList.contains('Clarity_active')) {
                target.classList.add('Clarity_selected')
                perk_list.querySelector('.Clarity_active').add('Clarity_disable')
                description.append(
                    fragment_creator(
                        update_perk_description(id * 1, item_info)
                    ) || 'empty'
                )
            } else {
                description.append(
                    fragment_creator(
                        update_perk_description(id * 1, item_info)
                    ) || 'empty'
                )
            }
        })
        return frag
    }

    // all_perks.forEach(perk_list => perk_list.append.unshift(
    //     {
    //         className: 'Clarity_description',
    //         event_listener: [
    //             {type: 'click', fn: description_close_event_listener}
    //         ],
    //     }
    // ))
    // let new_perks = fragment_creator(all_perks)

    // let clarity_main_box = document.createElement('div')
    // clarity_main_box.className = 'Clarity_weapon_perks_box'
    // clarity_main_box.append() //.append(new_perks)

    document.querySelector(perk_location)?.replaceWith(fragment_creator(stuff)/*clarity_main_box*/)
    console.timeEnd('speed test 9000')
}