/*jslint vars: true, devel: true, nomen: true, node: true, indent: 4, maxerr: 50 */
"use strict";

var Transform = require("stream").Transform,
    asyncLib = require("async"),
    util = require("util");


function ArraySplitStream() {
    if (!(this instanceof ArraySplitStream)) {
        return new ArraySplitStream();
    }

    var opt = {
        objectMode: true
    };

    Transform.call(this, opt);
}

util.inherits(ArraySplitStream, Transform);

ArraySplitStream.prototype._transform = function (chunk, enc, tDone) {
    var self = this;

    function iter(item, done) {
        self.push(item);
        done();
    }

    function forEachDone() {
        tDone();
    }

    if (Array.isArray(chunk)) {
        asyncLib.each(chunk, iter, forEachDone);
    } else {
        self.emit("error", new Error("Chunk is not an array"));
        tDone();
    }

};

ArraySplitStream.prototype._flush = function (fDone) {
    fDone();
};

module.exports = ArraySplitStream;
