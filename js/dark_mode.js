define(['storage'], function(storage) {
  'use strict';

  var DARK_MODE_KEY = 'dark_mode_enabled';

  function init() {
    // Load dark mode preference from storage
    loadDarkModePreference();

    // Add click listener to dark mode toggle button
    $('.dark-mode-toggle').click(function() {
      toggleDarkMode();
    });
  }

  function loadDarkModePreference() {
    chrome.storage.local.get([DARK_MODE_KEY], function(result) {
      if (result[DARK_MODE_KEY]) {
        enableDarkMode();
      }
    });
  }

  function toggleDarkMode() {
    if ($('body').hasClass('dark-mode')) {
      disableDarkMode();
      saveDarkModePreference(false);
    } else {
      enableDarkMode();
      saveDarkModePreference(true);
    }
  }

  function enableDarkMode() {
    $('body').addClass('dark-mode');
  }

  function disableDarkMode() {
    $('body').removeClass('dark-mode');
  }

  function saveDarkModePreference(enabled) {
    var data = {};
    data[DARK_MODE_KEY] = enabled;
    chrome.storage.local.set(data);
  }

  return {
    init: init
  };
});
