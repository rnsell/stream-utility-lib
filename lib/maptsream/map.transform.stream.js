/*jslint vars: true, devel:true, nomen: true, node: true, indent: 4, maxerr: 50*/
"use strict";
var Transform = require("stream").Transform,
    util = require("util");

function MapTransformStream(opt, mapFunction) {
    if (!(this instanceof MapTransformStream)) {
        return new MapTransformStream(opt);
    }
    this.call(Transform, opt);
}

util.inherit(MapTransformStream, Transform);

MapTransformStream.prototype._transform = function (data, enc, tDone) {
    var self = this;
};

MapTransformStream.prototype._flush = function (fDone) {
    var self = this;
};

module.exports = MapTransformStream;
