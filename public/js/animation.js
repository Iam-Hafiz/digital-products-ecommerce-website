// on scroll products animations
function reveal(item, wrapper) {
    var verticalEdge   = wrapper.scrollTop() + wrapper.outerHeight(),
        horizontalEdge = wrapper.scrollLeft() + wrapper.outerWidth();
    
    item.each(function() {
      if ((verticalEdge >= $(this).offset().top) &&
          (horizontalEdge >= $(this).offset().left)) {
            $(this).addClass('animate_product_display');
          }
    });
  }
  
  $(window).on("load scroll", function() {
    reveal($('.product_specifications'), $(this));
  });

// slide down main content on loading
addEventListener('DOMContentLoaded', () => {
  //$('.toggle_btn').prev().slideUp();
  $('.container').slideDown(750);
});

