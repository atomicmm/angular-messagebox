angular.module('angular-messagebox', ['ui.bootstrap.modal']);
/**
 * mbox的默认配置
 */
(function () {
    angular
        .module('angular-messagebox')
        .provider('MessageBoxConfig', MessageBoxConfig)

    function MessageBoxConfig() {
        var _b = 'static'; // backdrop,默认禁止外部点击
        var _k = true; // keyboard
        var _w = 'dialogs-default'; // windowClass
        var _copy = true; // controls use of angular.copy
        var _wTmpl = null; // window template
        var _wSize = 'lg'; // large modal window default

        var _fa = false; // fontawesome flag


        /**
         * 点击modal以外是否可以关闭modal
         * @param    val    mixed    (true, false, 'static')
         */
        this.useBackdrop = function (val) { // possible values : true, false, 'static'
            if (angular.isDefined(val))
                _b = val;
        }; // end useStaticBackdrop

        /**
         * 是否启用esc键关闭modal对话框
         * @param    val    boolean
         */
        this.useEscClose = function (val) { // possible values : true, false
            if (angular.isDefined(val))
                _k = (!angular.equals(val, 0) && !angular.equals(val, 'false') && !angular.equals(val, 'no') && !angular.equals(val, null) && !angular.equals(val, false)) ? true : false;
        }; // end useESCClose

        /**
         * 给modal对话框的模板额外添加的css class
         * @param    val    string
         */
        this.useClass = function (val) {
            if (angular.isDefined(val))
                _w = val;
        }; // end useClass

        /**
         * 在创建modalController时是否使用angular.copy
         * @param    val    boolean
         */
        this.useCopy = function (val) {
            if (angular.isDefined(val))
                _copy = !!(!angular.equals(val, 0) && !angular.equals(val, 'false') && !angular.equals(val, 'no') && !angular.equals(val, null) && !angular.equals(val, false));
        }; // end useCopy

        /**
         * 自定义模板
         * @param    val    string
         */
        this.setWindowTmpl = function (val) {
            if (angular.isDefined(val))
                _wTmpl = val;
        }; // end setWindowTmpl

        /**
         * 窗口大小
         * @param    val    string (sm,lg,md)
         */
        this.setSize = function (val) {
            if (angular.isDefined(val))
                _wSize = (angular.equals(val, 'sm') || angular.equals(val, 'lg') || angular.equals(val, 'md')) ? val : _wSize;
        }; // end setSize

        /**
         * 是否使用fa做为默认图标实现
         */
        this.useFontAwesome = function () {
            _fa = true;
        };

        this.$get = function () {
            return {
                commonConfig: {
                    b: _b,
                    k: _k,
                    w: _w,
                    s: _wSize,
                    fa: _fa
                },
                confirmConfig: {
                    templateUrl: 'confirm.tpl.html',
                    controller: 'ConfirmMsgBoxCtrl'
                },
                errorConfig: {
                    templateUrl: 'error.tpl.html',
                    controller: 'ErrorMsgBoxCtrl'
                },
                notifyConfig: {
                    templateUrl: 'notify.tpl.html',
                    controller: 'NotifyMsgBoxCtrl'
                },
                waitConfig: {
                    templateUrl: 'wait.tpl.html',
                    controller: 'WaitMsgBoxCtrl'
                }
            };
        }

    }
})();
/**
 * 常量
 */
(function () {

    angular
        .module('angular-messagebox')
        .constant('Constants', {
            defaultErrorHeader: '出错了!',
            defaultErrorMsg: '发生了一个未知错误,请联系管理员',
            defaultNotifyHeader: '提示:',
            defaultNotifyMsg: '飘出来一条未知内容的提示...',
            defaultConfirmHeader: '提示:',
            defaultConfirmMsg: '你确定要进行该操作么?',
            defaultWaitHeader: '提示:',
            defaultWaitMsg: '数据加载中...',
            eventWaitComplete: 'event:messagebox-wait-complete',
            eventWaitProgress: 'event:messagebox-wait-progress',
            eventWaitMessage: 'event:messagebox-wait-message'
        })

})();

/**
 * 控制器定义
 */
