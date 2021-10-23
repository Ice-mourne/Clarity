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
                    set_attribute: {type: `stat-bar`, value: `${id} base`},
                    className: `clarity_stat_bar_base`,
                    style: `width: ${stat[id].base}%`
                },
                {
                    set_attribute: {type: `stat-bar`, value: `${id} mod`},
                    className: `clarity_stat_bar_mod`,
                    style: `width: ${stat[id].mod}%`
                },
                {
                    set_attribute: {type: `stat-bar`, value: `${id} masterwork`},
                    className: `clarity_stat_bar_masterwork`,
                    style: `width: ${stat[id].masterwork}%`
                },
                {
                    set_attribute: {type: `stat-bar`, value: `${id} reduction`},
                    className: `clarity_stat_bar_reduction`,
                    style: `width: ${stat[id].reduction}%`
                }
            ]
        }
        // if(type == 'stat_letter') return {
        //     className: 'clarity_stat_',
        // }
        if(type == 'stat_svg') {
            let x = Math.sin((40+5) * 2 * Math.PI / 20) * (100 - 40)
            if(x <= 0) 'change direction'
            let rotate = (100 - Math.abs(x)) / 400

            return {
                node_type: 'svg',
                className: 'clarity_stat_',
                height: '12',
                viewBox: '0 0 2 0.01',
                append: [
                    {
                        node_type: 'circle',
                        cx: '115',
                        cy: '115',
                        r: '100',
                        fill: '#333333'
                    },
                    {
                        node_type: 'circle',
                        cx: '115',
                        cy: '115',
                        r: '57',
                        fill: 'none',
                        'stroke-width': '85',
                        stroke: '#fff',
                        'stroke-dasharray': `calc(${rotate} * 358.14) 358.14`,
                        transform: 'rotate(-90) translate(-230)'
                    }
                ]
            }
        }
    }

    let frag = fragment_creator(
        stat_order.map(([id, value]) => {
            return {
                className: 'clarity_stat_name',
                textContent: value.name,
                },
                {
                    set_attribute: {type: `stat-value`, value: id},
                    className: 'clarity_stat_value',
                    textContent: test_stats[id].base
                },
                stat_bar_place(id, value.bar_type, test_stats[id])
        })
    )

    document.querySelector('.ItemStats-m_stats-yaOm5').append(frag)


}

Math.sin((40+5) * 2 * Math.PI / 20) * (100 - 40)
`
<svg width="500" height="500" viewBox="0 0 230 0.01">
  <circle cx="115" cy="115" r="100" fill="#333333"/>
  <circle cx="115" cy="115" r="57" fill="none" stroke-width="85" stroke="#fff" stroke-dasharray="calc((10 / 400) * 358.14) 358.14" transform="rotate(-90) translate(-230)"/>
</svg>
`