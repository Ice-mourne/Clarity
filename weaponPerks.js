function changeWepPerks(){
    if(document.querySelector('._3ppxp > h2') == null){}
    else{
        var wepPerk = document.querySelector("._3ppxp > h2").innerHTML;
        var wepPerkDescription = document.querySelector("._3ppxp > div > span");
        var abc = JSON.parse(sessionStorage.getItem('abc'));
        var realoadValue = document.querySelectorAll("._3utrN")[5].textContent;
        var wepType = document.querySelector('.Xyg7s').innerHTML.replace(/ /g, '');
        var wepFrame = document.querySelector('._3sBrL').innerHTML.replace(/ /g, '');
        
        switch (wepPerk){
            case 'Air Assault':  // verify stat
                wepPerkDescription.innerText = "Gain ~20 handling while airborne.\n(Verify handling)"
                break
            case 'Ambitious Assassin':  // add calculation
                wepPerkDescription.innerText = "Increases base magazine capacity by 10% per kill, maximizes at 50%."
                break
            case "Archer's Tempo":
                wepPerkDescription.innerText = "On Precision Hit: Sets drawtime to 440ms for 3 seconds."
                break
            case 'Auto-Loading Holster':
                wepPerkDescription.innerText = "The holstered weapon is automatically reloaded after 3 seconds."
                break
            case 'Backup Plan':
                wepPerkDescription.innerText = "Sets impact to (55) Rapid-Fire Fusion Rifle archetype.\nSets charge time to 460ms. 100 Handling when readied for 4 seconds."
                break
            case 'Bottomless Grief':  // add calculation
                wepPerkDescription.innerText = "If Last Guardian Standing:\nKills fully refresh Magazine.\nPassively grants +30 Magazine Stat (Season 14)"
                break
            case 'Box Breathing': // add data 
                //wepPerkDescription.innerText = "Test shotguns"
                break
            case 'Celerity': // add data
                //wepPerkDescription.innerText = "Test shotguns"
                break
            case 'Chain Reaction': // no usefulff data yet
                //wepPerkDescription.innerText = "Test shotguns"
                break
            case 'Clown Cartridge': // add calculation and make different for rockets
                wepPerkDescription.innerText = "Randomly increases magazine between 10% to 50% on Reload. Always rounds magazine up."
                break
            case 'Demolitionist':
                let imgLinkLegth = document.querySelector("._2D_sR > img").currentSrc.length
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
                //wepPerkDescription.innerText = "Test shotguns"
                break
            case 'Dual Loader':  // add calculation
                wepPerkDescription.innerText = "Loads 2 shells at a time. Reduces Reload Stat by 45"
                break
            case 'Dynamic Sway Reduction':  // long text
                wepPerkDescription.innerText = "Greatly reduces inaccuracy after firing for 1 second. Adds +9 Stability over time. In Air Accuracy is still inaccurate unless used alongside Icarus Grip, but DSR improves it."
                break
            case 'Elemental Capacitor':  // add calculation
                wepPerkDescription.innerText = "Grants stat bonuses depending on selected Light Subclass. Solar: 45 Reload | Arc: 45 Handling | Void: 18 Stability"
                break
            case 'Explosive Payload': // add data
                //wepPerkDescription.innerText = ""
                break
            case 'Explosive Head': // add data
                //wepPerkDescription.innerText = ""
                break
            case 'Eye of the Storm': // data incomplete not adding for now
                //wepPerkDescription.innerText = ""
                break
            case 'Feeding Frenzy':
                function cauculation(realoadValue){
                    return (abc[0] * realoadValue * realoadValue + abc[1] * realoadValue + abc[2]);
                }
                wepPerkDescription.innerText = "Kills increase reload speed for 3.5 seconds. Refreshes on kill.\rStack  | Time   | Stat   | Multiplier\r1x       |  " + Math.min(cauculation(realoadValue * 1 + 10), 100).toFixed(2) + 's  | 10     | -\r2x       |  ' + Math.min((cauculation(realoadValue * 1 + 45) * 0.9), 100).toFixed(2) + 's  | 45     | 0.9\r3x       |  ' + Math.min((cauculation(realoadValue * 1 + 55) * 0.88), 100).toFixed(2) + 's  | 55     | 0.88\r4x       |  ' + Math.min((cauculation(realoadValue * 1 + 70) * 0.85), 100).toFixed(2) + 's  | 70     | 0.85\r5x       |  ' + Math.min((cauculation(realoadValue * 1 + 100) * 0.8), 100).toFixed(2) + 's  | 100   | 0.8'
                break               
            case 'Field Prep':   // add calculation // verify data
                wepPerkDescription.innerText = "If crouched: 45 Reload with 0.8x Multiplier and ~20 Handling to Ready/Stow Speed.\n+30 Inventory Size."
                break
            case 'Firing Line': // add data
                //wepPerkDescription.innerText = ""
                break
            case 'Firmly Planted': // Verify handling and stability
                wepPerkDescription.innerText = "If crouched: Recoil becomes (almost) entirely vertical, heavily increases accuracy, and grants ~35 Handling and ~35 Stability\n(Verify handling and stability)"
                break
            case "Fourth Time's The Charm":  // text can be better
                wepPerkDescription.innerText = "4 Precision Hits within 2.5 seconds generate 2 bullets to magazine."
                break
            case 'Frenzy': // verify data // add calculations // way to long text
                wepPerkDescription.innerText = "Being in combat for 12 seconds grants 15% increased damage, 50(?) handling, and 50 reload. \nLasts until you're out of combat. \nIt's technically a \"state\" so it works when stowed, and it also applies to all of your weapons with Frenzy. \nPerks description stolen from Pip1n spread sheet"
                break
            case 'Full Auto Trigger System': // maybe add shotgun part only to shotguns?
                wepPerkDescription.innerText = "Makes weapon Full Auto.\n10% Faster Fire Rate on Shotguns."
                break
            case 'Genesis':
                wepPerkDescription.innerText = "On elemental or Barrier Champion's Shield break: Reloads magazine. Energy weapons generate 1 ammo per hit against matching elemental shields."
                break
            case 'Grave Robber':
                wepPerkDescription.innerText = "On Melee Kill: Primary Weapons get refilled (free ammo), Special Weapons and Power Weapons get refreshed (adds ammo from reserves)."
                break
            case 'Headseeker': // add data
                //wepPerkDescription.innerText = ""
                break
            case 'High-Impact Reserves': // missing some data
                wepPerkDescription.innerText = "Gradual damage increase, starting at 50% of magazine left.\n[PVE] 12.1% to 25.6%.\n[PVP] need further testing"
                break
            case 'Hip-fire Grip': // add data
                //wepPerkDescription.innerText = ""
                break
            case 'Impulse Amplifier': // verify Velocity
                wepPerkDescription.innerText = "13% Faster Projectile Velocity and +10 Reload with 0.8x Multiplier.\nVerify Velocity"
                break
            case 'Iron Gaze': // add calculation
                wepPerkDescription.innerText = "20 Aim Assist and -36 Range."
                break
            case 'Iron Grip': // add calculation
                wepPerkDescription.innerText = "18 Stability and -36 Reload Speed."
                break
            case 'Iron Reach': // add calculation
                wepPerkDescription.innerText = "18 Range and -36 Stability"
                break
            case 'Kickstart': // add data
                //wepPerkDescription.innerText = ""
                break
            case 'Kill Clip':
                wepPerkDescription.innerText = "Reloading after Kill increse DMG by:\n 33% (Precision) 30% (Body)"
                break
            case 'Killing Wind': // Verify handling
                wepPerkDescription.innerText = "On Kill: 20 Range, 50 Mobility, ~40 Handling.\nLasts 6 seconds and is refreshed on kill.\nVerify handling"
                break
            case 'Lasting Impression': // dmg perk
                wepPerkDescription.innerText = "Rockets attach on impact and detonate after 3 seconds, dealing 20% more blast damage.\n25 Blast Radius"
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
            case 'One-Two Punch': // fuck this shit
                //wepPerkDescription.innerText = "After Melee Hit 50% DMG buff for 5s up to 3 shots"
                break
            case 'Opening Shot': // ------------------------??? confirm first
                wepPerkDescription.innerText = "5-12% increased range, 25% accuracy on the first shot.\n3.1 second cooldown after not firing."
                break
            case 'Osmosis':
                wepPerkDescription.innerText = "Using your grenade ability changes the weapon damage type to match selected Light subclass until stowed."
                break
            case 'Outlaw': // add calculation
                wepPerkDescription.innerText = "On Precision Kill:\n63 Reload with 0.9x Multiplier for 6 seconds"
                break
            case 'Overflow':
                wepPerkDescription.innerText = "Refills magazine to double capacity on Special/Power Ammo pickup."
                break
            case 'Pulse Monitor':
                wepPerkDescription.innerText = "On Critical Health:\nFully refreshes weapon (Held or Stowed), 45 Handling, 5% Faster Swap Speed."
                break
            case 'Quickdraw': // add data
                //wepPerkDescription.innerText = ""
                break
            case 'Rampage':
                wepPerkDescription.innerText = "Kills increare DMG for 3.5s\n1x 10%\n2x 21%\n 3x 33%\nWith Rampage spec mod 4.5s"
                break
            case 'Rangefinder': // add calculation
                wepPerkDescription.innerText = "10% Increased Zoom when ADS.\n5% Faster Projectile Speed when ADS."
                break
            case 'Rapid Hit': // add data  // add calculation
                //wepPerkDescription.innerText = ""
                break
            case 'Reconstruction':
                wepPerkDescription.innerText = "After not shooting for 4 seconds:\nRefreshes 10% of base magazine. Maxes out at double magazine size."
                break
            case 'Shield Disorient': // Verify data
                wepPerkDescription.innerText = "On Matching Elemental Shield Break:\nExplosion disorients enemies within 7 meters for 5 seconds\nverify"
                break
            case 'Slideshot': // add data
                //wepPerkDescription.innerText = ""
                break
            case 'Slideways': // Verify data
                wepPerkDescription.innerText = "On Slide: 15% Magazine Refreshed, ~20 Stability and ~25 Handling.\nLasts 3 seconds. ~2.5s cooldown.\nVerify stability, handling and cooldown"
                break
            case 'Snapshot Sights':
                wepPerkDescription.innerText = "Greatly faster ADS. (33% Faster than 100 Handling)"
                break
            case 'Sneak Bow':
                wepPerkDescription.innerText = "Prevents ping on radar after shooting while crouched. Increases hold time by 25%"
                break
            case 'Subsistence':
                wepPerkDescription.innerText = "Refreshes 18-20% of Magazine per kill.\nReduces maximum reserves by ~35%"
                break
            case 'Surplus': // add data  // add calculation
                //wepPerkDescription.innerText = ""
                break
            case 'Surrounded': // add data
                wepPerkDescription.innerText = ""
                break
            case 'Swashbuckler': //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                //wepPerkDescription.innerText = "Weapon and melle kills increase DMG:"
                break
            case 'Sympathetic Arsenal':
                wepPerkDescription.innerText = "Refreshes stowed weapons after reloading up to 6 seconds after a kill."
                break
            case 'Tap The Trigger': // add data
                //wepPerkDescription.innerText = ""
                break
            case 'Threat Detector': // add data
                //wepPerkDescription.innerText = ""
                break
            case 'Thresh': // add data
                //wepPerkDescription.innerText = ""
                break
            case 'Timed Payload': // add data
                //wepPerkDescription.innerText = ""
                break
            case 'Trench Barrel':
                wepPerkDescription.innerText = "After Melee Hit 50% DMG buff for 5s up to 3 shots"
                break
            case 'Triple Tap':
                wepPerkDescription.innerText = "3 Precision Hits within 2.5 seconds generate 1 bullet to magazine."
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
                wepPerkDescription.innerText = "On Kill:\nGrants 7.5% Ability Energy split equally to all uncharged abilities."
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