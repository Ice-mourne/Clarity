var lastTabId;
var lastUrl;

var MyPopupWindow = () => {
    //TODO: move all popup logic here
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        // Open pop-up handler
        if (request.open_popup) {

            let createPopup = (windowData) => {
                chrome.windows.create(windowData,
                    (window) => {
                        
                        if (window) {
                            lastTabId = window.tabs[0].id
                            lastUrl = windowData.url
                            console.log("popup opened from extension " + windowData.url)
                        } else {
                            lastTabId = null
                            lastUrl = null
                            console.log("can't open popup")
                            if (chrome.runtime.lastError) console.log(chrome.runtime.lastError)
                        }
                        
                        sendResponse({tabId: lastTabId, windowId: window.id})
                    }

                )
            }

            if (lastTabId) {
                chrome.tabs.get(lastTabId, async (existingTab) => {
                    if (!existingTab) {
                        if (chrome.runtime.lastError) console.log(chrome.runtime.lastError)
                        createPopup(request.open_popup)
                    } else {
                        if(lastUrl && lastUrl == request.open_popup.url) {
                            sendResponse({ tabId: lastTabId })
                        } else {
                            chrome.tabs.update(lastTabId, { url: request.open_popup.url }, 
                                (tab) => {
                                    if (!tab) {
                                        createPopup(request.open_popup)
                                    } else {
                                        lastUrl = request.open_popup.url
                                        sendResponse({ tabId: tab.id })
                                    }
                                }
                            )
                        }
                        
                    }
                })
            } else {
                createPopup(request.open_popup)
            }

            //return true to indicate we'll answer asynchronously
            return true
        }

        //Get community rolls from opened pop up
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