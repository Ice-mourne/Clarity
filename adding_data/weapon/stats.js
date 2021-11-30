function add_stats(unique_id, perk_list_type) {
    function stat_bar_place(id, data, stats) {
        if(data.bar_type == 'stat_bar') return {
            className: 'clarity_stat_bar',
            append: [
                {
                    set_attribute: [
                        {name: `stat-bar`, value: `${id} base`}
                    ],
                    className: `clarity_stat_bar_perks`,
                    style: `width: ${Math.round(stats.perks[id])}%`
                },
                {
                    set_attribute: [
                        {name: `stat-bar`, value: `${id} mod`}
                    ],
                    className: `clarity_stat_bar_mod`,
                    style: `width: ${Math.round(stats.mod[id])}%`
                },
                {
                    set_attribute: [
                        {name: `stat-bar`, value: `${id} masterwork`}
                    ],
                    className: `clarity_stat_bar_masterwork`,
                    style: `width: ${Math.round(stats.masterwork[id])}%`
                }
            ]
        }
        if(data.bar_type == 'stat_letter') return {
            className: (stats.masterwork[id] && stats.masterwork[id] != 0) ? ' Clarity_masterwork' : '',
            textContent: data.letter
        }
        if(data.bar_type == 'stat_svg') {
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
    const stat_order = clarity_random_data.stat_order
    const stat_names = clarity_random_data.stat_names

    let wep_stats = new Wep_stats(unique_id)

    const stats = {
        perks: wep_stats.create_perk_list(perk_list_type || 'active')
        .remove_perks(['mod', 'masterwork'])
        .calculate_stats()
        .subtracted_stats,

        all: {
            ...wep_stats.create_perk_list(perk_list_type || 'active')
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
    let weapon_stats = fragment_creator([
        {
            className: 'Clarity_weapon_stats',
            append: stat_order.flatMap(([id, value]) => {
                if(!stats.all[id]) return []
                return [
                    {
                        className: `clarity_stat_name${(stats.masterwork[id] && stats.masterwork[id] != 0) ? ' Clarity_masterwork' : ''}`,
                        textContent: stat_names[id],
                    },
                    {
                        set_attribute: [
                            {name: `stat-value`, value: id}
                        ],
                        className: `clarity_stat_value${(stats.masterwork[id] && stats.masterwork[id] != 0) ? ' Clarity_masterwork' : ''}`,
                        textContent: stats.all[id]
                    },
                    stat_bar_place(id, value, stats)
                ]
            }).filter(data => data)
        }
    ]

    )
    let stats_location = local_storage('clarity_settings').class_names.locations.item_info.stats
    let location = document.querySelector(stats_location)?.parentElement || document.querySelector('.Clarity_weapon_stats')
    location?.replaceWith(weapon_stats)

    return wep_stats
}
