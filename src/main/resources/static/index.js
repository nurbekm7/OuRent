$.validator.setDefaults( {
     			submitHandler: function () {

     			 var phone = $('#reg_phone').val().toLowerCase();;
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
                       "phone" : phone,
                       "pass" : pass
     			 }

     			 var data = JSON.stringify(JSONObj);

     				 $.ajax({
                          url: "register",
                         type: "POST",
                         data: "phone=" +phone +"&pass="+ pass +"&user_type="+ user_type,
                         dataType: 'json',

                         success: function(response) {

                          if(response.result == "fail"){
                            alert('Пользователь уже существует');
                              }
                         else{
                        var items = response.User.map(function (user) {

                        $.cookie('phone', phone);
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

 $('#signupForm').submit(function(event){


			 var phone = $('#phone').val();
			 var pass = $('#pass').val();
				$.ajax({
					type: "POST",
					url: "/login",
					data:"phone="+phone +"&pass="+pass,
					dataType:"json",
					success: function(msg){
                           if(msg.result == "fail"){
                            alert('Неправильный логин или пароль');
                           }
                         else{

                     	 var items = msg.User.map(function (user) {
                                 $.cookie('phone', phone);
                                $.cookie('user_id', user.user_id);

                               window.location.href = "/profile.html";

                            });
                            }
			},
					error: function(){
                            console.log("login fail");
					}
				});

				event.preventDefault();

});

if($.cookie('user_id')!=null){


    var phone = $.cookie('phone');

   $('.user-profile').empty().append(' <div class="profile">  <div class="btn-group">' +
                                      '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span>' +
                                          '<img src="'+getAva($.cookie('user_id'))+'" alt="">' +
                                            '</span> '  + phone +  '</button>'+
                                                  '<ul class="dropdown-menu">' +
                                                      '<li>' +
                                                         ' <a href="/profile.html">Профиль</a>  ' +
                                                        ' </li>' +
                                                      '<li>' +
                                                          '<a href="#">Доверие и подтверждение</a> ' +
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





   var counter =1;

   $.ajax({

           url: "category/getPopularProducts",
           type: "GET",
           dataType: 'json',
           async:false,
           success: function(response) {

              var items = response.Products.map(function (item) {




            $('#'+counter+' .onhover .slide-up .price-wrap .price span').empty().append(item.price);
            $('#'+counter+' .onhover .title a').empty().append(item.pr_name);
            $('#'+counter+' .onhover .avatar img').attr("src", getAva(item.user_id));
            $('#'+counter+' .fotorama .preview .wrapper img').attr("src", item.img);
            $('#'+counter+' .fotorama .preview .wrapper .background').attr("style", "background-image:url(" + item.img+")");
            $('#'+counter+' .app-product-wrapper').attr("data-href", "/product.html?product_id="+item.product_id+"&cat_id="+item.cat_id);
            $('#'+counter+' .title a').attr("href", "/product.html?product_id="+item.product_id+"&cat_id="+item.cat_id);
            $('#'+counter+' .category a').attr("href", "/product.html?product_id="+item.product_id+"&cat_id="+item.cat_id);
              $.ajax({

                         url: "category/getCatByID",
                         type: "GET",
                         data: 'cat_id='+item.cat_id ,
                          dataType: 'json',
                          async:false,
                         success: function(response) {
                          //
                            var items = response.SubCats.map(function (sub) {


                          $('#'+counter+' .category a').empty().append(sub.cat_name);

                         });
                         },
                         error: function (response) {
                          }
                       });
                   counter++;
         });

           },
           error: function (response) {
            }
         });


});

function logout()
{
      console.log("LOGOUT");
      $.cookie('user_id', null);
      $.cookie('email', null);
      $.cookie('pass', null);
       $('.user-profile').empty().append(' <div class="btn-group login">   <a class="btn btn-default show-modal" data-target="#newRequest" data-toggle="modal" >Войти</a></div>');
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
     					phone: {
     						required: true
     				    }
     				},
     				messages: {
     					pass: {
     					required: "Введите ваш пароль",
     					 minlength: "Длинна пароля минимум 4 символа"
     					}
     					,

     					phone: "Введите номер телефона в формате 8707",

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
                                        if(user.user_type =='0'){

                                            $.ajax({
                                                url: "/getCustByID",
                                                type: "GET",
                                                data: 'user_id='+ user_id ,
                                                dataType: 'json',
                                                cache: false,
                                                async: false,
                                                success: function(response) {
                                                var items = response.Customer.map(function (cust) {
                                                if(cust.fio == null) {
                                                        $("#newReq p").append("Пожалуйста добавьте Ваш номер телефона" );
                                                        $("#newReq .form-group a").attr("href", "/profile.html");
                                                        $('#newReq').modal({backdrop: 'static', keyboard: false})  ;
                                                        $("#newReq").modal('show');
                                                }
                                                else{
                                                   window.location.href = "/putprod.html";
                                                }

                                                });
                                                },
                                            });
                                        }
                                       else{
                                        $.ajax({
                                            url: "/getCompByID",
                                            type: "GET",
                                            data: 'user_id='+ user_id ,
                                            dataType: 'json',
                                            cache: false,
                                            async: false,
                                            success: function(response) {
                                                var items = response.Company.map(function (comp) {
                                                       if(comp.comp_name==null) {

                                                       $("#newReq p").append("Пожалуйста добавьте Ваш номер телефона" );
                                                        $("#newReq .form-group a").attr("href", "/profile.html");
                                                        $('#newReq').modal({backdrop: 'static', keyboard: false})  ;
                                                        $("#newReq").modal('show');
                                                       }
                                                        else{
                                                             window.location.href = "/putprod.html";
                                                        }
                                                });
                                            },
                                        });
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


                           });
                           },
                           error: function (response) {
                            }
                         });
                    return  ava;

}
