
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
  var countReq =0;
    var countAvtive = 0;
    var countOnCheck = 0;



     $('.oncheck').hide();

//      $('#OnCheck .app-table-block').empty().append(" <div class='app-row-block-header'><div class='app-cell-block'><span>№</span></div><div class='app-cell-block'> <span></span></div><div class='app-cell-block'><span>Наименование</span>   </div>   <div class='app-cell-block'> <span>Категория и Подкатегория</span> </div><div class='app-cell-block'><a class=""  >Дата публикации</a> </div><div class='app-cell-block'><a class=""  >Запросы</a> </div><div class='app-cell-block'></div></div>");
//           $('#Active .app-table-block').empty().append(" <div class='app-row-block-header'><div class='app-cell-block'><span>№</span></div><div class='app-cell-block'> <span></span></div><div class='app-cell-block'><span>Наименование</span>   </div>   <div class='app-cell-block'> <span>Категория и Подкатегория</span> </div><div class='app-cell-block'><a class=""  >Дата публикации</a> </div><div class='app-cell-block'><a class=""  >Запросы</a> </div><div class='app-cell-block'></div></div>");;


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






                           $.ajax({
                                       url: "/category/getProductByUserID",
                                          type: "GET",
                                          data: 'user_id='+ user_id,
                                          dataType: 'json',
                                          cache: false,
                                        async:false,
                                          success: function(response) {

                                         var items = response.Products.map(function (prod) {

                                          console.log(prod.product_id);
                                         countReq    = 0;

                                            var pr_date= prod.pr_date;
                                            var date = pr_date.split(" ");


                                                               $.ajax({

                                                                             url: "request/getRequestByPrID",
                                                                             type: "GET",
                                                                             data: 'product_id='+ prod.product_id,
                                                                              dataType: 'json',
                                                                             cache: false,
                                                                             async:false,
                                                                             success: function(response) {

                                                                               if(response == null){

                                                                               countReq = 0;
                                                                                console.log(countReq);
                                                                               }
                                                                               else{
                                                                                 var items = response.Reqs.map(function (reqs) {

                                                                                     countReq++;
                                                                                   });


                                                                              }


                                                                             },
                                                                             error: function (response) {
                                                                              }
                                                                           });

                                                                           console.log(prod.pr_name +"  =="+countReq);



                                                if(prod.cat_id == '157'){

                                                 countOnCheck++;

                                                 $('#OnCheck .app-table-block').append('<div class="app-row-block item" data-key="'+prod.product_id+'"><div class="app-cell-block mobile-hide-960">'+prod.product_id+'</div>'+
                                                 '<div class="app-cell-block mobile-hide-960"><a href="/product.html?product_id='+prod.product_id+'&cat_id='+prod.cat_id+'"><img class="img-circle" src="'+prod.img+'" alt="" style="width: 60px; height: 60px"></a></div>' +
                                                 ' <div class="app-cell-block mobile-hide-960"><a class="item-title" href="/product.html?product_id='+prod.product_id+'&cat_id='+prod.cat_id+'">'+prod.pr_name+'</a></div>'+
                                                 '<div class="app-cell-block mobile-hide-960">'+getCatName(prod.cat_id)+'</div>'+
                                                 ' <div class="app-cell-block mobile-hide-960">'+date[0]+'</div>'+
                                                 ' <div class="app-cell-block mobile-hide-960">'+countReq+'</div>' +
                                                 '  <div class="app-cell-block mobile-hide-960 app-booking-actions text-right text-nowrap"><a class="app-icon edit" href="/product.html?product_id='+prod.product_id+'&cat_id='+prod.cat_id+'" title="Редактировать" data-toggle="tooltip" data-placement="top"></a><a class="app-icon remove show-modal" href="#" title="Удалить" data-toggle="tooltip" data-placement="top"></a></div>' +
                                                 '  <div class="mobile-show-960">' +
                                                 '   <div class="renterOwner">' +
                                                 '   <div class="align">' +
                                                 ' <div class="photo">' +
                                                 ' <img class="img-circle" src="'+prod.img+'" alt="" style="width: 80px; height: 80px">  </div>' +
                                                 '  <div class="info">' +
                                                 '  <div><a class="item-title" href="/product.html?product_id='+prod.product_id+'&cat_id='+prod.cat_id+'">'+prod.pr_name+'</a></div>' +
                                                 ' <div>'+getCatName(prod.cat_id)+'</div>' +
                                                 '  <div>'+date[0]+'</div>' +
                                                 '  <div>'+countReq+'</div>' +
                                                 ' </div>' +
                                                 ' </div> ' +
                                                 ' <div class="app-booking-actions text-right text-nowrap"><a class="app-icon edit" href="/product.html?product_id='+prod.product_id+'&cat_id='+prod.cat_id+'" title="Редактировать" data-toggle="tooltip" data-placement="top"></a><a class="app-icon remove show-modal" href="#" title="Удалить" data-toggle="tooltip" data-placement="top"></a></div>' +
                                                 '  </div>' +
                                                 '   </div></div>');

                                                }else
                                                {
                                                  countAvtive++;
                                                $('#Active .app-table-block').append('<div class="app-row-block item" data-key="'+prod.product_id+'"><div class="app-cell-block mobile-hide-960">'+prod.product_id+'</div>'+
                                                                                                 '<div class="app-cell-block mobile-hide-960"><a href="/product.html?product_id='+prod.product_id+'&cat_id='+prod.cat_id+'"><img class="img-circle" src="'+prod.img+'" alt="" style="width: 60px; height: 60px"></a></div>' +
                                                                                                 ' <div class="app-cell-block mobile-hide-960"><a class="item-title" href="/product.html?product_id='+prod.product_id+'&cat_id='+prod.cat_id+'">'+prod.pr_name+'</a></div>'+
                                                                                                 '<div class="app-cell-block mobile-hide-960">'+getCatName(prod.cat_id)+'</div>'+
                                                                                                 ' <div class="app-cell-block mobile-hide-960">'+date[0]+'</div>'+
                                                                                                 ' <div class="app-cell-block mobile-hide-960">'+countReq+'</div>' +
                                                                                                 '  <div class="app-cell-block mobile-hide-960 app-booking-actions text-right text-nowrap"><a class="app-icon edit" href="/product.html?product_id='+prod.product_id+'&cat_id='+prod.cat_id+'" title="Редактировать" data-toggle="tooltip" data-placement="top"></a><a class="app-icon remove show-modal" href="#" title="Удалить" data-toggle="tooltip" data-placement="top"></a></div>' +
                                                                                                 '  <div class="mobile-show-960">' +
                                                                                                 '   <div class="renterOwner">' +
                                                                                                 '   <div class="align">' +
                                                                                                 ' <div class="photo">' +
                                                                                                 ' <img class="img-circle" src="'+prod.img+'" alt="" style="width: 80px; height: 80px">  </div>' +
                                                                                                 '  <div class="info">' +
                                                                                                 '  <div><a class="item-title" href="/product.html?product_id='+prod.product_id+'&cat_id='+prod.cat_id+'">'+prod.pr_name+'</a></div>' +
                                                                                                 ' <div>'+getCatName(prod.cat_id)+'</div>' +
                                                                                                 '  <div>'+date[0]+'</div>' +
                                                                                                 '  <div>'+countReq+'</div>' +
                                                                                                 ' </div>' +
                                                                                                 ' </div> ' +
                                                                                                 ' <div class="app-booking-actions text-right text-nowrap"><a class="app-icon edit" href="/product.html?product_id='+prod.product_id+'&cat_id='+prod.cat_id+'" title="Редактировать" data-toggle="tooltip" data-placement="top"></a><a class="app-icon remove show-modal" href="#" title="Удалить" data-toggle="tooltip" data-placement="top"></a></div>' +
                                                                                                 '  </div>' +
                                                                                                 '   </div></div>');


                                                }

                                                    });

                                                      },
                                                      error: function (response) {
                                                       }
                                                    });


console.log(countOnCheck);

$('.app-nav-submenu #badgeAc').empty().append(countAvtive);
$('.app-nav-submenu #badgeOn').empty().append(countOnCheck);



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





