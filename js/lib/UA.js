(function(){var i;i=function(){function i(){}return i.ua=window.navigator.userAgent.toLowerCase(),i.win=!1,i.mac=!1,i.MSIE=!1,i.ie6=!1,i.ie7=!1,i.ie8=!1,i.ie9=!1,i.ie10=!1,i.ie11=!1,i.iPad=!1,i.iPhone=!1,i.android=!1,i.android2=!1,i.chrome=!1,i.webkit=!1,i.safari=!1,i.firefox=!1,i.smartphone=!1,i.touchDevice=!1,i.tablet=!1,i.iosVersion=null,i.init=function(){var i,t,s;return this.win=this.ua.indexOf("windows")>-1,this.mac=this.ua.indexOf("mac")>-1,this.MSIE=this.ua.indexOf("msie")>-1||this.ua.indexOf("trident")>-1,this.ie6=this.MSIE&&this.ua.indexOf("msie 6")>-1,this.ie7=this.MSIE&&this.ua.indexOf("msie 7")>-1,this.ie8=this.MSIE&&this.ua.indexOf("msie 8")>-1,this.ie9=this.MSIE&&this.ua.indexOf("msie 9")>-1,this.ie10=this.MSIE&&this.ua.indexOf("msie 10")>-1,this.iPhone=this.ua.indexOf("iphone")>-1||this.ua.indexOf("iphone")>-1,this.iPad=this.ua.indexOf("ipad")>-1,this.iosLT6=(this.iPhone||this.iPad)&&this.ua.indexOf("test"),(this.iPhone||this.iPad)&&(i=navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),this.iosVersion=[parseInt(i[1],10),parseInt(i[2],10),parseInt(i[3]||0,10)]),this.android=this.ua.indexOf("android")>-1,this.chrome=this.ua.indexOf("chrome")>-1,this.webkit=this.ua.indexOf("webkit")>-1,this.firefox=this.ua.indexOf("firefox")>-1,this.safari=this.ua.indexOf("safari")>-1&&!this.chrome&&!this.android&&!this.iPhone&&!this.iPad,this.smartphone=this.iPhone||this.android,this.touchDevice=this.iPhone||this.iPad||this.android,this.tablet=this.iPad||this.android&&-1===this.ua.indexOf("mobile"),this.iPhone&&480===screen.height&&(this.iPhone4s=!0),this.android&&(s=/(android)\s([0-9]{1,})([\.0-9]{1,})/.exec(this.ua),s&&(t=parseInt(s[2],10)),2===t)?this.android2=!0:void 0},i.initHtml=function(){var i,t;return i=[],this.mac?i.push("mac"):this.win&&i.push("win"),this.android?i.push("android"):(this.iPhone||this.iPad)&&i.push("ios"),this.android2&&i.push("android2"),this.iPhone4s&&i.push("iphone4"),this.firefox?i.push("firefox"):this.webkit&&i.push("webkit"),i.push(this.smartphone?"sp":"pc"),i.push(this.tablet?"tablet":"notTablet"),this.MSIE&&i.push("ie"),t=document.getElementsByTagName("html")[0],t.className+=" "+i.join(" ")},i}(),i.init(),i.initHtml(),"function"==typeof define&&define.amd?define(function(){return i}):"object"==typeof exports?exports.UA=i:window.UA=i}).call(this);