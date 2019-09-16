import StatusIndicator
  from '../components/01-componenten/status-indicator/status-indicator';

// StatusIndicator component
(function () {
  var foundElements = document.getElementsByClassName('status-indicator');
  for (var i = 0; i < foundElements.length; i++) {
    StatusIndicator(foundElements[i]);
  }
})();
