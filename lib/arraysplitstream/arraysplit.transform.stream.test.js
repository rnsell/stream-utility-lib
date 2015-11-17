/*jslint vars: true, devel: true, nomen: true, node: true, indent: 4, maxerr: 50 */
/*global describe, it*/
"use strict";

var indexPath = "../../index.js",
    ArraySplitStream = require("./arraysplit.transform.stream.js"),
    ObjectReadStream = require(indexPath).ObjectReadStream,
    should = require("should");

describe("arraysplit.transform.stream.js", function () {
    it("Should split all the elements of the array and emit all the data", function (testDone) {
        var testArray = [1, 2, 3, 4, 5, 6, 7, 8],
            agg = [],
            readStream = new ObjectReadStream(testArray),
            arraySplitTransform = new ArraySplitStream();

        readStream
            .pipe(arraySplitTransform)
            .on("data", function (d) {
                agg.push(d);
            })
            .on("end", function () {
                agg.should.eql(testArray);
                testDone();
            });
    });
});
