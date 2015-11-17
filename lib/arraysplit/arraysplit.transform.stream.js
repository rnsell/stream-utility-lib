/*jslint vars: true, devel: true, nomen: true, node: true, indent: 4, maxerr: 50 */
"use strict";

var Transform = require("stream").Transform,
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

    chunk.forEach(function (ele) {
        self.push(ele);
    });

    tDone();
};

ArraySplitStream.prototype._flush = function (fDone) {
    fDone();
};

module.exports = ArraySplitStream;
