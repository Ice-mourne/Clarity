export const InventoryItemFixes = {
   // Tractor Cannon
   3580904581: {
      sockets: {
         socketEntries: [
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {

               reusablePlugItems: [
                  // removed dummy catalyst object
                  // replaced old catalyst with new one
                  {
                     plugItemHash: 456628589
                  },
                  {
                     plugItemHash: null // this should work because object cleaner will remove null values
                     // no object cleaner runs later
                  }
               ],
               // changed from dummy Tractor catalyst to empty catalyst socket
               singleInitialItemHash: 1498917124
            }
         ]
      }
   }

}

export const PlugSetFixes = {
   // legendary glaive frame plug set
   1431: {
      reusablePlugItems: [
         // added enhanced frame plugs
         {
            alternateWeight: 0,
            currentlyCanRoll: true,
            plugItemHash: 378204240,
            weight: 0 // Adaptive Glaive with handling
         },
         {
            alternateWeight: 0,
            currentlyCanRoll: true,
            plugItemHash: 1338909520,
            weight: 0 // Adaptive Glaive with reload speed
         },
         {
            alternateWeight: 0,
            currentlyCanRoll: true,
            plugItemHash: 1447716563,
            weight: 0 // Adaptive Glaive with shield duration
         },
         {
            alternateWeight: 0,
            currentlyCanRoll: true,
            plugItemHash: 2696719570,
            weight: 0 // Adaptive Glaive with range
         }
      ]
   }
}
