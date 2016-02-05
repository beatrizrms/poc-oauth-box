(function() {

angular
    .module('test.controller',[])
    .controller('TestController', TestController);

    TestController.$inject = ['$scope', '$rootScope', '$state', '$http', '$ionicModal', '$cordovaOauth', '$ionicModal', '$sce'];

    function TestController ($scope, $rootScope, $state, $http, $ionicModal, $cordovaOauth, $ionicModal, $sce) {

      $ionicModal.fromTemplateUrl('test/box-page.view.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });
      $scope.openModal = function() {
        $scope.modal.show();
      };
      $scope.closeModal = function() {
        $scope.modal.hide();
      };

      $scope.try = function () {

        //client_id / clientSecret / state / options
        var teste = $cordovaOauth.box('wpv0n8yq3pfhjobv5rpvkhvpf80m3owo', 'jAC12IMpI3mqo3WFVmKV6cpLJDkZqwnb', 'security_token%3DKnhMJatFipTAnM0nHlZA')
        .then(function(result) {
            console.log(document.body.innerHTML)
              console.log(result)
              $scope.auth_data = result;

              var document_id = '51964922769';
              var proxy = 'https://api.box.com/2.0/files/'+ document_id + '';

              var req = {
      					method: 'GET',
      					url: proxy,
                headers: {
      						 'Authorization' : 'Bearer '+ result.access_token +'',
      					},
      					timeout: 30000
      				}

              $http(req)
      				.success(function(data) {

                  $scope.preview_doc = $sce.trustAsResourceUrl(data.shared_link.url.replace('/s/', '/embed/preview/') + '?theme=dark');
                  $scope.openModal();

                console.log($scope.preview_doc);
      				}).error(function(data, status) {
                console.log(data);
      				});

        }, function(error) {
            console.log(error);
        });

        console.log(document.body.innerHTML)

      }

    };

})();
