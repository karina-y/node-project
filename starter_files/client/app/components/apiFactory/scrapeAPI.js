(function() {
    'use strict';

    angular
        .module('app')
        .factory('scrapeAPI', scrapeAPI);

        scrapeAPI.$inject = ['$http'];

        function scrapeAPI($http) {
            return {
                getScrapeDetails: getScrapeDetails
            }

            console.log("scrapeAPI hit");

            function getScrapeDetails(link) {
                console.log("getScrapeDetails hit");
                
                return $http.post('/api/links/scrape', link);
            }
        }
})();