/*jslint vars: true, devel:true, nomen: true, node: true, indent: 4, maxerr: 50*/

"use strict";

var Transform = require("stream").Transform,
    util = require("util");

function MapTStream(opt, mapFunction) {
    if (!(this instanceof MapTStream)) {
        return new MapTStream(opt, mapFunction);
    }

    Transform.call(this, opt);
    this.mapFunction = mapFunction;
}

util.inherits(MapTStream, Transform);

MapTStream.prototype._transform = function (data, enc, tDone) {
    var self = this;
    self.push(self.mapFunction(data));
    tDone();
};

MapTStream.prototype._flush = function (fDone) {
    fDone();
};

module.exports = MapTStream;
