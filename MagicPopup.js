/* $Id$ */
var ZCWA = {};
var ZCWA_WA = ZCWA_WA|| new Array();
var ZCWA_SF = ZCWA_SF || new Array();
var SFLen = SFLen || 0;
var WALen = WALen || 0;
var mLeave = false;
var scr = false;
var tmOnSite = false;
var ZCWA_timer = new Date().getTime();
var onLd = onLd || false;
var flag = flag || false;
var from = "";
var ajaxUrl = "";
var stringParams = "";
var ZH_URL = ZH_URL || "mh.zoho.com" //No I18N
var ZC_RedirUrl = ZC_RedirUrl || "maillist-manage.com"; //No I18N
var exp_date = new Date();
exp_date.setTime(exp_date.getTime()+(365*24*60*60*1000));
function loadPopupProps(zwafid,zwauid)
{
    if(zwafid != undefined && zwafid != '')
    {
        from ="SF"; //No I18N
        var d = document;
        if(d.querySelector('meta[name="zwafid"]') && d.querySelector("meta[name='zwafid']").getAttribute("content").indexOf(zwafid) < 0)
        {
           var b=d.querySelector("meta[name='zwafid']").getAttribute("content"); //No I18N
           d.querySelector("meta[name='zwafid']").setAttribute("content",b+","+zwafid); //No I18N
           /*b=$("meta[name='zwauid']").attr("content");
           $("meta[name='zwauid']").attr("content",b+","+zwauid);*/
        }
        else
        {
            var z=d.createElement('meta');
            z.setAttribute("content",zwafid);
            z.setAttribute("name","zwafid");
            d.getElementsByTagName("head")[0].appendChild(z);
            var y=d.createElement('meta');
            y.setAttribute("content",zwauid);
            y.setAttribute("name","zwauid");
            d.getElementsByTagName("head")[0].appendChild(y);
        }
    }
    oReq1(document.title);
}
 
function setZhAttributes(ele, attrs) 
{
    for(var key in attrs) 
      {
        ele.setAttribute(key, attrs[key]);
      }
}
 
function makeAjaxReq(ajaxUrl)
{
    var scriptElement = document.createElement("script");
    scriptElement.setAttribute("src", ajaxUrl); 
    scriptElement.setAttribute("id", "jsonp"); 
    var oldScriptElement= document.getElementById("jsonp"); 
    var head = document.getElementsByTagName("head")[0]; 
    if(oldScriptElement == null) {          
        head.appendChild(scriptElement); 
    } 
    else { 
        head.replaceChild(scriptElement, oldScriptElement);  
    }  
}
 
function oReq1(value)
{
    var ele = document.createElement("link");
    //setZhAttributes(ele,{"id":"animateCss","rel":"stylesheet","type":"text/css","href":"https://"+ZH_URL+"/hub/css/animate.css","media":"all"}); //No I18N
    //document.querySelector('head').appendChild(ele); //No I18N
    
    ele = document.createElement('script');
    setZhAttributes(ele,{"type":"text/javascript","href":"https://"+ZH_URL+"/hub/js/V2/zcOptinClean.js"}); //No I18N
    document.getElementsByTagName('head')[0].appendChild(ele);
 
    var actionData = "";
    var protocol = window.location.protocol;
    if(protocol.indexOf("http") < 0)
    {
        protocol = "http"+":";//No I18N
    }
    
    var zuid = document.querySelector("meta[name='zwauid']").getAttribute("content"); //No I18N
    actionData = "&zuid="+zuid; //No I18N
    if(from != "SF")
    {    	
    	if(getZCookie("zc_consent") != 1)
    	{
    		return;
    	}
        from = "WA"; //No I18N
        var webAutoIds = document.querySelector("meta[name='zwaid']").getAttribute("content"); //No I18N
        if(webAutoIds == undefined)
        {
            return false;
        }
        var zuids = document.querySelector("meta[name='zwauid']").getAttribute("content"); //No I18N
        var domainIds = document.querySelector("meta[name='zwaod']").getAttribute("content"); //No I18N
        var domains = document.querySelector("meta[name='zwad']").getAttribute("content"); //No I18N
        var ref= document.referrer;
        var parentUrl = window.location.href;
        var arrParams = parentUrl.split("?");
        var arrURLParams = new Array();
        var url = arrParams[0];
        var socialshare = null;
        var cmpContentId = null;
        if(protocol.indexOf("http") < 0)
        {
            protocol = "http"+":";//No I18N
        }
        if(arrParams[1])
        {
            arrURLParams = arrParams[1].split("&");
            var len = arrURLParams.length;
            for(var i=0;i<len;i++)
            {
                 var sParam =  arrURLParams[i].split("=");
                 if(sParam[0] == "socialshare")
                 {
                   socialshare=sParam[1];
                 }
                 if(sParam[0]=='cntnId')
                 {
                     document.cookie = 'zcnt='+sParam[1];
                     cmpContentId =sParam[1];
                 }      
            }
        }
 
        webAutoIds = webAutoIds.split(",");
        zuids = zuids.split(",");
        domainIds = domainIds.split(",");
        domains = domains.split(",");
        ref = ref.split(",");
        var campaignId = getZCookie("zcs"); //No I18N
        var cmpContentId = getZCookie("zcnt"); //No I18N  
        for(var i=0;i<webAutoIds.length;i++)
        {
            var webAutoId = webAutoIds[i];
            var zuid = zuids[i];
            var domainId = domainIds[i];
            var domain = domains[i];
            if(ref !== undefined && ref !== "")
            {
                actionData = "&webAutoId="+webAutoId+"&zuid="+zuid+"&domain="+domain+"&orgDomainId="+domainId+"&reqType="+0+"&ref="+ref+"&socialshare="+socialshare; //No I18N
            }
            else
            {
                actionData = "&webAutoId="+webAutoId+"&zuid="+zuid+"&domain="+domain+"&orgDomainId="+domainId+"&reqType="+0+"&socialshare="+socialshare;//No I18N
            }
            if(cmpContentId != null && cmpContentId != "")
            {
                 actionData=actionData+"&contentId="+cmpContentId; //No I18N
            }
            if(value != null && value != "")
            {
                actionData=actionData+"&value="+encodeURIComponent(value); //No I18N
            }
            var zc_cu_exp = getZCookie("zc_cu_exp");//No I18N
            if(zc_cu_exp != null)
            {
                actionData = actionData+"&zc_cu_exp="+zc_cu_exp;//No I18N
            }    
            var action = "viewed"; //No I18N
            actionData=actionData+"&action="+encodeURIComponent(action); //No I18N
            var fpCookie = getZCookie("zc_cu");//No I18N
            if(fpCookie != null)
            {
                actionData = actionData+"&zc_cu="+fpCookie;//No I18N
            }
            actionData = actionData+"&url="+encodeURIComponent(url);//No I18N
            actionData = actionData+"&parentUrl="+encodeURIComponent(parentUrl)+"&from="+from;//No I18N 
        }    
    }
    else
    {
        var formId = document.querySelector("meta[name='zwafid']").getAttribute("content").split(","); //No I18N
        var popupFormId = formId[formId.length - 1];
        actionData = actionData+"&popupFormId="+popupFormId+"&from="+from; //No I18N
    }
    var paramData = actionData;
    if(ZC_RedirUrl.indexOf("http") == 0)
    {
    	ajaxUrl = ZC_RedirUrl+"/wa/PopupRequest"+"?callback=processData"+paramData; //No I18N
    }	
    else
    {
    	ajaxUrl = protocol+"//"+ZC_RedirUrl+"/wa/PopupRequest"+"?callback=processData"+paramData; //No I18N
    }	
    makeAjaxReq(ajaxUrl);
}
 
