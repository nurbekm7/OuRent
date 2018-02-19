
 $( document ).ready(function() {

if($.cookie('user_id')!=null){


    ($.cookie('user_id'));
     var user_id = $.cookie('user_id');

    var email = $.cookie('email');
    var email1 = email.split('@');
    var passDB = "";



     $('.oncheck').hide();

    $.ajax({

               url: "/getUserByID",
               type: "GET",
               data: 'user_id='+ user_id,
                dataType: 'json',
               cache: false,
               async:false,
               success: function(response) {

                  var items = response.User.map(function (user) {

                      var user_date = user.reg_date;
                      var user_d = user_date.split(" ");
                      var ava = user.ava;
                      passDB = user.pass;
                        $(' .profile .btn-group button').empty().append(' <img src="'+ava+'" alt=""> ' +email1[0]);
                  });
               },
               error: function (response) {

                }
    });


    $('#recovery-password-form').submit(function(event){

               event.preventDefault();

                 var old_pass = $('#old_password').val();
    			 var new_pass = $('#password').val();

    			 if(old_pass == passDB){

                        $.ajax({
                            type: "POST",
                            url: "/chPass",
                            data:"user_id="+user_id+"&pass="+new_pass,
                            dataType:"json",
                            async:false,
                            cache:false,
                            success: function(msg){
                                   if(msg.result == "fail"){
                                    $('#error').empty().append("Ошибка!!! Попробуйте снова...");
                                   }
                                 else{
    			                       $('#ok').empty().append("Пароль успешно изменен !!!");
    			                       alert("Пароль успешно изменен !!!");
    			                        window.location.href = "/profile.html";
                                    }
                             },
                            error: function(res){
                                    $('#error').empty().append("Ошибка!!! Попробуйте снова...");
                            }
                        });
    			 }
    			 else{
    			    console.log("Пароли не совпадают(проверьте старый пароль) !!!");
    			      $('#error').empty().append("Пароли не совпадают </br> (проверьте старый пароль) !!!");

    			 }


    });
     }
     else {
                window.location.href = "/";
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
