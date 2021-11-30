function get_class_names(start_flow_handler) {
    // ClassNames can change and break extensions functionally
    // This will update classNames as needed.

    /* let template = {
        styles: {
            background_color: [],
            items: {
                masterwork_background: '',
                background: '',
                thumbs_up_icon: '.app-icon.no-pointer-events.fas.fa-thumbs-up',
                item_image_border: '.item-img'
            }
        },
        locations: {
            dim_header: '',
            refresh_button: '.app-icon.no-pointer-events.fas.fa-sync',
            item_info: {
                perks: '',
                stats: '',
                compare: '',
                name: '',
                description: ''
            }
        }
    } */

    window.addEventListener('inventory_ready', update_classNames_1)
    function update_classNames_1() {
        let old_background_color = 'radial-gradient(circle at 50% 70px, rgb(57, 57, 86) 0%, rgb(22, 22, 39) 100%)'
        let background_color = []

        let settings = local_storage('clarity_settings')
        try {
            settings.class_names.styles.background_color.forEach(className => {
                document.querySelector(className)
            })
            document.querySelector(settings.class_names.styles.items['masterwork_background']).parentNode
            document.querySelector(settings.class_names.styles.items['background']).parentNode
            document.querySelector(settings.class_names.styles.items['thumbs_up_icon']).parentNode
            document.querySelector(settings.class_names.styles.items['item_image_border']).parentNode

            document.querySelector(settings.class_names.locations['dim_header']).parentNode
            document.querySelector(settings.class_names.locations['refresh_button']).parentNode

            window.removeEventListener('inventory_ready', update_classNames_1)
        } catch {
            update_clarity_settings('class_names.styles.items.thumbs_up_icon',    '.app-icon.no-pointer-events.fas.fa-thumbs-up')
            update_clarity_settings('class_names.styles.items.item_image_border', '.item-img')
            update_clarity_settings('class_names.locations.refresh_button',       '.app-icon.no-pointer-events.fas.fa-sync')
            find(document.body)
        }

        function find(elm) {
            let node
            for (node = elm.firstChild; node; node = node.nextSibling) {
                if (node.nodeType != 1) continue // 1 == Element
                let insanity_1 = window.getComputedStyle(node, '::before')
                let insanity_2 = window.getComputedStyle(node)

                // background before
                if(insanity_1.background.includes(old_background_color)) {
                    background_color.push(`.${[...node.classList].join('.')}::before`)
                    update_clarity_settings('class_names.styles.background_color', background_color)
                }
                // background
                if(insanity_2.background.includes(old_background_color)) {
                    background_color.push(`.${[...node.classList].join('.')}`)
                    update_clarity_settings('class_names.styles.background_color', background_color)
                }

                // header
                if(node.href?.includes('/d2/organizer')) {
                    update_clarity_settings('class_names.locations.dim_header', `.${[...node.parentNode.classList].join('.')}`)
                }

                // masterwork item background
                if(
                    insanity_2.backgroundColor == 'rgb(234, 222, 139)'
                    &&
                    node.firstChild.nodeName == 'SPAN'
                ) {
                    update_clarity_settings('class_names.styles.items.masterwork_background', `.${[...node.classList].join('.')}`)
                }

                // item background
                if(
                    insanity_2.backgroundColor == 'rgb(221, 221, 221)'
                    &&
                    node.firstChild?.nodeName == 'SPAN'
                ) {
                    update_clarity_settings('class_names.styles.items.background', `.${[...node.classList].join('.')}`)
                }

                find(node)
            }
        }
        if(start_flow_handler) start()
    }

    window.addEventListener('weapon_pressed', update_classNames_2)
    function update_classNames_2() {
        console.log('weapon_pressed');
        let settings = local_storage('clarity_settings')
        try {
            document.querySelector(settings.class_names.locations.item_info['perks']).parentNode
            document.querySelector(settings.class_names.locations.item_info['stats']).parentNode
            document.querySelector(settings.class_names.locations.item_info['compare']).parentNode
            document.querySelector(settings.class_names.locations.item_info['name']).parentNode

            window.removeEventListener('weapon_pressed', update_classNames_2)
        } catch {
            update_clarity_settings(
                'class_names.locations.item_info.perks',
                `.${[...document.querySelector('.item-details-body > .sockets > :nth-child(2)').classList].join('.')}`
            )
            update_clarity_settings(
                'class_names.locations.item_info.stats',
                `.${[...document.querySelector('.item-details > :nth-child(1)').classList].join('.')}`
            )
            update_clarity_settings(
                'class_names.locations.item_info.compare',
                '.app-icon.no-pointer-events.fas.fa-balance-scale-left'
            )
            find(document.querySelector('.item-popup'))
        }

        function find(elm) {
            let node
            for (node = elm.firstChild; node; node = node.nextSibling) {
                if (node.nodeType != 1) continue // 1 == Element

                if(node.nodeName == 'A') {
                    update_clarity_settings('class_names.locations.item_info.name', `.${[...node.classList].join('.')}`)
                }

                find(node)
            }
        }
    }

    window.addEventListener('armor_pressed', update_classNames_3)
    function update_classNames_3() {
        console.log('armor_pressed');
        let settings = local_storage('clarity_settings')
        try {
            document.querySelector(settings.class_names.locations.item_info['description']).parentNode

            window.removeEventListener('armor_pressed', update_classNames_3)
        } catch {
            update_clarity_settings(
                'class_names.locations.item_info.description',
                `.${[...document.querySelector('.item-details-body > .sockets > :nth-child(1)').classList].join('.')}`
            )
        }
    }
}