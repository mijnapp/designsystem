import {
  getElementRectPlus,
  calculateDistance,
} from '../../../js/utils/dom-geometry';

var STEP_STATUS = {
  OPEN: 'OPEN',
  CURRENT: 'CURRENT',
  DONE: 'DONE',
  SKIP: 'SKIP',
};

var circleIcon = '' +
  '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16" xml:space="preserve" class="icon" aria-hidden="true" role="presentation" focusable="false">' +
  '<g>' +
  '<circle fill="currentColor" cx="8" cy="8" r="8"/>' +
  '</g>' +
  '</svg>';

var checkIcon = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16" class="icon" aria-hidden="true" role="presentation" focusable="false">' +
  '<g>' +
  '<polygon fill="currentColor" points="16,3.8 14.1,1.8 12,3.9 5.6,10.3 1.9,6.6 0,8.6 3.7,12.2 3.7,12.2 5.6,14.2 7.5,12.2 7.5,12.2"/>' +
  '</g>' +
  '</svg>';

/**
 * Initialize status indicator.
 *
 * @param {Element} statusIndicatorElement Status indicator DOM element.
 */
export default function StatusIndicator (statusIndicatorElement) {
  var component = {
    statusIndicatorElement: statusIndicatorElement,
    backgroundLineElement: statusIndicatorElement.getElementsByClassName(
      'status-indicator__background')[0],
    progressLineElement: statusIndicatorElement.getElementsByClassName(
      'status-indicator__progress')[0],
    allStepsDone: true,
    steps: [],
    setProgress: setProgress,
    statusTextList: parseStepStatusStringToObject(
      statusIndicatorElement.dataset.statusList),
  };

  // Set toggle trigger if exist.
  // Why do we need this? If initially the content is hidden
  // getBoundingClientRect will return zero, which will also result in step
  // center not calculated correctly.
  var toggleTriggerElement = null;
  if (component.statusIndicatorElement.dataset.toggleTrigger) {
    toggleTriggerElement = document.getElementById(
      component.statusIndicatorElement.dataset.toggleTrigger);
  }
  if (toggleTriggerElement) {
    toggleTriggerElement.addEventListener('click', function () {
      component.setProgress();
    });
  }

  var stepItems = component.statusIndicatorElement.getElementsByClassName(
    'status-indicator__step');
  for (var stepItemIndex = 0; stepItemIndex <
  stepItems.length; stepItemIndex++) {
    var stepElement = stepItems[stepItemIndex];
    var step = {
      element: stepElement,
      iconElement: stepElement.getElementsByClassName(
        'status-indicator__icon')[0],
      labelElement: stepElement.getElementsByClassName(
        'status-indicator__label')[0],
      status: null,
      isLastStep: false,
    };

    // Toggle step description content.
    step.element.addEventListener('click', handleToggle(component));

    // Initially set state and icon depending on class name.
    if (stepElement.classList.contains('status-indicator__skip-step')) {
      step.status = STEP_STATUS.SKIP;
      step.iconElement.innerHTML = generateIconElementContent(
        component.statusTextList[step.status], checkIcon);
      step.labelElement.disabled = true;
    } else if (stepElement.classList.contains('status-indicator__done-step')) {
      step.status = STEP_STATUS.DONE;
      step.iconElement.innerHTML = generateIconElementContent(
        component.statusTextList[step.status], checkIcon);
      step.labelElement.disabled = false;
    } else if (stepElement.classList.contains(
      'status-indicator__current-step')) {
      step.status = STEP_STATUS.CURRENT;
      step.element.classList.add('status-indicator__open');
      step.iconElement.innerHTML = generateIconElementContent(
        component.statusTextList[step.status], circleIcon);
      step.labelElement.disabled = true;
      component.allStepsDone = false;
    } else {
      step.status = STEP_STATUS.OPEN;
      step.iconElement.innerHTML = generateIconElementContent(
        component.statusTextList[step.status]);
      step.labelElement.disabled = true;
    }

    component.steps[stepItemIndex] = step;
  }

  // Handle last step
  var lastStep = component.steps[component.steps.length - 1];
  lastStep.isLastStep = true;

  // In case all steps are done, open the last step.
  if (component.allStepsDone) {
    lastStep.element.classList.add('status-indicator__open');
  }

  component.setProgress();

  // Recalculate progress line on window resize (responsive behaviour).
  window.addEventListener('resize', function () {
    component.setProgress();
  });
}

