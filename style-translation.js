(function () {
  var modal = document.getElementById('rm-modal');
  if (!modal) return;

  var openBtns = Array.prototype.slice.call(document.querySelectorAll('[data-rm-open]'));
  var closeBtns = Array.prototype.slice.call(modal.querySelectorAll('[data-rm-close]'));

  function open() {
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function close() {
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  openBtns.forEach(function (btn) {
    btn.addEventListener('click', function (event) {
      event.preventDefault();
      open();
    });
  });
  closeBtns.forEach(function (btn) {
    btn.addEventListener('click', close);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !modal.hidden) close();
  });
})();
