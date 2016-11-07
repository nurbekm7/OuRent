$.validator.setDefaults( {
			submitHandler: function () {

          console.log("SUBMIT EDIT");






                    var reader  = new  FileReader();
                    var imag = document.getElementById('img');
                    var img1 = null;

                   if(imag.files[0])
                   {
                                console.log("not null");
                                reader.readAsDataURL(imag.files[0]);
                   }
                    else{


var myData = new FormData();
myData.append("fio", $('#user_fio').val());
myData.append("ava", getAva($.cookie('user_id')));
myData.append("tel",  $('#phone').val());
myData.append("bday", $('#bday').val() );
myData.append("user_id", $.cookie('user_id'));





   console.log($('#bday').val());

                    	 $.ajax({

                                               url: "editProf",
                                               type: "POST",
                                               data: myData,
                                              // dataType: 'json',
                                               processData: false,
                                               contentType: false,
                                               cache: false,
                                               success: function(response) {

                                                 window.location.href = "/profile.html";

                                                console.log("GOOD UPLOAD FILE");

                                                  console.log(response.EditCust.url);


                                               },
                                               error: function (response) {
                                                console.log("BAD UPLOAD FILE");

                                                }
                                             });

                    }


                      reader.onload = function(readerEvt) {
                                          img1 = readerEvt.target.result;

var myData = new FormData();
myData.append("fio", $('#user_fio').val());
myData.append("ava", img1);
myData.append("tel",  $('#phone').val());
myData.append("bday",  $('#bday').val());
myData.append("user_id",  $.cookie('user_id'));

console.log($('#bday').val());
			 $.ajax({

                           url: "editProf",
                           type: "POST",
                           data: myData,
                          // dataType: 'json',
                           processData: false,
                           contentType: false,
                           cache: false,
                           success: function(response) {
                           window.location.href = "/profile.html";

                            console.log("GOOD UPLOAD FILE");

                              console.log(response.EditCust.url);


                           },
                           error: function (response) {
                            console.log("BAD UPLOAD FILE");
                           // console.log(response);

                            }
                         });

 }

			}
		} );


 $( document ).ready(function() {


   console.log("Page loaded");

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 console.log("mob ver");
//
//$('.app-rows-block').append(' <div class="image-adapter"> <div class="thumbnail"><img src="/images/no-avatar.jpg" alt=""></div><div class="app-buttons-group full-width"><a class="app-btn-default min turquoise add-icon edit" href="/user">Редактировать профиль</a>
//                                                    </div>
//                                      <div class="user-profile-filling">
//                                          <div class="app-block-title">Подтверждение профиля</div>
//                                          <div class="social">
//                                              <div class="column">
//                                                  <a class="vkontakte confirmed"></a>
//                                              </div>
//                                              <div class="column">
//                                                  <a class="facebook"></a>
//                                              </div>
//                                              <div class="column">
//                                                  <a class="odnoklassniki"></a>
//                                              </div>
//                                          </div>
//                                          <div class="profile">
//                                          </div>
//                                      </div>
//                                  </div>')
}

if($.cookie('user_id')!=null){


    console.log($.cookie('user_id'));
     var user_id = $.cookie('user_id');

    var email = $.cookie('email');
    var email1 = email.split('@');



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
                    $(' .info-wrapper #user_email').empty().append(email);
                    $(' .info-wrapper #user_d').empty().append(user_d[0]);
                    if(user.phone_num == null){
                    $(' .info-wrapper #phone_num').empty().append("Добавьте ваш номер телефона");
                    }
                    else{
                     $(' .info-wrapper #phone_num').empty().append(user.phone_num);
                    }
                    $(' .thumbnail img').attr("src", ava);



             });

               },
               error: function (response) {
                }
             });

              $.ajax({

                            url: "getCustByID",
                            type: "GET",
                            data: 'user_id='+ user_id,
                             dataType: 'json',
                            cache: false,
                            success: function(response) {

                               var items = response.Customer.map(function (user) {

                                      console.log(user.fio);


                                 if(user.fio == null){
                                 $(' .info-wrapper #fio').empty().append("Добавьте ваше Ф.И.О");
                                 }
                                 else{
                                  $(' .info-wrapper #fio').empty().append(user.fio);
                                 }

                                  if(user.bdate == null ||user.bdate=="NaN"){
                                       $(' .info-wrapper #bthday').empty().append("Добавьте ваш день рождения");
                                       }
                                       else{
                                       $(' .info-wrapper #bthday').empty().append(user.bdate);
                                       }

                                  if(user.ver_email == true)
                                  {
                                   $('#notifEmail').remove();
                                    $('#profVer').append(' <i class="fa fa-envelope-o" style=" padding: 2px; border: 1px solid #57AD68; border-radius: 999px;   color: #717171;width: 21px; height: 21px;text-align: center; font-size: 12px;     " data-toggle="popover" title="Email" data-content="<span class='+"rm-nowrap"+'>Email <i class='+"fa fa-check"+'></i></span>"></i>');

                                  }
                                  if(user.ver_number == true)
                                  {
                                   $('#notifNumber').remove();
                                   $('#profVer').append(' <i class="fa fa-phone" style="padding: 2px; border: 1px solid #57AD68;border-radius: 999px; color: #717171;width: 21px; height: 21px;  text-align: center; font-size: 12px;" data-toggle="popover" title="Телефон" data-content="<span class='+"rm-nowrap"+'> <i class='+"fa fa-check"+'></i></span>"></i>');

                                  }

                          });

                            },
                            error: function (response) {
                            console.log("Cust down error");
                             }
                          });




}
else {
           window.location.href = "/";
}


$( "#proFrom" ).validate( {

				rules: {
                    user_fio: "required",
                    phone: {
                     required: true,
                     number:true,
                     minlength: 8,
                     maxlength:11
                    }
				},
				messages: {
				    phone: {
                      required: "Это поле обязательно",
				    minlength: "Формат: 87776665511, min 8 цифр",
				    maxlength: "Формат: 87776665511, max 11 цифр",
				    number: "Только цифры"
                    },
                    user_fio:"Это поле обязательно",



				},
				errorElement: "em",
				errorPlacement: function ( error, element ) {
					// Add the `help-block` class to the error element
					error.addClass( "help-block" );
					if ( element.prop( "type" ) === "checkbox" ) {
						error.insertAfter( element.parent( "label" ) );
					} else {
						error.insertAfter( element );
					}
				},
				highlight: function ( element, errorClass, validClass ) {
					$( element ).parents( ".form-group" ).addClass( "has-error" ).removeClass( "has-success" );
				},
				unhighlight: function (element, errorClass, validClass) {
					$( element ).parents( ".form-group" ).addClass( "has-success" ).removeClass( "has-error" );
				}
			} );

});


function logout()
{
      console.log("LOGOUT");
      $.cookie('user_id', null);
      $.cookie('email', null);
      $.cookie('pass', null);
         window.location.href = "/";
}



function getAva(user_id)
{

   var ava =null;
 $.ajax({
                           url: "/getUserByID",
                           type: "GET",
                           data: 'user_id='+ user_id ,
                            dataType: 'json',
                           cache: false,
                            async: false,
                           success: function(response) {

                              var items = response.User.map(function (user) {

                                ava = user.ava;

                                console.log(user.email);

                           });
                           },
                           error: function (response) {
                            }
                         });


                         return  ava;

}



