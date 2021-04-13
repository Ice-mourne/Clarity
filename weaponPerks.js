

function runAddReload (a, b, c){
    var r = [a, b, c]
    return r
}
var rersdfsdf = runAddReload

function changeWepPerks(){
    if(document.querySelector('._3ppxp > h2') == null){}
    else{
        var wepPerk = document.querySelector("._3ppxp > h2").innerHTML;
        var wepPerkDescription = document.querySelector("._3ppxp > div > span");
        var realoadValue = document.querySelectorAll("._3utrN")[5].textContent;
        var wepType = document.querySelector('.Xyg7s').innerHTML.replace(/ /g, '');
        var wepFrame = document.querySelector('._3sBrL').innerHTML.replace(/ /g, '');
        console.log(rersdfsdf);
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
                
                let cauculation = (a * realoadValue * realoadValue + b * realoadValue + c)







                wepPerkDescription.innerHTML = "Kills increase reload speed"
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