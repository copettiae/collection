(function () {
  'use strict';
  var input = document.getElementById('artistSearchInput');
  var grid = document.querySelector('.listArtist.listArtistPhotos');
  if (!input || !grid) return;

  var items = Array.prototype.slice.call(grid.querySelectorAll('.yearItem'));
  var dividers = Array.prototype.slice.call(grid.querySelectorAll('.letterDivider'));

  function filter() {
    var query = input.value.trim().toLowerCase();

    items.forEach(function (item) {
      var title = item.querySelector('.yearTitle');
      var text = title ? title.textContent.toLowerCase() : '';
      item.style.display = (!query || text.indexOf(query) !== -1) ? '' : 'none';
    });

    dividers.forEach(function (divider) {
      var sibling = divider.nextElementSibling;
      var hasVisible = false;
      while (sibling && !sibling.classList.contains('letterDivider')) {
        if (sibling.classList.contains('yearItem') && sibling.style.display !== 'none') {
          hasVisible = true;
          break;
        }
        sibling = sibling.nextElementSibling;
      }
      divider.style.display = hasVisible ? '' : 'none';
    });
  }

  input.addEventListener('input', filter);
})();
