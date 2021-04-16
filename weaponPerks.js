function changeWepPerks(){
    if(document.querySelector('._3ppxp > h2') == null){}
    else{
        var wepPerk = document.querySelector("._3ppxp > h2").innerHTML;
        var wepPerkDescription = document.querySelector("._3ppxp > div > span");
        var abc = JSON.parse(sessionStorage.getItem('abc'));
        var realoadValue = document.querySelectorAll("._3utrN")[5].textContent;
        var wepType = document.querySelector('.Xyg7s').innerText
        var wepFrame = document.querySelector('._3sBrL').innerText
        var imgLinkLegth = document.querySelector("._2D_sR > img").currentSrc.length
        function cauculation(realoadValue){
            return (abc[0] * realoadValue * realoadValue + abc[1] * realoadValue + abc[2]);
        }

        switch (wepPerk){
            case 'Air Assault':  // verify stat
                wepPerkDescription.innerText = "Gain 20 handling while airborne.\n(Verify handling)"
                break
            case 'Ambitious Assassin':  // add calculation
                wepPerkDescription.innerText = "Increases magazine capacity by 10% per kill, maximizes at 50%."
                break
            case "Archer's Tempo":
                wepPerkDescription.innerText = "On Precision Hit:\nSets drawtime to 440ms for 3 seconds."
                break
            case 'Auto-Loading Holster':
                wepPerkDescription.innerText = "The holstered weapon is automatically reloaded after 3 seconds."
                break
            case 'Backup Plan':
                wepPerkDescription.innerText = "Sets impact to (55) Rapid-Fire Fusion Rifle archetype.\nSets charge time to 460ms. 100 Handling when readied for 4 seconds."
                break
            case 'Bottomless Grief':  // add calculation
                wepPerkDescription.innerText = "If Last Guardian Standing:\nKills reload Magazine.\nPassively grants +30 Magazine Stat (Season 14)"
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
                                wepPerkDescription.innerText = text + sniper_Aggresive + sniper_other + linear + scout + range_acc
                                break
                            default:
                                wepPerkDescription.innerText = text + sniper_other + sniper_Aggresive + linear + scout + range_acc
                                break
                        };
                        break
                    case 'Linear Fusion Rifle':
                        wepPerkDescription.innerText = text + linear + sniper_Aggresive + sniper_other + scout + range_acc
                        break
                    case 'Scout Rifle':
                        wepPerkDescription.innerText = text + scout + sniper_Aggresive + sniper_other + linear + range_acc
                        break
                }
                break
            case 'Celerity': // add calculation
                wepPerkDescription.innerText = "If Last Guardian Standing:\n100 Handling, Reload and Aim Assist\nMassively decreased flinch received\nIncreased accuracy\nStronger scope highlight\nEnables radar while ADS\nPassive 18 Handling and Reload (Season 14)"
                break
            case 'Chain Reaction': // no usefulff data yet
                //wepPerkDescription.innerText = "Test shotguns"
                break
            case 'Clown Cartridge':
                wepPerkDescription.innerText = "Randomly increases magazine between 10% to 50% on Reload.\n Duble magazine for Rocket Launchers"
                break
            case 'Demolitionist':
                if(imgLinkLegth === 275){
                    wepPerkDescription.innerText = "Kills grant 10% Grenade Ability Energy.\nUsing your grenade ability refreshes magazine. 3 second cooldown.\n20% for special weapons."
                } else{
                        wepPerkDescription.innerText = "Kills grant 20% Grenade Ability Energy.\nUsing your grenade ability refreshes magazine. 3 second cooldown.\n10% for kinetic weapons."
                    }
                break
            case 'Desperado': // dmg perk
                wepPerkDescription.innerText = "Reloading within 6 seconds after a Precision Kill increases your Rate of Fire to 600RPM for 7 seconds. Reduces damage by 20%\nCan be refreshed."
                break
            case 'Disruption Break': // dmg perk
                wepPerkDescription.innerText = "On Elemental/Barrier or Guardian shield break: Applies a debuff that grants 50% increased kinetic damage for 5.5 seconds."
                break
            case 'Dragonfly': // add data
                wepPerkDescription.innerText = "Precision Kills explode the target, dealing the weapon's element damage over a 3 meter radius.\nDamage is not increased by Weapon Perks.\nDragonfly Spec grants 50% more damage and radius."
                break
            case 'Dual Loader':  // add calculation
                wepPerkDescription.innerText = "Loads 2 shells at a time."
                break
            case 'Dynamic Sway Reduction':  // long text
                wepPerkDescription.innerText = "Greatly reduces inaccuracy after firing for 1 second.\nAdds +9 Stability over time.\nIn Air Accuracy is still inaccurate unless used alongside Icarus Grip, but DSR improves it."
                break
            case 'Elemental Capacitor':  // add calculation // needs more work because its alredy shows stats
                //wepPerkDescription.innerText = "Grants stat bonuses depending on selected Light Subclass.\nSolar: 45 Reload | Arc: 45 Handling | Void: 18 Stability"
                break
            case 'Explosive Payload':
                wepPerkDescription.innerText = "Splits 50% of damage into explosive damage with no fall off and increase DMG\n[PVE] 11% Precision Damage 15% Body\n[PVP] Total damage almost same."
                break
            case 'Explosive Head':
                wepPerkDescription.innerText = "Splits 55% of damage into explosive damage with no fall off and increase DMG\nDetonates after 0.6 seconds\n[PVE] 12% Precision Damage 16% Body\n[PVP] Total damage almost same."
                break
            case 'Eye of the Storm': // data incomplete not adding for now
                //wepPerkDescription.innerText = ""
                break
            case 'Feeding Frenzy':
                wepPerkDescription.innerText = "Kills increase reload speed for 3.5 seconds. Refreshes on kill.\rStack  | Time   | Stat   | Multiplier\r1x       |  " + Math.min(cauculation(realoadValue * 1 + 10), 100).toFixed(2) + 's  | 10     | -\r2x       |  ' + Math.min((cauculation(realoadValue * 1 + 45) * 0.9), 100).toFixed(2) + 's  | 45     | 0.9\r3x       |  ' + Math.min((cauculation(realoadValue * 1 + 55) * 0.88), 100).toFixed(2) + 's  | 55     | 0.88\r4x       |  ' + Math.min((cauculation(realoadValue * 1 + 70) * 0.85), 100).toFixed(2) + 's  | 70     | 0.85\r5x       |  ' + Math.min((cauculation(realoadValue * 1 + 100) * 0.8), 100).toFixed(2) + 's  | 100   | 0.8'
                break               
            case 'Field Prep':// verify data
                wepPerkDescription.innerText = "If crouched:\nReload time " + Math.min((cauculation(realoadValue * 1 + 45) * 0.8), 100).toFixed(2) + 's\n45 Reload with 0.8x Multiplier\n20 Handling to Ready/Stow Speed.'
                break
            case 'Firing Line':
                wepPerkDescription.innerText = "Then near 2 or more guardians or friendly AI increase precision DMG\n25% Linear fusions & Snipers\n20% Machineguns"
                break
            case 'Firmly Planted': // Verify handling and stability
                wepPerkDescription.innerText = "If crouched: Recoil becomes (almost) entirely vertical, heavily increases accuracy, and grants ~35 Handling and ~35 Stability\n(Verify handling and stability)"
                break
            case "Fourth Time's The Charm":
                wepPerkDescription.innerText = "4 Precision Hits up to 2.5s between shots generate 2 bullets to the magazine."
                break
            case 'Frenzy': // verify data
                wepPerkDescription.innerText = "12s After taking / dealing DMG:\nReload time " + Math.min(cauculation(realoadValue * 1 + 50), 100).toFixed(2) + "s\n15% DMG, 50 handling, 50 reload\nEnds if no DMG taken / dealt for 5s\nActives on stoved weapon to"
                break
            case 'Full Auto Trigger System': // maybe add shotgun part only to shotguns?
                wepPerkDescription.innerText = "Makes weapon Full Auto.\n10% Faster Fire Rate on Shotguns."
                break
            case 'Genesis':
                wepPerkDescription.innerText = "On elemental or Barrier Champion's Shield break: Reloads magazine\nEnergy weapons generate 1 ammo per hit against matching elemental shields"
                break
            case 'Grave Robber':
                wepPerkDescription.innerText = "On Melee Kill:\nPrimary Weapons get free ammo to magazine\nSpecial and Power Weapons get ammo to magazine from reserves."
                break
            case 'Headseeker':
                wepPerkDescription.innerText = "Headshots mid burst after hitting at least one bodyshot receive 8% increased precision damage"
                break
            case 'High-Impact Reserves':
                wepPerkDescription.innerText = "Gradual damage increase, starting at 50% of magazine left\n[PVE] 12% to 26%\n[PVP] 4% to 6%"
                break
            case 'Hip-fire Grip':
                wepPerkDescription.innerText = "If hipfiring:\n1.2x Aim Assist Falloff\n15 Aim Assist\n+1.7 degrees precision angle threshold\n30% more accuracy and 30 Stability\nVerify stability"
                break
            case 'Impulse Amplifier': // verify Velocity
                wepPerkDescription.innerText = "Reduce Reload time to " + Math.min((cauculation(realoadValue * 1 + 10) * 0.8), 100).toFixed(2) + "s\n(10 Reload with 0.8x Multiplier)\n13% Faster Projectile Velocity\nVerify Velocity"
                break
            case 'Iron Gaze': // add calculation
                wepPerkDescription.innerText = "20 Aim Assist and -36 Range."
                break
            case 'Iron Grip':
                wepPerkDescription.innerText = "Reload time " + Math.max(cauculation(realoadValue * 1 + -36), 10).toFixed(2) + "(-36 Reload Speed)\n18 Stability"
                break
            case 'Iron Reach': // add calculation
                wepPerkDescription.innerText = "18 Range and -36 Stability"
                break
            case 'Kickstart': // add data
                wepPerkDescription.innerText = "20% damage and 100ms faster charge time during a slide after sprinting for 1.5 second."
                break
            case 'Kill Clip':
                wepPerkDescription.innerText = "Reloading after Kill increse DMG by:\n 33% (Precision) 30% (Body)"
                break
            case 'Killing Wind': // Verify handling
                wepPerkDescription.innerText = "On Kill:\n20 Range, 50 Mobility, 40 Handling.\nLasts 6 seconds and is refreshed on kill.\nVerify handling"
                break
            case 'Lasting Impression': // dmg perk
                wepPerkDescription.innerText = "Rockets attach on impact and detonate after 3 seconds, dealing 20% more blast damage."
                break
            case 'Lead from Gold':
                wepPerkDescription.innerText = "On Power Ammo Pickup: Grants the equivalent of 1 Special Ammo Pickup."
                break
            case 'Moving Target':
                wepPerkDescription.innerText = "10 Aim Assist. 3% Reduced Movement Speed Penalty from ADS and Strafing"
                break
            case 'Mulligan':
                wepPerkDescription.innerText = "20% chance on miss to generate 1 bullet to magazine."
                break
            case 'Multikill Clip':
                wepPerkDescription.innerText = "Reloading after Kills increse DMG for 5s by:\n1x 17% 2x 33% 3x 50%"
                break
            case 'No Distractions':
                wepPerkDescription.innerText = "After being scoped for 1 second without firing: Strongly reduced flinch."
                break
            case 'One for All':
                wepPerkDescription.innerText = "Damaging 3 Separate Combatants within 3s gives 35% DMG buff for 10s"
                break
            case 'One-Two Punch':
                wepPerkDescription.innerText = "Hitting an enemy with every pellet in a shot increases melee damage\n200% to Minors & Majors\n350% to Ultras\n80% to any with Liar's Handshake"
                break
            case 'Opening Shot': // ------------------------??? confirm first
                wepPerkDescription.innerText = "5-12% increased range, 25% accuracy on the first shot.\n3.1 second cooldown after not firing."
                break
            case 'Osmosis': // no useful information to add
                //wepPerkDescription.innerText = "Using your grenade ability changes the weapon damage type to match selected Light subclass until stowed."
                break
            case 'Outlaw':
                wepPerkDescription.innerText = "On Precision Kill:\nReload time" + Math.min((cauculation(realoadValue * 1 + 63) * 0.9), 100).toFixed(2) + 's\n"(63 Reload with 0.9x Multiplier)\nfor 6 seconds'
                break
            case 'Overflow':
                wepPerkDescription.innerText = "Refills magazine to double capacity on Special/Power Ammo pickup."
                break
            case 'Pulse Monitor':
                wepPerkDescription.innerText = "On Critical Health:\nReloads weapon (Held or Stowed), 45 Handling, 5% Faster Swap Speed."
                break
            case 'Quickdraw': // add data
                //wepPerkDescription.innerText = ""
                break
            case 'Rampage':
                wepPerkDescription.innerText = "Kills increare DMG for 3.5s\n1x 10%\n2x 21%\n3x 33%\nWith Rampage spec mod 4.5s"
                break
            case 'Rangefinder': // add calculation
                wepPerkDescription.innerText = "10% Increased Zoom when ADS.\n5% Faster Projectile Speed when ADS."
                break
            case 'Rapid Hit': // add data  // add calculation
            wepPerkDescription.innerText = "Precision hits build Rapid Hit stacks (2s duration), granting \rStack  | Reload time / Stat | Stability\r1x       |  " + Math.min(cauculation(realoadValue * 1 + 5), 100).toFixed(2) + 's             / 5     | 5\r2x       |  ' + Math.min(cauculation(realoadValue * 1 + 27), 100).toFixed(2) + 's             / 27   | 10\r3x       |  ' + Math.min(cauculation(realoadValue * 1 + 32), 100).toFixed(2) + 's             / 32   | 15\r4x       |  ' + Math.min(cauculation(realoadValue * 1 + 40), 100).toFixed(2) + 's             / 40   | 20\r5x       |  ' + Math.min(cauculation(realoadValue * 1 + 54), 100).toFixed(2) + 's             / 54   | 23'
                break
            case 'Reconstruction':
                wepPerkDescription.innerText = "After not shooting for 4 seconds:\nReloads 10% of base magazine. Maxes out at double magazine size."
                break
            case 'Shield Disorient': // Verify data
                wepPerkDescription.innerText = "On Matching Elemental Shield Break:\nExplosion disorients enemies within 7 meters for 5 seconds\nverify"
                break
            case 'Slideshot':
                wepPerkDescription.innerText = "On Slide:\nReloads 15% of magazine\n20 Range\n50 Stability\nOnly buffs first shot\nLasts 3s. 2.5s cooldown"
                break
            case 'Slideways': // Verify data
                wepPerkDescription.innerText = "On Slide:\nReloads 15% of magazine\n20 Stability\n25 Handling\nLasts 3s. ~2.5s cooldown.\nVerify stability, handling and cooldown"
                break
            case 'Snapshot Sights':
                wepPerkDescription.innerText = "Greatly faster ADS.\n33% Faster than 100 Handling."
                break
            case 'Sneak Bow':
                wepPerkDescription.innerText = "Prevents ping on radar after shooting while crouched. Increases hold time by 25%"
                break
            case 'Subsistence':
                wepPerkDescription.innerText = "Reloads 18-20% of Magazine per kill.\nReduces maximum reserves by about 35%"
                break
            case 'Surplus': // add data  // add calculation
                //wepPerkDescription.innerText = ""
                break
            case 'Surrounded': // add data
                //wepPerkDescription.innerText = ""
                break
            case 'Swashbuckler':
                wepPerkDescription.innerText = "Weapon and melle kills increase DMG for 4.5s:\n1x 5% 2x 12% 3x 19% 4x 26% 5x 30%\nMelle kill instantly gives 5x"
                break
            case 'Sympathetic Arsenal':
                wepPerkDescription.innerText = "Reloading up to 6s after a final blow also reloads stowed weapons."
                break
            case 'Tap The Trigger': // add data
                //wepPerkDescription.innerText = ""
                break
            case 'Threat Detector':
                wepPerkDescription.innerText = "When enemies are in 15m\n1x Reload time " + Math.min(cauculation(realoadValue * 1 + 15), 100).toFixed(2) + "s | Stat 15\n1x 15 Stability, 20 Handling\n2x Reload time " + Math.min(cauculation(realoadValue * 1 + 55), 100).toFixed(2) + "s | Stat 55\n2x 40 Stability, 40 Handling"
                break
            case 'Thresh':
                switch(imgLinkLegth){
                    case 345:
                        wepPerkDescription.innerText = 'Kills generate more super energy\nSpecial\nPVE +1.5% - PVP +1%\nPrimary & Heavy\nPVE +1% - PVP +1%'
                        break
                    default:
                        wepPerkDescription.innerText = 'Kills generate more super energy\nPrimary & Heavy\nPVE +1% - PVP +1%\nSpecial\nPVE +1.5% - PVP +1%'
                        break
                }
                break
            case 'Timed Payload':
                wepPerkDescription.innerText = "Splits 55% of damage into explosive damage with no fall off and increase DMG\nDetonates after 0.6 seconds\n[PVE] 12% Precision Damage 16% Body\n[PVP] Total damage almost same."
                break
            case 'Trench Barrel':
                wepPerkDescription.innerText = "After Melee Hit 50% DMG buff for 5s up to 3 shots"
                break
            case 'Triple Tap':
                wepPerkDescription.innerText = "3 Precision Hits up to 2.5s between shots generate 1 bullets to the magazine."
                break
            case 'Under Pressure':
                wepPerkDescription.innerText = "As magazine goes below 50% until empty. 25% to 50% increased Accuracy and up to 20 stability."
                break
            case 'Underdog': // add data
                //wepPerkDescription.innerText = ""
                break
            case 'Unrelenting': // add data
                //wepPerkDescription.innerText = ""
                break
            case 'Vorpal Weapon':
                //wepPerkDescription.innerText = ""
                break
            case 'Wellspring':
                wepPerkDescription.innerText = "Kills generate 7.5% Ability Energy split equally to all uncharged abilities."
                break
            case 'Zen Moment':
                wepPerkDescription.innerText = "On hits:\nRemoves Reticle Bounce and Reduces Weapon Shake. Visual only."
                break
/*            case '':
                wepPerkDescription.innerText = ""
                break
            case '':
                wepPerkDescription.innerText = ""
                break
            case '':
                wepPerkDescription.innerText = ""
                break
            case '':
                wepPerkDescription.innerText = ""
                break
*/
        }
        }
}