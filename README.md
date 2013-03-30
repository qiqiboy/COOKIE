COOKIE
======

> 使用javascript来获取及设置cookie

## 如何使用
```javascript
// 首先在页面中引入COOKIE.js

//调用
COOKIE.has(name); //检测是否有名字为name的cookie
COOKIE.set(key,value,expire,path,domain); //设置一个新cookie
COOKIE.remove(name); //删除名为name的cookie
COOKIE.get(name); //获取名为name的cookie的值
COOKIE.clear(); //清除当前域下所有cookie

````