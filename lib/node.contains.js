"use strict";
var DOCUMENT_POSITION_CONTAINED_BY = 16;
module.exports = function (window) {
    window.Node && !window.Node.prototype.contains && (function(NodePrototype) {
        NodePrototype.contains = function(child) {
            var comparison = this.compareDocumentPosition(child);
            return !!((comparison===0) || (comparison & DOCUMENT_POSITION_CONTAINED_BY));
        };
    }(window.Node.prototype));
};