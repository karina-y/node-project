(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$state', 'Auth', '$modal', 'looksAPI', 'scrapeAPI'];

  function MainCtrl($scope, $state, Auth, $modal, looksAPI, scrapeAPI) {
    $scope.user = Auth.getCurrentUser();

    $scope.look = {};
    $scope.looks = [];

    $scope.gotScrapeResults = false;
    $scope.loading = false;
    $scope.scrapePostForm = true;
    $scope.showScrapeDetails = false;
    $scope.uploadLookForm = false;
    $scope.uploadLookTitle = true;
    
    var myModal = $modal({
      scope: $scope
      ,show: false
    });

    $scope.showModal = function() {
      myModal.$promise.then(myModal.show);
    };

    //watch for changes to url, scrape and display the results
    $scope.$watch('look.link', function(newVal, oldVal) {
      if (newVal != null && newVal.length > 5)
      {
        $scope.loading = true;

        var link = {
          url: $scope.look.link
        }

        scrapeAPI.getScrapeDetails(link)
        .then(function(data) {
          //console.log(data);
          $scope.showScrapeDetails = true;
          $scope.gotScrapeResults = true;
          $scope.uploadLookTitle = true;
          $scope.look.imgThumb = data.data.img;
          $scope.look.description = data.data.desc;
        })
        .catch(function(data) {
          console.log("failed to return from scrape");
          $scope.loading = false;
          $scope.look.link = "";
          $scope.gotScrapeResults = false;
        })
        .finally(function() {
          $scope.loading = false;
          $scope.uploadLookForm = false;
        });
      }
    });

    $scope.addScrapePost = function() {
      //send the look obj to the backend scrape upload route
      var look = {
        description: $scope.look.description
        ,title: $scope.look.title
        ,image: $scope.look.imgThumb
        ,linkURL: $scope.look.link
        ,email: $scope.user.email
        ,name: $scope.user.name
        ,_creator: $scope.user._id
      }

      looksAPI.createScrapeLook(look)
        .then(function(data) {
          $scope.showScrapeDetails = false;
          $scope.gotScrapeResults = false;
          $scope.look.title = '';
          $scope.look.link = '';
          $scope.looks.splice(0,0, data.data );
          console.log(data);
        })
        .catch(function(response) {
          console.log("failed to post");
          $scope.showScrapeDetails = false;
        });
    }
  }
})();