function getZCookie(c_name)
{
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1)
    {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1)
    {
        c_value = null;
    }
    else
    {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1)
        {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start,c_end));
    }
    return c_value;
}
 
function zcCallback(data)
{	
    var resultData = JSON.parse(JSON.stringify(data));
    var visitorCookie = resultData.zc_cu;
    document.cookie = "zc_cu="+visitorCookie+";expires="+exp_date.toGMTString()+"; path=/";
}
 
function zcLocCallback(data)
{
    var resultData = JSON.parse(JSON.stringify(data));
    var visitorCookie = resultData.zc_loc;
    document.cookie = "zc_loc="+visitorCookie+";";
}
 
function addPopupHistory(action,anotherAction,customerRelId) // to add an entry in popupHistory table while viewing and performing any action and signing up using the form displayed in popup
{
    var json = "{}";
    json = JSON.parse(json);
    json.from = ZCWA.from;
    json.pType = ZCWA.pType;
    if(ZCWA.from == "WA")
    {
        json.popupInfoMap_Id = ZCWA.popupInfoMap_Id;
        json.actionId = sessionStorage.getItem(ZCWA.acId);
        var curUser = "";
        if(ZCWA.CurrUserId == undefined)
        {
            var CurrCookie = getZCookie("zc_cu");//No I18N
            ZCWA.CurrUserId=CurrCookie.substring(CurrCookie.indexOf("-")+2);
            var userInd = CurrCookie.indexOf("-")+1;
            curUser = CurrCookie.substring(userInd,userInd+1);
        }
        json.customerID = customerRelId != undefined ? customerRelId : ZCWA.CurrUserId ;
        if(curUser != "")
        {
                json.customerType= curUser;
                ZCWA.CurrUser = curUser;
        }
        else
        {
                json.customerType= ZCWA.CurrUser;
        }
    }
    json.action = action;
    if(anotherAction != undefined && anotherAction != "")
    {
        json.anotherAction = anotherAction;
    }
    //#json.formId=ZCWA[ZCWA.CurrUser+"id"].substring(0,ZCWA[ZCWA.CurrUser+"id"].indexOf("_")); //No I18N
    json.formId = ZCWA.pType == 1 ? ZCWA.formId.substring(0,ZCWA.formId.indexOf("_")) : ZCWA.formId;
    json.isOlayAvail = ZCWA.overlay != "" ? true : false; 
    var protocol = window.location.protocol;
    if(protocol.indexOf("http") < 0)
    {
        protocol = "http"+":";//No I18N
    }
    if(action == "response" && ZCWA.pType == 2) 
    {
    	ZCWA.resp = ZCWA.resp+1;
    	if(ZCWA.afterResp != 1) //set zc_vach && zc_cach cookie for marketing popups
    	{
    		var zh_date = new Date().getTime()+(50*365*24*60*60*1000);
            var fId = encodeURIComponent(ZCWA.formId);
            var triggerTime = getZCookie("zc_"+ZCWA.CurrUser+"ach"); //No I18N
            var tTimejson;
            if(triggerTime != null)
            {
                tTimejson = JSON.parse(triggerTime);
                tTimejson[fId] = zh_date;
            }
            else
            {
                tTimejson = {};
                tTimejson[fId] = zh_date; 
            }
            document.cookie =  "zc_"+ZCWA.CurrUser+"ach="+JSON.stringify(tTimejson)+";expires="+exp_date.toGMTString()+"; path=/";
    	}
    	if(ZCWA.overlay != "")
        {
    		document.querySelector("#popup_WA_"+ZCWA.WALen).style.display = "none";
    		document.querySelector("#PopupOverLay_WA_"+ZCWA.WALen).style.display = "none";
        	//PopupPageclspopUpUtil("popup_WA_"+ZCWA.WALen); //No I18N
        }
    }
    stringParams = serializeMHJson(json);
    if(ZC_RedirUrl.indexOf("http") == 0)
    {
    	ajaxUrl = ZC_RedirUrl+"/wa/PopupHistory"+"?callback=processData&"+stringParams; //No I18N
    }	
    else
    {
    	ajaxUrl = protocol+"//"+ZC_RedirUrl+"/wa/PopupHistory"+"?callback=processData&"+stringParams; //No I18N
    }	
    
    makeAjaxReq(ajaxUrl);
    
}
 
function getCriteria(criteria,check)
{
    ZCWA.history="getCriteria"; //No I18N
    var start=criteria.indexOf(check);
    if(start!=-1)
    {
        start=criteria.indexOf("_",start)+1;
        var end=criteria.indexOf(":",start);
        if(end==-1)
        {
            end=criteria.length;
        }
        return criteria.substring(start,end);
    }
    return null;
}
 
function setCookieLifeTime()
{
    var temp = ZCWA.interval.substring(0,ZCWA.interval.indexOf("_"));
    if(temp.indexOf("timeinterval") > -1)
    {
        time = ZCWA.interval.substring(ZCWA.interval.indexOf("_")+1); //No I18N
        //time = 0.5;
        zc_expiry = new Date();
        d = new Date().getTime()+(time*60*60*1000);
    }
    else
    {
        day = ZCWA.interval.substring(ZCWA.interval.indexOf("_")+1); //No I18N
        //day = 1;
        zc_expiry = new Date();
        d = new Date().getTime()+(day*24*60*60*1000); 
        //document.cookie =  "zc_"+ZCWA.CurrUser+"opt=yes; expires=" + zc_expiry.toGMTString(); //zc_vopt if ZCWA.CurrUser='v' //No I18N
    }
    var fId = ZCWA.formId.indexOf("_") > -1 ? encodeURIComponent(ZCWA.formId.substring(0,ZCWA.formId.indexOf("_"))) : encodeURIComponent(ZCWA.formId);
    var triggerTime = getZCookie("zc_"+ZCWA.CurrUser+"opt"); //No I18N
    var tTimejson;
    if(triggerTime != null)
    {
        tTimejson = JSON.parse(triggerTime);
        tTimejson[fId] = d;
    }
    else
    {
        tTimejson = {};
        tTimejson[fId] = d; 
    }
    document.cookie =  "zc_"+ZCWA.CurrUser+"opt="+JSON.stringify(tTimejson)+";expires="+exp_date.toGMTString()+"; path=/";
}
 
function loadpopup(userid)
{
    ZCWA.history="loadpopup"; //No I18N
    var json = "{}";
    json = JSON.parse(json);
    json.pType = ZCWA.pType;
    json.popupInfoMap_Id = ZCWA.popupInfoMap_Id;
    if(ZCWA.pType == 1)
    {
    	listId = getCriteria(userid,"_");
    	json.listId = listId;
        var s_start = 0;
        var s_end = userid.indexOf("_");
        json.signupFormId = userid.substring(s_start,s_end);//type casting from string to long
    }
    
    json.m = "getSignupUrl"; //No I18N
    var zuid = document.querySelector("meta[name='zwauid']").getAttribute("content"); //No I18N
    json.zuid = zuid;
    json.from = ZCWA.from;
    //#var webAutoIds = $("meta[name='zwaid']").attr("content");
    var protocol = window.location.protocol;
    if(protocol.indexOf("http") < 0)
    {
        protocol = "http"+":";//No I18N
    }
    if(ZCWA.from == "WA")
    {
        ZCWA_WA.push(ZCWA);
        json.ind = WALen;
        ZCWA.WALen = WALen++;
        ZCWA = {};
    }
    else
    {
        ZCWA_SF.push(ZCWA);
        json.ind = SFLen;
        ZCWA.SFLen = SFLen++;
        //#console.log("ZCWA_SF=",ZCWA_SF);
        ZCWA = {};
    }
    stringParams = serializeMHJson(json);
    ajaxUrl = protocol+"//"+ZH_URL+"/wa/PopupSignUpForm"+"?callback=processData&"+stringParams; //No I18N
    makeAjaxReq(ajaxUrl);
}
 
