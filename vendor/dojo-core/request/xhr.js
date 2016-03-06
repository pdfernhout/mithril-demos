(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../async/Task', './errors/RequestTimeoutError', '../global', '../has', '../util', './util'], factory);
    }
})(function (require, exports) {
    var Task_1 = require('../async/Task');
    var RequestTimeoutError_1 = require('./errors/RequestTimeoutError');
    var global_1 = require('../global');
    var has_1 = require('../has');
    var util_1 = require('../util');
    var util_2 = require('./util');
    /**
     * A lookup table for valid `XMLHttpRequest#responseType` values.
     *
     * 'json' deliberately excluded since it is not supported in all environments, and as there is
     * already a filter for it in '../request'. Default '' and 'text' values also deliberately excluded.
     */
    var responseTypeMap = {
        arraybuffer: 'arraybuffer',
        // XHR2 environments that do not support `responseType=blob` still support `responseType=arraybuffer`,
        // which is a better way of handling blob data than as a string representation.
        blob: has_1.default('xhr2-blob') ? 'blob' : 'arraybuffer',
        document: 'document'
    };
    /* a noop handle for cancelled requests */
    var noop = function () { };
    function xhr(url, options) {
        if (options === void 0) { options = {}; }
        var request = new XMLHttpRequest();
        var requestUrl = util_2.generateRequestUrl(url, options);
        var response = {
            data: null,
            nativeResponse: request,
            requestOptions: options,
            statusCode: null,
            statusText: null,
            url: requestUrl,
            getHeader: function (name) {
                return request.getResponseHeader(name);
            }
        };
        var isAborted = false;
        function abort() {
            isAborted = true;
            if (request) {
                request.abort();
                request.onreadystatechange = noop;
            }
        }
        var promise = new Task_1.default(function (resolve, reject) {
            if (!options.method) {
                options.method = 'GET';
            }
            if ((!options.user || !options.password) && options.auth) {
                var auth = options.auth.split(':');
                options.user = decodeURIComponent(auth[0]);
                options.password = decodeURIComponent(auth[1]);
            }
            request.open(options.method, requestUrl, !options.blockMainThread, options.user, options.password);
            if (has_1.default('xhr2') && options.responseType in responseTypeMap) {
                request.responseType = responseTypeMap[options.responseType];
            }
            var timeoutHandle;
            request.onreadystatechange = function () {
                if (!isAborted && request.readyState === 4) {
                    request.onreadystatechange = noop;
                    timeoutHandle && timeoutHandle.destroy();
                    if (options.responseType === 'xml') {
                        response.data = request.responseXML;
                    }
                    else {
                        response.data = ('response' in request) ? request.response : request.responseText;
                    }
                    response.statusCode = request.status;
                    response.statusText = request.statusText;
                    if (response.statusCode > 0 && response.statusCode < 400) {
                        resolve(response);
                    }
                    else {
                        reject(response.statusText ?
                            new Error(response.statusText) :
                            new Error('An error prevented completion of the request.'));
                    }
                }
            };
            if (options.timeout > 0 && options.timeout !== Infinity) {
                timeoutHandle = util_1.createTimer(function () {
                    // Reject first, since aborting will also fire onreadystatechange which would reject with a
                    // less specific error.  (This is also why we set up our own timeout rather than using
                    // native timeout and ontimeout, because that aborts and fires onreadystatechange before ontimeout.)
                    reject(new RequestTimeoutError_1.default('The XMLHttpRequest request timed out.'));
                    abort();
                }, options.timeout);
            }
            var headers = options.headers;
            var hasContentTypeHeader = false;
            for (var header in headers) {
                if (header.toLowerCase() === 'content-type') {
                    hasContentTypeHeader = true;
                }
                request.setRequestHeader(header, headers[header]);
            }
            if (!headers || !('X-Requested-With' in headers)) {
                request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            }
            if (!hasContentTypeHeader && has_1.default('formdata') && options.data instanceof global_1.default.FormData) {
                // Assume that most forms do not contain large binary files. If that is not the case,
                // then "multipart/form-data" should be manually specified as the "Content-Type" header.
                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            }
            if (options.responseType === 'xml' && request.overrideMimeType) {
                // This forces the XHR to parse the response as XML regardless of the MIME-type returned by the server
                request.overrideMimeType('text/xml');
            }
            request.send(options.data);
        }, function () {
            abort();
        });
        return promise;
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = xhr;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JlcXVlc3QveGhyLnRzIl0sIm5hbWVzIjpbInhociIsInhoci5nZXRIZWFkZXIiLCJ4aHIuYWJvcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0lBQUEscUJBQWlCLGVBQWUsQ0FBQyxDQUFBO0lBQ2pDLG9DQUFnQyw4QkFBOEIsQ0FBQyxDQUFBO0lBQy9ELHVCQUFtQixXQUFXLENBQUMsQ0FBQTtJQUMvQixvQkFBZ0IsUUFBUSxDQUFDLENBQUE7SUFFekIscUJBQTRCLFNBQVMsQ0FBQyxDQUFBO0lBRXRDLHFCQUFtQyxRQUFRLENBQUMsQ0FBQTtJQU01Qzs7Ozs7T0FLRztJQUNILElBQU0sZUFBZSxHQUErQjtRQUNuRCxXQUFXLEVBQUUsYUFBYTtRQUMxQixzR0FBc0c7UUFDdEcsK0VBQStFO1FBQy9FLElBQUksRUFBRSxhQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsTUFBTSxHQUFHLGFBQWE7UUFDL0MsUUFBUSxFQUFFLFVBQVU7S0FDcEIsQ0FBQztJQUVGLDBDQUEwQztJQUMxQyxJQUFNLElBQUksR0FBRyxjQUFhLENBQUMsQ0FBQztJQUU1QixhQUErQixHQUFXLEVBQUUsT0FBK0I7UUFBL0JBLHVCQUErQkEsR0FBL0JBLFlBQStCQTtRQUMxRUEsSUFBTUEsT0FBT0EsR0FBR0EsSUFBSUEsY0FBY0EsRUFBRUEsQ0FBQ0E7UUFDckNBLElBQU1BLFVBQVVBLEdBQUdBLHlCQUFrQkEsQ0FBQ0EsR0FBR0EsRUFBRUEsT0FBT0EsQ0FBQ0EsQ0FBQ0E7UUFDcERBLElBQU1BLFFBQVFBLEdBQWdCQTtZQUM3QkEsSUFBSUEsRUFBRUEsSUFBSUE7WUFDVkEsY0FBY0EsRUFBRUEsT0FBT0E7WUFDdkJBLGNBQWNBLEVBQUVBLE9BQU9BO1lBQ3ZCQSxVQUFVQSxFQUFFQSxJQUFJQTtZQUNoQkEsVUFBVUEsRUFBRUEsSUFBSUE7WUFDaEJBLEdBQUdBLEVBQUVBLFVBQVVBO1lBRWZBLFNBQVNBLFlBQUNBLElBQVlBO2dCQUNyQkMsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUN4Q0EsQ0FBQ0E7U0FDREQsQ0FBQ0E7UUFDRkEsSUFBSUEsU0FBU0EsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFFdEJBO1lBQ0NFLFNBQVNBLEdBQUdBLElBQUlBLENBQUNBO1lBQ2pCQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDYkEsT0FBT0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0E7Z0JBQ2hCQSxPQUFPQSxDQUFDQSxrQkFBa0JBLEdBQUdBLElBQUlBLENBQUNBO1lBQ25DQSxDQUFDQTtRQUNGQSxDQUFDQTtRQUVERixJQUFNQSxPQUFPQSxHQUFHQSxJQUFJQSxjQUFJQSxDQUFjQSxVQUFVQSxPQUFPQSxFQUFFQSxNQUFNQTtZQUM5RCxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUN4QixDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzFELElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQyxPQUFPLENBQUMsSUFBSSxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxPQUFPLENBQUMsUUFBUSxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hELENBQUM7WUFFRCxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVuRyxFQUFFLENBQUMsQ0FBQyxhQUFHLENBQUMsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFlBQVksSUFBSSxlQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUM1RCxPQUFPLENBQUMsWUFBWSxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDOUQsQ0FBQztZQUVELElBQUksYUFBcUIsQ0FBQztZQUMxQixPQUFPLENBQUMsa0JBQWtCLEdBQUc7Z0JBQzVCLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxJQUFJLE9BQU8sQ0FBQyxVQUFVLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUMsT0FBTyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztvQkFDbEMsYUFBYSxJQUFJLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFFekMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO3dCQUNwQyxRQUFRLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUM7b0JBQ3JDLENBQUM7b0JBQ0QsSUFBSSxDQUFDLENBQUM7d0JBQ0wsUUFBUSxDQUFDLElBQUksR0FBRyxDQUFDLFVBQVUsSUFBSSxPQUFPLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7b0JBQ25GLENBQUM7b0JBRUQsUUFBUSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO29CQUNyQyxRQUFRLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7b0JBQ3pDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDMUQsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNuQixDQUFDO29CQUNELElBQUksQ0FBQyxDQUFDO3dCQUNMLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVTs0QkFDekIsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQzs0QkFDOUIsSUFBSSxLQUFLLENBQUMsK0NBQStDLENBQUMsQ0FDMUQsQ0FBQztvQkFDSCxDQUFDO2dCQUNGLENBQUM7WUFDRixDQUFDLENBQUM7WUFFRixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsT0FBTyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pELGFBQWEsR0FBRyxrQkFBVyxDQUFDO29CQUMzQiwyRkFBMkY7b0JBQzNGLHNGQUFzRjtvQkFDdEYsb0dBQW9HO29CQUNwRyxNQUFNLENBQUMsSUFBSSw2QkFBbUIsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3pFLEtBQUssRUFBRSxDQUFDO2dCQUNULENBQUMsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDckIsQ0FBQztZQUVELElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7WUFDaEMsSUFBSSxvQkFBb0IsR0FBWSxLQUFLLENBQUM7WUFDMUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEtBQUssY0FBYyxDQUFDLENBQUMsQ0FBQztvQkFDN0Msb0JBQW9CLEdBQUcsSUFBSSxDQUFDO2dCQUM3QixDQUFDO2dCQUVELE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbkQsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxrQkFBa0IsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xELE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ2hFLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixJQUFJLGFBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxPQUFPLENBQUMsSUFBSSxZQUFZLGdCQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDekYscUZBQXFGO2dCQUNyRix3RkFBd0Y7Z0JBQ3hGLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsbUNBQW1DLENBQUMsQ0FBQztZQUMvRSxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksS0FBSyxLQUFLLElBQUksT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztnQkFDaEUsc0dBQXNHO2dCQUN0RyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdEMsQ0FBQztZQUVELE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLENBQUMsRUFBRUE7WUFDRixLQUFLLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQ0EsQ0FBQ0E7UUFFSEEsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7SUFDaEJBLENBQUNBO0lBOUdEO3lCQThHQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRhc2sgZnJvbSAnLi4vYXN5bmMvVGFzayc7XG5pbXBvcnQgUmVxdWVzdFRpbWVvdXRFcnJvciBmcm9tICcuL2Vycm9ycy9SZXF1ZXN0VGltZW91dEVycm9yJztcbmltcG9ydCBnbG9iYWwgZnJvbSAnLi4vZ2xvYmFsJztcbmltcG9ydCBoYXMgZnJvbSAnLi4vaGFzJztcbmltcG9ydCB7IEhhbmRsZSB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgY3JlYXRlVGltZXIgfSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7IFJlcXVlc3RPcHRpb25zLCBSZXNwb25zZSwgUmVzcG9uc2VQcm9taXNlIH0gZnJvbSAnLi4vcmVxdWVzdCc7XG5pbXBvcnQgeyBnZW5lcmF0ZVJlcXVlc3RVcmwgfSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFhoclJlcXVlc3RPcHRpb25zIGV4dGVuZHMgUmVxdWVzdE9wdGlvbnMge1xuXHRibG9ja01haW5UaHJlYWQ/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIEEgbG9va3VwIHRhYmxlIGZvciB2YWxpZCBgWE1MSHR0cFJlcXVlc3QjcmVzcG9uc2VUeXBlYCB2YWx1ZXMuXG4gKlxuICogJ2pzb24nIGRlbGliZXJhdGVseSBleGNsdWRlZCBzaW5jZSBpdCBpcyBub3Qgc3VwcG9ydGVkIGluIGFsbCBlbnZpcm9ubWVudHMsIGFuZCBhcyB0aGVyZSBpc1xuICogYWxyZWFkeSBhIGZpbHRlciBmb3IgaXQgaW4gJy4uL3JlcXVlc3QnLiBEZWZhdWx0ICcnIGFuZCAndGV4dCcgdmFsdWVzIGFsc28gZGVsaWJlcmF0ZWx5IGV4Y2x1ZGVkLlxuICovXG5jb25zdCByZXNwb25zZVR5cGVNYXA6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nOyB9ID0ge1xuXHRhcnJheWJ1ZmZlcjogJ2FycmF5YnVmZmVyJyxcblx0Ly8gWEhSMiBlbnZpcm9ubWVudHMgdGhhdCBkbyBub3Qgc3VwcG9ydCBgcmVzcG9uc2VUeXBlPWJsb2JgIHN0aWxsIHN1cHBvcnQgYHJlc3BvbnNlVHlwZT1hcnJheWJ1ZmZlcmAsXG5cdC8vIHdoaWNoIGlzIGEgYmV0dGVyIHdheSBvZiBoYW5kbGluZyBibG9iIGRhdGEgdGhhbiBhcyBhIHN0cmluZyByZXByZXNlbnRhdGlvbi5cblx0YmxvYjogaGFzKCd4aHIyLWJsb2InKSA/ICdibG9iJyA6ICdhcnJheWJ1ZmZlcicsXG5cdGRvY3VtZW50OiAnZG9jdW1lbnQnXG59O1xuXG4vKiBhIG5vb3AgaGFuZGxlIGZvciBjYW5jZWxsZWQgcmVxdWVzdHMgKi9cbmNvbnN0IG5vb3AgPSBmdW5jdGlvbigpIHsgfTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24geGhyPFQ+KHVybDogc3RyaW5nLCBvcHRpb25zOiBYaHJSZXF1ZXN0T3B0aW9ucyA9IHt9KTogUmVzcG9uc2VQcm9taXNlPFQ+IHtcblx0Y29uc3QgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRjb25zdCByZXF1ZXN0VXJsID0gZ2VuZXJhdGVSZXF1ZXN0VXJsKHVybCwgb3B0aW9ucyk7XG5cdGNvbnN0IHJlc3BvbnNlOiBSZXNwb25zZTxUPiA9IHtcblx0XHRkYXRhOiBudWxsLFxuXHRcdG5hdGl2ZVJlc3BvbnNlOiByZXF1ZXN0LFxuXHRcdHJlcXVlc3RPcHRpb25zOiBvcHRpb25zLFxuXHRcdHN0YXR1c0NvZGU6IG51bGwsXG5cdFx0c3RhdHVzVGV4dDogbnVsbCxcblx0XHR1cmw6IHJlcXVlc3RVcmwsXG5cblx0XHRnZXRIZWFkZXIobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcblx0XHRcdHJldHVybiByZXF1ZXN0LmdldFJlc3BvbnNlSGVhZGVyKG5hbWUpO1xuXHRcdH1cblx0fTtcblx0bGV0IGlzQWJvcnRlZCA9IGZhbHNlO1xuXG5cdGZ1bmN0aW9uIGFib3J0KCkge1xuXHRcdGlzQWJvcnRlZCA9IHRydWU7XG5cdFx0aWYgKHJlcXVlc3QpIHtcblx0XHRcdHJlcXVlc3QuYWJvcnQoKTtcblx0XHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gbm9vcDtcblx0XHR9XG5cdH1cblxuXHRjb25zdCBwcm9taXNlID0gbmV3IFRhc2s8UmVzcG9uc2U8VD4+KGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpOiB2b2lkIHtcblx0XHRpZiAoIW9wdGlvbnMubWV0aG9kKSB7XG5cdFx0XHRvcHRpb25zLm1ldGhvZCA9ICdHRVQnO1xuXHRcdH1cblxuXHRcdGlmICgoIW9wdGlvbnMudXNlciB8fCAhb3B0aW9ucy5wYXNzd29yZCkgJiYgb3B0aW9ucy5hdXRoKSB7XG5cdFx0XHRsZXQgYXV0aCA9IG9wdGlvbnMuYXV0aC5zcGxpdCgnOicpO1xuXHRcdFx0b3B0aW9ucy51c2VyID0gZGVjb2RlVVJJQ29tcG9uZW50KGF1dGhbMF0pO1xuXHRcdFx0b3B0aW9ucy5wYXNzd29yZCA9IGRlY29kZVVSSUNvbXBvbmVudChhdXRoWzFdKTtcblx0XHR9XG5cblx0XHRyZXF1ZXN0Lm9wZW4ob3B0aW9ucy5tZXRob2QsIHJlcXVlc3RVcmwsICFvcHRpb25zLmJsb2NrTWFpblRocmVhZCwgb3B0aW9ucy51c2VyLCBvcHRpb25zLnBhc3N3b3JkKTtcblxuXHRcdGlmIChoYXMoJ3hocjInKSAmJiBvcHRpb25zLnJlc3BvbnNlVHlwZSBpbiByZXNwb25zZVR5cGVNYXApIHtcblx0XHRcdHJlcXVlc3QucmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlTWFwW29wdGlvbnMucmVzcG9uc2VUeXBlXTtcblx0XHR9XG5cblx0XHRsZXQgdGltZW91dEhhbmRsZTogSGFuZGxlO1xuXHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCk6IHZvaWQge1xuXHRcdFx0aWYgKCFpc0Fib3J0ZWQgJiYgcmVxdWVzdC5yZWFkeVN0YXRlID09PSA0KSB7XG5cdFx0XHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gbm9vcDtcblx0XHRcdFx0dGltZW91dEhhbmRsZSAmJiB0aW1lb3V0SGFuZGxlLmRlc3Ryb3koKTtcblxuXHRcdFx0XHRpZiAob3B0aW9ucy5yZXNwb25zZVR5cGUgPT09ICd4bWwnKSB7XG5cdFx0XHRcdFx0cmVzcG9uc2UuZGF0YSA9IHJlcXVlc3QucmVzcG9uc2VYTUw7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0cmVzcG9uc2UuZGF0YSA9ICgncmVzcG9uc2UnIGluIHJlcXVlc3QpID8gcmVxdWVzdC5yZXNwb25zZSA6IHJlcXVlc3QucmVzcG9uc2VUZXh0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmVzcG9uc2Uuc3RhdHVzQ29kZSA9IHJlcXVlc3Quc3RhdHVzO1xuXHRcdFx0XHRyZXNwb25zZS5zdGF0dXNUZXh0ID0gcmVxdWVzdC5zdGF0dXNUZXh0O1xuXHRcdFx0XHRpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA+IDAgJiYgcmVzcG9uc2Uuc3RhdHVzQ29kZSA8IDQwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdChyZXNwb25zZS5zdGF0dXNUZXh0ID9cblx0XHRcdFx0XHRcdG5ldyBFcnJvcihyZXNwb25zZS5zdGF0dXNUZXh0KSA6XG5cdFx0XHRcdFx0XHRuZXcgRXJyb3IoJ0FuIGVycm9yIHByZXZlbnRlZCBjb21wbGV0aW9uIG9mIHRoZSByZXF1ZXN0LicpXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRpZiAob3B0aW9ucy50aW1lb3V0ID4gMCAmJiBvcHRpb25zLnRpbWVvdXQgIT09IEluZmluaXR5KSB7XG5cdFx0XHR0aW1lb3V0SGFuZGxlID0gY3JlYXRlVGltZXIoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQvLyBSZWplY3QgZmlyc3QsIHNpbmNlIGFib3J0aW5nIHdpbGwgYWxzbyBmaXJlIG9ucmVhZHlzdGF0ZWNoYW5nZSB3aGljaCB3b3VsZCByZWplY3Qgd2l0aCBhXG5cdFx0XHRcdC8vIGxlc3Mgc3BlY2lmaWMgZXJyb3IuICAoVGhpcyBpcyBhbHNvIHdoeSB3ZSBzZXQgdXAgb3VyIG93biB0aW1lb3V0IHJhdGhlciB0aGFuIHVzaW5nXG5cdFx0XHRcdC8vIG5hdGl2ZSB0aW1lb3V0IGFuZCBvbnRpbWVvdXQsIGJlY2F1c2UgdGhhdCBhYm9ydHMgYW5kIGZpcmVzIG9ucmVhZHlzdGF0ZWNoYW5nZSBiZWZvcmUgb250aW1lb3V0Lilcblx0XHRcdFx0cmVqZWN0KG5ldyBSZXF1ZXN0VGltZW91dEVycm9yKCdUaGUgWE1MSHR0cFJlcXVlc3QgcmVxdWVzdCB0aW1lZCBvdXQuJykpO1xuXHRcdFx0XHRhYm9ydCgpO1xuXHRcdFx0fSwgb3B0aW9ucy50aW1lb3V0KTtcblx0XHR9XG5cblx0XHRjb25zdCBoZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzO1xuXHRcdGxldCBoYXNDb250ZW50VHlwZUhlYWRlcjogYm9vbGVhbiA9IGZhbHNlO1xuXHRcdGZvciAobGV0IGhlYWRlciBpbiBoZWFkZXJzKSB7XG5cdFx0XHRpZiAoaGVhZGVyLnRvTG93ZXJDYXNlKCkgPT09ICdjb250ZW50LXR5cGUnKSB7XG5cdFx0XHRcdGhhc0NvbnRlbnRUeXBlSGVhZGVyID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0cmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlciwgaGVhZGVyc1toZWFkZXJdKTtcblx0XHR9XG5cblx0XHRpZiAoIWhlYWRlcnMgfHwgISgnWC1SZXF1ZXN0ZWQtV2l0aCcgaW4gaGVhZGVycykpIHtcblx0XHRcdHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignWC1SZXF1ZXN0ZWQtV2l0aCcsICdYTUxIdHRwUmVxdWVzdCcpO1xuXHRcdH1cblxuXHRcdGlmICghaGFzQ29udGVudFR5cGVIZWFkZXIgJiYgaGFzKCdmb3JtZGF0YScpICYmIG9wdGlvbnMuZGF0YSBpbnN0YW5jZW9mIGdsb2JhbC5Gb3JtRGF0YSkge1xuXHRcdFx0Ly8gQXNzdW1lIHRoYXQgbW9zdCBmb3JtcyBkbyBub3QgY29udGFpbiBsYXJnZSBiaW5hcnkgZmlsZXMuIElmIHRoYXQgaXMgbm90IHRoZSBjYXNlLFxuXHRcdFx0Ly8gdGhlbiBcIm11bHRpcGFydC9mb3JtLWRhdGFcIiBzaG91bGQgYmUgbWFudWFsbHkgc3BlY2lmaWVkIGFzIHRoZSBcIkNvbnRlbnQtVHlwZVwiIGhlYWRlci5cblx0XHRcdHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpO1xuXHRcdH1cblxuXHRcdGlmIChvcHRpb25zLnJlc3BvbnNlVHlwZSA9PT0gJ3htbCcgJiYgcmVxdWVzdC5vdmVycmlkZU1pbWVUeXBlKSB7XG5cdFx0XHQvLyBUaGlzIGZvcmNlcyB0aGUgWEhSIHRvIHBhcnNlIHRoZSByZXNwb25zZSBhcyBYTUwgcmVnYXJkbGVzcyBvZiB0aGUgTUlNRS10eXBlIHJldHVybmVkIGJ5IHRoZSBzZXJ2ZXJcblx0XHRcdHJlcXVlc3Qub3ZlcnJpZGVNaW1lVHlwZSgndGV4dC94bWwnKTtcblx0XHR9XG5cblx0XHRyZXF1ZXN0LnNlbmQob3B0aW9ucy5kYXRhKTtcblx0fSwgZnVuY3Rpb24gKCkge1xuXHRcdGFib3J0KCk7XG5cdH0pO1xuXG5cdHJldHVybiBwcm9taXNlO1xufVxuIl19