/**
 * COOKIE v1.4
 * By qiqiboy, http://www.qiqiboy.com, http://weibo.com/qiqiboy, 2013/08/13
 */
var COOKIE=(function(){
	var getDateString=function(offset){
			var date=new Date();
			date.setTime(+date+offset*1000);
			return date.toGMTString();
		},
		encode=encodeURIComponent,
		decode=decodeURIComponent,
		getCookies=function(){
			var cookie=document.cookie||'',
				subs=cookie.split(/;\s?/),
				_subs,cks={};
			for(var i=0;i<subs.length,subs[i];i++){
				_subs=subs[i].split('=')
				cks[decode(_subs[0])]=decode(_subs.slice(1).join('='));
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
        set:function(key,value,expire,path,domain,secure){
            var myck=encode(key)+'='+encode(value==null?'':value);
            if(!isNaN(expire=parseFloat(expire)))
                myck+=';expires='+getDateString(expire);
			if(path)myck+=';path='+path;
            if(domain&&domain!=location.hostname)myck+=';domain='+domain;
			if(secure)myck+=';secure';
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
				arr=location.pathname.match(/.*?\/|.+$/g);
				this.each(arr,function(i){
					var a;
					paths.push(a=arr.slice(0,i+1).join(''));
					if(/[^\/]+\/$/.test(a)){
						paths.push(a.slice(0,-1));
					}
					if(/[^\/]$/.test(a)){
						paths.push(a+'/');
					}
				});
			}

			if(domain){
				domains=[domain];
			}else{
				arr=location.hostname.split('.');
				this.each(arr,function(i){
					domains.push(arr.slice(-i).join('.'));
				});
				domains.push('.'+domains[0]);
			}

			this.each(paths,function(){
				var path=this+'';
				self.each(domains,function(){
					self.set(key,'',-1000,path,this+'');
				});
			});
			
			return !!path||!!domain||!this.has(key);
        },
		clear:function(path,domain){
			for(var key in this.cookies){
				this.remove(key,path,domain);
			}
			return !!path||!!domain||function(){
				for(var key in this.cookies){
					return false;
				}
				return true;
			}.call(this);
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
