const clarity_random_data = {
    stat_order: [
        [4284893193, {bar_type: null         }],
        [447667954,  {bar_type: 'stat_letter', letter: 'ms'}],
        [2961396640, {bar_type: 'stat_letter', letter: 'ms'}],
        [2837207746, {bar_type: 'stat_bar'   }],
        [4043523819, {bar_type: 'stat_bar'   }],
        [3614673599, {bar_type: 'stat_bar'   }],
        [1591432999, {bar_type: 'stat_bar'   }],
        [2523465841, {bar_type: 'stat_bar'   }],
        [2762071195, {bar_type: 'stat_bar'   }],
        [209426660,  {bar_type: 'stat_bar'   }],
        [1240592695, {bar_type: 'stat_bar'   }],
        [155624089,  {bar_type: 'stat_bar'   }],
        [943549884,  {bar_type: 'stat_bar'   }],
        [4188031367, {bar_type: 'stat_bar'   }],
        [1345609583, {bar_type: 'stat_bar'   }],
        [3555269338, {bar_type: 'stat_bar'   }],
        [2715839340, {bar_type: 'stat_svg'   }],
        [3022301683, {bar_type: 'stat_bar'   }],
        [3736848092, {bar_type: 'stat_bar'   }],
        [3871231066, {bar_type: null         }],
        [1931675084, {bar_type: null         }],
        [925767036,  {bar_type: null         }],

        ['range',    {bar_type: 'stat_letter', letter: 'm'}],
        ['reload',   {bar_type: 'stat_letter', letter: 's'}],
    ],
    stat_names: {
        4284893193: 'Rounds Per Minute',
        447667954:  'Draw Time',
        2961396640: 'Charge Time',
        2837207746: 'Swing Speed',
        4043523819: 'Impact',
        3614673599: 'Blast Radius',
        1591432999: 'Accuracy',
        2523465841: 'Velocity',
        2762071195: 'Guard Efficiency',
        209426660:  'Guard Resistance',
        1240592695: 'Range',
        155624089:  'Stability',
        943549884:  'Handling',
        4188031367: 'Reload Speed',
        1345609583: 'Aim Assistance',
        3555269338: 'Zoom',
        2715839340: 'Recoil Direction',
        3022301683: 'Charge Rate',
        3736848092: 'Guard Endurance',
        3871231066: 'Magazine',
        1931675084: 'Inventory Size',
        925767036:  'Ammo Capacity',

        'range': 'In-Game Range',
        'reload': 'In-Game Reload'
    },
    stat_order_by_wep_type: {
        Sword: [
            2837207746, // Swing Speed
            4043523819, // Impact
            2762071195, // Guard Efficiency
            209426660,  // Guard Resistance
            3022301683, // Charge Rate
            3736848092, // Guard Endurance
            925767036,  // Ammo Capacity
        ],
    },
    ammo: {
        1: 'primary',
        2: 'special',
        3: 'heavy'
    },
    masterworks: { // all masterwork id's from 1 to 10
        "stability":   [1590375901, 1590375902, 1590375903, 1590375896, 1590375897, 1590375898, 1590375899, 1590375892, 1590375893, 384158423 ],
        "range":       [150943607,  150943604,  150943605,  150943602,  150943603,  150943600,  150943601,  150943614,  150943615,  2697220197],
        "handling":    [518224747,  518224744,  518224745,  518224750,  518224751,  518224748,  518224749,  518224738,  518224739,  186337601 ],
        "impact":      [1486919755, 1486919752, 1486919753, 1486919758, 1486919759, 1486919756, 1486919757, 1486919746, 1486919747, 3486498337],
        "reload":      [4283235143, 4283235140, 4283235141, 4283235138, 4283235139, 4283235136, 4283235137, 4283235150, 4283235151, 758092021 ],
        "blast":       [3928770367, 3928770364, 3928770365, 3928770362, 3928770363, 3928770360, 3928770361, 3928770358, 3928770359, 3803457565],
        "velocity":    [4105787909, 4105787910, 4105787911, 4105787904, 4105787905, 4105787906, 4105787907, 4105787916, 4105787917, 1154004463],
        "charge_time": [3353797898, 3353797897, 3353797896, 3353797903, 3353797902, 3353797901, 3353797900, 3353797891, 3353797890, 3128594062],
        "draw_time":   [2203506848, 2203506851, 2203506850, 2203506853, 2203506852, 2203506855, 2203506854, 2203506857, 2203506856, 1639384016],
        "accuracy":    [892374263,  892374260,  892374261,  892374258,  892374259,  892374256,  892374257,  892374270,  892374271,  2993547493]
    },
    perk_types: {
        1257608559: 'Arrow',
        2833605196: 'Barrel',
        1757026848: 'Battery',
        1041766312: 'Blade',
        3809303875: 'Bowstring',
        3962145884: 'Grip',
        683359327:  'Guard',
        1202604782: 'Launcher Barrel',
        1806783418: 'Magazine',
        2619833294: 'Scope',
        577918720:  'Stock',
        7906839:    'Trait', // called Frame in API in some cases
        2718120384: 'Magazine gl'
    },
    stat_blacklist: {
        1480404414: 'Attack',
        1935470627: 'Power',
        1885944937: 'No name',
        3291498656: 'No name'
    },
    socket_category_names: {
        3956125808: 'intrinsic',
        4241085061: 'perks',
        2685412949: 'mods',
        2048875504: 'cosmetics'
    }
}