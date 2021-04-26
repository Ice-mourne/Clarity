/*                   // \\
                    // ¤ \\
                    \\ ¤ //
                     \\ //
                     (___)
                     (___)
                     (___)
        ____________ (___)____________
        \_____/\__/----\__/\_____/   /
            \ _°_[------------]_ _° /
                \_°_¤ ---- ¤_°_/
                    \ __°__ /
                     |\_°_/|
                     [|\_/|]
                     [|[¤]|]
                     [|;¤;|]
                     [;;¤;;]
                    ;;;;¤]|]\
                   ;;;;;¤]|]-\
                  ;;;;;[¤]|]--\
                 ;;;;;|[¤]|]---\
                ;;;;;[|[¤]|]|---|
               ;;;;;[|[¤]|]|---/
                ;;;;[|[¤]|/---/
                 ;;;[|[¤]/---/
                  ;;[|[¤/---/
                   ;[|[/---/
                    [|/---/
                     /---/
                    /---/|]
                   /---/]|];
                  /---/¤]|];;
                 |---|[¤]|];;;
                 |---|[¤]|];;;
                  \--|[¤]|];;
                   \-|[¤]|];
                     \|[¤]|]
                      \\¤//
                       \|/
                        V
*/
function perk_pressed(perks_name){
    let perk = perks_name;
    let perk_description = document.querySelector('[class^="ItemPerksList-m_perkInfo-"] > div > span');
    let abc = JSON.parse(sessionStorage.getItem('abc'));
    let wepType = document.querySelector('[class^="ItemPopupHeader-m_itemType-"]').innerText;
    let wepFrame = document.querySelector('[class^="ArchetypeSocket-m_name-"]').innerText;
    let imgLinkLegth = document.querySelector('[class^="ItemPopupHeader-m_ammoIcon-"]').currentSrc.length;
    let realoadValue = document.querySelectorAll('[class^="ItemStat-m_value-"]')[5].innerText;
    let mag_size = document.querySelectorAll('[class^="ItemStat-m_value-"]')[9].innerText;
    run_Perks(perk, perk_description, abc, wepType, wepFrame, imgLinkLegth, realoadValue, mag_size);
};

function change_On_Hover_Over(){
    let version = document.querySelector('._1xEii') !== null;
    let realoadValue = (version) ? document.querySelectorAll("._3utrN")[5].textContent : "";
    let mag_size = (version) ? document.querySelectorAll("._3utrN")[9].textContent : "";
    let perk = (version) ? document.querySelector("._3ppxp > h2").textContent : "";
    let mod = (version) ? document.querySelector("._3ppxp > h2").textContent : document.querySelector('[class^="PressTip-m_content-"] > h2').textContent;
    let perk_description = (version) ? document.querySelector("._3ppxp > div > span") : "";
    let mod_descriptions = (version) ? document.querySelector("._3ppxp > div > div > span") : document.querySelector('[class^="PressTip-m_content-"] > div > div > span');
    let abc = JSON.parse(sessionStorage.getItem('abc'));
    let wepType = (version) ? document.querySelector('.Xyg7s').innerText : "";
    let wepFrame = (version) ? document.querySelector('._3sBrL').innerText : "";
    let imgLinkLegth = (version) ? document.querySelector("._2D_sR > img").currentSrc.length : "";
    run_Perks(perk, perk_description, abc, wepType, wepFrame, imgLinkLegth, realoadValue, mag_size);
    run_mods(mod, mod_descriptions);
};

