/**
 * COOKIE v1.1
 * By qiqiboy, http://www.qiqiboy.com, http://weibo.com/qiqiboy, 2013/08/07
 */
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
            return cks[key]!=null;
        },
        set:function(key,value,expire,path,domain){
            var myck=escape(key)+'='+escape(value);
            if(expire!=null && expire!='session')
                myck+=';expires='+getDateString(expire);
			if(path!=null)
                myck+=';path='+path;
            if(domain!=null)
                myck+=';domain='+domain;
            document.cookie=myck;
			return cks[key]=value;
        },
        remove:function(key,path,domain){
			var myck=escape(key)+'=';
			if(path!=null)
                myck+=';path='+path;
            if(domain!=null)
                myck+=';domain='+domain;
            document.cookie=myck;
           	return delete cks[key];
        },
        get:function(key){
            return cks[key];
        },
		clear:function(){
			for(var key in cks){
				this.remove(key);
			}
			return true;
		},
		cookies:cks
    }
})();
