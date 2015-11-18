/*jslint vars: true, devel:true, nomen: true, node: true, indent: 4, maxerr: 50*/
/*global describe, it*/
"use strict";


var Transform = require("stream").Transform,
    util = require("util");

function ErrorStream(opt, errorText) {
    if (!(this instanceof ErrorStream)) {
        return new ErrorStream(opt, filter);
    }

    Transform.call(this, opt);

    this.errorText = errorText;
}

util.inherits(ErrorStream, Transform);

ErrorStream.prototype._transform = function (data, enc, tDone) {
    var self = this;
    self.emit("error", new Error(self.errorText));
    self.push(data);
};

ErrorStream.prototype._flush = function (fDone) {
    fDone();
};

module.exports = ErrorStream;
