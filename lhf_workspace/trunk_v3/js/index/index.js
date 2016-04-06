var _proList = null;

var _basePath = location.origin + '/lunch/api';

var userID=localStorage.userId;

//获取banner上的温馨提示
var tipsFun = function(){
    var _tips = null;
    var url="data/getBannerTip.json";
    var jsonData = {
        'getDataIdent':'Y',
        'apiNumber':'703_getBannerTip',
        'params':'{}'
    }
    $.frontEngineAjax.executeAjax(url,"get",jsonData,function(result){
        _tips = result.resultData.INDEX_TIPS;

        $(".tips-a").append(_tips);
    },function(){});
}

//初始化轮播图片
var foucsBanner = function(){
    var _flexBanner = null;
    var url="data/indexbanner.json";
    var jsonData = {
        'getDataIdent':'Y',
        'apiNumber':'703_getBannerList',
        'params':'{}'
    }
    $.frontEngineAjax.executeAjax(url,"get",jsonData,function(result){
        _flexBanner = result.resultData.bannerList;

        var xxxSlideHtml = '';
        for(var i = 0, j = _flexBanner.length; i < j; i++){
            xxxSlideHtml = xxxSlideHtml+'<li><img src="images/'+_flexBanner[i].picPath+'" alt="" /></li>';
        }
        $("#containerBanner").append(xxxSlideHtml);

        $(".banner").flexslider({
            slideshowSpeed: 2000    //滚动速度
        });
    },function(){});
}

//产品列表
var proListShow = function(){

    var url="data/getDishesList.json";

    var jsonData = {
        'getDataIdent':'Y',
        'apiNumber':'703_getDishesList',
        'params':'{"page":1,"pageSize":10}'
    }

    $.frontEngineAjax.executeAjax(url,"get",jsonData,function(result){
        _proList=result.resultData.item;

        var xxxProListHtml = '';
        for(var i= 0,j=_proList.length;i<j;i++){

            var effectChartUrl=_proList[i].effectChartUrl.replace("_size","_150X100");

            xxxProListHtml+='<li id="proinfo_'+_proList[i].id+'">';
            xxxProListHtml+='<div class="am-gallery-item">';
            xxxProListHtml+='<div class="proName"><a href="detail.html?id='+_proList[i].id+'">'+_proList[i].name+'</a><span>已售'+_proList[i].soldCount+'份</span></div>';
            xxxProListHtml+='<div class="proImg"><a href="detail.html?id='+_proList[i].id+'"><img src="images/'+effectChartUrl+'"> </a></div>';
            xxxProListHtml+='<div class="proInfo">';
            xxxProListHtml+='<div class="picPrice">￥'+_proList[i].realPrice+'<del>￥'+_proList[i].suggestPrice+'</del></div>';
            xxxProListHtml+='<div class="numDiv">';
            xxxProListHtml+='<div class="minus circle" onclick="minusFun(this)"><span class="am-icon-minus am-icon-md"></span></div>';
            xxxProListHtml+='<div class="num" id="num_'+_proList[i].id+'"  p_id="'+_proList[i].id+'">0</div>';
            xxxProListHtml+='<div class="plus circle" onclick="plusFun(this);addCarListShow(this);" limitSaleNum='+_proList[i].limitSaleNum+'  p_id='+_proList[i].id+' p_realPrice='+_proList[i].realPrice+' p_name='+_proList[i].name+' ><span class="am-icon-plus am-icon-md"></span></div>';
            xxxProListHtml+='</div>';
            xxxProListHtml+='</div>';
            xxxProListHtml+='</div>';
            xxxProListHtml+='</li>';
        }
        $("#proList-ul").append(xxxProListHtml);
    },function(){});
}

var getShoppingCarListHtml=function(p_id,p_realPrice,p_name,p_limitSaleNum,p_Count){
    var orderOkListHtml = '';
    orderOkListHtml += '<li id="'+p_id+'" realPrice="'+p_realPrice+'">';
    orderOkListHtml += '<p>'+p_name+'</p>';
    orderOkListHtml += '<p class="money">￥'+p_realPrice+'</p>';
    orderOkListHtml += '<div class="numDiv">';
    orderOkListHtml += '<div class="minus circle" onclick="minusFun(this)"><span class="am-icon-minus am-icon-md"></span></div>';
    orderOkListHtml += '<div class="num" p_id="'+p_id+'">'+p_Count+'</div>';
    orderOkListHtml += '<div class="plus circle" onclick="plusFun(this);carShoppingContent();" limitSaleNum="'+p_limitSaleNum+'"><span class="am-icon-plus am-icon-md"></span></div>';
    orderOkListHtml += '</div>';
    orderOkListHtml += '</li>';

    return orderOkListHtml;
}

