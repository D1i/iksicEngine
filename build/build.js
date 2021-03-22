/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./screenVisualSystem/index.js":
/*!*************************************!*\
  !*** ./screenVisualSystem/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Screen": () => (/* binding */ Screen)
/* harmony export */ });
/* harmony import */ var _renderSystem_render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderSystem/render */ "./screenVisualSystem/renderSystem/render.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var screenDefaultHeight = 1280;
var screenDefaultWidth = 720;

var UpdateSystem = /*#__PURE__*/function () {
  function UpdateSystem(objectsList, actionList) {
    _classCallCheck(this, UpdateSystem);

    this.objectList = objectsList;
    this.actionList = actionList;
    this.waitUpdate = true;
  }

  _createClass(UpdateSystem, [{
    key: "objectListLength",
    value: function objectListLength() {
      return this.actionList.add.length + this.actionList["delete"].length;
    }
  }, {
    key: "update",
    value: function update() {
      var _this = this;

      this.actionList.add.forEach(function (i) {
        return _this.objectList.push(i);
      });
      this.actionList["delete"].forEach(function (deletedObject) {
        return _this.objectList.filter(function (i) {
          return i.name !== deletedObject;
        });
      });
      console.log("CLEAR!");
      this.actionList.add = [];
      this.actionList["delete"] = [];
    }
  }, {
    key: "init",
    value: function init() {
      var _this2 = this;

      setInterval(function () {
        if (!_this2.waitUpdate || _this2.objectListLength() >= 100) {
          console.log("update");
          _this2.waitUpdate = true;

          _this2.update();
        } else if (_this2.objectListLength() !== 0) {
          _this2.waitUpdate = false;
        }
      }, 100);
    }
  }]);

  return UpdateSystem;
}();

var CreateScreen = /*#__PURE__*/function () {
  function CreateScreen(screenName, screenHeight, screenWidth) {
    _classCallCheck(this, CreateScreen);

    this.screenName = screenName;
    this.element = this.screenElementCreate(screenName);
    this.screenSize = {
      height: screenHeight || screenDefaultHeight,
      width: screenWidth || screenDefaultWidth
    };
    this.objectList = [];
    this.turnActions = {
      add: [],
      "delete": []
    };
    this.screenPosition = {
      x: 0,
      y: 0
    };
    this.update = new UpdateSystem(this.objectList, this.turnActions);
    this.update.init();
    this.screenElement = this.screenElementCreate(screenName);
    this.renderMetodts = new _renderSystem_render__WEBPACK_IMPORTED_MODULE_0__.Render(this.objectList);
  }

  _createClass(CreateScreen, [{
    key: "screenElementCreate",
    value: function screenElementCreate(screenName) {
      var elem = document.createElement('div');
      elem.screen = screenName;
      elem.setAttribute('screen', screenName);
      return elem;
    }
  }, {
    key: "getElem",
    value: function getElem() {
      return this.screenElement;
    }
  }, {
    key: "add",
    value: function add(object) {
      //OBJECT: {
      //position: absolutePositionOnMap,
      //type: "circle" or "square",
      //color: "HEX" collors
      //}
      this.turnActions.add.push(object);
    }
  }, {
    key: "delete",
    value: function _delete(objectName) {
      this.turnActions["delete"].push(objectName);
    }
  }]);

  return CreateScreen;
}();

var Screen = /*#__PURE__*/function () {
  function Screen(context) {
    _classCallCheck(this, Screen);

    this.context = context;
    this.screenList = {};
  }

  _createClass(Screen, [{
    key: "create",
    value: function create(screenName, screenHeight, screenWidth) {
      var newScreen = new CreateScreen(screenName, screenHeight, screenWidth);
      this.screenList[screenName] = newScreen;
      return this.screenList[screenName];
    }
  }, {
    key: "delete",
    value: function _delete(screenName) {
      delete this.screenList[screenName];
    }
  }, {
    key: "editSize",
    value: function editSize(screenName, screenHeight, screenWidth) {
      this.screenList[screenName].screenSize = {
        height: screenHeight || screenDefaultHeight,
        width: screenWidth || screenDefaultWidth
      };
    }
  }, {
    key: "getScreen",
    value: function getScreen(screenName) {
      return this.screenList[screenName];
    }
  }, {
    key: "addObject",
    value: function addObject(screenName, object) {
      this.screenList[screenName].add(object);
    }
  }, {
    key: "deleteObject",
    value: function deleteObject(screenName, objectName) {
      this.screenList[screenName]["delete"](objectName);
    }
  }]);

  return Screen;
}();

