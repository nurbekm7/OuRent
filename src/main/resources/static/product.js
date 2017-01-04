
var user_date= null;
var user_regDate = null;
var prod_id = null;

var user_ids=null;

var phone_num = null;
var phone_numUser = null;
var cat_id = null;
var p_id = null;


 $.urlParam = function(name){
       var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
       if (results==null){
          return null;
       }
       else{
          return results[1] || 0;
       }
   }



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
//                   console.log(email + " " + pass + " " + user_type);


     				 $.ajax({
                          url: "register",
                         type: "POST",
                         data: 'email='+email + "&pass="+ pass +"&user_type="+ user_type,
                         dataType: 'json',
                         cache: false,
                         success: function(response) {

                          if(response.result == "fail"){
                          console.log("registration fails");
                            alert('Такой email уже существует');
                              }
                         else{
                        var items = response.User.map(function (user) {

                        $.cookie('email', email);
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

         $.ajax({
                           url: "/getUserByID",
                           type: "GET",
                           data: 'user_id='+ $.cookie('user_id') ,
                            dataType: 'json',
                           cache: false,
                            async: false,
                           success: function(response) {

                              var items = response.User.map(function (user) {

                                     if(user.user_type==1)
                                     {
                                     $('#reqBut').hide();
                                     }
                                     phone_numUser = user.phone_num;


                           });
                           },
                           error: function (response) {
                            }
                         });

               $.ajax({
                                         url: "request/getRequestByUserID",
                                         type: "GET",
                                         data: 'user_id='+ $.cookie('user_id') ,
                                          dataType: 'json',
                                         cache: false,
                                          async: false,
                                         success: function(response) {
                                            response.Reqs.map(function(req){
                                            if(req.product_id == $.urlParam('product_id')){
                                            $('#reqBut').hide();
                                          $('#reqButton').empty().append('<a class="app-btn-default darkblue request" href="#" id="reqBut">Запрос отправлен</a>');
                                          $('#prices .table').append('<tr>  <td class="tt">Номер Владельца</td><td class="tvn">'+getPhone($.urlParam('product_id'))+'</td> </tr>');

                                            }

                                            });


                                         },
                                         error: function (response) {
                                          }
                                       });
    }

    $.ajax({
                              url: "category/getProductByID",
                              type: "GET",
                              data: 'product_id='+ $.urlParam('product_id') ,
                               dataType: 'json',
                              cache: false,
                              async:false,
                              success: function(response) {

                                 var items = response.Products.map(function (prod) {
                                  cat_id = prod.cat_id;
                                  user_ids = prod.user_id;
                                    $.ajax({
                                                                         url: "favs/getFavsByUserID",
                                                                    type: "GET",
                                                                    data: 'user_id='+ $.cookie('user_id') ,
                                                                    dataType: 'json',
                                                                    cache: false,
                                                                    async: false,
                                                                    success: function(response) {


                                                                    response.Favs.map(function(fav){

//                                                                      console.log(fav.product_id +"     " + prod.product_id);
                                                                     if(fav.product_id == prod.product_id)
                                                                     {
                                                                       $(".share a").empty().append('<i class="material-icons"></i> Уже в избранных');
                                                                        $(".share a").attr("href", "/favs.html");



                                                                     }

                                                                    });


                                                                    },
                                                                    error: function (response) {
                                                                                                      }
                                       });


                               if(prod.user_id==$.cookie('user_id') )
                               {
                                 $('#reqBut').hide();
                                 $('#reqButton').empty().append('<a class="app-btn-default darkblue request" href="/putprod.html" id="reqBut">Добавить товар</a>');
                                 $('.app-products-block').remove();
                                  $('.col-right').append('<div id="reqs" class="panel panel-default price-list">'+    '  <div class="panel-heading">Запросы на аренду</div>' +
                                                                                                                     '   <div class="panel-body">'+
                                                                                                                     '         <table class="table app-table-light">'+
                                                                                                                     '        <tr>'+
                                                                                                                     '      <td class="tt">ID</td>'+
                                                                                                                     '  <td class="tt">Дата запроса</td>'+
                                                                                                                     '  <td class="tt">Статус</td>'+
                                                                                                                     '   </tr>'+' </table>'+
                                                                                                                                  ' </div></div>');

                                            $.ajax({

                                                                                                              url: "request/getRequestByPrID",
                                                                                                              type: "GET",
                                                                                                              data: 'product_id='+ $.urlParam('product_id'),
                                                                                                               dataType: 'json',
                                                                                                              cache: false,
                                                                                                              async:false,
                                                                                                              success: function(response) {
                                                                                                           if(response != null){
                                                                                                                 var items = response.Reqs.map(function (reqs) {
                                                                                                                            var req_date= reqs.rq_date;
                                                                                                                            var r_date = req_date.split(".");


                                                                                                                 $('.col-right #reqs .table').append('   <tr>'+
                                                                                                                    '     <td class="tv">'+reqs.user_id+'</td>'+
                                                                                                                     '    <td class="tvz">'+r_date[0]+'</td>'+
                                                                                                                    '    <td class="tv disabled"><button>Подтвердить</button></td>'+
                                                                                                                   '  </tr>');

                                                                                                                   if(reqs.rq_status == true)
                                                                                                                   {
                                                                                                                     $('.col-right #reqs .table button').empty().append("Подтвержденно");
                                                                                                                   }

                                                                                                            });
                                                                                                                    }
                                                                                                              },
                                                                                                              error: function (response) {
                                                                                                               }
                                                                                                            });


                               }

//                             console.log(prod.img);
//                             console.log("TEST good");

                             var pr_date= prod.pr_date;
                             var date = pr_date.split(" ");

//                             console.log(date);
//                             console.log($.urlParam('cat_id'));

                               $('.galerey .fotorama .fotorama__stage__frame  .fotorama__html .preview  .wrapper  img').attr("src",prod.img);

                       /*      $('.galerey .fotorama .main_img').empty().append(' <div class="fotorama__stage__frame fotorama__loaded fotorama__fade-rear fotorama__active"> ' +
                                                                   '<div class="fotorama__html"> ' +
                                                                   '<div class="preview photo" >' +
                                                                    '<div class="wrapper">'+
                                                                     ' <img class="photo" src="upload/products'+prod.img+'" alt="Взять  в прокат ." title="Взять в прокат" >' +
                                                                       '</div>' +
                                                                     '</div></div></div>');
                                     */
                             $('.item-page-title h1').empty().append(prod.pr_name);
                             $('.item-price-block .price-block .price span').empty().append(prod.price + " тнг");
                             $('.item-price-block .price-block .deposit b').empty().append(prod.deposit + " тнг");
                             $('#prices .tv').empty().append(prod.price + " тнг");
                             $('#prices .tvz').empty().append(prod.deposit + " тнг");


                             $('.user-information .avatar .image img').attr("src", getAva(prod.user_id));
                             if($.urlParam('cat_id') == 157){

                              $('.content-wrapper .test a').empty();
                              $('.content-wrapper .cat a').empty();

                             }
                             else{
                             $('.content-wrapper .test a').empty().append(getCatName($.urlParam('cat_id')));
                             $('.content-wrapper .cat a').attr("href","catalog.html?cat_id=" + p_id);
                             $('.content-wrapper .cat a').empty().append(getCatName(p_id));
                             }
                             $('.media-body a').empty().append(getUserName(prod.user_id));
                             $('.panel .panel-body #pr_desc').empty().append(prod.pr_desc);
                             $('.publish-date span').empty().append(date[0]);
                             $('#aboutme .col-sm-6 #reg_date').empty().append("Участник с " +  user_regDate[0]);

                             // $('.rm-landing-category__header-title').empty().append(cat.cat_name);

                              });
                              },
                              error: function (response) {

                               }
                            });



     var counter =1;
       $.ajax({

               url: "category/getPopularProductsByID",
               type: "GET",
               dataType: 'json',
               data: 'cat_id='+ cat_id +'&product_id='+ $.urlParam('product_id'),
               async:false,
               cache: false,
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
                              cache: false,
                             success: function(response) {
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


/*
   var pr_cost =null;

  for(var i =1; i<=4; ++i){
   $.ajax({

           url: "category/getProductByID",
           type: "GET",
           data: 'product_id='+i ,
            dataType: 'json',
           cache: false,
           success: function(response) {
            //
              var items = response.Products.map(function (item) {

              //console.log(response)
              //console.log(item.cat_id);
             // console.log(item.img);

            $('#'+item.product_id+' .onhover .slide-up .price-wrap .price span').empty().append(item.pr_cost);
            $('#'+item.product_id+' .onhover .title a').empty().append(item.pr_name);
            $('#'+item.product_id+' .fotorama .preview .wrapper img').attr("src", "upload/products"+item.img+"");
            $('#'+item.product_id+' .fotorama .preview .wrapper .background').attr("style", "background-image:url(upload/products" + item.img+")");

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
*/
});


function getCatName(cats_id){

  var cat_name = " ";
    $.ajax({
                             url: "category/getCatByID",
                             type: "GET",
                             data: 'cat_id='+ cats_id,
                             dataType: 'json',
                             cache: false,
                             async: false,
                             success: function(response) {

                                 var items = response.SubCats.map(function (cat) {
                                    cat_name = cat.cat_name;
                                    p_id= cat.p_id;
                                   });
                             },
                             error: function (response) {
                                    console.log("ERROR CATNAME");
                              }
                           });

                    return cat_name;
}



function getUserName(user_id){

  var user_name = "";
    $.ajax({
                             url: "/getUserByID",
                             type: "GET",
                             data: 'user_id='+ user_id,
                             dataType: 'json',
                             cache: false,
                             async: false,
                             success: function(response) {

                                 var items = response.User.map(function (user) {

                                        phone_num = user.phone_num;
                                        user_date = user.reg_date;
                                        user_regDate = user_date.split(" ");

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
                                                    user_name = cust.fio;
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
                                              user_name = comp.comp_name;
                                              });
                                              },
                                              });
                                        }

                                                          });
                             },
                             error: function (response) {
                              }
                           });

                    return user_name;
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
//                                console.log(ava);
//                                console.log(user.email);

                           });
                           },
                           error: function (response) {
                           console.log("Error getAva!!!");
                            }
                         });


                         return  ava;

}

