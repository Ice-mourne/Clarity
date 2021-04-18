function filterGodRols(){
    //setTimeout(function(){
        var wepType = document.querySelector('.Xyg7s').innerText;
        var wepFrame = document.querySelector('._3sBrL').innerText;

        // Numbers for reload formula
        var AutoRifle_reload = [0.000105640666666667, -0.0290040666666667, 3.08620666666667]
        //var CombatBow_reload = [, ,]
        var FusionRifle_reload = [0.0000759606666666667, -0.0235252333333333, 3.05622666666667]
        var SpecialGL_reload = [0.0000894073333333333, -0.0258361333333333, 3.49046666666667]
        var HeavyGL_reload = [0.0000932386666666667, -0.0295255666666667, 4.41473333333333]
        var HandCannon_reload = [0.000159282666666667, -0.043624, 4.61606666666667]
        var LinearFusion_reload = [0.0000726496666666667, -0.0236623666666667, 4.38473333333333]
        var MachineGun_reload = [0.000111771666666667, -0.0362153333333333, 6.47296666666667]
        var PulseRifle_reload = [0.000114346666666667, -0.0308288666666667, 3.22312666666667]
        var RocketLauncher_reload = [0.000128344666666667, -0.0305745666666667, 4.38473333333333]
        var ScoutRifle_reload = [0.000127055666666667, -0.0333065333333333, 3.43833333333333]
        var Shotgun_reload = [0.0000790693333333333, -0.0173282, 1.41598333333333]
        var Sidearm_reload = [0.0000294211666666667, -0.0144276333333333, 2.28800666666667]
        var SniperRifle_reload = [0.0000832713333333333, -0.0273923666666667, 4.104]
        var SubmachineGun_reload = [0.000075141, -0.0227633333333333, 2.84781333333333]
        //var TraceRifle_reload = [, ,]

        switch(wepType){
            case 'Auto Rifle':
                switch(wepFrame){
                    case 'Volatile Light': // Hard Light
                        runAddReload(AutoRifle_reload[0],AutoRifle_reload[1],AutoRifle_reload[2]);
                        sessionStorage.setItem('abc', JSON.stringify(AutoRifle_reload))
                        // funky range
                        break
                    case 'Four-Headed Dog': // Cerberus+1
                        // funky range
                        runAddReload(AutoRifle_reload[0],AutoRifle_reload[1],AutoRifle_reload[2]);
                        sessionStorage.setItem('abc', JSON.stringify(AutoRifle_reload))
                        break
                    case 'Payday': // Sweet Business
                        // reload funky
                        // funky range
                        break
                    default:
                        runAddReload(AutoRifle_reload[0],AutoRifle_reload[1],AutoRifle_reload[2]);
                        sessionStorage.setItem('abc', JSON.stringify(AutoRifle_reload))
                        runAddRange(1.575, 0.107, 10.05, 16)
                        break
                }
                break
            case 'Combat Bow':
                //runAddReload()
                break // no data on bows right now
            case 'Fusion Rifle':
                switch(wepFrame){
                    case 'Unplanned Reprieve': // Telesto
                        runAddReload(FusionRifle_reload[0],FusionRifle_reload[1],FusionRifle_reload[2]);
                        sessionStorage.setItem('abc', JSON.stringify(FusionRifle_reload))
                        // funky range
                        break
                    default:
                        runAddReload(FusionRifle_reload[0],FusionRifle_reload[1],FusionRifle_reload[2]);
                        sessionStorage.setItem('abc', JSON.stringify(FusionRifle_reload))
                        break
                }
                break
            case 'Grenade Launcher': 
                switch(wepFrame){
                    // Special GL's
                    case 'Lightweight Frame':
                    case 'Wave Frame':
                    case "Primeval's Torment":
                    case 'Delayed Gratification':
                        runAddReload(SpecialGL_reload[0],SpecialGL_reload[1],SpecialGL_reload[2]);
                        sessionStorage.setItem('abc', JSON.stringify(SpecialGL_reload))
                        break
                    // Heavy GL's
                    case 'Rapid-Fire Frame':
                    case 'Adaptive Frame':
                    case 'Cryocannon':
                        runAddReload(HeavyGL_reload[0],HeavyGL_reload[1],HeavyGL_reload[2]);
                        sessionStorage.setItem('abc', JSON.stringify(HeavyGL_reload))
                        break
                }
                break
            case 'Hand Cannon':
                switch(wepFrame){
                    case 'Aggressive Frame': // different range
                        runAddReload(HandCannon_reload[0],HandCannon_reload[1],HandCannon_reload[2]);
                        sessionStorage.setItem('abc', JSON.stringify(HandCannon_reload))
                        runAddRange(1.375, 0.115, 20.8, 14)
                        break
                    default:
                        runAddReload(HandCannon_reload[0],HandCannon_reload[1],HandCannon_reload[2]);
                        sessionStorage.setItem('abc', JSON.stringify(HandCannon_reload))
                        runAddRange(1.375, 0.096, 16, 14)
                        break
                }
                break
            case 'Linear Fusion Rifle':
                runAddReload(LinearFusion_reload[0],LinearFusion_reload[1],LinearFusion_reload[2]);
                sessionStorage.setItem('abc', JSON.stringify(LinearFusion_reload))
                break
            case 'Machine Gun':
                switch (wepFrame){
                    case 'Pyrotoxin Rounds': // Xenophage
                        runAddReload(MachineGun_reload[0],MachineGun_reload[1],MachineGun_reload[2]);
                        sessionStorage.setItem('abc', JSON.stringify(MachineGun_reload))
                        // funky range
                        break
                    default:
                        runAddReload(MachineGun_reload[0],MachineGun_reload[1],MachineGun_reload[2]);
                        sessionStorage.setItem('abc', JSON.stringify(MachineGun_reload))
                }
                break
            case 'Pulse Rifle':
                switch(wepFrame){
                    case 'Black Hole': // Graviton Lance
                        //
                        break
                    default:
                        runAddReload(PulseRifle_reload[0],PulseRifle_reload[1],PulseRifle_reload[2]);
                        sessionStorage.setItem('abc', JSON.stringify(PulseRifle_reload))
                        runAddRange(1.675, 0.08, 15.4, 17)
                    break
                }
                break
            case 'Rocket Launcher':
                runAddReload(RocketLauncher_reload[0],RocketLauncher_reload[1],RocketLauncher_reload[2]);
                sessionStorage.setItem('abc', JSON.stringify(RocketLauncher_reload))
                break
            case 'Scout Rifle':
                switch(wepFrame){
                    case 'Cranial Spike': // Dead Man's Tale
                        //
                        break
                    case 'Slug Rifle': // Skyburner's Oath
                    runAddReload(ScoutRifle_reload[0],ScoutRifle_reload[1],ScoutRifle_reload[2]);
                    sessionStorage.setItem('abc', JSON.stringify(ScoutRifle_reload))
                        // funky range
                        break
                default:
                    runAddReload(ScoutRifle_reload[0],ScoutRifle_reload[1],ScoutRifle_reload[2]);
                    sessionStorage.setItem('abc', JSON.stringify(ScoutRifle_reload))
                    runAddRange(1.975, 0.169, 29.2, 20)
                }
                break
            case 'Shotgun':
                switch(wepFrame){
                    case 'Compression Chamber': // Duality
                        // funky range
                        // realod formula missing
                    case 'Repulsor Force': //Tractor Cannon
                        // different reload
                        // range who knows
                        break
                    default: // still need to fix formula
                        runAddReload(Shotgun_reload[0],Shotgun_reload[1],Shotgun_reload[2]);
                        sessionStorage.setItem('abc', JSON.stringify(Shotgun_reload))
                        break
                }
                break
            case 'Sidearm':
                runAddReload(Sidearm_reload[0],Sidearm_reload[1],Sidearm_reload[2]);
                sessionStorage.setItem('abc', JSON.stringify(Sidearm_reload))
                runAddRange(1.175, 0.034, 11.6, 12)
                break
            case 'Sniper Rifle':
                runAddReload(SniperRifle_reload[0],SniperRifle_reload[1],SniperRifle_reload[2]);
                sessionStorage.setItem('abc', JSON.stringify(SniperRifle_reload))
                break
            case 'Submachine Gun':
                runAddReload(SubmachineGun_reload[0],SubmachineGun_reload[1],SubmachineGun_reload[2]);
                sessionStorage.setItem('abc', JSON.stringify(SubmachineGun_reload))
                runAddRange(1.275, 0.126, 4.8, 13);
                break
            case 'Sword':
                //
                break //swords don't have reload
            case 'Trace Rifle':
                //
                break //traces don't have data
        };
    //},1);
};