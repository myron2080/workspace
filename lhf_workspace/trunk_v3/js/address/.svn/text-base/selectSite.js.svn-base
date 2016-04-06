var userID=localStorage.userId;
//
var sitePointListFun = function(){
    var sitePointDate = null;
    var url = "data/getCounterPointList.json";
    $.frontEngineAjax.executeAjax(url,"get","",function(result){
        sitePointDate = result.resultData.item;
        var sitePointHtml = '';
        for(var i = 0; i < sitePointDate.length; i++){
            var siteName = sitePointDate[i].name;
            var siteSimplePinyin = sitePointDate[i].simplePinyin;
            var sitePic = sitePointDate[i].imgpath1;
            var siteID = sitePointDate[i].id;

            sitePointHtml += '<div class="mainBlock" id="site_'+siteID+'">';
            sitePointHtml += '<ul>';
            sitePointHtml += '<li class="borGray">'+siteName+'<span class="icon-siteListDiv "></span></li>';/*icon-selected*/
            sitePointHtml += '<li><p>地址：'+siteSimplePinyin+'</p><div class="arrowAddress"><span class="am-icon-chevron-down"></span> </div> </li>';
            sitePointHtml += '<li><div class="sitePic"><img src="images/'+sitePic+'"></div></li>';
            sitePointHtml += '</ul>';
            sitePointHtml += '</div>';
        }
        $(".sitePointList").append(sitePointHtml);

        //点击箭头图片显示
        $(".arrowAddress").click(function(){
            $(this).parents("ul").find(".sitePic").toggle(300);
            if($(this).children("span").hasClass("am-icon-chevron-up")){
                $(this).children("span").removeClass("am-icon-chevron-up");
                $(this).children("span").addClass("am-icon-chevron-down");
            }else{
                $(this).children("span").removeClass("am-icon-chevron-down");
                $(this).children("span").addClass("am-icon-chevron-up");
            }
        });

        $(".mainBlock").click(function(){
            $("span.icon-siteListDiv").removeClass("icon-selected");
            $(this).find("span.icon-siteListDiv").addClass("icon-selected");
            var CPointById = $(this).attr("id");
            history.go(-1);

            //以下是选择了某个站点之后存值操作
            /*var urlPointById ='http://localhost:63342/lehefan3/api?getDataIdent=Y&apiNumber=703_updateUserCPointById & params={"userId":'+userID+',"CPointById":'+CPointById+'}';
            $.frontEngineAjax.executeAjax(urlPointById,"get","",function(resultPointById){
                //history.go(-1);
            });*/
        });
    });
}

/*
 *  接口条用方式：  /api?getDataIdent=Y&apiNumber=703_updateUserCPointById & params={"userId":"xxx","CPointById":"xxx"}
 * */
