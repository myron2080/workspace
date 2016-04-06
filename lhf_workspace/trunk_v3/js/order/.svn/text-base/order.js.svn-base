var userID = localStorage.userId;
//订单列表循环
var orderListFun = function(){
    var _orderListData = null, _orderDishesData = null;
    var urlOrderList = "data/getMyOrderList.json";
    $.frontEngineAjax.executeAjax(urlOrderList,"get","",function(result){
        _orderListData = result.resultData.orderList;

        var orderListHtml = '';
        for(var i = 0; i < _orderListData.length; i++){
            var orderID = _orderListData[i].Id;
            var orderNumber = _orderListData[i].orderNumber;
            var orderStatusName = _orderListData[i].orderStatusName;
            var orderStatusNameEng = _orderListData[i].orderStatus;
            var orderCreateTime = _orderListData[i].orderCreateTime;
            var isDispatch = _orderListData[i].isDispatch;
            //获取被下单的菜品列表
            _orderDishesData = _orderListData[i].orderDetailList;

            //被下单的菜品列表 循环
            var orderDishesHtml = '', orderDishesPriceTotal = 0;
            for(var j = 0; j < _orderDishesData.length; j++){
                var orderDishesName = _orderDishesData[j].dishesName;
                var orderDishesCount = _orderDishesData[j].copiesCount;
                var orderDishesPrice = _orderDishesData[j].realPrice;

                orderDishesHtml += '<dl>';
                orderDishesHtml += '<dt>'+orderDishesName+'</dt>';
                orderDishesHtml += '<dd class="quantity">'+orderDishesCount+'份</dd>';
                orderDishesHtml += '<dd>单价：¥'+orderDishesPrice+'</dd>';
                orderDishesHtml += '</dl>';

                orderDishesPriceTotal += orderDishesCount * orderDishesPrice;
            }
            //判断当前配送方式，0是自取，1是配送上门
            var isDispatchType = '';
            if(isDispatch == 0){
                isDispatchType = '站点自取';
            }else{
                isDispatchType = '配送上门';
            }

            //判断当前订单类型
            var btnContent = '';
            if(orderStatusNameEng == "ALREADYSUBMIT"){//已提交
                btnContent += '<a class="cancelOrder cancelOrderLink" href="javascript:;">取消订单</a><a class="orderPay orderPayLink" href="javascript:;">立即支付</a>';
            }else if(orderStatusNameEng == "ALREADYPAYMENT"){//已支付
                btnContent += '<a class="orderPay receiptLink" href="javascript:;">确认收货</a>';
            }else if(orderStatusNameEng == "ALREADYFINISH"){//已完成
                btnContent += '<a class="cancelOrder evaluationLink" href="orderInfo.html?orderID='+orderID+'">去评价</a><a class="orderPay againLink" href="javascript:;">再来一单</a>';
            }else{
                btnContent += '';
            }

            orderListHtml += '<div class="orderList" orderID="'+orderID+'">';
            orderListHtml += '<div class="OrderNo">';
            orderListHtml += '<div class="OrderNoright"><a href="#">'+orderStatusName+'<span class="am-icon-chevron-right"></span></a></div>';
            orderListHtml += '<h4>订单号：'+orderNumber+'</h4>'+orderCreateTime;
            orderListHtml += '</div>';
            orderListHtml += '<div class="orderListinfo">';
            orderListHtml += '<div id="orderDishesDiv">'+orderDishesHtml+'</div>';
            orderListHtml += '<dl>';
            orderListHtml += '<dt>配送方式：'+isDispatchType+'</dt>';
            orderListHtml += '<dd class="orderMoney">应付金额： <span>'+orderDishesPriceTotal+'</span> 元</dd>';
            orderListHtml += '</dl>';
            orderListHtml += '</div>';
            orderListHtml += '<div class="orderListBtn">'+btnContent+'</div>';
            orderListHtml += '</div>';
        }
        $(".orderListDiv").append(orderListHtml);
        
        //点击订单号跳转页面
        $(".OrderNo").click(function(){
        	window.location.href = "orderInfo.html?orderID="+orderID;
        });

        //取消订单
        $(".cancelOrderLink").click(function(){
            var orderID = $(this).parents("div.orderList").attr("orderID");
            var status = "ALREADYCANCEL"; //已取消
            updateOrderStatusFun(orderID,status);
        });

        //确认收货
        $(".receiptLink").click(function(){
            var orderID = $(this).parents("div.orderList").attr("orderID");
            var status = "ALREADYFINISH"; //已完成
            updateOrderStatusFun(orderID,status);
            location.reload();
        });
        //再来一单
		$(".againLink").click(function(){
	    	getOneAgainFun();
	    	window.location.href = "confirmOrder.html";
		});
		
		//立即支付
		$(".orderPayLink").click(function(){
			var orderID = $(this).parents("div.orderList").attr("orderID");
			getChargeByOrderIdFun(orderID);
		});
					
					
    });
}


