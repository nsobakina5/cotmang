/* $Id$ */
var cookieEnabled = navigator.cookieEnabled;
if(window.addEventListener)
{
	window.addEventListener('hashchange', function(){
		oReq(document.title,true); 
	});
}
else
{
	window.attachEvent('hashchange',function(e){
		oReq(document.title,true); 
	});
}
var isEventCompleted = true;
var ZHUB = 1;
var ZH_URL = "mh.zoho.com"; //No I18N
var ZC_RedirUrl = "maillist-manage.com"; //No I18N
var pro = "http"+":"; //No I18N
var ajaxUrl = "";
var stringParams = "";
var userHasScrolledX = true;
var isCurrentTab = true;
var viewedCountEntry1;
var exp_date = new Date();
exp_date.setTime(exp_date.getTime()+(365*24*60*60*1000));
var old_fpCookie = getZCookie("zc_cu");//No I18N
if(old_fpCookie != null)
{
	document.cookie = "zc_cu="+old_fpCookie+";expires="+exp_date.toGMTString()+"; path=/";
}
var singlepageapp = {}; 
singlepageapp.lastlocation = window.location.href;
(function(history) 
{
    if (!history || !history.pushState || typeof history.pushState !== "function") {
        //console.log("History api not supported. Tracking single apps tracking disabled.");
        return
    }
    var onRouteChange = function() 
    {
        if (singlepageapp.lastlocation != window.location.href) {
            singlepageapp.lastlocation = window.location.href;
            window.setTimeout(function() {
                oReq(document.title,true); 
            }, 100);
        }
    };
    var pushstate = history.pushState;
    history.pushState = function(state) {
        pushstate.apply(history, arguments);
        onRouteChange({
            state: state
        });
    };
    window.removeEventListener('popstate',onRouteChange);
    window.addEventListener('popstate',onRouteChange);
}(window.history));
function loadwaprops(zwaid,zwauid,zwaod,zwad,zwv)
{
    var d = document;
    if(d.querySelector('meta[name="zwaid"]'))
    {
       var b = d.querySelector("meta[name='zwaid']").getAttribute("content"); //No I18N
       d.querySelector("meta[name='zwaid']").setAttribute("content",b+","+zwaid); //No I18N
       b = d.querySelector("meta[name='zwauid']").getAttribute("content"); //No I18N
       d.querySelector("meta[name='zwauid']").setAttribute("content",b+","+zwauid); //No I18N
       b=d.querySelector("meta[name='zwaod']").getAttribute("content");d.querySelector("meta[name='zwaod']").setAttribute("content",b+","+zwaod); //No I18N
       b=d.querySelector("meta[name='zwad']").getAttribute("content");d.querySelector("meta[name='zwad']").setAttribute("content",b+","+zwad); //No I18N
       b=d.querySelector("meta[name='zwv']").getAttribute("content");d.querySelector("meta[name='zwv']").setAttribute("content",b+zwv); //No I18N
       
       d.querySelector("meta[name='tmpzwaid']").setAttribute("content",zwaid); //No I18N
       d.querySelector("meta[name='tmpzwauid']").setAttribute("content",zwauid); //No I18N
       d.querySelector("meta[name='tmpzwaod']").setAttribute("content",zwaod); //No I18N
       d.querySelector("meta[name='tmpzwad']").setAttribute("content",zwad); //No I18N
       d.querySelector("meta[name='tmpzwv']").setAttribute("content",zwv); //No I18N
    }
    else
    {
        var z=d.createElement('meta');
        z.setAttribute("content",zwaid);
        z.setAttribute("name","zwaid");
        var y=d.createElement('meta');
        y.setAttribute("content",zwauid);
        y.setAttribute("name","zwauid");
        var x=d.createElement('meta');
        x.setAttribute("content",zwaod);
        x.setAttribute("name","zwaod");
        var w=d.createElement('meta');
        w.setAttribute("content",zwad);
        w.setAttribute("name","zwad");
        var v=d.createElement('meta');
        v.setAttribute("content",zwv);
        v.setAttribute("name","zwv");
        
        var z1=d.createElement('meta');
        z1.setAttribute("content",zwaid);
        z1.setAttribute("name","tmpzwaid");
        var y1=d.createElement('meta');
        y1.setAttribute("content",zwauid);
        y1.setAttribute("name","tmpzwauid");
        var x1=d.createElement('meta');
        x1.setAttribute("content",zwaod);
        x1.setAttribute("name","tmpzwaod");
        var w1=d.createElement('meta');
        w1.setAttribute("content",zwad);
        w1.setAttribute("name","tmpzwad");
        var v1=d.createElement('meta');
        v1.setAttribute("content",zwv);
        v1.setAttribute("name","tmpzwv");
     
        d.getElementsByTagName("head")[0].appendChild(z);
        d.getElementsByTagName("head")[0].appendChild(y);
        d.getElementsByTagName("head")[0].appendChild(x);
        d.getElementsByTagName("head")[0].appendChild(w);
        d.getElementsByTagName("head")[0].appendChild(v);
        d.getElementsByTagName("head")[0].appendChild(z1);
        d.getElementsByTagName("head")[0].appendChild(y1);
        d.getElementsByTagName("head")[0].appendChild(x1);
        d.getElementsByTagName("head")[0].appendChild(w1);
        d.getElementsByTagName("head")[0].appendChild(v1);
    }           
   if(cookieEnabled)
   {
	oReq(document.title);
   }
}
 
var serializeMHJson = function (json) {
    if (json === void 0) { json = {}; }
    var keys = Object.keys(json);
    var serializedJson = "";
    for (var i = 0; i < keys.length; i++) {
        var val = json[keys[i]];
        if(typeof val == "object")
        {
            serializedJson += keys[i] + "=" + encodeURI(JSON.stringify(val));
        }
        else
        {
            serializedJson += keys[i] + "=" + val;
        }
        
        serializedJson += "&";
    }
    return serializedJson.substring(0, serializedJson.length - 1);
};
 
function makeAjaxReq(ajaxUrl)
{
    var scriptElement = document.createElement("script");
    scriptElement.setAttribute("src", ajaxUrl); 
    scriptElement.setAttribute("id", "jsonp"); 
    //scriptElement.setAttribute("Content-Type","application/javascript");
    var oldScriptElement= document.getElementById("jsonp"); 
    var head = document.getElementsByTagName("head")[0]; 
    if(oldScriptElement == null) {          
        head.appendChild(scriptElement); 
    } 
    else { 
        head.replaceChild(scriptElement, oldScriptElement);  
    }  
}
 
function processData(msg)
{
    var isDomainSaved = msg.isDomainSaved;
    if(isDomainSaved === true)
    {
        var protocol = window.location.protocol;
        if(protocol.indexOf("http") < 0)
        {
            protocol = "http"+":";//No I18N
        }
        window.location.href=protocol+"//"+ZH_URL+"/marketinghub/WebAutoClose.do";
    } 
}
 
function createPopupScript()
{
var newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    if (newScript.readyState)
    {
     newScript.onreadystatechange = function(){
      if (newScript.readyState=="loaded"||newScript.readyState == "complete")
            {
       try{
        loadPopupProps('',document.querySelector("meta[name='zwauid']").getAttribute("content")); //No I18N
       }
       catch(e){}                             
            }
     }            
    }
    else 
    {
        newScript.onload = function(){
            loadPopupProps('',document.querySelector("meta[name='zwauid']").getAttribute("content")); //No I18N
        };
    }
    newScript.async = true;
    newScript.src = 'https://'+ZH_URL+'/hub/js/MagicPopup.js?t='+new Date().getTime();
    return newScript;
}

function zmhOnloadCallback(){
	var newScript = createPopupScript();
	document.getElementsByTagName('head')[0].appendChild(newScript);
    ZHUB = 0;
}