function run_Perks(perk, perk_description, abc, wepType, wepFrame, imgLinkLegth, realoadValue, mag_size){
    function calculator(realoadValue){
        value = Math.min(Math.max(realoadValue, 10),100);
        return (abc[0] * value * value + abc[1] * value + abc[2]);
    };
    // Weapon perks
    switch (perk){
        case 'Air Assault':  // verify stat
            perk_description.innerText = "Gain ~20 handling while airborne.";
            break;
        case 'Ambitious Assassin':  // add calculation
            perk_description.innerText = "Increases magazine capacity by 10% per kill, maximizes at 50%.";
            break;
        case "Archer's Tempo":
            perk_description.innerText = "On Precision Hit:\nSets drawtime to 440ms for 3 seconds.";
            break;
        case 'Armor-Piercing Rounds':
            perk_description.innerText = "Rounds cause 5% extra damage to combatants' shields and overpenetrate targets.";
            break;
        case "Assassin's Blade":
            perk_description.innerText = "Kills increase Damage by 15% and set speed to Sprint Speed*1.13 for 5s";
            break;
        case 'Auto-Loading Holster':
            perk_description.innerText = "The holstered weapon is automatically reloaded after 3 seconds.";
            break;
        case 'Backup Plan':
            perk_description.innerText = "Sets impact to (55) Rapid-Fire Fusion Rifle archetype.\nSets charge time to 460ms. 100 Handling when readied for 4 seconds.";
            break;
        case 'Bottomless Grief':  // add calculation
            perk_description.innerText = "If Last Guardian Standing:\nKills reload Magazine.\nPassively grants +30 Magazine Stat (Season 14)";
            break;
        case 'Box Breathing': // confirm data is it 1s or 1.5s is linears 33% or 40%
            let text = 'Precision Damage, Accuracy, and Range Increase after scoping in for 1.5s without firing:';
            let sniper_Aggresive = '\n37% Snipers (Aggressive)';
            let sniper_other = '\n31% Snipers (Rapid-Fire & Adaptive)';
            let linear = '\n33% Linear Fusion Rifles';
            let scout = '\n66% Scout Rifles';
            let range_acc = '\nRange by X and Acuracy by Y';
            switch (wepType){
                case 'Sniper Rifle':
                    switch (wepFrame){
                        case 'Aggressive Frame':
                            perk_description.innerText = text + sniper_Aggresive + sniper_other + linear + scout + range_acc;
                            break;
                        default:
                            perk_description.innerText = text + sniper_other + sniper_Aggresive + linear + scout + range_acc;
                            break;
                    };
                    break;
                case 'Linear Fusion Rifle':
                    perk_description.innerText = text + linear + sniper_Aggresive + sniper_other + scout + range_acc;
                    break;
                case 'Scout Rifle':
                    perk_description.innerText = text + scout + sniper_Aggresive + sniper_other + linear + range_acc;
                    break;
            }
            break;
        case 'Celerity': // add calculation
            perk_description.innerText = "If Last Guardian Standing:\n100 Handling, Reload and Aim Assist\nMassively decreased flinch received\nIncreased accuracy\nStronger scope highlight\nEnables radar while ADS\nPassive 18 Handling and Reload (Season 14)";
            break;
        case 'Chain Reaction':
            perk_description.innerText = "Kills explode enemies, potentially chaining.";
            break;
        case 'Clown Cartridge':
            perk_description.innerText = "Randomly increases magazine between 10% to 50% on Reload. Always rounds up.";
            break;
        case 'Cluster Bomb':
            perk_description.innerText = "Rockets generate 8 additional Cluster Bombs on detonation. Each bomb deals about 3% additional damage.";
            break;
        case 'Counterattack':
            perk_description.innerText = "Blocking an attack immediately after Guarding increases Damage by 50% for 2s.";
            break;
        case 'Death at First Glance':
            perk_description.innerText = "First shot while ADS deals 33% increased Damage.\nBonus is Preserved on Precision/Elemental Shields Hits.\nIf lost, buff is regained after 3 seconds of not firing.";
            break;
        case 'Demolitionist':
            if(imgLinkLegth === 275){
                perk_description.innerText = "Kills restore 10% Grenade Energy.\nUsing Grenade Ability reloads weapon. 3 Second Cooldown.";
            } else{
                    perk_description.innerText = "Kills restore 20% Grenade Energy.\nUsing Grenade Ability reloads weapon. 3 second cooldown.";
                };
            break;
        case 'Desperado':
            perk_description.innerText = "Reloading within 6 seconds after a Precision Kill increases your Rate of Fire to 600RPM for 7 seconds. Reduces damage against Combatants by 20%\nCan be refreshed.";
            break;
        case 'Disruption Break':
            perk_description.innerText = "On Elemental/Barrier or Guardian shield break: Applies a debuff that grants 50% increased Kinetic Damage for 5.5 seconds.";
            break;
        case 'Dragonfly':
            perk_description.innerText = "Precision Kills explode the target, dealing the Weapon's Elemental Damage over a 3 meter radius.\nDamage is not increased by Weapon Perks.\nDragonfly Spec grants 50% more damage and radius.";
            break;
        case 'Dual Loader':  // Dim alredy shows reload stat change // add calculation
            let dual_loader_reload = document.querySelector('.plug-stats > div').textContent;
            perk_description.innerText = "Loads 2 shells at a time.\nReload time " + (calculator(realoadValue * 1 - dual_loader_reload * -1) / 2).toFixed(2); // * mag_size
            break;
        case 'Dynamic Sway Reduction':
            perk_description.innerText = "Greatly reduces inaccuracy after firing for 1 second.\nAdds +9 Stability over time.";
            break;
        case 'Elemental Capacitor':  // add calculation // Dim already shows more accurate stats 
            perk_description.innerText = "Grants stat bonuses depending on selected Light Subclass.\nReload time Solar: "  + calculator(realoadValue * 1 + 45).toFixed(2) + "\n• ";//Solar: 45 Reload | Arc: 45 Handling | Void: 18 Stability";  increases reload speed• 
            break;
        case 'Explosive Payload':
            perk_description.innerText = "Splits 50% of damage into explosive damage with no fall off. Increases Damage in PVE.\n[PVE] 11% Precision 15% Body.";
            break;
        case 'Explosive Head':
            perk_description.innerText = "Splits 55% of damage into explosive damage with no fall off. Increases Damage in PVE.\nDetonates after 0.6 seconds\n[PVE] 12% Precision  16% Body.";
            break;
        case 'Eye of the Storm': // data incomplete not adding for now
            //perk_description.innerText = "";
            break;
        case 'Feeding Frenzy':
            perk_description.innerText = "Kills increase reload speed for 3.5 seconds. Refreshes on kill.\rStack  | Time   | Stat   | Multiplier\r1x       |  " + calculator(realoadValue * 1 + 10).toFixed(2) + 's  | 10     | -\r2x       |  ' + (calculator(realoadValue * 1 + 45) * 0.9).toFixed(2) + 's  | 45     | 0.9\r3x       |  ' + (calculator(realoadValue * 1 + 55) * 0.88).toFixed(2) + 's  | 55     | 0.88\r4x       |  ' + (calculator(realoadValue * 1 + 70) * 0.85).toFixed(2) + 's  | 70     | 0.85\r5x       |  ' + (calculator(realoadValue * 1 + 100) * 0.8).toFixed(2) + 's  | 100   | 0.8';
            break ;              
        case 'Field Prep':// verify data
            perk_description.innerText = "If crouched:\nReload Time reduced to " + (calculator(realoadValue * 1 + 45) * 0.8).toFixed(2) + 's\n45 Reload with 0.8x Multiplier\n~20 Handling to Ready/Stow Speed.';
            break;
        case 'Firing Line':
            perk_description.innerText = "Being near 2+ Guardians/Friendly AI increases Precision Damage\n25% Linear Fusions & Snipers\n20% Machine Guns";
            break;
        case 'Firmly Planted': // Verify handling and stability
            perk_description.innerText = "If crouched: Recoil becomes (almost) entirely vertical, heavily increases accuracy, grants ~35 Handling and ~35 Stability.";
            break;
        case "Fourth Time's the Charm":
            perk_description.innerText = "Landing 4 Precision Hits up to 2.5s between shots generate 2 bullets to the magazine.";
            break;
        case 'Frenzy': // verify data
            perk_description.innerText = "After 12s of dealing/taking damage every 5s:\nReload Time reduced to " + calculator(realoadValue * 1 + 50).toFixed(2) + "s\n15% Damage Increase, ~50 handling, and 50 reload.";
            break;
        case 'Full Auto Trigger System': // maybe add shotgun part only to shotguns?
            perk_description.innerText = "Makes Weapon fire at Full Auto.\n10% Faster Fire Rate on Shotguns.";
            break;
        case 'Full Court':
            perk_description.innerText = "Increases Explosion Damage based on how far the grenade traveled\nBegins at 10m, and ends at 50m.\n0.625% for every meter traveled up to 25% more Damage at 50m";
            break;
        case 'Genesis':
            perk_description.innerText = "On Elemental or Barrier Champion's Shield break: Reloads magazine\nEnergy Weapons generate 1 ammo per hit against Matching Elemental Shields";
            break;
        case 'Grave Robber':
            perk_description.innerText = "On Melee Kill:\nPrimary Weapons generate ammo to magazine\nSpecial and Power Weapons get ammo to magazine from reserves.";
            break;
        case 'Headseeker':
            perk_description.innerText = "Headshots mid burst after hitting at least one bodyshot receive 8% increased Precision Damage";
            break;
        case 'High-Impact Reserves':
            perk_description.innerText = "Gradual Damage increase, starting at 50% of magazine left\n[PVE] 12% to 26%\n[PVP] 4% to 6%";
            break;
        case 'Hip-Fire Grip':
            perk_description.innerText = "If hipfiring:\n1.2x Aim Assist Falloff\n15 Aim Assist\n+1.7 degrees precision angle threshold\n~30% higher accuracy and ~30 Stability";
            break;
        case 'Impact Casing':
            perk_description.innerText = "10% Increased Impact Damage";
            break;
        case 'Impulse Amplifier': // verify Velocity
            perk_description.innerText = "Reduces Reload Time to " + (calculator(realoadValue * 1 + 10) * 0.8).toFixed(2) + "s\n(10 Reload with 0.8x Multiplier)\n13% Faster Projectile Velocity\nVerify Velocity";
            break;
        case 'Iron Gaze': // add calculation
            //perk_description.innerText = "20 Aim Assist and -36 Range.";
            break;
        case 'Iron Grip':
            perk_description.innerText = "Increases Reload Time to " + calculator(realoadValue * 1 + -36).toFixed(2);
            break;
        case 'Iron Reach': // add calculation
            //perk_description.innerText = "18 Range and -36 Stability";
            break;
        case 'Kickstart': // add data
            perk_description.innerText = "20% increased Damage and 100ms faster Charge Rate during a slide, after sprinting for 1.5 second.";
            break;
        case 'Kill Clip':
            perk_description.innerText = "Reloading after a Kill increases Damage by:\n33% (Precision) 30% (Body)";
            break;
        case 'Killing Wind': // Verify handling
            perk_description.innerText = "On Kill:\n20 Range, 50 Mobility, ~40 Handling.\nLasts 6 seconds and is refreshed on kill.";
            break;
        case 'Lasting Impression': // dmg perk
            perk_description.innerText = "Rockets attach on impact and detonate after 3 seconds, dealing 20% increased Explosive Damage.";
            break;
        case 'Lead from Gold':
            perk_description.innerText = "On Power Ammo Pickup: Grants the equivalent of 1 Special Ammo Pickup.";
            break;
        case 'Markov Chain': // -----------------------------------------------------------
            //perk_description.innerText = "";
            break;
        case 'Moving Target':
            perk_description.innerText = "Passively grants 10 Aim Assist. 3% Reduced Movement Speed Penalty from ADS and Strafing";
            break;
        case 'Mulligan':
            perk_description.innerText = "20% chance on miss to generate 1 bullet to magazine.";
            break;
        case 'Multikill Clip':
            perk_description.innerText = "Reloading after Kills increases Damage for 5s by: 1x = 17% | 2x = 33% | 3x = 50%";
            break;
        case 'No Distractions':
            perk_description.innerText = "After being scoped for 1 second without firing: Strongly reduced flinch.";
            break;
        case 'One for All':
            perk_description.innerText = "Hitting 3 Separate Combatants within 3s of each other increases Damage by 35% for 10s";
            break;
        case 'One-Two Punch':
            perk_description.innerText = "Hitting an enemy with every pellet of a shot increases Melee Damage\n200% to Minors & Elites\n350% to Minibosses and Bosses\nBonus is reduced to 80% with Liar's Handshake";
            break;
        case 'Opening Shot':
            perk_description.innerText = "5-12% Increased Fall off Distance, and 25% higher Accuracy on the first shot.\n3.1 second cooldown after not firing.";
            break;
        case 'Osmosis':
            perk_description.innerText = "Using your Grenade Ability changes the weapon damage type to match selected Light subclass until stow.";
            break;
        case 'Outlaw':
            perk_description.innerText = "On Precision Kill, for 6 seconds:\nReduces Reload Time to " + (calculator(realoadValue * 1 + 63) * 0.9).toFixed(2) + 's\n(63 Reload with 0.9x Multiplier)';
            break;
        case 'Overflow':
            perk_description.innerText = "Refills magazine to double capacity on Special/Power Ammo pickup.";
            break;
        case 'Pulse Monitor':
            perk_description.innerText = "On Critical Health:\nReloads weapon (Held or Stowed), 45 Handling, 5% Faster Swap Speed.";
            break;
        case 'Quickdraw':
            perk_description.innerText = "Grants 100 Handling for 1s, or until ADS";
            break;
        case 'Rampage':
            perk_description.innerText = "Kills increase Damage for 3.5s\n1x = 10% | 2x = 21% | 3x = 33%\nRampage Spec Mod increases Duration to 4.5s";
            break;
        case 'Rangefinder': // add calculation
            perk_description.innerText = "10% Increased Zoom when ADS.\n5% Faster Projectile Speed when ADS.";
            break;
        case 'Rapid Hit':
            perk_description.innerText = "Precision hits build Rapid Hit stacks (2s duration), granting \rStack  | Reload Time / Stat | Stability\r1x       |  " + calculator(realoadValue * 1 + 5).toFixed(2) + 's             / 5     | 5\r2x       |  ' + calculator(realoadValue * 1 + 27).toFixed(2) + 's             / 27   | 10\r3x       |  ' + calculator(realoadValue * 1 + 32).toFixed(2) + 's             / 32   | 15\r4x       |  ' + calculator(realoadValue * 1 + 40).toFixed(2) + 's             / 40   | 20\r5x       |  ' + calculator(realoadValue * 1 + 54).toFixed(2) + 's             / 54   | 23';
            break;
        case 'Reconstruction':
            perk_description.innerText = "After not shooting for 4 seconds:\nReloads 10% of base magazine. Maxes out at double magazine size.";
            break;
        case 'Shield Disorient':
            perk_description.innerText = "On Matching Elemental Shield Break:\nExplosion disorients enemies within 7 meters for 5 seconds";
            break;
        case 'Slideshot':
            perk_description.innerText = "On Slide: Reloads 15% of magazine\n20 Range, ~50 Stability\nOnly buffs first shot Lasts 3s.";
            break;
        case 'Slideways':
            perk_description.innerText = "On Slide:\nReloads 15% of magazine\n~20 Stability\n~25 Handling\nLasts 3s.";
            break;
        case 'Snapshot Sights':
            perk_description.innerText = "Greatly faster ADS.\n33% Faster than 100 Handling.";
            break;
        case 'Sneak Bow':
            perk_description.innerText = "Prevents ping on radar after shooting while crouched. Increases hold time by 25%";
            break;
        case 'Spike Grenades':
            perk_description.innerText = "Increase Impact Damage by 50%.";
            break;
        case 'Subsistence':
            perk_description.innerText = "Reloads 18-20% of Magazine per kill.\nReduces maximum reserves by about 35%";
            break;
        case 'Surplus': //you can add these to show reload time only thig to change is nuber after +     calculator(realoadValue * 1 + 5).toFixed(2)
            perk_description.innerText = "Grants 5-22-50 Reload Speed, X-Y-Z Stability, and 10-25-50 Handling depending on the amount of charged abilities.";
            break;
        case 'Surrounded': // add data
            //perk_description.innerText = "";
            break;
        case 'Swashbuckler':
            perk_description.innerText = "Weapon and Melee Kills increase Damage for 4.5s: 1x = 5% | 2x = 12%\n3x = 19% | 4x = 26% | 5x 30%\nMelee Kills instantly max out stacks";
            break;
        case 'Sympathetic Arsenal':
            perk_description.innerText = "Reloading up to 6s after a Kill also reloads stowed weapons.";
            break;
        case 'Tap The Trigger':
            perk_description.innerText = "Grants 25 Stability and 10% higher Accuracy for 0.6s.\nRefreshes immediately after not firing. \nHair Trigger on Controller " 
            break;
        case 'Threat Detector':
            perk_description.innerText = "When enemies are within 15m\n1x Reload Time reduced to " + calculator(realoadValue * 1 + 15).toFixed(2) + "s | Stat 15\n1x 15 Stability, 20 Handling\n2x Reload time " + calculator(realoadValue * 1 + 55).toFixed(2) + "s | Stat 55\n2x 40 Stability, 40 Handling";
            break;
        case 'Thresh':
            switch(imgLinkLegth){
                case 345:
                    perk_description.innerText = 'Kills generate more Super Energy\nSpecial\nPVE +1.5% - PVP +1%\nPrimary & Heavy\nPVE +1% - PVP +1%';
                    break;
                default:
                    perk_description.innerText = 'Kills generate more Super Energy\nPrimary & Heavy\nPVE +1% - PVP +1%\nSpecial\nPVE +1.5% - PVP +1%';
                    break;
            };
            break;
        case 'Timed Payload':
            perk_description.innerText = "Splits 55% of damage into explosive damage with no fall off. Increases PVE Damage.\nDetonates after 0.6 seconds\n[PVE] 12% Precision 16% Body";
            break;
        case 'Trench Barrel':
            perk_description.innerText = "50% increased Damage for 5s for up to 3 shots after a Melee Hit";
            break;
        case 'Triple Tap':
            perk_description.innerText = "Landing 3 Precision Hits up to 2.5s between shots generate 1 bullets to the magazine.";
            break;
        case 'Under Pressure':
            perk_description.innerText = "As magazine goes below 50% until empty. 25% to 50% increased Accuracy and up to 20 stability.";
            break;
        case 'Underdog':
            perk_description.innerText = "Once below 150(?) HP:\nIncreased reload speed. Effect increases linearly as health decreases, up to 100 Reload with 0.9x Duration Multiplier";
            break;
        case 'Unrelenting':
            perk_description.innerText = "Starts Health Regeneration and heals for ~30 HP after obtaining 3 points. \nRank-And-File give ONE point. Elites/Guardians give TWO points. Minibosses/Bosses give THREE points.\nKills must be within 8(?) seconds of each.";
            break;
        case 'Vorpal Weapon':
            perk_description.innerText = "15% Weapon DMG to Minibosses and Bosses.\n40-50% increased Primary Damage and 10%-20% increased Special Damage against Supers";
            break;
        case 'Wellspring':
            perk_description.innerText = "Kills generate 7.5% Ability Energy split equally to all uncharged abilities.";
            break;
        case 'Whirlwind Blade':
            perk_description.innerText = "Sword Hits grant a stacking Damage Buff for 3s. Stacks disappear on Guarding.\n1x = 6% | 2x = 12% | 3x = 18% | 4x = 24% | 5x = 30%";
            break;
        case 'Zen Moment':
            perk_description.innerText = "On hits:\nRemoves Reticle Bounce and Reduces Weapon Shake. Visual only.";
            break;
        /*case '':
            //perk_description.innerText = "";
            break;
        case '':
            perk_description.innerText = "";
            break;
        case '':
            perk_description.innerText = "";
            break;
        case '':
            perk_description.innerText = "";
            break; */
    };
};

