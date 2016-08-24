$(function() {
	
	var shareData = {
		title: '把握机会，品味传奇，尽在马爹利蓝带极致。',
		desc: '非凡尊享，就在樟宜机场。点击即可获赠独家好礼。',
		link: 'http://martell.pernod-ricard-china.com/gbe/agegate.html' + window.location.search,
		imgUrl: 'http://martell.pernod-ricard-china.com/gbe/assets/share.jpg'
	}
	
	$.ajax({
		url: 'http://martell.pernod-ricard-china.com/martellwechat/get_signature.php?signurl=' + encodeURIComponent(window.location.href),
		type: 'GET',
		success: function(data) {
			var jdata = $.parseJSON(data);
			if (jdata.appId) {
				var conObj = {
					// debug: true,
					appId : jdata.appId,
					timestamp : jdata.timestamp,
					nonceStr : jdata.nonceStr,
					signature : jdata.signature,
					jsApiList : ['onMenuShareTimeline','onMenuShareAppMessage']
				}
				wx.config(conObj);
			}
		}
	});
	
	wx.ready(function() {
		oMS(shareData);
	});
	
	function oMS(obj) {
		wx.onMenuShareTimeline({
			title: obj.desc,
			link: obj.link,
			imgUrl: obj.imgUrl,
			success: function() {}
		});
		wx.onMenuShareAppMessage({
			title: obj.title,
			desc: obj.desc,
			link: obj.link,
			imgUrl: obj.imgUrl,
			success: function() {}
		});
	}
	
});