function oReq(value,isHashChng) {
    var zcConsent = getZCookie("zc_consent"); //No I18N
    if(zcConsent == null)
    {
      document.cookie = "zc_consent=1; expires="+exp_date.toGMTString()+"; path=/";
      document.cookie = "zc_show=0; expires="+exp_date.toGMTString()+"; path=/";
    }
    if(ZHUB == 1)
    {
       if (["complete"].indexOf(document.readyState) !== -1)
       {
    	   zmhOnloadCallback();
       }	
       else
       {	   
    	   window.removeEventListener('load', zmhOnloadCallback);
       	   window.addEventListener('load', zmhOnloadCallback);
       }
       
    }
    var webAutoIds = document.querySelector("meta[name='zwaid']").getAttribute("content"); //No I18N
    if(webAutoIds == undefined) //to resolve conflict b/w old and new scripts
    {
        return false;
    }
    var zuids = document.querySelector("meta[name='zwauid']").getAttribute("content"); //No I18N
    var domainIds = document.querySelector("meta[name='zwaod']").getAttribute("content"); //No I18N
    var domains = document.querySelector("meta[name='zwad']").getAttribute("content"); //No I18N
    var ref= document.referrer;
    var parentUrl=window.location.href;
    var arrParams = parentUrl.split("?");
    var arrURLParams=new Array();
    var url=arrParams[0];
    var testBoolean = false;
    var testId = "";
    var entity = "";
    var customerID ="";
    var socialshare=null;
    var productId = null;
    var abandonedCartId = null;
    var cmpContentId = null;
    var protocol = window.location.protocol;
    var aliasDomain = "";
    var aliasDomainBoolean = false;
    var smsCmpId = "";
    if(protocol.indexOf("http") < 0)
    {
        protocol = "http"+":";//No I18N
    }
    if(arrParams[1])
    {
        arrURLParams = arrParams[1].split("&");
        var len=arrURLParams.length;
        for(var i=0;i<len;i++)
        {
             var sParam =  arrURLParams[i].split("=");
             if(sParam[0] == "test")
             {
                testId = sParam[1];
                testBoolean = true;
                //break;
             }
             if(sParam[0] === "entity")
             {
                 entity=sParam[1]; 
             }
            if(sParam[0] == "aliasDomain")
            {
               aliasDomain =sParam[1]; 
               aliasDomainBoolean = true;
               break; 
            }
             if(sParam[0] == "campId")
             {
               document.cookie = 'zcs='+sParam[1];
             }
             if(sParam[0] == "socialshare")
             {
               socialshare=sParam[1];
             }
             if(sParam[0]=='cntnId')
             {
                 document.cookie = 'zcnt='+sParam[1];
             }   
             if(sParam[0] == "productId")
             {
                 productId=sParam[1];
             }
             if(sParam[0] == "AbandonedCartId")
             {
                 abandonedCartId =sParam[1];
             }
             if(sParam[0] == "cntId")
             {
                 cmpContentId =sParam[1];
             }   
             else if(sParam[0] == "custId")
             {
                var webCookie = getZCookie("zcc"); //No I18N
                if(webCookie != null)
                {
                    if(webCookie.indexOf(sParam[1]) === -1)
                    {
                        document.cookie = 'zcc='+webCookie+","+sParam[1]+";expires="+exp_date.toGMTString()+"; path=/";
                    }
                }
                else 
                {
                    document.cookie = 'zcc='+sParam[1]+";expires="+exp_date.toGMTString()+"; path=/";
                }
                customerID = sParam[1];
             }
             if(sParam[0]=='smsCmpId')
             {
            	 smsCmpId=sParam[1];
             } 
        }
    }
    if(testId == undefined || testId == "undefined" || testId == "")
    {
        testId = domainIds;
    } 
    if(testBoolean === true)
    {
        var tmpdomainId = document.querySelector("meta[name='tmpzwaod']").getAttribute("content"); //No I18N
        if(tmpdomainId.indexOf(testId)>-1 || aliasDomainBoolean === true)
        {
            domainIds=domainIds.split(",");
            for(var i=0;i<domainIds.length;i++)
            {
                var domainId=domainIds[i];
                var actionData ="&orgDomainId="+testId+"&entity="+entity+"&url="+encodeURIComponent(url)+"&scriptDomainId="+domainId; //No I18N
                actionData=actionData+"&action=viewed"+"&reqType="+0+"&aliasDomain="+aliasDomainBoolean; //No I18N
                if(value != null && value != "")
                {
                    actionData=actionData+"&value="+encodeURIComponent(value); //No I18N
                }
                ajaxUrl = protocol+"//"+ZH_URL+"/marketinghub/AuthenticateDomain.do"+"?callback=processData"+actionData; //No I18N
                makeAjaxReq(ajaxUrl);
            }
        }
    }
    else if(getZCookie("zc_consent") == 1)
    {
        if(isHashChng != undefined)
        {
            webAutoIds=webAutoIds.split(",");
            zuids=zuids.split(",");
            // zsoids=zsoids.split(",");
            domainIds=domainIds.split(",");
            domains=domains.split(",");
        }
        else
        {
            webAutoIds=new Array(document.querySelector("meta[name='tmpzwaid']").getAttribute("content"));
            zuids=new Array(document.querySelector("meta[name='tmpzwauid']").getAttribute("content"));
            // zsoids=zsoids.split(",");
            domainIds=new Array(document.querySelector("meta[name='tmpzwaod']").getAttribute("content"));
            domains=new Array(document.querySelector("meta[name='tmpzwad']").getAttribute("content"));
        }
        ref=ref.split(",");
        var campaignId=getZCookie("zcs"); //No I18N
        var cmpContentId =getZCookie("zcnt"); //No I18N             
        var date = new Date();
        var startTime = date.getTime();
        for(var i=0;i<webAutoIds.length;i++)
        {
            var webAutoId=webAutoIds[i];
            var zuid=zuids[i];
            // var zsoid=zsoids[i];
            var domainId=domainIds[i];
            var domain=domains[i];
            var actionData = "";
            if(ref !== undefined && ref !== "")
            {
                actionData = "&webAutoId="+webAutoId+"&zuid="+zuid+"&domain="+domain+"&orgDomainId="+domainId+"&reqType="+0+"&ref="+encodeURIComponent(ref)+"&socialshare="+socialshare; //No I18N
            }
            else
            {
                actionData = "&webAutoId="+webAutoId+"&zuid="+zuid+"&domain="+domain+"&orgDomainId="+domainId+"&reqType="+0+"&socialshare="+socialshare;//No I18N
            }
 
            if(campaignId != null && campaignId != "")
            {
                actionData=actionData+"&campaignId="+campaignId; //No I18N
            }
            if(cmpContentId != null && cmpContentId != "")
            {
                 actionData=actionData+"&contentId="+cmpContentId; //No I18N
            }   
            if(value != null && value != "")
            {
                actionData=actionData+"&value="+encodeURIComponent(value); //No I18N
            }
            if(productId != null)
            {
                actionData=actionData+"&productId="+productId; //No I18N
            }
            if(abandonedCartId != null)
            {
                actionData=actionData+"&abandonedCartId="+abandonedCartId; //No I18N
            }
            if(cmpContentId != null)
            {
                actionData=actionData+"&cmpContentId="+cmpContentId; //No I18N
            }
            if(smsCmpId != null && smsCmpId != "")
            {
            	 actionData=actionData+"&smsCmpId="+smsCmpId; //No I18N
            }
            var action="viewed"; //No I18N
            actionData=actionData+"&action="+encodeURIComponent(action); //No I18N
            var custId = getZCookie("zcc"); //No I18N
            var sessionId = getZCookie("zcsc"); //No I18N
            //first party cookie
            var fpCookie = getZCookie("zc_cu");//No I18N
            if(fpCookie != null)
            {
                actionData = actionData+"&zc_cu="+fpCookie;//No I18N
            }
            var sessionCookie = getZCookie("zc_ssid");//No I18N
            var ssClsCookie = getZCookie("zc_sscls");//No I18N
            var clss =  window.localStorage.getItem('zc_cls');//No I18N
            var ssAlive = getZCookie("ssalive");//No I18N
            var zc_cu_exp = getZCookie("zc_cu_exp");//No I18N
            if(zc_cu_exp != null)
            {
                actionData = actionData+"&zc_cu_exp="+zc_cu_exp;//No I18N
            }
            var zc_tp = getZCookie("zc_tp");//No I18N
            if(zc_tp != null)
            {
                actionData = actionData+"&zc_tp="+zc_tp;//No I18N
            }
            /*if( sessionStorage.getItem('clsItem')== null && ssClsCookie != null)
            {
                var sssplit;
                if(ssAlive != null )
                {
                    sssplit = ssAlive.split("_s");
                    count = sssplit[1];
                    if(count == 1)
                    {
                        actionData = actionData+"&zc_ssid="+sessionCookie;//No I18N
                        actionData = actionData+"&ssalive="+ssAlive;//No I18N
                    }
                    else if(count == -1)
                    {
                        document.cookie = "zc_ssid" + '=;expires='+exp_date.toGMTString()+';';
                        document.cookie = "ssalive" + '=;expires='+exp_date.toGMTString()+';';
                        document.cookie = "zc_sscls" + '=;expires='+exp_date.toGMTString()+';';
                        window.localStorage.setItem('zc_cls','false');//No I18N
                    }
                }
            }
            else if(sessionStorage.getItem('clsItem') != null && ssClsCookie != null)
            {
                actionData = actionData+"&zc_ssid="+sessionCookie;//No I18N
                actionData = actionData+"&sameSession=true";//No I18N
                var count=0;
                actionData = actionData+"&ssalive="+sessionCookie+"_s"+count;//No I18N
            }   
            else
            {
                if(window.localStorage.getItem('zc_cls') == true)
                {
                    if(sessionCookie != null && sessionStorage.getItem("my_session"))
                    {
                        actionData = actionData+"&zc_ssid="+sessionCookie;//No I18N
                    }
 
                    if(ssAlive != null && ssAlive != '')
                    {
                        actionData = actionData+"&ssalive="+ssAlive;//No I18N
                    }
                }
                else
                {
                    if(sessionCookie != null )
                    {
                        actionData = actionData+"&zc_ssid="+sessionCookie;//No I18N
                    }
                    var ssAlive = getZCookie("ssalive");//No I18N
                    if(ssAlive != null && ssAlive != '')
                    {
                        actionData = actionData+"&ssalive="+ssAlive;//No I18N
                    }
                    else
                    {
                        document.cookie = "zc_ssid" + '=;expires='+exp_date.toGMTString()+';';
                    }
                }
            }*/
            actionData = actionData+"&url="+encodeURIComponent(url);//No I18N
            actionData = actionData+"&parentUrl="+encodeURIComponent(parentUrl);//No I18N
            if(customerID != null && customerID != "")
            {
                actionData=actionData+"&customerID="+customerID; //No I18N
            }   
            var paramData = actionData;
            var myStorage = sessionStorage;
            if(sessionCookie != null)
            {
                sessionStorage.setItem('my_session', sessionCookie);//No I18N
                sessionStorage.setItem('sessiontrack', 'true');//No I18N
            }
            ajaxUrl = protocol+"//"+ZC_RedirUrl+"/wa/ActionLogger"+"?callback=processData"+paramData; //No I18N
            makeAjaxReq(ajaxUrl);
        }
    }
}
 
 
function zcAction(action,value)
{
	
   if((( action != null && action != "") || ( value != null && value != "")) && cookieEnabled)
    {
        var webAutoIds = document.querySelector("meta[name='zwaid']").getAttribute("content"); //No I18N
        var zuids = document.querySelector("meta[name='zwauid']").getAttribute("content"); //No I18N
        // var zsoids = $("meta[name='zsoid']").attr("content");
        var domainIds = document.querySelector("meta[name='zwaod']").getAttribute("content"); //No I18N
        var domains = document.querySelector("meta[name='zwad']").getAttribute("content"); //No I18N
        var parentUrl=window.location.href;
        var arrParams = parentUrl.split("?");
        var arrURLParams=new Array();
        var url=arrParams[0];
        var testBoolean = false;
        var testId = "";
        var protocol = window.location.protocol;
        var customerID = "";
        if(protocol.indexOf("http") < 0)
        {
            protocol = "http"+":";//No I18N
        }
        if(arrParams[1])
        {
            arrURLParams = arrParams[1].split("&");
            var len=arrURLParams.length;
            for(var i=0;i<len;i++)
            {
                 var sParam =  arrURLParams[i].split("=");
                 if(sParam[0] == "test")
                 {
                    testId = sParam[1];
                    testBoolean = true;
                    break;
                 }
                 if(sParam[0] == "campId")
                 {
                   document.cookie = 'zcs='+sParam[1];
                 }
                 else if(sParam[0] == "custId")
                 {
                    var webCookie = getZCookie("zcc"); //No I18N
                    if(webCookie != null)
                    {
                        if(webCookie.indexOf(sParam[1]) === -1)
                        {
                            document.cookie = 'zcc='+webCookie+","+sParam[1]+";expires="+exp_date.toGMTString()+"; path=/";
                        }
                    }
                    else 
                    {
                        document.cookie = 'zcc='+sParam[1]+";expires="+exp_date.toGMTString()+"; path=/";
                    }
                    customerID = sParam[1];
                 }
            }
        }
        if(testBoolean === true)
        {
            if(domainIds.indexOf(testId)>-1)
            {
                var actionData ="&orgDomainId="+testId+"&url="+encodeURIComponent(url); //No I18N
                actionData=actionData+"&action="+action+"&reqType="+1; //No I18N
                if(value != null && value != "")
                {
                    actionData=actionData+"&value="+value; //No I18N
                }
                ajaxUrl = protocol+"//"+ZC_RedirUrl+"/marketinghub/AuthenticateDomain.do"+"?callback=processData"+actionData; //No I18N
                isEventCompleted = false;
                var isBeaconReqSent = false;
                try
                {
                	isBeaconReqSent = navigator.sendBeacon(ajaxUrl);
                	if(isBeaconReqSent) {
                    	isEventCompleted = true;
                	}
                }
                catch(e)
                {
                	isEventCompleted = false;
                }
                if( isBeaconReqSent == false )
                {	
                	isEventCompleted = false;
                	makeAjaxReq(ajaxUrl);
                }
            }
        }
        else if(getZCookie("zc_consent")==1)
        {
            webAutoIds=webAutoIds.split(",");
            zuids=zuids.split(",");
            // zsoids=zsoids.split(",");
            domainIds=domainIds.split(",");
            domains=domains.split(",");
            var campaignId=getZCookie("zcs"); //No I18N
            var cmpContentId =getZCookie("zcnt"); //No I18N           
            // var campaignId=$.cookie("zcs"); //No I18N
            for(var i=0;i<webAutoIds.length;i++)
            {
                var webAutoId=webAutoIds[i];
                var zuid=zuids[i];
                // var zsoid=zsoids[i];
                var domainId=domainIds[i];
                var domain=domains[i];
                var actionData ="&webAutoId="+webAutoId+"&zuid="+zuid+"&domain="+domain+"&orgDomainId="+domainId+"&reqType="+1; //No I18N
                if(campaignId != null && campaignId != "")
                {
                    actionData=actionData+"&campaignId="+campaignId; //No I18N
                }
                if(cmpContentId != null && cmpContentId != "")
                {
                     actionData=actionData+"&contentId="+cmpContentId; //No I18N
                }   
                if(action != null && action != "")
                {
                    actionData=actionData+"&action="+action; //No I18N
                }
                if(value != null && value != "")
                {
                    actionData=actionData+"&value="+value; //No I18N
                }
                var fpCookie = getZCookie("zc_cu");//No I18N
                if(fpCookie != null)
                {
                    actionData = actionData+"&zc_cu="+fpCookie;//No I18N
                }
                var sessionCookie = getZCookie("zc_ssid");//No I18N
                var ssAlive = getZCookie("ssalive");//No I18N
                var sssplit;
                if(ssAlive != null )
                {
                    sssplit = ssAlive.split("_s");
                    count = sssplit[1];
                    if(count == 1)
                    {
                        actionData = actionData+"&zc_ssid="+sessionCookie;//No I18N
                        actionData = actionData+"&ssalive="+ssAlive;//No I18N
                    }
                }
                var zc_cu_exp = getZCookie("zc_cu_exp");//No I18N
                if(zc_cu_exp != null)
                {
                    actionData = actionData+"&zc_cu_exp="+zc_cu_exp;//No I18N
                }
                var zc_tp = getZCookie("zc_tp");//No I18N
                if(zc_tp != null)
                {
                    actionData = actionData+"&zc_tp="+zc_tp;//No I18N
                }
                var custId = getZCookie("zcc"); //No I18N
                var sessionId = getZCookie("zcsc"); //No I18N
                actionData = actionData+"&url="+encodeURIComponent(url);//No I18N
                actionData = actionData+"&parentUrl="+encodeURIComponent(parentUrl);//No I18N
                if(customerID != null && customerID != "")
                {
                    actionData=actionData+"&customerID="+customerID; //No I18N
                }
                paramData = actionData;
                var myStorage = sessionStorage;
                ajaxUrl = protocol+"//"+ZC_RedirUrl+"/wa/ActionLogger"+"?callback=processData"+paramData; //No I18N
                isEventCompleted = false;
                var isBeaconReqSent = false;
                try
                {
                	isBeaconReqSent = navigator.sendBeacon(ajaxUrl);
                	if(isBeaconReqSent) {
                    	isEventCompleted = true;
                	}
                }
                catch(e)
                {
                	isEventCompleted = false;
                }
                if( isBeaconReqSent == false )
                {	
                	isEventCompleted = false;
                	makeAjaxReq(ajaxUrl);
                } 
            }
        }
    }
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
    var zc_cu = getZCookie("zc_cu");//No I18N
    if(zc_cu != null)
    {
        var tmp = zc_cu.split("_");
        var replaced = false;
        var webAutoId = visitorCookie.split("-")[0];
        for(var i=0;i<tmp.length;i++)
        {
            if(tmp[i].indexOf(webAutoId) > -1)
            {
                //zc_cu.replace(tmp[i].split("-")[1],visitorCookie.split("-")[1]);
                /*(var a = tmp[i].split("-")[1];
                var b = visitorCookie.split("-")[1]
                zc_cu = zc_cu.replace(a,b);*/
                visitorCookie = zc_cu.replace(tmp[i],visitorCookie);
                replaced = true;
                break;
            }
        }
        if(!replaced)
        {
            visitorCookie = zc_cu+"_"+visitorCookie;
        }
    }
    document.cookie = "zc_cu="+visitorCookie+";expires="+exp_date.toGMTString()+"; path=/";
    isEventCompleted = true;
}
 