function run_mods(mod, mod_descriptions){
    switch(mod){
        case 'Adept Big Ones Spec':
            mod_descriptions.innerText = "7.8% Damage Increase against\nElites, Minibosses, and Bosses";
            break;
        case 'Adept Icarus Grip':
            //mod_descriptions.innerText = ;
            break;
        case 'Boss Spec':
            mod_descriptions.innerText = "7.8% Damage Increase against Bosses";
            break;
        case 'Dragonfly Spec':
            mod_descriptions.innerText = "50% higher damage and radius for Dragonfly explosions";
            break;
        case 'Freehand Grip':
            //mod_descriptions.innerText = ;
            break;
        case 'Icarus Grip':
            //mod_descriptions.innerText = ;
            break;
        case 'Major Spec':
            mod_descriptions.innerText = "7.8% Damage Increase against\nElites and Minibosses";
            break;
        case 'Minor Spec':
            mod_descriptions.innerText = "7.8% Damage Increase against\nRank-And-File enemies";
            break;
        case 'Quick Access Sling':
            //mod_descriptions.innerText = ;
            break;
        case 'Radar Booster':
            mod_descriptions.innerText = "Maximum Radar Distance increased by 8 meters";
            break;
        case 'Rampage Spec':
            mod_descriptions.innerText = "Rampage lasts 1 second longer (3.5s -> 4.5s)";
            break;
        case 'Sprint Grip':
            //mod_descriptions.innerText = ;
            break;
        case 'Surrounded Spec':
            mod_descriptions.innerText = "Surrounded increases damage by 10% more and persists for 1.5s after deactivation";
            break;
        case 'Taken Spec':
            mod_descriptions.innerText = "10% Damage Increase against Taken";
            break;
    };
};