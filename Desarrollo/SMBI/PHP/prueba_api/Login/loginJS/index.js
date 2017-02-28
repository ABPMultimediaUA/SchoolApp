/*var item = sessionStorage.getItem("id");
if(item!=null){
    document.getElementById("num").value=item;
} */



var app = angular.module('myApp', []);
    
app.controller('controllerLogin', function($scope, $http) { 

    $scope.login = function(){
      var usuario = document.getElementById("user").value;
      var password = document.getElementById("password").value;
      var bool = true;

      if(user == null || password == null){
          bool = true;
      }else{
        var param = "username/" + usuario + "/password/" + password;
      }

      if(bool == true){
          var self = this;
          $http({
              url: "http://localhost/prueba_api/alpha2/index.php/user/user", 
              method: "GET",
              params: {username: usuario, password: password}
          })
           .then(function(response) {
              alert(Login)
              self.compuesto = angular.fromJson(response.data);
              $scope.seleccionado = {simple: []};
              $scope.seleccionado.simple = self.compuesto;
          }, function errorCallback(response) {
              alert(Erroh)
          });
      }


    }


    $scope.reload = function() {  
        sessionStorage.setItem("id", document.getElementById("num").value);
        location.reload();   
    }
});




/* (function() {
  var app = angular.module('myApp', ['ui.router']);
  
  app.run(function($rootScope, $location, $state, LoginService) {
    $rootScope.$on('$stateChangeStart', 
      function(event, toState, toParams, fromState, fromParams){ 
          console.log('Changed state to: ' + toState);
      });
    
      if(!LoginService.isAuthenticated()) {
        $state.transitionTo('login');
      }
  });
  
  app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
      .state('login', {
        url : '/login',
        templateUrl : 'login.html',
        controller : 'LoginController'
      })
      .state('home', {
        url : '/inicio.html',
        templateUrl : 'inicio.html',
        controller : 'HomeController'
      });
  }]);


  app.controller('LoginController', function($scope, $rootScope, $stateParams, $state, $window, LoginService) {
    
    $scope.formSubmit = function() {
      if(LoginService.login($scope.username, $scope.password)) {
        $scope.error = '';
        $scope.username = '';
        $scope.password = '';
        $state.transitionTo('home');
      } else {
        $scope.error = "Incorrect username/password !";
      }   
    };
    
  });
  

  
  app.factory('LoginService', function() {
    var admin = 'test';
    var pass = 'test';
    var isAuthenticated = false;
    
    return {
      login : function(username, password) {
        isAuthenticated = username === admin && password === pass;
        return isAuthenticated;
      },
      isAuthenticated : function() {
        return isAuthenticated;
      }
    };
    
  });
  
})();
*/