function zcVisitorExpCallback(data)
{
    var resultData = JSON.parse(JSON.stringify(data));
    var visitorCookie = resultData.zc_cu_exp;
    document.cookie = "zc_cu_exp="+visitorCookie+";expires="+exp_date.toGMTString()+"; path=/";
    isEventCompleted = true;
}
 
function setZhAttributes(ele, attrs) 
{
    for(var key in attrs) 
    {
        ele.setAttribute(key, attrs[key]);
    }
}
 
function zc_cookie_notice(data)
{
     var zc_show = getZCookie("zc_show"); //No I18N
     var resultData = JSON.parse(JSON.stringify(data));
     var firstTimeVisit = resultData.firstTimeVisit;
     var style = resultData.style;
     var styleParams=new Array();
     styleParams = style.split("$");
     var bannerstatus= styleParams[0];
     var bannermsg = decodeURIComponent(styleParams[1]).split('+').join(' ');
     var fontfamily= styleParams[2];
     var buttonbgcolor= styleParams[3];
     var buttonfontcolor= styleParams[4];
     var leftpadding= styleParams[5];
     var rightpadding = styleParams[6];
     var buttonfontsize = styleParams[7];
     var buttontext1 = styleParams[8];
     var buttontext2 = styleParams[9];
     var bannerbgcolor = styleParams[10];
     var bannerfontcolor = styleParams[11];
     var bannerfontsize = styleParams[12];
     var optbutton = styleParams[13];
     var lnkoptbtn = styleParams[14];
     var pos = styleParams[17];
     var display ="none"; //No I18N
     var lnkdisplay ="none"; //No I18N
     var position ="bottom: 0px;"; //No I18N
     if(lnkoptbtn == "true")
     {
         lnkdisplay = "inline"; //No I18N
     }
     if(optbutton == "true")
     {
         display = "inline"; //No I18N
     }
     if(firstTimeVisit=="true"){
         document.cookie = "zc_show=1; expires="+exp_date.toGMTString()+"; path=/";
         zc_show =1;
     }
     if(pos =="true")
     {
         position ="top: 0px;" //No I18N
     }
     if(zc_show ==1 && bannerstatus=="true" && document.querySelector("#wa_notice") == null)
     {
        var parent = document.createElement("div");
        setZhAttributes(parent,{"id":"zc_notice","name":"zc_notice","style":"position: fixed; z-index: 2247483647 !important; opacity:0.85;"+position+"left: 0px; right: 0px; border:solid 0px #111; background-color:"+bannerbgcolor+";padding:15px; line-height:1.6; font-family:"+fontfamily+";"}); //No I18N
        var ele = document.createElement("a");
        setZhAttributes(ele,{"style":"display:"+lnkdisplay+";padding:5px;color:inherit;","target":"_blank","href":styleParams[16]}); //No I18N
        var ele1 = document.createElement("u");
        ele1.setAttribute("id","lnkopt");
        ele1.innerHTML = styleParams[15];
        ele.appendChild(ele1);
        
        ele1 = document.createElement("span");
        setZhAttributes(ele1,{"id":"wa_notice","style":"width:calc(100% - "+wval+"px); float:left; color:"+bannerfontcolor+";font-size:"+bannerfontsize+";"}); //No I18N
        ele1.innerHTML = bannermsg;
        ele1.appendChild(ele);
        parent.appendChild(ele1);
 
        ele1 = document.createElement("span");
        ele1.setAttribute("style","text-align: right;float: right;");
        ele = document.createElement("input");
        setZhAttributes(ele,{"id":"denybutton","style":"display:"+display+"; background-color:"+buttonbgcolor+";color:"+buttonfontcolor+";padding:"+leftpadding+" "+rightpadding+";font-size:"+buttonfontsize+";font-family:"+fontfamily+"; border:solid 0px #fff; border-radius:2px; cursor:pointer; margin-left:10px;","value":buttontext2,"type":"button","onclick":"zc_deny()"}); //No I18N
        ele1.appendChild(ele);
        parent.appendChild(ele1);
 
        ele1 = document.createElement("span");
        ele1.setAttribute("style","text-align: right;float: right;");
        ele = document.createElement("input");
        setZhAttributes(ele,{"id":"acceptbutton","style":"background-color:"+buttonbgcolor+";color:"+buttonfontcolor+";padding:"+leftpadding+" "+rightpadding+";font-size:"+buttonfontsize+";font-family:"+fontfamily+";border:solid 0px #fff; border-radius:2px; cursor:pointer;","value":buttontext1,"type":"button","onclick":"zc_accept()"}); //No I18N
        ele1.appendChild(ele);
        parent.appendChild(ele1);
 
        ele = document.querySelector('body'); //No I18N
        ele.insertBefore(parent,ele.firstChild);
 
	var _screenWidth = screen.width;
	var isSmallWindow = _screenWidth < 948?true:false; 
        var  wval = 55 + document.querySelector("#acceptbutton").clientWidth; //No I18N
        if(optbutton == "true")
        {
            wval = wval + document.querySelector("#denybutton").clientWidth + 70; //No I18N
        }
	if(isSmallWindow){wval=0}
        document.querySelector("#wa_notice").style.width = "calc(100% - "+wval+"px)"; //No I18N
     } 
}
 
