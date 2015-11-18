/*jslint vars: true, devel: true, nomen: true, node: true, indent: 4, maxerr: 50 */
/*global describe, it*/
"use strict";

var indexPath = "../../index.js",
    should = require("should"),
    ReduceStream = require("./reduce.transform.stream.js"),
    ArraySplitStream = require(indexPath).ArraySplitStream,
    ObjectReadStream = require(indexPath).ObjectReadStream;


describe("reduce.transform.stream.js", function () {
    it("Should sum an array to a single value using an inital value.", function (asyncDone) {
        var testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9],
            dataCount = 0,
            sum = function (agg, element) {
                return agg + element;
            },
            objReadStream = new ObjectReadStream(testArr),
            splitStream = new ArraySplitStream(),
            reduceStream = new ReduceStream({
                objectMode: true
            }, sum, 0);

        objReadStream
            .pipe(splitStream)
            .pipe(reduceStream)
            .on("data", function (d) {
                // console.log(d);
                dataCount = dataCount + 1;
                d.should.equal(1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9);
            })
            .on("end", function () {
                dataCount.should.equal(1);
                asyncDone();
            });
    });

    it("Should sum an array to a single value without an inital value.", function (asyncDone) {
        var testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9],
            dataCount = 0,
            sum = function (agg, element) {
                return agg + element;
            },
            objReadStream = new ObjectReadStream(testArr),
            splitStream = new ArraySplitStream(),
            reduceStream = new ReduceStream({
                objectMode: true
            }, sum);

        objReadStream
            .pipe(splitStream)
            .pipe(reduceStream)
            .on("data", function (d) {
                // console.log(d);
                dataCount = dataCount + 1;
                d.should.equal(1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9);
            })
            .on("end", function () {
                dataCount.should.equal(1);
                asyncDone();
            });
    });

    it("Should split an array and combine the array into a new array.", function (asyncDone) {

        var testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9],
            dataCount = 0,
            aggAray = function (agg, element) {
                agg.push(element);
                return agg;
            },
            objReadStream = new ObjectReadStream(testArr),
            splitStream = new ArraySplitStream(),
            reduceStream = new ReduceStream({
                objectMode: true
            }, aggAray, []);

        objReadStream
            .pipe(splitStream)
            .pipe(reduceStream)
            .on("data", function (d) {
                dataCount = dataCount + 1;
                d.should.eql(testArr);
            })
            .on("end", function () {
                dataCount.should.equal(1);
                asyncDone();
            });
    });
});
