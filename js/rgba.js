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

    // Loop through colours
    $.each(colours, function (colourId, colour) {
      // Setup properties
      colour._id = colourId;
      colour.tintsHex = [];

      // Calculate and render colour
      renderColour(colour);
    });
  }

  /**
   * Render the colour and its tints.
   * @param {Object} colour
   */
  function renderColour (colour) {
    // Convert base colour to hex
    colour.baseColourHex = rgbToHex(colour.baseColour[0], colour.baseColour[1], colour.baseColour[2]);

    // Create and apply styling to colour element
    var colourElement = createColourElement(colour._id);
    colourElement.css('background-color', colour.baseColourHex);
  }

  /**
   * Create the colour element.
   * @param   {Number} colourId
   * @returns {Object}
   */
  function createColourElement (colourId) {
    // Set references
    var colour = colours[colourId];

    // Construct colour element
    var colourElement = $('<div/>', {
      class: 'colour colour_' + colourId,
      text: colour.name + ' ' + colour.baseColourHex
    });

    // Construct tints container element
    var tintsElement = $('<div/>', {
      class: 'tints'
    });

    // Append tints container to colour
    tintsElement.appendTo(colourElement);

    return colourElement;
  }

  /**
   * Convert number to hex value.
   * @param   {Number} value
   * @returns {String}
   */
  function valueToHex (value) {
    var hex = value.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  /**
   * Convert rgb value to hex code.
   * @param   {Number} r
   * @param   {Number} g
   * @param   {Number} b
   * @returns {String}
   */
  function rgbToHex (r, g, b) {
    return '#' + valueToHex(r) + valueToHex(g) + valueToHex(b);
  }
})();
