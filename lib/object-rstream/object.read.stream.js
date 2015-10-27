/*jslint vars: true, devel:true, nomen: true, node: true, indent: 4, maxerr: 50*/
'use strict';
var Readable = require('stream').Readable,
    util = require('util');

function ObjectRStream(obj) {
    if (!(this instanceof ObjectRStream)) {
        return new ObjectRStream(obj);
    }
    Readable.call(this, {
        objectMode: true
    });
    this.obj = obj;
}
util.inherits(ObjectRStream, Readable);

ObjectRStream.prototype._read = function () {
    var self = this;
    self.push(self.obj);
    self.push(null);
};
module.exports = ObjectRStream;
