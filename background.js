var lastTabId;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.open_popup) {

            let createPopup = (windowData) => {
                chrome.windows.create(windowData , function(window) {
                    lastTabId = window.tabs[0].id
                    console.log("popup opened from extension " + windowData.url)
                })
            }

            if (lastTabId) {
                chrome.tabs.update(lastTabId, { url: request.open_popup.url }, 
                    (tab) => {
                        if (!tab) {
                            if (chrome.runtime.lastError) console.log(chrome.runtime.lastError)
                            createPopup(request.open_popup)
                        }
                    }
                )
            } else {
                createPopup(request.open_popup)
            }

        }
    }
);