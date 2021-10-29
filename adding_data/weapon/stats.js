window.addEventListener('weapon_pressed', e => add_stats(e.detail))
function add_stats(unique_id) {
    class Wep_stats {
        #unique_item = clarity_user_data[unique_id]
        #static_item = clarity_manifest[this.#unique_item.id]
        stats = {}
        subtracted_stats = {}

        add_perk_id(type_list) {
            let perk_list = []
            type_list.forEach(type => {
                switch (type) {
                    case 'active':
                        perk_list = [...perk_list, ...this.#unique_item.sockets.perks.active]
                    break
                    case 'selected':
                        document.querySelector('.Clarity_weapon_perks_box')
                        .querySelectorAll('.Clarity_active:not(.Clarity_disable), .Clarity_selected')
                        .forEach(perk => perk_list.push(Number(perk.id)))
                    break
                    case 'frame':
                        perk_list.push(
                            this.#static_item.sockets.frame
                        )
                    break
                    default:
                        perk_list.push(
                            this.#unique_item.sockets[type]
                        )
                }
            })
            return perk_list
        }
        round_stats(x) {
            return Object.entries(this[x])
            .reduce((acc, [id, value]) =>
                ({
                    ...acc, [id]: parseFloat(value.toFixed(0))
                }), {}
            )
        }
        calculate_stats(type_list, subtract) {
            let perk_list = this.add_perk_id(type_list)

            if(subtract) return get_item_stats(this.#static_item, perk_list)

            this.stats = get_item_stats(this.#static_item, perk_list)
            return this
        }
        subtract_stats(type_list) {
            this.subtracted_stats = Object.entries(
                this.calculate_stats(type_list, true)
            )
            .reduce(
                (acc, [id, value]) => ({ ...acc, [id]: acc[id] -= value}), {...this.stats}
            )
            return this
        }
    }

    function stat_bar_place(id, data, stats) {
        if(data.bar_type == 'stat_bar') return {
            className: 'clarity_stat_bar',
            append: [
                {
                    set_attribute: [
                        {name: `stat-bar`, value: `${id} base`}
                    ],
                    className: `clarity_stat_bar_perks`,
                    style: `width: ${stats.perks[id]}%`
                },
                {
                    set_attribute: [
                        {name: `stat-bar`, value: `${id} mod`}
                    ],
                    className: `clarity_stat_bar_mod`,
                    style: `width: ${stats.mod[id]}%`
                },
                {
                    set_attribute: [
                        {name: `stat-bar`, value: `${id} masterwork`}
                    ],
                    className: `clarity_stat_bar_masterwork`,
                    style: `width: ${stats.masterwork[id]}%`
                }
            ]
        }
        if(data.bar_type == 'stat_letter') return {
            className: (stats.masterwork[id] != 0) ? ' Clarity_masterwork' : '',
            textContent: data.letter
        }
        if(data.bar_type == 'stat_svg') {
            let stat = stats.all[id]

            xr = 1 + Math.cos((-20 - stat * 0.6) * Math.PI / 180)
            yr = 1 + Math.sin((-20 - stat * 0.6) * Math.PI / 180)
            xl = 2 - xr

            let x = Math.sin((5 + stat) * Math.PI / 10) * (100 - stat)

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

    let wep_stats = new Wep_stats()
    const stats = {
        all:        wep_stats.calculate_stats(['frame', 'active', 'mod', 'masterwork']).round_stats('stats'),
        mod:        wep_stats.subtract_stats( ['frame', 'active',      , 'masterwork']).subtracted_stats,
        masterwork: wep_stats.subtract_stats( ['frame', 'active', 'mod',             ]).subtracted_stats,
        perks:      wep_stats.calculate_stats(['frame', 'active'                     ]).stats,
    }
    let weapon_stats = fragment_creator([
        {
            className: 'Clarity_weapon_stats',
            append: stat_order.flatMap(([id, value]) => {
                if(!stats.all[id]) return []
                return [
                    {
                        className: `clarity_stat_name${(stats.masterwork[id] != 0) ? ' Clarity_masterwork' : ''}`,
                        textContent: stat_names[id],
                    },
                    {
                        set_attribute: [
                            {name: `stat-value`, value: id}
                        ],
                        className: `clarity_stat_value${(stats.masterwork[id] != 0) ? ' Clarity_masterwork' : ''}`,
                        textContent: stats.all[id]
                    },
                    stat_bar_place(id, value, stats)
                ]
            }).filter(data => data)
        }
    ]

    )
    let stats_location = local_storage('clarity_settings').class_names.locations.item_info.stats
    document.querySelector(stats_location)?.parentElement.replaceWith(weapon_stats)
}
