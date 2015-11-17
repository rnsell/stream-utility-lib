/*jslint vars: true, devel: true, nomen: true, node: true, indent: 4, maxerr: 50 */
"use strict";

var Transform = require("stream").Transform,
    util = require("util");

function ReduceStream(opt, reduceFunc, initialvalue) {
    if (!(this instanceof ReduceStream)) {
        return new ReduceStream(reduceFunc, initialvalue);
    }

    Transform.call(this, opt);

    this.reduceFunc = reduceFunc;
    this.agg = initialvalue;

}

util.inherits(ReduceStream, Transform);

ReduceStream.prototype._transform = function (chunk, enc, tDone) {
    var firstCall = this.firstCall,
        agg = this.agg;

    if (agg === undefined) {
        agg = chunk;
    } else {
        agg = this.reduceFunc(agg, chunk);
    }
    // console.log(this.agg);
    tDone();
};

ReduceStream.prototype._flush = function (fDone) {
    this.push(this.agg);
    fDone();
}

module.exports = ReduceStream;