function getCurrUser()
{
    ZCWA.history="getCurrUser"; //No I18N
    var CurrCookie = getZCookie("zc_cu");//No I18N
    if(CurrCookie != null)
    {
        ZCWA.CurrUserId = CurrCookie.substring(CurrCookie.indexOf("-")+2);
        var ustart = CurrCookie.indexOf("-");
        var user = CurrCookie.substring(ustart+1,ustart+2);
        ZCWA.CurrUser = user == 'g' ? 'v' : user ;  //No I18N
        loadpopup(ZCWA.formId);
    }
    else // for the users viewed the popup not from Web Assistant configuration.
    {
        ZCWA.CurrUser = 'v';  //No I18N
        loadpopup(ZCWA.formId);
    }
}
 
function isFormVisible()
{
    var ele = "";
    for(var i=0;i<SFLen;i++)
    {
        ele = document.querySelector("#popup_SF_"+i); //No I18N
        if(ele.style.display != "none" || ele.offsetWidth > 0 || ele.offsetHeight > 0)
        {
            return true;
        }
    }
    for(var i=0;i<WALen;i++)
    {
        ele = document.querySelector("#popup_WA_"+i); //No I18N
        if(ele.style.display != "none" || ele.offsetWidth > 0 || ele.offsetHeight > 0)
        {
            return true;
        }
    }
    return false;
}
 
function checkCookie(cook,ZCWA_cpy)
{
    var ckVal = getZCookie(cook);
    if(ckVal != null)
    {
        var ckjson = JSON.parse(ckVal);
        d = new Date().getTime();
        var fId = ZCWA_cpy.formId.indexOf("_") > -1 ? encodeURIComponent(ZCWA_cpy.formId.substring(0,ZCWA_cpy.formId.indexOf("_"))) : encodeURIComponent(ZCWA_cpy.formId);
        if(ckjson[fId] != undefined )
        {
            if(ckjson[fId] <= d)
            {
                delete ckjson[fId];
                document.cookie = cook+"=;expires="+exp_date.toGMTString()+"; path=/";
                if(Object.keys(ckjson).length != 0 )
                {
                    document.cookie =  cook+"="+JSON.stringify(ckjson)+";expires="+exp_date.toGMTString()+"; path=/";
                }
                return true;
            }
            return false;
        }
    }
    else if(/*ZCWA_cpy.interval == "nolimit_1" && */(ZCWA_cpy.onLd == true || ZCWA_cpy.scr == true || ZCWA_cpy.mLeave == true))
    {
    	return false;
    }
    return true;
}
 

function tosFunc(i,timer,mod,type)
{
    if(!tmOnSite && (ZCWA_timer == timer) && !(isFormVisible()) && getZCookie("zc_cu") != null && (checkCookie("zc_vopt",mod[i]) == true && checkCookie("zc_copt",mod[i]) == true) && (checkCookie("zc_"+mod[i].CurrUser+"ach",mod[i]) == true))
    {
        ZCWA = mod[i];
        tmOnSite = true;
        PopupOpenUtil(type,i); //No I18N
    }
}
 
//time on site
function timeOnSite()
{
    ZCWA.history = "timeOnSite"; //No I18N
    if(ZCWA.CurrUser!=null)
    {
        var i = 0;
        ZCWA_timer = new Date().getTime();
        if(ZCWA_WA.length > 0)
        {
            for(i=0;i<ZCWA_WA.length;i++)
            {
                var tos = getCriteria(ZCWA_WA[i].criteria,"timeonsite_"); //No I18N
                if(tos != null)
                {
                    tos = tos*1000;
                    setTimeout(tosFunc,tos,i,ZCWA_timer,ZCWA_WA,"WA"); //tos - is the timeinterval
                }
            }
        }
        if(ZCWA_SF.length > 0)
        {
            for(i=0;i<ZCWA_SF.length;i++)
            {
                var tos = getCriteria(ZCWA_SF[i].criteria,"timeonsite_"); //No I18N
                if(tos != null)
                {
                    tos = tos*1000;
                    setTimeout(tosFunc,tos,i,ZCWA_timer,ZCWA_SF,"SF");
                }
            }
        }
    }
}
 
function addEvent(obj, evt, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(evt, fn, false);
    }
    else if (obj.attachEvent) {
        obj.attachEvent("on" + evt, fn);
    }
}
 
//exit intent
/*if(window.addEventListener)
{    
    document.addEventListener('mouseleave', function(event){
         
        console.log("exit=",event.clientY)
        if( event.clientY < 0){
            exitIntent();
        }
    });
}
else
{    
    document.onmouseleave = function(e)
    {
        if( e.clientY < 0)
        {
            exitIntent();
        }
    }*/
    /*window.attachEvent('onmouseleave',function(e){
        if( e.clientY < 0)
        {
            exitIntent();
        }
    });*/
//}
 
/*addEvent(document,"mouseleave",function(e){ //No I18N
    e = e ? e : window.event;
    if( e.clientY < 0)
    {
        exitIntent();
    }
});*/
addEvent(document.body,"mouseleave",function(e){ //No I18N
    e = e ? e : window.event;
    if( e.clientY <= 0)
    {
        exitIntent();
    }
});
function exitIntent(e)
{
    ZCWA.history="exit intent"; //No I18N
    if(ZCWA.CurrUser!=null)
    {
        if(ZCWA_WA.length > 0 && !mLeave)
        {
            // 
            for(var i=0;i<ZCWA_WA.length;i++)
            {              
                var exit = getCriteria(ZCWA_WA[i].criteria,"exit intent_"); //No I18N
                //exit="yes"; //No I18N
                if(exit != null && !(isFormVisible()) && getZCookie("zc_cu") != null && (checkCookie("zc_vopt",ZCWA_WA[i]) == true && checkCookie("zc_copt",ZCWA_WA[i]) == true) && (checkCookie("zc_"+ZCWA_WA[i].CurrUser+"ach",ZCWA_WA[i]) == true))
                {
                    ZCWA = ZCWA_WA[i];
                    ZCWA.mLeave = true;
                    mLeave = true;
                    PopupOpenUtil("WA",i); //No I18N
                }
            }
        }
        if(ZCWA_SF.length > 0 && !mLeave)
        {
            for(var i=0;i<ZCWA_SF.length;i++)
            {                  
                var exit = getCriteria(ZCWA_SF[i].criteria,"exit intent_"); //No I18N
                //exit="yes"; //No I18N
                if(exit != null && !(isFormVisible()) && getZCookie("zc_cu") != null && (checkCookie("zc_vopt",ZCWA_SF[i]) == true && checkCookie("zc_copt",ZCWA_SF[i]) == true) && (checkCookie("zc_"+ZCWA_SF[i].CurrUser+"ach",ZCWA_SF[i]) == true))
                {
                    ZCWA = ZCWA_SF[i];
                    ZCWA.mLeave = true;
                    mLeave = true;
                    PopupOpenUtil("SF",i); //No I18N
                }
            }
        }
    }
}
 
