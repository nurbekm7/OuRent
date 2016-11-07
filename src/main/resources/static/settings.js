
 $( document ).ready(function() {


if($.cookie('user_id')!=null){


    console.log($.cookie('user_id'));
     var user_id = $.cookie('user_id');

    var email = $.cookie('email');
    var email1 = email.split('@');


     $('.oncheck').hide();

    $.ajax({

               url: "getUserByID",
               type: "GET",
               data: 'user_id='+ user_id,
                dataType: 'json',
               cache: false,
               success: function(response) {

                  var items = response.User.map(function (user) {

                  console.log(user.email);
                  var user_date = user.reg_date;
                  var user_d = user_date.split(" ");
                  var ava = user.ava;


               console.log(ava);

                    $(' .profile .btn-group button').empty().append(' <img src="'+ava+'" alt=""> ' +email1[0]);




             });

               },
               error: function (response) {
                }
             });


     }

});


function openTab(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
