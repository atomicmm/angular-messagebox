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