//scroll
//window.onscroll = function (e)
document.addEventListener('scroll',function(e)
{
    ZCWA.history="onscroll"; //No I18N
    if(ZCWA.CurrUser!=null)
    {
        var scrollpercent = 0;
       /* if(window.scrollY != undefined)
        {
            scrollpercent = Math.ceil(window.scrollY/(document.documentElement.clientHeight - document.body.clientHeight)*100);
        }
        else
        {
            scrollpercent = Math.ceil(document.documentElement.scrollTop/(document.documentElement.offsetHeight - document.body.clientHeight)*100);
        }
        //var scrollpercent=Math.ceil(($ZWA(window).scrollTop()/($ZWA(document).height()- $ZWA(window).height()))*100);
        scrollpercent = Math.abs(scrollpercent); */

         var D = document;
        var winheight= window.innerHeight || (document.documentElement || document.body).clientHeight;
        var docheight = Math.max(
                D.body.scrollHeight, D.documentElement.scrollHeight,
                D.body.offsetHeight, D.documentElement.offsetHeight,
                D.body.clientHeight, D.documentElement.clientHeight);
        var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
        var trackLength = docheight - winheight
        scrollpercent = Math.floor(scrollTop/trackLength * 100) // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
        if(ZCWA_WA.length > 0)
        {
            for(var i=0;i<ZCWA_WA.length;i++)
            {
                scroll_criteria = getCriteria(ZCWA_WA[i].criteria,"on scroll_"); //No I18N
                if(scroll_criteria != null && getZCookie("zc_cu") != null)
                {
                    scroll_criteria = Number(scroll_criteria);//typecasting from string to integer
                    //scroll percent can't be get accurately at times so +5 is used(scroll percent +5)
                    if(scroll_criteria == scrollpercent || ((scrollpercent > scroll_criteria) && (scrollpercent <= scroll_criteria+5)))
                    {
                        if(!(isFormVisible()) && (checkCookie("zc_vopt",ZCWA_WA[i]) == true && checkCookie("zc_copt",ZCWA_WA[i]) == true) && (checkCookie("zc_"+ZCWA_WA[i].CurrUser+"ach",ZCWA_WA[i]) == true))
                        {
                            ZCWA = ZCWA_WA[i];
                            ZCWA.scr = true;
                            scr = true;
                            PopupOpenUtil("WA",i); //No I18N
                            break;
                        }
                    }
                }
            }
        }
        if(ZCWA_SF.length > 0)
        {
            for(var i=0;i<ZCWA_SF.length;i++)
            {
                scroll_criteria=getCriteria(ZCWA_SF[i].criteria,"on scroll_"); //No I18N
                if(scroll_criteria != null && getZCookie("zc_cu") != null)
                {
                    scroll_criteria=Number(scroll_criteria);//typecasting from string to integer
                    //scroll percent can't be get accurately at times so +5 is used(scroll percent +5)
                    if(scroll_criteria == scrollpercent || ((scrollpercent > scroll_criteria) && (scrollpercent <= scroll_criteria+5)))
                    {
                        if(!(isFormVisible()) && (checkCookie("zc_vopt",ZCWA_SF[i]) == true && checkCookie("zc_copt",ZCWA_SF[i]) == true) && (checkCookie("zc_"+ZCWA_SF[i].CurrUser+"ach",ZCWA_SF[i]) == true))
                        {
                            ZCWA = ZCWA_SF[i];
                            ZCWA.scr = true;
                            scr = true;
                            PopupOpenUtil("SF",i); //No I18N
                            break;
                        }
                    }
                }
            }
        }
    }
});
 
window.onbeforeunload=function(){
    var popupEle = "";
    var popupOlayEle = "";
    var popupStr = "";
    var check = 0;
    if(ZCWA.from == "WA")
    {
        popupEle = document.querySelector("#popup_WA_"+ZCWA.WALen); //No I18N
        popupOlayEle = document.querySelector("#PopupOverLay_WA_"+ZCWA.WALen); //No I18N
        popupStr = "popup_WA_"+ZCWA.WALen; //No I18N
        check = 1;
    }
    else if(ZCWA.from == "SF")
    {
        popupEle = document.querySelector("#popup_SF_"+ZCWA.SFLen); //No I18N
        popupOlayEle = document.querySelector("#PopupOverLay_SF_"+ZCWA.SFLen); //No I18N
        popupStr = "popup_SF_"+ZCWA.SFLen; //No I18N
        check = 1;
    }
    if(check == 1 && (popupEle.style.display != "none" || popupEle.offsetWidth > 0 || popupEle.offsetHeight > 0 || popupOlayEle.style.display != "none" || popupOlayEle.offsetWidth > 0 || popupOlayEle.offsetHeight > 0) && ZCWA.interval)
    {
        PopupPageclspopUpUtil(popupStr); // if the user sees the popup and on displaying the popup if the user reloads the page  //No I18N
    }
}
 
function setTabChange1()
{    
    ZCWA.history = "setTabChange1"; //No I18N
    mLeave = false;
    scr = false;
    tmOnSite = !tmOnSite;
    if(!tmOnSite)
    {
         timeOnSite();
    }
}
 
var tabChange = (function()
{    
    var stateKey, eventKey, keys = 
    {   
        hidden: "visibilitychange", //No I18N 
           webkitHidden: "webkitvisibilitychange", //No I18N 
        mozHidden: "mozvisibilitychange", //No I18N  
        msHidden: "msvisibilitychange"//No I18N   
     };
     for (stateKey in keys) 
     {  
         if (stateKey in document) 
         { 
               eventKey = keys[stateKey];
               break;      
          }   
     }    
     return function(c) 
     {    
        if (c) {
            if(window.addEventListener)
            {
                document.addEventListener(eventKey, c);
            }
            else
            {
                window.attachEvent(eventKey, c);
            }     
        }
        return !document[stateKey]; 
   }
})();
 
tabChange(function(){
    setTabChange1();
});
 
function setZhHiddenFields(zhPopId,encryptFormId)
{
	ZCWA.history = "setZhHiddenFields"; //No I18N
    var zhHidden = document.createElement("div");
    var zhHiddenDiv = document.querySelector("#"+zhPopId.frameId).querySelector("#zcHiddenFields");
    zhHidden.innerHTML = zhHiddenDiv.innerHTML; //No I18N
    document.querySelector("#"+encryptFormId).querySelector("#customForm form").appendChild(zhHidden); //No I18N
    document.querySelector("#"+encryptFormId).querySelector("#customForm form").setAttribute("action","https://"+ZH_URL+"/weboptin.zc"); //No I18N
 
    var rmEle = zhHiddenDiv; //No I18N
    rmEle.parentNode.removeChild(rmEle);
    rmEle = document.querySelector("#"+zhPopId.frameId).querySelector("#zcTitle"); //No I18N
    rmEle.parentNode.removeChild(rmEle);    
}
 
function zhLoadSmartForms(url,zhPopId,ZCWA,callback)
{
	ZCWA.history = "zhLoadSmartForms"; //No I18N
    var zhXMLHttp;
    if (window.XMLHttpRequest) { // code for modern browsers
        zhXMLHttp = new XMLHttpRequest();
     } 
     else { // code for old IE browsers
        zhXMLHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    zhXMLHttp.open("GET", url, true);
    zhXMLHttp.send();
    zhXMLHttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            // 
            document.querySelector("#"+zhPopId.frameId).innerHTML = zhXMLHttp.responseText;
            if(ZCWA.pType == 1)
            {
            	var scriptEle = document.querySelector("#"+zhPopId.frameId).querySelector("script");
                var cpyScriptEle = document.createElement("script");
                cpyScriptEle.setAttribute("id","zcOptinCleanJS");
                cpyScriptEle.setAttribute("src",scriptEle.getAttribute("src")+"?t="+new Date().getTime());
                //cpyScriptEle.setAttribute("src","https://nantha-5370.csez.zohocorpin.com:8443/hub/js/V2/zcOptinClean.js?t="+new Date().getTime());
                var loadFn = scriptEle.getAttribute("onload");
                cpyScriptEle.setAttribute("onload",loadFn);
                var encryptFormId = loadFn.substring(9,loadFn.indexOf("'",9));
                scriptEle.parentNode.removeChild(scriptEle);
                document.querySelector("#"+zhPopId.frameId).appendChild(cpyScriptEle);
                setZhHiddenFields(zhPopId,encryptFormId);
                //preSetZhForm();
            }
            else
            {
            	_setMkPopup(zhPopId,ZCWA);
            }
            callback(zhXMLHttp.responseText,zhPopId,ZCWA);
        }
    }
}
    
