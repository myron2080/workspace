var userID=localStorage.userId;
    $("#btn_codeLink").click(function(){
        var phoneNumber = $("#txt_tel").val();console.log(1);
        if(!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(phoneNumber))
        {
            $('#my-alert-phone').modal('toggle');
        }

        var getCodeUrl = 'data/getAuthCode.json';
        var phoneData = {
            'getDataIdent':'Y',
            'apiNumber':'703_getAuthCode',
            'params':'{"phone":"'+phoneNumber+'"}'
        }
        $.frontEngineAjax.executeAjax(getCodeUrl,"get",phoneData,function(result){

        });
    });

    $("#submitLink").click(function(){
        var phoneNumber = $("#txt_tel").val();
        var authCode = $("#txt_code").val();
        if(!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(phoneNumber))
        {
            $('#my-alert-phone').modal('toggle');
        }else if(authCode == null || authCode == '' || typeof(authCode) == "undefined")
        {
            $('#my-alert-code').modal('toggle');
        }
        var _updateUserPhone = null;
        var updateUserPhoneUrl = 'data/updateUserPhone.json';
        var updateUserPhoneData = {
            'getDataIdent':'Y',
            'apiNumber':'703_updateUserPhone',
            'params':'{"userId":"'+userID+'","phone":"'+phoneNumber+'","authCode":"'+authCode+'"}'
        }
        $.frontEngineAjax.executeAjax(updateUserPhoneUrl,"get",updateUserPhoneData,function(result){
			history.go(-1);
        });
    });