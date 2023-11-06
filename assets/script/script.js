'use strict';

// Add event listener
function onEvent(event, selector, callback) {
  return selector.addEventListener(event, callback);
}

// Get HTML element by id
function selectById(selector, parent = document) {
  return parent.getElementById(selector);
}

// Select HTML element
function select(selector, parent = document) {
  return parent.querySelector(selector);
}

// Get a (node) list of HTML elements as array
function selectAll(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}

// Print
function print(arg) {
  console.log(arg);
}

// Sleep
function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

// Generate random number between - and including - 'min' and 'max'
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Filter array
function filterArray(array, callback) {
  return array.filter(callback);
}

// Create an HTML element
function create(element, parent = document) {
  return parent.createElement(element);
}

const pageWidth = selectById('page-width');
const pageHeight = selectById('page-height');
const deviceOrientation = selectById('device-orientation');

function getWindowDimensions() {
  pageWidth.innerText = `Window width: ${window.innerWidth}px`;
  pageHeight.innerText = `Window height: ${window.innerHeight}px`;
  if (window.innerWidth >= window.innerHeight) {
    deviceOrientation.innerText = `Orientation: Landscape`;
  } else {
    deviceOrientation.innerText = `Orientation: Portrait`;
  }
}

// ! System
const userOS = selectById('user-os');
function getOS() {
  let opSystem = navigator.userAgent;
  if (opSystem.includes('Windows')) {
    userOS.innerText = `OS: Windows`;
  } else if (opSystem.includes('Mac')) {
    userOS.innerText = `OS: Mac/iOS`;
  } else {
    userOS.innerText = `OS: Unknown`;
  }
}

// ! Browser

const browser = selectById('user-browser');
function getBrowser() {
  let browserInfo = navigator.userAgent;
  if (browserInfo.includes('Edg')) {
    browser.innerText = `Browser: Edge`;
  } else if (browserInfo.includes('Chrome')) {
    browser.innerText = `Browser: Chrome`;
  } else if (browserInfo.includes('Firefox')) {
    browser.innerText = `Browser: Firefox`;
  } else {
    browser.innerText = `Browser: Unkown`;
  }
}

// ! Battery
const batteryLevel = selectById('bat-level');
const batteryStatus = selectById('bat-status');
batteryLevel.innerText = `Battery level: Unavailable`;
batteryStatus.innerText = `Status: Unavailable`;

if ('getBattery' in navigator) {
  navigator.getBattery().then((battery) => {
    function updateBateryInfo() {
      updateChargeInfo();
      updateLevelInfo();
    }
    updateBateryInfo();

    function updateChargeInfo() {
      if (battery.charging) {
        batteryStatus.innerText = `Status: Charging`;
      } else {
        batteryStatus.innerText = `Status: Idle`;
      }
    }
    onEvent('chargingchange', battery, () => {
      updateChargeInfo();
    });

    function updateLevelInfo() {
      batteryLevel.innerText = `Battery level: ${battery.level * 100}%`;
    }
    onEvent('levelchange', battery, () => {
      updateLevelInfo();
    });
  });
}

// ! WiFi Status
const wifiStatus = selectById('wifi-status');
const wifiContainer = selectById('wifi-container');

function updateWifiStatus() {
  if (navigator.onLine) {
    wifiStatus.innerText = 'ONLINE';
    wifiContainer.style.backgroundColor = '#3e933e';
  } else {
    wifiStatus.innerText = 'OFFLINE';
    wifiContainer.style.backgroundColor = '#b72929';
  }
  onEvent('online', window, () => {
    wifiStatus.innerText = 'ONLINE';
    wifiContainer.style.backgroundColor = '#3e933e';
  });
  onEvent('offline', window, () => {
    wifiStatus.innerText = 'OFFLINE';
    wifiContainer.style.backgroundColor = '#b72929';
  });
}

onEvent('load', window, () => {
  getWindowDimensions();
  getOS();
  getBrowser();
  updateWifiStatus();
});

onEvent('resize', window, () => {
  getWindowDimensions();
});
