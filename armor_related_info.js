function armor_pressed(){
    if((document.querySelector('[class^="ArchetypeSocket-m_name-"]') != null) || document.querySelector('._3sBrL') != null){
        let version = document.querySelector('.link.menuItem.logoLink > img').className == 'logo release';
        let exotic_perk_name = (version) ? document.querySelector('._3sBrL').textContent : document.querySelector('[class^="ArchetypeSocket-m_name-"]').textContent;
        let perk_description = (version) ? document.querySelector('.dd6Tm') : document.querySelector('[class^="ItemSocketsGeneral-m_exoticDescription-"]');
        switch(exotic_perk_name){
            //------------------------ Hunter ------------------------
            case 'Vanishing Step':
                perk_description.innerText = 'Gain Invisibility on Powered Arc, Solar, and Void Melee Kill. (Longer on Finishers)\nHeals for X on Powered Melee Kill. (Stronger on Finishers)\n\nInvisibility Duration\nMinor = 6 seconds (10)\nElite = 9 seconds (13)\nMiniboss = 12.5 seconds (13)\nBoss = 13 seconds (13)\n\n\nFinishers while in a Stasis Subclass will grant you the benefits from this Exotic.\nBosses are not finishable.\n'
                break;
            case 'Skittering Stinger':
                perk_description.innerText = 'Throwing Knife gains greatly increased tracking and a second bounce.\nAfter 3 precision hits within 2.5 seconds: Gain Strengthened Throwing Knife\nFollow-up precision hits increase duration by 5 seconds each.\n\nStrengthened Throwing Knife grants 200% [100%] more damage with throwing knife.\nStrengthened Throwing knife staggers unstoppable champions.\n Landing a throwing knife hit removes buff.'
                break;
            case 'Parting Gift':
                perk_description.innerText = 'Dodging drops a Parting Gift that explodes and deals 120 damage over 7.5 meters with a 1(?) second fuse timer.'
                break;
            case 'Hawkeye Hack':
                perk_description.innerText = "Only one shot per Golden Gun activation.\n\nGrants 500% more damage to Golden Gun.\n(37% more compared to Line 'Em Up x3)\n\nReturns 33% of Super Energy on Kill."
                break;
            case 'Wraithmetal Mail':
                perk_description.innerText = 'On Dodge\nGrants Wraithmetal Mail for 9 seconds.\n\nWraithmetal Mail \nReloads all weapons\n 100 Handling\n100 Reload\n50 Mobility\n Increases Sprint Speed by 6.25%\nIncreases Slide Distance by 33%'
                break;
            case 'Relentless Tracker':
                perk_description.innerText = 'Tracks enemies for 5 seconds after hovering reticle over them. Persists briefly through walls.\nIf enemy is below 30% HP: Grants 1.01x more damage per percent below 30%\n(Eg: 10% HP left -> 1.2x damage increase)'
                break;
            case 'Rapid Cooldown':
                perk_description.innerText = "If sprinting: \n100% Faster Grenade and Melee Recharge.\nRegenerates 3.5% Class Ability per Second.\n\n6.25% faster sprint on dodge for 10 seconds. Not refreshable.\n\nAdditive to Focused Breathing's 3% Class Ability per Second"
                break;
            case 'Misdirection':
                perk_description.innerText = 'Dodging within 15 meters of an enemy applies Misdirection.\n\n[PVE] Misdirection disorients minors as well as elites for 5 seconds.\n [PVP] Misdirection  warps audio and removes radar for 5 seconds, as well as briefly blinding.\n\nMisdirection also deals 1 damage on proc.'
                break;
            case 'Vanishing Shadow':
                perk_description.innerText = ' Regenerates 4.4% of Melee Ability while invisible.\n\nIncreases duration of Invisibility effects.\n\nRat King: 6 -> 8 seconds (33% increase)\nVanish in Smoke: 7 > 9 seconds (29% increase)\nVanishing Step: 5 -> 6 seconds (20% increase) \nFlawless Execution: 9 -> 12 seconds (33% increase)'
                break;
            case 'Roving Assassin':
                perk_description.innerText = 'During Spectral Blade\nRestores Super Energy % on Heavy Attack based on the amount of Spectral Blade Kills.\n\nSuper Energy % gains based on kills\n[PVE] 11.1 -> 14.3 -> 16.5 -> 16.9 -> 17.1 \n[PVP] 8.3 -> 12.5 -> 14.2 -> 15.8 -> 16.7'
                break;
            case 'Touch of Venom':
                perk_description.innerText = "Punch instantly casts Smoke Bomb if on full melee energy.\nSmoke Bombs deal 2.5x more damage.\n Standing in the smoke bomb's cloud grants Truesight for 3(?) seconds, allowing you to see enemy outlines through walls from up to 64 meters away."
                break;
            case 'Upgraded Sensor Pack':
                perk_description.innerText = 'Radar remains active while Aiming Down Sights.\nIf crouched: Enhanced radar. (12 sectors instead of 6)'
                break;
            case 'Cross Counter':
                perk_description.innerText = "If on Arc subclass\nReceiving Melee Damage or Meleeing grants Cross Counter for 3 seconds or until hit.\n\nCross Counter grants 3x increased melee damage.\n\nOne-Two Punch's bonus is reduced to 80% if Cross Counter is active."
                break;
            case 'Illegally Modded Holster':
                perk_description.innerText = 'why are there so many mentions of accuracy jesus christ'
                break;
            case 'Probability Matrix':
                perk_description.innerText = '25% chance per enemy hit with Arcbolt Grenade to recharge your Grenade\n\nArcbolt Grenades chain up to 5 times (from 4)'
                break;
            case 'Light Shift':
                perk_description.innerText = 'Stasis Subclass Only\nReplaces Dodge with Shift.\n Shift has a distance of 10 meters, and renders you completely invisible except for a trail for the duration of the shift.\n\nDodging grants Light Shift buff for 10 seconds.\n[PVE] Light Shift increases damage to Slowed/Frozen targets by 10%, as well as 10% more damage to Arc Weapons.\n\nDodge does not recharge while Light Shift buff is active.'
                break;
            case 'Spring-Loaded Mounting':
                perk_description.innerText = 'Readying sidearm on critical health: \n100% [35%] damage increase until no longer critical.\nRefreshes sidearm magazine.  (Generates ammo if reserves are empty)\n\n100 Handling to Sidearm Stow and Ready speed.'
                break;
            case 'Adamantine Brace':
                perk_description.innerText = 'Can hold perfect draws indefinitely.\n\njust learn how to draw cancel'
                break;
            case 'Beyond The Veil':
                perk_description.innerText = 'Grants an extra Smoke Bomb Charge.\n\nCloaking allies grants 50% Melee Energy per ally.\n\n50% [10%] Damage Resistance on any Invisible effects. Applies to teammates made invisible.\n\n'
                break;
            case 'Scissor Fingers':
                perk_description.innerText = 'Grants an additional Melee Charge to Solar Subclasses.\nMelee Charges are recharged simultaneously.\n\n(Eg: Both are recharged on dodge)'
                break;
            case 'Uncanny Arrows':
                perk_description.innerText = 'fuck super exotics'
                break;
            case 'Synapse Junctions':
                perk_description.innerText = 'uuggggh'
                break;
            case 'Mobius Conduit':
                perk_description.innerText = "Blocking with Whirlwind Guard doesn't consume extra Super Energy.\n\nCan deactivate Arc Staff at any time to preserve a portion of unspent Super Energy."
                break;
            case 'Nightmare Fuel':
                perk_description.innerText = 'Melee hits refresh magazine.\n7 second cooldown.'
                break;
            case 'Sharp Edges':
                perk_description.innerText = 'uuuuuuuuuuuuuuuuuuuuuuuuuuuuugh\nBlade Barrage knife hits and final blows grant "Super Regeneration" or something buff that grants X% super per second.\nDuration depends on kills'
                break;
            case 'New Tricks':
                perk_description.innerText = 'If on Skip Grenades.\n\nGrants an extra Grenade Charge.\n\nSkip Grenades spawn 1 more drone (4 -> 5) and chase enemies much more aggressively.\n\nHits with Skip Grenades grant X% Grenade Energy.'
                break;
            case 'Double Dodge':
                perk_description.innerText = 'Adds an extra Dodge charge.'
                break;
            case 'Hydraulic Boosters':
                perk_description.innerText = 'Increased Jump Height Increase:\nHigh Jump = 9 meters -> 12 meters (33% higher)\nStrafe Jump = 8 meters -> 9 meters (10% higher)\nTriple Jump = 6 meters -> 7 meters for First Jump (16% higher)\n                                     9 meters -> 11 meters for Second Jump (22% higher)\n\nJump Distance Increase: (Includes innate 6.25% faster sprint)\nHigh Jump = 28 meters -> 33 meters (18% higher)\nStrafe Jump = 26 meters -> 31 meters (19% higher)\nTriple Jump = 31 meters -> 38 meters. (22% higher)\n\nIncreases Sprint Speed by 6.25%\nIncreases Slide Distance by 33%'
                break;
            case 'Burning Souls':
                perk_description.innerText = 'On Dodge\n Heal 44HP.'
                break;
            case 'Wish-Dragon Teeth':
                perk_description.innerText = 'Grants enhanced Tripmine Grenades.\n\nEnhanced Tripmine Grenades deal 1.14x more damage, have X% bigger radius, lasts 20 seconds longer (10 -> 30) and have X HP (Normally Y).\n\nAbility Damage recharges 33% of Grenade Ability.'
                break;
            //------------------------ Titan ------------------------
            case 'Fury Conductors':
                perk_description.innerText = 'Melee Hits grant stacks of Fury Conductors.\nReceiving melee damage unleashes an Arc Explosion with a radius of 5 meters.\nArc Explosion deals 22% of your Melee Damage per stack of Fury Conductors.\n\nFury Conductors grants 33-55-70% damage resistance to melee depending on number of stacks.\n\nAll stacks disappear upon receiving melee damage or after 10 seconds of not Meleeing.'
                break;
            case 'Auto-Loading Link':
                perk_description.innerText = 'Refreshes 10% of Readied Auto Rifle/Machine Gun magazine every 1.5 seconds.'
                break;
            case 'Transfusion Matrix':
                perk_description.innerText = 'Arc Melee Kills fully recharge Melee Ability and begins Health Regeneration\n\nKnockout counts as Arc Melee Kill'
                break;
            case 'Reflective Vents':
                perk_description.innerText = 'During slide after sprinting for at least 1.5 seconds: \nGenerate a 180° frontal shield that reflects damage and projectiles.\n\nIncreases Slide Distance by 33%'
                break;
            case 'And Another Thing':
                perk_description.innerText = 'Grants an extra Grenade Charge. \nDoes not stack with Top Tree Striker'
                break;
            case 'Bring The Heat':
                perk_description.innerText = 'Fusion Grenades possess built-in Fastball and detonate on impact.\n\nKills with Fusion Grenades grant Grenade Energy.\n25% for Minors | 50% for Majors | 100% for Guardians & Bosses'
                break;
            case 'Assault Barricade':
                perk_description.innerText = 'Alters Towering Barricade\n\nAssault Barricade has halved health and duration, but enables you and your allies to shoot through it.\n\nBarricade\n600HP -> 300HP\n20 seconds -> 10 seconds '
                break;
            case 'Survival Well':
                perk_description.innerText = 'Generates a Healing Pulse on Barricade Cast which heals both the user and allies.\nHealing Pulse heals for the highest between 58 HP OR to 130HP over 12 meters.\nRequires Line-of-Sight to allies.\n\n\nSupers generate 1 extra Orb of Power.'
                break;
            case 'Glorious Charge':
                perk_description.innerText = 'Thundercrash deals 2x more damage.\n\nOn Thundercrash Deactivation:\n\nGain an 100HP Overshield for 7 seconds.\nOvershield Duration scales with Thundercrash distance, up to a max of 20 seconds.'
                break;
            case 'Horns of Doom':
                perk_description.innerText = "Powered Void Melee kills grant 20% Super Energy\n\nSentinel Shield's Shield Throws regenerate 10% Super Energy"
                break;
            case 'Linear Actuators':
                perk_description.innerText = 'After sprinting for 1.5s, gain Linear Actuators for 7 seconds.\n\nLinear Actuators applies Shocked for 2 seconds on enemy, which releases an Arc static charge that chains when another enemy is within 20 meters. Shocked is refreshed on chain.\n\n[PVE] 4x(?) Melee Damage\n[PVP] 85 Damage\n\nIncreases Sprint Speed by 6.25%\nIncreases Slide Distance by 33%'
                break;
            case 'Resolute':
                perk_description.innerText = 'Casting Fists of Havoc grants Resolute.\n\nResolute is a 75HP Overshield that negates Precision Damage.\n\nOvershield can be refreshed by unequipping and equipping but who is gonna do that to be quite honest.'
                break;
            case 'Sunfire Furnace':
                perk_description.innerText = 'If on Solar Subclass\nFaster Ability Recharge\n0.9% Melee & Grenade Ability Recharge per Second\n\nIf Solar Super is Charged.\nMuch faster Ability Recharge\n4.25% Melee & Grenade Ability Recharge per Second\n'
                break;
            case 'Overflowing Light':
                perk_description.innerText = 'On Ability Usage: Gain Empowered for other abilities.\n\nWhile Empowered\nGrants 1.3x more Ability Damage and 1.4x Barricade Health per stack.\n5% Melee and Grenade Energy per Second\n4% Barricade Energy per Second\n\nUnpowered melees also proc Empowered\n\ndouble stacks are complicated, they can only work in specific orders (Eg: Barricade -> Melee)'
                break;
            case 'Starless Night':
                perk_description.innerText = 'Guarding with Sentinel/Banner Shield blinds enemies within 7 meters for 5 seconds.\n\nAny Ward of Dawn that you create grants Starless Night, which gives a 65HP Overshield to any ally that enters.\n\nOvershield persists for up to 6 seconds.\n\nEnemies that enter your Ward of Dawn are also blinded for 5 seconds.'
                break;
            case 'Glacial Guard':
                perk_description.innerText = 'Replaces Barricade with Glacial Guard\nOn Glacial Guard activation: Grants Shielded buff and applies 40 stacks of slow to enemies within 7 meters.\n\nShielded buff lasts 20 seconds (refreshed on damage taken), grants 100HP overshield, prevents sprinting, double jumping, and sliding\n\nWhile Shielded buff is active, you cannot regain Class Ability Energy by any means.'
                break;
            case 'Solar Rampart':
                perk_description.innerText = 'Summoning Barricade unleashes a Solar Wave that returns back to the barricade after 18.5 meters.\n[PVP] Deals 100 damage.\n\nSolar Kills refresh 25% of Class Ability Energy.'
                break;
            case 'Jump Jets':
                perk_description.innerText = 'No In-Air Accuracy Penalty when Hipfiring in Lift.\nEnables hipfire while in Lift.\n\nIncreases Lift Duration to 4 seconds.\n\nLift Duration in seconds:\nHigh Lift: 2.6 -> 4  (1.54x increase)\nStafe Lift: 2.2 -> 4 (1.82x increase)\nCatapult Lift: 1 -> 4 (4x increase!)'
                break;
            case 'Dreaded Visage':
                perk_description.innerText = "Heals Critical Health on Kill.\nRegenerates X% Barricade Energy on Damage.\n\n(Verify if it's per instance or damage amount)"
                break;
            case 'Seriously, Watch Out':
                perk_description.innerText = 'If Shoulder Charge Melee Ability is Charged:\n\nSlowly grants 75 HP Overshield over 5 seconds after sprinting for 0.5 seconds\nOvershield disappears instantly when not sprinting. \n\nRecharges 50% of Shoulder Charge ability on Shoulder Charge Hit.\nShoulder Charge prerequisites sprinting for at least 1.5 seconds\n\n\nIncludes Seismic Strike, Ballistic Slam, Hammer Strike, Shield Bash'
                break;
            case 'Vengeance':
                perk_description.innerText = 'Receiveing damage highlights the enemy that caused it for 8 seconds.\n\nKilling the targeted enemy grants Vengeance for 6 seconds.\n\nVengeance grants a 95 HP Overshield.'
                break;
            case 'Mecha Holster':
                perk_description.innerText = 'When an SMG is readied:\n50 Mobility\nIncreases Sprint Speed by 6.25%\nIncreases Slide Distance by 33%\nDecreases SMG ADS penalty from 25% to 9%\n100 Handling(?)\n\nReloads stowed SMGs in 1.3s'
                break;
            case 'Peregrine Strike':
                perk_description.innerText = 'Shoulder Charges deal more damage if used midair.\n\nMinor | Major | Elite | Boss \nArc | 2.55x | 4.1x | 3x | 4.6x\nSolar | 2.9x | ? | ?| 2.57x\nVoid | 4.1x | ? | ? | 2.65x'
                break;
            case 'Beacons of Empowerment':
                perk_description.innerText = 'Sun Warrior buff from Sunspots lasts twice as long (5 ->10 seconds)\nSunspots affect the entire team.\n\nSun Warrior:\n2.8x faster Grenade Recharge\n4.2x Melee Ability Recharge\n1.20% Increased Weapon Damage\n10(?)% slower Super Drain\n'
                break;
            case 'Kintsugi':
                perk_description.innerText = 'Reviving/Getting Revived procs Kintsugi\n\nKintsugi \nGrants you and allies within 15 meters a 100HP Overshield for 10 seconds.\nLeaving the 15 meter radius removes Overshield\nIf the wearer loses Overshield, so too does everyone else.'
                break;
            case 'Spheromatik Trigger':
                perk_description.innerText = 'Powered Melee and Finisher kills unleash an elemental explosion. Explosion strength and Radius depends on Enemy Rank.\n\nExplosion strength:\n2x = Powered Melee on Minor\n2.44x = Finisher on Minor\n2.97x = Powered Melee on Major\n3.68x = Finisher on Major'
                break;
            case 'Clenched Fist':
                perk_description.innerText = "Maxes out Sword's Guard Resistance, Efficiency, and Endurance.\nPerfectly timed blocks heal for 80(?) HP.\n\nBlocking properties with Stronghold:\n\nAggressive Frame Swords obtain 95% Damage Resistance.\nAny other sword obtains 90% Damage Resistance.\nSword Energy does not decay from blocking damage or holding guard."
                break;
            case 'Biotic Enhancements':
                perk_description.innerText = '\nWhen Surrounded by 2 [3] enemies: Activates Biotic Enhancements\n\nBiotic Enhancements increases Melee and Super damage for 8 seconds.\n\n1.5x Super Damage\n[PVE] 3x Melee Damage.\n[PVP] 2x Melee Damage.\n\n Increases Melee Lunge range to 7 meters.'
                break;
            case 'Ursine Guard':
                perk_description.innerText = "Move at 90% your normal forward speed while blocking with Sentinel Shield\nConverts damage into Super Energy after Super ends, up to 75%.\n\nOvershields prevent damage into Super Energy conversion.\nDon't stand in a Well of Radiance."
                break;
            case 'Burning Fists':
                perk_description.innerText = 'Grants Burning Fists on Melee Kill.\nBurning Fists lasts 5 seconds and grants Bonus Melee Damage.\n\nBonus Melee Damage:\n1.8x | 2.7x | 4.9x | 6.2x | 7.5x'
                break;
            //------------------------ Warlock ------------------------
            case 'Insatiable':
                perk_description.innerText = 'Fully restores Health, Grenade, Melee, and Class Ability Energy on Super Cast.\n\nAllies within 18(?) meters recharge 0.25% of their Class Ability per Second.'
                break;
            case 'Move to Survive':
                perk_description.innerText = '25% increased blink distance.\nReduces blink charge cooldown by ~16% on average.\n\nOn blink: Max handling, radar remains active.\n\nBlink Cooldowns:\n2.5 seconds (3 seconds)\nCooldown = 4.5 seconds (5 seconds)'
                break;
            case 'Crystalline Transistor':
                perk_description.innerText = 'On Kinetic Precision Kill: Enemy explodes in an elemental explosion with a radius of X meters, of your currently selected Light Subclass.\n[PVP] Deals ~200 damage at epicenter.'
                break;
            case 'The Whispers':
                perk_description.innerText = 'Grants an extra Melee Charge.'
                break;
            case 'Chaotic Exchanger':
                perk_description.innerText = 'On Grenade Charge: Grants Chaotic Exchanger.\nChaotic Exchanger grants 20% Damage Resist.\n\nGrenade Hits return between 15% to 85% Grenade Energy.\n4 second cooldown between proc.\n\nCharged Vortex Grenade can proc twice if enemies get hit by the initial explosion and the last few ticks.'
                break;
            case 'Conduction Tines':
                perk_description.innerText = 'Arc Abilility Kills grant Conduction Tines for 7 seconds. Stacks up to 3x.\nConduction Tines grant various bonuses.\n\nAt x1 Conduction Tines\n1.5% Grenade and Melee Ability per Second | 0.45% Super Ability per Second\n\nAt x2 Conduction Tines\n4% Grenade and Melee Ability per Second | \n\nAt x3 Conduction Tines\n6.3% Grenade and Melee Ability/s | 1.7% Super Ability per Second | 66% Slower Super Drain\nSuper Drain does not affect Chaos Reach, but affects every other Super.\n'
                break;
            case 'Rites of Ember':
                perk_description.innerText = 'Burns last X seconds longer and grant X% Melee Energy on Solar Burn DoT\nDaybreak applies burning.\n\nSolar Burns add Rites of Ember debuff, which amplify the damage dealt by Daybreak.\nOnly Daybreak projectiles, Igniting Touch, and Phoenix Dive work.\n\nTop | Bottom\n1-4 stacks = 1.45x | 1.35x\n5-6 stacks = 2.1x | 1.95x\n7+ stacks = 3.05x | 2.83x'
                break;
            case 'Cerebral Uplink':
                perk_description.innerText = 'Highlights enemies below 33% HP in a red outline, and enemy guardians with Supers Readied in a yellow outline.\n\nPassively regenerates 0.6% of Grenade, Melee, and Class Ability Energy per second.\n(Stasis Grenades recharge at .45% Ability Energy per Second.)'
                break;
            case "Warlord's End":
                perk_description.innerText = "Arc, Solar, and Void Melee Kills, as well as Finishers weaken (1.3x Debuff) and blind.\nDuration and Range are dependant on Enemy Rank. \n\nEnemy Ranks are Minor/Elite/Major/Boss.\nFinishers add 5 Seconds to Duration. Bosses are not finishable.\n\nWarlord's End.\nRange: 10/15/20/25 meters, centered on wearer.\nDuration: 5/10/15/20 seconds.\nFinisher Duration: 10/15/20 seconds.\n\nFinishers while in a Stasis Subclass will grant you the benefits from this Exotic."
                break;
            case 'Close Enough':
                perk_description.innerText = 'Chaos Reach recovers 10% Super Charge on hit. 0.75s Cooldown.\nEffectively maxes out duration by 2 times.\n\nSprinting while above 80% Super Energy grants Topping off Chaos Reach.\nTopping off Chaos Reach charges 4% of Super Energy per second.'
                break;
            case 'Dynamic Duo':
                perk_description.innerText = 'Holding Grenade Ability spawns a Sentient Arc Soul for 20 seconds.\n\nSentient Arc Soul shoots a longer burst of 5 bolts.\n\nIf the Sentient Arc Soul hits during a burst, gain X% Grenade Energy.\n\nStanding in an Arc Soul Rift refreshes the duration of Sentient Arc Soul.\n'
                break;
            case "Vampire's Caress":
                perk_description.innerText = 'On Melee Kill:\n\nHeal for XHP and constantly regenerate XHP/s.\n\nLasts for 8.5 seconds. Can be Refreshed.'
                break;
            case 'Alchemical Etchings':
                perk_description.innerText = '\nWhile inside a Rift or Well of Radiance.\n\n+100 Reload with 0.9x Duration Scale to everyone inside.\n\nWhile inside an Empowering Rift or Well of Radiance.\n\n2.25x Range Increase.\nThis is a multiplier to effective range. Affects every weapon.\n\nChaperone oneshots at 25 meters without Roadborn'
                break;
            case 'Absorption Cells':
                perk_description.innerText = 'Weapon Kills with a Matching Subclass Element grant a buff, depending on whether Super is charged or not.\n\nIf Super is not Full:\nEnergy Siphon for 2 seconds. (Essentially a Cooldown)\nProccing Energy Siphon grants 3(?)% [+1.45%, totalling 4.45%) Super Energy.\n\nIf Super is Full:\nReceive 6s [3.5] (+4 [2] per additional kill) of Absorption Cells, granting a 20% Damage Buff for weapons matching subclass element.\nAbsorption Cells caps at a 10 [6] second duration, but can be refreshed.'
                break;
            case 'Grasp of the Devourer':
                perk_description.innerText = 'Melee hit applies poison. \nPoison deals up to 7.8x the total damage of Melee Damage.\nBosses take an additional 1.8x damage.\n\nInitial Poison tick deals 18% of Melee damage, while the last tick deals 1.54x.\nEach successive Poison tick deals 9% more damage. 19 ticks.\n\nPoisoned enemies spread the poison on death on a 3 meter radius.\n\nThorn final blows (by bullet) spreads poison.\n\ni need to find PvP increases kms'
                break;
            case 'Abyssal Extractors':
                perk_description.innerText = 'Void Kills grant Abyssal Extractors for 2.5 seconds.\nMaxes out at 20 seconds.\n[PVP] Getting a double kill within 2.5 seconds maxes duration to 20 seconds.\n\nWhile Abyssal Extractor is active:\n2.35% Rift Recharge per second\n3.65% Grenade and Melee Recharge per second\n0.67% Super Recharge per second'
                break;
            case 'Cobra Totemic':
                perk_description.innerText = 'Grants +32 Reload and Handling to all weapons.\n\n+1 Meter Lunge range (6.25 -> 7.25)\n\n(Base Melee Range is 5.25 meters)'
                break;
            case 'Battle-Hearth':
                perk_description.innerText = 'Kills while inside a Well of Radiance return Super Energy, up to 75%.\n\n10% Super Energy per Kill, each kill grants 1.5% less from the previous. \nMinimum of 4% Super Energy.\n\n10% -> 8.5% -> 6% -> 4.5% -> 4% -> 4%...'
                break;
            case 'Embers of Light':
                perk_description.innerText = 'Dawnblade Kills spawn both an Empowering and Healing Rift on Enemy Death Location.\n\nwhat a waste of an exotic\nalso legs glow as your super gets charged\n\n'
                break;
            case 'Blood Magic':
                perk_description.innerText = 'Weapon Kills while inside an Empowering or Healing Rift grant Blood Magic\nBlood Magic halts the duration of the Rift.\n\nBlood Magic Duration:\n5 seconds of per Kill. Caps at 15 seconds.'
                break;
            case 'Actual Grandeur':
                perk_description.innerText = " "
                let img1 = document.createElement('img')
                img1.src = 'https://i.kym-cdn.com/photos/images/newsfeed/001/535/091/d97.jpg'
                img1.style.cssText = "width: 260px;"
                perk_description.appendChild(img1)
                break;
            case 'Fusion Harness':
                perk_description.innerText = 'If on Fusion Grenades.\n\nGain an extra Grenade Charge.\n\n20% Grenade Energy per Weapon Damage Instance while Empowered (0.5s Cooldown)\n\n100% Rift Energy on Grenade Kill\n\nEmpowered is either Well of Radiance, Empowering Rift or Guiding Flame.'
                break;
            case 'Ascending Amplitude':
                perk_description.innerText = 'Kills during Stormtrance grant Ascending Amplitude for 8 seconds.\n\nAscending Amplitude increases Stormtrance damage.\n\nAscending Amplitude damage increase.\n1.12x | 1.26x | 1.41x | 1.57x | 1.76x'
                break;
            case 'Helium Spirals':
                perk_description.innerText = 'Solar Grenades possess built-in Fastball and last twice as long.\n\nPowered Melee kills grant 5 seconds of Sunbracers Ready.\n\nThrowing a grenade while Sunbracers Ready is active grants Sunbracers buff, which grants unlimited Solar Grenades for 5 seconds.'
                break;
            case 'Dearly Departed':
                perk_description.innerText = 'On reaching Critical Health: Grants Dearly Departed\n\nDearly Departed regenerates 55% of Rift Energy.\nBuff lasts until no longer Critical.\n\nOn Death: Spawns a Healing Rift for 15 seconds.'
                break;
            case 'Strange Protractor':
                perk_description.innerText = 'Refreshes held weapon after 1.5 seconds of sprinting.\n\nIncreases Sprint Speed by 6.25%\nIncreases Slide Distance by 33%\nSets sneak speed to 100 Mobility.'
                break;
            case 'The Fourth Magic':
                perk_description.innerText = 'Energy Weapon kills grant stacks of Death Throes\n\nEach stack of Death Throes grants 20% faster Grenade Recharge and 1.1x increased Grenade Damage. \nMax of 5 Stacks. Lasts 10 seconds.\n\nOn Grenade Ability: Allies within 18(?) meters receive Feel The Flame.\nFeel the Flame grants 600% (verify) faster Grenade Recharge for (2 * Stacks) seconds.'
                break;
            case 'Planetary Torrent':
                perk_description.innerText = "When surrounded by at least X enemies within X meters, gain Class Ability Recharge\nClass Ability Recharge gains are equivalent to (math here, it's dependent on enemy amount)\n\nOn Rift Cast:\nArc Shockwave that deals 300 (100) damage."
                break;
            case 'Tome of Dawn':
                perk_description.innerText = 'If on Solar Subclass\nAiming Down Sights while midair grants Tome of Dawn\n\nTomes of Dawn\nHolds you in place midair\nReduces in-air accuracy penalty (Less than Icarus Grip)\n Reduces flinch received (Equivalent to Unflinching), \nGrants 15% Damage Resistance.\n\nLasts for 2.8 seconds. Hits refresh Y seconds.'
                break;
            case "Warlord's Sigil":
                perk_description.innerText = "Grants Warlord's Sigil on Melee Kill\nWarlord's Sigil lasts 5 seconds and grants Bonus Melee Damage\n\nBonus Melee Damage:\n2.3x | 3.6x | 4.9x | 6.2x | 7.5x"
                break;
        };
    };
};