/*jslint vars: true, devel: true, nomen: true, node: true, indent: 4, maxerr: 50 */
"use strict";

var Transform = require("stream").Transform,
    util = require("util");

function ReduceStream(opt, reduceFunc, initialvalue) {
    if (!(this instanceof ReduceStream)) {
        return new ReduceStream(opt, reduceFunc, initialvalue);
    }

    Transform.call(this, opt);

    this.reduceFunc = reduceFunc;
    this.agg = initialvalue;
    // console.log(agg);
}

util.inherits(ReduceStream, Transform);

ReduceStream.prototype._transform = function (chunk, enc, tDone) {
    var self = this;

    if (self.agg === undefined) {
        self.agg = chunk;
    } else {
        self.agg = self.reduceFunc(self.agg, chunk);
    }

    tDone();
};

ReduceStream.prototype._flush = function (fDone) {
    var self = this;
    self.push(self.agg);
    fDone();
};

module.exports = ReduceStream;
