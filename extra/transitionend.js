"use strict";

module.exports = function (window) {

    window._ITSAmodules || window.protectedProp('_ITSAmodules', {});

    if (window._ITSAmodules.TransitionEnd) {
        return window._ITSAmodules.TransitionEnd; // TransitionEnd was already created
    }

    var DOCUMENT_STYLE = window.document.documentElement.style,
        transitions = {},
        ransition = 'ransition',
        transition = 't'+ransition,
        end = 'end',
        transitionEnd, t;

    transitions[transition] = transition+end;
    transitions['WebkitT'+ransition] = 'webkitT'+ransition+'End';
    transitions['MozT'+ransition] = transition+end;
    transitions['OT'+ransition] = 'o'+transition+end;

    for (t in transitions) {
        if (typeof DOCUMENT_STYLE[t] !== 'undefined') {
            transitionEnd = transitions[t];
            break;
        }
    }

    window._ITSAmodules.TransitionEnd = transitionEnd;

    return transitionEnd;
};