function getPhone(pr_id){



var phone_num =null;
var usr_id = null;


 $.ajax({
                           url: "category/getProductByID",
                           type: "GET",
                           data: 'product_id='+ pr_id ,
                            dataType: 'json',
                           cache: false,
                            async: false,
                           success: function(response) {

                              var items = response.Products.map(function (pr) {

                             usr_id= pr.user_id;

                           });
                           },
                           error: function (response) {
                            }
                         });



 $.ajax({
                           url: "/getUserByID",
                           type: "GET",
                           data: 'user_id='+ usr_id ,
                            dataType: 'json',
                           cache: false,
                            async: false,
                           success: function(response) {

                              var items = response.User.map(function (user) {

                                phone_num = user.phone_num;
//                                console.log(phone_num);

                           });
                           },
                           error: function (response) {
                            }
                         });
                         return  phone_num;


}



function putReq(){

  var ver_number =false;

if($.cookie('user_id')==null){

     $("#newRequest").modal('show');


}
else{

 $.ajax({
                           url: "/getCustByID",
                           type: "GET",
                           data: 'user_id='+ $.cookie('user_id') ,
                            dataType: 'json',
                           cache: false,
                            async: false,
                           success: function(response) {

                              var items = response.Customer.map(function (cust) {

                                     if(phone_numUser == null)
                                        {
                                        $("#newReq p").empty().append("Пожалуйста добавьте Ваш номер телефона" );
                                          $("#newReq .form-group a").attr("href", "/profile.html");
                                       $('#newReq').modal({backdrop: 'static', keyboard: false})  ;
                                        $("#newReq").modal('show');
                                        }
                                        else{
                                     if( cust.ver_number == false)
                                     {
                                       $("#newReq p").empty().append("Пожалуйста подтвердите Ваш номер телефона !" + '\n'+ "Если c Вами еще не связались, можете написать нам на  ourent.kz@gmail.com или позвонить по номеру ниже.")
                                      $("#newReq .form-group a").attr("href", "/product.html?product_id="+$.urlParam('product_id')+ "&cat_id="+ $.urlParam('cat_id'));
                                       $("#newReq").modal('show');
                                     }
                                     else{
                                      ver_number =true;
                                     }
                                       }


                           });
                           },
                           error: function (response) {
                            console.log("ERROR CuST to test ver_number");
                            }
                         });

                         if(ver_number == true){

$.ajax({
                           url: "/request/putRequest",
                           type: "POST",
                           data: 'product_id='+ $.urlParam('product_id') + "&user_id=" + $.cookie('user_id'),
                            dataType: 'json',
                           cache: false,
                            async: false,
                           success: function(response) {

                              var items = response.Req.map(function (req) {

                                   $("#newReq p").append("Ваш запрос отправлен Владельцу." +'\n'+ " Можете дождаться email ответа, или позвонить по номеру " + phone_num  );
                                   $("#newReq .form-group a").attr("href", "/reqs.html");
                                    $("#newReq").modal('show');


                           });
                           },
                           error: function (response) {
                            }
                         });

}
                         }


}


