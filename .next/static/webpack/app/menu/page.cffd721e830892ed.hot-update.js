"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/menu/page",{

/***/ "(app-pages-browser)/./src/hooks/useMenuItems.js":
/*!***********************************!*\
  !*** ./src/hooks/useMenuItems.js ***!
  \***********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useCounter: () => (/* binding */ useCounter),\n/* harmony export */   useMenuItems: () => (/* binding */ useMenuItems)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _repositories_menurepositories__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../repositories/menurepositories */ \"(app-pages-browser)/./src/repositories/menurepositories.js\");\nvar _s = $RefreshSig$(), _s1 = $RefreshSig$();\n\n\nconst useMenuItems = ()=>{\n    _s();\n    const [menuItems, setMenuItems] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)({\n        \"useMenuItems.useEffect\": ()=>{\n            const fetchData = {\n                \"useMenuItems.useEffect.fetchData\": async ()=>{\n                    try {\n                        const data = await (0,_repositories_menurepositories__WEBPACK_IMPORTED_MODULE_1__.fetchMenuItems)();\n                        setMenuItems(data);\n                    } catch (err) {\n                        setError(\"Failed to fetch menu items\");\n                    } finally{\n                        setLoading(false);\n                    }\n                }\n            }[\"useMenuItems.useEffect.fetchData\"];\n            fetchData();\n        }\n    }[\"useMenuItems.useEffect\"], []);\n    return {\n        menuItems,\n        loading,\n        error\n    };\n};\n_s(useMenuItems, \"P3U8sBuHVPwyfnXLVzudqJWHWJw=\");\nfunction useCounter() {\n    let initialValue = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;\n    _s1();\n    const [count, setCount] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialValue);\n    const increment = ()=>setCount((prev)=>prev + 1);\n}\n_s1(useCounter, \"anQBWt8gm5Alpw27Xf2pPZffWFg=\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9ob29rcy91c2VNZW51SXRlbXMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQTRDO0FBQ3NCO0FBRTNELE1BQU1HLGVBQWU7O0lBQzFCLE1BQU0sQ0FBQ0MsV0FBV0MsYUFBYSxHQUFHTCwrQ0FBUUEsQ0FBQyxFQUFFO0lBQzdDLE1BQU0sQ0FBQ00sU0FBU0MsV0FBVyxHQUFHUCwrQ0FBUUEsQ0FBQztJQUN2QyxNQUFNLENBQUNRLE9BQU9DLFNBQVMsR0FBR1QsK0NBQVFBLENBQUM7SUFFbkNDLGdEQUFTQTtrQ0FBQztZQUNSLE1BQU1TO29EQUFZO29CQUNoQixJQUFJO3dCQUNGLE1BQU1DLE9BQU8sTUFBTVQsOEVBQWNBO3dCQUNqQ0csYUFBYU07b0JBQ2YsRUFBRSxPQUFPQyxLQUFLO3dCQUNaSCxTQUFTO29CQUNYLFNBQVU7d0JBQ1JGLFdBQVc7b0JBQ2I7Z0JBQ0Y7O1lBRUFHO1FBQ0Y7aUNBQUcsRUFBRTtJQUVMLE9BQU87UUFBRU47UUFBV0U7UUFBU0U7SUFBTTtBQUNyQyxFQUFFO0dBckJXTDtBQXVCTixTQUFTVTtRQUFXQyxlQUFBQSxpRUFBZTs7SUFDeEMsTUFBTSxDQUFDQyxPQUFPQyxTQUFTLEdBQUdoQiwrQ0FBUUEsQ0FBQ2M7SUFFbkMsTUFBTUcsWUFBWSxJQUFNRCxTQUFTLENBQUNFLE9BQVNBLE9BQU87QUFDcEQ7SUFKZ0JMIiwic291cmNlcyI6WyJFOlxcUlBQTC1LRUxPTVBPSzJcXHdhcmdlbS1wcm9qZWN0XFxzcmNcXGhvb2tzXFx1c2VNZW51SXRlbXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBmZXRjaE1lbnVJdGVtcyB9IGZyb20gXCIuLi9yZXBvc2l0b3JpZXMvbWVudXJlcG9zaXRvcmllc1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHVzZU1lbnVJdGVtcyA9ICgpID0+IHtcclxuICBjb25zdCBbbWVudUl0ZW1zLCBzZXRNZW51SXRlbXNdID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xyXG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUobnVsbCk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBmZXRjaERhdGEgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoTWVudUl0ZW1zKCk7XHJcbiAgICAgICAgc2V0TWVudUl0ZW1zKGRhdGEpO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBzZXRFcnJvcihcIkZhaWxlZCB0byBmZXRjaCBtZW51IGl0ZW1zXCIpO1xyXG4gICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGZldGNoRGF0YSgpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgcmV0dXJuIHsgbWVudUl0ZW1zLCBsb2FkaW5nLCBlcnJvciB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVzZUNvdW50ZXIoaW5pdGlhbFZhbHVlID0gMCkge1xyXG4gIGNvbnN0IFtjb3VudCwgc2V0Q291bnRdID0gdXNlU3RhdGUoaW5pdGlhbFZhbHVlKTtcclxuXHJcbiAgY29uc3QgaW5jcmVtZW50ID0gKCkgPT4gc2V0Q291bnQoKHByZXYpID0+IHByZXYgKyAxKTtcclxufVxyXG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJmZXRjaE1lbnVJdGVtcyIsInVzZU1lbnVJdGVtcyIsIm1lbnVJdGVtcyIsInNldE1lbnVJdGVtcyIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwiZXJyb3IiLCJzZXRFcnJvciIsImZldGNoRGF0YSIsImRhdGEiLCJlcnIiLCJ1c2VDb3VudGVyIiwiaW5pdGlhbFZhbHVlIiwiY291bnQiLCJzZXRDb3VudCIsImluY3JlbWVudCIsInByZXYiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/hooks/useMenuItems.js\n"));

/***/ })

});