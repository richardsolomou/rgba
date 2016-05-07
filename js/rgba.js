(function () {
  'use strict';

  // Colours and container
  var colours = [];
  var colourContainer = $('.colours');

  // Fetch JSON
  $.getJSON('https://qbs.arkonline.co.uk/task/colours.json?task=1', _init);

  /**
   * Initialise the application.
   * @param {Array} data
   */
  function _init (data) {
    // Catch errors
    if (!(data instanceof Array) || !data.length) {
      console.error('Invalid data');
      return false;
    }

    // Assign locally
    console.info('Received data');
    colours = data;
  }
})();