function zcSessionCloseback(data)
{
    var resultData = JSON.parse(JSON.stringify(data));
    var sessionCookie = resultData.zc_sscls;
    document.cookie = "zc_sscls="+sessionCookie+";expires="+exp_date.toGMTString();
}
 
function zcSessionCallback(data)
{
   /* var resultData = JSON.parse(JSON.stringify(data));
    var visitorCookie = resultData.zc_ssid;
    var domainAlivecheck = resultData.ssalive;
    var bnc_time = resultData.bnc_time;
    var bnc_scrl = resultData.bnc_scrl;
//  var pageTime = resultData.pageTime;
//  var pageScroll = resultData.pageScroll;
    var sessiontrack = resultData.sesstrack;
    document.cookie = "zc_ssid="+visitorCookie+";expires="+exp_date.toGMTString();
    document.cookie = "ssalive="+domainAlivecheck+";expires="+exp_date.toGMTString();
    if(resultData.ssClsCookie != null && resultData.ssClsCookie != '')
    {
        document.cookie = "zc_sscls" + '=;expires='+exp_date.toGMTString()+';';
    }
    sessionStorage.setItem('bnc_time', bnc_time);//No I18N
    sessionStorage.setItem('bnc_scrl', bnc_scrl);//No I18N
//  sessionStorage.setItem('pageTime', pageTime);//No I18N
//  sessionStorage.setItem('pageScroll', pageScroll);//No I18N
    sessionStorage.setItem('sessiontrack', sessiontrack);//No I18N
    fnSetTimer();*/
}
 
function waListSubscribe(contactInfo, listKey)
{
   if(cookieEnabled)
   {
    var dummyContactInfo = contactInfo;
    listKey = listKey.trim();
    var webAutoIds = document.querySelector("meta[name='zwaid']").getAttribute("content"); //No I18N
    webAutoIds = webAutoIds.split(",");
    var webAutoId = webAutoIds[0];
    var protocol = window.location.protocol;
    if(protocol.indexOf("http") < 0)
    {
        protocol = "http"+":";//No I18N
    }
    var zuids = document.querySelector("meta[name='zwauid']").getAttribute("content"); //No I18N
    zuids = zuids.split(",");
    var zuid = zuids[0];
    var domainIds = document.querySelector("meta[name='zwaod']").getAttribute("content"); //No I18N
    domainIds = domainIds.split(",");
    var orgDomainId = domainIds[0];
    if(contactInfo != null && contactInfo !== "" && listKey != null && listKey !== "")
    {
        contactInfo = JSON.parse(JSON.stringify(contactInfo));
        var zc_cu = getZCookie("zc_cu");//No I18N
        var contactParams = {};
        contactParams.listkey = listKey;
        contactParams.resfmt = "JSON";//No I18N
        contactParams.isSubscribeFromWebsite = "true";//No I18N
        contactParams.zuid = zuid;
        contactParams.orgDomainId = orgDomainId;
 
        if(dummyContactInfo["Contact Email"] !== undefined && dummyContactInfo["Contact Email"] !== "" && dummyContactInfo["Contact Email"] !== null)
        {
            contactInfo = getZCFieldCookies(dummyContactInfo);
            //contactInfo = JSON.stringify(contactInfo);
        }
        /*else
        {
            contactInfo=JSON.stringify(contactInfo);
        }*/
        contactParams.contactinfo = contactInfo;
        contactParams.webAutoId = webAutoId;
        stringParams = serializeMHJson(contactParams);
        ajaxUrl = protocol+"//"+ZC_RedirUrl+"/api/setleads"+"?callback=processData&"+stringParams; //No I18N
        makeAjaxReq(ajaxUrl);
    }
}
}

function zcListSubscribe(contactInfo, listKey)
{
   if(cookieEnabled)
	{
    var dummyContactInfo = contactInfo;
    listKey = listKey.trim();
    var webAutoIds = document.querySelector("meta[name='zwaid']").getAttribute("content"); //No I18N
    webAutoIds = webAutoIds.split(",");
    var webAutoId = webAutoIds[0];
    var zuids = document.querySelector("meta[name='zwauid']").getAttribute("content"); //No I18N
    zuids = zuids.split(",");
    var zuid = zuids[0];
    var protocol = window.location.protocol;
    if(protocol.indexOf("http") < 0)
    {
        protocol = "http"+":";//No I18N
    }
    if(contactInfo != null && contactInfo !== "" && listKey != null && listKey !== "")
    {
        contactInfo = JSON.parse(JSON.stringify(contactInfo));
        var zc_cu = getZCookie("zc_cu");//No I18N
        
        var contactParams = {};
        contactParams.listkey = listKey;
        contactParams.resfmt = "JSON";//No I18N
        contactParams.isSubscribeFromWebsite = "true";//No I18N
        if(zc_cu !== null && zc_cu !== "")
        {
            zc_cu = zc_cu.split(",")[0];
            contactParams.zc_cu = zc_cu;
        }
        if(dummyContactInfo["Contact Email"] !== undefined && dummyContactInfo["Contact Email"] !== "" && dummyContactInfo["Contact Email"] !== null)
        {
            contactInfo = getZCFieldCookies(dummyContactInfo);
            //contactInfo = JSON.stringify(contactInfo);
        }
        /*else
        {
            contactInfo=JSON.stringify(contactInfo);
        }*/
        contactParams.contactinfo = contactInfo;
        contactParams.webAutoId = webAutoId;
        contactParams.zuid = zuid;
        stringParams = serializeMHJson(contactParams);
        ajaxUrl = protocol+"//"+ZH_URL+"/api/v1/Mhlistsubscribefromwebsite"+"?callback=processData&"+stringParams; //No I18N
        makeAjaxReq(ajaxUrl);
    }
}
}

