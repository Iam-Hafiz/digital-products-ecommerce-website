
$(".toggle_btn").click(function() {
    $(this).prev().slideToggle("slow");
    let $this = $(this);
    $this.toggleClass("open");
    if ($this.hasClass("open")) {
        $this.html(`<span class="toggle_text">Masquer les spécifications complètes</span>
        <span><i class="fa-solid fa-angle-up fa-beat"></i></span>`);
    } else {
        $this.html(`<span class="toggle_text">Afficher les spécifications complètes</span>
        <span><i class="fa-solid fa-angle-down fa-beat"></i></span>`);
    }
});

  /* another way to toggle 
$(".toggle_btn").on("click", (function(){
    //$(this).toggleClass("active");
    //$(this).prev().toggleClass("active");
    //if($(".toggle_btn").hasClass("active")){
    //    $(".toggle_text").text("Masquer les spécifications complètes");
    //} else {
    //    $(".toggle_text").text("Afficher les spécifications complètes");
    //}
}));
*/