//订单详情列表
var getOrderIDFun = function(){
	var orderID = $.frontEngine.getUrlParameter("orderID");
    var _thisOrderInfo = null, _orderDishesData = null, _userInfo = null, _counterpoint = null;
    var urlOrderList = 'data/getOrderDetail.json?Id='+orderID;
    $.frontEngineAjax.executeAjax(urlOrderList,"get","",function(result){

        _thisOrderInfo = result.resultData;
        _orderDishesData = _thisOrderInfo.orderDetailList;
        _userInfo = _thisOrderInfo.user;
        _counterpoint = _thisOrderInfo.counterpoint;

        //获取到order信息
        var orderNumber = _thisOrderInfo.order.orderNmber;
        var orderStatusName = _thisOrderInfo.order.orderStatusName;
        var orderStatusNameEng = _thisOrderInfo.order.orderStatus;
        var orderCreateTime = _thisOrderInfo.order.createTime;
        var isDispatch = _thisOrderInfo.order.isDispatch;

        var orderListHtml = '';
        //被下单的菜品列表 循环
        var orderDishesHtml = '', orderDishesPriceTotal = 0;
        for(var j = 0; j < _orderDishesData.length; j++){
            var orderDishesName = _orderDishesData[j].dishesName;
            var orderDishesCount = _orderDishesData[j].copiesCount;
            var orderDishesPrice = _orderDishesData[j].realPrice;

            orderDishesHtml += '<dl>';
            orderDishesHtml += '<dt>'+orderDishesName+'</dt>';
            orderDishesHtml += '<dd class="quantity">'+orderDishesCount+'份</dd>';
            orderDishesHtml += '<dd>单价：¥'+orderDishesPrice+'</dd>';
            orderDishesHtml += '</dl>';

            orderDishesPriceTotal += orderDishesCount * orderDishesPrice;
        }

        //判断当前配送方式，0是自取，1是配送上门
        var isDispatchType = '';
        if(isDispatch == 0){
            isDispatchType = '站点自取';
        }else{
            isDispatchType = '配送上门';
        }

        orderListHtml += '<div class="OrderNo">';
        orderListHtml += '<div class="OrderNoright"><a href="#">'+orderStatusName+'<span class="am-icon-chevron-right"></span></a></div>';
        orderListHtml += '<h4>订单号：'+orderNumber+'</h4>'+orderCreateTime;
        orderListHtml += '</div>';
        orderListHtml += '<div class="orderListinfo">';
        orderListHtml += '<div id="orderDishesDiv">'+orderDishesHtml+'</div>';
        orderListHtml += '<dl>';
        orderListHtml += '<dt>配送方式：'+isDispatchType+'</dt>';
        orderListHtml += '<dd class="orderMoney">应付金额： <span>'+orderDishesPriceTotal+'</span> 元</dd>';
        orderListHtml += '</dl>';
        orderListHtml += '</div>';

        $(".orderList").append(orderListHtml);

        //获取到user信息
        $(".contact").text('联系人　：'+_userInfo.nickName);
        $(".tel").text('电　　话：'+_userInfo.phoneNumber);
        $(".counterpoint").text('配送站点：'+_counterpoint.counterpointName);

        //判断当前订单状态
        if(orderStatusNameEng == "ALREADYFINISH"){ //如果是已完成
            $(".btn").empty();
            $(".btn").append('<a class="btnLinkRed saveDishesContentLink" href="#">发布评论</a><a class="btnLinkRed againLink" href="javascript:;">再来一单</a>');
        }else if(orderStatusNameEng == "ALREADYSUBMIT"){//如果是已提交
            $(".btn").empty();
            $(".btn").append('<a class="btnLinkRed" id="payLink" href="javascript:;">马上支付</a>');
            $(".qucanTime").remove();
            $(".issueReview").remove();
        }else if(orderStatusNameEng == "ALREADYPAYMENT"){ //如果是已支付
            $(".qucanTime").remove();
            $(".issueReview").remove();
        }else{//如果是已退单/已取消
            $(".qucanTime").remove();
            $(".issueReview").remove();
            $(".btn").empty();
            $(".btn").append('<a class="btnLinkRed againLink" href="javascript:;">再来一单</a>');
        }

        //确认收货
        $(".receiptLink").click(function(){
            var status = "ALREADYFINISH"; //已完成
            updateOrderStatusFun(orderID,status);
        });
        //取消订单
        $(".cancelOrderLink").click(function(){
            var orderID = $(this).parents("div.orderList").attr("orderID");
            var status = "ALREADYCANCEL"; //已取消
            updateOrderStatusFun(orderID,status);
        });
        //点击发布评论
        $.frontEngine.publishComment (".saveDishesContentLink",userID);
        //再来一单
		$(".againLink").click(function(){
		    getOneAgainFun();
		    window.location.href = "confirmOrder.html";
		});
		//马上支付
		$("#payLink").click(function(){
			getChargeByOrderIdFun(orderID);
		});
    });

}