function zcListSubscribeCallback(data)
{
 if(cookieEnabled)
	{
    deleteZCFieldCookies();
    var domainIds = document.querySelector("meta[name='zwaod']").getAttribute("content"); //No I18N
    domainIds = domainIds.split(","); 
    var domainId = domainIds[0];
    var protocol = window.location.protocol;
    if(protocol.indexOf("http") < 0)
    {
        protocol = "http"+":";//No I18N
    }
    var parentUrl = window.location.href;
    var arrParams = parentUrl.split("?");
    var arrURLParams = new Array();
    var url = arrParams[0];
    var responseData = JSON.parse(JSON.stringify(data));
    var emailId = responseData.emailid;
    var isNewContact = responseData.isNewContact;
    var listKey = responseData.listId;
    var anonymousCookie = getZCookie("zc_cu");//No I18N
    var sessionCookie = getZCookie("zc_ssid");//No I18N
    var zc_tp = getZCookie("zc_tp");//No I18N
   
    var mappingData = {};
    if(sessionCookie != null && sessionCookie !== "")
    {
        mappingData.sessionCookie = sessionCookie;
    }
    if(anonymousCookie != null && anonymousCookie !== "")
    {
        mappingData.emailid = emailId;
        mappingData.cookie = anonymousCookie;
        mappingData.isFromWebsite = "true";
        mappingData.url = url;
        mappingData.listKey = listKey;
        mappingData.isNewContact = isNewContact;
        mappingData.orgDomainId = domainId;
        if(zc_tp != null)
        {
            mappingData.zc_tp = zc_tp;
        }
        
        stringParams = serializeMHJson(mappingData);
        ajaxUrl = protocol+"//"+ZC_RedirUrl+"/wa/addmappingforanonymousandcontacts"+"?callback=processData&"+stringParams; //No I18N
        makeAjaxReq(ajaxUrl);
    }
}
}

function zcFieldUpdate(json)
{
  if(cookieEnabled)
	{
    var protocol = window.location.protocol;
    var webAutoIds = document.querySelector("meta[name='zwaid']").getAttribute("content"); //No I18N
    webAutoIds = webAutoIds.split(",");
    var webAutoId = webAutoIds[0];
    var zuids = document.querySelector("meta[name='zwauid']").getAttribute("content"); //No I18N
    zuids = zuids.split(",");
    var zuid = zuids[0];
    var param = {};
    if(protocol.indexOf("http") < 0)
    {
        protocol = "http"+":";//No I18N
    }
    var fpCookie1 = getZCookie("zc_cu");//No I18N
    //json = JSON.stringify(json);
    param.zc_cf=json; 
    param.zc_cu=fpCookie1;
    param.webAutoId = webAutoId;
    param.zuid = zuid;
    stringParams = serializeMHJson(param);
    ajaxUrl = protocol+"//"+ZH_URL+"/wa/MhSavecookie"+"?callback=processData&"+stringParams; //No I18N
    makeAjaxReq(ajaxUrl);
}
}

function zcFieldUpdateCallback(data)
{
    var responseData = JSON.parse(JSON.stringify(data));    
    var expiryDate = "expires="+exp_date.toGMTString();//No I18N
    var fieldObj = responseData.fieldObj;
    for(var key in fieldObj)
    {
        var fieldName = key;
        var fieldValue = fieldObj[key];
        document.cookie = "zcf_"+fieldName+"="+fieldValue+";"+expiryDate+";";
    }
}
 
function getZCFieldCookies(contactInfo)
{
    var fields = document.cookie.split(";")
    for(var i=0; i<fields.length; i++)
    {
        var field = fields[i].trim();
        if(field.indexOf("zcf_") === 0)
        {
            var fieldName = field.split("=")[0].split("_")[1];
            var fieldValue = field.split("=")[1];
            contactInfo[fieldName] = fieldValue;
        }
    }
    return contactInfo;
}
 
function deleteZCFieldCookies()
{
    var fields = document.cookie.split(";")
    for(var i=0; i<fields.length; i++)
    {
        var field = fields[i].trim();
        if(field.indexOf("zcf_") === 0)
        {
            var fieldName = field.split("=")[0];
            document.cookie = fieldName+"=expired"+";expires="+exp_date.toGMTString()+";";
        }
    }
}
 
//window.onscroll = function (e)
document.addEventListener('scroll',function(e)
{
//    var domainScroll;
//    if(sessionStorage.getItem("sessiontrack") == "true")
//    {
//        if(sessionStorage.getItem("bnc_scrl"))
//        {
//            domainScroll = parseInt(sessionStorage.getItem("bnc_scrl"));//No I18N
//        }
//        if( sessionStorage.getItem("bounceAction") != "false")
//        {   
//            if(((document.documentElement.clientHeight - document.body.clientHeight)*(domainScroll/100) < window.scrollY)&&userHasScrolledX){
//                userHasScrolledX=false;
//                sessionStorage.setItem("bounceAction",false);//No I18N
//                getPageActionDetails("domain","scroll_"+domainScroll);//No I18N
//            };
//        }
//    }
});
 
function getPageActionDetails(val,val1)
{
    var purpose = val;
    var actionValue = val1;
    var pageAction = false;
    var protocol = window.location.protocol;
    if(protocol.indexOf("http") < 0)
    {
        protocol = "http"+":";//No I18N
    }
    var webAutoIds = document.querySelector("meta[name='zwaid']").getAttribute("content"); //No I18N
    var zuids = document.querySelector("meta[name='zwauid']").getAttribute("content"); //No I18N
    var domainIds = document.querySelector("meta[name='zwaod']").getAttribute("content"); //No I18N
    var domains = document.querySelector("meta[name='zwad']").getAttribute("content"); //No I18N
    var parentUrl=window.location.href; 
    var arrParams = parentUrl.split("?");
    var arrURLParams=new Array();
    var url=arrParams[0];
    
    var hash = url; 
    var hasharr = hash.split("/");
    var value = hasharr[4];
 
    webAutoIds = webAutoIds.split(",");
    zuids = zuids.split(",");
    domainIds = domainIds.split(",");
    domains = domains.split(",");
    var campaignId = getZCookie("zcs"); //No I18N
    var date = new Date();
    var endTime = date.getTime();
    for(var i=0;i<webAutoIds.length;i++)
    {
        var webAutoId = webAutoIds[i];
        var zuid = zuids[i];
        var domainId = domainIds[i];
        var domain = domains[i];
        var actionData ="&webAutoId="+webAutoId+"&zuid="+zuid+"&domain="+domain+"&orgDomainId="+domainId+"&reqType="+0+"&endTime="+endTime; //No I18N
        if(campaignId != null && campaignId != "")
        {
            actionData=actionData+"&campaignId="+campaignId; //No I18N
        }
        var action="viewed"; //No I18N
        if(action != null && action != "")
        {
            actionData=actionData+"&action="+action; //No I18N
        }
        if(value != null && value != "")
        {
            actionData=actionData+"&value="+value; //No I18N
        }
        var fpCookie = getZCookie("zc_cu");//No I18N
        if(fpCookie != null)
        {
                actionData = actionData+"&zc_cu="+fpCookie;//No I18N
        }
        var sessionCookie = getZCookie("zc_ssid");//No I18N
        if(sessionCookie != null)
        {
            actionData = actionData+"&zc_ssid="+sessionCookie;//No I18N
        }
        var custId = getZCookie("zcc"); //No I18N
        var sessionId = getZCookie("zcsc"); //No I18N
        actionData = actionData+"&url="+encodeURIComponent(url);//No I18N
        actionData = actionData+"&parentUrl="+encodeURIComponent(parentUrl);//No I18N
        actionData = actionData+"&mode=pageAction";//No I18N
        actionData = actionData+"&purpose="+purpose;//No I18N
        actionData = actionData+"&actionValue="+actionValue;//No I18N
        paramData = actionData;
        ajaxUrl = protocol+"//"+ZC_RedirUrl+"/wa/ActionLogger"+"?callback=processData"+paramData; //No I18N
        makeAjaxReq(ajaxUrl);
    }
}
 
sessionStorage.setItem("bounceAction",true);//No I18N
function fnSetTimer()
{
    if(sessionStorage.getItem("sessiontrack") == "true")
    {
        if(sessionStorage.getItem("bounceAction") == '' || sessionStorage.getItem("bounceAction") != "false")
        {
            var bntime;
            if(sessionStorage.getItem("bnc_time"))
            {
                bntime = parseInt(sessionStorage.getItem("bnc_time"));//No I18N
            }
            sessionStorage.setItem("viewedTime1","0");//No I18N
            viewedCountEntry1 = window.setInterval(function(){
                aa = new Date();
                var viewedCountTime = parseInt(sessionStorage.getItem("viewedTime1"));//No I18N
                var updatedCount = viewedCountTime+1;
                sessionStorage.setItem("viewedTime1",updatedCount);//No I18N
                if(updatedCount > parseInt(sessionStorage.getItem("bnc_time")) && (sessionStorage.getItem("bounceAction") != "false"))
                {
                    sessionStorage.setItem("bounceAction",false);//No I18N
                    getPageActionDetails("domain","time_"+parseInt(sessionStorage.getItem("bnc_time")));//No I18N
                    window.clearInterval(viewedCountEntry1);
                }
            },1000)
        }
        isCurrentTab = !isCurrentTab;
    }
}
 
