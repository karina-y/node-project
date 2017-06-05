'use strict';

var request = require('request');
var cheerio = require('cheerio');



exports.list = function(url, cb) {
    request(url, function(error, resp, body) {
        if (error)
        {
            cb({
                error: error
            });
        }
        if (!error)
        {
            var $ = cheerio.load(body);
            var imgur = {};
            var $url = url;
            var $img = $('.post-image img').attr('src');
            //var $desc = $('._icyx7').attr('alt');
            //var $desc = $('.post-title').textContent;
            var $desc = "default description";

            console.log("scraped data", $img, $desc);
            // console.log($img);
            // console.log($desc);

            var imgur = {
                img: "http:" + $img
                ,url: $url
                ,desc: $desc
            };

            //respond with final json obj
            console.log("final json obj");
            cb(imgur);
        }
    });
}