function change_On_Hover_Over(){
    if(document.querySelector('._3ppxp > h2') == null){}
    else{
        if(document.querySelectorAll("._3utrN")[5] == undefined){}
            else{var realoadValue = document.querySelectorAll("._3utrN")[5].textContent;
        } // for some reason, one of my "Bad Quest" swords have 1 stat less than others and caused an error
        var perk_mod = document.querySelector("._3ppxp > h2").innerHTML;
        var perk_description = document.querySelector("._3ppxp > div > span");
        var mod_descriptions = document.querySelector("._3ppxp > div > div > span");
        var abc = JSON.parse(sessionStorage.getItem('abc'));
        var wepType = document.querySelector('.Xyg7s').innerText
        var wepFrame = document.querySelector('._3sBrL').innerText
        var imgLinkLegth = document.querySelector("._2D_sR > img").currentSrc.length
        function cauculation(realoadValue){
            return (abc[0] * realoadValue * realoadValue + abc[1] * realoadValue + abc[2]);
        }

        // Weapon perks
        switch (perk_mod){
            case 'Air Assault':  // verify stat
                perk_description.innerText = "Gain 20 handling while airborne.\n(Verify handling)"
                break
            case 'Ambitious Assassin':  // add calculation
                perk_description.innerText = "Increases magazine capacity by 10% per kill, maximizes at 50%."
                break
            case "Archer's Tempo":
                perk_description.innerText = "On Precision Hit:\nSets drawtime to 440ms for 3 seconds."
                break
            case 'Armor-Piercing Rounds':
                perk_description.innerText = "Rounds cause 5% extra damage to combatants' shields and overpenetrate targets."
                break
            case "Assassin's Blade":
                perk_description.innerText = "Kills increse DMG by 15% and speed by ? for 5s"
                break
            case 'Auto-Loading Holster':
                perk_description.innerText = "The holstered weapon is automatically reloaded after 3 seconds."
                break
            case 'Backup Plan':
                perk_description.innerText = "Sets impact to (55) Rapid-Fire Fusion Rifle archetype.\nSets charge time to 460ms. 100 Handling when readied for 4 seconds."
                break
            case 'Bottomless Grief':  // add calculation
                perk_description.innerText = "If Last Guardian Standing:\nKills reload Magazine.\nPassively grants +30 Magazine Stat (Season 14)"
                break
            case 'Box Breathing': // confirm data is it 1s or 1.5s is linears 33% or 40%
                let text = 'After scoping for 1.5s and not firing presition DMG increased by:'
                let sniper_Aggresive = '\n37% Snypers (Aggressive)'
                let sniper_other = '\n31% Snypers (Rapidfire & Adaptive)'
                let linear = '\n33% Linear Fusion Rifles'
                let scout = '\n66% Scout Rifles'
                let range_acc = '\nRange by X and Acuracy by Y'
                switch (wepType){
                    case 'Sniper Rifle':
                        switch (wepFrame){
                            case 'Aggressive Frame':
                                perk_description.innerText = text + sniper_Aggresive + sniper_other + linear + scout + range_acc
                                break
                            default:
                                perk_description.innerText = text + sniper_other + sniper_Aggresive + linear + scout + range_acc
                                break
                        };
                        break
                    case 'Linear Fusion Rifle':
                        perk_description.innerText = text + linear + sniper_Aggresive + sniper_other + scout + range_acc
                        break
                    case 'Scout Rifle':
                        perk_description.innerText = text + scout + sniper_Aggresive + sniper_other + linear + range_acc
                        break
                }
                break
            case 'Celerity': // add calculation
                perk_description.innerText = "If Last Guardian Standing:\n100 Handling, Reload and Aim Assist\nMassively decreased flinch received\nIncreased accuracy\nStronger scope highlight\nEnables radar while ADS\nPassive 18 Handling and Reload (Season 14)"
                break
            case 'Chain Reaction': // no usefulff data yet
                //perk_description.innerText = "Test shotguns"
                break
            case 'Clown Cartridge':
                perk_description.innerText = "Randomly increases magazine between 10% to 50% on Reload.\nDuble magazine for Rocket Launchers"
                break
            case 'Cluster Bomb': //------------------------------------------
                perk_description.innerText = "Rocket on impact generates 8 additional cluster bombs. Each bomb deals about 3% additional damage.\nOn paper up to 24% extra DMG"
                break
            case 'Counterattack':
                perk_description.innerText = "Block an attack immediately after Guarding increases DMG by 50% for 2s."
                break
            case 'Death at First Glance':
                perk_description.innerText = "Whyle ADS first shot provides 33% damage increase.\nPreserve bonus on Precision and / or Elemental Shields Hits.\nRegain Buff after 3 seconds of not firing."
                break
            case 'Demolitionist':
                if(imgLinkLegth === 275){
                    perk_description.innerText = "Kills grant 10% Grenade Ability Energy.\nUsing your grenade ability refreshes magazine. 3 second cooldown.\n20% for special weapons."
                } else{
                        perk_description.innerText = "Kills grant 20% Grenade Ability Energy.\nUsing your grenade ability refreshes magazine. 3 second cooldown.\n10% for kinetic weapons."
                    }
                break
            case 'Desperado': // dmg perk
                perk_description.innerText = "Reloading within 6 seconds after a Precision Kill increases your Rate of Fire to 600RPM for 7 seconds. Reduces damage by 20%\nCan be refreshed."
                break
            case 'Disruption Break': // dmg perk
                perk_description.innerText = "On Elemental/Barrier or Guardian shield break: Applies a debuff that grants 50% increased kinetic damage for 5.5 seconds."
                break
            case 'Dragonfly': // add data
                perk_description.innerText = "Precision Kills explode the target, dealing the weapon's element damage over a 3 meter radius.\nDamage is not increased by Weapon Perks.\nDragonfly Spec grants 50% more damage and radius."
                break
            case 'Dual Loader':  // add calculation
                perk_description.innerText = "Loads 2 shells at a time."
                break
            case 'Dynamic Sway Reduction':  // long text
                perk_description.innerText = "Greatly reduces inaccuracy after firing for 1 second.\nAdds +9 Stability over time.\nIn Air Accuracy is still inaccurate unless used alongside Icarus Grip, but DSR improves it."
                break
            case 'Elemental Capacitor':  // add calculation // needs more work because its alredy shows stats
                //perk_description.innerText = "Grants stat bonuses depending on selected Light Subclass.\nSolar: 45 Reload | Arc: 45 Handling | Void: 18 Stability"
                break
            case 'Explosive Payload':
                perk_description.innerText = "Splits 50% of damage into explosive damage with no fall off and increase DMG\n[PVE] 11% Precision Damage 15% Body\n[PVP] Total damage almost same."
                break
            case 'Explosive Head':
                perk_description.innerText = "Splits 55% of damage into explosive damage with no fall off and increase DMG\nDetonates after 0.6 seconds\n[PVE] 12% Precision Damage 16% Body\n[PVP] Total damage almost same."
                break
            case 'Eye of the Storm': // data incomplete not adding for now
                //perk_description.innerText = ""
                break
            case 'Feeding Frenzy':
                perk_description.innerText = "Kills increase reload speed for 3.5 seconds. Refreshes on kill.\rStack  | Time   | Stat   | Multiplier\r1x       |  " + Math.min(cauculation(realoadValue * 1 + 10), 100).toFixed(2) + 's  | 10     | -\r2x       |  ' + Math.min((cauculation(realoadValue * 1 + 45) * 0.9), 100).toFixed(2) + 's  | 45     | 0.9\r3x       |  ' + Math.min((cauculation(realoadValue * 1 + 55) * 0.88), 100).toFixed(2) + 's  | 55     | 0.88\r4x       |  ' + Math.min((cauculation(realoadValue * 1 + 70) * 0.85), 100).toFixed(2) + 's  | 70     | 0.85\r5x       |  ' + Math.min((cauculation(realoadValue * 1 + 100) * 0.8), 100).toFixed(2) + 's  | 100   | 0.8'
                break               
            case 'Field Prep':// verify data
                perk_description.innerText = "If crouched:\nReload time " + Math.min((cauculation(realoadValue * 1 + 45) * 0.8), 100).toFixed(2) + 's\n45 Reload with 0.8x Multiplier\n20 Handling to Ready/Stow Speed.'
                break
            case 'Firing Line':
                perk_description.innerText = "Then near 2 or more guardians or friendly AI increase precision DMG\n25% Linear fusions & Snipers\n20% Machineguns"
                break
            case 'Firmly Planted': // Verify handling and stability
                perk_description.innerText = "If crouched: Recoil becomes (almost) entirely vertical, heavily increases accuracy, and grants 35 Handling and 35 Stability\n(Verify handling and stability)"
                break
            case "Fourth Time's the Charm":
                perk_description.innerText = "Landing 4 Precision Hits up to 2.5s between shots generate 2 bullets to the magazine."
                break
            case 'Frenzy': // verify data
                perk_description.innerText = "12s After taking / dealing DMG:\nReload time " + Math.min(cauculation(realoadValue * 1 + 50), 100).toFixed(2) + "s\n15% DMG, 50 handling, 50 reload\nEnds if no DMG taken / dealt for 5s\nActives on stoved weapon to"
                break
            case 'Full Auto Trigger System': // maybe add shotgun part only to shotguns?
                perk_description.innerText = "Makes weapon Full Auto.\n10% Faster Fire Rate on Shotguns."
                break
            case 'Full Court':
                //perk_description.innerText = "Increase explosion DMG depending on how far grenade traveled\nFrom 10m to 50m 0.625% for every meter traveled up to 25% more DMG at 50m"
                break
            case 'Genesis':
                perk_description.innerText = "On elemental or Barrier Champion's Shield break: Reloads magazine\nEnergy weapons generate 1 ammo per hit against matching elemental shields"
                break
            case 'Grave Robber':
                perk_description.innerText = "On Melee Kill:\nPrimary Weapons get free ammo to magazine\nSpecial and Power Weapons get ammo to magazine from reserves."
                break
            case 'Headseeker':
                perk_description.innerText = "Headshots mid burst after hitting at least one bodyshot receive 8% increased precision damage"
                break
            case 'High-Impact Reserves':
                perk_description.innerText = "Gradual damage increase, starting at 50% of magazine left\n[PVE] 12% to 26%\n[PVP] 4% to 6%"
                break
            case 'Hip-fire Grip':
                perk_description.innerText = "If hipfiring:\n1.2x Aim Assist Falloff\n15 Aim Assist\n+1.7 degrees precision angle threshold\n30% more accuracy and 30 Stability\nVerify stability"
                break
            case 'Impact Casing':
                perk_description.innerText = "10% Increase to impact DMG"
                break
            case 'Impulse Amplifier': // verify Velocity
                perk_description.innerText = "Reduce Reload time to " + Math.min((cauculation(realoadValue * 1 + 10) * 0.8), 100).toFixed(2) + "s\n(10 Reload with 0.8x Multiplier)\n13% Faster Projectile Velocity\nVerify Velocity"
                break
            case 'Iron Gaze': // add calculation
                perk_description.innerText = "20 Aim Assist and -36 Range."
                break
            case 'Iron Grip':
                perk_description.innerText = "Reload time " + Math.max(cauculation(realoadValue * 1 + -36), 10).toFixed(2) + "(-36 Reload Speed)\n18 Stability"
                break
            case 'Iron Reach': // add calculation
                perk_description.innerText = "18 Range and -36 Stability"
                break
            case 'Kickstart': // add data
                perk_description.innerText = "20% damage and 100ms faster charge time during a slide after sprinting for 1.5 second."
                break
            case 'Kill Clip':
                perk_description.innerText = "Reloading after Kill increse DMG by:\n33% (Precision) 30% (Body)"
                break
            case 'Killing Wind': // Verify handling
                perk_description.innerText = "On Kill:\n20 Range, 50 Mobility, 40 Handling.\nLasts 6 seconds and is refreshed on kill.\nVerify handling"
                break
            case 'Lasting Impression': // dmg perk
                perk_description.innerText = "Rockets attach on impact and detonate after 3 seconds, dealing 20% more blast damage."
                break
            case 'Lead from Gold':
                perk_description.innerText = "On Power Ammo Pickup: Grants the equivalent of 1 Special Ammo Pickup."
                break
            case 'Markov Chain': // -----------------------------------------------------------
                //perk_description.innerText = ""
                break
            case 'Moving Target':
                perk_description.innerText = "10 Aim Assist. 3% Reduced Movement Speed Penalty from ADS and Strafing"
                break
            case 'Mulligan':
                perk_description.innerText = "20% chance on miss to generate 1 bullet to magazine."
                break
            case 'Multikill Clip':
                perk_description.innerText = "Reloading after Kills increse DMG for 5s by:\n1x 17% 2x 33% 3x 50%"
                break
            case 'No Distractions':
                perk_description.innerText = "After being scoped for 1 second without firing: Strongly reduced flinch."
                break
            case 'One for All':
                perk_description.innerText = "Damaging 3 Separate Combatants within 3s gives 35% DMG buff for 10s"
                break
            case 'One-Two Punch':
                perk_description.innerText = "Hitting an enemy with every pellet in a shot increases melee damage\n200% to Minors & Majors\n350% to Ultras\n80% to any with Liar's Handshake"
                break
            case 'Opening Shot': // ------------------------??? confirm first
                perk_description.innerText = "5-12% increased range, 25% accuracy on the first shot.\n3.1 second cooldown after not firing."
                break
            case 'Osmosis': // no useful information to add
                //perk_description.innerText = "Using your grenade ability changes the weapon damage type to match selected Light subclass until stowed."
                break
            case 'Outlaw':
                perk_description.innerText = "On Precision Kill:\nReload time" + Math.min((cauculation(realoadValue * 1 + 63) * 0.9), 100).toFixed(2) + 's\n"(63 Reload with 0.9x Multiplier)\nfor 6 seconds'
                break
            case 'Overflow':
                perk_description.innerText = "Refills magazine to double capacity on Special/Power Ammo pickup."
                break
            case 'Pulse Monitor':
                perk_description.innerText = "On Critical Health:\nReloads weapon (Held or Stowed), 45 Handling, 5% Faster Swap Speed."
                break
            case 'Quickdraw': // add data
                //perk_description.innerText = ""
                break
            case 'Rampage':
                perk_description.innerText = "Kills increare DMG for 3.5s\n1x 10%\n2x 21%\n3x 33%\nWith Rampage spec mod 4.5s"
                break
            case 'Rangefinder': // add calculation
                perk_description.innerText = "10% Increased Zoom when ADS.\n5% Faster Projectile Speed when ADS."
                break
            case 'Rapid Hit': // add data  // add calculation
            perk_description.innerText = "Precision hits build Rapid Hit stacks (2s duration), granting \rStack  | Reload time / Stat | Stability\r1x       |  " + Math.min(cauculation(realoadValue * 1 + 5), 100).toFixed(2) + 's             / 5     | 5\r2x       |  ' + Math.min(cauculation(realoadValue * 1 + 27), 100).toFixed(2) + 's             / 27   | 10\r3x       |  ' + Math.min(cauculation(realoadValue * 1 + 32), 100).toFixed(2) + 's             / 32   | 15\r4x       |  ' + Math.min(cauculation(realoadValue * 1 + 40), 100).toFixed(2) + 's             / 40   | 20\r5x       |  ' + Math.min(cauculation(realoadValue * 1 + 54), 100).toFixed(2) + 's             / 54   | 23'
                break
            case 'Reconstruction':
                perk_description.innerText = "After not shooting for 4 seconds:\nReloads 10% of base magazine. Maxes out at double magazine size."
                break
            case 'Shield Disorient': // Verify data
                perk_description.innerText = "On Matching Elemental Shield Break:\nExplosion disorients enemies within 7 meters for 5 seconds\nverify"
                break
            case 'Slideshot':
                perk_description.innerText = "On Slide:\nReloads 15% of magazine\n20 Range\n50 Stability\nOnly buffs first shot\nLasts 3s. 2.5s cooldown"
                break
            case 'Slideways': // Verify data
                perk_description.innerText = "On Slide:\nReloads 15% of magazine\n20 Stability\n25 Handling\nLasts 3s. ~2.5s cooldown.\nVerify stability, handling and cooldown"
                break
            case 'Snapshot Sights':
                perk_description.innerText = "Greatly faster ADS.\n33% Faster than 100 Handling."
                break
            case 'Sneak Bow':
                perk_description.innerText = "Prevents ping on radar after shooting while crouched. Increases hold time by 25%"
                break
            case 'Spike Grenades':
                //perk_description.innerText = "50% DMG increase to impact"
                break
            case 'Subsistence':
                perk_description.innerText = "Reloads 18-20% of Magazine per kill.\nReduces maximum reserves by about 35%"
                break
            case 'Surplus': // add data  // add calculation
                //perk_description.innerText = ""
                break
            case 'Surrounded': // add data
                //perk_description.innerText = ""
                break
            case 'Swashbuckler':
                perk_description.innerText = "Weapon and melle kills increase DMG for 4.5s:\n1x 5% 2x 12% 3x 19% 4x 26% 5x 30%\nMelle kill instantly gives 5x"
                break
            case 'Sympathetic Arsenal':
                perk_description.innerText = "Reloading up to 6s after a final blow also reloads stowed weapons."
                break
            case 'Tap The Trigger': // add data
                //perk_description.innerText = ""
                break
            case 'Threat Detector':
                perk_description.innerText = "When enemies are in 15m\n1x Reload time " + Math.min(cauculation(realoadValue * 1 + 15), 100).toFixed(2) + "s | Stat 15\n1x 15 Stability, 20 Handling\n2x Reload time " + Math.min(cauculation(realoadValue * 1 + 55), 100).toFixed(2) + "s | Stat 55\n2x 40 Stability, 40 Handling"
                break
            case 'Thresh':
                switch(imgLinkLegth){
                    case 345:
                        perk_description.innerText = 'Kills generate more super energy\nSpecial\nPVE +1.5% - PVP +1%\nPrimary & Heavy\nPVE +1% - PVP +1%'
                        break
                    default:
                        perk_description.innerText = 'Kills generate more super energy\nPrimary & Heavy\nPVE +1% - PVP +1%\nSpecial\nPVE +1.5% - PVP +1%'
                        break
                }
                break
            case 'Timed Payload':
                perk_description.innerText = "Splits 55% of damage into explosive damage with no fall off and increase DMG\nDetonates after 0.6 seconds\n[PVE] 12% Precision Damage 16% Body\n[PVP] Total damage almost same."
                break
            case 'Trench Barrel':
                perk_description.innerText = "After Melee Hit 50% DMG buff for 5s up to 3 shots"
                break
            case 'Triple Tap':
                perk_description.innerText = "Landing 3 Precision Hits up to 2.5s between shots generate 1 bullets to the magazine."
                break
            case 'Under Pressure':
                perk_description.innerText = "As magazine goes below 50% until empty. 25% to 50% increased Accuracy and up to 20 stability."
                break
            case 'Underdog': // add data
                //perk_description.innerText = ""
                break
            case 'Unrelenting': // add data
                //perk_description.innerText = ""
                break
            case 'Vorpal Weapon':
                perk_description.innerText = "15% Weapon DMG to Majors* & Ultras(Bosses and more)\nPVP and Majors are complicated"
                break
            case 'Wellspring':
                perk_description.innerText = "Kills generate 7.5% Ability Energy split equally to all uncharged abilities."
                break
            case 'Whirlwind Blade':
                perk_description.innerText = "FFS DM me with what to whrite hare :D\n1x 6% 2x 12% 3x 18% 4x 24% 5x 30%"
                break
            case 'Zen Moment':
                perk_description.innerText = "On hits:\nRemoves Reticle Bounce and Reduces Weapon Shake. Visual only."
                break
/*            case '':
                //perk_description.innerText = ""
                break
            case '':
                perk_description.innerText = ""
                break
            case '':
                perk_description.innerText = ""
                break
            case '':
                perk_description.innerText = ""
                break
*/
        }

        // Weapon mods
        switch(perk_mod){
            case 'Adept Big Ones Spec':
                mod_descriptions.innerText = "7.8% Damage Increase against\nElites, Minibosses, and Bosses"
                break
            case 'Adept Icarus Grip':
                //mod_descriptions.innerText = 
                break
            case 'Boss Spec':
                mod_descriptions.innerText = "7.8% Damage Increase against Bosses"
                break
            case 'Dragonfly Spec':
                mod_descriptions.innerText = "50% higher damage and radius for Dragonfly explosions"
                break
            case 'Freehand Grip':
                //mod_descriptions.innerText = 
                break
            case 'Icarus Grip':
                //mod_descriptions.innerText = 
                break
            case 'Major Spec':
                mod_descriptions.innerText = "7.8% Damage Increase against\nElites and Minibosses"
                break
            case 'Minor Spec':
                mod_descriptions.innerText = "7.8% Damage Increase against\nRank-And-File enemies"
                break
            case 'Quick Access Sling':
                //mod_descriptions.innerText = 
                break
            case 'Radar Booster':
                mod_descriptions.innerText = "Maximum Radar Distance increased by 8 meters"
                break
            case 'Rampage Spec':
                mod_descriptions.innerText = "Rampage lasts 1 second longer (3.5s -> 4.5s)"
                break
            case 'Sprint Grip':
                //mod_descriptions.innerText = 
                break
            case 'Surrounded Spec':
                mod_descriptions.innerText = "Surrounded increases damage by 10% more and persists for 1.5s after deactivation"
                break
            case 'Taken Spec':
                mod_descriptions.innerText = "10% Damage Increase against Taken"
                break

        }
        // Armor mods
        /*switch(){

        }*/
        }
}