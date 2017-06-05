'use strict';

var scrapers = {};

scrapers['imgur'] = require('./scrapers/imgur.js');

exports.scrape = function(req, res) {
    var url = req.body.url;
    console.log("url vvvv", url);
    console.log(url);

    var scraperToUse;

    if (url.indexOf("imgur") > -1) 
    {
        scraperToUse = "imgur";
    }
    else
    {
        console.log("can't find scraper");
    }

    scrapers[scraperToUse].list(url, function(data){
        console.log("data from scraper", data);
        res.json(data);
    });
};