(function () {

    angular
        .module('angular-messagebox')
        .controller('ErrorMsgBoxCtrl', ErrorMsgBoxCtrl)
        .controller('ConfirmMsgBoxCtrl', ConfirmMsgBoxCtrl)
        .controller('NotifyMsgBoxCtrl', NotifyMsgBoxCtrl)
        .controller('WaitMsgBoxCtrl', WaitMsgBoxCtrl);


    /**
     * 错误框
     */
    ErrorMsgBoxCtrl.$inject = ['$scope', '$sce', '$modalInstance', 'data', 'Constants'];
    function ErrorMsgBoxCtrl($scope, $sce, $modalInstance, data, Constants) {

        $scope.header = $sce.trustAsHtml((angular.isDefined(data.header)) ? data.header : Constants.defaultErrorHeader);
        $scope.msg = $sce.trustAsHtml((angular.isDefined(data.msg)) ? data.msg : Constants.defaultErrorMsg);
        $scope.icon = (angular.isDefined(data.fa) && angular.equals(data.fa, true)) ? 'fa fa-warning' : 'glyphicon glyphicon-warning-sign';

        $scope.close = function () {
            $modalInstance.close();
            $scope.$destroy();
        };
    }

    /**
     * 确认框
     */
    ConfirmMsgBoxCtrl.$inject = ['$scope', '$sce', '$modalInstance', 'data', 'Constants'];
    function ConfirmMsgBoxCtrl($scope, $sce, $modalInstance, data, Constants) {
        $scope.header = $sce.trustAsHtml((angular.isDefined(data.header)) ? data.header : Constants.defaultConfirmHeader);
        $scope.msg = $sce.trustAsHtml((angular.isDefined(data.msg)) ? data.msg : Constants.defaultConfirmMsg);
        $scope.icon = (angular.isDefined(data.fa) && angular.equals(data.fa, true)) ? 'fa fa-check' : 'glyphicon glyphicon-check';

        $scope.no = function () {
            $modalInstance.dismiss('no');
        };

        $scope.yes = function () {
            $modalInstance.close('yes');
        };
    }

    /**
     * 提示框
     */
    NotifyMsgBoxCtrl.$inject = ['$scope', '$sce', '$modalInstance', 'data', 'Constants'];
    function NotifyMsgBoxCtrl($scope, $sce, $modalInstance, data, Constants) {
        $scope.header = $sce.trustAsHtml((angular.isDefined(data.header)) ? data.header : Constants.defaultNotifyHeader);
        $scope.msg = $sce.trustAsHtml((angular.isDefined(data.msg)) ? data.msg : Constants.defaultNotifyMsg);
        $scope.icon = (angular.isDefined(data.fa) && angular.equals(data.fa, true)) ? 'fa fa-info' : 'glyphicon glyphicon-info-sign';

        $scope.close = function () {
            $modalInstance.close();
            $scope.$destroy();
        };
    }

    /**
     * 进度框
     */
    WaitMsgBoxCtrl.$inject = ['$scope', '$sce', '$timeout', '$modalInstance', 'data', 'Constants'];
    function WaitMsgBoxCtrl($scope, $sce, $timeout, $modalInstance, data, Constants) {

        $scope.header = $sce.trustAsHtml((angular.isDefined(data.header)) ? data.header : Constants.defaultWaitHeader);
        $scope.msg = $sce.trustAsHtml((angular.isDefined(data.msg)) ? data.msg : Constants.defaultWaitMsg);
        $scope.progress = (angular.isDefined(data.progress)) ? data.progress : 100;
        $scope.icon = (angular.isDefined(data.fa) && angular.equals(data.fa, true)) ? 'fa fa-clock-o' : 'glyphicon glyphicon-time';


        //监听页面广播,改变进度条的值
        $scope.$on(Constants.eventWaitComplete, function () {
            $timeout(function () {
                $modalInstance.close();
                $scope.$destroy();
            });
        });

        $scope.$on(Constants.eventWaitMessage, function (evt, args) {
            $scope.msg = (angular.isDefined(args.msg)) ? args.msg : $scope.msg;
        });

        $scope.$on(Constants.eventWaitProgress, function (evt, args) {
            $scope.msg = (angular.isDefined(args.msg)) ? args.msg : $scope.msg;
            $scope.progress = (angular.isDefined(args.progress)) ? args.progress : $scope.progress;
        });


        $scope.getProgress = function () {
            return {'width': $scope.progress + '%'};
        };
    }

})();

/**
 * $Dialog服务
 */
