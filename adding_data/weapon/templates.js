const vue_weapon_templates = {
   weapon_popup: {
      header: /*html*/`
         <div class="weapon_popup_header" v-click-outside="update">
               <a class="name">{{ weapon.name }}</a>
               <div class="info">
                  <div class="left">
                     <div class="type">{{ weapon.type }}</div>
                     <img class="ammo" :src="ammo_img">
                     <img class="breaker" :src="breaker_img" v-if="breaker_img">
                  </div>
                  <div class="right">
                     <img class="damage_type" :src="damage_type_img" v-if="damage_img">
                     <div class="power_lvl">{{ weapon.power_lvl }}</div>
                  </div>
               </div>
         </div>
      `,
   }
}