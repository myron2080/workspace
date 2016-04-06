var userID = localStorage.userId;
var getCouponFun = function(){
    var _couponData = null;
    var url = 'data/getMyCoupons.json';
    $.frontEngineAjax.executeAjax(url,"get","",function(result){
        _couponData = result.resultData.coupons;

        var couponListHtml = '';
        for(var i = 0; i < _couponData.length; i++){
            var couponID = _couponData[i].couponsId;
            var isOverdue = _couponData[i].overdue; //是否过期true为过期，false是没过期
            var couponsName = _couponData[i].couponsName;//券名称
            var couponsPar = _couponData[i].par;//券金额
            var overdueDate = _couponData[i].overdueDate;//有效期

            var getClass="";
            var getImg="";
            if(isOverdue){//已过期
                getClass="expired";
                getImg="images/coupon_left2.jpg";
            }else{
                getClass="unexpired";
                getImg="images/coupon_left.jpg";
            }

            couponListHtml += '<li class="'+getClass+'" id="'+couponID+'" isOverdue="'+isOverdue+'">';
            couponListHtml += '<div class="couponListDiv">';
            couponListHtml += '<div class="coupon_left"><img src="'+getImg+'" width="100%"></div>';
            couponListHtml += '<div class="couponInfo">';
            couponListHtml += '<div class="price"><span><font>￥</font>'+couponsPar+'</span>/</div>';
            couponListHtml += '<div class="couponName"><p>'+couponsName+'</p><span>有效期至'+overdueDate+'</span></div>';
            couponListHtml += '</div><div class="clear"></div>';
            couponListHtml += '</div>';
            couponListHtml += '</li>';

        }
        $("#couponList-ul").append(couponListHtml);

        var couponID = null;
        $("#couponList-ul li.unexpired").click(function(){
            $(".couponSelect").remove();
            $(this).find("div.couponListDiv").append('<div class="couponSelect"><span>选中的</span></div>');
            couponID = $(this).attr("id");
            sessionStorage.removeItem("couponID");
            sessionStorage.setItem("couponID",couponID);
            history.go(-1);
        });
        var href = document.referrer; // 获取到上一级url
        if(href.indexOf("confirmOrder.html")>=0){
            $("#couponList-ul li.expired").css("display","none");
        }
    });
}