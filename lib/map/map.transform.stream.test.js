/*jslint vars: true, devel:true, nomen: true, node: true, indent: 4, maxerr: 50*/
/*global describe, it*/
"use strict";

var indexPath = "../../index.js",
    ArraySplitStream = require(indexPath).ArraySplitStream,
    ObjectReadStream = require(indexPath).ObjectReadStream,
    MapStream = require("./map.transform.stream.js"),
    sinon = require("sinon"),
    should = require("should");

describe("map.transform.stream.js", function () {
    it("Should call the map function", function (asyncDone) {
        var spy = sinon.spy(),
            objectRead = new ObjectReadStream({
                l: true
            }),
            mapStream = new MapStream({
                objectMode: true
            }, spy);

        objectRead.pipe(mapStream)
            .on("end", function () {
                spy.called.should.equal(true);
                asyncDone();
            })
            .resume();
    });
    it("Should map the data flowing through the stream.", function (asyncDone) {
        var mapFunction = function (e) {
                return {
                    prop1: true,
                    prop2: e.prop
                };
            },
            objectRead = new ObjectReadStream({
                prop: true
            }),
            mapStream = new MapStream({
                objectMode: true
            }, mapFunction);

        objectRead.pipe(mapStream)
            .on("data", function (d) {
                d.should.eql({
                    prop1: true,
                    prop2: true
                });
            })
            .on("end", function () {
                asyncDone();
            })
            .resume();
    });
});
