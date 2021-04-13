function filterGodRols(){
    setTimeout(function(){
        if(document.querySelector('._3ywbI') == null){}
        else;
        var wepType = document.querySelector('.Xyg7s').innerHTML.replace(/ /g, '');
        var wepFrame = document.querySelector('._3sBrL').innerHTML.replace(/ /g, '');

        switch(wepType){

            case 'AutoRifle':
                switch(wepFrame){
                    case 'VolatileLight': // Hard Light
                        runAddReload(0.000105640666666667, -0.0290040666666667, 3.08620666666667);
                        // funky range
                        break
                    case 'Four-HeadedDog': // Cerberus+1
                        // funky range
                        runAddReload(0.000105640666666667, -0.0290040666666667, 3.08620666666667);
                        break
                    case 'Payday': // Sweet Business
                        // reload funky
                        // funky range
                        break
                    default:
                        runAddReload(0.000105640666666667, -0.0290040666666667, 3.08620666666667);
                        runAddRange(1.575, 0.107, 10.05, 16)
                        break
                }
                break

            case 'CombatBow':
                //runAddReload()
                break // no data on bows right now

            case 'FusionRifle':
                switch(wepFrame){
                    case 'UnplannedReprieve': // Telesto
                        runAddReload(0.0000759606666666667, -0.0235252333333333, 3.05622666666667);
                        // funky range
                        break
                    default:
                        runAddReload(0.0000759606666666667, -0.0235252333333333, 3.05622666666667);
                        break
                }
                break

            case 'GrenadeLauncher': 
                switch(wepFrame){
                    // Special GL's
                    case 'LightweightFrame':
                    case 'WaveFrame':
                    case "Primeval'sTorment":
                    case 'DelayedGratification':
                        runAddReload(0.0000894073333333333, -0.0258361333333333, 3.49046666666667);
                        break
                    // Heavy GL's
                    case 'Rapid-FireFrame':
                    case 'AdaptiveFrame':
                    case 'Cryocannon':
                        runAddReload(0.0000932386666666667, -0.0295255666666667, 4.41473333333333);
                        break
                }
                break

            case 'HandCannon':
                switch(wepFrame){
                    case 'AggressiveFrame': // different range
                        runAddReload(0.000159282666666667, -0.043624, 4.61606666666667);
                        runAddRange(1.375, 0.115, 20.8, 14)
                        break
                    default:
                        runAddReload(0.000159282666666667, -0.043624, 4.61606666666667);
                        runAddRange(1.375, 0.096, 16, 14)
                        break
                }
                break

            case 'LinearFusionRifle':
                runAddReload(0.0000726496666666667, -0.0236623666666667, 4.38473333333333);
                break

            case 'MachineGun':
                switch (wepFrame){
                    case 'PyrotoxinRounds': // Xenophage
                        runAddReload(0.000111771666666667, -0.0362153333333333, 6.47296666666667);
                        // funky range
                        break
                    default:
                        runAddReload(0.000111771666666667, -0.0362153333333333, 6.47296666666667);
                }
                break

            case 'PulseRifle':
                switch(wepFrame){
                    case 'BlackHole': // Graviton Lance
                        //
                        break
                    default:
                        runAddReload(0.000114346666666667, -0.0308288666666667, 3.22312666666667);
                        runAddRange(1.675, 0.08, 15.4, 17)
                    break
                }
                break

            case 'RocketLauncher':
                runAddReload(0.000128344666666667, -0.0305745666666667, 4.38473333333333);
                break

            case 'ScoutRifle':
                switch(wepFrame){
                    case 'CranialSpike': // Dead Man's Tale
                        //
                        break
                    case 'SlugRifle': // Skyburner's Oath
                    runAddReload(0.000127055666666667, -0.0333065333333333, 3.43833333333333);
                        // funky range
                        break
                default:
                    runAddReload(0.000127055666666667, -0.0333065333333333, 3.43833333333333);
                    runAddRange(1.975, 0.169, 29.2, 20)
                }
                break

            case 'Shotgun':
                switch(wepFrame){
                    case 'CompressionChamber': // Duality
                        // funky range
                        // realod formula missing
                    case 'RepulsorForce': //Tractor Cannon
                        // different reload
                        // range who knows
                        break
                    default: // still need to fix formula
                        runAddReload(0.0000790693333333333, -0.0173282, 1.41598333333333);
                        break
                }
                break

            case 'Sidearm':
                runAddReload(0.0000294211666666667, -0.0144276333333333, 2.28800666666667);
                runAddRange(1.175, 0.034, 11.6, 12)
                break

            case 'SniperRifle':
                runAddReload(0.0000832713333333333, -0.0273923666666667, 4.104);
                break

            case 'SubmachineGun':
                runAddReload(0.000075141, -0.0227633333333333, 2.84781333333333);
                runAddRange(1.275, 0.126, 4.8, 13);
                break

            case 'Sword':
                //
                break //swords don't have reload

            case 'TraceRifle':
                //
                break //traces don't have data
        };

    },1);
};