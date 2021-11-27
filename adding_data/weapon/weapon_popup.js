//--- weapon press event
document.querySelector('#app').addEventListener('click', weapon_click_listener, {passive: true})
function weapon_click_listener(event) {
   const target = event?.path.find(element =>
      element.className == 'item' && element.id // weapon or armor
   )
   if (!target) return
   if (clarity_user_data[target.id]?.item_type != 'weapon') return

   async function check_element(dim_selector) {
      while (document.querySelector(dim_selector) == undefined) {
         await new Promise(resolve => requestAnimationFrame(resolve))
      }
      return
   }
   check_element('.item-popup')
   .then(() => {
      const clarity_popup = document.querySelector('#weapon_popup')
      if (clarity_popup) {
         clarity_popup.dispatchEvent(new CustomEvent('update', {detail: target.id}))
      } else {
         create_weapon_popup(target.id)
      }
   })
}
function create_weapon_popup(unique_id) {
   const weapon_popup = Vue.createApp({
      data() {
         const unique_item = clarity_user_data[unique_id],
               static_item = clarity_manifest[unique_item.id]
         return {
            unique_item: unique_item,
            static_item: static_item,




            weapon: {
               ammo_img: 'https://bungie.net/common/destiny2_content/icons/dc4bb9bcdd4ae8a83fb9007a51d7d711.png', //todo add this
               power_lvl: '420-69', //todo add this
               damage_type_img: 'https://bungie.net/common/destiny2_content/icons/91fe40e7d2ed2edbce42aa0b1917fd73.png', //todo add this
               breaker_img: '' //todo add this
            }
         }
      },
      template: vue_weapon_templates.weapon_popup.header,
      methods: {
         update(unique_id) {
            const unique_item = clarity_user_data[unique_id],
                  static_item = clarity_manifest[unique_item.id]

            this.unique_item = unique_item
            this.static_item = static_item
         },
      },
      computed: {


      }
   })
   weapon_popup.directive('click-outside', {
      mounted: (el, binding) => {
         document.querySelector('#weapon_popup')
            .addEventListener("update", event => binding.value(event.detail))
      }
   })

   const popup_container = document.createElement('div')
   popup_container.id = 'weapon_popup'
   document.querySelector('.item-popup > div > div').prepend(popup_container)
   weapon_popup.mount('#weapon_popup')
}
