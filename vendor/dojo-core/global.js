(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    var globalObject = Function('return this')();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = globalObject;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2dsb2JhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztJQUFBLElBQU0sWUFBWSxHQUFRLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDO0lBQ3BEO3NCQUFlLFlBQVksQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGdsb2JhbE9iamVjdDogYW55ID0gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmV4cG9ydCBkZWZhdWx0IGdsb2JhbE9iamVjdDtcbiJdfQ==