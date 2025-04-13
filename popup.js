document.addEventListener('DOMContentLoaded', function () {
    // Cleans up the counted time of seconds into minutes and hours
  function formatTime(seconds) {
      if (seconds < 60) {
          return `${seconds}s`;
      } else if (seconds < 3600) { // Turns seconds into minutes
          const mins = Math.floor(seconds / 60);
          const secs = seconds % 60;
          return `${mins}m ${secs}s`;
      } else {
          const hrs = Math.floor(seconds / 3600); // Turns minutes into hours
          const mins = Math.floor((seconds % 3600) / 60);
          const secs = seconds % 60;
          return `${hrs}h ${mins}m ${secs}s`;
      }
  }

  let liveTimeSpent = {};
  let activeDomain = null;
  let popupTimer = null;

  function updateTimeSpent() {
      chrome.runtime.sendMessage({ type: 'timeSpent' }, function (response) {
          liveTimeSpent = { ...response.timeSpent }; // Start live time tracking
          renderTimeSpent();
      });

      // Get the active tab's domain
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          if (tabs.length > 0) {
              try {
                  activeDomain = new URL(tabs[0].url).hostname;
              } catch (error) {
                // Used to help debug within console - AI assisted in order to understand how to get it to throw when necessary instead of sometimes. (Specifically when switching tabs)
                  console.error("URL ERROR:", error);
              }
          }
      });
  }

  function renderTimeSpent() {
      const summary = document.getElementById('summary'); // Used tutorial to understand how to build formatting with consistent data
      summary.innerHTML = '';
      for (const domain in liveTimeSpent) {
          const li = document.createElement('li');
          li.textContent = `${domain}: ${formatTime(liveTimeSpent[domain])}`;
          summary.appendChild(li);
      }
  }

  function incrementTimeSpent() {
      if (activeDomain) {
          liveTimeSpent[activeDomain] = (liveTimeSpent[activeDomain] || 0) + 1;
          chrome.runtime.sendMessage({ // Persist the updated time to be real
              type: 'updateTimeSpent',
              domain: activeDomain,
              time: liveTimeSpent[activeDomain]
          });
      }
      renderTimeSpent();
  }

// Starts a timer so the count contiues when the popup opens. 1000 milliseconds adds up to 1 second -> Needed help understanding this through web searching on timers
  updateTimeSpent();
  popupTimer = setInterval(incrementTimeSpent, 1000);

  // Clear the timer when the popup is closed to save resources
  window.addEventListener('unload', function () {
      clearInterval(popupTimer);
  });
});

