$(function() {
    console.log( "ready!" );
    $(".inviteGuild").click(function(event) {
        console.log(event.target.id)
        //window.location.replace(`api/discord/invite/${event.target.id}`,'popup','width=600,height=600').unload(console.log("Window Closed"));
        window.open(`api/discord/invite/${event.target.id}`,'popup','width=600,height=600');
    });
    
    $(".module-component").click(function(event) {
        console.log($(this).data('guild'))
        //window.location.replace(`api/discord/invite/${event.target.id}`,'popup','width=600,height=600').unload(console.log("Window Closed"));
        window.location.replace(`/dashboard/${$(this).data('guild')}/${$(this).data('module')}`);
    });
    
    var $hamburger = $(".hamburger");
    $hamburger.on("click", function(e) {
        $hamburger.toggleClass("is-active");
        // Do something else, like open/close menu
    });

    $(".form-submit").click(function(event) {
        var enabledSwitch = $("input[type=checkbox][name=enabled]");

        if(enabledSwitch.is(':checked')){
            var enabled = true;
        }else{
            var enabled = false;
        }

        var VerifyChannel = $("select[name=VerifyChannel]").find(':selected').val();

        var MVChannel = $("select[name=MVChannel]").find(':selected').val();

        var StaffRole  = $("select[name=StaffRole]").find(':selected').val();

        var NonVerifiedRole  = $("select[name=NonVerifiedRole]").find(':selected').val();

        var VMessage  = $("input[type=text][name=VMessage]").val();
        
        $.post(`/api/dashboard/update/${$(this).data('module')}/${$(this).data('guild')}`,
        {
            enabled: enabled,
            VerifyChannel: VerifyChannel,
            MVChannel: MVChannel,
            StaffRole: StaffRole,
            NonVerifiedRole: NonVerifiedRole,
            VMessage: VMessage
        },
        function(data, status){
          console.log("Data: " + data + "\nStatus: " + status);
        });

        console.log(VerifyChannel);
    })
    
});