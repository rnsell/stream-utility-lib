/*jslint vars: true, devel:true, nomen: true, node: true, indent: 4, maxerr: 50*/
'use strict';
var Readable = require('stream').Readable,
    util = require('util');

function ObjectReadStream(obj) {
    if (!(this instanceof ObjectReadStream)) {
        return new ObjectReadStream(obj);
    }
    Readable.call(this, {
        objectMode: true
    });
    this.obj = obj;
}
util.inherits(ObjectReadStream, Readable);
ObjectReadStream.prototype._read = function () {
    var self = this;
    self.push(self.obj);
    self.push(null);
};
module.exports = ObjectReadStream;