var addCarListShow = function(plusDiv){
    //加入购物车的
    var urlLength= $("#orderOkList-ul li");
    var p_id = $(plusDiv).attr("p_id");
    var p_realPrice = $(plusDiv).attr("p_realPrice");
    var p_name = $(plusDiv).attr("p_name");
    var p_limitSaleNum = $(plusDiv).attr("limitSaleNum");
    var orderOkListHtml = '';
    if(p_limitSaleNum==0) return;
    if(urlLength.length==0){
        orderOkListHtml= getShoppingCarListHtml(p_id,p_realPrice,p_name,p_limitSaleNum,1);
        $("#orderOkList-ul").append(orderOkListHtml);

    }else{
        var idCount="0";
        for(var i = 0; i < urlLength.length; i ++){
            if(p_id==urlLength[i].id){
                idCount=p_id;
            }
        }

        if(idCount=="0"){
            orderOkListHtml= getShoppingCarListHtml(p_id,p_realPrice,p_name,p_limitSaleNum,1);
            $("#orderOkList-ul").append(orderOkListHtml);
        }else{
            var num_divHtml = $("#"+idCount+" .num");
            //console.log(num_divHtml);
            for(var i = 0; i < num_divHtml.length; i++){
                var i_num_car = parseInt(num_divHtml[i].innerHTML);
                var i_num = $(plusDiv).prev()[0].innerHTML;
                if(i_num != i_num_car){
                    i_num_car ++;
                }
                num_divHtml[i].innerHTML = i_num_car;
            }
        }
    }
    carShoppingContent();
}


//加号点击之后  +1
var plusFun = function(plusDiv){
    var i_num = $(plusDiv).prev()[0].innerHTML;
    var limitNum = parseInt($(plusDiv).attr("limitSaleNum")); //parseInt()将变量改为int类型
    if(i_num<limitNum){
        i_num++;
    }
    $(plusDiv).prev()[0].innerHTML = i_num;

    var $carListLi = $(plusDiv).prev();
    var carListLi_id = $carListLi.attr("p_id");
    $("#num_"+carListLi_id).text($(plusDiv).prev()[0].innerHTML);
}

//减号点击之后  -1
var minusFun = function(minusDiv){
    var i_num = $(minusDiv).next()[0].innerHTML;
    var limitNum = parseInt($(minusDiv).next(1).attr("limitSaleNum")); //parseInt()将变量改为int类型
    if(i_num > 0){
        i_num --;
    }
    $(minusDiv).next()[0].innerHTML = i_num;

    //同步
    var $carListLi = $(minusDiv).next();
    var carListLi_id = $carListLi.attr("p_id");

    $("#num_"+carListLi_id).text($(minusDiv).next()[0].innerHTML);
    //如果该数字为0 的话，移除li
    if(i_num == "0"){
        $("#"+carListLi_id).remove();
    }else{
        $('#'+carListLi_id+' div[p_id="'+carListLi_id+'"]')[0].innerHTML=$("#num_"+carListLi_id).text();
    }
    carShoppingContent();
}

var clearAllCar = function(){
    $("#orderOkList-ul").empty();
    $(".orderSelectOkDiv").css("display","none");
    carShoppingContent();
}

//购物车内总数量和总价
var carShoppingContent = function(){
    var $numArr = $("#orderOkList-ul .num");
    var $p_realPriceDiv = $("#orderOkList-ul li");
    var numTotal = 0;
    var sumMoney = 0;
    var saveArr = [];
    if($numArr.length > 0){
        for(var i = 0; i < $numArr.length; i ++){
            var numSingle = parseInt($numArr[i].innerHTML); //单个产品的数量
            numTotal += numSingle; //数组求和

            var numPrice = $($p_realPriceDiv[i]).attr("realprice"); //单个产品的价钱
            sumMoney += numSingle * numPrice; //总价求和

            var p_id = $($p_realPriceDiv[i]).attr("id"); //单个产品的ID
            saveArr.push({"dishesId":p_id,"dishesCount":numSingle});
        }
        //console.log(saveArr);
    }
    $("#end").text(numTotal);
    $("#sumMoney span").text("￥"+sumMoney);


    var saveShoppingCartjsonData = {
        'getDataIdent':'Y',
        'apiNumber':'703_saveShoppingCart',
        'params':'{"cartStr":'+JSON.stringify(saveArr)+',"userId":'+userID+'}'
    }

    $.ajax({
        type: 'get',
        url: 'data/saveShoppingCart.json',
        dataType: 'json',
        async: false,
        data:saveShoppingCartjsonData,
        success: function(result){
           
        }
    });

}

