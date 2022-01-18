var lastTabId;

var MyPopupWindow = () => {
    //TODO: move popup logic here
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.open_popup) {

            let createPopup = (windowData) => {
                chrome.windows.create(windowData,
                    (window) => {
                        
                        if (window) {
                            lastTabId = window.tabs[0].id
                            console.log("popup opened from extension " + windowData.url)
                        } else {
                            lastTabId = null
                            console.log("can't open popup")
                            if (chrome.runtime.lastError) console.log(chrome.runtime.lastError)
                        }
                        
                        sendResponse({tabId: lastTabId, windowId: window.id})
                    }

                )
            }

            if (lastTabId) {
                chrome.tabs.update(lastTabId, { url: request.open_popup.url }, 
                    (tab) => {
                        if (!tab) {
                            if (chrome.runtime.lastError) console.log(chrome.runtime.lastError)
                            createPopup(request.open_popup)
                        } else {
                            sendResponse({ tabId: tab.id })
                        }
                    }
                )
            } else {
                createPopup(request.open_popup)
            }

            //return true to indicate we'll answer asynchronously
            return true
        }

        if(request.get_community_rolls){
            chrome.tabs.executeScript( request.get_community_rolls.tabId,
            {   //details
                allFrames: true,
                runAt: 'document_end',
                code: `(function getCommunityRolls() {
                    var communityDiv = document.getElementById('community-average')
                    if(communityDiv){
                        return communityDiv.innerHTML
                    } else { 
                        return null
                    }
                })()
                `,
            },
                (injectionResults) => {
                    /*
                    for (const frameResult of injectionResults) {
                        console.log('Frame Title: ' + frameResult)   
                    }
                    */
                    sendResponse({ rollsDivHtml: injectionResults[0] })
                }
            )
            return true
        }
    }
);