(function() {
    'use strict';

    angular
        .module('app')
        .factory('looksAPI', looksAPI);

        looksAPI.$inject = ['$http'];

        function looksAPI($http) {
            return {
                createScrapeLook: createScrapeLook
            }

            function createScrapeLook(look) {
                console.log("createScrapeLook hit");

                return $http.post('/api/look/scrapeUpload', look);
            }
        }
})();