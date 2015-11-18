/*jslint vars: true, devel:true, nomen: true, node: true, indent: 4, maxerr: 50*/
/*global describe, it*/
"use strict";

var ObjectReadStream = require("../../index.js").ObjectReadStream,
    ErrorStream = require("./error.transform.stream.js");

describe("error.transform.stream.js", function () {
    it("Should emit an error event with the next given to it.", function (asyncDone) {
        var objReadStr = new ObjectReadStream({
                person: true
            }),
            errStream = new ErrorStream({
                objectMode: true
            }, "You generated an error.");

        objReadStr.pipe(errStream)
            .on("error", function (err) {
                err.message.should.eql("You generated an error.");
                asyncDone();
            })
            .resume();



    });

});
