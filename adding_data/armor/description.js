window.addEventListener('armor_pressed', e => add_armor_perks(e.detail))
function add_armor_perks(unique_id) {
    const unique_item = clarity_user_data[unique_id]
    // const static_item = clarity_manifest[unique_item.id]

    const active_perk = unique_item.sockets.perks

    let description_box = [
        {
            node_type: 'div',
            className: 'Clarity_armor_perk_box',
            append: [
                {
                    node_type: 'img',
                    className: 'Clarity_perk_icon',
                    src: `https://www.bungie.net/common/destiny2_content/icons/${clarity_manifest[active_perk].icon}`
                },
                {
                    node_type: 'div',
                    className: 'Clarity_perk_name',
                    textContent: clarity_manifest[active_perk].name
                },
                {
                    node_type: 'div',
                    className: 'Clarity_perk_description',
                    append: clarity_manifest[active_perk].description
                }
            ]
        }
    ]

    let description_location = local_storage('clarity_settings').class_names.locations.item_info.description

    document.querySelector(description_location).replaceWith(fragment_creator(description_box))
}