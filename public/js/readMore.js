
// toggle read More and read less buttons
$(".toggle_btn").on("click", (function(){

    $(this).toggleClass("active");
    $(this).prev().toggleClass("active");

    if($(".toggle_btn").hasClass("active")){
        $(".toggle_text").text("Masquer les spécifications complètes");
    } else {
        $(".toggle_text").text("Afficher les spécifications complètes");
    }
}));
