(function () {
  var input = document.getElementById('albumSearchInput');
  var grid = document.querySelector('.listProduct');
  if (!input || !grid) return;

  var items = Array.prototype.slice.call(grid.querySelectorAll('.item'));

  function filter() {
    var query = input.value.trim().toLowerCase();

    items.forEach(function (item) {
      var title = item.querySelector('.title');
      var artistEls = item.querySelectorAll('.artist');
      var artist = artistEls.length > 1 ? artistEls[1].textContent : '';
      var text = ((title ? title.textContent : '') + ' ' + artist).toLowerCase();
      item.style.display = (!query || text.indexOf(query) !== -1) ? '' : 'none';
    });
  }

  input.addEventListener('input', filter);
})();
