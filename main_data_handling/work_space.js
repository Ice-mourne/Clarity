function get_item_stats(static_item, perks) {

    function investment() {
        let inv = static_item.stats.investment
        perks.forEach(perk => { // go over perks in list and add stats from each perk to inv
            // if (!clarity_manifest[perk].investment) return // check if perk has investment stats
            Object.entries(clarity_manifest[perk].investment)
            .forEach(stat => inv[stat[0]] += stat[1])
        })
    }


    // let investment_stats = {}
    // user_data.itemComponents.sockets.data[unique_id].sockets
    // .filter(perk => perk.isEnabled && perk.isVisible && perk.plugHash != 3511092054)
    // .map(perk => filter_and_add_stats(inventory_item[perk.plugHash].investmentStats)) // perk stats

    // filter_and_add_stats(inventory_item[static_id].investmentStats) // weapon stats

    // function filter_and_add_stats(data) {
    //     data.filter(x => x.statTypeHash != 1885944937 && x.statTypeHash != 1935470627 && x.statTypeHash != 1480404414 && x.statTypeHash != 3291498656) // filter out crap stats
    //     .map(stat => {
    //         if (investment_stats[stat.statTypeHash]) {
    //             investment_stats[stat.statTypeHash] += stat.value
    //         } else {
    //             investment_stats[stat.statTypeHash] = stat.value
    //         }
    //     })
    // }
    // return investment_stats
}

function clarity_test() {
    document.querySelectorAll('.item').forEach(x => {
        setTimeout(() => {
            x.click()
            console.log(x);
        }, 250)
    })
}

