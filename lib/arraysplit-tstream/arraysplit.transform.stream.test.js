/*jslint vars: true, devel:true, nomen: true, node: true, indent: 4, maxerr: 50*/
/*global describe, it*/
"use strict";

var ArraySplitTStream = require("./arraysplit.transform.stream.js"),
    ObjectRStream = require("../object-rstream/object.read.stream.js"),
    should = require("should");

describe("arraysplit.transform.stream.js", function (asyncDone) {
    it("Should emit an error when an array is not sent into the stream.", function () {
        var readStream = new ObjectRStream(1),
            arrSplit = new ArraySplitTStream();

            arrSplit.on("error", function(err){
              should.exist(err);
              asyncDone();
            });
            readStream.pipe(arrSplit).resume();
    });
    it("Should the array as individual parts.", function (asyncDone) {
        var readStream = new ObjectRStream([1,2,3,4,5]),
            arrSplit = new ArraySplitTStream(),
            dataCount = 0,
            emptyArr = [];


            arrSplit.on("data", function(d){
              dataCount = dataCount + 1;
              emptyArr.push(d);
            });
            arrSplit.on("end", function(){
              emptyArr.should.eql([1,2,3,4,5]);
              dataCount.should.equal(5);
              asyncDone();
            });
            readStream.pipe(arrSplit).resume();
    });
});
