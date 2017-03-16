

$.validator.setDefaults( {
     			submitHandler: function () {

     			 var email = $('#reg_email').val();
     			 var pass = $('#reg_pass').val();

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

                        window.location.href = "/putprod.html";


                                                     });
                                                     }


                         },
                         error: function (response) {
                         }
                         });

     			}
     		} );



 var cats_id = null;
$( document ).ready(function() {


 $('#signupForm').submit(function(event){


			 var email = $('#email').val();
			 var pass = $('#pass').val();
				$.ajax({
					type: "POST",
					url: "/login",
					data:"email="+email+"&pass="+pass,
					dataType:"json",
					success: function(msg){
                           if(msg.result == "fail"){
                            alert('Неправильный логин или пароль');
                           }
                         else{

                     	 var items = msg.User.map(function (user) {
                                 $.cookie('email', email);
                                $.cookie('user_id', user.user_id);
                                if(user.phone_num != null){
                                    window.location.href = "/putprod.html";
                                }
                                else
                                {
                                    window.location.href = "/profile.html";
                                }
                            });
                            }
			},
					error: function(){
                            console.log("login fail");
					}
				});

				event.preventDefault();

});


 if($.cookie('user_id')==null){
$('#logi #btnLogi').show();
 }
 else{
 $('#logi #btnLogi').hide();

//    var email = $.cookie('email');
//    var email1 = email.split('@');
//  $('#logi').append(' <div class="profile">  <div class="btn-group">' +
//                                       '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span>' +
//                                           '<img src="/upload/users/default_user.png" alt="">' +
//                                             '</span> '  + email1[0] +  '</button>'+
//                                                   '<ul class="dropdown-menu">' +
//                                                       '<li>' +
//                                                          ' <a href="/user/1341">Профиль</a>  ' +
//                                                         ' </li>' +
//                                                       '<li>' +
//                                                           '<a href="/booking/renter">Доверие и подтверждение</a> ' +
//                                                           '</li>' +
//                                                       '<li>' +
//                                                           '<a href="/wishlist">Избранное</a></li>' +
//                                                       '<li>' +
//                                                       '<a href="/message/dialog">Настройки</a>' +
//                                                       '</li>' +
//                                                      ' <li>' +
//                                                      '<a href="/item/my">Мои объявления</a> ' +
//                                                      '</li>' +
//                                                       ' <li>' +
//                                                       '<a href="/referral">Мои запросы</a>' +
//                                                       '</li>' +
//                                                       '<li>'+
//                                                          ' <a href="/" onclick="logout()">Выйти</a>  </li>' +
//                                                           '</ul></div></div>');
//
//
// $('#logi ').append('<span class="rm-popover">'+
//                                     '<button type="button" class="rm-header__btn_avatar rm-header__btn" data-toggle="popover" data-placement="bottom" data-content="'+
//                                           '<ul class=&quot;rm-dropdown&quot; >' +
//                                          '   <li><a href=&quot;/lots/my&quot;>Профиль</a></li>' +
//                                             '<li><a href=&quot;/lots/my&quot;>Доверие и подтверждение</a></li>' +
//                                             '<li className=&quot;divider&quot;>Настройки</li>'+
//                                             '<li><a href=&quot;/conversations&quot;>Сообщения</a></li>'+
//                                             '<li><a href=&quot/&quot" onclick=&quot;logout()&quot; className=&quot;border_link&quot; data-action=&quot;user.logout&quot; rel=&quot;nofollow&quot; >Выйти</a></li>' +
//                                              '</ul>' +
//                                        ' "data-original-title="" title="">' +
//                                        ' <span class="rm-avatar">' +
//                                           ' <img alt="" class="rm-avatar__image rm-avatar__image_icon" src="upload/users'+ getAva($.cookie('user_id')) +'">'+
//                                         '</span> </button></span>');
//
// console.log("user_id not null");
}


  $.urlParam = function(name){
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
      if (results==null){
         return null;
      }
      else{
         return results[1] || 0;
      }
  }
cats_id =$.urlParam('cat_id');
    $.ajax({
                           url: "category/getCatByID",
                           type: "GET",
                           data: 'cat_id='+ $.urlParam('cat_id') ,
                            dataType: 'json',
                           cache: false,
                           success: function(response) {

                              var items = response.SubCats.map(function (cat) {

                           $('.filter-block__header .title').empty().append(cat.cat_name);
                           $('.rm-breadcrumb #c_name a').empty().append(cat.cat_name);
                           $('.rm-landing-category__header-title').empty().append(cat.cat_name);

                           });
                           },
                           error: function (response) {
                            }
                         });

    $.ajax({
                           url: "category/getSubCatsByID",
                           type: "GET",
                           data: 'cat_id='+ $.urlParam('cat_id') ,
                            dataType: 'json',
                           cache: false,
                           success: function(response) {
                              var items = response.SubCats.map(function (sub) {
                          $(' .rm-list .rm-filters__row .filter-block .nav  .filter-block__list').append('<div class="filter-block__item-category" id="itm">' +
                          '<a onclick="getProducts('+ sub.cat_id+')" class="rm-link" title="'+ sub.cat_name + '">' +
                          sub.cat_name + '</a></div>');
                           });
                           var c = Math.floor((Math.random() * response.SubCats.length) + 0);
                           getProducts(response.SubCats[c].cat_id);
                           console.log("Category: " + response.SubCats[c].cat_id);
//                           console.log(c);
//                           console.log(response.SubCats.length);
                           },
                           error: function (response) {
                            }
                         });

});