// window.addEventListener('weapon_pressed', e => add_stats())
function add_stats() {
    let stat_order = [
        [4284893193, {name: 'Rounds Per Minute', bar_type: null         }],
        [447667954,  {name: 'Draw Time',         bar_type: 'stat_letter'}],
        [2961396640, {name: 'Charge Time',       bar_type: 'stat_letter'}],
        [2837207746, {name: 'Swing Speed',       bar_type: 'stat_bar'   }],
        [4043523819, {name: 'Impact',            bar_type: 'stat_bar'   }],
        [3614673599, {name: 'Blast Radius',      bar_type: 'stat_bar'   }],
        [1591432999, {name: 'Accuracy',          bar_type: 'stat_bar'   }],
        [2523465841, {name: 'Velocity',          bar_type: 'stat_bar'   }],
        [2762071195, {name: 'Guard Efficiency',  bar_type: 'stat_bar'   }],
        [209426660,  {name: 'Guard Resistance',  bar_type: 'stat_bar'   }],
        [1240592695, {name: 'Range',             bar_type: 'stat_bar'   }],
        [155624089,  {name: 'Stability',         bar_type: 'stat_bar'   }],
        [943549884,  {name: 'Handling',          bar_type: 'stat_bar'   }],
        [4188031367, {name: 'Reload Speed',      bar_type: 'stat_bar'   }],
        [1345609583, {name: 'Aim Assistance',    bar_type: 'stat_bar'   }],
        [3555269338, {name: 'Zoom',              bar_type: 'stat_bar'   }],
        [2715839340, {name: 'Recoil Direction',  bar_type: 'stat_svg'   }],
        [3022301683, {name: 'Charge Rate',       bar_type: 'stat_bar'   }],
        [3736848092, {name: 'Guard Endurance',   bar_type: 'stat_bar'   }],
        [3871231066, {name: 'Magazine',          bar_type: null         }],
        [1931675084, {name: 'Inventory Size',    bar_type: null         }],
        [925767036,  {name: 'Ammo Capacity',     bar_type: null         }],
    ]



    let test_stats = {
        "155624089":  {base: 43},
        "943549884":  {base: 46},
        "1240592695": {base: 62},
        "1345609583": {base: 67},
        "1931675084": {base: 82},
        "2715839340": {base: 93},
        "3555269338": {base: 14},
        "3871231066": {base: 10},
        "4043523819": {base: 92},
        "4188031367": {base: 38},
        "4284893193": {base: 120}
    }

    function stat_bar_place(id, type, stat) {
        if(type == 'stat_bar') return {
            className: 'clarity_stat_bar',
            append: [
                {
                    set_attribute: [
                        {name: `stat-bar`, value: `${id} base`}
                    ],
                    className: `clarity_stat_bar_base`,
                    style: `width: ${stat.base}%`
                },
                {
                    set_attribute: [
                        {name: `stat-bar`, value: `${id} mod`}
                    ],
                    className: `clarity_stat_bar_mod`,
                    style: `width: ${stat.mod}%`
                },
                {
                    set_attribute: [
                        {name: `stat-bar`, value: `${id} masterwork`}
                    ],
                    className: `clarity_stat_bar_masterwork`,
                    style: `width: ${stat.masterwork}%`
                },
                {
                    set_attribute: [
                        {name: `stat-bar`, value: `${id} reduction`}
                    ],
                    className: `clarity_stat_bar_reduction`,
                    style: `width: ${stat.reduction}%`
                }
            ]
        }
        // stat_svg: {
        //     className: 'clarity_stat_bar',
        // },
        if(type == 'stat_svg') {
            let stat = 10

            let x = Math.sin((5 + stat) * 2 * Math.PI / 20) * (100 - stat)
            if(x <= 0) 'change direction'
            let rotate = Math.max(Math.abs(x) / 300, 0.008) //(100 - Math.abs(x)) / 400

            return {
                ele_ns: {ns: 'http://www.w3.org/2000/svg', type: 'svg'},
                className: 'clarity_stat_svg',
                set_attribute: [
                    {name: 'height', value: '12'},
                    {name: 'viewBox', value: '0 0 20 10'}
                ],
                append: [
                    {
                        ele_ns: {ns: 'http://www.w3.org/2000/svg', type: 'circle'},
                        set_attribute: [
                            {name: 'cx',   value: '10'},
                            {name: 'cy',   value: '10'},
                            {name: 'r',    value: '10'},
                            {name: 'fill', value: '#333333'},
                        ],
                    },
                    {
                        ele_ns: {ns: 'http://www.w3.org/2000/svg', type: 'line'},
                        set_attribute: [
                            {name: 'x1', value: '10'},
                            {name: 'y1', value: '10'},
                            {name: 'x2', value: '10'},
                            {name: 'y2', value: '0'},
                            {name: 'r',  value: '5.7'},
                            {name: 'stroke', value: '#fff'},
                        ],
                    },
                    {
                        ele_ns: {ns: 'http://www.w3.org/2000/svg', type: 'circle'},
                        set_attribute: [
                            {name: 'cx', value: '10'},
                            {name: 'cy', value: '10'},
                            {name: 'r',  value: '5.7'},
                            {name: 'fill',             value: 'none'},
                            {name: 'stroke-width',     value: '8.5'},
                            {name: 'stroke',           value: '#fff'},
                            {name: 'stroke-dasharray', value: `calc(${rotate} * 35.81) 35.81`},
                            {name: 'transform',        value: 'rotate(-90) translate(-20)'},
                        ],
                    }
                ]
            }
        }
    }

    let frag = fragment_creator(
        stat_order.flatMap(([id, value]) => {
            if(!test_stats[id]) return []
            return [
                {
                    className: 'clarity_stat_name',
                    textContent: value.name,
                },
                {
                    set_attribute: [
                        {name: `stat-value`, value: id}
                    ],
                    className: 'clarity_stat_value',
                    textContent: test_stats[id].base
                },
                stat_bar_place(id, value.bar_type, test_stats[id])
            ]
        }).filter(data => data)
    )

    document.querySelector('.ItemStats-m_stats-yaOm5').append(frag)
}


