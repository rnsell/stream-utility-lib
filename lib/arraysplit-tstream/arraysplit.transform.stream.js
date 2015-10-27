/*jslint vars: true, devel:true, nomen: true, node: true, indent: 4, maxerr: 50*/

"use strict";

var Transform = require("stream").Transform,
    util = require("util");

function ArraySplitStream() {
    if (!(this instanceof ArraySplitStream)) {
        return new ArraySplitStream();
    }

    Transform.call(this, {
        objectMode: true
    });

}

util.inherits(ArraySplitStream, Transform);

ArraySplitStream.prototype._transform = function (data, enc, tDone) {
    var self = this;
    if (!Array.isArray(data)) {
        self.emit("error", new Error("data is not an array"));
    } else {
        data.forEach(function (e) {
            self.push(e);
        });
    }
    tDone();
};

ArraySplitStream.prototype._flush = function (fDone) {
    fDone();
};

module.exports = ArraySplitStream;
