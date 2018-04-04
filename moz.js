(function($) {
    "use strict";
    $.fn.moz = function() {
    $(function() {
    var moz = $("#moz");
        
        if(moz.length === 0){
            console.error('#moz is missing');
        }
        
    var mozRealChF = $("#moz > figure");
        
    moz.append(document.createElement('div'));
    moz.children().last().addClass('mozData');
        
    moz.append(document.createElement('div'));
    moz.children().last().addClass('mozBut');
        var mozdt = $('.mozBut');
        for(var i=0; i<mozRealChF.length; i++ ){
            mozdt.append(document.createElement('button'));
            mozdt.children().last().text(i+1);
        };
        mozdt.css({'position': 'fixed','bottom': '5px','width': '100%', 'text-align' : 'center'});
        mozdt.hide();
    var mdt = $('.mozData');
    mdt.css({'background-color': 'darkolivegreen','position': 'fixed','top': '0','left': '0','width': '100%','height': '100%','opacity': '0.8', 'text-align' : 'center'});
    mdt.hide();
    
        $("img").click(function(){
             CreateBigImg(this.src);
             mdt.show();
             mozdt.show();
            
    })
    mdt.click(function(){
         mdt.hide();
         mozdt.hide();
        $('#mdtImg').remove();
    }
              
             )
        
$('button').click(function(){
        var src = mozRealChF.eq(this.innerHTML-1).find('img').attr('src');
        $('#mdtImg').attr('src', src);
    })
        
        function CreateBigImg(src){
            moz.append(document.createElement('img'));
            moz.children().last().attr('src', src);
            moz.children().last().attr('id', 'mdtImg');
            var heightNav = $(window).height()*0.8;
            css(heightNav);
        }
        
$( window ).resize(function() {
   var heightNav = $(window).height()*0.8;
    css(heightNav);
});
        function css(heightNav){
            $("#mdtImg").css({'position': 'fixed', 'top' : '0', 'bottom' : '0', 'right': '0','left': '0','width': 'auto','height': heightNav ,'opacity': '1', 'margin-left': 'auto', 'margin-right': 'auto', 'margin-top': 'auto', 'margin-bottom': 'auto'});
        }

});
    };
})(jQuery);
