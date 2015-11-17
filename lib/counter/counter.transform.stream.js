/*jslint vars: true, devel:true, nomen: true, node: true, indent: 4, maxerr: 50*/

"use strict";

var Transform = require("stream").Transform,
    util = require("util");

function CounterStream(opt, counterFilter) {
    if (!(this instanceof CounterStream)) {
        return new CounterStream(opt, counterFilter);
    }

    // console.log(opt);
    Transform.call(this, opt);
    this.counterFilter = counterFilter;
    this.counter = 0;
}

util.inherits(CounterStream, Transform);

CounterStream.prototype._transform = function (data, enc, tDone) {
    var self = this;
    if (self.counterFilter(data)) {
        self.counter = self.counter + 1;
    }
    self.push(data);
    tDone();
};

CounterStream.prototype._flush = function (fDone) {
    // var self = this;
    fDone();
};

module.exports = CounterStream;