function setTabChange()
{
    if(sessionStorage.getItem("sessiontrack") == "true" || getZCookie("zc_consent")==1)
    {
        var protocol = window.location.protocol;
        if(protocol.indexOf("http") < 0)
        {
            protocol = "http"+":";//No I18N
        }
 
        var pageAction = false ;
        var webAutoIds = document.querySelector("meta[name='zwaid']").getAttribute("content"); //No I18N
        var zuids = document.querySelector("meta[name='zwauid']").getAttribute("content"); //No I18N
        var domainIds = document.querySelector("meta[name='zwaod']").getAttribute("content"); //No I18N
        var domains = document.querySelector("meta[name='zwad']").getAttribute("content"); //No I18N
        var parentUrl=window.location.href;
        
        var arrParams = parentUrl.split("?");
        var arrURLParams=new Array();
        var url=arrParams[0];
        
        var hash = url; 
        var hasharr = hash.split("/");
        var value = hasharr[4];
        
        webAutoIds = webAutoIds.split(",");
        zuids = zuids.split(",");
        domainIds = domainIds.split(",");
        domains = domains.split(",");
        var campaignId=getZCookie("zcs"); //No I18N
        for(var i=0;i<webAutoIds.length;i++)
        {
            var startTime;
            var endTime;
            var webAutoId = webAutoIds[i];
            var zuid = zuids[i];
            // var zsoid=zsoids[i];
            var domainId = domainIds[i];
            var domain = domains[i];
            var actionData ="&webAutoId="+webAutoId+"&zuid="+zuid+"&domain="+domain+"&orgDomainId="+domainId+"&reqType="+0+"&checkNewpage=false"; //No I18N
            if(campaignId != null && campaignId != "")
            {
                actionData=actionData+"&campaignId="+campaignId; //No I18N
            }
            if(value != null && value != "")
            {
                actionData=actionData+"&value="+value; //No I18N
            }
            var action="viewed"; //No I18N
            actionData=actionData+"&action="+action; //No I18N
            var custId = getZCookie("zcc"); //No I18N
            var sessionId = getZCookie("zcsc"); //No I18N
            var fpCookie = getZCookie("zc_cu");//No I18N
            if(fpCookie != null)
            {
                actionData = actionData+"&zc_cu="+fpCookie;//No I18N
            }
            var sessionCookie = getZCookie("zc_ssid");//No I18N
            var setTabChange = getZCookie("zc_cls");//No I18N
            var date = new Date();
            actionData = actionData+"&tabswitch=true";//No I18N
            if(setTabChange != null)
            {
                sessionStorage.setItem("bounceAction",true);//No I18N
                startTime = date.getTime();
                actionData = actionData+"&startTime="+startTime+"&pageOpen=true";//No I18N
                document.cookie = "zc_cls" + '=;expires='+exp_date.toGMTString()+';';
                actionData = actionData+"&zc_ssid="+sessionCookie;//No I18N
    //          document.cookie = "zc_ssid" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                actionData = actionData+"&url="+encodeURIComponent(url);//No I18N
                actionData = actionData+"&parentUrl="+encodeURIComponent(parentUrl);//No I18N
                var paramData = actionData;
                ajaxUrl = protocol+"//"+ZC_RedirUrl+"/wa/ActionRevisitLogger"+"?callback=processData"+paramData; //No I18N
                makeAjaxReq(ajaxUrl);
                fnSetTimer();
            }
            else
            {
                endTime = date.getTime();
                actionData = actionData+"&endTime="+endTime+"&pageOpen=false";//No I18N
                actionData = actionData+"&zc_ssid="+sessionCookie;//No I18N
                document.cookie = "zc_cls="+endTime+";expires="+exp_date.toGMTString();
                actionData = actionData+"&url="+encodeURIComponent(url);//No I18N
                actionData = actionData+"&parentUrl="+encodeURIComponent(parentUrl);//No I18N
                var paramData = actionData;
                ajaxUrl = protocol+"//"+ZC_RedirUrl+"/wa/ActionLogger"+"?callback=processData"+paramData; //No I18N
                makeAjaxReq(ajaxUrl);
            }   
        }
    }
}
 
//window.onblur = function() 
//{
//    if(sessionStorage.getItem("sessiontrack") == "true")
//    {
//      setTabChange()
//    }
//};
//window.onfocus = function() 
//{
//    if(sessionStorage.getItem("sessiontrack") == "true")
//    {
//      setTabChange()
//    }
//};
 
window.onbeforeunload = function setCloseCookie(e)
{
    if(sessionStorage.getItem("sessiontrack") == "true")
    {
        e = e || window.event;
        var y = e.pageY || e.clientY;
        var refreshPage = y < 0 ? false : true;
        var pageAction;
        var protocol = window.location.protocol;
        if(protocol.indexOf("http") < 0)
        {
            protocol = "http"+":";//No I18N
        }
        
        var webAutoIds = document.querySelector("meta[name='zwaid']").getAttribute("content"); //No I18N
        var zuids = document.querySelector("meta[name='zwauid']").getAttribute("content"); //No I18N
        // var zsoids = $("meta[name='zsoid']").attr("content");
        var domainIds = document.querySelector("meta[name='zwaod']").getAttribute("content"); //No I18N
        var domains = document.querySelector("meta[name='zwad']").getAttribute("content"); //No I18N
        var parentUrl=window.location.href; 
        var arrParams = parentUrl.split("?");
        var arrURLParams=new Array();
        var url=arrParams[0];
        
        var hash = url; 
        var hasharr = hash.split("/");
        var value = hasharr[4];
 
        webAutoIds = webAutoIds.split(",");
        zuids = zuids.split(",");
        domainIds = domainIds.split(",");
        domains = domains.split(",");
        var campaignId = getZCookie("zcs"); //No I18N
        var date = new Date();
        var endTime = date.getTime();
        for(var i=0;i<webAutoIds.length;i++)
        {
            var webAutoId = webAutoIds[i];
            var zuid = zuids[i];
            var domainId = domainIds[i];
            var domain = domains[i];
            var actionData ="&webAutoId="+webAutoId+"&zuid="+zuid+"&domain="+domain+"&orgDomainId="+domainId+"&reqType="+0+"&endTime="+endTime; //No I18N
            if(campaignId != null && campaignId != "")
            {
                actionData=actionData+"&campaignId="+campaignId; //No I18N
            }
            var action="viewed"; //No I18N
            if(action != null && action != "")
            {
                actionData=actionData+"&action="+action; //No I18N
            }
            if(value != null && value != "")
            {
                actionData=actionData+"&value="+value; //No I18N
            }
            var fpCookie = getZCookie("zc_cu");//No I18N
            if(fpCookie != null)
            {
                    actionData = actionData+"&zc_cu="+fpCookie;//No I18N
            }
            var sessionCookie = getZCookie("zc_ssid");//No I18N
            if(sessionCookie != null)
            {
                    actionData = actionData+"&zc_ssid="+sessionCookie;//No I18N
                    
            }
            var ssAlive = getZCookie("ssalive");//No I18N
            var count;
            if(ssAlive != null )
            {
                ssAlive = ssAlive.split("_s");
                count = ssAlive[1];
            }
            if(count == 1)
            {
                count = count - 2;
                actionData = actionData+"&ssalive="+sessionCookie+"_s"+count;//No I18N
                document.cookie = "zc_cls" + '=;expires='+exp_date.toGMTString()+';';
                document.cookie = "zc_sscls="+sessionCookie+";expires="+exp_date.toGMTString();
                document.cookie = "ssalive="+sessionCookie+"_s"+count+";expires="+exp_date.toGMTString();
                actionData = actionData+"&checkNewPage=true";//No I18N
                window.localStorage.setItem('zc_cls','true');//No I18N
                sessionStorage.setItem('clsItem','yes');//No I18N
                actionData = actionData+"&purpose=domain";//No I18N
                var custId = getZCookie("zcc"); //No I18N
                var sessionId = getZCookie("zcsc"); //No I18N
                actionData = actionData+"&url="+encodeURIComponent(url);//No I18N
                actionData = actionData+"&parentUrl="+encodeURIComponent(parentUrl);//No I18N
                paramData = actionData;
                ajaxUrl = protocol+"//"+ZC_RedirUrl+"/wa/ActionLogger"+"?callback=processData"+paramData; //No I18N
                makeAjaxReq(ajaxUrl);
            }
            else
            {
                count = count - 1;
                document.cookie = "ssalive="+sessionCookie+"_s"+count+";expires="+exp_date.toGMTString();
                window.localStorage.setItem('zc_cls','false');//No I18N
                actionData = actionData+"&purpose=page";//No I18N
                var custId = getZCookie("zcc"); //No I18N
                var sessionId = getZCookie("zcsc"); //No I18N
                actionData = actionData+"&url="+encodeURIComponent(url);//No I18N
                actionData = actionData+"&parentUrl="+encodeURIComponent(parentUrl);//No I18N
                paramData = actionData;
                ajaxUrl = protocol+"//"+ZC_RedirUrl+"/wa/ActionLogger"+"?callback=processData"+paramData; //No I18N
                makeAjaxReq(ajaxUrl);
            }
        }
    }
}
 
