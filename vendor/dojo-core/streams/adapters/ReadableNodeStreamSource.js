(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../../Promise'], factory);
    }
})(function (require, exports) {
    var Promise_1 = require('../../Promise');
    var ReadableNodeStreamSource = (function () {
        function ReadableNodeStreamSource(nodeStream) {
            ;
            this._isClosed = false;
            this._nodeStream = nodeStream;
            // TODO: remove <any> when typedef is fixed to include 'isPaused'
            this._shouldResume = !this._nodeStream.isPaused();
            if (this._shouldResume) {
                // put stream in paused mode so it behaves as a pull source, rather than a push source
                this._nodeStream.pause();
            }
        }
        // Perform internal close logic
        ReadableNodeStreamSource.prototype._close = function () {
            this._isClosed = true;
            this._removeListeners();
            this._nodeStream.unpipe();
            if (this._shouldResume) {
                this._nodeStream.resume();
            }
        };
        // Handle external request to close
        ReadableNodeStreamSource.prototype._handleClose = function () {
            this._close();
            this._controller.close();
        };
        ReadableNodeStreamSource.prototype._handleError = function (error) {
            this._close();
            this._controller.error(error);
        };
        ReadableNodeStreamSource.prototype._removeListeners = function () {
            this._nodeStream.removeListener('close', this._onClose);
            this._nodeStream.removeListener('end', this._onClose);
            this._nodeStream.removeListener('error', this._onError);
        };
        ReadableNodeStreamSource.prototype.cancel = function (reason) {
            this._handleClose();
            return Promise_1.default.resolve();
        };
        ReadableNodeStreamSource.prototype.pull = function (controller) {
            if (this._isClosed) {
                return Promise_1.default.reject(new Error('Stream is closed'));
            }
            var chunk = this._nodeStream.read();
            if (chunk === null) {
                this._handleClose();
            }
            else {
                controller.enqueue(chunk);
            }
            return Promise_1.default.resolve();
        };
        ReadableNodeStreamSource.prototype.start = function (controller) {
            this._controller = controller;
            this._onClose = this._handleClose.bind(this);
            this._onError = this._handleError.bind(this);
            this._nodeStream.on('close', this._onClose);
            this._nodeStream.on('end', this._onClose);
            this._nodeStream.on('error', this._onError);
            return Promise_1.default.resolve();
        };
        return ReadableNodeStreamSource;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ReadableNodeStreamSource;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhZGFibGVOb2RlU3RyZWFtU291cmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3N0cmVhbXMvYWRhcHRlcnMvUmVhZGFibGVOb2RlU3RyZWFtU291cmNlLnRzIl0sIm5hbWVzIjpbIlJlYWRhYmxlTm9kZVN0cmVhbVNvdXJjZSIsIlJlYWRhYmxlTm9kZVN0cmVhbVNvdXJjZS5jb25zdHJ1Y3RvciIsIlJlYWRhYmxlTm9kZVN0cmVhbVNvdXJjZS5fY2xvc2UiLCJSZWFkYWJsZU5vZGVTdHJlYW1Tb3VyY2UuX2hhbmRsZUNsb3NlIiwiUmVhZGFibGVOb2RlU3RyZWFtU291cmNlLl9oYW5kbGVFcnJvciIsIlJlYWRhYmxlTm9kZVN0cmVhbVNvdXJjZS5fcmVtb3ZlTGlzdGVuZXJzIiwiUmVhZGFibGVOb2RlU3RyZWFtU291cmNlLmNhbmNlbCIsIlJlYWRhYmxlTm9kZVN0cmVhbVNvdXJjZS5wdWxsIiwiUmVhZGFibGVOb2RlU3RyZWFtU291cmNlLnN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztJQUFBLHdCQUFvQixlQUFlLENBQUMsQ0FBQTtJQU9wQztRQVFDQSxrQ0FBWUEsVUFBb0JBO1lBQUdDLENBQUNBO1lBQ25DQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxLQUFLQSxDQUFDQTtZQUN2QkEsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsVUFBVUEsQ0FBQ0E7WUFFOUJBLGlFQUFpRUE7WUFDakVBLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBLENBQVFBLElBQUlBLENBQUNBLFdBQVlBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBO1lBRTFEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDeEJBLHNGQUFzRkE7Z0JBQ3RGQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtZQUMxQkEsQ0FBQ0E7UUFDRkEsQ0FBQ0E7UUFFREQsK0JBQStC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QUVBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO1lBQzVDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtZQUMxQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsT0FBT0EsRUFBRUEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7WUFFNUNBLE1BQU1BLENBQUNBLGlCQUFPQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTtRQUMxQkEsQ0FBQ0E7UUFDRlIsK0JBQUNBO0lBQURBLENBQUNBLEFBbkZELElBbUZDO0lBbkZEOzhDQW1GQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb21pc2UgZnJvbSAnLi4vLi4vUHJvbWlzZSc7XG5pbXBvcnQgeyBTb3VyY2UgfSBmcm9tICcuLi9SZWFkYWJsZVN0cmVhbSc7XG5pbXBvcnQgUmVhZGFibGVTdHJlYW1Db250cm9sbGVyIGZyb20gJy4uL1JlYWRhYmxlU3RyZWFtQ29udHJvbGxlcic7XG5pbXBvcnQgeyBSZWFkYWJsZSB9IGZyb20gJ3N0cmVhbSc7XG5cbmV4cG9ydCB0eXBlIE5vZGVTb3VyY2VUeXBlID0gQnVmZmVyIHwgc3RyaW5nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWFkYWJsZU5vZGVTdHJlYW1Tb3VyY2UgaW1wbGVtZW50cyBTb3VyY2U8Tm9kZVNvdXJjZVR5cGU+IHtcblx0cHJvdGVjdGVkIF9jb250cm9sbGVyOiBSZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXI8Tm9kZVNvdXJjZVR5cGU+O1xuXHRwcm90ZWN0ZWQgX2lzQ2xvc2VkOiBib29sZWFuO1xuXHRwcm90ZWN0ZWQgX29uQ2xvc2U6ICgpID0+IHZvaWQ7XG5cdHByb3RlY3RlZCBfb25FcnJvcjogKGVycm9yOiBFcnJvcikgPT4gdm9pZDtcblx0cHJvdGVjdGVkIF9ub2RlU3RyZWFtOiBSZWFkYWJsZTtcblx0cHJvdGVjdGVkIF9zaG91bGRSZXN1bWU6IGJvb2xlYW47XG5cblx0Y29uc3RydWN0b3Iobm9kZVN0cmVhbTogUmVhZGFibGUpIHs7XG5cdFx0dGhpcy5faXNDbG9zZWQgPSBmYWxzZTtcblx0XHR0aGlzLl9ub2RlU3RyZWFtID0gbm9kZVN0cmVhbTtcblxuXHRcdC8vIFRPRE86IHJlbW92ZSA8YW55PiB3aGVuIHR5cGVkZWYgaXMgZml4ZWQgdG8gaW5jbHVkZSAnaXNQYXVzZWQnXG5cdFx0dGhpcy5fc2hvdWxkUmVzdW1lID0gISg8YW55PiB0aGlzLl9ub2RlU3RyZWFtKS5pc1BhdXNlZCgpO1xuXG5cdFx0aWYgKHRoaXMuX3Nob3VsZFJlc3VtZSkge1xuXHRcdFx0Ly8gcHV0IHN0cmVhbSBpbiBwYXVzZWQgbW9kZSBzbyBpdCBiZWhhdmVzIGFzIGEgcHVsbCBzb3VyY2UsIHJhdGhlciB0aGFuIGEgcHVzaCBzb3VyY2Vcblx0XHRcdHRoaXMuX25vZGVTdHJlYW0ucGF1c2UoKTtcblx0XHR9XG5cdH1cblxuXHQvLyBQZXJmb3JtIGludGVybmFsIGNsb3NlIGxvZ2ljXG5cdHByb3RlY3RlZCBfY2xvc2UoKTogdm9pZCB7XG5cdFx0dGhpcy5faXNDbG9zZWQgPSB0cnVlO1xuXHRcdHRoaXMuX3JlbW92ZUxpc3RlbmVycygpO1xuXHRcdHRoaXMuX25vZGVTdHJlYW0udW5waXBlKCk7XG5cblx0XHRpZiAodGhpcy5fc2hvdWxkUmVzdW1lKSB7XG5cdFx0XHR0aGlzLl9ub2RlU3RyZWFtLnJlc3VtZSgpO1xuXHRcdH1cblx0fVxuXG5cdC8vIEhhbmRsZSBleHRlcm5hbCByZXF1ZXN0IHRvIGNsb3NlXG5cdHByb3RlY3RlZCBfaGFuZGxlQ2xvc2UoKTogdm9pZCB7XG5cdFx0dGhpcy5fY2xvc2UoKTtcblx0XHR0aGlzLl9jb250cm9sbGVyLmNsb3NlKCk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgX2hhbmRsZUVycm9yKGVycm9yOiBFcnJvcik6IHZvaWQge1xuXHRcdHRoaXMuX2Nsb3NlKCk7XG5cdFx0dGhpcy5fY29udHJvbGxlci5lcnJvcihlcnJvcik7XG5cdH1cblxuXHRwcm90ZWN0ZWQgX3JlbW92ZUxpc3RlbmVycygpOiB2b2lkIHtcblx0XHR0aGlzLl9ub2RlU3RyZWFtLnJlbW92ZUxpc3RlbmVyKCdjbG9zZScsIHRoaXMuX29uQ2xvc2UpO1xuXHRcdHRoaXMuX25vZGVTdHJlYW0ucmVtb3ZlTGlzdGVuZXIoJ2VuZCcsIHRoaXMuX29uQ2xvc2UpO1xuXHRcdHRoaXMuX25vZGVTdHJlYW0ucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgdGhpcy5fb25FcnJvcik7XG5cdH1cblxuXHRjYW5jZWwocmVhc29uPzogYW55KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5faGFuZGxlQ2xvc2UoKTtcblxuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcblx0fVxuXG5cdHB1bGwoY29udHJvbGxlcjogUmVhZGFibGVTdHJlYW1Db250cm9sbGVyPE5vZGVTb3VyY2VUeXBlPik6IFByb21pc2U8dm9pZD4ge1xuXHRcdGlmICh0aGlzLl9pc0Nsb3NlZCkge1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignU3RyZWFtIGlzIGNsb3NlZCcpKTtcblx0XHR9XG5cblx0XHRjb25zdCBjaHVuayA9IHRoaXMuX25vZGVTdHJlYW0ucmVhZCgpO1xuXG5cdFx0aWYgKGNodW5rID09PSBudWxsKSB7XG5cdFx0XHR0aGlzLl9oYW5kbGVDbG9zZSgpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGNvbnRyb2xsZXIuZW5xdWV1ZShjaHVuayk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuXHR9XG5cblx0c3RhcnQoY29udHJvbGxlcjogUmVhZGFibGVTdHJlYW1Db250cm9sbGVyPE5vZGVTb3VyY2VUeXBlPik6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2NvbnRyb2xsZXIgPSBjb250cm9sbGVyO1xuXHRcdHRoaXMuX29uQ2xvc2UgPSB0aGlzLl9oYW5kbGVDbG9zZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuX29uRXJyb3IgPSB0aGlzLl9oYW5kbGVFcnJvci5iaW5kKHRoaXMpO1xuXG5cdFx0dGhpcy5fbm9kZVN0cmVhbS5vbignY2xvc2UnLCB0aGlzLl9vbkNsb3NlKTtcblx0XHR0aGlzLl9ub2RlU3RyZWFtLm9uKCdlbmQnLCB0aGlzLl9vbkNsb3NlKTtcblx0XHR0aGlzLl9ub2RlU3RyZWFtLm9uKCdlcnJvcicsIHRoaXMuX29uRXJyb3IpO1xuXG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuXHR9XG59XG4iXX0=