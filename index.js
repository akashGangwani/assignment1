"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var db_1 = require("./src/db");
var cors = require("cors");
var fs = require("fs");
var csv = require("fast-csv");
var path = require("path");
var app = express();
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/src/csv')));
app.use(bodyParser.json());
app.use(cors());
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.get('/authors', function (req, res) {
    res.json(db_1.authorData);
});
app.get('/books', function (req, res) {
    res.send(db_1.booksData);
});
app.get('/magazines', function (req, res) {
    res.send(db_1.magazinesData);
});
app.get('/dataByIsbn/:isbn', function (req, res) {
    try {
        var data = __spreadArray(__spreadArray([], db_1.booksData, true), db_1.magazinesData, true);
        data = data.filter(function (element) {
            if (element.isbn == req.params.isbn) {
                return element;
            }
        });
        res.status(200).json(data);
    }
    catch (e) {
        res.status(500).json(e);
    }
});
app.get('/dataByAuthor/:author', function (req, res) {
    try {
        var data = __spreadArray(__spreadArray([], db_1.booksData, true), db_1.magazinesData, true);
        data = data.filter(function (element) {
            if (element.authors.includes(req.params.author)) {
                return element;
            }
        });
        res.status(200).json(data);
    }
    catch (e) {
        res.status(500).json(e);
    }
});
app.get('/data', function (req, res) {
    var data = __spreadArray(__spreadArray([], db_1.booksData, true), db_1.magazinesData, true);
    data = data.sort(function (element1, element2) {
        return element1.title.localeCompare(element2.title);
    });
    res.json(data);
});
app.post('/data', function (req, res) {
    try {
        console.log(req.body);
        if (req.body.type == "book") {
            db_1.booksData.push({
                title: req.body.title,
                isbn: req.body.isbn,
                authors: req.body.authors,
                description: req.body.description
            });
            var csvStream = csv.format({ headers: true }), writableStream = fs.createWriteStream(path.join(__dirname, '/src/csv/books.csv'));
            writableStream.on('finish', function () {
                console.log('DONE!');
                res.status(200).sendFile(path.join(__dirname, "/src/csv/books.csv"));
            });
            csvStream.pipe(writableStream);
            db_1.booksData.forEach(function (d) {
                csvStream.write(d);
            });
            csvStream.end();
        }
        else {
            console.log(req.body);
            db_1.magazinesData.push({
                title: req.body.title,
                isbn: req.body.isbn,
                authors: req.body.authors,
                publishedAt: req.body.publishedAt
            });
            var csvStream = csv.format({ headers: true }), writableStream = fs.createWriteStream(path.join(__dirname, './src/csv/magazine.csv'));
            writableStream.on('finish', function () {
                console.log('DONE!');
                res.status(200).sendFile(path.join(__dirname, './srccsv/magazine.csv'));
            });
            csvStream.pipe(writableStream);
            db_1.magazinesData.forEach(function (d) {
                csvStream.write(d);
            });
            csvStream.end();
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});
app.listen(80, function () {
    console.log('Started at port 80');
});
exports["default"] = app;