/**
 * Parse the list of step statuses to object.
 *
 * @param {string} statusesAsString
 * @return {{[p: string]: string}}
 */
function parseStepStatusStringToObject (statusesAsString) {
  var splitString = statusesAsString.split('|');
  return {
    'SKIP': splitString[0],
    'DONE': splitString[1],
    'CURRENT': splitString[2],
    'OPEN': splitString[3],
  };
}

/**
 * Generate content for the step icon element. Depending on the status a screen
 * reader text is put in place.
 *
 * @param {string} statusText
 * @param {string} iconSnippet
 * @return {string}
 */
function generateIconElementContent (statusText, iconSnippet) {
  iconSnippet = (typeof iconSnippet !== 'undefined') ? iconSnippet : '';

  return '' +
    iconSnippet +
    '<span class="screen-reader-only">' + statusText + '</span>';
}

/**
 * Handle toggling of title description.
 *
 * @param {Object} component Status indicator container.
 * @returns {EventListener} Click event.
 */
function handleToggle (component) {
  return function (event) {
    // Don't need to toggle open step.
    if (this.classList.contains('status-indicator__open')) {
      return;
    }

    // Steps to come are not togglable.
    if (!this.classList.contains('status-indicator__current-step') &&
      !this.classList.contains('status-indicator__done-step')) {
      return;
    }

    // Only handle clicks on the title.
    if (event.target.classList.contains('status-indicator__label')) {
      var currentStepElement = component.statusIndicatorElement.getElementsByClassName(
        'status-indicator__open')[0];

      // Toggle disabled mode for button.
      currentStepElement.getElementsByClassName(
        'status-indicator__label')[0].disabled = false;
      event.target.disabled = true;

      // Toggle open state on step.
      currentStepElement.classList.remove('status-indicator__open');
      this.classList.toggle('status-indicator__open');

      // Recalculate progress line.
      component.setProgress();

      // Set focus on collapsed content.
      this.getElementsByClassName('status-indicator__description')[0].focus();
    }
  };
}

/**
 * Set progress depending on the steps that are already done.
 */
function setProgress () {
  var progressHeight = 0;
  var backgroundHeight = 0;
  var previousStepRectPlus = null;

  for (var i = 0; i < this.steps.length; i++) {
    var step = this.steps[i];
    var currentStepRectPlus = getElementRectPlus(step.iconElement);
    var distance = 0;

    if (previousStepRectPlus) {
      distance = calculateDistance(previousStepRectPlus.center,
        currentStepRectPlus.center);
    }

    backgroundHeight += distance;

    if (
      step.status === STEP_STATUS.DONE
      || step.status === STEP_STATUS.SKIP
      || step.status === STEP_STATUS.CURRENT
    ) {
      progressHeight += distance;
    }

    if ((step.status === STEP_STATUS.CURRENT || step.isLastStep) &&
      step.element.classList.contains('status-indicator__open')) {
      var subStepDotElementList = step.element.querySelectorAll(
        '.status-indicator__dot');
      var subStepDotElementListRectPlus = getElementRectPlus(
        subStepDotElementList[subStepDotElementList.length - 1]);
      progressHeight += calculateDistance(currentStepRectPlus.center,
        subStepDotElementListRectPlus.center);
    }

    previousStepRectPlus = currentStepRectPlus;
  }

  this.progressLineElement.style.height = progressHeight + 'px';
  this.backgroundLineElement.style.height = backgroundHeight + 'px';
}
