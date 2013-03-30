var COOKIE=(function(){
    var cookie=document.cookie||'',
        subs=cookie.split(';'),
        cks={},
        trim=function(str){
            return str.replace(/^\s+|\s+$/g,'');
        },
        getDateString=function(offset){
            var date=new Date();
            date.setTime(+date+offset*1000);
            return date.toGMTString();
        }
    for(var i=0;i<subs.length;i++){
        var _sub=subs[i];
        var pos=_sub.indexOf("=");
        var key,value;
        if(pos>=0){
            key=trim(_sub.substring(0,pos));
            value=_sub.substring(pos+1);
            cks[unescape(key)]=unescape(value);
        }
    }
 
    return {
        has:function(key){
            return typeof cks[key]!='undefined';
        },
        set:function(key,value,expire,path,domain){
            cks[key]=value;
            var myck=escape(key)+'='+escape(value);
            if(typeof expire!='undefined')
                myck+=';expires='+getDateString(expire);
			if(typeof path!='undefined')
                myck+=';path='+path;
            if(typeof domain!='undefined')
                myck+=';domain='+domain;
            document.cookie=myck;
        },
        remove:function(key){
            delete cks[key];
            document.cookie=escape(key)+'=;path=/;expires='+getDateString(-10000);
        },
        get:function(key){
            return cks[key];
        },
		clear:function(){
			for(var key in cks){
				this.remove(key);
			}
		},
		cookies:cks
    }
})();
