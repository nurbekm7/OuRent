
   var countActive = 0;
    var countOnCheck = 0;
 $( document ).ready(function() {
if($.cookie('user_id')!=null){

($.cookie('user_id'));
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

                      (user.email);
                      var user_date = user.reg_date;
                      var user_d = user_date.split(" ");
                      var ava = user.ava;
                 $(' .profile .btn-group button').empty().append(' <img src="'+ava+'" alt=""> ' +phone);

                 });

                   },
                   error: function (response) {
                    }
                 });


     $('.oncheck').hide();

$.ajax({

           url: "request/getRequestByUserID",
           type: "GET",
           data: 'user_id='+$.cookie('user_id') ,
           dataType: 'json',
           cache: false,
           success: function(response) {
            //
              var items = response.Reqs.map(function (req) {

                var req_date= req.rq_date;
                  var r_date = req_date.split(".");
                  var r_status = req.rq_status;

              $.ajax({

                         url: "category/getProductByID",
                         type: "GET",
                         data: 'product_id='+req.product_id ,
                          dataType: 'json',
                         cache: false,
                         success: function(response) {

                            var items = response.Products.map(function (prod) {
                            var pr_date= prod.pr_date;
                            var date = pr_date.split(" ");
                            var cat_name =  getCatName(prod.cat_id) ;
                             var ref = "/product.html?product_id=" +prod.product_id + "&cat_id=" +prod.cat_id;

                                       if(r_status==false){

             $('#Active .app-table-block').append('<div class="app-row-block item" data-key="'+prod.product_id+'"><div class="app-cell-block mobile-hide-960">'+prod.product_id+'</div>'+
                                                                                                             '<div class="app-cell-block mobile-hide-960"><a href="'+ref+'"><img class="img-circle" src="'+prod.img+'" alt="" style="width: 60px; height: 60px"></a></div>' +
                                                                                                 ' <div class="app-cell-block mobile-hide-960"><a class="item-title" href="'+ref+'">'+prod.pr_name+'</a></div>'+
                                                                                                 '<div class="app-cell-block mobile-hide-960">'+cat_name+'</div>'+
                                                                                                 ' <div class="app-cell-block mobile-hide-960">'+date[0]+'</div>'+
                                                                                                  ' <div class="app-cell-block mobile-hide-960">'+r_date[0]+'</div>' +
                                                                                                 '  <div class="mobile-show-960">' +
                                                                                                 '   <div class="renterOwner">' +
                                                                                                 '   <div class="align">' +
                                                                                                 ' <div class="photo">' +
                                                                                                 ' <img class="img-circle" src="'+prod.img+'" alt="" style="width: 80px; height: 80px">  </div>' +
                                                                                                 '  <div class="info">' +
                                                                                                 '  <div><a class="item-title" href="'+ref+'">'+prod.pr_name+'</a></div>' +
                                                                                                 ' <div>'+cat_name+'</div>' +
                                                                                                 '  <div>'+date[0]+'</div>' +
                                                                                                  '  <div>'+r_date[0]+'</div>' +

                                                                                                 ' </div>' +
                                                                                                 ' </div> ' +

                                                                                                 '  </div>' +
                                                                                                 '   </div></div>');
                                                                                                 countActive++;
                                                                                                 }
                                                                                                 else{
                                                                                                  countOnCheck++;
                                                                                                 $('#OnCheck .app-table-block').append('<div class="app-row-block item" data-key="'+prod.product_id+'"><div class="app-cell-block mobile-hide-960">'+prod.product_id+'</div>'+
                                                                                                                                                  '<div class="app-cell-block mobile-hide-960"><a href="'+ref+'"><img class="img-circle" src="'+prod.img+'" alt="" style="width: 60px; height: 60px"></a></div>' +
                                                                                                                                                  ' <div class="app-cell-block mobile-hide-960"><a class="item-title" href="'+ref+'">'+prod.pr_name+'</a></div>'+
                                                                                                                                                  '<div class="app-cell-block mobile-hide-960">'+getCatName(prod.cat_id)+'</div>'+
                                                                                                                                                  ' <div class="app-cell-block mobile-hide-960">'+date[0]+'</div>'+
                                                                                                                                                  ' <div class="app-cell-block mobile-hide-960">'+r_date[0]+'</div>' +

                                                                                                                                                  '  <div class="mobile-show-960">' +
                                                                                                                                                  '   <div class="renterOwner">' +
                                                                                                                                                  '   <div class="align">' +
                                                                                                                                                  ' <div class="photo">' +
                                                                                                                                                  ' <img class="img-circle" src="'+prod.img+'" alt="" style="width: 80px; height: 80px">  </div>' +
                                                                                                                                                  '  <div class="info">' +
                                                                                                                                                  '  <div><a class="item-title" href="'+ref+'">'+prod.pr_name+'</a></div>' +
                                                                                                                                                  ' <div>'+getCatName(prod.cat_id)+'</div>' +
                                                                                                                                                  '  <div>'+date+'</div>' +
                                                                                                                                                  '  <div>'+r_date[0]+'</div>' +
                                                                                                                                                  ' </div>' +
                                                                                                                                                  ' </div> ' +
                                                                                                                                                  '  </div>' +
                                                                                                                                                  '   </div></div>');
                                                                                                 }


$('.app-nav-submenu #badgeAc').empty().append(countActive);
$('.app-nav-submenu #badgeOn').empty().append(countOnCheck);

                         });
                         },
                         error: function (response) {
                         ("ERROR Favs category/getProductByID");
                          }
                       });

         });

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
                                                              // (cat_name);
                                                              // (user.email);

                                                          });
                             },
                             error: function (response) {
                                                                                            ("ERROR CATNAME");
                              }
                           });

                    return cat_name;
}




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



function logout()
{
      ("LOGOUT");
      $.cookie('user_id', null);
      $.cookie('email', null);
      $.cookie('pass', null);
         window.location.href = "/";
}

