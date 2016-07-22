$(initialize);

function initialize() {
  $('.fa-bars').on('click', function() {
    if( $(this).hasClass('open-menu') ) {
      hideMenuItems();

      setTimeout(closeMenu, 1250);
    } else {
      openMenu();
    }
  });
}

function openMenu() {
  $('.fa-bars').removeClass('close-menu');
  $('.fa-bars').addClass('open-menu');

  $('ol').addClass('animated slideInRight').one('webkitAnimationEnd', function() {
    $(this).removeClass('animated slideInRight');
    $('ol').removeClass('hidden');
  });

  setTimeout(showMenuItems, 800);
}

function closeMenu() {
  $('.fa-bars').removeClass('open-menu');
}

function showMenuItems() {
  $('ol').removeClass('hidden');
}

function hideMenuItems() {
  $('ol').addClass('animated slideOutRight').one('webkitAnimationEnd', function() {
    $(this).removeClass('animated slideOutRight');
    $(this).addClass('hidden');
  });
}