var tabChange = (function()
{
    var stateKey, eventKey, keys = {
        hidden: "visibilitychange", //No I18N
        webkitHidden: "webkitvisibilitychange", //No I18N
        mozHidden: "mozvisibilitychange", //No I18N
        msHidden: "msvisibilitychange"//No I18N
    };
    for (stateKey in keys) {
        if (stateKey in document) {
            eventKey = keys[stateKey];
            break;
        }
    }
    return function(c) {
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
 
//tabChange(function()
//{
//    if(sessionStorage.getItem("sessiontrack") == "true")
//    {
//        setTabChange();
//    }
//});
 
function setItem(json)
{
if(cookieEnabled)
	{
    var domainId = document.querySelector("meta[name='zwaod']").getAttribute("content"); //No I18N
    var webAutoIds = document.querySelector("meta[name='zwaid']").getAttribute("content"); //No I18N
    webAutoIds = webAutoIds.split(",");
    var webAutoId = webAutoIds[0];
    var zuids = document.querySelector("meta[name='zwauid']").getAttribute("content"); //No I18N
    zuids = zuids.split(",");
    var zuid = zuids[0];
    var param = {};
    var protocol = window.location.protocol;
    if(protocol.indexOf("http") < 0)
    {
        protocol = "http"+":";//No I18N
    }
    var fpCookie = getZCookie("zc_cu");//No I18N
    //json = JSON.stringify(json);
    param.data = json; 
    param.zc_cu = fpCookie;
    param.purpose = "setItem";//No I18N
    param.orgDomainId = domainId;
    param.webAutoId = webAutoId;
    param.zuid = zuid;
    stringParams = serializeMHJson(param);
    ajaxUrl = protocol+"//"+ZH_URL+"/wa/MhSetItem"+"?callback=processData&"+stringParams; //No I18N
    makeAjaxReq(ajaxUrl); 
}
}

function removeItem(json)
{
if(cookieEnabled)
	{
    var param = {};
    var domainId = document.querySelector("meta[name='zwaod']").getAttribute("content"); //No I18N
    var webAutoIds = document.querySelector("meta[name='zwaid']").getAttribute("content"); //No I18N
    webAutoIds = webAutoIds.split(",");
    var webAutoId = webAutoIds[0];
    var zuids = document.querySelector("meta[name='zwauid']").getAttribute("content"); //No I18N
    zuids = zuids.split(",");
    var zuid = zuids[0];
    var protocol = window.location.protocol;
    if(protocol.indexOf("http") < 0)
    {
        protocol = "http"+":";//No I18N
    }
    var fpCookie = getZCookie("zc_cu");//No I18N
    //json = JSON.stringify(json);
    param.data = json;
    param.zc_cu = fpCookie;
    param.purpose = "removeItem";//No I18N
    param.orgDomainId = domainId;
    param.webAutoId = webAutoId;
    param.zuid = zuid;
    stringParams = serializeMHJson(param);
    ajaxUrl = protocol+"//"+ZH_URL+"/wa/MhSetItem"+"?callback=processData&"+stringParams; //No I18N
    makeAjaxReq(ajaxUrl); 
}
}

function checkOutItem(json)
{
    if(cookieEnabled)
    {
    var param = {};
    var webAutoIds = document.querySelector("meta[name='zwaid']").getAttribute("content"); //No I18N
    webAutoIds = webAutoIds.split(",");
    var webAutoId = webAutoIds[0];
    var zuids = document.querySelector("meta[name='zwauid']").getAttribute("content"); //No I18N
    zuids = zuids.split(",");
    var zuid = zuids[0];
    authToken = authToken.trim();
    var domainId = document.querySelector("meta[name='zwaod']").getAttribute("content"); //No I18N
    var protocol = window.location.protocol;
    if(protocol.indexOf("http") < 0)
    {
        protocol = "http"+":";//No I18N
    }
    var fpCookie = getZCookie("zc_cu");//No I18N
    //json = JSON.stringify(json);
    param.data = json;
    param.zc_cu = fpCookie;
    param.purpose = "checkOutItem";//No I18N
    param.orgDomainId = domainId;
    param.webAutoId = webAutoId;
    param.zuid = zuid;
    stringParams = serializeMHJson(param);
    ajaxUrl = protocol+"//"+ZH_URL+"/wa/MhSetItem"+"?callback=processData&"+stringParams; //No I18N
    makeAjaxReq(ajaxUrl); 
}
}

function zhFade(element, interval, callback) {
    if (interval === void 0) { interval = 50; }
    if (callback === void 0) { callback = void 0; }
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
            if (callback) {
                callback();
            }
            return;
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")"; //No I18N
        op -= op * 0.1;
    }, interval);
}
 
function zc_deny()
{
    var zcConsent = getZCookie("zc_consent"); //No I18N
    if(zcConsent != null && zcConsent==1 )
    {
        document.cookie = "zc_consent=0; expires="+exp_date.toGMTString()+"; path=/";
        document.cookie = "zc_show=0; expires="+exp_date.toGMTString()+"; path=/";
    }
    zhFade(document.querySelector("#zc_notice")); //No I18N
}
 
function zc_accept()
{
    var zcConsent = getZCookie("zc_consent"); //No I18N
    if(zcConsent != null && zcConsent==1 )
    {
        document.cookie = "zc_consent=1; expires="+exp_date.toGMTString()+"; path=/";
        document.cookie = "zc_show=0; expires="+exp_date.toGMTString()+"; path=/";
    }
    zhFade(document.querySelector("#zc_notice")); //No I18N
}
 
function zcActionCallback(data)
{
	setTimeout(function()
    {
		zcActionCallback1(data);
    },3000);

}
function zcActionCallback1(data)
{
    var resultData = JSON.parse(JSON.stringify(data));
    var action = resultData.action;
    var selId = resultData.selId;
    var selClass = resultData.selClass;
    var selHref = resultData.selHref;
    var selIndex = resultData.selIndex;
  	var isSF = false;
  	if(action&&action.indexOf("SF_ACTION_")==0)
  	{
  		isSF = true;
  		var index = typeof selIndex=="number"?selIndex:0;//No I18N
        var selector = selId&&selId!="null"?"[id="+selId+"]":"";//No I18N
        if(selClass && selClass!="null")
        {
            var classes = selClass.split(" ");
            for(var i = 0;i<classes.length;i++)
            {
                selector = selector + "." + classes[i];
            }
        }
  		selector += selHref&&selHref!="null"?"[href="+selHref+"]":"";//No I18N
  		var od = resultData.od;
  		//console.log(selector);
  		var eles = document.querySelectorAll(selector);
  		var ele = null;
  		if(eles && eles[index])
  		{
  			ele = eles[index];
  		}
  		//console.log(ele);
  		zcmhCatchSubmit(ele,action,od);
  		return;
  	}
    var clickAction = "";
 
    if(selHref != "null")
    {
        if(selId != "null" && selClass != "null")
        {
            clickAction = document.querySelector("[id='"+selId+"'][class='"+selClass+"'][href='"+selHref+"']").getAttribute("onclick") != undefined ?  document.querySelector("[id='"+selId+"'][class='"+selClass+"'][href='"+selHref+"']").getAttribute("onclick")+";" : ""; //No I18N
            document.querySelector("[id='"+selId+"'][class='"+selClass+"'][href='"+selHref+"']").setAttribute("onclick",clickAction+"zcAction('"+action+"')"); //No I18N
        }
        else if(selId != "null")
        {
            clickAction = document.querySelector("[id='"+selId+"'][href='"+selHref+"']").getAttribute("onclick") != undefined ?   document.querySelector("[id='"+selId+"'][href='"+selHref+"']").getAttribute("onclick")+";" : ""; //No I18N
            document.querySelector("[id='"+selId+"'][href='"+selHref+"']").setAttribute("onclick",clickAction+"zcAction('"+action+"')"); //No I18N
        }
        else if(selClass != "null")
        {
            clickAction = document.querySelector("[class='"+selClass+"'][href='"+selHref+"']").getAttribute("onclick") != undefined ?  document.querySelector("[class='"+selClass+"'][href='"+selHref+"']").getAttribute("onclick")+";" : ""; //No I18N
            document.querySelector("[class='"+selClass+"'][href='"+selHref+"']").setAttribute("onclick",clickAction+"zcAction('"+action+"')"); //No I18N
        }
        else
        {
            clickAction = document.querySelector("[href='"+selHref+"']").getAttribute("onclick") != undefined ?  document.querySelector("[href='"+selHref+"']").getAttribute("onclick")+";" : ""; //No I18N
            document.querySelector("[href='"+selHref+"']").setAttribute("onclick",clickAction+"zcAction('"+action+"')"); //No I18N
        }
    }
    else
    {
        if(selId != "null" && selClass != "null")
        {
            clickAction = document.querySelector("[id='"+selId+"'][class='"+selClass+"']").getAttribute("onclick") != undefined ?  document.querySelector("[id='"+selId+"'][class='"+selClass+"']").getAttribute("onclick")+";" : ""; //No I18N
            document.querySelector("[id='"+selId+"'][class='"+selClass+"']").setAttribute("onclick",clickAction+"zcAction('"+action+"')"); //No I18N
        }
        else if(selId != "null")
        {
            clickAction = document.querySelector("[id='"+selId+"']").getAttribute("onclick") != undefined ?   document.querySelector("[id='"+selId+"']").getAttribute("onclick")+";" : ""; //No I18N
            document.querySelector("[id='"+selId+"']").setAttribute("onclick",clickAction+"zcAction('"+action+"')"); //No I18N
        }
        else if(selClass != "null")
        {
            clickAction = document.querySelector("[class='"+selClass+"']").getAttribute("onclick") != undefined ?  document.querySelector("[class='"+selClass+"']").getAttribute("onclick")+";" : ""; //No I18N
            document.querySelector("[class='"+selClass+"']").setAttribute("onclick",clickAction+"zcAction('"+action+"')"); //No I18N
        }
    }
 
}
function zcmhCatchSubmit(ele,action,od)
{
	if(!ele||!od)
	{
		//not found api
		return false;
	}
	var signupFormIx = action.replace("SF_ACTION_","");
	var alreadySetIds = ele.getAttribute("zcmhFormIDs");
	var hasIds = !!alreadySetIds;
	if(hasIds)
	{
		var formIds = alreadySetIds.split(",");
		if(formIds.indexOf(signupFormIx)>-1)
		{
			return;
		}
		else
		{
			
			formIds.push(signupFormIx);
			ele.setAttribute("zcmhFormIDs",formIds.join(","));
		}
	}
	else
	{
		ele.setAttribute("zcmhFormIDs",signupFormIx);
	}
	watrackSignupEvent(action);
	var inputs = ele.querySelectorAll("input,select,textarea");//No I18N
	var submitButton = ele.querySelectorAll("input[type='submit'],button");//No I18N
	var formId = ele.id;
	var outerSubmitButton = null;
	if(formId)
	{
		outerSubmitButton = document.querySelectorAll("button[type='submit'][form='"+formId+"']");//No I18N
	}
	
	if(inputs)
	{
        var onEnterKeyFunc = function(event){
            var keycode = event.keyCode; 
            if(keycode==13)
            {
                zcmhSendSFData(ele,event,action,od);
            }
        };
		for(var i = 0;i < inputs.length;i++)
		{
			inputs[i].addEventListener('keyup',onEnterKeyFunc);
		}
    }
    var onClickFunc = function(event){
        zcmhSendSFData(ele,event,action,od);
    };
	if(submitButton)
	{
		for(var i = 0;i < submitButton.length;i++) 
		{
			submitButton[i].addEventListener('click',onClickFunc);
		}
	}
	if(outerSubmitButton)
	{
		for(var i = 0;i < outerSubmitButton.length;i++)
		{
			outerSubmitButton[i].addEventListener('click',onClickFunc);
		}
	}
}
function zcmhSendSFData(form,event,action,od)
{
	var eventType = event.type;
	if(form&&action &&(typeof window["zcmhreq_"+action] == "undefined"||!window["zcmhreq_"+action])&&(typeof window["zcmhreq_"+action + "_" +eventType] =="undefined" || !window["zcmhreq_"+action + "_" +eventType].trigger))
	{
		window["zcmhreq_"+action + "_" +eventType] = {};//No I18N
		window["zcmhreq_"+action + "_" +eventType].event = event;//No I18N
		window["zcmhreq_"+action] = true;
		window["zcmhreq_"+action + "_" +eventType].trigger = true; //No I18N
		if(eventType=="click")//No I18N
		{
			event.preventDefault();
		}
		var inputs = form.querySelectorAll("input[name],select[name],textarea[name]");
		if(inputs)
		{
			var data = {};
			for(var i = 0;i < inputs.length;i++)
			{
				var input = inputs[i];
				var name = input.name;
				var tag = input.tagName;
				var value = input.value;
				if(tag=="SELECT"  && input.getAttribute("multiple") == "multiple")
				{
					value = "";
	                var options = input.querySelectorAll("option");//No I18N
	                if(options&&options.length>0)
	                {
	                    for(var j=0;j<options.length;j++)
	                    {
	                        var ele = options[j];
	                        if (ele.selected) {
	                            value += ele.value + ",";
	                        }
	                    }
	                    value = value.substring(0, value.lastIndexOf(","));
	                }
				}
				if(value&&value!="")
	            {
					data[name] = value;
	            }
			}
			if(data)
			{
				var protocol = window.location.protocol;
				var url = ZC_RedirUrl;
				url = protocol+"//" + url;//No I18N
				url = url + "/ua/sfoptin";//No I18N
				var params = {};
				params.signupFormIx = action.replace("SF_ACTION_","");
				params.formData = data;
				params.process = "signupFormAction";//No I18N
				params.od = od;

                var hostnameFirstParty = location.hostname;             
                var cookie = document.cookie;
                var c_start = cookie.indexOf("zc_cu" + "="); //No I18N
                if (c_start == -1) {
                    cookie = null;
                }
                else {
                    c_start = cookie.indexOf("=", c_start) + 1; //No I18N
                    var c_end = cookie.indexOf(";", c_start); //No I18N
                    if (c_end == -1) {
                        c_end = cookie.length;
                    }
                    cookie = unescape(cookie.substring(c_start, c_end));
                }
                params.hostnameFirstParty = hostnameFirstParty;
                params.cookie = cookie;
                params.isFromWebsite = "true"; //No I18N
                params.url=window.location.href;
                var zc_tp = getZCookie("zc_tp");//No I18N
                if(zc_tp != null)
                {
                    params.zc_tp = zc_tp;
                }
				setTimeout(function(){//Make ASYC
					zcmhsendAjaxReq(url,params,"POST",true,function(data){//No I18N
					//	console.log(data);						
						watrackSignupEvent(action);
						window["zcmhreq_"+action] = false;
						if(eventType=="click")
						{
							window["zcmhreq_"+action + "_" +eventType].event.target.click();//No I18N
						}
						else
						{
							window["zcmhreq_"+action + "_" +eventType].trigger = false;//No I18N
						}
					})
				},1);
			}
		}
	}
	else if(typeof window["zcmhreq_"+action + "_" +eventType]!="undefined" && window["zcmhreq_"+action + "_" +eventType].trigger)
	{
		window["zcmhreq_"+action + "_" +eventType].trigger = false;//No I18N
	}
}
var zcmhsendAjaxReq = function (url, params, method, async, callback,withoutCred) {
    if (method === void 0) { method = "GET"; }
    if (async === void 0) { async = true; }
    if (callback === void 0) { callback = function (data) { }; }
    if(withoutCred === void 0){ withoutCred=false; }
    var xhr;
    try {
        xhr = new XMLHttpRequest();
    }
    catch (ex) {
        xhr = new window.ActiveXObject("Microsoft.XMLHTTP"); //support for IE8 //No I18N
    }
    var stringParams;
    if (typeof params == "object") { //No I18N
        stringParams = zcmhSerializeJson(params);
    }
    else {
        stringParams = params;
    }
    if (method == "GET") { //No I18N
        url += "?" + stringParams;
        stringParams = null;
    }
    xhr.open(method, url, async);
    if (async) {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (callback) {
                    callback(xhr.responseText);
                }
            }
        };
    }
    try {
        if (method == "POST") { //No I18N
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); //No I18N
        }
         if(!withoutCred)
         {
             xhr.withCredentials = true;
         }
        xhr.send(stringParams);
        if (!async) {
            if (callback) {
                return callback(xhr.responseText);
            }
            else {
                return xhr.responseText;
            }
        }
    }
    catch (e) {
    	callback();
    }
};