function zhFormCallback(data,zhPopId,ZCWA)
{	
	ZCWA.history = "zhFormCallback"; //No I18N
	ZCWA.resp = 0;	
	var presentForm = document.querySelector("#"+zhPopId.frameId);
	var clsSelector = presentForm.querySelector("#zh_close,.zh_close"); //No I18N
	ZCWA.clsConfig = clsSelector.style.visibility; //No I18N
	var ele = document.createElement("div");
	var zh_overlayObj = {};
	if(presentForm.querySelector("#zh_overlayNeeded") != null && presentForm.querySelector("#zh_overlayNeeded").value == "1")
	{
		zh_overlayObj.color = presentForm.querySelector("#zh_overlayColor").value;
		zh_overlayObj.opacity = presentForm.querySelector("#zh_overlayOpacity").value; //No I18N
		ZCWA.overlay = zh_overlayObj;
	}
	else if(ZCWA.pType == 1 && presentForm.querySelector("#zh_overlayNeeded") == null) //for existing popup forms
	{
		zh_overlayObj.color = "#576981"; //No I18N
		zh_overlayObj.opacity = "0.6"; //No I18N
		ZCWA.overlay = zh_overlayObj;
	}
	
    if(ZCWA.overlay != "") //if overlay is configured then show the overlay
    {
        setZhAttributes(ele,{"id":zhPopId.overlayId,"style":"background:"+zh_overlayObj.color+";display:none;opacity:"+zh_overlayObj.opacity+";position:fixed; width:100%; z-index:9999; !important; height:100%; overflow:hidden;left:0px;top:0px"}); //No I18N
        var bodyEle = document.getElementsByTagName("body")[0];
        bodyEle.insertBefore(ele,bodyEle.firstChild);
    }
    
	if(ZCWA.clsConfig == "" || ZCWA.clsConfig == "visible")
	{
		clsSelector.setAttribute("id","zh_close"); 		
		if(window.addEventListener)
		{
			clsSelector.addEventListener('click',function(){ 
			PopupPageclspopUpUtil(zhPopId.popId);
		    });
		}
		else
		{
			clsSelector.attachEvent('click',function(){ 
			PopupPageclspopUpUtil(zhPopId.popId);
		    });
		}
		/*document.querySelector("#"+zhPopId.frameId).querySelector(".zh_close").setAttribute("id",zhPopId.closeId);
	    document.querySelector("#"+zhPopId.closeId).addEventListener('click',function(){
	        PopupPageclspopUpUtil(zhPopId.popId);
	    });*/
	    if(ZCWA.overlay != "") // if overlay is configured and close icon is present in the popups, then on clicking the overlay the popup should close
	    {
			if(window.addEventListener)
			{
				document.querySelector("#"+zhPopId.overlayId).addEventListener('click',function(){
			        PopupPageclspopUpUtil(zhPopId.popId);
			    });
			}
			else
			{
				document.querySelector("#"+zhPopId.overlayId).attachEvent('click',function(){
			        PopupPageclspopUpUtil(zhPopId.popId);
			    });
			}
	    }
	}
  
    if(document.querySelector("#customForm") != null)
    {
        // 
        var height;var width;var tr;var bl;
        //document.querySelector("#"+zhPopId.popId).querySelector("#zcampaignOptinForm").setAttribute("action","https://nantha-5370.csez.zohocorpin.com:8443/weboptin.zc");
        var hght = parseInt(document.querySelector("#"+zhPopId.popId).querySelector("#customForm").clientHeight);
        var wdth = parseInt(document.querySelector("#"+zhPopId.popId).querySelector("#customForm").clientWidth);
        //document.querySelector("#"+zhPopId.popId).style.cssText = "height:"+(hght=(hght+43)+"px")+";width:"+(wdth=(wdth+10)+"px")+";"; //No I18N
        
        if( (navigator.userAgent.match(/Android/i)
		 || navigator.userAgent.match(/webOS/i)
		 || navigator.userAgent.match(/iPhone/i)
		 || navigator.userAgent.match(/iPad/i)
		 || navigator.userAgent.match(/iPod/i)
		 || navigator.userAgent.match(/BlackBerry/i)
		 || navigator.userAgent.match(/Windows Phone/i)) && (ZCWA.mgFormType==="MagicPopup"))//No I18N
        {
            document.querySelector("#"+zhPopId.popId).style.cssText = "height:100%;margin:0 4%;"; //No I18N
         }
        else{
            document.querySelector("#"+zhPopId.popId).style.cssText = "height:"+(hght=(hght+43)+"px")+";width:"+(wdth=(wdth+10)+"px")+";"; //No I18N
        }
        
        if(window.innerHeight <= document.querySelector("#"+zhPopId.popId).querySelector("#customForm").clientHeight)
        {
            height = 0;
            bl = 0;
        }
        else
        {
            hght = parseInt(document.querySelector("#"+zhPopId.popId).querySelector("#customForm").clientHeight); //No I18N
            height = (window.innerHeight - (hght-50))/2;
            bl = window.innerHeight-hght-10;
        }
        wdth = parseInt(document.querySelector("#"+zhPopId.popId).querySelector("#customForm").clientWidth); //No I18N
        if(window.innerWidth > wdth)
        {
            width = (window.innerWidth-wdth)/2;
        }
        ZCWA.height = height;
        ZCWA.bl = bl;
        ZCWA.width = width;
        document.querySelector("#"+zhPopId.popId).style.cssText += "opacity:1;display:none;transition-duration:1.5s;transition-timing-function:ease-in-out;position:fixed;z-index:99999"; //No I18N
    }
    var zhPopIdEle = document.querySelector("#"+zhPopId.popId);
    var Pos = ZCWA.pos;
    var Eff = ZCWA.eff;
    if(ZCWA.mgFormType != "ElegantForm")
    {
        if(Pos == "TopLeft")
        {
            switch(Eff)
            {
                case "SlideFromLeft"    :    zhPopIdEle.style.cssText += "top:10px;right:100%;bottom:100%;left:-100%;"; //No I18N
                                            break;
                case "SlideFromRight"    :    zhPopIdEle.style.cssText += "top:10px;right:-100%;bottom:100%;left:100%;"; //No I18N
                                            break;
                case "SlideFromTop"        :    zhPopIdEle.style.cssText += "top:-100%;right:100%;bottom:100%;left:0%;"; //No I18N
                                            break;
                case "SlideFromBottom"    :    zhPopIdEle.style.cssText += "top:100%;right:100%;bottom:100%;left:0%;"; //No I18N
                                            break;
            }
        }
        if(Pos == "TopRight")
        {
            switch(Eff)
            {
                case "SlideFromLeft"    :    zhPopIdEle.style.cssText += "top:10px;right:100%;"; //No I18N
                                            break;
                case "SlideFromRight"    :    zhPopIdEle.style.cssText += "top:10px;right:-100%;"; //No I18N
                                            break;
                case "SlideFromTop"        :    zhPopIdEle.style.cssText += "top:-100%;right:0%;"; //No I18N
                                            break;
                case "SlideFromBottom"    :    zhPopIdEle.style.cssText += "top:100%;right:0%;"; //No I18N
                                            break;
            }
        }
        if(Pos == "BottomLeft")
        {
            switch(Eff)
            {
                case "SlideFromLeft"    :    zhPopIdEle.style.cssText += "top:"+bl+";right:100%;bottom:0%;left:-100%;"; //No I18N
                                            break;
                case "SlideFromRight"    :    zhPopIdEle.style.cssText += "top:"+bl+";right:-100%;bottom:0%;left:100%;"; //No I18N
                                            break;
                case "SlideFromTop"        :    zhPopIdEle.style.cssText += "top:-100%;right:100%;bottom:100%;left:0%;"; //No I18N
                                            break;
                case "SlideFromBottom"    :    zhPopIdEle.style.cssText += "top:100%;right:100%;bottom:-100%;left:0%;"; //No I18N
                                            break;
            }
        }
        if(Pos == "BottomRight")
        {
            switch(Eff)
            {
                case "SlideFromLeft"    :    zhPopIdEle.style.cssText += "top:"+bl+";right:100%;"; //No I18N
                                            break;
                case "SlideFromRight"    :    zhPopIdEle.style.cssText += "top:"+bl+";right:-100%;"; //No I18N
                                            break;
                case "SlideFromTop"        :    zhPopIdEle.style.cssText += "top:-100%;right:0%;"; //No I18N
                                            break;
                case "SlideFromBottom"    :    zhPopIdEle.style.cssText += "top:100%;right:0%;"; //No I18N
                                            break;
            }
        }
        if(Pos == "Center")
        {
            switch(Eff)
            {
                case "SlideFromLeft"    :    zhPopIdEle.style.cssText += "right:0px;bottom:0px;left:-100%;"; //No I18N
                                            break;
                case "SlideFromRight"    :    zhPopIdEle.style.cssText += "right:0px;bottom:0px;left:100%;"; //No I18N
                                            break;
            }
        }
    }
    if(!flag)
    {
        flag = true;    
        onLoadPopup(); //to trigger the popup after the response(popupform) is completely received.
    }
}
 
