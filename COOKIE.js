/**
 * COOKIE v1.3
 * By qiqiboy, http://www.qiqiboy.com, http://weibo.com/qiqiboy, 2013/08/12
 */
var COOKIE=(function(){
    
	var getDateString=function(offset){
			var date=new Date();
			date.setTime(+date+offset*1000);
			return date.toGMTString();
		},
		getCookies=function(){
			var cookie=document.cookie||'',
				subs=cookie.split(/;\s?/),
				_subs,cks={};
			for(var i=0;i<subs.length,subs[i];i++){
				_subs=subs[i].split('=')
				cks[unescape(_subs[0])]=unescape(_subs.slice(1).join('='));
			}
			return cks;
		}
	
    return {
		refresh:function(){
			this.cookies=getCookies();
			return this;
		},
        has:function(key){
            return this.cookies[key]!=null;
        },
        get:function(key){
            return this.cookies[key];
        },
        set:function(key,value,expire,path,domain){
            var myck=escape(key)+'='+escape(value);
            if(expire=parseFloat(expire))
                myck+=';expires='+getDateString(expire);
			if(path!=null)
                myck+=';path='+path;
            if(domain!=null&&domain!=location.hostname)
                myck+=';domain='+domain;
            document.cookie=myck;
			return this.refresh().has(key);
        },
        remove:function(key,path,domain){
			var paths=[],
				domains=[],
				arr,self=this;
			if(path){
				paths=[path];
			}else{
				arr=location.pathname.split('/');
				this.each(arr,function(i){
					paths.push(arr.slice(0,i+1).join('/'));
				});
			}
			
			if(domain){
				domains=[domain];
			}else{
				arr=location.hostname.split('.');
				this.each(arr,function(i){
					domains.push(arr.slice(-i).join('.'));
				});
			}

			this.each(paths,function(){
				path=this+''||'/';
				self.each(domains,function(){
					self.set(key,null,-1000,path,this+'');
				});
			});
			
			return !this.has(key);
        },
		clear:function(path,domain){
			for(var key in this.cookies){
				this.remove(key,path,domain);
			}
			return this;
		},
		each:function(arr,func){
			var i=0,j=arr.length;
			for(;i<j;i++){
				if(func.call(arr[i],i)===false){
					break;	
				}
			}
		}
    }.refresh();
})();
