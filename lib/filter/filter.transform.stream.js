/*jslint vars: true, devel: true, nomen: true, node: true, indent: 4, maxerr: 50 */
"use strict";

var util = require("util"),
    Transform = require("stream").Transform;

function FilterStream(option, filterFunction) {
    if (!(this instanceof FilterStream)) {
        return new FilterStream(option, filterFunction);
    }

    Transform.call(this, option);
    this.filterFunction = filterFunction;

}

util.inherits(FilterStream, Transform);

FilterStream.prototype._transform = function (chunk, enc, tDone) {
    var self = this;
    if (self.filterFunction(chunk)) {
        self.push(chunk);
    }
    tDone();
};

FilterStream.prototype._flush = function (fDone) {
    fDone();
};

module.exports = FilterStream;
