(function (global) {
    "use strict";
    if (!global.console) {
        global.console = {
            log: function() { /* NOOP */ },
            info: function() { /* NOOP */ },
            warn: function() { /* NOOP */ },
            error: function() { /* NOOP */ }
        };
    }
}(typeof global !== 'undefined' ? global : /* istanbul ignore next */ this));