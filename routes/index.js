var express = require('express');
var router = express.Router();

const Countries = require('../models/Countries');
const axios = require("axios");
const {groupByRegion} = require("../helper/functions");

const COUNTRIES_ENDPOINT = `http://localhost:${process.env.SERVER_PORT}/countries`;

/* Countries Endpoint Begin */
router.get('/countries', function (req, res, next) {
    try {
        let region = req.query.region;

        let promise;
        if (region !== undefined) {
            promise = Countries.find({region: region});
        } else {
            promise = Countries.find();
        }

        promise.then((data) => {
            res.json(data)
        }).catch((error) => {
            res.status(500).json({error: "The Service Error!"});
        })
    } catch (error) {
        res.status(500).json({error: "Internal Server Error : " + error});
    }
});
/* Countries Endpoint End */

/* Salesrep Endpoint Begin */
router.get('/salesrep', async function (req, res, next) {
    try {
        const response = await axios.get(COUNTRIES_ENDPOINT);

        regions = await groupByRegion(response.data);

        const salesRepRequirements = [];
        for (const region in regions) {
            const countriesInRegion = regions[region];
            const numCountries = countriesInRegion.length;
            const minReps = Math.ceil(numCountries / 7); // At least 1 rep per 7 countries
            const maxReps = Math.ceil(numCountries / 3); // At most 1 rep per 3 countries
            salesRepRequirements.push({region: region, minSalesReq: minReps, maxSalesReq: maxReps});
        }
        res.json(salesRepRequirements);

    } catch (error) {
        res.status(500).json({error: "Internal Server Error" + error});
    }
});
/* Salesrep Endpoint End */

module.exports = router;
