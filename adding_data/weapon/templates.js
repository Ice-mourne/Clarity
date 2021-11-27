const vue_weapon_templates = {
   weapon_popup: {
      header: /*html*/`
         <div class="popup_header" :class="static_item.tier" v-click-outside="update">
               <a class="name">{{ static_item.name }}</a>
               <div class="info">
                  <div class="left">
                     <div class="type">{{ static_item.type }}</div>
                     <img class="ammo" :src="weapon.ammo_img">
                     <img class="breaker" :src="weapon.breaker_img" v-if="weapon.breaker_img">
                  </div>
                  <div class="right">
                     <img class="damage_type" :src="weapon.damage_type_img" v-if="weapon.damage_type_img">
                     <div class="power_lvl">{{ weapon.power_lvl }}</div>
                  </div>
               </div>
         </div>
      `,
      stats: /*html*/`
         <div class="stats">
            <div v-for=" ">
            {{  }}
            
            
            
            </div>
         </div>
      `,
   }
}