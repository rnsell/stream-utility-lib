/*jslint vars: true, devel: true, nomen: true, node: true, indent: 4, maxerr: 50 */
"use strict";

var Transform = require("stream").Transform,
    util = require("util");

function FilterCollectorStream(opt, filter) {
    if (!(this instanceof FilterCollectorStream)) {
        return new FilterCollectorStream(opt, filter);
    }

    Transform.call(this, opt);

    this.filter = filter;
    this.storage = [];
}

util.inherits(FilterCollectorStream, Transform);

FilterCollectorStream.prototype._transform = function (data, enc, tDone) {
    if (this.filter(data)) {
        this.push(data);
    } else {
        this.storage.push(data);
    }
    tDone();
};

FilterCollectorStream.prototype._flush = function (fDone) {
    fDone();
};

module.exports = FilterCollectorStream;
