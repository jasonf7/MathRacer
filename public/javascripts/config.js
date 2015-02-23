/**
 * Created by jasonf7 on 15-01-29.
 */
angular.module('mathRacer', ['ui.router', 'ui.bootstrap', 'btford.socket-io'])
.config([
        '$stateProvider',
        '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('main', {
                url: '/main',
                templateUrl: '/views/main.html',
                controller: 'MainCtrl',
                resolve: {
                    onlinePromise: ['online', function(online){
                        return online.getAll();
                    }]
                }
            });

            $urlRouterProvider.otherwise('main');
        }
    ]);