/***/ }),

/***/ "./screenVisualSystem/renderSystem/render.js":
/*!***************************************************!*\
  !*** ./screenVisualSystem/renderSystem/render.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Render": () => (/* binding */ Render)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//visualElementTypes 
//    circle
//    square
var Render = /*#__PURE__*/function () {
  function Render(container) {
    _classCallCheck(this, Render);

    this.container = container;
    this.objectList = [];
  }

  _createClass(Render, [{
    key: "addElem",
    value: function addElem(object) {
      var elem;

      if (object.type === "circle") {
        elem = this.createCircle();
      } else {}
    }
  }, {
    key: "createCircle",
    value: function createCircle(radius) {
      var elem = document.createElement('div');
      elem.visualType = "cicle";
      elem.style.borderRadius = "50%";
      elem.style.width = "".concat(radius * 2, "px");
      elem.style.height = "".concat(radius * 2, "px");
      return elem;
    }
  }, {
    key: "createSquare",
    value: function createSquare(width, height) {
      var elem = document.createElement('div');
      elem.visualType = "square";
      elem.style.width = "".concat(width, "px");
      elem.style.height = "".concat(height, "px");
      return elem;
    }
  }]);

  return Render;
}();
;

/***/ }),

/***/ "./objectGenerateSystem/generateVisual/index.ts":
/*!******************************************************!*\
  !*** ./objectGenerateSystem/generateVisual/index.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EngineObject": () => (/* binding */ EngineObject),
/* harmony export */   "GroupObjects": () => (/* binding */ GroupObjects)
/* harmony export */ });
var EngineObject = /** @class */ (function () {
    function EngineObject(props) {
        this.name = "NAME GENERATE!";
        this.width = props.width;
        this.height = props.height;
        this.x = props.xPosition;
        this.y = props.yPosition;
        this.type = props.type;
        this.color = props.color;
        this.turningAngle = 0;
    }
    EngineObject.prototype.setTurningAngle = function (agile) {
        this.turningAngle = agile;
    };
    EngineObject.prototype.editTurningAngle = function (agile) {
        this.turningAngle = this.turningAngle + agile;
    };
    EngineObject.prototype.setPosition = function (x, y) {
        this.x = x;
        this.y = y;
    };
    EngineObject.prototype.editPosition = function (x, y) {
        this.x = this.x + x;
        this.y = this.y + y;
    };
    return EngineObject;
}());

var GroupObjects = /** @class */ (function () {
    function GroupObjects(objectList, xPosition, yPosition) {
        this.x = xPosition;
        this.y = yPosition;
        this.type = "object group";
        this.turningAngle = 0;
        this.objectList = objectList;
    }
    GroupObjects.prototype.addObject = function (object) {
        this.objectList.push(object);
    };
    GroupObjects.prototype.deleteObject = function (objectName) {
        this.objectList.filter(function (i) { return i.name !== objectName; });
    };
    GroupObjects.prototype.setPosition = function (x, y) {
        this.x = x;
        this.y = y;
    };
    GroupObjects.prototype.editPosition = function (x, y) {
        this.x = this.x + x;
        this.y = this.y + y;
    };
    GroupObjects.prototype.setTurningAngle = function (agile) {
        this.turningAngle = agile;
    };
    GroupObjects.prototype.editTurningAngle = function (agile) {
        this.turningAngle = this.turningAngle + agile;
        this.objectList = this.objectList
            .map(this.calculationOfCurrentPositionsAtObject);
    };
    GroupObjects.prototype.calculationOfCurrentPositionsAtObject = function (object) {
        object.turningAngle += this.turningAngle;
        object.x;
        object.y;
        return {
            name: '',
            width: 1,
            height: 2,
            x: 3,
            y: 4,
            type: 'string',
            color: 'string',
            turningAngle: 3,
        };
    };
    return GroupObjects;
}());



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _screenVisualSystem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./screenVisualSystem */ "./screenVisualSystem/index.js");
/* harmony import */ var _objectGenerateSystem_generateVisual__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./objectGenerateSystem/generateVisual */ "./objectGenerateSystem/generateVisual/index.ts");


