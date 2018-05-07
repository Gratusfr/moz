 /************
     
    JQuery plugin which create slider from images grid (mosaic).
        Copyright (C) 2018  Gratusfr - https://github.com/Gratusfr/moz

        This program is free software: you can redistribute it and/or modify
        it under the terms of the GNU General Public License as published by
        the Free Software Foundation, either version 3 of the License, or
        (at your option) any later version.

        This program is distributed in the hope that it will be useful,
        but WITHOUT ANY WARRANTY; without even the implied warranty of
        MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
        GNU General Public License for more details.

        You should have received a copy of the GNU General Public License
    along with this program. If not, see <http://www.gnu.org/licenses/>.

    **************/

 (function ($) {
     "use strict";
     $.fn.moz = function (options) {
         var defauts = {
             "bgColor": "#556b2f",
             "autoplay" : true
         };

         var userdata = $.extend(defauts, options);

         return this.each(function () {

             $(function () {
                 var moz = $("#moz");

                 if (moz.length === 0) {
                     return; //exit if #moz is not found
                 }
                 var regegExa = /^#[0-9A-F]{3}([0-9A-F]{3})?$/i;
                 if (!regegExa.test(userdata.bgColor)) {
                     console.warn('The background-color must be written under hexadecimal form (if you want black : #000 or #000000). Your value has been overwritten by #556b2f.');
                     userdata.bgColor = "#556b2f";
                 }

                 var mozRealChF = $("#moz > figure").not('.mozExit');

                 moz.append(document.createElement('div'));
                 moz.children().last().addClass('mozData');

                 moz.append(document.createElement('div'));
                 moz.children().last().addClass('mozBut');
                 var mozdt = $('.mozBut');
                 for (var i = 0; i < mozRealChF.length; i++) {
                     mozdt.append(document.createElement('button'));
                     mozdt.children().last().text(i + 1);
                 };

                 mozRealChF.each(function () {
                     var a = $(this).find('img');
                     var b = $(this).find('video');
                     if (a.length == 1) {
                         URL_validation(a);
                     } else {
                         URL_validation(b);
                     }
                 })


                 function URL_validation(element) {
                     var url = element.attr('src');
                     var req = $.ajax(url, {
                         'method': 'HEAD'
                     })

                     req.fail(function () {
                         element.addClass('mozErrorSrc');
                         //mozdt.children().last().remove(); => removed : prevent the access to valid imgs/vids if 404 links are not in the end.
                     })
                 }


                 mozdt.css({
                     'position': 'fixed',
                     'bottom': '5px',
                     'left': '0',
                     'width': '100%',
                     'text-align': 'center'
                 });
                 mozdt.hide();
                 var mdt = $('.mozData');
                 mdt.css({
                     'background-color': userdata.bgColor,
                     'position': 'fixed',
                     'top': '0',
                     'left': '0',
                     'width': '100%',
                     'height': '100%',
                     'opacity': '0.8',
                     'text-align': 'center'
                 });
                 mdt.hide();

                 $("#moz img").click(function () {
                     if ($(this).parent().hasClass('mozExit') | $(this).hasClass('mozErrorSrc')) {
                         return;
                     }
                     var t = $('#moz img, #moz video').not('.mozExit').index(this);
                     navClass(t);
                     var legend = $(this).siblings('figcaption').html();
                     CreateBigImg(this.src, legend);
                     mdt.show();
                     mozdt.show();

                 })
                 $("#moz video").click(function () {
                     if ($(this).parent().hasClass('mozExit') | $(this).hasClass('mozErrorSrc')) {
                         return;
                     }
                     var t = $('#moz img, #moz video').not('.mozExit').index(this);
                     navClass(t);
                     var legend = $(this).siblings('figcaption').html();
                     CreateBigVid(this.src, legend);
                     mdt.show();
                     mozdt.show();

                 })
                 
                 function navClass(t){
                     $('#moz .active').removeClass('active').prop('disabled', null);
                     $('#moz .mozRight').removeClass('mozRight');
                     $('#moz .mozLeft').removeClass('mozLeft');
                     t = t + 1;
                     var t1 = t + 1;
                     var t2 = t - 1;
                     $('.mozBut button:nth-child(' + t + ')').addClass('active').prop('disabled', true);
                     $('.mozBut button:nth-child(' + t1 + ')').addClass('mozRight');
                     $('.mozBut button:nth-child(' + t2 + ')').addClass('mozLeft');
                 }
                 
                 mdt.click(function () {
                         mdt.hide();
                         mozdt.hide();
                         $('#mdtImg').remove();
                         $('#mozLegend').remove();
                     }

                 )

                 $('button').click(clickAction);

                 function clickAction(no) {
                     $('.mozBut').children('button').removeClass('active').prop('disabled', null);
                     $('#moz .mozRight').removeClass('mozRight');
                     $('#moz .mozLeft').removeClass('mozLeft');
                     $(this).addClass('active').prop('disabled', true);
                     $(this).next().addClass('mozRight');
                     $(this).prev().addClass('mozLeft');
                     $('#mdtImg').remove();
                     $('#mozLegend').remove();
                     var src = mozRealChF.eq(this.innerHTML - 1).find('img').not('.mozErrorSrc').attr('src');
                     var legend = mozRealChF.eq(this.innerHTML - 1).find('img').not('.mozErrorSrc').siblings('figcaption').html();
                     if (src === undefined) {
                         var src = mozRealChF.eq(this.innerHTML - 1).find('video').not('.mozErrorSrc').attr('src');
                         var legend = mozRealChF.eq(this.innerHTML - 1).find('video').not('.mozErrorSrc').siblings('figcaption').html();
                         if (src === undefined) {
                             console.warn('src undefined');
                         } else {
                             CreateBigVid(src, legend);
                         }

                     } else {
                         CreateBigImg(src, legend);
                     }
                 }

                 function CreateBigImg(src, legend) {
                     Legend(legend);
                     moz.append(document.createElement('img')).children().last().attr('src', src).attr('id', 'mdtImg');
                     init_css();
                     css();
                 }

                 function CreateBigVid(src, legend) {
                     Legend(legend);
                     var v = moz.append(document.createElement('video')).children().last().attr('src', src).attr('id', 'mdtImg').attr('controls', 'true');
                     if(userdata.autoplay === true){
                         v.attr('autoplay', '');
                     }
                     init_css();
                     css();
                     css(true);
                 }
                 
                 function Legend(legend){
                     if(legend != undefined){
                         moz.append(document.createElement('p')).children().last().html(legend).attr('id', 'mozLegend');
                          $('#mozLegend').css({'position': 'fixed', 'top': '0', 'left': '50%', 'transform': 'translateX(-50%)'});
                     }
                 }

                 $(window).resize(function () {
                     css(true);
                 });

                 function init_css() {
                     $("#mdtImg").css({
                         'position': 'fixed',
                         'top': '0',
                         'bottom': '0',
                         'right': '0',
                         'left': '0',
                         'opacity': '1',
                         'margin-left': 'auto',
                         'margin-right': 'auto',
                         'margin-top': 'auto',
                         'margin-bottom': 'auto'
                     });
                 }

                 function css(resize) {
                     var widthNav = $(window).width();
                     var heightNav = $(window).height();
                     $("#mdtImg").css({
                         'height': heightNav * 0.8,
                         'width': 'auto'
                     });
                     if(resize === undefined){
                         $("#mdtImg").on("load", function() {
                        var widthImg = $("#mdtImg").width();
                        if (widthNav < widthImg) {
                            $("#mdtImg").css({
                             'width': widthNav,
                             'height': 'auto',
                            });
                        }
                    }); 
                     }else{
                         var widthImg = $("#mdtImg").width();
                         if (widthNav < widthImg) {
                            $("#mdtImg").css({
                             'width': widthNav,
                             'height': 'auto',
                            });
                        }
                     }
                      
                 }
             });

         });
     };
})(jQuery);
