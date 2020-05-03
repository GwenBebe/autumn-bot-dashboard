$(function() {
    if(!$(".module-switch").prop('checked')) {
        $("select, textarea").attr("disabled", true);
        $(".switch-label .switch").attr("style", "display: none !important");
        $("label").css('color','rgb(146, 146, 146)')

    }else{
        $("select, textarea").attr("disabled", false);
        $("label").css('color','white')

        if(!$(".verified-switch").prop('checked')) {
            $("#verifiedRole").css('color','rgb(146, 146, 146)');
            $("#verified-select").css('display','none')
        }else{
            $("#verifiedRole").css('color','white');
            $("#verified-select").css('display','')
        }
    }
  console.log("ready!");
  $(".inviteGuild").click(function(event) {
      console.log(event.target.id)
      //window.location.replace(`api/discord/invite/${event.target.id}`,'popup','width=600,height=600').unload(console.log("Window Closed"));
      window.open(`api/discord/invite/${event.target.id}`, 'popup', 'width=600,height=600');
  });

  $(".module-open").click(function(event) {
      console.log($(this).data('guild'))
      //window.location.replace(`api/discord/invite/${event.target.id}`,'popup','width=600,height=600').unload(console.log("Window Closed"));
      window.location.replace(`/dashboard/${$(this).data('guild')}/${event.target.id}`);
  });

  var $hamburger = $(".hamburger");
  $hamburger.on("click", function(e) {
      $hamburger.toggleClass("is-active");
      // Do something else, like open/close menu
  });

  $(".switch").click(function() {
    if(!$(".module-switch").prop('checked')) {
        $("select, textarea").attr("disabled", true);
        $(".switch-label .switch").fadeOut(400, function () {
            $(".switch-label .switch").attr("style", "display: none !important");
        })
        $("label").css('color','rgb(146, 146, 146)')
    }else{
        $("select, textarea").attr("disabled", false);
        $(".switch-label .switch").fadeIn();
        $("label").css('color','white')
    }
  });

  $(".verified-switch").click(function() {
    if(!$(".verified-switch").prop('checked')) {
        $("#verifiedRole").css('color','rgb(146, 146, 146)');
        $("select, textarea, verified-switch").attr("disabled", true);
        $("#verified-select").slideUp();
    }else{
        $("#verifiedRole").css('color','white');
        $("select, textarea, verified-switch").attr("disabled", false);
        $("#verified-select").slideDown();
    }
  });
  $(".form-submit").click(function(event) {
      var enabledSwitch = $("input[type=checkbox][name=enabled]");

      var verifiedRoleSwitch = $("input[type=checkbox][name=verifiedRoleEnabled]");

      if (enabledSwitch.is(':checked')) {
          var enabled = true;
      } else {
          var enabled = false;
      }

      if (verifiedRoleSwitch.is(':checked')) {
          var verifiedRoleEnabled = true;
      } else {
          var verifiedRoleEnabled = false;
      }

      var VerifyChannel = $("select[name=VerifyChannel]").find(':selected').data('channel');

      var MVChannel = $("select[name=MVChannel]").find(':selected').data('channel');

      var StaffRole = $("select[name=StaffRole]").find(':selected').data('role');

      var NonVerifiedRole = $("select[name=NonVerifiedRole]").find(':selected').data('role');

      var verifiedRole = $("select[name=AutoRole]").find(':selected').data('role');

      var VMessage = $("textarea[name=VMessage]").val();

      $.post(`/api/dashboard/update/${$(this).data('module')}/${$(this).data('guild')}`, {
              module: "verification",
              //----------------------
              enabled: enabled,
              VerifyChannel: VerifyChannel,
              MVChannel: MVChannel,
              StaffRole: StaffRole,
              NonVerifiedRole: NonVerifiedRole,
              VerifiedRoleEnabled: verifiedRoleEnabled,
              VerifiedRole: verifiedRole,
              VMessage: VMessage
          },
          function(data, status) {
              console.log(data);
              if(data == "Saved!")
              {
                $(".response").html(data).css('color','rgb(79, 238, 100)').css('display', '').fadeOut(3000);
              }
              else{
                $(".response").html(`ERR: ${data}`).css('color','rgb(255, 82, 82)').css('display', '').fadeOut(3000);
              }
          });

  })

});

var x, i, j, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < selElmnt.length; j++) {
      /* For each option in the original select element,
      create a new DIV that will act as an option item: */
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function(e) {
          /* When an item is clicked, update the original select box,
          and the selected item: */
          var y, i, k, s, h;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          h = this.parentNode.previousSibling;
          for (i = 0; i < s.length; i++) {
              if (s.options[i].innerHTML == this.innerHTML) {
                  s.selectedIndex = i;
                  h.innerHTML = this.innerHTML;
                  y = this.parentNode.getElementsByClassName("same-as-selected");
                  for (k = 0; k < y.length; k++) {
                      y[k].removeAttribute("class");
                  }
                  this.setAttribute("class", "same-as-selected");
                  break;
              }
          }
          h.click();
      });
      b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /* When the select box is clicked, close any other select boxes,
      and open/close the current select box: */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
      if (elmnt == y[i]) {
          arrNo.push(i)
      } else {
          y[i].classList.remove("select-arrow-active");
      }
  }
  for (i = 0; i < x.length; i++) {
      if (arrNo.indexOf(i)) {
          x[i].classList.add("select-hide");
      }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);