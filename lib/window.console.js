(function (global) {
    "use strict";

    var CONSOLE = {
            log: function() { /* NOOP */ },
            info: function() { /* NOOP */ },
            warn: function() { /* NOOP */ },
            error: function() { /* NOOP */ }
        };

    global.console || (function(GlobalPrototype) {
        GlobalPrototype.console = CONSOLE;
    }(global.prototype));

    module.exports = CONSOLE;
}(typeof global !== 'undefined' ? global : /* istanbul ignore next */ this));