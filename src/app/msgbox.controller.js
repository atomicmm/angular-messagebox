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
