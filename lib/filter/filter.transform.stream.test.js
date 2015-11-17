/*jslint vars: true, devel: true, nomen: true, node: true, indent: 4, maxerr: 50 */
/*global describe, it*/
"use strict";

var indexPath = "../../index.js",
    ArraySplitStream = require(indexPath).ArraySplitStream,
    ObjectReadStream = require(indexPath).ObjectReadStream,
    FilterStream = require("./filter.transform.stream.js"),
    sinon = require("sinon"),
    should = require("should");

describe("filter.transform.stream.js", function () {
    it("Should call a filter function", function (asyncDone) {
        var callback = sinon.spy(),
            arr = [1, 2, 3, 4, 5, 6, 7, 8, 9],
            objReadStream = new ObjectReadStream(arr),
            splitStream = new ArraySplitStream(),
            filterStream = new FilterStream({
                objectMode: true
            }, callback);

        objReadStream.pipe(splitStream)
            .pipe(filterStream)
            .on("end", function () {
                callback.called.should.eql(true);
                asyncDone();
            }).resume();
    });

    it("Should allow even numbers through", function (asyncDone) {
        var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9],
            resultArr = [],
            expectedArr = [2, 4, 6, 8],
            objReadStream = new ObjectReadStream(arr),
            splitStream = new ArraySplitStream(),
            filterStream = new FilterStream({
                objectMode: true
            }, function (e) {
                return e % 2 === 0;
            });

        objReadStream.pipe(splitStream)
            .pipe(filterStream)
            .on("data", function (d) {
                resultArr.push(d);
            })
            .on("end", function () {
                resultArr.should.eql(expectedArr);
                asyncDone();
            }).resume();
    });


});
