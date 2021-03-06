(function () {
  'use strict';

  // Colours and container
  var colours = [];
  var colourContainer = $('.colours');

  // Fetch JSON
  $.getJSON('https://qbs.arkonline.co.uk/task/colours.json?task=2', init);

  /**
   * Initialise the application.
   * @param {Array} data
   */
  function init (data) {
    // Catch errors
    if (!(data instanceof Array) || !data.length) {
      console.error('Invalid data');
      return false;
    }

    // Assign locally
    console.info('Received data', data);
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
    colour.baseColourHex = rgba(colour.baseColour[0], colour.baseColour[1], colour.baseColour[2]);

    // Create and apply styling to colour element
    var colourElement = createColourElement(colour._id);
    colourElement.css('background-color', colour.baseColourHex);
    colourElement.click(function (e) {
      if (e.target !== this) {
        return;
      }
      console.log('Event fired for click on colour');
    });

    // Assign tints container
    var tintsContainer = colourElement.find('.tints');

    // Loop through tints
    $.each(colour.tints, function (tintId, tint) {
      // Calculate RGB values within limited range
      var tintValues = calculateTintValues(colour._id, tintId);

      // Convert colour tint to hex
      colour.tintsHex[tintId] = rgba(tintValues[0], tintValues[1], tintValues[2]);

      // Create and apply styling to colour tint element
      var tintElement = createTintElement(colour._id, tintId);
      tintElement.css('background-color', colour.tintsHex[tintId]);
      tintElement.click(function () {
        console.log('Event fired for click on tint');
      });

      // Render colour tint
      tintElement.appendTo(tintsContainer);
    });

    // Render colour
    colourElement.appendTo(colourContainer);
  }

  /**
   * Convert rgb value to hex code.
   * @param   {Number} colourId
   * @param   {Number} tintId
   * @returns {Array}
   */
  function calculateTintValues (colourId, tintId) {
    // Set references
    var colour = colours[colourId];
    var tint = colour.tints[tintId];

    // Set RGB colour model settings
    var min = 0;
    var max = 255;
    var tintValues = [];

    // Loop through tint RGB values
    $.each(tint, function (valueId, value) {
      // Sum of colour and tint RGB values
      var colourTint = colour.baseColour[valueId] + value;

      // Tint value limited to given range
      tintValues[valueId] = Math.max(min, Math.min(colourTint, max));
    });

    return tintValues;
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
    var colourElement = $('<div class="colour colour_' + colourId + '">' +
                            colour.name +
                            '<div class="tints"></div>' +
                            colour.baseColourHex +
                          '</div>');

    return colourElement;
  }

  /**
   * Create the tint element.
   * @param   {Number} colourId
   * @param   {Number} tintId
   * @returns {Object}
   */
  function createTintElement (colourId, tintId) {
    // Set references
    var colour = colours[colourId];
    var tint = colour.tintsHex[tintId];

    // Construct tint element
    var tintElement = $('<div class="tint tint_' + tintId + '">' + tint + '</div>');

    return tintElement;
  }

  /**
   * Convert number to hex value.
   * @param   {Number} value
   * @returns {String}
   */
  function toHex (value) {
    return ('0' + parseInt(value).toString(16)).slice(-2);
  }

  /**
   * Convert rgb to hex or rgba.
   * @param   {Number} r
   * @param   {Number} g
   * @param   {Number} b
   * @param   {Number} a
   * @returns {String}
   */
  function rgba (r, g, b, a) {
    if (typeof a !== 'undefined') {
      // Return as rgba value
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
    }

    // Return as hex
    return '#' + toHex(r) + toHex(g) + toHex(b);
  }
})();
