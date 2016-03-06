(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../has', '../global'], factory);
    }
})(function (require, exports) {
    var has_1 = require('../has');
    var global_1 = require('../global');
    has_1.add('node-buffer', 'Buffer' in global_1.default && typeof global_1.default.Buffer === 'function');
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = has_1.default;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JlcXVlc3QvaGFzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0lBQUEsb0JBQXlCLFFBQVEsQ0FBQyxDQUFBO0lBQ2xDLHVCQUFtQixXQUFXLENBQUMsQ0FBQTtJQUUvQixTQUFHLENBQUMsYUFBYSxFQUFFLFFBQVEsSUFBSSxnQkFBTSxJQUFJLE9BQU8sZ0JBQU0sQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFDLENBQUM7SUFFOUU7c0JBQWUsYUFBRyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGhhcywgeyBhZGQgfSBmcm9tICcuLi9oYXMnO1xuaW1wb3J0IGdsb2JhbCBmcm9tICcuLi9nbG9iYWwnO1xuXG5hZGQoJ25vZGUtYnVmZmVyJywgJ0J1ZmZlcicgaW4gZ2xvYmFsICYmIHR5cGVvZiBnbG9iYWwuQnVmZmVyID09PSAnZnVuY3Rpb24nKTtcblxuZXhwb3J0IGRlZmF1bHQgaGFzO1xuIl19