(function () {
    angular
        .module('angular-messagebox')
        .factory('MessageBox', MessageBox);

    MessageBox.$inject = ['$modal', 'MessageBoxConfig'];
    function MessageBox($modal, config) {

        /**
         * 复制基础属性
         */
        var _setOpts = function (opts) {
            var _opts = config.commonConfig;
            opts = opts || {};
            if (angular.isDefined(opts.keyboard)) {
                _opts.k = opts.keyboard;
            }
            if (angular.isDefined(opts.backdrop)) {
                _opts.b = opts.backdrop;
            }
            if (angular.isDefined(opts.size)) {
                _opts.s = opts.size;
            }
            if (angular.isDefined(opts.windowClass)) {
                _opts.w = opts.windowClass;
            }

            return _opts;
        };

        return {
            /**
             * 错误框
             */
            error: function (msg, title, opts) {
                opts = _setOpts(opts);

                return $modal.open({
                    templateUrl: config.errorConfig.templateUrl,
                    controller: config.errorConfig.controller,
                    backdrop: opts.b,
                    keyboard: opts.k,
                    windowClass: opts.w,
                    size: opts.s,
                    resolve: {
                        data: function () {
                            return {
                                header: angular.copy(title),
                                msg: angular.copy(msg),
                                fa: config.commonConfig.fa
                            };
                        }
                    }
                });
            },

            /**
             * 提示框
             */
            notify: function (msg, title, opts) {
                opts = _setOpts(opts);

                return $modal.open({
                    templateUrl: config.notifyConfig.templateUrl,
                    controller: config.notifyConfig.controller,
                    backdrop: opts.b,
                    keyboard: opts.k,
                    windowClass: opts.w,
                    size: opts.s,
                    resolve: {
                        data: function () {
                            return {
                                header: angular.copy(title),
                                msg: angular.copy(msg),
                                fa: config.commonConfig.fa
                            };
                        }
                    }
                });
            },
            /**
             * 进度框
             */
            wait: function (msg, progress, title, opts) {
                opts = _setOpts(opts);

                return $modal.open({
                    templateUrl: config.waitConfig.templateUrl,
                    controller: config.waitConfig.controller,
                    backdrop: opts.b,
                    keyboard: opts.k,
                    windowClass: opts.w,
                    size: opts.s,
                    resolve: {
                        data: function () {
                            return {
                                header: angular.copy(title),
                                msg: angular.copy(msg),
                                progress: angular.copy(progress),
                                fa: config.commonConfig.fa
                            };
                        }
                    }
                }); // end modal.open
            },
            /**
             * 确认框
             */
            confirm: function (msg, title, opts) {
                opts = _setOpts(opts);

                return $modal.open({
                    templateUrl: config.confirmConfig.templateUrl,
                    controller: config.confirmConfig.controller,
                    backdrop: opts.b,
                    keyboard: opts.k,
                    windowClass: opts.w,
                    size: opts.s,
                    resolve: {
                        data: function () {
                            return {
                                header: angular.copy(title),
                                msg: angular.copy(msg),
                                fa: config.commonConfig.fa
                            };
                        }
                    }
                });
            }
        };

    }
})();
angular.module("angular-messagebox").run(["$templateCache", function($templateCache) {$templateCache.put("confirm.tpl.html","<div class=\"modal-header dialog-header-confirm\">\r\n    <button type=\"button\" class=\"close\" ng-click=\"no()\">&times;</button>\r\n    <h4 class=\"modal-title\">\r\n        <span ng-class=\"icon\"></span>\r\n        <span ng-bind-html=\"header\"></span>\r\n    </h4>\r\n</div>\r\n<div class=\"modal-body\" ng-bind-html=\"msg\"></div>\r\n<div class=\"modal-footer\">\r\n    <button type=\"button\" class=\"btn btn-default\" ng-click=\"yes()\">确定</button>\r\n    <button type=\"button\" class=\"btn btn-primary\" ng-click=\"no()\">取消</button>\r\n</div>");
$templateCache.put("error.tpl.html","<div class=\"modal-header dialog-header-error\">\r\n    <button type=\"button\" class=\"close\" ng-click=\"close()\">&times;</button>\r\n    <h4 class=\"modal-title text-danger\">\r\n        <span ng-class=\"icon\"></span>\r\n        <span ng-bind-html=\"header\"></span>\r\n    </h4>\r\n</div>\r\n<div class=\"modal-body text-danger\" ng-bind-html=\"msg\"></div>\r\n<div class=\"modal-footer\">\r\n    <button type=\"button\" class=\"btn btn-default\" ng-click=\"close()\">\r\n        确定\r\n    </button>\r\n</div>");
$templateCache.put("notify.tpl.html","<div class=\"modal-header dialog-header-notify\">\r\n    <button type=\"button\" class=\"close\" ng-click=\"close()\">&times;</button>\r\n    <h4 class=\"modal-title text-info\">\r\n        <span ng-class=\"icon\"></span>\r\n        <span ng-bind-html=\"header\"></span>\r\n    </h4>\r\n</div>\r\n<div class=\"modal-body text-info\" ng-bind-html=\"msg\"></div>\r\n<div class=\"modal-footer\">\r\n    <button type=\"button\" class=\"btn btn-primary\" ng-click=\"close()\">\r\n        确定\r\n    </button>\r\n</div>");
$templateCache.put("wait.tpl.html","<div class=\"modal-header dialog-header-wait\">\r\n    <h4 class=\"modal-title\">\r\n        <span class=\"icon\"></span>\r\n        <span ng-bind-html=\"header\"></span>\r\n    </h4>\r\n</div>\r\n<div class=\"modal-body\">\r\n    <p ng-bind-html=\"msg\"></p>\r\n\r\n    <div class=\"progress progress-striped active\">\r\n        <div class=\"progress-bar progress-bar-info\" ng-style=\"getProgress()\"></div>\r\n    </div>\r\n</div>");}]);