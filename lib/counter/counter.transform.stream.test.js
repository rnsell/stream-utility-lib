/*jslint vars: true, devel:true, nomen: true, node: true, indent: 4, maxerr: 50*/
/*global describe, it*/
"use strict";

var indexPath = "../../index.js",
    sinon = require("sinon"),
    should = require("should"),
    ArraySplitStream = require(indexPath).ArraySplitStream,
    ObjectReadStream = require(indexPath).ObjectReadStream,
    CounterStream = require("./counter.transform.stream.js");

describe("counter.transform.stream.js", function () {
    it("Filter count function should be called..", function (asyncDone) {
        this.timeout(5000);
        var array = [1, 2, 3, 4, 5, 6, 7, 8, 9],
            objectReadStream = new ObjectReadStream(array),
            arraySplitStream = new ArraySplitStream(),
            filterFunc = sinon.spy(),
            counterStream = new CounterStream({
                objectMode: true
            }, filterFunc);
        objectReadStream.pipe(arraySplitStream)
            .pipe(counterStream)
            .on("end", function () {
                filterFunc.called.should.equal(true);
                asyncDone();
            }).resume();
    });



    it("Should count 9 elements.", function (asyncDone) {
        var array = [1, 2, 3, 4, 5, 6, 7, 8, 9],
            objectReadStream = new ObjectReadStream(array),
            arraySplitStream = new ArraySplitStream(),
            counterStream = new CounterStream({
                objectMode: true
            }, function () {
                return true;
            });
        objectReadStream.pipe(arraySplitStream)
            .pipe(counterStream)
            .on("end", function () {
                counterStream.counter.should.equal(9);
                asyncDone();
            }).resume();
    });
});
