/*global describe, it, before, after */
/*jshint unused:false */
(function (window) {

    "use strict";
    var expect = require('chai').expect,
        should = require('chai').should();

    require("../polyfill.js");

    describe('Polyfills Array', function () {

        it('test Array.every', function () {
            var a = [1,20,3,4],
                count1 = 0,
                count2 = 0,
                check1, check2;
            check1 = a.every(function(item) {
                count1++;
                return item<=21;
            });
            check2 = a.every(function(item) {
                count2++;
                return item<5;
            });
            expect(count1).to.be.eql(4);
            expect(count2).to.be.eql(2);
            expect(check1).to.be.true;
            expect(check2).to.be.false;
        });

        it('test Array.filter', function () {
            var a = [1,2,3,4],
                b = a.filter(function(item){
                    return (item>1) && (item<4);
                });
            expect(b.length).to.be.eql(2);
            expect(b[0]).to.be.eql(2);
            expect(b[1]).to.be.eql(3);
        });

        it('test Array.forEach', function () {
            var a = [1,2,3,4],
                count = 0;
            a.forEach(function(item) {
                count += 10*item;
            });
            expect(count).to.be.eql(100);
        });

        it('test Array.indexOf', function () {
            var a = [10,20,30,40];
            expect(a.indexOf(30)).to.be.eql(2);
        });

        it('test Array.isArray', function () {
            Array.isArray([]).should.be.true;
        });

        it('test Array.some', function () {
            var a = [1,2,3,4],
                count = 0;
            a.some(function(item) {
                count += 10*item;
                return item===3;
            });
            expect(count).to.be.eql(60);
        });

    });

    describe('Polyfills Object', function () {

        it('test Object.defineProperty', function () {
            var obj = {};
            Object.defineProperty(obj, 'a', {value: 10});
            expect(obj.a).to.be.eql(10);
        });

        it('test Object.create', function () {
            var obj = Object.create({a: 10});
            expect(obj.a).to.be.eql(10);
        });

        it('test Object.keys', function () {
            var obj = Object.create({a: 10});
            obj.b = 20;
            obj.c = 30;
            expect(Object.keys(obj)).to.be.eql(['b', 'c']);
        });

    });

    describe('Polyfills JSON', function () {

        it('test JSON.parse', function () {
            var objString = '{"a":10}',
                obj;
            try {
                obj = JSON.parse(objString);
            }
            catch (err) {}
            expect(obj.a).to.be.eql(10);
        });

        it('test JSON.stringify', function () {
            var obj = {a: 10};
            expect(JSON.stringify(obj)).to.be.eql('{"a":10}');
        });

        it('test JSON.parse with reviver', function () {
            var objString = '{"a":10, "b": 20}',
                obj,
                reviver = function(key, value) {
                    return (key==='a') ? 15: value;
                };
            try {
                obj = JSON.parse(objString, reviver);
            }
            catch (err) {}
            expect(obj.a).to.be.eql(15);
        });

        it('test JSON.stringify with replacer', function () {
            var obj = {a: 10, b: 20},
                replacer = function(key, value) {
                    value.b = 30;
                    return value;
                };
            expect(JSON.stringify(obj, replacer)).to.be.eql('{"a":10,"b":30}');
        });

    });

    describe('Polyfills CSS', function () {

        it('test CSS.opacity', function () {
            var div = window.document.createElement('div');
            div.style.opacity = '0.4';
            expect(div.style.opacity).to.be.eql('0.4');
        });

    });

    describe('Polyfills window', function () {

        it('test console.console', function () {
            window.console.log('');
            window.console.info('');
            window.console.warn('');
            window.console.error('');
            // all should pass wothout throwing an exeption
        });
/*
        it('test window.getComputedStyle', function () {
            var div = window.document.createElement('div'),
                innerdiv = window.document.createElement('div'),
                innerinnerdiv = window.document.createElement('div');
            div.style.color = '#F00';
            innerinnerdiv.style.color = '#00F';
            innerdiv.appendChild(innerinnerdiv);
            div.appendChild(innerdiv);
            expect(window.getComputedStyle(div, 'color')).to.be.eql('#F00');
            expect(window.getComputedStyle(innerdiv, 'color')).to.be.eql('#F00');
            expect(window.getComputedStyle(innerinnerdiv, 'color')).to.be.eql('#00F');
        });
*/

    });

    describe('Polyfills Node', function () {

        it('test node.contains', function () {
            var div = window.document.createElement('div'),
                innerdiv1 = window.document.createElement('div'),
                innerdiv2 = window.document.createElement('div');
            div.appendChild(innerdiv1);
            expect(div.contains(innerdiv1)).to.be.true;
            expect(div.contains(innerdiv2)).to.be.false;
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