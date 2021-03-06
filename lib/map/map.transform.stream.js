/*jslint vars: true, devel:true, nomen: true, node: true, indent: 4, maxerr: 50*/
"use strict";
var Transform = require("stream").Transform,
    util = require("util");

function MapTransformStream(opt, mapFunction) {
    if (!(this instanceof MapTransformStream)) {
        return new MapTransformStream(opt, mapFunction);
    }
    Transform.call(this, opt);
    this.mapFunction = mapFunction;
}

util.inherits(MapTransformStream, Transform);

MapTransformStream.prototype._transform = function (data, enc, tDone) {
    var self = this;
    var mappedData = self.mapFunction(data);
    self.push(mappedData);
    tDone();
};

MapTransformStream.prototype._flush = function (fDone) {
    fDone();
};

module.exports = MapTransformStream;
