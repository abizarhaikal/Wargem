"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/repositories/menurepositories.js":
/*!**********************************************!*\
  !*** ./src/repositories/menurepositories.js ***!
  \**********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fetchMenuItems: () => (/* binding */ fetchMenuItems),\n/* harmony export */   loginAdmin: () => (/* binding */ loginAdmin)\n/* harmony export */ });\n/* harmony import */ var _services_pocketbaseservice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/pocketbaseservice */ \"(app-pages-browser)/./src/services/pocketbaseservice.js\");\n\nconst fetchMenuItems = async ()=>{\n    try {\n        const records = await _services_pocketbaseservice__WEBPACK_IMPORTED_MODULE_0__[\"default\"].collection(\"foods\").getFullList();\n        _services_pocketbaseservice__WEBPACK_IMPORTED_MODULE_0__[\"default\"].autoCancellation(false);\n        return records;\n    } catch (err) {\n        console.log(\"Error fetching menu items\", err);\n        throw err;\n    }\n};\nconst loginAdmin = async (username, password)=>{\n    try {\n        const result = await _services_pocketbaseservice__WEBPACK_IMPORTED_MODULE_0__[\"default\"].collection(\"admins\").authWithPassword(use);\n        console.log(\"Admin logged in\", result);\n        return result;\n    } catch (err) {\n        console.log(\"Error logging in admin\", err);\n        throw err;\n    }\n};\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9yZXBvc2l0b3JpZXMvbWVudXJlcG9zaXRvcmllcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBK0M7QUFFeEMsTUFBTUMsaUJBQWlCO0lBQzVCLElBQUk7UUFDRixNQUFNQyxVQUFVLE1BQU1GLG1FQUFFQSxDQUFDRyxVQUFVLENBQUMsU0FBU0MsV0FBVztRQUN4REosbUVBQUVBLENBQUNLLGdCQUFnQixDQUFDO1FBQ3BCLE9BQU9IO0lBQ1QsRUFBRSxPQUFPSSxLQUFLO1FBQ1pDLFFBQVFDLEdBQUcsQ0FBQyw2QkFBNkJGO1FBQ3pDLE1BQU1BO0lBQ1I7QUFDRixFQUFFO0FBRUssTUFBTUcsYUFBYSxPQUFNQyxVQUFVQztJQUN4QyxJQUFJO1FBQ0YsTUFBTUMsU0FBUyxNQUFNWixtRUFBRUEsQ0FBQ0csVUFBVSxDQUFDLFVBQVVVLGdCQUFnQixDQUFDQztRQUM5RFAsUUFBUUMsR0FBRyxDQUFDLG1CQUFtQkk7UUFDL0IsT0FBT0E7SUFDVCxFQUFFLE9BQU9OLEtBQUs7UUFDWkMsUUFBUUMsR0FBRyxDQUFDLDBCQUEwQkY7UUFDdEMsTUFBTUE7SUFDUjtBQUNGLEVBQUMiLCJzb3VyY2VzIjpbIkU6XFxSUFBMLUtFTE9NUE9LMlxcd2FyZ2VtLXByb2plY3RcXHNyY1xccmVwb3NpdG9yaWVzXFxtZW51cmVwb3NpdG9yaWVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYiBmcm9tIFwiLi4vc2VydmljZXMvcG9ja2V0YmFzZXNlcnZpY2VcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBmZXRjaE1lbnVJdGVtcyA9IGFzeW5jICgpID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVjb3JkcyA9IGF3YWl0IHBiLmNvbGxlY3Rpb24oXCJmb29kc1wiKS5nZXRGdWxsTGlzdCgpO1xyXG4gICAgcGIuYXV0b0NhbmNlbGxhdGlvbihmYWxzZSk7XHJcbiAgICByZXR1cm4gcmVjb3JkcztcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZmV0Y2hpbmcgbWVudSBpdGVtc1wiLCBlcnIpO1xyXG4gICAgdGhyb3cgZXJyO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBsb2dpbkFkbWluID0gYXN5bmModXNlcm5hbWUsIHBhc3N3b3JkKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHBiLmNvbGxlY3Rpb24oXCJhZG1pbnNcIikuYXV0aFdpdGhQYXNzd29yZCh1c2UpXHJcbiAgICBjb25zb2xlLmxvZyhcIkFkbWluIGxvZ2dlZCBpblwiLCByZXN1bHQpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgbG9nZ2luZyBpbiBhZG1pblwiLCBlcnIpO1xyXG4gICAgdGhyb3cgZXJyO1xyXG4gIH1cclxufSJdLCJuYW1lcyI6WyJwYiIsImZldGNoTWVudUl0ZW1zIiwicmVjb3JkcyIsImNvbGxlY3Rpb24iLCJnZXRGdWxsTGlzdCIsImF1dG9DYW5jZWxsYXRpb24iLCJlcnIiLCJjb25zb2xlIiwibG9nIiwibG9naW5BZG1pbiIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJyZXN1bHQiLCJhdXRoV2l0aFBhc3N3b3JkIiwidXNlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/repositories/menurepositories.js\n"));

/***/ })

});