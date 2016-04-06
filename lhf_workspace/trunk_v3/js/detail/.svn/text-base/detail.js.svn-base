var userID=localStorage.userId;
var pro_id = $.frontEngine.getUrlParameter("id");//获取url中id(param);
//详情页数据填充，根据id
var proDetailShow = function(){
    var _proDetail = null;
    var url = 'data/getDishesDetail.json?id='+pro_id;
    $.frontEngineAjax.executeAjax(url,"get","",function(result){
        _proDetail=result.resultData; //注意，这里不是数组啦
        $("#proinfo").append(_proDetail.data.description); //放入DIV
        $(".picDiv").append('<img src="images/'+_proDetail.imageList[0].path+'" />');
        $(".proname").append(_proDetail.data.name+'<span>已售'+_proDetail.data.soldCount+'份</span>');
        $(".prodetailname b").text("￥"+_proDetail.data.realPrice);
        $(".prodetailname del").text("￥"+_proDetail.data.suggestPrice);

        $(".prodetailname .plus").attr({
            "limitSaleNum":_proDetail.data.limitSaleNum,
            "p_id":_proDetail.data.id,
            "p_realPrice":_proDetail.data.realPrice,
            "p_name":_proDetail.data.name
        });
        $(".prodetailname .num").attr({
            "id":"num_"+_proDetail.data.id,
            "p_id":_proDetail.data.id
        });
    });
}

//评论循环
var getDishesContent = function(){
    var _dishesContent = null;
    var url = 'data/getDishesContent.json';
    $.frontEngineAjax.executeAjax(url,"get","",function(result){
        _dishesContent = result.resultData.item;

        $("#numDishesContent").text(_dishesContent.length);
        var dishesContentHtml = '';
        for(var i = 0; i < _dishesContent.length; i++){
            var createTime = _dishesContent[i].createTime;//评论时间
            var nickname = _dishesContent[i].creatorNickName;//评论人昵称
            var commentContent = _dishesContent[i].comtent;//评论内容
            var replyTime = _dishesContent[i].reaplyTime;//回复时间
            var replyDesc = _dishesContent[i].replyDesc;//回复内容

            dishesContentHtml += '<li class="am-comment">';
            dishesContentHtml += '<img class="am-comment-avatar" alt="" src="'+_dishesContent[i].creatorAvatar+'">';
            dishesContentHtml += '<div class="am-comment-main">';
            dishesContentHtml += '<header class="am-comment-hd"><div class="am-comment-meta"><a class="am-comment-author" href="link-to-user">'+nickname+'</a> </div></header>';
            dishesContentHtml += '<div class="am-comment-bd"><p>'+commentContent+'</p></div>';
            dishesContentHtml += '<div class="time">评论于<time>'+createTime+'</time></div>';
            if(replyDesc==null || replyDesc=="" || typeof(replyDesc)=="undefined") { //判断有无此数据

            }else{
                dishesContentHtml += '<div class="replybody">';
                dishesContentHtml += '<img class="am-comment-avatar" alt="" src="images/tx_lehefan.jpg">';
                dishesContentHtml += '<div class="am-comment-main">';
                dishesContentHtml += '<header class="am-comment-hd"><div class="am-comment-meta"><a class="am-comment-author" href="link-to-user">乐盒饭</a> 回复 <a class="am-comment-author" href="link-to-user">'+nickname+'</a> </div></header>';
                dishesContentHtml += '<div class="am-comment-bd"><p>'+replyDesc+'</p></div>';
                dishesContentHtml += '<div class="time">评论于<time>'+replyTime+'</time></div>';
                dishesContentHtml += '</div>';
                dishesContentHtml += '</div>';
            }
            dishesContentHtml += '</div>';
            dishesContentHtml += '</li>';
        }
        $("#commentContent-ul").append(dishesContentHtml);

        /*publishComment(".replyLink");*/
        $.frontEngine.publishComment (".replyLink",userID);
    });
}

//点击发布评论

/*var publishComment = function(className){
    $(className).click(function(){
        var saveDishesContentJsonData = {
            'getDataIdent':'Y',
            'apiNumber':'703_saveDishesContent',
            'params':'{"dishesId":'+pro_id+',"userId":'+userID+'}'
        };
        $.ajax({
            type: 'get',
            url: '',
            dataType: 'json',
            async: false,
            data:saveDishesContentJsonData,
            success: function(result){

            }
        });
    });
}*/

//是否喜欢
var saveDishesLikeFun = function(){
    $(".saveDishesLikeHeart").click(function(){
    	console.log(11);
        if($(".saveDishesLikeHeart i").hasClass("am-icon-heart-o")){
            var saveDishesLikeJsonData = {
                'getDataIdent':'Y',
                'apiNumber':'703_saveDishesLike',
                'params':'{"dishesId":"'+pro_id+'"}'
            };
            $.ajax({
                type: 'get',
                url: 'data/saveDishesLike.json',
                dataType: 'json',
                async: false,
                data:saveDishesLikeJsonData,
                success: function(result){

                }
            });
            $(".saveDishesLikeHeart i").removeClass("am-icon-heart-o");
            $(".saveDishesLikeHeart i").addClass("am-icon-heart now");
            var oldNum = parseInt($("#numLinkUser").text());
            oldNum ++;
            $("#numLinkUser").text(oldNum);
        }else{
            return;
        }
    });
}