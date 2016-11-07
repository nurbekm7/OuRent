$.validator.setDefaults( {
     			submitHandler: function () {

     			 var email = $('#reg_email').val().toLowerCase();;
     			 var pass = $('#reg_pass').val().toLowerCase();;

     			  var user_type = $('#ch_comp');
                        if(user_type.is(':checked'))
                        {
                             user_type = 1;
                        }
                        else
                        {
                          user_type= 0;
                         }

     			 var JSONObj = {
                       "email" : email,
                       "pass" : pass
     			 }

     			 var data = JSON.stringify(JSONObj);

                   console.log(email + " " + pass + " " + user_type);


     				 $.ajax({
                          url: "register",
                         type: "POST",
                         data: 'email='+email + "&pass="+ pass +"&user_type="+ user_type,
                         dataType: 'json',

                         success: function(response) {

                          if(response.result == "fail"){
                          console.log("registration fails");
                            alert('Такой email уже существует');
                              }
                         else{
                        var items = response.User.map(function (user) {

                        console.log(user);
                        $.cookie('email', email);
                        $.cookie('pass', pass);

                        $.cookie('user_id', user.user_id);

                        window.location.href = "/profile.html";


                                                     });
                                                     }


                         },
                         error: function (response) {
                         }
                         });

     			}
     		} );


 $( document ).ready(function() {
   console.log("Page loaded");


if($.cookie('user_id')!=null){

    var email = $.cookie('email');
    var email1 = email.split('@');

   $('.user-profile').empty().append(' <div class="profile">  <div class="btn-group">' +
                                      '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span>' +
                                          '<img src="'+getAva($.cookie('user_id'))+'" alt="">' +
                                            '</span> '  + email1[0] +  '</button>'+
                                                  '<ul class="dropdown-menu">' +
                                                      '<li>' +
                                                         ' <a href="/profile.html">Профиль</a>  ' +
                                                        ' </li>' +
                                                      '<li>' +
                                                          '<a href="/trust.html">Доверие и подтверждение</a> ' +
                                                          '</li>' +

                                                      '<li>' +
                                                      '<a href="/settings.html">Настройки</a>' +
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


}

 console.log("VALLOGIN");




   var pr_cost =null;
  for(var i =1; i<=4; ++i){
   $.ajax({

           url: "category/getProductByID",
           type: "GET",
           data: 'product_id='+i ,
            dataType: 'json',
           success: function(response) {
            //
              var items = response.Products.map(function (item) {


              console.log(item.cat_id);
             // console.log(item.img);

            $('#'+item.product_id+' .onhover .slide-up .price-wrap .price span').empty().append(item.pr_cost);
            $('#'+item.product_id+' .onhover .title a').empty().append(item.pr_name);
            $('#'+item.product_id+' .onhover .avatar img').attr("src", getAva(item.user_id));
            $('#'+item.product_id+' .fotorama .preview .wrapper img').attr("src", item.img);
            $('#'+item.product_id+' .fotorama .preview .wrapper .background').attr("style", "background-image:url(" + item.img+")");
       $('#'+item.product_id+' .app-product-wrapper').attr("data-href", "/product.html?product_id="+item.product_id+"&cat_id="+item.cat_id);
       $('#'+item.product_id+' .title a').attr("href", "/product.html?product_id="+item.product_id+"&cat_id="+item.cat_id);
       $('#'+item.product_id+' .category a').attr("href", "/product.html?product_id="+item.product_id+"&cat_id="+item.cat_id);
              $.ajax({

                         url: "category/getCatByID",
                         type: "GET",
                         data: 'cat_id='+item.cat_id ,
                          dataType: 'json',
                         cache: false,
                         success: function(response) {
                          //
                            var items = response.SubCats.map(function (sub) {


                          $('#'+item.product_id+' .category a').empty().append(sub.cat_name);

                         });
                         },
                         error: function (response) {
                          }
                       });

         });

           },
           error: function (response) {
            }
         });
         }

});

function logout()
{
      console.log("LOGOUT");
      $.cookie('user_id', null);
      $.cookie('email', null);
      $.cookie('pass', null);
       $('.user-profile').empty().append(' <div class="btn-group login">   <a class="btn btn-default show-modal" data-target="#newRequest" data-toggle="modal" >Войти</a></div>');
}


function login (){


			 var email = $('#email').val();
			 var pass = $('#pass').val();

			 var JSONObj = {
                  "email" : email,
                  "pass" : pass
			 }

			 var data = JSON.stringify(JSONObj);

              console.log(email + " " + pass);


				$.ajax({
					type: "POST",
					url: "/login?email="+email+"&pass="+pass,
					dataType:"json",
					success: function(msg){

                           if(msg.result == "fail"){
                            console.log("login fails");
                            alert('Неправильный логин или пароль');
                           }

                         else{


                     	 var items = msg.User.map(function (user) {


                                 console.log(user);
                                 $.cookie('email', email);
                                 $.cookie('pass', pass);

                                 $.cookie('user_id', user.user_id);


                                 window.location.href = "/profile.html";


                            });
                            }


					},
					error: function(){

                            console.log("login fail");

					}
				});


}

function register()
{
   console.log("registration");
     $("#newRequest").modal('hide');
     $("#newRegistr").modal('show');


     $( "#registerForm" ).validate( {

     				rules: {
     					pass: {
     					required: true,
     					minlength: 4

     					},
     					email: {
     						required: true,
     						email: true
     					}
     				},
     				messages: {
     					pass: {
     					required: "Введите ваш пароль",
     					 minlength: "Длинна пароля минимум 4 символа"
     					}
     					,

     					email: "Введите правильный email",

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








}



function checkLogin(){


   console.log($.cookie('user_id'));
   var user_id = $.cookie('user_id');
   if(user_id==null){

       $("#newRequest").modal('show');

    }
    else{

       $.ajax({
                                  url: "/getUserByID",
                                  type: "GET",
                                  data: 'user_id='+ user_id ,
                                   dataType: 'json',
                                  cache: false,
                                   async: false,
                                  success: function(response) {

                                     var items = response.User.map(function (user) {

                                        if(user.phone_num == null)
                                        {

                                         $("#newReq p").append("Пожалуйста добавьте Ваш номер телефона" );
                                           $("#newReq .form-group a").attr("href", "/profile.html");
                                           $('#newReq').modal({backdrop: 'static', keyboard: false})  ;
                                          $("#newReq").modal('show');
                                        }
                                        else
                                        {
                                   window.location.href = "/putprod.html";
}
                                  });
                                  },
                                  error: function (response) {
                                   }
                                });



    }

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

