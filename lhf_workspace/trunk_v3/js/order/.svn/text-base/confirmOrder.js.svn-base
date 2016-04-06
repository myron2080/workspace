var userID = localStorage.userId;
var confirmOrderContent = function(){
    var isUseCoupons = 0; //是否使用优惠券
    //获取接口数据
    var _getConfirmOrderInfoData = null, _getConDishesListData = null,  _getConUserData = null,  _getConAddressData = null,
        _getConPointData = null, _getCanUseCouponsCountData = null;
    var getConfirmUrl = 'data/getConfirmOrderInfo.json';
    $.frontEngineAjax.executeAjax(getConfirmUrl,"get","",function(result){
        _getConfirmOrderInfoData = result.resultData;//获取到接口的全部数据
        _getConDishesListData = _getConfirmOrderInfoData.dishesList; //获取到接口的菜品信息
        //循环菜品信息
        var confirmDishesListData = '';
        for(var i = 0; i < _getConDishesListData.length; i++){
            var pCount = _getConDishesListData[i].copiesCount;
            var pName = _getConDishesListData[i].name;
            var pRealPrice = _getConDishesListData[i].realPrice;

            confirmDishesListData += '<li>'+pName+'<p class="quantity">'+pCount+'份</p><p class="price">单价：¥'+pRealPrice+'</p></li>';
        }
        $("#confirmOrderMenu-ul").append(confirmDishesListData);
        $("#numTotal").text(_getConfirmOrderInfoData.totalCopies);

        _getConPointData = _getConfirmOrderInfoData.default_counterpoint; //获取到接口的默认站点
        _getConUserData = _getConfirmOrderInfoData.user; //获取到接口的用户信息
        _getConAddressData = _getConfirmOrderInfoData.default_sendAddress; //获取到接口的详细地址
        //填充用户信息
        var userName = _getConUserData.nickName;
        var userTel = _getConUserData.phoneNumber
        var siteName = _getConPointData.name;
        var addressName = _getConAddressData.address;

        $("#contact1").append(userName);
        $("#tel1").append(userTel);
        $("#contact2").append(userName);
        $("#tel2").append(userTel);
        $("#confirmSite").append(siteName);
        $("#confirmSite2").append(siteName);
        $("#confirmDelivery").append(addressName);

        //可用优惠券数量
        _getCanUseCouponsCountData = _getConfirmOrderInfoData.canUseCouponsCount;
        //获取所选取的优惠券的金额
        var couponID = sessionStorage.getItem("couponID");
        var dispatchFee = _getConfirmOrderInfoData.dispatchFee;
        var moneyTotal = null;
        if(couponID==null || couponID=="" || typeof(couponID)=="undefined"){
            $("#canUseCouponsCount").text(_getCanUseCouponsCountData+' 张可用');
            //总价
            moneyTotal = _getConfirmOrderInfoData.totalPrice + dispatchFee;
        }else{
            var _couponData = null;
            $.ajax({
                type:'get',
                url:'data/getMyCoupons.json',
                dataType:'json',
                async:false,
                success:function(couponResult){
                    _couponData = couponResult.resultData.coupons;
                }
            });
            var couponPar = null , couponName = null;
            for(var i = 0; i<_couponData.length; i++){
                if(couponID == _couponData[i].couponsId){
                    couponPar = _couponData[i].par;
                    couponName = _couponData[i].couponsName;
                }
            }
            $("#couponLink").text(couponPar+'元');
            $("#canUseCouponsCount").text(couponName);

            moneyTotal = _getConfirmOrderInfoData.totalPrice - couponPar + dispatchFee;
            isUseCoupons = 1;
        }

        $("#deliveryMoney span").text(dispatchFee);
        $("#priceTotal").text(moneyTotal);

    });
    //选择取餐方式
    var isDispatch = 0; //0为不使用
    $("#deliveryStyle li").click(function(){
        $("span.icon-siteListDiv").removeClass("icon-selected");
        $(this).find("span.icon-siteListDiv").addClass("icon-selected");
        if($(this).attr("id") == "selectTypeSite"){
            $("#typeSiteTake").css("display","block");
            $("#typeDelivery").css("display","none");
            $("#dispatchFee").css("display","none");
        }else{
            $("#typeSiteTake").css("display","none");
            $("#typeDelivery").css("display","block");
            $("#dispatchFee").css("display","block");
            isDispatch = 1; //1为使用
        }
    });

    $("#confirmOrderBtn").click(function(){
        var counterpointId = _getConPointData.id;//配送站点ID
        var couponID = "";
        if(isUseCoupons == 1){
            couponID = sessionStorage.getItem("couponID");
        }
        var orderType = "COMMON";//订单类型
        var userType = sessionStorage.userType;//用户类型
        var currentDate = new Date();
        var hour = currentDate.getHours();
        if(hour >= 11){
            userType == "BOOK";
        }else{
            if(userType == 0){
                userType == "COMMON";
            }else{
                userType == "TEAM";
            }
        }
        var dispatchFee = "";//配送费
        var floorId = ""; //楼栋id
        var counterPointFloorId = "";//站点关联楼栋id
        var disAddress = ""; //配送地址
        //是否使用配送服务
        if(isDispatch == 1){
            dispatchFee = _getConfirmOrderInfoData.dispatchFee;
            floorId = _getConAddressData.counterpointfloor.floor.id;
            counterPointFloorId = _getConAddressData.counterpointfloor.id;
            disAddress = _getConAddressData.address;
        }

        var linkName = _getConUserData.nickName; //联系人
        var linkTel = _getConUserData.phoneNumber; //联系电话

		var _toConfirmOrderInfoData = null;
        var toConfirmOrderInfoData = {
            'getDataIdent':'Y',
            'apiNumber':'703_toConfirmOrderInfo',
            'params':'{"userId":"'+userID+'","counterpointId":"'+counterpointId+'","isUseCoupons":"'+isUseCoupons+'","userCouponsId":"'+couponID+'","orderType":"'+orderType+'","dispatchFee":"'+dispatchFee+'","counterPointFloorId":"'+counterPointFloorId+'","floorId":"'+floorId+'","disAddress":"'+disAddress+'","linkName":"'+linkName+'","linkTel":"'+linkTel+'"}'
        }
        $.ajax({
            type:'get',
            url:'data/toConfirmOrderInfo.json',
            async:false,
            dataType: 'json',
            data:toConfirmOrderInfoData,
            success: function(toConfirmOrderInfoResult){
				_toConfirmOrderInfoData = toConfirmOrderInfoResult.resultData.ORDERID;
            }
        })
		window.location.href = "orderInfo.html?orderID="+_toConfirmOrderInfoData;

    });
}
