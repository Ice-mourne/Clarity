class wep_stats {
    constructor (unique_id) {
        this.unique_item = clarity_user_data[unique_id]
        this.static_item = clarity_manifest[this.unique_item.id]
    }

    all_perk_ids = []
    filter_perk_ids = []

    stats = {}
    subtracted_stats = {}

    perk_list(list_type = 'active') {
        const perk_ids = []
        if(list_type == 'active') {
            perk_ids = this.unique_item.sockets.perks.active
                .map(perk_id => {
                    return ['perk', perk_id]
                })
        }
        else if(list_type == 'selected') {
            const selected_perks = document.querySelector('.weapon_perk_box_new')
                ?.querySelectorAll('.active:not(.disable), .selected')

            perk_ids = Array.from(selected_perks)
                .map(perks => {
                    return ['perk', Number(perks.id)]
                })
        }
        this.all_perk_ids = [
            ...perk_ids,
            ['frame', this.static_item.sockets.frame],
            ['mod', this.unique_item.sockets.mod],
            ['masterwork', this.unique_item.sockets.masterwork]
        ]
    }
    remove_perks(list) {
        this.filter_perk_ids = this.all_perk_ids.filter(([type, id]) =>
            !list.some(val => val == type || val == id) // true then not in list
        )
        .map(([type, id]) => id) // remove type its no longer needed
    }
    calculate_stats(type = 'normal') {
        if(type == 'normal') {
            let all_perk_ids = this.all_perk_ids.map(([type, id]) => id) // remove type its not needed hare
            this.stats = weapon_stat_calculator(this.static_item, all_perk_ids)
        }
        this.subtracted_stats = weapon_stat_calculator(this.static_item, this.perk_ids)
    }
    round_stats(option) {
        return Object.entries(this[option])
        .reduce((acc, [id, value]) =>
            ({
                ...acc, [id]: parseFloat(value.toFixed(0))
            }), {}
        )
    }
    subtract_stats() {
        this.subtracted_stats = Object.entries(this.subtracted_stats)
        .reduce(
            (acc, [id, value]) => ({ ...acc, [id]: acc[id] -= value}), {...this.stats}
        )
    }
    add_new_stats() {
        this.range_reload = {
            range: parseFloat(
                range_calculator(this.static_item, this.stats, this.all_perk_ids)?.ADS_min.toFixed(1)
            ),
            reload: parseFloat(
                reload_calculator(this.static_item, this.stats, this.all_perk_ids)?.default.toFixed(1)
            ),
            handling: parseFloat(
                handling_calculator(this.static_item, this.stats)
            )
        }
    }

    complete_stats(perk_list_type) {
        return {
            perks: wep_stats.create_perk_list(perk_list_type)
            .remove_perks(['mod', 'masterwork'])
            .calculate_stats()
            .subtracted_stats,

            all: {
                ...wep_stats.create_perk_list(perk_list_type)
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
    }
}