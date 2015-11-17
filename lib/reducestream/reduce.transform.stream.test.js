/*jslint vars: true, devel: true, nomen: true, node: true, indent: 4, maxerr: 50 */
/*global describe, it*/
"use strict";

var indexPath = "../../index.js",
    should = require("should"),
    ReduceStream = require("./reduce.transform.stream.js"),
    ArraySplitStream = require(indexPath).ArraySplitStream,
    ObjectReadStream = require(indexPath).ObjectReadStream;


describe("reduce.transform.stream.js", function (asyncDone) {
    it("Should sum an array to a single value using an inital value.", function () {
        function sum(agg, element) {
            return agg + element;
        }
        var testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9],
            dataCount = 0,
            objReadStream = new ObjectReadStream(testArr),
            splitStream = new ArraySplitStream(),
            reduceStream = new ObjectReadStream({
                objectMode: true
            }, sum, 0);

        objReadStream
            .pipe(splitStream)
            .pipe(reduceStream)
            .on("data", function (d) {
                dataCount = dataCount + 1;
                d.should.equal(1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9);
            })
            .on("end", function () {
                dataCount.should.equal(1);
                asyncDone();
            });
    });

    it("Should sum an array to a single value without an inital value.", function () {
        function sum(agg, element) {
            return agg + element;
        }
        var testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9],
            dataCount = 0,
            objReadStream = new ObjectReadStream(testArr),
            splitStream = new ArraySplitStream(),
            reduceStream = new ObjectReadStream({
                objectMode: true
            }, sum);

        objReadStream
            .pipe(splitStream)
            .pipe(reduceStream)
            .on("data", function (d) {
                dataCount = dataCount + 1;
                d.should.equal(1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9);
            })
            .on("end", function () {
                dataCount.should.equal(1);
                asyncDone();
            });
    });

    it("Should sum an array to a single value without an inital value.", function () {
        function aggAray(agg, element) {
            return agg.push(element);
        }
        var testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9],
            dataCount = 0,
            objReadStream = new ObjectReadStream(testArr),
            splitStream = new ArraySplitStream(),
            reduceStream = new ObjectReadStream({
                objectMode: true
            }, aggAray, []);

        objReadStream
            .pipe(splitStream)
            .pipe(reduceStream)
            .on("data", function (d) {
                dataCount = dataCount + 1;
                d.should.equal(testArr);
            })
            .on("end", function () {
                dataCount.should.equal(1);
                asyncDone();
            });
    });



});
