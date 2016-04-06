/**
 * ***************************************************************************
 * 前端页面js引擎
 * @创建日期 : 2015.12.29
 *      ***************************************************************************
 */
// TODO 格式还需进一步修改，采用strict方式。
(function($) {

	/**
	 * 判断登陆是否成功
	 */
	var loginIsSuccessOrError=function(){
		if(localStorage.userId==null || localStorage.userId=="" || typeof(localStorage.userId)=="undefined"){
			  
		  	var code=getUrlParameter("code");
		  	var jsonData = {
		        'getDataIdent':'Y',
		        'apiNumber':'703_getUserInfoByCode',
		        'params':'{"code":"'+code+'"}'
		    }
		  	$.ajax({
		        type: 'get',
		        url: 'data/getUserInfo.json',
		        dataType: 'json',
		        async: false,
		        data:jsonData,
		        success: function(result){
		        	if(result.resultData.STATE=="SUCCESS"){
		        		 localStorage.userId=result.resultData.data.id;
		            	//getUserInfoFun(localStorage.userId);
		        	}else{
		        		$('#your-modal-error').modal('toggle');
		        		setTimeout(function () {
                                history.go(-1);
                        }, '1000')
		        	}
		            
		        }
		    });
		    
		  }else{
		  		
		  }
	}
	
	/**
	 * 通用保持方法
	 */
	var common_doSave = function(url,changeUrl,type,id,data) {
		type = (type==null || type=="" || typeof(type)=="undefined")? "post" : type;
		var getdata = (id==null || id=="" || typeof(id)=="undefined")? data : $('#'+id).serialize();
		//alert(getdata);

		$.ajax({
			url:url,
			type:type,
			dataType: 'json',
			data: getdata,
			async:false,
			success: function(result) {
				$('#your-modal').modal('toggle');
				setTimeout(function(){
					window.location=changeUrl;
				},'1000')

			},
			error: function(e){
				//console.log(e);
			}
		});
		/*$.frontEngineAjax.executeAjax(
			url,
			type,
			getdata,
			function(data){
				console.log(data);
				alert(data);
			},
			function(){
				alert("error");
			}
		);*/
	};

	var getUrlParameter=function(name){
		var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");//正则表达式取得url中的参数
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]); return null;
	}

	//点击发布评论
    var publishComment = function(className,userID){
        $(className).click(function(){
        	//判断当前传入的类型ID
        	var params = '',type = '',typeID = '';
            var currentURL = window.location.href;
            if(currentURL.indexOf("orderInfo.html")>=0){
            	type = "order";
            	typeID = getUrlParameter("orderID");
            	params = '{"orderId":'+typeID+',"type":"'+type+'","userId":'+userID+'}';
            }else{
            	type = "dishes";
            	typeID = getUrlParameter("id");
            	params = '{"dishesId":'+typeID+',"type":"'+type+'","userId":'+userID+'}';
            }
            
            var saveDishesContentJsonData = {
                'getDataIdent':'Y',
                'apiNumber':'703_saveDishesContent',
                'params':params
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
    }


	// ****************************************************************************************************
	// $.frontEngine.methodName形式调用
	// ****************************************************************************************************
	$.extend({
		frontEngine: {
			common_doSave: function(url,changeUrl,type,id,data) {
				return common_doSave(url,changeUrl,type,id,data);
			},
			getUrlParameter: function(name) {
				return getUrlParameter(name);
			},
            publishComment: function(className,orderID,userID) {
                return publishComment(className,orderID,userID);
            },
            
            loginIsSuccessOrError: function() {
                return loginIsSuccessOrError();
            }
		}
	});


}) (jQuery);