//初始化
var initializationFun = function(){
    //获取用户类型
    var userType = sessionStorage.userType;

   
    if(userType == 0){
        $("title")[0].innerHTML = "个人用户";
    }else{
        $("title")[0].innerHTML = "团体用户";
    }

    //获取购物车内
    var shoppingCartListData = null;
    var url = "data/getShoppingCartList.json";
    var shoppingJsonData = {
        'getDataIdent':'Y',
        'apiNumber':'703_getShoppingCartList',
        'params':'{"userId":"'+userID+'"}'
    }

    $.frontEngineAjax.executeAjax(url,"get",shoppingJsonData,function(result){
        shoppingCartListData=result.resultData.cartList;

        var orderOkListHtml = '';
        for(var i = 0; i < shoppingCartListData.length; i++){
            var car_pID = shoppingCartListData[i].dishesId;
            var car_pCount = shoppingCartListData[i].dishesCount;
            var car_pName = shoppingCartListData[i].dishesName;
            var car_pRealPrice = shoppingCartListData[i].dishesPrice;
            var car_pLimitSaleNum = shoppingCartListData[i].limitSaleNum;
            $("#num_"+car_pID).text(car_pCount);  //给菜单列表初始化

            //给购物车清单列表初始化
            orderOkListHtml += getShoppingCarListHtml(car_pID,car_pRealPrice,car_pName,car_pLimitSaleNum,car_pCount);
        }
        $("#orderOkList-ul").append(orderOkListHtml);
        carShoppingContent();
    },function(){});

    
    
}


var initUserInfo = function(){
	
	if(sessionStorage.userType==null || sessionStorage.userType=="" || typeof(sessionStorage.userType)=="undefined")
    {
		 sessionStorage.userType=0;
    }
    else
    {
       
    }
	
    /*var params =$.frontEngine.getUrlParameter("params");//获取url中id(param);
    params=JSON.parse(params);
*/
    //var url='http://localhost:8282/web/api?getDataIdent=Y&apiNumber=703_getUserInfoByCode&params={"code":"'+params.code+'"}';
   // var url="data/getUserInfo.json";
   /* var getUserInfoByCodeJsonData = {
        'getDataIdent':'Y',
        'apiNumber':'703_getUserInfoByCode',
        'params':'{"code":"'+params.code+'"}'
    }
    $.ajax({
        type: 'get',
        url: url,
        dataType: 'json',
        async: false,
        success: function(result){
            if(result.resultType!=1) return;
            if(result.resultData==null || result.resultData=="" || typeof(result.resultData)=="undefined") return;

            if(typeof(Storage)!=="undefined")
            {
                if(typeof(sessionStorage.userType)!=="undefined")
                {
                }
                else
                {
                    sessionStorage.userType=0;
                }

            }
            else
            {

            }

        }
    });
    */

}

var wxCoordinatesFun = function(_getwxjsConfigData){
	var latitude=null;
    var longitude=null;
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: _getwxjsConfigData.appid, // 必填，公众号的唯一标识
        timestamp: _getwxjsConfigData.timestamp, // 必填，生成签名的时间戳
        nonceStr: _getwxjsConfigData.nonceStr, // 必填，生成签名的随机串
        signature: _getwxjsConfigData.signature,// 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'startRecord',
            'stopRecord',
            'onVoiceRecordEnd',
            'playVoice',
            'pauseVoice',
            'stopVoice',
            'onVoicePlayEnd',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'translateVoice',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'closeWindow',
            'scanQRCode',
            'chooseWXPay',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard',] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });

    wx.ready(function(){
        wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
                latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            }
        });

    });

    wx.error(function(res){
        console.log(res);
    });
    
    var surlSitePointNearBy = 'data/getNearbyPoint.json';
    var sitePointNearByData = {
    	'getDataIdent':'Y',
        'apiNumber':'703_getNearbyPoint',
        'params':'{"userId":"'+userID+'","longitude":"'+longitude+'","latitude":"'+latitude+'"}'
    };
    $.ajax({
    	type:"get",
    	url:surlSitePointNearBy,
    	async:false,
    	dataType: 'json',
    	data:sitePointNearByData,
    	success: function(sitePointResult){
    		$(".locationAddress span").text(sitePointResult.resultData.name);
    	}
    });
}


//获取微信签名信息
var getwxjsConfigFun = function(){
	var _getwxjsConfigData = null;
    var urlGetwxjsConfig = "data/getwxjsConfig.json";
    var userInfoJsonData = {
        'getDataIdent':'Y',
        'apiNumber':'703_getwxjsConfig',
        'params':'{"userId":"'+userID+'"}'
    }
    $.ajax({
    	type:"get",
    	url:urlGetwxjsConfig,
    	async:false,
    	dataType: 'json',
    	data:userInfoJsonData,
    	success: function(getwxjsConfigDataResult){
    		_getwxjsConfigData = getwxjsConfigDataResult.resultData.wxjsConfig;
    	}
    });
    
    wxCoordinatesFun(_getwxjsConfigData);
}
