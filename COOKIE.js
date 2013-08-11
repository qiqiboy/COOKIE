/**
 * COOKIE v1.2
 * By qiqiboy, http://www.qiqiboy.com, http://weibo.com/qiqiboy, 2013/08/10
 */
var COOKIE=(function(){
    var cookie=document.cookie||'',
        subs=cookie.split(/;\s?/),
        cks={},
		_subs,
        getDateString=function(offset){
            var date=new Date();
            date.setTime(+date+offset*1000);
            return date.toUTCString();
        }
    for(var i=0;i<subs.length;i++){
		_subs=subs[i].split('=')
		cks[unescape(_subs[0])]=unescape(_subs.slice(1).join('='));
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
			cks[key]=value;
			return cks;
        },
        remove:function(key,path,domain){
           	delete this.set(key,null,-1000,path,domain)[key];
		return cks;
        },
        get:function(key){
            return cks[key];
        },
		clear:function(){
			for(var key in cks){
				this.remove(key);
			}
			return cks;
		},
		cookies:cks
    }
})();
