/*jslint vars: true, devel: true, nomen: true, node: true, indent: 4, maxerr: 50 */
/*global describe, it*/

"use strict";


var indexPath = "../../index.js",
    ArraySplitStream = require(indexPath).ArraySplitStream,
    ObjectReadStream = require(indexPath).ObjectReadStream,
    FilterCollectorStream = require("./filtercollector.transform.stream.js"),
    should = require("should");

describe("filtercollector.transform.stream.js", function () {
    it("Should store even numbers to storage object in filtercollector", function (testDone) {
        function isOdd(number) {
            return number % 2 === 1;
        }
        var a = [1, 2, 3, 4, 5, 6, 7, 8, 9],
            objectRead = new ObjectReadStream(a),
            splitTransform = new ArraySplitStream(),
            filterCollector = new FilterCollectorStream({
                objectMode: true
            }, isOdd);

       //Run the piping functions
        objectRead.pipe(splitTransform)
            .pipe(filterCollector)
            .resume();

        //Check the filter collector for when its done to run assertion.
        filterCollector.on("end", function () {
            // console.log(this.storage);
            this.storage.should.eql([2, 4, 6, 8]);
            testDone();
        });
    });
});
