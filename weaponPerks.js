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
            case "Archer's Tempo":
                wepPerkDescription.innerHTML = "On Precision Hit: Sets drawtime to 440ms for 3 seconds."
                break
            case 'Frenzy':
                wepPerkDescription.innerHTML = "Being in combat for 12 seconds grants 15% increased damage, 50(?) handling, and 50 reload. \nLasts until you're out of combat. \nIt's technically a \"state\" so it works when stowed, and it also applies to all of your weapons with Frenzy. \nPerks description stolen from Pip1n spread sheet"
                break
            case 'Demolitionist':
                let imgLinkLegth = document.querySelector("._2D_sR > img").currentSrc.length
                if(imgLinkLegth === 275){
                    wepPerkDescription.innerHTML = "Kills grant 10% Grenade Ability Energy.\nUsing your grenade ability refreshes magazine. 3 second cooldown."
                } else{
                        wepPerkDescription.innerHTML = "Kills grant 20% Grenade Ability Energy.\nUsing your grenade ability refreshes magazine. 3 second cooldown."
                    }
                break
            case 'Feeding Frenzy':
                function cauculation(realoadValue){
                    return (abc[0] * realoadValue * realoadValue + abc[1] * realoadValue + abc[2]);
                }
                wepPerkDescription.innerHTML = "Kills increase reload speed for 3.5 seconds. Refreshes on kill.\rStack  | Time   | Stat   | Multiplier\r1x       |  " + Math.min(cauculation(realoadValue * 1 + 10), 100).toFixed(2) + 's  | 10     | -\r2x       |  ' + Math.min((cauculation(realoadValue * 1 + 45) * 0.9), 100).toFixed(2) + 's  | 45     | 0.9\r3x       |  ' + Math.min((cauculation(realoadValue * 1 + 55) * 0.88), 100).toFixed(2) + 's  | 55     | 0.88\r4x       |  ' + Math.min((cauculation(realoadValue * 1 + 70) * 0.85), 100).toFixed(2) + 's  | 70     | 0.85\r5x       |  ' + Math.min((cauculation(realoadValue * 1 + 100) * 0.8), 100).toFixed(2) + 's  | 100   | 0.8'
                break
            case 'Unrelenting':
                wepPerkDescription.innerHTML = "Test shotguns"
                console.log();
                break
            case 'Unrelenting':
                wepPerkDescription.innerHTML = "Test shotguns"
                console.log();
                break
            case 'Unrelenting':
                wepPerkDescription.innerHTML = "Test shotguns"
                console.log();
                break
            case 'Unrelenting':
                wepPerkDescription.innerHTML = "Test shotguns"
                console.log();
                break
            case 'Unrelenting':
                wepPerkDescription.innerHTML = "Test shotguns"
                console.log();
                break
            case 'Unrelenting':
                wepPerkDescription.innerHTML = "Test shotguns"
                console.log();
                break
            case 'Unrelenting':
                wepPerkDescription.innerHTML = "Test shotguns"
                console.log();
                break
            case 'Unrelenting':
                wepPerkDescription.innerHTML = "Test shotguns"
                console.log();
                break
            case 'Unrelenting':
                wepPerkDescription.innerHTML = "Test shotguns"
                console.log();
                break
            case 'Unrelenting':
                wepPerkDescription.innerHTML = "Test shotguns"
                console.log();
                break
            case 'Unrelenting':
                wepPerkDescription.innerHTML = "Test shotguns"
                console.log();
                break
        }
        }
}