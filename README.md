# Tab Time Tracking Extension
#### Video Demo:  <URL [HERE](https://youtu.be/wxiEWYOYNQU)>
#### Description:
Keeps track of tabs and time on each tab. The purpose is to improve time efficiency so user will know how much time they spend on different sites in order to better understand how they can use their time.

Your README.md file should be minimally multiple paragraphs in length, and should explain what your project is, what each of the files you wrote for the project contains and does, and if you debated certain design choices, explaining why you made them. Ensure you allocate sufficient time and energy to writing a README.md that documents your project thoroughly. Be proud of it! A README.md in the neighborhood of 750 words is likely to be sufficient for describing your project and all aspects of its functionality. If unable to reach that threshold, that probably means your project is insufficiently complex.

# Tab Time Tracking Extension

#### Video Demo: [Watch Here](https://youtu.be/wxiEWYOYNQU)

---

## Description

The **Tab Time Tracking Extension** is a Chrome browser extension designed to help users monitor and manage their time spent on different websites. By tracking the time spent on each tab, the extension provides insights into browsing habits, enabling users to make informed decisions about their time management and productivity. The extension displays a summary of time spent on various domains in a popup, which updates in real-time as the user browses.

The primary goal of this project is to promote time efficiency by giving users a clear understanding of how much time they spend on different websites. This can be particularly useful for individuals looking to reduce distractions, improve focus, or simply gain awareness of their online habits.

---

## Features

- **Real-Time Tracking**: Tracks the time spent on the currently active tab and updates the data every second.
- **Domain-Based Summary**: Displays a breakdown of time spent on each domain in a user-friendly popup interface.
- **Persistent Data**: Saves time tracking data using Chrome's storage API, ensuring data is retained even after the browser is closed.
- **Popup Interface**: Provides a clean and simple interface to view time spent on various domains.
- **Automatic Cleanup**: Stops tracking when the popup is closed to conserve resources.

---

## File Descriptions

### 1. `popup.js`
This file contains the core logic for the popup interface of the extension. It handles:
- **Time Formatting**: Converts raw seconds into a human-readable format (e.g., `1h 15m 30s`).
- **Data Retrieval**: Communicates with the background script to fetch the time spent on various domains.
- **UI Rendering**: Dynamically updates the popup's HTML to display the time spent on each domain.
- **Real-Time Updates**: Uses a timer to increment the time spent on the active domain every second.
- **Event Handling**: Cleans up resources (e.g., stopping the timer) when the popup is closed.

### 2. `manifest.json`
This is the configuration file for the Chrome extension. It defines:
- The extension's name, version, and description.
- Permissions required by the extension, such as access to tabs and storage.
- The scripts and resources used by the extension, including the popup HTML and JavaScript files.

### 3. `background.js` (if applicable)
This file (not shown in the provided code but likely part of the project) would handle:
- Persistent storage of time tracking data using Chrome's storage API.
- Communication with the popup script to provide the latest time tracking data.
- Listening for tab activity events to track the active domain.

### 4. `popup.html`
This file defines the structure of the popup interface. It includes:
- A container (`#summary`) for displaying the list of domains and their respective time spent.
- Basic styling and layout for the popup.

### 5. `readme.md`
This file (the one you're reading) serves as the documentation for the project. It explains the purpose of the extension, describes its features, and provides details about each file and its functionality.

---

## Design Decisions

### **1. Real-Time Updates**
The extension uses a `setInterval` function in `popup.js` to increment the time spent on the active domain every second. This decision was made to ensure that the data displayed in the popup is always up-to-date. However, to avoid unnecessary resource usage, the timer is cleared when the popup is closed.

### **2. Domain-Based Tracking**
Instead of tracking time at the tab level, the extension tracks time based on the domain of the active tab. This approach simplifies the data structure and provides more meaningful insights to the user (e.g., total time spent on `example.com` rather than individual tabs).

### **3. Chrome Storage API**
The extension uses Chrome's storage API to persist time tracking data. This ensures that the data is not lost when the browser is closed or the extension is reloaded. While local storage could have been used, the Chrome storage API is more suitable for extensions and provides additional features like syncing data across devices.

### **4. Error Handling**
The `updateTimeSpent` function includes error handling for cases where the active tab's URL cannot be parsed. This prevents the extension from crashing and ensures a smooth user experience.

---

## How to Use

1. **Install the Extension**: Load the extension into Chrome by enabling developer mode and loading the unpacked project folder.
2. **Open the Popup**: Click on the extension icon in the browser toolbar to open the popup.
3. **View Time Spent**: The popup will display a list of domains and the time spent on each.
4. **Track in Real-Time**: Leave the popup open to see the time spent on the active domain update in real-time.
5. **Close the Popup**: The extension will stop updating the timer when the popup is closed.

---

## Future Improvements

- **Custom Time Limits**: Allow users to set time limits for specific domains and receive notifications when the limit is reached.
- **Detailed Reports**: Provide weekly or monthly reports of time spent on different domains.
- **Cross-Device Syncing**: Use Chrome's sync storage to enable time tracking data to be shared across devices.
- **Idle Detection**: Pause time tracking when the user is idle or away from the computer.

---

## Conclusion

The Tab Time Tracking Extension is a simple yet powerful tool for understanding and managing online time. By providing real-time tracking and a clear summary of browsing habits, it empowers users to make better decisions about their time. The project demonstrates the use of Chrome extension APIs, dynamic UI updates, and efficient resource management, making it a valuable addition to any productivity toolkit.