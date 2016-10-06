//seo统计从搜索引擎直接访问简历、投递统计
(function(){
    var referrer = document.referrer;
    var locationUrl = window.location.href;
    var numDomainMap = {
        121114583 : 'www.baidu.com',
        121122244 : 'www.haosou.com|www.so.com',
        121114589 : 'cn.bing.com|www.bing.com',
        121114584 : 'www.google.com',
        121114587 : 'www.sogou.com',
        121114588 : 'www.soso.com',
        121114585 : 'www.yahoo.com|search.yahoo.com',
        121114586 : 'www.yodao.com|www.youdao.com',
        121126445 : 'none'
    };
    if(!(/site=/g.test(locationUrl))){
        var cooVal = get_mcookie('urlfrom'), numVal = numDomainMap[cooVal] || '', valReg = new RegExp(numVal.replace(/\./g, '\\.'), 'g');    
        if(referrer){
            if(!numVal || (numVal != '' && !valReg.test(referrer))){
                for(var key in numDomainMap){
                    var valAry = numDomainMap[key].split('|');
                    for(var i = 0; i < valAry.length; i++){
                        var doName = valAry[i];
                        var valReg2 = new RegExp(doName.replace(/\./g, '\\.'), 'g');                
                        if(valReg2.test(referrer)){
                            SEOFlow(key, doName);
                        }
                    }
                } 
            }
        }else{
            SEOFlow('121126445', 'none');
        }  
    }
})();

function get_mcookie(Name) {
    var search = Name + '=';
    var returnvalue = '';
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = document.cookie.indexOf(';', offset);
            if (end == -1)
                end = document.cookie.length;
            returnvalue = unescape(document.cookie.substring(offset, end));
        }
    }
    if (returnvalue.length < 2)
        returnvalue = '12001997';
    return returnvalue;
}
function SEOFlow(bid, cid) {
    (new Image()).src = 'http://cnt.zhaopin.com/Market/whole_counter.jsp?sid=' + bid + '&site=' + cid;    
}
