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