/*jslint vars: true, devel:true, nomen: true, node: true, indent: 4, maxerr: 50*/
/*global describe, it*/
"use strict";
var ObjectReadStream = require('./object.read.stream.js'),
    should = require("should");
describe("object.read.stream.js", function () {
    it("Should emit the input object once.", function (itDone) {
        var testReadObj = {
                message: "Stream"
            },
            count = 0,
            objRStream = new ObjectReadStream(testReadObj);
        objRStream.on("data", function (d) {
            count = count + 1;
            d.should.eql(testReadObj);
        });
        objRStream.on("end", function () {
            count.should.equal(1);
            itDone();
        });
        objRStream.resume();
    });
});
