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