function login (){


			 var email = $('#email').val();
			 var pass = $('#pass').val();

			 var JSONObj = {
                  "email" : email,
                  "pass" : pass
			 }
			 var data = JSON.stringify(JSONObj);
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
                                 $.cookie('email', email);
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


//   console.log($.cookie('user_id'));
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

                                         $("#newReq p").empty().append("Пожалуйста добавьте Ваш номер телефона" );
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


function putFav(){

   $.ajax({
                               url: "favs/putFav",
                               type: "POST",
                               data: 'product_id='+ $.urlParam('product_id')+ "&user_id="+ $.cookie('user_id'),
                               dataType: 'json',
                               cache: false,
                               async: false,
                               success: function(response) {



                                   var items = response.Favs.map(function (fav) {


//                                                                 console.log(fav.fav_id);

                                                                  $("#newReq p").empty().append("Товар успешно добавлен" );
                                                             // $("#newReq .form-group a").attr("href", "/favs.html");
                                                             $(".share a").empty().append('<i class="material-icons"></i> Уже в избранных');
                                                             $(".share a").empty().attr("href", "/favs.html");

                                                              $('#newReq').modal({backdrop: 'static', keyboard: false})  ;
                                                              $("#newReq").modal('show');



                                                            });


                               },
                               error: function (response) {
                                }
                             });


}


function logout()
{
      console.log("LOGOUT");
      $.cookie('user_id', null);
      $.cookie('email', null);
      $.cookie('pass', null);
       $('.user-profile').empty().append(' <div class="btn-group login">   <a class="btn btn-default show-modal" data-target="#newRequest" data-toggle="modal" >Войти</a></div>');
        window.location.href = "/";
}

