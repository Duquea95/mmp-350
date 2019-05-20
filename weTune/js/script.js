$(function(){
    $dropdown = $(".drop-btn");
    $dpSet = $(".dropdown-set");
    $main = $("main");
    console.log($main);
    // $join = $("#join-button");

    // function dropdown(){
    //     if($dpSet.hasClass("on")){
    //         $dpSet.removeClass("on");
    //     }
    //     else{
    //         $dpSet.addClass("on");
    //     }
    // }

    // $dropdown.onclick = dropdown();

    $("#login-button").click(function(s){
        s.preventDefault();
        $(".main-container").css("display", "none");
        $(".info-container").css("display", "none");
        $("form").css("display", "none");
        $(".dropdown").css("display", "flex");
        $(".news-feed").css("display", "block");
        $(".search-container").css("display", "block");
        $(".grid-container").css("grid-template-rows", "53px 1fr 40px");
        $(".nav-container").css("grid-template-columns", "20% 40% auto%");
        $main.css({"grid-template-areas": "'feed'","grid-template-rows": "auto"});
        $(".drop-btn").css("display", "block");
    });

    $("#join-button").click(function(e){
        e.preventDefault();
        console.log("ok");
        $(".main-container").css("display", "none");
        $(".info-container").css("display", "none");
        $("form").css("display", "none");
        $(".dropdown").css("display", "flex");
        $(".news-feed").css("display", "block");
        $(".search-container").css("display", "block");
        $(".grid-container").css("grid-template-rows", "53px 1fr 40px");
        $(".nav-container").css("grid-template-columns", "20% 40% auto");
        $main.css({"grid-template-areas": "'feed'","grid-template-rows": "auto"});
        $(".drop-btn").css("display", "block");
        // $join.addClass('hide');
    });

    // $dropdown.click(function(){
    //     $dpSet.css("display","block");
    // });
});
