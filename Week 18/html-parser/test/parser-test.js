var assert = require('assert');

import {parseHTML} from '../src/parser';

describe("parse html:", function() {
    it('<a></a>', function () {
        let tree = parseHTML('<a></a>');
        assert.equal(tree.children[0].tagName, 'a');
        assert.equal(tree.children[0].children.length, 0);
    });
    it('<a href="/time.geekbang.org"></a>', function () {
        let tree = parseHTML('<a href="/time.geekbang.org"></a>');
        assert.equal(tree.children[0].attributes[0].name, 'href');
        assert.equal(tree.children[0].attributes[0].value, '/time.geekbang.org');
    });
    it('<a href ></a>', function () {
        let tree = parseHTML('<a href ></a>');
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });
    it('<a href id></a>', function () {
        let tree = parseHTML('<a href id></a>');
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].attributes.length, 2);
    });
    it('<a href="abc" id></a>', function () {
        let tree = parseHTML('<a href="abc" id></a>');
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].attributes[0].value, 'abc');
    });
    it('<a id=abc ></a>', function () {
        let tree = parseHTML('<a id=abc ></a>');
        assert.equal(tree.children.length, 1);
    });
    it('<a id=abc/>', function () {
        let tree = parseHTML('<a id=abc/>');
        assert.equal(tree.children.length, 1);
    });
    it('<a id=\'abc\'/>', function () {
        let tree = parseHTML('<a id=\'abc\'/>');
        console.log(tree)
        assert.equal(tree.children.length, 1);
    });
    it('<a />', function () {
        let tree = parseHTML('<a />');
        assert.equal(tree.children.length, 1);
    });
    it('<A /> uppercase', function () {
        let tree = parseHTML('<A />');
        assert.equal(tree.children.length, 1);
    });
    it('<>', function () {
        let tree = parseHTML('<>');
        assert.equal(tree.children.length, 1);
    });
    it('<a></b>', function () {
        let tree = parseHTML('<a></b>');
        console.log(tree)
        assert.equal(tree.children.length, 1);
        describe("tag start end doesn't match end tag")
    });
})
