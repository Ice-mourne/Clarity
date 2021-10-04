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