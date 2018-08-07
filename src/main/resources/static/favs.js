
 $( document ).ready(function() {
   console.log("Page loaded");


if($.cookie('user_id')!=null){


//    console.log($.cookie('user_id'));
     var user_id = $.cookie('user_id');

    var email = $.cookie('email');
    var phone = $.cookie('phone');


    $.ajax({

                   url: "getUserByID",
                   type: "GET",
                   data: 'user_id='+ user_id,
                    dataType: 'json',
                   cache: false,
                   success: function(response) {

                      var items = response.User.map(function (user) {

//                      console.log(user.email);
                      var user_date = user.reg_date;
                      var user_d = user_date.split(" ");
                      var ava = user.ava;


//                   console.log(ava);

                        $(' .profile .btn-group button').empty().append(' <img src="'+ava+'" alt=""> ' +phone);




                 });

                   },
                   error: function (response) {
                    }
                 });



$.ajax({

           url: "favs/getFavsByUserID",
           type: "GET",
           data: 'user_id='+$.cookie('user_id') ,
            dataType: 'json',
           cache: false,
           success: function(response) {
            //
              var items = response.Favs.map(function (fav) {

              $.ajax({

                         url: "category/getProductByID",
                         type: "GET",
                         data: 'product_id='+fav.product_id ,
                          dataType: 'json',
                         cache: false,
                         success: function(response) {
                          //
                            var items = response.Products.map(function (prod) {


                                            var pr_date= prod.pr_date;
                                            var date = pr_date.split(" ");

                            var cat_name =     getCatName(prod.cat_id) ;
                             var ref = "/product.html?product_id=" +prod.product_id + "&cat_id=" +prod.cat_id;


 $('#Active .app-table-block').append('<div class="app-row-block item" data-key="'+prod.product_id+'"><div class="app-cell-block mobile-hide-960">'+prod.product_id+'</div>'+
                                                                                                 '<div class="app-cell-block mobile-hide-960"><a href="'+ref+'"><img class="img-circle" src="'+prod.img+'" alt="" style="width: 60px; height: 60px"></a></div>' +
                                                                                                 ' <div class="app-cell-block mobile-hide-960"><a class="item-title" href="'+ref+'">'+prod.pr_name+'</a></div>'+
                                                                                                 '<div class="app-cell-block mobile-hide-960">'+cat_name+'</div>'+
                                                                                                 ' <div class="app-cell-block mobile-hide-960">'+date[0]+'</div>'+


                                                                                                 '  <div class="mobile-show-960">' +
                                                                                                 '   <div class="renterOwner">' +
                                                                                                 '   <div class="align">' +
                                                                                                 ' <div class="photo">' +
                                                                                                 ' <img class="img-circle" src="'+prod.img+'" alt="" style="width: 80px; height: 80px">  </div>' +
                                                                                                 '  <div class="info">' +
                                                                                                 '  <div><a class="item-title" href="'+ref+'">'+prod.pr_name+'</a></div>' +
                                                                                                 ' <div>'+cat_name+'</div>' +
                                                                                                 '  <div>'+date[0]+'</div>' +

                                                                                                 ' </div>' +
                                                                                                 ' </div> ' +

                                                                                                 '  </div>' +
                                                                                                 '   </div></div>');


                         });
                         },
                         error: function (response) {

                         console.log("ERROR Favs category/getProductByID");
                          }
                       });

         });

           },
           error: function (response) {

                                    console.log("ERROR Favs favs/getFavsByUserID");
            }
         });

         }
         else
         {
                    window.location.href = "/";
         }

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
                                                              // console.log(cat_name);
                                                              // console.log(user.email);

                                                          });
                             },
                             error: function (response) {
                                                                                            console.log("ERROR CATNAME");
                              }
                           });

                    return cat_name;
}





function logout()
{
      console.log("LOGOUT");
      $.cookie('user_id', null);
      $.cookie('email', null);
      $.cookie('pass', null);
         window.location.href = "/";
}

