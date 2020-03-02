$(function() {
    console.log( "ready!" );
    $(".inviteGuild").click(function(event) {
        console.log(event.target.id)
        //window.location.replace(`api/discord/invite/${event.target.id}`,'popup','width=600,height=600').unload(console.log("Window Closed"));
        window.open(`api/discord/invite/${event.target.id}`,'popup','width=600,height=600');
    });
    
    $(".module").click(function(event) {
        console.log($(this).data('guild'))
        //window.location.replace(`api/discord/invite/${event.target.id}`,'popup','width=600,height=600').unload(console.log("Window Closed"));
        window.location.replace(`/dashboard/${$(this).data('guild')}/${event.target.id}`);
    });
    
    var $hamburger = $(".hamburger");
    $hamburger.on("click", function(e) {
        $hamburger.toggleClass("is-active");
        // Do something else, like open/close menu
    });
    
});