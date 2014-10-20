/*global describe, it, before, after */
/*jshint unused:false */
(function (window) {

    "use strict";
    var expect = require('chai').expect,
        should = require('chai').should();

    require("../polyfill.js");


    describe('Polyfills window', function () {

        it('test console.console', function () {
            window.console.log('');
            window.console.info('');
            window.console.warn('');
            window.console.error('');
            // all should pass wothout throwing an exeption
        });

    });

    describe('Polyfills Element', function () {
        var bodyNode = window.document.body,
            divnode1, divnode2, buttonnode;

            before(function() {
                bodyNode.id = 'fakebody';

                divnode1 = window.document.createElement('div');
                divnode1.id = 'div1';
                divnode1.className = 'class1a class1b';

                divnode2 = window.document.createElement('div');
                divnode2.id = 'div2';
                divnode2.className = 'class2a class2b';

                buttonnode = window.document.createElement('button');
                buttonnode.id = 'button3';
                buttonnode.className = 'class3a class3b';

                divnode2.appendChild(buttonnode);
                divnode1.appendChild(divnode2);
                window.document.body.appendChild(divnode1);
            });

            // Code to execute after the tests inside this describegroup.
            after(function() {
                window.document.body.removeChild(divnode1);
                delete bodyNode.id;
            });

        it('test Element.matchesSelector', function () {
            divnode1.matchesSelector('#fakebody .class1a').should.be.true;
            divnode1.matchesSelector('div').should.be.true;
            bodyNode.matchesSelector('#fakebody').should.be.true;
            bodyNode.matchesSelector('#div1').should.be.false;
            divnode1.matchesSelector('#div1').should.be.true;
            divnode1.matchesSelector('#div1.noclass').should.be.false;
            divnode1.matchesSelector('#div1.class1a.class1b').should.be.true;
            divnode1.matchesSelector('#div1 .class1a').should.be.false;
            divnode1.matchesSelector('#div1 .class2a').should.be.false;
            divnode1.matchesSelector('#div1 #div2').should.be.false;
            divnode2.matchesSelector('#div1 div').should.be.true;
            divnode2.matchesSelector('#div1 #div2').should.be.true;
            divnode2.matchesSelector('#div1 #div2.class2a').should.be.true;
            divnode2.matchesSelector('#div1 div.class2a').should.be.true;
            divnode2.matchesSelector('#div1 #div2.noclass').should.be.false;
            divnode2.matchesSelector('#div1 #div2.class2a.class2b').should.be.true;
            divnode2.matchesSelector('#div1 div.class2a.class2b').should.be.true;
            divnode2.matchesSelector('#div1 #div2.class2a.noclass').should.be.false;
            divnode2.matchesSelector('#div1 #div2 .class2a').should.be.false;
            divnode2.matchesSelector('#div1 #div2 .class3a').should.be.false;
            divnode2.matchesSelector('#div1 #div2 #button3').should.be.false;
            divnode2.matchesSelector('#div1#div2').should.be.false;
            divnode2.matchesSelector('#div1#div2.class2a').should.be.false;
            divnode2.matchesSelector('#div1#div2.class2aclass2b').should.be.false;
            divnode2.matchesSelector('#div1#div2 .class2a').should.be.false;
            divnode2.matchesSelector('#div1#div2 .class3a').should.be.false;
            divnode2.matchesSelector('#div1#div2 #button3').should.be.false;
            buttonnode.matchesSelector('#div1 #button3').should.be.true;
            buttonnode.matchesSelector('#div1 #button3.class3a').should.be.true;
            buttonnode.matchesSelector('#div1 #button3.class3a.class3b').should.be.true;
            buttonnode.matchesSelector('#div1 #button3.class3a .class3b').should.be.false;
            buttonnode.matchesSelector('#div1 #div2 #button3').should.be.true;
            buttonnode.matchesSelector('#div1 #div2 button').should.be.true;
            buttonnode.matchesSelector('.class1a button').should.be.true;
            buttonnode.matchesSelector('#div1 #div2 #button3.class3a').should.be.true;
            buttonnode.matchesSelector('#div1 #div2 #button3.class3a.class3b').should.be.true;
            buttonnode.matchesSelector('#div1 #div2 button#button3.class3a.class3b').should.be.true;
            buttonnode.matchesSelector('#div1 #div2 button.class3a.class3b').should.be.true;
            buttonnode.matchesSelector('#div1 #div2 #button3.class3a .class3b').should.be.false;
            buttonnode.matchesSelector('#div1 #div2 #button3.class3a .class3b').should.be.false;
            divnode1.matchesSelector('.class1a').should.be.true;
            divnode1.matchesSelector('.class1a.class1b').should.be.true;
            divnode1.matchesSelector('.class2a').should.be.false;
            divnode2.matchesSelector('.class1a .class2a').should.be.true;
            divnode2.matchesSelector('.class1a .class2a.class2b').should.be.true;
            divnode2.matchesSelector('.class1a .class2a.noclass').should.be.false;
            divnode2.matchesSelector('.class1a.class1b .class2a.class2b').should.be.true;
            divnode2.matchesSelector('.noclass.class1b .class2a.class2b').should.be.false;
            divnode2.matchesSelector('.class1a .class2a .class3a').should.be.false;
            divnode2.matchesSelector('.class1a .class2a.class2b .class3a').should.be.false;
            divnode2.matchesSelector('.class1a.class1b .class2a.class2b .class3a').should.be.false;
            buttonnode.matchesSelector('.class1a #div2 .class3a').should.be.true;
            buttonnode.matchesSelector('.class1a #div2.class2b .class3a').should.be.true;
            buttonnode.matchesSelector('.class1a #div2.class2a.class2b .class3a').should.be.true;
            buttonnode.matchesSelector('.noclass #div2.class2a.class2b .class3a').should.be.false;
            buttonnode.matchesSelector('.class1a #div2.noclass.class2b .class3a').should.be.false;
            buttonnode.matchesSelector('.class1a #div2.class2a.class2b .noclass').should.be.false;
            buttonnode.matchesSelector('.class1a.class1b #div2.class2a .class3a').should.be.true;
            buttonnode.matchesSelector('.class1a.class1b #div2.class2a.class2b .class3a').should.be.true;
        });

    });

}(global.window || require('node-win')));