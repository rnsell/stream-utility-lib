/*jslint vars: true, devel:true, nomen: true, node: true, indent: 4, maxerr: 50*/
/*global describe, it*/
"use strict";

var MapTStream = require("./map.transform.stream.js"),
    ObjectRStream = require("../../index.js").ObjectRStream,
    sinon = require("sinon"),
    should = require("should");

describe("map.transform.stream.js", function () {
    it("Should verify map funciton is called", function (itDone) {
        var map = sinon.spy();
        var objRead = new ObjectRStream(1);

        var mapTransform = new MapTStream({
            objectMode: true
        }, map);

        objRead.pipe(mapTransform).on("end", function () {
            map.called.should.equal(true);
            itDone();
        }).resume();
    });

    it("Should double the number sent into the Map Transform Stream", function (itDone) {
        var objRead = new ObjectRStream(1);

        var mapTransform = new MapTStream({
            objectMode: true
        }, function (e) {
            return 2 * e;
        });

        objRead.pipe(mapTransform).on("data", function (d) {
            d.should.equal(2);
        }).on("end", function () {
            itDone();
        }).resume();
    });

});
