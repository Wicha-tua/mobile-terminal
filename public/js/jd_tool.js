
$(function(){
    jd_tool = {
        contalShow : function(parentElem, childElem, eventShow, eventHide){
            $(parentElem).bind(eventShow, function(){
                $(childElem).show();
            }).bind(eventHide, function(){
                $(childElem).hide();
            });

        }
    };
    window.jd_tool = jd_tool;

});