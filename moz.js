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

                 var mozRealChF = $("#moz > figure");

                 moz.append(document.createElement('div'));
                 moz.children().last().addClass('mozData');

                 moz.append(document.createElement('div'));
                 moz.children().last().addClass('mozBut');
                 var mozdt = $('.mozBut');
                 for (var i = 0; i < mozRealChF.length; i++) {
                     mozdt.append(document.createElement('button'));
                     mozdt.children().last().text(i + 1);
                 };
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

                 $("img").click(function () {
                     CreateBigImg(this.src);
                     mdt.show();
                     mozdt.show();

                 })
                 $("video").click(function () {
                     CreateBigVid(this.src);
                     mdt.show();
                     mozdt.show();

                 })
                 mdt.click(function () {
                         mdt.hide();
                         mozdt.hide();
                         $('#mdtImg').remove();
                     }

                 )

                 $('button').click(function () {
                     $('.mozBut').children('button').removeClass('active');
                     $(this).addClass('active');
                     $('#mdtImg').remove();
                     var src = mozRealChF.eq(this.innerHTML - 1).find('img').attr('src');
                     if (src === undefined) {
                         var src = mozRealChF.eq(this.innerHTML - 1).find('video').attr('src');
                         CreateBigVid(src);
                     } else {
                         CreateBigImg(src);
                     }
                 })

                 function CreateBigImg(src) {
                     moz.append(document.createElement('img')).children().last().attr('src', src).attr('id', 'mdtImg');
                     var heightNav = $(window).height() * 0.8;
                     css(heightNav);
                 }

                 function CreateBigVid(src) {
                     moz.append(document.createElement('video')).children().last().attr('src', src).attr('id', 'mdtImg').attr('controls', 'true');
                     var heightNav = $(window).height() * 0.8;
                     css(heightNav);
                 }

                 $(window).resize(function () {
                     var heightNav = $(window).height() * 0.8;
                     css(heightNav);
                 });

                 function css(heightNav) {
                     $("#mdtImg").css({
                         'position': 'fixed',
                         'top': '0',
                         'bottom': '0',
                         'right': '0',
                         'left': '0',
                         'width': 'auto',
                         'height': heightNav,
                         'opacity': '1',
                         'margin-left': 'auto',
                         'margin-right': 'auto',
                         'margin-top': 'auto',
                         'margin-bottom': 'auto'
                     });
                 }

             });

         });
     };

 })(jQuery);
