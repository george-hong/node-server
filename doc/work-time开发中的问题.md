[TOC]

# 环境安装

## sourceTree

> git可视化工具，能够很方便的管理代

1. 需要注册一个账号，推荐使用gmail邮箱，163邮箱等会出现无法注册的情况。
2. 注册需要使用vpn，验证账号时会有一个真人验证，未使用vpn会出现验证不能正常加载导致无法注册成功。
3. 邮箱收到注册邮件，点击邮件内的确认链接。

## mongodb 



# vue-cli 相关

## 添加全局less配置文件  

> [原文链接](https://blog.csdn.net/u014292161/article/details/79193381) （错误处进行了修改）

1. ``npm install sass-resources-loader --save-dev``

2. 在build/utils.js中``function generateLoaders (loader, loaderOptions){}  `` 同级添加

   ``````javascript
   function resolveResource(name) {  
      return path.resolve(__dirname, '../src/assets/less/' + name);  //config.less的文件夹位置
   }  
   function generateSassResourceLoader() {  
       var loaders = [  
         cssLoader,   
         'less-loader',  
         {  
             loader: 'sass-resources-loader',  
             options: {  
               resources: [resolveResource('config.less')]  //需要设置的全局less文件
             }  
         }  
       ];  
       if (options.extract) {  
         return ExtractTextPlugin.extract({  
           use: loaders,  
           fallback: 'vue-style-loader'  
         })  
       } else {  
         return ['vue-style-loader'].concat(loaders)  
       }  
   } 
   ``````

   在build/utils.js中

   ``````javascript
   return {  
       css: generateLoaders(),  
       postcss: generateLoaders(),  
       less: generateLoaders('less'),  
       sass: generateLoaders('sass', { indentedSyntax: true }),  
       scss: generateLoaders('sass'),  
       stylus: generateLoaders('stylus'),  
       styl: generateLoaders('stylus') 
   }
   ``````

   把``less: generateLoaders('less')`` 替换为 ``less: generateSassResourceLoader()``

# axios相关

> [官方文档地址](https://www.npmjs.com/package/axios)

## 请求配置

1. axios便捷方法中get和post请求的参数传递方式不一致

   ``````javascript
   axios.get(url[, {
     params: data //get请求参数在这个config对象中
   }]);

   axios.post(url[, data][, config]);  //post请求参数在外层
   ``````

# cookie相关

## express操作cookie

> 添加cookie

````javascript
router.use('/', (req, res, next) => {
	res.cookie('fieldName', 'filedValue' [,option]);
  	// other handler
});
````

> 读取cookie

````javascript
router.use('/', (req, res, next) => {
	res.headers.cookie;
  	// other handler
});
````