var screenContainer = document.getElementById('screen');
var screen = new _screenVisualSystem__WEBPACK_IMPORTED_MODULE_0__.Screen('TEST CONTEXT');
var firstScreen = screen.create('firstScreen', 500, 1000);
screenContainer.append(firstScreen.getElem());
window.screen = firstScreen;
window.EngineObject = _objectGenerateSystem_generateVisual__WEBPACK_IMPORTED_MODULE_1__.EngineObject;
})();

this.mySlider = __webpack_exports__.default;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teVNsaWRlci8uL3NjcmVlblZpc3VhbFN5c3RlbS9pbmRleC5qcyIsIndlYnBhY2s6Ly9teVNsaWRlci8uL3NjcmVlblZpc3VhbFN5c3RlbS9yZW5kZXJTeXN0ZW0vcmVuZGVyLmpzIiwid2VicGFjazovL215U2xpZGVyLy4vb2JqZWN0R2VuZXJhdGVTeXN0ZW0vZ2VuZXJhdGVWaXN1YWwvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbXlTbGlkZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbXlTbGlkZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL215U2xpZGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbXlTbGlkZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9teVNsaWRlci8uL2luZGV4LmpzIl0sIm5hbWVzIjpbInNjcmVlbkRlZmF1bHRIZWlnaHQiLCJzY3JlZW5EZWZhdWx0V2lkdGgiLCJVcGRhdGVTeXN0ZW0iLCJvYmplY3RzTGlzdCIsImFjdGlvbkxpc3QiLCJvYmplY3RMaXN0Iiwid2FpdFVwZGF0ZSIsImFkZCIsImxlbmd0aCIsImZvckVhY2giLCJpIiwicHVzaCIsImRlbGV0ZWRPYmplY3QiLCJmaWx0ZXIiLCJuYW1lIiwiY29uc29sZSIsImxvZyIsInNldEludGVydmFsIiwib2JqZWN0TGlzdExlbmd0aCIsInVwZGF0ZSIsIkNyZWF0ZVNjcmVlbiIsInNjcmVlbk5hbWUiLCJzY3JlZW5IZWlnaHQiLCJzY3JlZW5XaWR0aCIsImVsZW1lbnQiLCJzY3JlZW5FbGVtZW50Q3JlYXRlIiwic2NyZWVuU2l6ZSIsImhlaWdodCIsIndpZHRoIiwidHVybkFjdGlvbnMiLCJzY3JlZW5Qb3NpdGlvbiIsIngiLCJ5IiwiaW5pdCIsInNjcmVlbkVsZW1lbnQiLCJyZW5kZXJNZXRvZHRzIiwiUmVuZGVyIiwiZWxlbSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInNjcmVlbiIsInNldEF0dHJpYnV0ZSIsIm9iamVjdCIsIm9iamVjdE5hbWUiLCJTY3JlZW4iLCJjb250ZXh0Iiwic2NyZWVuTGlzdCIsIm5ld1NjcmVlbiIsImNvbnRhaW5lciIsInR5cGUiLCJjcmVhdGVDaXJjbGUiLCJyYWRpdXMiLCJ2aXN1YWxUeXBlIiwic3R5bGUiLCJib3JkZXJSYWRpdXMiLCJzY3JlZW5Db250YWluZXIiLCJnZXRFbGVtZW50QnlJZCIsImZpcnN0U2NyZWVuIiwiY3JlYXRlIiwiYXBwZW5kIiwiZ2V0RWxlbSIsIndpbmRvdyIsIkVuZ2luZU9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFQSxJQUFNQSxtQkFBbUIsR0FBRyxJQUE1QjtBQUNBLElBQU1DLGtCQUFrQixHQUFHLEdBQTNCOztJQUVNQyxZO0FBRUYsd0JBQVlDLFdBQVosRUFBeUJDLFVBQXpCLEVBQXFDO0FBQUE7O0FBQ2pDLFNBQUtDLFVBQUwsR0FBa0JGLFdBQWxCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSxTQUFLRSxVQUFMLEdBQWtCLElBQWxCO0FBQ0g7Ozs7V0FFRCw0QkFBbUI7QUFDZixhQUFPLEtBQUtGLFVBQUwsQ0FBZ0JHLEdBQWhCLENBQW9CQyxNQUFwQixHQUE2QixLQUFLSixVQUFMLFdBQXVCSSxNQUEzRDtBQUNIOzs7V0FFRCxrQkFBUztBQUFBOztBQUNMLFdBQUtKLFVBQUwsQ0FBZ0JHLEdBQWhCLENBQW9CRSxPQUFwQixDQUE2QixVQUFBQyxDQUFDO0FBQUEsZUFBSSxLQUFJLENBQUNMLFVBQUwsQ0FBZ0JNLElBQWhCLENBQXFCRCxDQUFyQixDQUFKO0FBQUEsT0FBOUI7QUFFQSxXQUFLTixVQUFMLFdBQXVCSyxPQUF2QixDQUFnQyxVQUFBRyxhQUFhO0FBQUEsZUFBSSxLQUFJLENBQUNQLFVBQUwsQ0FBZ0JRLE1BQWhCLENBQXVCLFVBQUFILENB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLDhCQUE4QixFQUFFO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDdUI7Ozs7Ozs7VUMzRXhCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3JCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBRUEsSUFBTWtCLGVBQWUsR0FBR2pCLFFBQVEsQ0FBQ2tCLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBeEI7QUFFQSxJQUFNaEIsTUFBTSxHQUFHLElBQUlJLHVEQUFKLENBQVcsY0FBWCxDQUFmO0FBRUEsSUFBTWEsV0FBVyxHQUFHakIsTUFBTSxDQUFDa0IsTUFBUCxDQUFjLGFBQWQsRUFBNkIsR0FBN0IsRUFBa0MsSUFBbEMsQ0FBcEI7QUFFQUgsZUFBZSxDQUFDSSxNQUFoQixDQUF1QkYsV0FBVyxDQUFDRyxPQUFaLEVBQXZCO0FBRUFDLE1BQU0sQ0FBQ3JCLE1BQVAsR0FBZ0JpQixXQUFoQjtBQUNBSSxNQUFNLENBQUNDLFlBQVAsR0FBc0JBLDhFQUF0QixDIiwiZmlsZSI6ImJ1aWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVuZGVyIH0gZnJvbSBcIi4vcmVuZGVyU3lzdGVtL3JlbmRlclwiO1xyXG5cclxuY29uc3Qgc2NyZWVuRGVmYXVsdEhlaWdodCA9IDEyODA7XHJcbmNvbnN0IHNjcmVlbkRlZmF1bHRXaWR0aCA9IDcyMDtcclxuXHJcbmNsYXNzIFVwZGF0ZVN5c3RlbSB7XHJcblxyXG4gICAgY29uc3RydWN0b3Iob2JqZWN0c0xpc3QsIGFjdGlvbkxpc3QpIHtcclxuICAgICAgICB0aGlzLm9iamVjdExpc3QgPSBvYmplY3RzTGlzdDtcclxuICAgICAgICB0aGlzLmFjdGlvbkxpc3QgPSBhY3Rpb25MaXN0O1xyXG4gICAgICAgIHRoaXMud2FpdFVwZGF0ZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgb2JqZWN0TGlzdExlbmd0aCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hY3Rpb25MaXN0LmFkZC5sZW5ndGggKyB0aGlzLmFjdGlvbkxpc3QuZGVsZXRlLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5hY3Rpb25MaXN0LmFkZC5mb3JFYWNoKCBpID0+IHRoaXMub2JqZWN0TGlzdC5wdXNoKGkpKTtcclxuXHJcbiAgICAgICAgdGhpcy5hY3Rpb25MaXN0LmRlbGV0ZS5mb3JFYWNoKCBkZWxldGVkT2JqZWN0ID0+IHRoaXMub2JqZWN0TGlzdC5maWx0ZXIoaSA9PiBpLm5hbWUgIT09IGRlbGV0ZWRPYmplY3QpKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDTEVBUiFcIilcclxuXHJcbiAgICAgICAgdGhpcy5hY3Rpb25MaXN0LmFkZCA9IFtdO1xyXG4gICAgICAgIHRoaXMuYWN0aW9uTGlzdC5kZWxldGUgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgaWYoICF0aGlzLndhaXRVcGRhdGUgfHwgdGhpcy5vYmplY3RMaXN0TGVuZ3RoKCkgPj0gMTAwICkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1cGRhdGVcIilcclxuICAgICAgICAgICAgICAgIHRoaXMud2FpdFVwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgIGlmICh0aGlzLm9iamVjdExpc3RMZW5ndGgoKSAhPT0gMCApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2FpdFVwZGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMTAwKVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBDcmVhdGVTY3JlZW4ge1xyXG4gICAgY29uc3RydWN0b3Ioc2NyZWVuTmFtZSwgc2NyZWVuSGVpZ2h0LCBzY3JlZW5XaWR0aCkge1xyXG4gICAgICAgIHRoaXMuc2NyZWVuTmFtZSA9IHNjcmVlbk5hbWU7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5zY3JlZW5FbGVtZW50Q3JlYXRlKHNjcmVlbk5hbWUpO1xyXG4gICAgICAgIHRoaXMuc2NyZWVuU2l6ZSA9IHtcclxuICAgICAgICAgICAgaGVpZ2h0OiBzY3JlZW5IZWlnaHQgfHwgc2NyZWVuRGVmYXVsdEhlaWdodCxcclxuICAgICAgICAgICAgd2lkdGg6IHNjcmVlbldpZHRoIHx8IHNjcmVlbkRlZmF1bHRXaWR0aFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm9iamVjdExpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLnR1cm5BY3Rpb25zID0ge2FkZDogW10sIGRlbGV0ZTogW119O1xyXG4gICAgICAgIHRoaXMuc2NyZWVuUG9zaXRpb24gPSB7eDogMCwgeTogMH07XHJcbiAgICAgICAgdGhpcy51cGRhdGUgPSBuZXcgVXBkYXRlU3lzdGVtKHRoaXMub2JqZWN0TGlzdCwgdGhpcy50dXJuQWN0aW9ucyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGUuaW5pdCgpO1xyXG4gICAgICAgIHRoaXMuc2NyZWVuRWxlbWVudCA9IHRoaXMuc2NyZWVuRWxlbWVudENyZWF0ZShzY3JlZW5OYW1lKTtcclxuICAgICAgICB0aGlzLnJlbmRlck1ldG9kdHMgPSBuZXcgUmVuZGVyKHRoaXMub2JqZWN0TGlzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2NyZWVuRWxlbWVudENyZWF0ZShzY3JlZW5OYW1lKSB7XHJcbiAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGVsZW0uc2NyZWVuID0gc2NyZWVuTmFtZTtcclxuICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZSgnc2NyZWVuJywgc2NyZWVuTmFtZSlcclxuICAgICAgICByZXR1cm4gZWxlbTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRFbGVtKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNjcmVlbkVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkKG9iamVjdCkge1xyXG4gICAgICAgIC8vT0JKRUNUOiB7XHJcbiAgICAgICAgLy9wb3NpdGlvbjogYWJzb2x1dGVQb3NpdGlvbk9uTWFwLFxyXG4gICAgICAgIC8vdHlwZTogXCJjaXJjbGVcIiBvciBcInNxdWFyZVwiLFxyXG4gICAgICAgIC8vY29sb3I6IFwiSEVYXCIgY29sbG9yc1xyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIHRoaXMudHVybkFjdGlvbnMuYWRkLnB1c2gob2JqZWN0KTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGUob2JqZWN0TmFtZSkge1xyXG4gICAgICAgIHRoaXMudHVybkFjdGlvbnMuZGVsZXRlLnB1c2gob2JqZWN0TmFtZSk7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNjcmVlbiB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dFxyXG4gICAgICAgIHRoaXMuc2NyZWVuTGlzdCA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZShzY3JlZW5OYW1lLCBzY3JlZW5IZWlnaHQsIHNjcmVlbldpZHRoKSB7XHJcbiAgICAgICAgY29uc3QgbmV3U2NyZWVuID0gbmV3IENyZWF0ZVNjcmVlbihzY3JlZW5OYW1lLCBzY3JlZW5IZWlnaHQsIHNjcmVlbldpZHRoKTtcclxuICAgICAgICB0aGlzLnNjcmVlbkxpc3Rbc2NyZWVuTmFtZV0gPSBuZXdTY3JlZW47XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NyZWVuTGlzdFtzY3JlZW5OYW1lXTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGUoc2NyZWVuTmFtZSkge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLnNjcmVlbkxpc3Rbc2NyZWVuTmFtZV07XHJcbiAgICB9XHJcblxyXG4gICAgZWRpdFNpemUoc2NyZWVuTmFtZSwgc2NyZWVuSGVpZ2h0LCBzY3JlZW5XaWR0aCkge1xyXG4gICAgICAgIHRoaXMuc2NyZWVuTGlzdFtzY3JlZW5OYW1lXS5zY3JlZW5TaXplID0ge1xyXG4gICAgICAgICAgICBoZWlnaHQ6IHNjcmVlbkhlaWdodCB8fCBzY3JlZW5EZWZhdWx0SGVpZ2h0LFxyXG4gICAgICAgICAgICB3aWR0aDogc2NyZWVuV2lkdGggfHwgc2NyZWVuRGVmYXVsdFdpZHRoXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTY3JlZW4oc2NyZWVuTmFtZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNjcmVlbkxpc3Rbc2NyZWVuTmFtZV07XHJcbiAgICB9XHJcblxyXG4gICAgYWRkT2JqZWN0KHNjcmVlbk5hbWUsIG9iamVjdCkge1xyXG4gICAgICAgIHRoaXMuc2NyZWVuTGlzdFtzY3JlZW5OYW1lXS5hZGQob2JqZWN0KTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVPYmplY3Qoc2NyZWVuTmFtZSwgb2JqZWN0TmFtZSkge1xyXG4gICAgICAgIHRoaXMuc2NyZWVuTGlzdFtzY3JlZW5OYW1lXS5kZWxldGUob2JqZWN0TmFtZSk7XHJcbiAgICB9XHJcbn1cclxuIiwiLy92aXN1YWxFbGVtZW50VHlwZXMgXHJcbi8vICAgIGNpcmNsZVxyXG4vLyAgICBzcXVhcmVcclxuXHJcbmV4cG9ydCBjbGFzcyBSZW5kZXIge1xyXG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyKSB7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XHJcbiAgICAgICAgdGhpcy5vYmplY3RMaXN0ID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgYWRkRWxlbShvYmplY3QpIHtcclxuICAgICAgICBsZXQgZWxlbTtcclxuICAgICAgICBpZiAob2JqZWN0LnR5cGUgPT09IFwiY2lyY2xlXCIpIHtcclxuICAgICAgICAgICAgZWxlbSA9IHRoaXMuY3JlYXRlQ2lyY2xlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUNpcmNsZShyYWRpdXMpIHtcclxuICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgZWxlbS52aXN1YWxUeXBlID0gXCJjaWNsZVwiO1xyXG4gICAgICAgIGVsZW0uc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI1MCVcIjtcclxuICAgICAgICBlbGVtLnN0eWxlLndpZHRoID0gYCR7cmFkaXVzICogMn1weGA7XHJcbiAgICAgICAgZWxlbS5zdHlsZS5oZWlnaHQgPSBgJHtyYWRpdXMgKiAyfXB4YDtcclxuICAgICAgICByZXR1cm4gZWxlbTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVTcXVhcmUod2lkdGgsIGhlaWdodCkge1xyXG4gICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBlbGVtLnZpc3VhbFR5cGUgPSBcInNxdWFyZVwiO1xyXG4gICAgICAgIGVsZW0uc3R5bGUud2lkdGggPSBgJHt3aWR0aH1weGA7XHJcbiAgICAgICAgZWxlbS5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHR9cHhgO1xyXG4gICAgICAgIHJldHVybiBlbGVtO1xyXG4gICAgfVxyXG4gICAgXHJcbn07XHJcbiIsInZhciBFbmdpbmVPYmplY3QgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBFbmdpbmVPYmplY3QocHJvcHMpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIk5BTUUgR0VORVJBVEUhXCI7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHByb3BzLndpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gcHJvcHMuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMueCA9IHByb3BzLnhQb3NpdGlvbjtcclxuICAgICAgICB0aGlzLnkgPSBwcm9wcy55UG9zaXRpb247XHJcbiAgICAgICAgdGhpcy50eXBlID0gcHJvcHMudHlwZTtcclxuICAgICAgICB0aGlzLmNvbG9yID0gcHJvcHMuY29sb3I7XHJcbiAgICAgICAgdGhpcy50dXJuaW5nQW5nbGUgPSAwO1xyXG4gICAgfVxyXG4gICAgRW5naW5lT2JqZWN0LnByb3RvdHlwZS5zZXRUdXJuaW5nQW5nbGUgPSBmdW5jdGlvbiAoYWdpbGUpIHtcclxuICAgICAgICB0aGlzLnR1cm5pbmdBbmdsZSA9IGFnaWxlO1xyXG4gICAgfTtcclxuICAgIEVuZ2luZU9iamVjdC5wcm90b3R5cGUuZWRpdFR1cm5pbmdBbmdsZSA9IGZ1bmN0aW9uIChhZ2lsZSkge1xyXG4gICAgICAgIHRoaXMudHVybmluZ0FuZ2xlID0gdGhpcy50dXJuaW5nQW5nbGUgKyBhZ2lsZTtcclxuICAgIH07XHJcbiAgICBFbmdpbmVPYmplY3QucHJvdG90eXBlLnNldFBvc2l0aW9uID0gZnVuY3Rpb24gKHgsIHkpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9O1xyXG4gICAgRW5naW5lT2JqZWN0LnByb3RvdHlwZS5lZGl0UG9zaXRpb24gPSBmdW5jdGlvbiAoeCwgeSkge1xyXG4gICAgICAgIHRoaXMueCA9IHRoaXMueCArIHg7XHJcbiAgICAgICAgdGhpcy55ID0gdGhpcy55ICsgeTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gRW5naW5lT2JqZWN0O1xyXG59KCkpO1xyXG5leHBvcnQgeyBFbmdpbmVPYmplY3QgfTtcclxudmFyIEdyb3VwT2JqZWN0cyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEdyb3VwT2JqZWN0cyhvYmplY3RMaXN0LCB4UG9zaXRpb24sIHlQb3NpdGlvbikge1xyXG4gICAgICAgIHRoaXMueCA9IHhQb3NpdGlvbjtcclxuICAgICAgICB0aGlzLnkgPSB5UG9zaXRpb247XHJcbiAgICAgICAgdGhpcy50eXBlID0gXCJvYmplY3QgZ3JvdXBcIjtcclxuICAgICAgICB0aGlzLnR1cm5pbmdBbmdsZSA9IDA7XHJcbiAgICAgICAgdGhpcy5vYmplY3RMaXN0ID0gb2JqZWN0TGlzdDtcclxuICAgIH1cclxuICAgIEdyb3VwT2JqZWN0cy5wcm90b3R5cGUuYWRkT2JqZWN0ID0gZnVuY3Rpb24gKG9iamVjdCkge1xyXG4gICAgICAgIHRoaXMub2JqZWN0TGlzdC5wdXNoKG9iamVjdCk7XHJcbiAgICB9O1xyXG4gICAgR3JvdXBPYmplY3RzLnByb3RvdHlwZS5kZWxldGVPYmplY3QgPSBmdW5jdGlvbiAob2JqZWN0TmFtZSkge1xyXG4gICAgICAgIHRoaXMub2JqZWN0TGlzdC5maWx0ZXIoZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGkubmFtZSAhPT0gb2JqZWN0TmFtZTsgfSk7XHJcbiAgICB9O1xyXG4gICAgR3JvdXBPYmplY3RzLnByb3RvdHlwZS5zZXRQb3NpdGlvbiA9IGZ1bmN0aW9uICh4LCB5KSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfTtcclxuICAgIEdyb3VwT2JqZWN0cy5wcm90b3R5cGUuZWRpdFBvc2l0aW9uID0gZnVuY3Rpb24gKHgsIHkpIHtcclxuICAgICAgICB0aGlzLnggPSB0aGlzLnggKyB4O1xyXG4gICAgICAgIHRoaXMueSA9IHRoaXMueSArIHk7XHJcbiAgICB9O1xyXG4gICAgR3JvdXBPYmplY3RzLnByb3RvdHlwZS5zZXRUdXJuaW5nQW5nbGUgPSBmdW5jdGlvbiAoYWdpbGUpIHtcclxuICAgICAgICB0aGlzLnR1cm5pbmdBbmdsZSA9IGFnaWxlO1xyXG4gICAgfTtcclxuICAgIEdyb3VwT2JqZWN0cy5wcm90b3R5cGUuZWRpdFR1cm5pbmdBbmdsZSA9IGZ1bmN0aW9uIChhZ2lsZSkge1xyXG4gICAgICAgIHRoaXMudHVybmluZ0FuZ2xlID0gdGhpcy50dXJuaW5nQW5nbGUgKyBhZ2lsZTtcclxuICAgICAgICB0aGlzLm9iamVjdExpc3QgPSB0aGlzLm9iamVjdExpc3RcclxuICAgICAgICAgICAgLm1hcCh0aGlzLmNhbGN1bGF0aW9uT2ZDdXJyZW50UG9zaXRpb25zQXRPYmplY3QpO1xyXG4gICAgfTtcclxuICAgIEdyb3VwT2JqZWN0cy5wcm90b3R5cGUuY2FsY3VsYXRpb25PZkN1cnJlbnRQb3NpdGlvbnNBdE9iamVjdCA9IGZ1bmN0aW9uIChvYmplY3QpIHtcclxuICAgICAgICBvYmplY3QudHVybmluZ0FuZ2xlICs9IHRoaXMudHVybmluZ0FuZ2xlO1xyXG4gICAgICAgIG9iamVjdC54O1xyXG4gICAgICAgIG9iamVjdC55O1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICcnLFxyXG4gICAgICAgICAgICB3aWR0aDogMSxcclxuICAgICAgICAgICAgaGVpZ2h0OiAyLFxyXG4gICAgICAgICAgICB4OiAzLFxyXG4gICAgICAgICAgICB5OiA0LFxyXG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcclxuICAgICAgICAgICAgY29sb3I6ICdzdHJpbmcnLFxyXG4gICAgICAgICAgICB0dXJuaW5nQW5nbGU6IDMsXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gR3JvdXBPYmplY3RzO1xyXG59KCkpO1xyXG5leHBvcnQgeyBHcm91cE9iamVjdHMgfTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgU2NyZWVuIH0gZnJvbSAnLi9zY3JlZW5WaXN1YWxTeXN0ZW0nO1xyXG5pbXBvcnQgeyBFbmdpbmVPYmplY3QgfSBmcm9tICcuL29iamVjdEdlbmVyYXRlU3lzdGVtL2dlbmVyYXRlVmlzdWFsJ1xyXG5cclxuY29uc3Qgc2NyZWVuQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NjcmVlbicpO1xyXG5cclxuY29uc3Qgc2NyZWVuID0gbmV3IFNjcmVlbignVEVTVCBDT05URVhUJyk7XHJcblxyXG5jb25zdCBmaXJzdFNjcmVlbiA9IHNjcmVlbi5jcmVhdGUoJ2ZpcnN0U2NyZWVuJywgNTAwLCAxMDAwKTtcclxuXHJcbnNjcmVlbkNvbnRhaW5lci5hcHBlbmQoZmlyc3RTY3JlZW4uZ2V0RWxlbSgpKTtcclxuXHJcbndpbmRvdy5zY3JlZW4gPSBmaXJzdFNjcmVlbjtcclxud2luZG93LkVuZ2luZU9iamVjdCA9IEVuZ2luZU9iamVjdDtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==