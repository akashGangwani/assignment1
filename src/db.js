"use strict";
exports.__esModule = true;
exports.magazinesData = exports.booksData = exports.authorData = void 0;
var fs = require("fs");
var csv = require("fast-csv");
//defining an array to store the data
var authorData = [];
exports.authorData = authorData;
//creating a read stream to read authors.csv data separated by ; and excluding the headers
fs.createReadStream('./data/authors.csv')
    .pipe(csv.parse({ headers: true, delimiter: ';' }))
    .on('error', function (error) { return console.error(error); })
    .on('data', function (row) { return authorData.push(row); })
    .on('end', function () { return console.log('done'); });
//defining an array to store the data
var booksData = [];
exports.booksData = booksData;
//creating a read stream to read authors.csv data separated by ; and excluding the headers
fs.createReadStream('./data/books.csv')
    .pipe(csv.parse({ headers: true, delimiter: ';' }))
    .on('error', function (error) { return console.error(error); })
    .on('data', function (row) { return booksData.push(row); })
    .on('end', function () { return console.log('done'); });
//defining an array to store the data
var magazinesData = [];
exports.magazinesData = magazinesData;
//creating a read stream to read authors.csv data separated by ; and excluding the headers
fs.createReadStream('./data/magazines.csv')
    .pipe(csv.parse({ headers: true, delimiter: ';' }))
    .on('error', function (error) { return console.error(error); })
    .on('data', function (row) { return magazinesData.push(row); })
    .on('end', function () { return console.log('done'); });
