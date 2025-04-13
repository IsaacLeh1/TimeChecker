let currentTabId = null; // Gets current tab
let timeSpent = {}; // Stores time spent on each tab
let activeTabTimer = null; // Tracks active tab time

function startTimer(domain) {
    if (activeTabTimer) clearInterval(activeTabTimer);
    activeTabTimer = setInterval(() => {
        timeSpent[domain] = (timeSpent[domain] || 0) + 1;
        chrome.storage.local.set({ timeSpent });
    }, 1000);
}
// Used to stop the timer when needed in order to ensure time is counted correctly.
function stopTimer() {
    if (activeTabTimer) {
        clearInterval(activeTabTimer);
        activeTabTimer = null;
    }
}

function loadTimeSpent() {
    chrome.storage.local.get(['timeSpent'], (result) => {
        timeSpent = result.timeSpent || {};
        // Helps debugging, used to understand where time goes between tab switching.
        console.log("Loaded time data:", timeSpent);
    });
}

chrome.tabs.onActivated.addListener((activeInfo) => {
    stopTimer();
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        if (!tab || !tab.url) return;
        try {
            const domain = new URL(tab.url).hostname;
            currentTabId = activeInfo.tabId;
            startTimer(domain);
        } catch (error) {
            // Throws error when a tab can not be found in order to accumilate time. AI assisting was used in order to help understand how to add a debugging process to this type.
            console.error("URL ERROR:", error);
        }
    });
});

chrome.tabs.onRemoved.addListener((tabId) => {
    if (tabId === currentTabId) {
        stopTimer();
        currentTabId = null;
    }
});

// Load time data on load
chrome.runtime.onStartup.addListener(loadTimeSpent);
chrome.runtime.onInstalled.addListener(loadTimeSpent);

// Listens for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'timeSpent') {
        sendResponse({ timeSpent });
    } else if (message.type === 'updateTimeSpent') {
        const { domain, time } = message;
        timeSpent[domain] = time;
        chrome.storage.local.set({ timeSpent });
    } else if (message.type === 'addPopupTime') {
        const { domain, time } = message;
        timeSpent[domain] = (timeSpent[domain] || 0) + time; // Add popup time
        chrome.storage.local.set({ timeSpent });
    }
});