function getProducts(cat_id) {


//
//$(this).each(function() {
//console.log("EACH");
//    $(this).attr("class", $(this).attr("class") + " filter-block__item-category_sel ");
//});

$('#search-results').empty();
$.ajax({
                           url: "category/getProducts",
                           type: "GET",
                           data: 'cat_id='+ cat_id ,
                            dataType: 'json',
                           cache: false,
                           async:false,
                           success: function(response) {

                            var items = response.Products.map(function (prod) {


           $('#search-results').append(' <div class="col-sm-4" data-id="'+prod.product_id+'">' +
 ' <a href="/product.html?product_id='+prod.product_id+'&cat_id='+cats_id+'" class="rm-link rm-list-item " title="'+prod.pr_name+'">' +
   ' <div class="rm-list-item__hero">' +
     ' <div class="rm-list-item__pic"> ' +
       ' <img class="rm-list-item__pic-img" alt="'+prod.pr_name+'" title="'+prod.pr_name+'" src="'+ getProdImg(prod.img)+'"/>' +
      '</div>' +
     ' <div class="rm-list-item__price"> ' +
      '  <div class="rm-price rm-price__list">' +
         ' <div class="rm-price__price">' + prod.price + ' <div class="fa "></div>  ' +
          '</div>' +
          '<div class="rm-price__period"> Цена ' +
           '<div class="rm-list-item-price__period-lbl">' +
             'тнг' +
            '</div>' +
          '</div>'+
       ' </div>' +
       ' </div> ' +
    ' </div>' +
    '<div class="rm-list-item__user">' +
       '<div class="rm-user">' +
         ' <div class="rm-user__avatar">'+
           ' <img alt="" class="rm-user__avatar__img" src="'+ getAva(prod.user_id)  +'" title="'+getUserName(prod.user_id)+'" />' +
          '</div>'+
         ' <div class="rm-user__name">'+ getUserName(prod.user_id) +
        '  </div>' +
     ' </div>' +
   '  </div>'+
   ' <div class="rm-list-item__info">' +
     ' <div class="rm-litem">' +
     '     <h4 class="rm-litem__title" alt="'+prod.pr_name+'" title="'+prod.pr_name+'">' +
            prod.pr_name +
          '</h4>' +
        '</div>' +
    '</div>'+
'</a></div>' );



                           });
                           },
                           error: function (response) {
                            }
                         });




}



function getCatName(cats_id){

  var cat_name = "";
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
//                                                               console.log(cat_name);
                                                              // console.log(user.email);

                                                          });
                             },
                             error: function (response) {
                                  console.log("ERROR CATNAME");
                              }
                           });

                    return cat_name;
}


function getProdImg(img){

  if(img == null)
  {
  return "/upload/products/prod_default.png"}
  else
  return img;
}

function getUserName(user_id){

  var user_name = " ";
    $.ajax({
                             url: "/getUserByID",
                             type: "GET",
                             data: 'user_id='+ user_id,
                             dataType: 'json',
                             cache: false,
                             async: false,
                             success: function(response) {

                                 var items = response.User.map(function (user) {

                                                               user_name = user.email;
//                                                               console.log(user_name);
                                                              // console.log(user.email);

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

                           });
                           },
                           error: function (response) {
                            }
                         });

                          if(ava == null)
                           {

                         return "/upload/users/default_user.png" ;
                         }
                         else
                         {return  ava;}

}


function checkLogin(){


//   console.log($.cookie('user_id'));
   var mobile = null;
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
                                mobile = user.phone_num;

                           });
                           },
                           error: function (response) {
                           console.log("Error getting user");
                            }
                         });

              if(mobile==null){
               window.location.href = "/profile.html";
              }
     window.location.href = "/putprod.html";
    }

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