function zcUrlCallback(data,callback)
{
    ZCWA.history="zcUrlCallback"; //No I18N
    var json=JSON.parse(JSON.stringify(data));
    var protocol="http"; //No I18N
    var url=json.url;
    var from = json.from;
    var height;var width;var tr;var bl;
    
    var len = json.ind;
    ZCWA = from == "WA" ? ZCWA_WA[len] : ZCWA_SF[len];
    var zhPopId = {};
    if(from == "WA")
    {
        zhPopId.overlayId = "PopupOverLay_WA_"+len; //No I18N
        zhPopId.popId = "popup_WA_"+len; //No I18N
        zhPopId.titleId = "ptitle_WA_"+len; //No I18N
        zhPopId.clspanId = "pclspan_WA_"+len; //No I18N
        zhPopId.closeId = "pclose_WA_"+len; //No I18N
        zhPopId.frameId = "pframe_WA_"+len; //No I18N
    }
    else
    {
        zhPopId.overlayId = "PopupOverLay_SF_"+len; //No I18N
        zhPopId.popId = "popup_SF_"+len; //No I18N
        zhPopId.titleId = "ptitle_SF_"+len; //No I18N
        zhPopId.clspanId = "pclspan_SF_"+len; //No I18N
        zhPopId.closeId = "pclose_SF_"+len; //No I18N
        zhPopId.frameId = "pframe_SF_"+len; //No I18N
    }
    var docBodyEle = document.getElementsByTagName("body")[0];
    var ele = document.createElement("div");
    if(ZCWA.overlay != "") //if overlay is configured then show the overlay
    {
    	var zhOLay = {};
        var oLayArr = ZCWA.overlay.split(":");
        for(var loop=0;loop<oLayArr.length;loop++)
        {
        	var temp = oLayArr[loop].split("_");
        	switch(temp[0])
        	{
	        	case "color" : zhOLay.color = temp[1];break;
	        	case "z-index" : zhOLay.zindex = temp[1];break;
        	}
        }
        setZhAttributes(ele,{"id":zhPopId.overlayId,"style":"background:"+zhOLay.color+";display:none;opacity:0.6;position:fixed; width:100%; z-index:"+zhOLay.zindex+" !important; height:100%; overflow:hidden;left:0px;top:0px"}); //No I18N
        docBodyEle.appendChild(ele);
    }
    
    
    ele = document.createElement("div");
    setZhAttributes(ele,{"id":zhPopId.popId,"actionId":sessionStorage.getItem(ZCWA.acId),"style":""}); //No I18N
    ele.innerHTML = "<div id='"+zhPopId.frameId+"' style=''></div>";
    docBodyEle.appendChild(ele);
 
    ele = document.createElement("input");
    setZhAttributes(ele,{"type":"hidden","id":"p_from","value":ZCWA.from}); //No I18N
    docBodyEle.appendChild(ele);
    //document.querySelector("#"+zhPopId.overlayId).style = "opacity:0.6;display:none;top:0px";
    
    zhLoadSmartForms(url,zhPopId,ZCWA,zhFormCallback);
}
 
function zcPopupCallback(data)
{
    ZCWA.history = "zcPopupCallback"; //No I18N
    ZCWA.acId = "actionId"; //No I18N
    var Pconf = JSON.parse(JSON.stringify(data));
    ZCWA.from = Pconf.from;
    ZCWA.pType = Pconf.pType;
    ZCWA.formId = Pconf.form_id;
    ZCWA.criteria = Pconf.criteria;
    cust = Pconf.cust;
    ZCWA.interval = Pconf.trigger_interval;
    ZCWA.succ_interval = Pconf.succ_interval;
    ZCWA.pos = cust.substring(0,cust.indexOf("_"));
    ZCWA.eff = cust.substring(cust.indexOf("_")+1,cust.length);
    ZCWA.overlay = "";
    if(ZCWA.pType == 1)
    {
    	ZCWA.mgFormType = Pconf.mgFormType;
    }
    if(ZCWA.from == "WA")
    {
        ZCWA.popupInfoMap_Id = Pconf.popupInfoMap_Id;
        var actionId=Pconf.actionId;
        sessionStorage.setItem(ZCWA.acId,actionId);
    }
    ZCWA.scr = false;
    ZCWA.mLeave = false;
    ZCWA.onLd = false;
    getCurrUser();
}
 
function getNextPopupInterval()
{
    return ZCWA.succ_interval.substring(ZCWA.succ_interval.indexOf("_")+1,ZCWA.succ_interval.length);
}
 
function onLoadPopup()
{
    var loadDelay = 1000;
    timeOnSite();
    setTimeout(function(){
        if(ZCWA_WA.length > 0 && !onLd)
        {
            for(var i=0;i<ZCWA_WA.length;i++)
            {         
            	ZCWA = ZCWA_WA[i];                
                loadDelay = getCriteria(ZCWA.criteria,"on enter_"); //No I18N
                if(loadDelay != null && !(isFormVisible()) && getZCookie("zc_cu") != null && (checkCookie("zc_vopt",ZCWA_WA[i]) == true && checkCookie("zc_copt",ZCWA_WA[i]) == true) && (checkCookie("zc_"+ZCWA.CurrUser+"ach",ZCWA_WA[i]) == true))
                {
                	ZCWA.onLd = true;
                	onLd = true;
                    PopupOpenUtil("WA",i); //No I18N
                    break;
                }
            }
        }
        if(ZCWA_SF.length > 0 && !onLd)
        {
            for(var i=0;i<ZCWA_SF.length;i++)
            {
                ZCWA = ZCWA_SF[i];
                loadDelay = getCriteria(ZCWA.criteria,"on enter_"); //No I18N
                if(loadDelay != null && !(isFormVisible()) && (checkCookie("zc_vopt",ZCWA_SF[i]) == true && checkCookie("zc_copt",ZCWA_SF[i]) == true) && (checkCookie("zc_"+ZCWA.CurrUser+"ach",ZCWA_SF[i]) == true))
                {
                	ZCWA.onLd = true;
                	onLd = true;
                    PopupOpenUtil("SF",i); //No I18N
                    break;
                }
            }
        }
    },loadDelay);
}
 
