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
         const unique_item  = clarity_user_data[unique_id],
               static_item  = clarity_manifest[unique_item.id]
               // rolled_perks = unique_item.sockets.perks.rolled || static_item.sockets.perks.curated.map(list => list.map(perk => perk.id)),
               // active_perks = unique_item.sockets.perks.active
         return {
            weapon: {
               name: static_item.name,
               type: static_item.type,
               ammo_img: '', //todo add this
               power_lvl: '', //todo add this
               tier: static_item.tier,
               damage_type_img: '', //todo add this
               breaker_img: '' //todo add this
            }
         }
      },
      template: vue_weapon_templates.weapon_popup.header,
      methods: {
         update(unique_id) {
            // if(typeof unique_id != 'string') return
            const unique_item = clarity_user_data[unique_id],
                  static_item = clarity_manifest[unique_item.id]

            this.weapon.name = static_item.name
            this.weapon.type = static_item.type
            this.weapon.tier = static_item.tier
         }
      },
      computed: {


      }
   })
   weapon_popup.directive('click-outside', {
      mounted: (el, binding) => {
         // el.clickOutsideEvent = event => {

         // }
         document.querySelector('#weapon_popup')
            .addEventListener("update", event => binding.value(event.detail))
      }
   })

   const popup_container = document.createElement('div')
   popup_container.id = 'weapon_popup'
   document.querySelector('.item-popup > div > div').prepend(popup_container)
   weapon_popup.mount('#weapon_popup')
}
