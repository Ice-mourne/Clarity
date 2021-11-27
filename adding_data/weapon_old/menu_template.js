const weapon_templates = {
    perk_box(rolled_perks, active_perks) {
        return [
            {
                ele_type: 'div',
                className: 'weapon_perk_box_new',
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
        function perk(perk) {
            return {
                ele_type: 'div',
                className: `perk ${(active_perks.includes(perk)) ? 'active' : ''}`,
                set_attribute: [
                    {name: 'perk_id', value: perk},
                ],
                append: [
                    {
                        ele_type: 'div',
                        className: 'icon_container',
                        append: [
                            {
                                ele_type: 'img',
                                src: `https://www.bungie.net/common/destiny2_content/icons/${clarity_manifest[perk].icon}`
                            }
                        ]
                    },
                    {
                        ele_type: 'div',
                        className: 'perk_name',
                        textContent: clarity_manifest[perk].name
                    }
                ]
            }
        }
    },

    hover_description_container(position, body_position, perk_id) {
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
    },

    weapon_stats(static_item, stats) {
        const stat_order = clarity_random_data.stat_order_by_wep_type[static_item.type]
        return [
            {
                ele_type: 'div',
                className: 'Clarity_weapon_stats',
                append: stat_order.flatMap(id => {
                    if(!stats.all[id]) return []
                    const stat_info = clarity_random_data.stat_info[id]
                    return [
                        {
                            ele_type: 'div',
                            className: `clarity_stat_name${(stats.masterwork[id] && stats.masterwork[id] != 0) ? ' Clarity_masterwork' : ''}`,
                            textContent: stat_info.name,
                        },
                        {
                            ele_type: 'div',
                            set_attribute: [
                                {name: `stat-id`, value: id}
                            ],
                            className: `clarity_stat_value${(stats.masterwork[id] && stats.masterwork[id] != 0) ? ' Clarity_masterwork' : ''}`,
                            textContent: stats.all[id]
                        },
                        stat_bar_place(id, stat_info, stats) || {}
                    ]
                })
            }
        ]
        function stat_bar_place(id, stat_info, stats) {
            switch (stat_info.bar_type) {
                case 'stat_bar':
                    return {
                        className: 'clarity_stat_bar',
                        append: [
                            {
                                ele_type: 'div',
                                set_attribute: [
                                    {name: `stat-bar`, value: `${id} base`}
                                ],
                                className: `clarity_stat_bar_perks`,
                                style: `width: ${stats.perks[id]}%`
                            },
                            {
                                ele_type: 'div',
                                set_attribute: [
                                    {name: `stat-bar`, value: `${id} mod`}
                                ],
                                className: `clarity_stat_bar_mod`,
                                style: `width: ${stats.mod[id]}%`
                            },
                            {
                                ele_type: 'div',
                                set_attribute: [
                                    {name: `stat-bar`, value: `${id} masterwork`}
                                ],
                                className: `clarity_stat_bar_masterwork`,
                                style: `width: ${stats.masterwork[id]}%`
                            }
                        ]
                    }
                case 'stat_letter':
                    return {
                        ele_type: 'div',
                        className: (stats.masterwork[id] && stats.masterwork[id] != 0) ? ' Clarity_masterwork' : '',
                        textContent: stat_info.letter
                    }
                case 'stat_svg':
                    let stat = stats.all[id]

                    const xr = 1 + Math.cos((-20 - stat * 0.6) * Math.PI / 180),
                          yr = 1 + Math.sin((-20 - stat * 0.6) * Math.PI / 180),
                          xl = 2 - xr,
                          x = Math.sin((5 + stat) * Math.PI / 10) * (100 - stat)

                    return {
                        ele_ns: {ns: 'http://www.w3.org/2000/svg', type: 'svg'},
                        className: 'clarity_stat_svg',
                        set_attribute: [
                            {name: 'height', value: '12'},
                            {name: 'viewBox', value: '0 0 2 1'}
                        ],
                        append: [
                            {
                                ele_ns: {ns: 'http://www.w3.org/2000/svg', type: 'circle'},
                                set_attribute: [
                                    {name: 'cx',   value: '1'},
                                    {name: 'cy',   value: '1'},
                                    {name: 'r',    value: '1'},
                                    {name: 'fill', value: '#333333'},
                                ],
                            },
                            {
                                ele_ns: {ns: 'http://www.w3.org/2000/svg', type: 'path'},
                                style: `transform: rotate(${x * 0.8}deg); transform-origin: 50% 100%;`,
                                set_attribute: [
                                    {name: 'd', value: `M 1 1 L ${xl} ${yr} A 1 1 0 0 1 ${xr} ${yr} Z`},
                                    {name: 'fill', value: '#fff'}
                                ]
                            }
                        ]
                    }
            }
        }
    },
}