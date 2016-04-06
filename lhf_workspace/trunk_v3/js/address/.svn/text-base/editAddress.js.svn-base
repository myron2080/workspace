var userID=localStorage.userId;
var EditAddress = function() {
	var _pageData = null;
	var _basePath = location.origin + '/lunch/api';
	var address_id = '';
	var _global = {};
	var _pointListNavData = null;
	var $pointListSelected = $('#pointListNav'); /*站点选择菜单*/
	var $pointListInfoSelected = $('#pointListInfo'); /*站点选择子菜单*/
	
	// ****************************************************************************************************
	// 初始化系列方法
	// ****************************************************************************************************

	// 获取ID
	var initIds = function() {
		address_id = $.frontEngine.getUrlParameter("addressId"); //获取url中id(param);

	};

	// 初始化站点选择菜单和子菜单
	var initPointList = function() {

		//var url="http://dev:8098/lunch/api";
		var url = "data/getCounterPointFloorList.json";

		var jsonData = {
			'getDataIdent': 'Y',
			'apiNumber': '703_getCounterPointFloorList',
			'params': '{"page":1,"pageSize":10}'
		}
		$.ajax({
			url: url,
			type: "get",
			dataType: 'json',
			data: jsonData,
			async: false,
			success: function(result) {
				_pointListNavData = result.resultData.item;
			}
		});

		var pointListNavHtml = '<option value=""></option>';

		if (_pointListNavData == null || _pointListNavData == "" || typeof(_pointListNavData) == "undefined") {
			return;
		}
		if (_pointListNavData.length == 0) {
			return;
		}
		for (var i = 0, i_len = _pointListNavData.length; i < i_len; i++) {
			pointListNavHtml = pointListNavHtml + '<option value="' + _pointListNavData[i].id + '" floorslength="' + _pointListNavData[i].floors.length + '" >' + _pointListNavData[i].name + '</option>';

		}
		$pointListSelected.append(pointListNavHtml);

	}

	// 初始化点击事件
	var initClick = function() {

		$pointListSelected.unbind('change').on('change', function() {
			// console.log();
			$pointListInfoSelected.html("");
			var selectVal = $(this).val();
			var floorslength = $(this).find('option').eq(this.selectedIndex).attr("floorslength");
			var pointListInfoHtml = '<option value=""></option>';
			if (floorslength != 0) {
				pointListInfoHtml = '<option value=""></option>';
				for (var i = 0, i_len = _pointListNavData.length; i < i_len; i++) {
					if (_pointListNavData[i].id == selectVal) {
						for (var j = 0; j < floorslength; j++) {
							var pointListInfoData = _pointListNavData[i].floors;
							pointListInfoHtml = pointListInfoHtml + '<option value="' + pointListInfoData[j].id + '" >' + pointListInfoData[j].name + '</option>';
						}
					}
				}

			}
			
			$pointListInfoSelected.append(pointListInfoHtml);
			
		});

		/*$("#pointListInfo li").unbind('click').on('click', function() {
			$("#getZhandian").val(this.innerText);
			$("#getZhandian").attr("floorId", $(this).attr("id"));
			var $p_vid = $(this).parent().parent();
			$("#getZhandian").attr("counterPointId", $($p_vid).attr("id"));
			$("#getZhandian").focus();
		});*/

	}

	// 初始化修改页面时的信息
	var initEditAddressDetail = function() {
		//测试数据路径
		var url = 'data/getAddressDetail.json';
		//var url="http://dev:8098/lunch/api";
		/*var jsonData = {
		    'getDataIdent':'Y',
		    'apiNumber':'703_getAddressDetail',
		    'params':'{"addressId":"'+address_id+'"}'
		}
		*/
		if(address_id==null || address_id=="" || typeof(address_id)=="undefined"){
		    return;
		}
		var _addressDetailData = null;
		$.ajax({
			url: url,
			type: "get",
			dataType: 'json',
			//data: jsonData,
			async: false,
			success: function(result) {
				_addressDetailData = result.resultData;
			}
		});

		if (_addressDetailData.length == 0) {
			return;
		}
		var $pointList = $pointListSelected.find('option[value="'+_addressDetailData.counterPointId+'"]');
  		//var $m = $selected.find('option[value="m"]');  
 		$pointList.attr('selected', !$pointList.get(0).selected);
 		if (!$.AMUI.support.mutationobserver) {
	      $pointListSelected.trigger('changed.selected.amui');
	    }
 		$pointListSelected.change();
 		
 		
 		
 		var $pointListInfo = $pointListInfoSelected.find('option[value="'+_addressDetailData.counterpointfloorId+'"]');
 		$pointListInfo.attr('selected', !$pointListInfo.get(0).selected);
 		if (!$.AMUI.support.mutationobserver) {
	      $pointListInfoSelected.trigger('changed.selected.amui');
	    }
 		
		//$("#getZhandian").val(_addressDetailData.floorName);
		//$("#getZhandian").attr("counterPointId", _addressDetailData.counterPointId);
		//$("#getZhandian").attr("floorId", _addressDetailData.counterpointfloorId);
		$("#inputFloor").val(_addressDetailData.layer);
		$("#inputBuilding").val(_addressDetailData.number);
		$("#inputCompanyName").val(_addressDetailData.companyName);
		/*  var $pointListNavUl = $('#pointListNavUl'); /!*站点选择菜单*!/
		  var $pointListInfoDiv = $('#pointListInfo');/!*站点选择子菜单*!/
		  $('#pointListNavUl li:first').addClass("am-active");
		  $('#pointListInfo div:first').addClass("am-active");*/
	}

	// ****************************************************************************************************
	// 暴露在外的方法
	// ****************************************************************************************************
	return {
		init: function(params) {
			initIds();
			initPointList();
			initClick();
			initEditAddressDetail();
		}
	};
}();