//确认收货、取消订单  等修改订单状态方法接口
var updateOrderStatusFun = function(orderID,status){
	var _getUpdateOrderStatusData = null;
    var updateOrderStatusJsonData = {
        'getDataIdent':'Y',
        'apiNumber':'703_updateOrderStatus',
        'params':'{"orderId":'+orderID+',"status":'+status+'}'
    };
    $.ajax({
        type: 'get',
        url: 'data/updateOrderStatus.json',
        dataType: 'json',
        async: false,
        data:updateOrderStatusJsonData,
        success: function(result){
			_getUpdateOrderStatusData = result.resultData.STATE
        }
    });
    if(_getUpdateOrderStatusData == "SUCCESS"){
    	alert("订单状态修改成功！");
    	location.reload();
    }else{
    	alert("更新失败！");
    }
}

//再来一单方法接口
var getOneAgainFun = function(){
	var urlAgain = 'data/getOneAgain.json';
	var _getOneAgainData = null;
	$.frontEngineAjax.executeAjax(urlAgain,"get","",function(result){
		_getOneAgainData = result.resultData.STATE;
	});
	if(_getOneAgainData == "SUCCESS"){
		location.href = "confirmOrder.html";
	}else{
		$("#my-alert-onceAgainError").modal("toggle");
	}
}

//马上支付 方法接口
var getChargeByOrderIdFun = function(orderID){
	var _getChargeData = null;
    var url = 'data/getChargeByOrderId.json';
    var updateOrderStatusJsonData = {
        'getDataIdent':'Y',
        'apiNumber':'703_getChargeByOrderId',
        'params':'{"orderId":'+orderID+'}'
    };
    $.ajax({
        type: 'get',
        url: '',
        dataType: 'json',
        async: false,
        data:updateOrderStatusJsonData,
        success: function(result){
            _getChargeData = result;
        }
    });

    pingpp.createPayment(_getChargeData, function(result, err) { //调用微信支付接口
        if (result=="success") {
            // payment succeed
            location.reload();
        } else {
            console.log(result+" "+err.msg+" "+err.extra);
            location.reload();
        }
    });
}

