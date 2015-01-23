# angular-messagebox
a highlevel encapsulation of angular-ui-bootstrap:$modal service

thanks for [angular-dialog-service](https://github.com/m-e-conroy/angular-dialog-service)

## what i done :
 1. refact all code with angular-styleguide
 2. fix ng-bind-html bugs with angular 1.3.x
 3. remove angular-translate
 4. remove customer create dialog

## usage:
 demo on coding:[]()
```
gulp clean
gulp build

angular
    .module('your.module',['ui.bootstrap','angular-messagebox'])

angular
    .module('your.module')
    .controller('YourController',['MessageBox',function(MessageBox){

        //MessageBox.error('title','msg');
        //...
    }])


```

## 好吧...我这蹩脚的英文到这结束了...下面是中文
 1. 遵循项目中目前使用的Angular-styleguide,重构了全部代码
 2. 修正了在angular1.3.x中使用ng-bind-html时会抛出的安全检查异常
 3. 移除了angular-translate
 4. 移除了自定义dialog的功能,纯粹做为MessageBox实现

