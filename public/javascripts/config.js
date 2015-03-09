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
                    }],
                    queuePromise : ['queue', function(queue){
                        queue.isEmptyApi();
                        return queue.getAll();
                    }],
                    gamePromise : ['game', function(game){
                        game.isFullApi();
                        return game.getAll();
                    }]
                }
            });

            $urlRouterProvider.otherwise('main');
        }
    ]);