var watrackSignupEvent = function (formAction) {
    var action = "view"; //No I18N
    var viewFromVal = "URL_ACTION"; //No I18N
    var jsonObj;
    jsonObj = {};
    jsonObj.category = "update"; //No I18N
    jsonObj.action = "view";
    jsonObj.viewFrom = viewFromVal;
    jsonObj.signupFormIx = formAction.replace("SF_ACTION_","");
    jsonObj.source = encodeURIComponent(window.location.href); 
    var url=ZH_URL;
    var campaignsUrl = url;
    if (campaignsUrl != undefined && campaignsUrl.indexOf("http") < 0) {
        var protocol = window.location.protocol;
        if (protocol.indexOf("http") < 0) { //No I18N
            protocol = "http" + ":"; //No I18N
        }
        protocol = "https:"; //No I18N
        campaignsUrl = protocol + "//" + campaignsUrl;
    }
    var action_url = campaignsUrl + "/ua/TrailEvent"; //No I18N
    zcmhsendAjaxReq(action_url, jsonObj, "POST",true,null,true);//No I18N   
};

var zcmhSerializeJson = function (json) {
    if (json === void 0) { json = {}; }
    var keys = Object.keys(json);
    var serializedJson = "";
    for (var i = 0; i < keys.length; i++) {
    	var value = json[keys[i]];
    	if(typeof value == "object")
		{
    		value = JSON.stringify(value);
		}
    	value = encodeURIComponent(value);
        serializedJson += keys[i] + "=" + value;
        serializedJson += "&";
    }
    return serializedJson.substring(0, serializedJson.length - 1);
}; 
function zcTouchPointCallback(data)
{
    var resultData = JSON.parse(JSON.stringify(data));
    var vtp = resultData.zc_tp;
    document.cookie = "zc_tp="+vtp+";expires="+exp_date.toGMTString()+"; path=/";
}
window.addEventListener('pagehide', setOnBeforeUnloadEvent);
function setOnBeforeUnloadEvent()
{
	var start = +new Date();
	var dummyvar = 0;
    while ((+new Date() - start) < 2000 && isEventCompleted == false)
    {
    	dummyvar = dummyvar + 1;
    }	
}