var PopupPageclspopUpUtil = function(id,overLayNeeded)
{    
    addPopupHistory('close'); //No I18N    
    ZCWA.history = "PopupPageclspopUpUtil"; //No I18N
    var ind = ZCWA.from == "WA" ? ZCWA.WALen : ZCWA.SFLen; //No I18N
    if(overLayNeeded == undefined){
        overLayNeeded = false;
    }
    var element = document.querySelector("#"+id);
    if(element.style.display !== "none")
    {
        // ------ for animation --------- 
        var op = 1; // initial opacity
        var original_opacity = element.style.opacity; 
        if(original_opacity === void 0 || original_opacity == "")
        {
            original_opacity = 1;
        }
        var timer = setInterval(function () {
            if (op <= 0.1) {
                clearInterval(timer);
                element.style.display = 'none'; //No I18N
                element.style.opacity = original_opacity;
                element.style.filter = 'alpha(opacity=' + original_opacity * 100 + ")"; //No I18N
                document.querySelector("#"+id).style.display = "none";
                if(overLayNeeded == false && ZCWA.overlay != "")
                {
                    if(ZCWA.from == "WA")
                    {
                        document.querySelector("#PopupOverLay_WA_"+ind).style.display = "none"; //No I18N
                    }
                    else
                    {
                        document.querySelector("#PopupOverLay_SF_"+ind).style.display = "none"; //No I18N
                    }
                }
                return;
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")"; //No I18N
            op -= op * 0.1;
        }, 25);
 
    }
    var zhPopId = ZCWA.from == "WA" ? "popup_WA_"+ind : "popup_SF_"+ind; //No I18N
    var zhStyle = "";
    if(ZCWA.pos == "TopLeft")
    {
        switch(ZCWA.eff)
        {
            case "SlideFromLeft"    :    zhStyle = "top:10px;right:100%;bottom:100%;left:-100%;"; //No I18N
                                        break;
            case "SlideFromRight"    :    zhStyle = "top:10px;right:-100%;bottom:100%;left:100%;"; //No I18N
                                        break;
            case "SlideFromTop"        :    zhStyle = "top:-100%;right:100%;bottom:100%;left:0%;"; //No I18N
                                        break;
            case "SlideFromBottom"    :    zhStyle = "top:100%;right:100%;bottom:100%;left:0%;"; //No I18N
                                        break;
        }
    }
    if(ZCWA.pos == "TopRight")
    {
        switch(ZCWA.eff)
        {
            case "SlideFromLeft"    :    zhStyle = "top:10px;right:100%;"; //No I18N
                                        break;
            case "SlideFromRight"    :    zhStyle = "top:10px;right:-100%;"; //No I18N
                                        break;
            case "SlideFromTop"        :    zhStyle = "top:-100%;right:0%;"; //No I18N
                                        break;
            case "SlideFromBottom"    :    zhStyle = "top:100%;right:0%;"; //No I18N
                                        break;
        }
    }
    if(ZCWA.pos == "BottomLeft")
    {
        switch(ZCWA.eff)
        {
            case "SlideFromLeft"    :    zhStyle = "top:"+ZCWA.bl+";right:100%;bottom:0%;left:-100%;"; //No I18N
                                        break;
            case "SlideFromRight"    :    zhStyle = "top:"+ZCWA.bl+";right:-100%;bottom:0%;left:100%;"; //No I18N
                                        break;
            case "SlideFromTop"        :    zhStyle = "top:-100%;right:100%;bottom:100%;left:0%;"; //No I18N
                                        break;
            case "SlideFromBottom"    :    zhStyle = "top:100%;right:100%;bottom:-100%;left:0%;"; //No I18N
                                        break;
        }
    }
    if(ZCWA.pos == "BottomRight")
    {
        switch(ZCWA.eff)
        {
            case "SlideFromLeft"    :    zhStyle = "top:"+ZCWA.bl+";right:100%;"; //No I18N
                                        break;
            case "SlideFromRight"    :    zhStyle = "top:"+ZCWA.bl+";right:-100%;"; //No I18N
                                        break;
            case "SlideFromTop"        :    zhStyle = "top:-100%;right:0%;"; //No I18N
                                        break;
            case "SlideFromBottom"    :    zhStyle = "top:100%;right:0%;"; //No I18N
                                        break;
        }
    }
    if(ZCWA.pos == "Center")
    {
        switch(ZCWA.eff)
        {
            case "SlideFromLeft"    :    zhStyle = "left:"+(-ZCWA.width)+"px;"; //No I18N
                                        break;
            case "SlideFromRight"    :    zhStyle = "left:100%;"; //No I18N
                                        break;
        }
    }
    setZhStyles(document.querySelector("#"+zhPopId),zhStyle);
    if(ZCWA.interval && ZCWA.interval != "nolimit_1" && (ZCWA.resp == 0 || ZCWA.afterResp != 1))
    {
        setCookieLifeTime(); // setting when the popup will be shown next time
    }
}
 
function setZhStyles(ele,zhStyle)
{
    var zhStyleArr = zhStyle.split(";");
    /*for(var i=0;i<zhStyleArr.length-1;i++)
    {
        var prop = zhStyleArr[i].split(":");
        var pr = prop[0]
        ele.style.pr = prop[1];
        console.log(ele.style.pr);
        console.log(ele);
    }*/
    for(var i=0;i<zhStyleArr.length;i++)
    {
        var prop = zhStyleArr[i].split(":");
        switch(prop[0])
        {
            case "top"         :    ele.style.top = prop[1];break;
            case "bottom"     :     ele.style.bottom = prop[1];break;
            case "left"     :    ele.style.left = prop[1];break;
            case "right"     :     ele.style.right = prop[1];break;
            case "height"     :    ele.style.height = prop[1];break;
            case "width"     :     ele.style.width = prop[1];break;
            case "opacity"     :    ele.style.opacity = prop[1];break;
        }
    }
}
 
var PopupOpenUtil =function(from,ind)
{
    ZCWA.history = "PopupOpenUtil"; //No I18N
    var height;var width;var tr;var bl;
    var Pos;var Eff;
    
    Pos = ZCWA.pos;
    Eff = ZCWA.eff;
    var zhPopId = {};
    if(from == "WA")
    {
        zhPopId.overlayId = "PopupOverLay_WA_"+ind; //No I18N
        zhPopId.popId = "popup_WA_"+ind; //No I18N
        zhPopId.titleId = "ptitle_WA_"+ind; //No I18N
        zhPopId.clspanId = "pclspan_WA_"+ind; //No I18N
        zhPopId.closeId = "pclose_WA_"+ind; //No I18N
        zhPopId.frameId = "pframe_WA_"+ind; //No I18N
    }
    else
    {
        zhPopId.overlayId = "PopupOverLay_SF_"+ind; //No I18N
        zhPopId.popId = "popup_SF_"+ind; //No I18N
        zhPopId.titleId = "ptitle_SF_"+ind; //No I18N
        zhPopId.clspanId = "pclspan_SF_"+ind; //No I18N
        zhPopId.closeId = "pclose_SF_"+ind; //No I18N
        zhPopId.frameId = "pframe_SF_"+ind; //No I18N
    }
 
    Pos = ZCWA.pos;
    Eff = ZCWA.eff;
    var zhStyle = "";
    var zhPopIdEle = document.querySelector("#"+zhPopId.popId);
    
    if(ZCWA.overlay != "") //if overlay is configured then show the overlay
    {
    	document.querySelector("#"+zhPopId.overlayId).style.display = "block";
    }
    zhPopIdEle.style.display = "block";
    if(document.querySelector("#customForm") != null)
    {
        var hght = parseInt(document.querySelector("#"+zhPopId.popId).querySelector("#customForm").clientHeight);
        var wdth = parseInt(document.querySelector("#"+zhPopId.popId).querySelector("#customForm").clientWidth);
        //zhStyle = "height:"+(hght=(hght+43)+"px")+";width:"+(wdth=(wdth+10)+"px")+";opacity:1;"; //No I18N
        
        if((navigator.userAgent.match(/Android/i)
       		 || navigator.userAgent.match(/webOS/i)
       		 || navigator.userAgent.match(/iPhone/i)
       		 || navigator.userAgent.match(/iPad/i)
       		 || navigator.userAgent.match(/iPod/i)
       		 || navigator.userAgent.match(/BlackBerry/i)
       		 || navigator.userAgent.match(/Windows Phone/i) && (ZCWA.mgFormType==="MagicPopup"))//No I18N
	    ){
            zhStyle = "height:"+(hght=(hght+43)+"px")+";opacity:1;"; //No I18N
	       	width = 0;
        }
       else{
           zhStyle = "height:"+(hght=(hght+43)+"px")+";width:"+(wdth=(wdth+10)+"px")+";opacity:1;"; //No I18N
       		wdth = parseInt(document.querySelector("#"+zhPopId.popId).querySelector("#customForm").clientWidth); //No I18N
           if(window.outerWidth > wdth)
           {
               width=(window.innerWidth-wdth)/2;
           }
	    }
        
        if(window.innerHeight <= document.querySelector("#customForm").clientHeight)
        {
            height = 0;
            bl = 0;
        }
        else
        {
            hght = parseInt(document.querySelector("#"+zhPopId.popId).querySelector("#customForm").clientHeight); //No I18N
            height = (window.innerHeight- (hght-50))/2;
            bl = window.innerHeight-hght-10;
        }
        
        
        
    }
    if(ZCWA.mgFormType!="ElegantForm")
    {
        if(Pos == "TopLeft")
        {
            zhStyle += "top:10px;right:0px;bottom:0px;left:0px;"; //No I18N
        }
        if(Pos == "TopRight")
        {
            zhStyle += "top:10px;right:0%;"; //No I18N
        }
        if(Pos == "BottomLeft")
        {
            zhStyle += "top:"+bl+"px;right:0px;bottom:0px;left:0px;"; //No I18N
        }
        if(Pos == "BottomRight")
        {
            zhStyle += "top:"+bl+"px;right:0px;"; //No I18N
        }
        if(Pos == "Center")
        {
            if(Eff != "SlideFromLeft" || Eff != "SlideFromRight")
            {
                zhStyle += "top:"+height+"px;right:0px;bottom:0px;left:"+width+"px;"; //No I18N
            }
            
            switch(Eff)
            {
                case "SlideFromLeft"    :    zhStyle += "top:"+height+"px;right:0px;bottom:0px;left:"+width+"px;"; //No I18N
                                            break;
                case "SlideFromRight"    :    zhStyle += "top:"+height+"px;right:0px;bottom:0px;left:"+width+"px;"; //No I18N
                                            break;
                case "BounceIn"            :    zhPopIdEle.className = 'zh_animated zh_bounceIn';//No I18N
                                            break;
                case "BounceInDown"        :    zhPopIdEle.className =  'zh_animated zh_bounceInDown';//No I18N
                                            break;
                case "BounceInUp"          :    zhPopIdEle.className = 'zh_animated zh_bounceInUp';//No I18N
                                            break;
                case "FadeIn"              :    zhPopIdEle.className = 'zh_animated zh_fadeIn';//No I18N
                                            break;
                case "FadeInDown"          :    zhPopIdEle.className = 'zh_animated zh_fadeInDown';//No I18N
                                            break;
                case "FadeInUp"            :    zhPopIdEle.className = 'zh_animated zh_fadeInUp';//No I18N
                                            break;
                case "FlipInX"             :    zhPopIdEle.className = 'zh_animated zh_flipInX';//No I18N
                                            break;
                case "FlipInY"             :    zhPopIdEle.className = 'zh_animated zh_flipInY';//No I18N
                                            break;
                case "ZoomIn"              :    zhPopIdEle.className = 'zh_animated zh_zoomIn';//No I18N
                                            break;
            }
        }
    }
    else
    {
        zhPopIdEle.className += 'zh_animated zh_zoomIn'; //No I18N
        zhStyle = "width:100%;height:100%;top:0px;right:0px;bottom:0px;left:0px;"; //No I18N
    }
    setZhStyles(document.querySelector("#"+zhPopId.popId),zhStyle);
    if(zhPopIdEle != null)
    {
        if(ZCWA.interval && ZCWA.interval != "nolimit_1" && ZCWA.afterResp != 1)
        {
            setCookieLifeTime(); // setting when the popup will be shown next time
        }
        addPopupHistory('view'); //No I18N
    }
    if(ZCWA.pType == 1)
    {
    	var MhTimer = setInterval(function () {
            if(document.readyState == "complete")
            {
                clearInterval(MhTimer);
                var tmpFunc = new Function(document.querySelector("#"+zhPopId.frameId).querySelector("#zcOptinCleanJS").getAttribute("onload"));
                tmpFunc();//console.log("tmpFunc",tmpFunc)
            }
        },250)
    }
    
}

function _setMkPopup(zhPopId,ZCWA)
{
	ZCWA.history = "_setMkPopup"; //No I18N
	var zhframe = document.querySelector("#"+zhPopId.frameId);
	var popBtn = zhframe.querySelector("#mkPopupBtn"); //No I18N
	var mkAction = zhframe.querySelector("#ZCMH_actionType").value; //No I18N
	var mkPopupId =zhframe.querySelector("#ZCMH_mkPopup_Id").value; //No I18N
	var afterResp = zhframe.querySelector("#ZCMP_afterResp").value; //No I18N    /*0 - don't show again the popup after clicked, 1 - show again after the popup the clicked.*/
	ZCWA.afterResp = afterResp; 
	if(mkAction == 1)
	{
		var mkWindow = zhframe.querySelector("#ZCMH_actionWindow").value; //No I18N
		var mkUrl = zhframe.querySelector("#ZCMH_redirectURL").value; //No I18N
		var windowVar = mkWindow == 0 ? "_self" : "_blank"; //No I18N
		
		if(window.addEventListener)
		{
			popBtn.addEventListener('click',function(){
				addPopupHistory('response'); //No I18N
				window.open(mkUrl,windowVar);
			});			
		}
		else
		{
			popBtn.attachEvent('click',function(){
				addPopupHistory('response'); //No I18N
				window.open(mkUrl,windowVar);
			});			
		}
	}
	else
	{
		var mkPinfoId = zhframe.querySelector("#ZCMH_pInfo_Id").value; //No I18N
		if(window.addEventListener)
		{
			popBtn.addEventListener('click',function(){
		        PopupPageclspopUpUtil(mkPinfoId);
		    });	
		}
		else
		{
			popBtn.attachEvent('click',function(){
		        PopupPageclspopUpUtil(mkPinfoId);
		    });				
		}		
	}
}
