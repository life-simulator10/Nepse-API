const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

async function getNepseFeed() {
    try {
        const siteURL = "https://merolagani.com/LatestMarket.aspx/"
        const { data } = await axios({
            method: "GET",
            url: siteURL
        })
        const $ = cheerio.load(data);
        const elemSelector = "#ctl00_ContentPlaceHolder1_LiveTrading > table > tbody > tr";
        const nepse = []
        const keys = [
            "scrip",
            "ltp",
            "percent_change",
            "high",
            "low",
            "LowValue",
            "qty"
        ]

        $(elemSelector).each((parentIdx, parentElem) => {
            let keyIdx = 0
            const marketData = {}
            $(parentElem).children().each((childIdx, childElem) => {
                const tdValue = $(childElem).text();
                if (tdValue) {
                    marketData[keys[keyIdx]] = tdValue
                    keyIdx++
                }
            })
            nepse.push(marketData)
        })
        return nepse
    } catch (error) {
        console.error(err);
    }
}

