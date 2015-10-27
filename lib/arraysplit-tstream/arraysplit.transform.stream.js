/*jslint vars: true, devel:true, nomen: true, node: true, indent: 4, maxerr: 50*/

"use strict";

var Transform = require("stream").Transform,
    util = require("util");

function ArraySplitTStream() {
    if (!(this instanceof ArraySplitTStream)) {
        return new ArraySplitTStream();
    }

    Transform.call(this, {
        objectMode: true
    });

}

util.inherits(ArraySplitTStream, Transform);

ArraySplitTStream.prototype._transform = function (data, enc, tDone) {
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

ArraySplitTStream.prototype._flush = function (fDone) {
    fDone();
};

module.exports = ArraySplitTStream;
