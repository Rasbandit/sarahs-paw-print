angular.module("sarApp", ['ui.router', 'ngAnimate', 'angular-elevate-zoom'])
    .config(function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/');

       $stateProvider
           .state('home', {
               templateUrl: './views/home.html',
               controller: 'homeCtrl',
               url: '/'
           })
           .state('about', {
               templateUrl: './views/about.html',
               controller: 'aboutCtrl',
               url: '/about'
           })
           .state('portrait', {
               templateUrl: './views/portrait.html',
               controller: 'portraitCtrl',
               url: '/portraits'
           })
           .state('other', {
               templateUrl: './views/other.html',
               controller: 'otherCtrl',
               url: '/other'
           })
           .state('contact', {
               templateUrl: './views/contact.html',
               controller: 'contactCtrl',
               url: '/contact'
           })
           .state('login', {
               templateUrl: './views/login.html',
               controller: 'loginCtrl',
               url: '/login'
           })
           .state('admin', {
               templateUrl: './views/admin.html',
               controller: 'adminCtrl',
               url: '/admin'
           });
    });
