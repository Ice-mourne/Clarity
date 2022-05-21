import { BungieManifest } from '@interfaces/ts/manifest/bungieManifest'
import { SocketTypeNames } from '@interfaces/ts/manifest/clarityManifest'

export function convertSocketType(manifest: BungieManifest) {
   const socketType = manifest.DestinySocketTypeDefinition

   return Object.entries(socketType).reduce((acc, [key, value]) => {
      const categories: { [key: string]: SocketTypeNames } = {
         // magazines_gl
         1041766312: 'weaponPerks',
         // grips
         1202604782: 'weaponPerks',
         // bowstrings
         1257608559: 'weaponPerks',
         // v400.empty.exotic.masterwork
         1334864500: 'catalysts',

         // enhancements.raid_descent
         13646368: 'mods',

         // enhancements.v2_arms
         1526202480: 'mods',

         // enhancements.exotic.aeon_cult
         164955586: 'origins',

         // enhancements.raid_v520
         1486918022: 'mods',

         // magazines
         1697972157: 'weaponPerks',

         // enhancements.v2_class_item
         1703496685: 'mods',

         // enhancements.raid_garden
         1081029832: 'mods',

         // arrows
         1744546145: 'intrinsics',

         1757026848: 'weaponPerks',

         // stocks
         1806783418: 'weaponPerks',

         // exotic_weapon_masterwork_upgrade
         1915962497: 'catalysts',

         // v400.plugs.weapons.masterworks.trackers
         // 782502718: 'trackers', // plugs.masterworks.weapons.default //! old stuff only
         1932084301: 'catalysts',

         // v530.new.linear_fusion_rifle0.masterwork
         1951259483: 'catalysts',

         // v510.new.scout_rifle0.masterwork
         196432975: 'catalysts',

         // enhancements.v2_chest
         2111701510: 'mods',

         // --- crafting.plugs.frame_identifiers
         2130769292: 'deprecated',

         // v400.plugs.weapons.masterworks
         2198080209: 'masterworks',

         // old stuff no longer used // armor mod
         1760165654: 'deprecated',

         // enhancements.season_maverick
         2207493141: 'mods',

         // enhancements.season_outlaw
         2274750776: 'mods',

         // v400.weapon.mod_empty
         2487827355: 'mods',

         // tubes
         2619833294: 'weaponPerks',

         // scopes
         2718120384: 'weaponPerks',

         // shader
         2748073883: 'craftingMaterials',

         // batteries
         2833605196: 'weaponPerks',

         // v540.new.hand_cannon0.masterwork
         2855954680: 'catalysts',
         // enhancements.elemental
         2912171003: 'mods',

         // origins
         2947756142: 'trackers',

         // mementos
         2973005342: 'shaders',

         // v540.repackage.rocket_launcher0.masterwork
         2975259730: 'catalysts',

         // v520.repackage.fusion_rifle0.masterwork
         3185182717: 'masterworks',

         // v520.new.sidearm0.masterwork
         3305750067: 'catalysts',

         // old stuff no longer used // armor perk
         3313201758: 'deprecated',

         // old stuff no longer used // armor perk
         3347429529: 'deprecated',

         // exotic_all_skins
         3356843615: 'cosmetics',

         // frames
         577918720: 'weaponPerks',

         // v530.new.trace_rifle0.masterwork
         3379994138: 'catalysts',

         // enhancements.v2_head
         3422420680: 'mods',

         // barrels
         7906839: 'weaponPerks',

         // crafting.plugs.weapons.mods.memories
         3425085882: 'no_clue',

         // guards
         3809303875: 'weaponPerks',

         // hafts
         3962145884: 'weaponPerks',

         // enhancements.raid_v600
         3940152116: 'cosmetics',

         // v460.plugs.armor.masterworks
         3945646995: 'mods',

         // old stuff no longer used // armor perk
         4048143046: 'deprecated',

         // armor_skins_empty
         4181669225: 'mementos',

         // v510.new.bow0.masterwork
         67646897: 'catalysts',

         // blades
         683359327: 'weaponPerks',

         // enhancements.v2_legs
         912441879: 'mods',

         // intrinsics //--- can be weapon frame, armor stats, exotic armor perk
         913734466: 'intrinsics',
         // enhancements.v2_general
         991069377: 'mods' // old stuff no longer used // armor perk
         // 1466776700: 'deprecated', // old stuff no longer used
         // 1175552225: 'deprecated', // old stuff no longer used
         // 2457930460: 'deprecated', // old stuff no longer used
         // 79042699: 'deprecated' // old stuff no longer used
      }

      const found = value.plugWhitelist.find((plugs) => categories[plugs.categoryHash])

      if (found) acc[key] = categories[found.categoryHash]

      return acc
   }, {} as { [key: string]: string })

   // --- filter for data.destinySets.com

   // const $InventoryItem = {} as B_InventoryItem[]
   // const $SocketType = {} as B_Manifest['DestinySocketTypeDefinition']

   // $InventoryItem
   //    .filter((v) => {
   //       return v?.sockets?.socketEntries?.find((socket) =>
   //          $SocketType?.[socket.socketTypeHash]?.plugWhitelist?.find((z) => z?.categoryHash === 13646368)
   //       )
   //    })
   //    .show()
}
