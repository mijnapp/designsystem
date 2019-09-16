/**
 * Give X and Y center coordinates of given DOM element.
 *
 * @param {Element} element HTML element for which the center is calculated and returned.
 * @return {center: {x: number, y: number}} The coordinates of the center.
 */
export function getElementRectPlus (element) {
  var elementRect = element.getBoundingClientRect();
  elementRect.center = {
    x: elementRect.left + (elementRect.width / 2),
    y: elementRect.top + (elementRect.height / 2),
  };

  return elementRect;
}

/**
 * Calculate the distance between two coordinates.
 *
 * @param {{x: number, y: number}} a Point a with coordinates
 * @param {{x: number, y: number}} b Point b with coordinates
 * @return {number} Distance in pixels.
 */
export function calculateDistance (a, b) {
  if (!a.hasOwnProperty('x') || !b.hasOwnProperty('x')) {
    throw new Error('X coordinates not passed. For both points the X coordinate should be available.');
  }

  if (!a.hasOwnProperty('y') || !b.hasOwnProperty('y')) {
    throw new Error('Y coordinates not passed. For both points the Y coordinate should be available.');
  }

  // Calculate the distance using the Pythagorean Theorem (a^2 + b^2 = c^2).
  var distanceSquared = Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2);
  return Math.sqrt(distanceSquared);
}
