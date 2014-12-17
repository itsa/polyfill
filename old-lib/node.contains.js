(function (global) {
    "use strict";

    var DOCUMENT_POSITION_CONTAINED_BY = 16;
    global.Node && !global.Node.prototype.contains && (function(NodePrototype) {
        NodePrototype.contains = function(child) {
            var comparison = this.compareDocumentPosition(child);
            return !!((comparison===0) || (comparison & DOCUMENT_POSITION_CONTAINED_BY));
        };
    }(global.Node.prototype));

}(typeof global !== 'undefined' ? global : /* istanbul ignore next */ this));