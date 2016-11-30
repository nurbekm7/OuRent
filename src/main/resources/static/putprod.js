$.validator.setDefaults( {
			submitHandler: function () {

          console.log("SUBMIT EDIT");
              var data =null;
          var reader  = new  FileReader();
          var imag = document.getElementById('img');
          var img1 = "/upload/products/prod_default.png";

         if(imag.files[0])
         {
                      console.log("not null");
                      reader.readAsDataURL(imag.files[0]);
         }
          else{

       //  var data ="pr_name="+ $('#pr_name').val() +"&img=null"+"&pr_desc="+ $('#pr_desc').val()+"&price="+$('#price').val()+"&deposit="+$('#deposit').val()+"&pr_cost="+$('#pr_cost').val()+"&will_sell="+$('#will_sell').is(':checked')+"&will_exchan="+$('#will_exchan').is(':checked')+"&cat_id="+"157"+"&user_id="+$.cookie('user_id');

var myData = new FormData();
myData.append("pr_name", $('#pr_name').val());
myData.append("img",  img1);
myData.append("pr_desc",  $('#pr_desc').val());
myData.append("price",  $('#price').val());
myData.append("deposit", $('#deposit').val());
myData.append("pr_cost", $('#pr_cost').val());
myData.append("will_sell", $('#will_sell').is(':checked'));
myData.append("will_exchan",  $('#will_exchan').is(':checked'));
myData.append("cat_id", "157");
myData.append("user_id", $.cookie('user_id'));

console.log(myData);

			 $.ajax({

                           url: "category/putProduct",
                           type: "POST",
                           data:myData,
                           processData: false,
                           contentType:false,
                           cache: false,
                           success: function(response) {
                           console.log(response);
                            var items = response.Products.map(function (pr) {

                              console.log(pr);

                               window.location.href = "/ads.html";
                         });

                           },
                           error: function (response) {
                            console.log(response);
                            }
                         });



}



          reader.onload = function(readerEvt) {

                      img1 = readerEvt.target.result;

                      //  var dataURL="data:image/jpeg;base64,"+btoa(binaryString);

          //  data ="pr_name="+ $('#pr_name').val() +"&img="+ dataURL+"&pr_desc="+ $('#pr_desc').val()+"&price="+$('#price').val()+"&deposit="+$('#deposit').val()+"&pr_cost="+$('#pr_cost').val()+"&will_sell="+$('#will_sell').is(':checked')+"&will_exchan="+$('#will_exchan').is(':checked')+"&cat_id="+"157"+"&user_id="+$.cookie('user_id');




var myData = new FormData();
myData.append("pr_name", $('#pr_name').val());
myData.append("img",  img1);
myData.append("pr_desc",  $('#pr_desc').val());
myData.append("price",  $('#price').val());
myData.append("deposit", $('#deposit').val());
myData.append("pr_cost", $('#pr_cost').val());
myData.append("will_sell", $('#will_sell').is(':checked'));
myData.append("will_exchan",  $('#will_exchan').is(':checked'));
myData.append("cat_id", "157");
myData.append("user_id", $.cookie('user_id'));
//
//console.log(img1);
			 $.ajax({

                           url: "category/putProduct",
                           type: "POST",
                           data:myData,
                            processData: false,
                           contentType: false,
                           cache: false,
                           success: function(response) {
                           console.log(response);
                            var items = response.Products.map(function (pr) {

                              console.log(pr);

                             window.location.href = "/ads.html";
                         });

                           },
                           error: function (response) {
                            console.log(response);
                            }
                         });






                  };



			}
		} );




 $( document ).ready(function() {

   console.log("Page loaded");




 var email = $.cookie('email');
    var email1 = email.split('@');
    var ava = $.cookie('ava');

   $('.user-profile').empty().append(' <div class="profile">  <div class="btn-group">' +
                                      '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span>' +
                                          '<img src="'+getAva($.cookie('user_id'))+'" alt="">' +
                                            '</span> '  + email1[0] +  '</button>'+
                                                  '<ul class="dropdown-menu">' +
                                                      '<li>' +
                                                         ' <a href="/profile.html">Профиль</a>  ' +
                                                        ' </li>' +
                                                      '<li>' +
                                                          '<a href="#">Доверие и подтверждение</a> ' +
                                                          '</li>' +

                                                      '<li>' +
                                                      '<a href="#">Настройки</a>' +
                                                      '</li>' +
                                                     ' <li>' +
                                                     '<a href="/ads.html">Мои объявления</a> ' +
                                                     '</li>' +
                                                     '<li>' +
                                                      '<a href="/favs.html">Избранное</a></li>' +
                                                      ' <li>' +
                                                      '<a href="/reqs.html">Мои запросы</a>' +
                                                      '</li>' +
                                                      '<li>'+
                                                         ' <a href="/" onclick="logout()">Выйти</a>  </li>' +
                                                          '</ul></div></div>');




$( "#create-item-form" ).validate( {

				rules: {
                    pr_name: "required",
                    deposit: "number",
                    pr_desc: {
                     required: true,
                     minlength: 30,
                     maxlength:100
                    },
                    price: {
                     required: true,
                     number: true,
                     minlength: 1,
                     maxlength:7
                    },
                     pr_cost: {
                     required: true,
                     number: true,
                     minlength: 1,
                     maxlength:7
                    }
				},
				messages: {
				    pr_desc: {
                      required: "Это поле обязательно",
				    minlength: "Минимум 30 символов",
				    maxlength: "Максимум 100 символов"
                    },
                    price: {
                      required: "Это поле обязательно",
                      number: "Цена указывается в цифрах",
				    minlength: "Минимум 1 символов",
				    maxlength: "Максимум 100 символов"
                    },
                     pr_cost: {
                      required: "Это поле обязательно",
                      number: "Стоимость указывается в цифрах",
				    minlength: "Минимум 1 символов",
				    maxlength: "Максимум 7 символов"
                    },
                    pr_name:"Это поле обязательно",
                    deposit:"Толко цифры",



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
       $('.user-profile').empty().append(' <div class="btn-group login">   <a class="btn btn-default show-modal" data-target="#newRequest" data-toggle="modal" >Войти</a></div>');
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
                                console.log(ava);
                                console.log(user.email);

                           });
                           },
                           error: function (response) {
                            }
                         });


                         return  ava;

}


