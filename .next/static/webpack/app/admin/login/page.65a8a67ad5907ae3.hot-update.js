"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/admin/login/page",{

/***/ "(app-pages-browser)/./src/hooks/useAdminLogin.js":
/*!************************************!*\
  !*** ./src/hooks/useAdminLogin.js ***!
  \************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useAdminLogin: () => (/* binding */ useAdminLogin)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _repositories_menurepositories__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../repositories/menurepositories */ \"(app-pages-browser)/./src/repositories/menurepositories.js\");\nvar _s = $RefreshSig$();\n\n\nconst useAdminLogin = ()=>{\n    _s();\n    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n    const [adminData, setAdminData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n    const login = async (username, password)=>{\n        setIsLoading(true);\n        setError(null); // Reset error state\n        try {\n            const data = await (0,_repositories_menurepositories__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(username, password); // Call API\n            setAdminData(data);\n            return data;\n        } catch (err) {\n            setError(err.message || \"Failed to login. Please try again.\"); // Set readable error message\n            throw err; // Rethrow error for further handling in form\n        } finally{\n            setIsLoading(false);\n        }\n    };\n    return {\n        login,\n        isLoading,\n        error,\n        adminData\n    };\n};\n_s(useAdminLogin, \"XDeIyklVb8XBEIQ2TURQe2ZVMcQ=\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9ob29rcy91c2VBZG1pbkxvZ2luLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQWlDO0FBQ3lCO0FBRW5ELE1BQU1FLGdCQUFnQjs7SUFDM0IsTUFBTSxDQUFDQyxXQUFXQyxhQUFhLEdBQUdKLCtDQUFRQSxDQUFDO0lBQzNDLE1BQU0sQ0FBQ0ssT0FBT0MsU0FBUyxHQUFHTiwrQ0FBUUEsQ0FBQztJQUNuQyxNQUFNLENBQUNPLFdBQVdDLGFBQWEsR0FBR1IsK0NBQVFBLENBQUM7SUFFM0MsTUFBTVMsUUFBUSxPQUFPQyxVQUFVQztRQUM3QlAsYUFBYTtRQUNiRSxTQUFTLE9BQU8sb0JBQW9CO1FBQ3BDLElBQUk7WUFDRixNQUFNTSxPQUFPLE1BQU1YLDBFQUFVQSxDQUFDUyxVQUFVQyxXQUFXLFdBQVc7WUFDOURILGFBQWFJO1lBQ2IsT0FBT0E7UUFDVCxFQUFFLE9BQU9DLEtBQUs7WUFDWlAsU0FBU08sSUFBSUMsT0FBTyxJQUFJLHVDQUF1Qyw2QkFBNkI7WUFDNUYsTUFBTUQsS0FBSyw2Q0FBNkM7UUFDMUQsU0FBVTtZQUNSVCxhQUFhO1FBQ2Y7SUFDRjtJQUVBLE9BQU87UUFBRUs7UUFBT047UUFBV0U7UUFBT0U7SUFBVTtBQUM5QyxFQUFDO0dBckJZTCIsInNvdXJjZXMiOlsiRTpcXFJQUEwtS0VMT01QT0syXFx3YXJnZW0tcHJvamVjdFxcc3JjXFxob29rc1xcdXNlQWRtaW5Mb2dpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgbG9naW5BZG1pbiBmcm9tIFwiLi4vcmVwb3NpdG9yaWVzL21lbnVyZXBvc2l0b3JpZXNcIjtcclxuXHJcbmV4cG9ydCBjb25zdCB1c2VBZG1pbkxvZ2luID0gKCkgPT4gIHtcclxuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgY29uc3QgW2FkbWluRGF0YSwgc2V0QWRtaW5EYXRhXSA9IHVzZVN0YXRlKG51bGwpO1xyXG5cclxuICBjb25zdCBsb2dpbiA9IGFzeW5jICh1c2VybmFtZSwgcGFzc3dvcmQpID0+IHtcclxuICAgIHNldElzTG9hZGluZyh0cnVlKTtcclxuICAgIHNldEVycm9yKG51bGwpOyAvLyBSZXNldCBlcnJvciBzdGF0ZVxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGxvZ2luQWRtaW4odXNlcm5hbWUsIHBhc3N3b3JkKTsgLy8gQ2FsbCBBUElcclxuICAgICAgc2V0QWRtaW5EYXRhKGRhdGEpO1xyXG4gICAgICByZXR1cm4gZGF0YTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBzZXRFcnJvcihlcnIubWVzc2FnZSB8fCBcIkZhaWxlZCB0byBsb2dpbi4gUGxlYXNlIHRyeSBhZ2Fpbi5cIik7IC8vIFNldCByZWFkYWJsZSBlcnJvciBtZXNzYWdlXHJcbiAgICAgIHRocm93IGVycjsgLy8gUmV0aHJvdyBlcnJvciBmb3IgZnVydGhlciBoYW5kbGluZyBpbiBmb3JtXHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiB7IGxvZ2luLCBpc0xvYWRpbmcsIGVycm9yLCBhZG1pbkRhdGEgfTtcclxufVxyXG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJsb2dpbkFkbWluIiwidXNlQWRtaW5Mb2dpbiIsImlzTG9hZGluZyIsInNldElzTG9hZGluZyIsImVycm9yIiwic2V0RXJyb3IiLCJhZG1pbkRhdGEiLCJzZXRBZG1pbkRhdGEiLCJsb2dpbiIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJkYXRhIiwiZXJyIiwibWVzc2FnZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/hooks/useAdminLogin.js\n"));

/***/ })

});