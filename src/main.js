"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = void 0;
var world = "benoit";
function hello(word) {
    if (word === void 0) { word = world; }
    return "Hello " + word;
}
exports.hello = hello;
