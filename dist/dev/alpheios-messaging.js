(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");



function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ }),

/***/ "./src/configurations/destinations.js":
/*!********************************************!*\
  !*** ./src/configurations/destinations.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CedictDestinationConfig: () => (/* binding */ CedictDestinationConfig),
/* harmony export */   CedictDestinationDevConfig: () => (/* binding */ CedictDestinationDevConfig)
/* harmony export */ });
/**
 * This is a configuration of a WindowsIframeDestination that can be used to connect to CEDICT client service.
 *
 * @type {{targetIframeID: string, name: string, targetURL: string}}
 */
const CedictDestinationConfig = {
  name: 'cedict',
  targetURL: 'https://lexis-dev.alpheios.net',
  targetIframeID: 'alpheios-lexis-cs'
}
/**
 * This is a development version of the above configuration
 *
 * @type {{targetIframeID: string, name: string, targetURL: string}}
 */
const CedictDestinationDevConfig = {
  name: 'cedict',
  targetURL: 'https://lexis-dev.alpheios.net/index-dev.html',
  targetIframeID: 'alpheios-lexis-cs'
}


/***/ }),

/***/ "./src/core/messaging-service.js":
/*!***************************************!*\
  !*** ./src/core/messaging-service.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MessagingService)
/* harmony export */ });
/* harmony import */ var _messServ_messages_message_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @messServ/messages/message.js */ "./src/messages/message.js");
/* harmony import */ var _messServ_messages_response_message_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @messServ/messages/response-message.js */ "./src/messages/response-message.js");
/* harmony import */ var _messServ_core_stored_request_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @messServ/core/stored-request.js */ "./src/core/stored-request.js");
/**
 * @module MessagingService
 */




/**
 * A map to keep "single" instances of MessagingService objects.
 *
 * @type {Map<string, MessagingService>}
 */
let services = new Map()  

/** A messaging for sending and receiving messages to and from various destinations */
class MessagingService {
  /**
   * Creates an instance of a messaging service.
   *
   * @param {string} name - A name of a messaging service. Useful in identifying the service when
   *        several clients need to share the same instance of a service.
   * @param {Destination || Destination[]} destinations - One or several
   *        destination objects to be used with the messaging service.
   */
  constructor (name, destinations = []) {
    if (!name) throw new Error(MessagingService.errMsgs.NO_NAME)
    this.name = name
    /**
     * A map object where outgoing messages will be stored. The key is the message ID and the value is an object
     * that stores details about the message being sent.
     *
     * @type {Map<string, StoredRequest>}
     */
    this._messages = new Map()

    /**
     * A map object where outgoing messages will be stored. The key is a destination name and the value is
     * the Destination object.
     *
     * @type {Map<string, Destination>}
     */
    this._destinations = new Map()

    // If provided as a singular value convert destination into an array
    if (!Array.isArray(destinations)) { destinations = [destinations] }
    destinations.forEach(destination => this.registerDestination(destination))
  }

  /**
   * Check if service with a given name has already been created.
   *
   * @param {string} name - A name of a service.
   * @returns {boolean} Returns true if service has already been created or false otherwise.
   */
  static hasService (name) {
    return services.has(name)
  }

  /**
   * Returns an instance of a service or `undefined` if service does not exist.
   *
   * @param {string} name - A name of a service.
   * @returns {MessagingService|undefined} If service exists, returns an instance of a service.
   *          If it does not, returns `undefined`.
   */
  static getService (name) {
    return services.get(name)
  }

  /**
   * Creates an instance of a MessagingService and adds it to the map of instances.
   *
   * @param {string} name - A map of messaging service to create.
   * @param {Destination|Destination[]} destinations - One or several
   *        destination objects to be used with the messaging service.
   * @returns {MessagingService} An instance of a newly created messaging service.
   */
  static createService (name, destinations = []) {
    const service = new MessagingService(name, destinations)
    services.set(name, service)
    return service
  }

  /**
   * Removes an instance of a MessagingService form the map of instances.
   *
   * @param {string} name - A name of a service to remove.
   * @returns {boolean} True if a service in the map existed and has been removed,
   *          or false if the service does not exist.
   */
  static deleteService (name) {
    return services.delete(name)
  }

  /**
   * Registers a new destination by adding it to the destinations map and setting a response callback.
   *
   * @param {Destination} destination - A destination object to register.
   */
  registerDestination (destination) {
    if (this._destinations.has(destination.name)) {
      throw new Error('Destination already exists')
    }
    this._destinations.set(destination.name, destination)
    if (destination.ableToSend) { destination.registerResponseCallback(this.dispatchMessage.bind(this)) }
  }

  /**
   * Updates a destinations that is already registered.
   *
   * @param {Destination} destination - A destination object to register.
   */
  updateDestination (destination) {
    if (!this._destinations.has(destination.name)) {
      throw new Error('Cannot update a destination that does not exist')
    }
    // Call `deregister` on the destination in order to let it clean the things up
    this._destinations.get(destination.name).deregister()
    this._destinations.set(destination.name, destination)
    // Register a response callback only if destination supports a SEND mode
    if (destination.ableToSend) { destination.registerResponseCallback(this.dispatchMessage.bind(this)) }
  }

  /**
   * A function to handle incoming messages.
   *
   * @param {ResponseMessage} message - An incoming response message.
   */
  dispatchMessage (message) {
    if (!_messServ_messages_message_js__WEBPACK_IMPORTED_MODULE_0__["default"].isKnownType(message.type)) {
      // Ignore messages that we do not support
      return
    }
    if (!_messServ_messages_response_message_js__WEBPACK_IMPORTED_MODULE_1__["default"].isResponse(message)) {
      console.error('A message not following a response format will be ignored:', message)
      return
    }

    if (!this._messages.has(message.requestID)) {
      /*
      Silently ignore a message with request ID not registered in the map.
      It may be a message that is handled by the other messaging service.
      */
      return
    }
    const requestInfo = this._messages.get(message.requestID)
    clearTimeout(requestInfo.timeoutID) // Clear a timeout
    const responseCode = message.responseCode

    if (responseCode === _messServ_messages_response_message_js__WEBPACK_IMPORTED_MODULE_1__["default"].responseCodes.ERROR) {
      // The message returned an error. The message body may contain additional information about an error.
      requestInfo.reject(message)
    } else {
      // Request was processed without errors
      requestInfo.resolve(message)
    }
    this._messages.delete(message.requestID) // Remove request info from the map
  }

  /**
   * Registers an outgoing request within a request map. Returns a promise that will be fulfilled when
   * a response will be received or rejected when a timeout will expire.
   *
   * @param {RequestMessage} request - An outgoing request.
   * @param {number} timeout - A number of milliseconds we'll wait for response before rejecting a promise.
   * @returns {Promise} - A promise that will be resolved with the message response or rejected with an error info.
   */
  registerRequest (request, timeout = 10000) {
    if (this._messages.has(request.ID)) throw new Error(`Request with ${request.ID} ID is already registered`)
    let storedRequest = new _messServ_core_stored_request_js__WEBPACK_IMPORTED_MODULE_2__["default"](request)  
    this._messages.set(request.ID, storedRequest)
    storedRequest.timeoutID = setTimeout((requestID) => {
      storedRequest.reject(new Error(`Timeout has been expired for a message with request ID ${request.ID}`))
      this._messages.delete(requestID) // Remove request record from the map
    }, timeout)
    return storedRequest.promise
  }

  /**
   * Sends a request message to a specific destination.
   *
   * @param {string} destName - A name of a destination where request will be sent to.
   * @param {RequestMessage} request - A request message to be sent.
   * @param {number} timeout - How many milliseconds to wait for a response.
   * @returns {Promise<ResponseMessage> | Promise<Error> | Promise<object>} - A promise either resolved
   *          with response message or rejected with the error info.
   */
  sendRequestTo (destName, request, timeout = 10000) {
    if (!destName) {
      throw new Error('Destination name is not provided')
    }

    if (!this._destinations.has(destName)) {
      throw new Error(`Unknown destination ${destName}`)
    }

    try {
      this._destinations.get(destName).sendRequest(request)
    } catch (err) {
      throw new Error(`Request to ${destName} failed: ${err.message}`)
    }
    // Do not register request before we're sure that the message is sent successfully.
    return this.registerRequest(request, timeout)
  }
}

MessagingService.errMsgs = {
  NO_NAME: 'MessagingService must be created with a name'
}


/***/ }),

/***/ "./src/core/stored-request.js":
/*!************************************!*\
  !*** ./src/core/stored-request.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StoredRequest)
/* harmony export */ });
/**
 * @module StoredRequest
 */

/** Stores information about request being sent via the messaging service */
class StoredRequest {
  constructor () {
    /**
     * A function to resolve the request's promise.
     *
     * @type {Function}
     */
    this.resolve = null

    /**
     * A function to reject the request's promise.
     *
     * @type {Function}
     */
    this.reject = null

    // A promise that will be resolved or rejected when the response will arrive or the timeout will expire
    this.promise = new Promise(this.executor.bind(this))
  }

  executor (resolve, reject) {
    this.resolve = resolve
    this.reject = reject
  }
}


/***/ }),

/***/ "./src/destinations/destination.js":
/*!*****************************************!*\
  !*** ./src/destinations/destination.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Destination)
/* harmony export */ });
/**
 * @module Destination
 */

/** Destination represents a place where messages are sent to and are received from (e.g. a windows) */
class Destination {
  /**
   * Creates an instance of a Destination object. Descendants may take configuration parameters through
   * a second argument that they can define.
   *
   * @param {object} [configuration={}] - A configuration object for a destination.
   * @param {string} configuration.name - A name of a particular destination.
   * @param {string[]} configuration.commModes - A list of communication modes that should be enabled for
   *        a destination. A list of available modes is defined in Destination.commModes.
   *        Defaults to a SEND mode.
   */
  constructor ({ name, commModes = [Destination.commModes.SEND] } = {}) {
    if (!name) {
      throw new Error(Destination.errMsgs.NO_DESTINATION)
    }

    /**
     * A name of a destination. Used to refer to it within a messaging service.
     *
     * @type {string}
     * @public
     */
    this.name = name

    /**
     * An array of communication modes that are enabled for a destination.
     *
     * @type {string[]}
     * @public
     */
    this.commModes = commModes

    /**
     * A function that will be called when a response from destination is received.
     *
     * @type {Function}
     * @private
     */
    this._responseCallback = null
  }

  /**
   * Checks if a SEND communication mode is enabled for this destination.
   *
   * @returns {boolean} True if destination is in the SEND mode.
   */
  get ableToSend () {
    return this.commModes.includes(Destination.commModes.SEND)
  }

  /**
   * Checks if a RECEIVE communication mode is enabled for this destination.
   *
   * @returns {boolean} True if destination is in the RECEIVE mode.
   */
  get ableToReceive () {
    return this.commModes.includes(Destination.commModes.RECEIVE)
  }

  /**
   * This function will be called by the messaging service when a destination is deregistered or deleted.
   * It must do a cleanup necessary for a destination object. Its functionality should be defined within a subclass.
   */
  deregister () {
    throw new Error(Destination.errMsgs.DEREGISTER_NOT_DEFINED)
  }
}

/*
A list of communication modes that a destination can support.
 */
Destination.commModes = {
  /*
  If a SEND mode is enabled, this destination can send messages to other destinations of the same type.
   */
  SEND: 'Send',

  /*
  A RECEIVE mode enables destination to receive messages from other destinations of the same type.
   */
  RECEIVE: 'Receive'
}

Destination.errMsgs = {
  NO_DESTINATION: 'Destination name is missing',
  DEREGISTER_NOT_DEFINED: 'Deregister method must be defined in a subclass'
}


/***/ }),

/***/ "./src/destinations/window-iframe-destination.js":
/*!*******************************************************!*\
  !*** ./src/destinations/window-iframe-destination.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WindowIframeDestination)
/* harmony export */ });
/* harmony import */ var _messServ_messages_message_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @messServ/messages/message.js */ "./src/messages/message.js");
/* harmony import */ var _messServ_destinations_destination_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @messServ/destinations/destination.js */ "./src/destinations/destination.js");
/**
 * @module WindowIframeDestination
 */



/** WindowIframeDestination represents a content window within an iframe */
class WindowIframeDestination extends _messServ_destinations_destination_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   * @param {object} [configuration={}] - An object containing configuration parameters.
   * @param {string} configuration.name - A name of a destination (for addressing a destination in a messaging service).
   * @param {string[]} configuration.commModes - A list of communication modes that should be enabled for
   *        a destination. A list of available modes is defined in Destination.commModes.
   * @param {string} configuration.targetURL - A URL of a document within an iframe where messages will be sent.
   * @param {string} configuration.targetIframeID - An ID of an iframe element (without `#`).
   * @param {Function} configuration.receiverCB - A function that will be called when destination is in the
   *        RECEIVE mode and the incoming request has arrived. This function will receive two parameters:
   *        the message object and the function that will need to be called in order to send a response back.
   */
  constructor ({ name, commModes, targetURL, targetIframeID, receiverCB } = {}) {
    super({ name, commModes })
    /**
     * A URL of a document within an iframe where messages will be sent.
     *
     * @type {string | null}
     * @private
     */
    this._targetURL = null

    /**
     * An ID of an iframe element (without `#`).
     *
     * @type {string | null}
     * @private
     */
    this._targetIframeID = null

    // The following two props will keep track of request and response handlers registered for this destination.
    this._registeredRequestHandler = null
    this._registeredResponseHandler = null

    if (this.ableToSend) {
      if (!targetURL) {
        throw new Error(WindowIframeDestination.errMsgs.NO_TARGET_URL)
      }

      if (!targetIframeID) {
        throw new Error(WindowIframeDestination.errMsgs.NO_TARGET_IFRAME_ID)
      }

      this._targetURL = targetURL
      this._targetIframeID = targetIframeID
    }

    if (this.ableToReceive) {
      // Destination is initialized in the receive mode
      if (!receiverCB) {
        throw new Error(WindowIframeDestination.errMsgs.NO_RECEIVER_CB)
      }
      this._registeredRequestHandler = this._requestHandler.bind(this, receiverCB)
      window.addEventListener('message', this._registeredRequestHandler, false)
    }
  }

  /**
   * Registers a function to call when a response from destination is received.
   *
   * @param {Function} callbackFn - A function to be called when response is received.
   */
  registerResponseCallback (callbackFn) {
    this._registeredResponseHandler = this._responseHandler.bind(this)
    window.addEventListener('message', this._registeredResponseHandler, false)
    this._responseCallback = callbackFn
  }

  /**
   * A function that will be called to send a request from origin to destination.
   *
   * @param {RequestMessage} requestMessage - A request message object.
   */
  sendRequest (requestMessage) {
    const iframe = document.querySelector(`#${this._targetIframeID}`)
    if (!iframe) {
      throw new Error(`An #${this._targetIframeID} iframe does not exist in the document`)
    }
    const iframeWindow = iframe.contentWindow

    /*
    If we'll try to send a message to an iframe which content would not been loaded yet,
    `postMessage` will throw an error. It will be impossible, however, to catch this error here because `postMessage`
    executes asynchronously (please see https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage).
    Once the cross-origin iframe content became available, it will throw a DOM security exception
    if we try to access its `location` prop. We can use that to check whether an iframe content is loaded
    before trying to send a message to it.
     */
    let contentNotLoaded = false
    try {
      contentNotLoaded = iframeWindow.location.href === 'about:blank'
    } catch (err) {
      if (err instanceof DOMException) {
        // Do nothing. This error usually means that a cross-origin iframe content has become available.
      } else {
        // Re-throw an error
        throw err
      }
    }

    if (contentNotLoaded) {
      // If we can access a target iframe location and its URL is blank it means an iframe content is not loaded yet.
      throw new Error(`Target document ${this._targetURL} is not loaded yet`)
    }
    try {
      iframeWindow.postMessage(requestMessage, this._targetURL)
    } catch (err) {
      if (err instanceof DOMException && err.name === 'DataCloneError') {
        /*
        A message body does not confirm the structured clone algorithm and thus cannot be send via `postMessage`.
        See https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
        for more details.
        We'll try to convert it to a plain object.
         */
        console.warn('Request that does not confirm to the structured clone algorithm cannot be sent, ' +
          'will try to convert it to a plain object and send again')
        requestMessage.body = WindowIframeDestination._toPostable(requestMessage.body)
        // Try to resend a message
        iframeWindow.postMessage(requestMessage, this._targetURL)
      } else {
        // Some other error occurred, rethrow it
        throw err
      }
    }
  }

  /**
   * A function that is used to send a response from destination to origin.
   *
   * @param {ResponseMessage} responseMessage - A response message object.
   */
  sendResponse (responseMessage) {
    try {
      window.parent.postMessage(responseMessage, responseMessage.requestHeader.origin)
    } catch (err) {
      if (err instanceof DOMException && err.name === 'DataCloneError') {
        /*
        A message body does not confirm the structured clone algorithm and thus cannot be send via `postMessage`.
        See https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
        for more details.
        We'll try to convert it to a plain object.
         */
        console.warn('Response that does not confirm to the structured clone algorithm cannot be sent, ' +
                     'will try to convert it to a plain object and send again')
        responseMessage.body = WindowIframeDestination._toPostable(responseMessage.body)
        // Try to resend a message
        window.parent.postMessage(responseMessage, responseMessage.requestHeader.origin)
      } else {
        // Some other error occurred, rethrow it
        throw err
      }
    }
  }

  /**
   * An internal handler that is called when request arrives to its destination.
   *
   * @param {Function} callbackFn - A client's callback function that will be called and
   *                                passed a request (a `RequestMessage` object).
   * @param {Event} event - A browser's event object.
   * @private
   */
  _requestHandler (callbackFn, event) {
    // Check if an event contains a valid Alpheios message object.
    if (!WindowIframeDestination._isSupportedEvent(event)) { return }

    // `data` prop of an event contains a request message object
    let request = event.data  
    request.header.origin = event.origin
    callbackFn(request, this.sendResponse.bind(this))
  }

  /**
   * An internal handler that is called when response arrives from destination to origin.
   *
   * @param {Event} event - A browser's event object.
   * @private
   */
  _responseHandler (event) {
    // Check if an event contains a valid Alpheios message object.
    if (!WindowIframeDestination._isSupportedEvent(event)) { return }

    // `data` prop of an event contains a response message object
    const responseMessage = event.data
    if (this._responseCallback) {
      this._responseCallback(responseMessage)
    }
  }

  /**
   * Checks whether an event contains a well-formed Alpheios message object.
   *
   * @param {Event} event - An event that may contain a message object in a `data` field.
   * @returns {boolean} - True if an event contains a well-formed Alpheios message object, false otherwise.
   * @private
   */
  static _isSupportedEvent (event) {
    return Boolean(event && event.data && event.data.type && _messServ_messages_message_js__WEBPACK_IMPORTED_MODULE_0__["default"].isKnownType(event.data.type))
  }

  /**
   * This function will be called by the messaging service when destination is deregistered or deleted.
   * It must do a cleanup for a destination object.
   */
  deregister () {
    // Remove event listeners for registered request and response handlers
    if (this._registeredResponseHandler) {
      window.removeEventListener('message', this._registeredResponseHandler, false)
      this._registeredResponseHandler = null
    }
    if (!this._registeredRequestHandler) {
      window.removeEventListener('message', this._registeredRequestHandler, false)
      this._registeredRequestHandler = null
    }
  }

  /**
   * Converts an object to the one that is conforms the structured clone algorithm.
   * See https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
   * for more details.
   *
   * @param {object} message - An object to convert.
   * @returns {object} - An object that conforms to the structured clone algorithm.
   * @private
   */
  static _toPostable (message) {
    let postable
    if (message instanceof Error) {
      /*
      Due to the bug in FF, Errors cannot be sent via postMessage yet.
      Please see https://bugzilla.mozilla.org/show_bug.cgi?id=1556604 for more details.
      This code can be removed once the bug is fixed.
       */
      postable = {
        name: message.name,
        message: message.message
      }
    } else {
      postable = JSON.parse(JSON.stringify(message))
    }
    return postable
  }
}

WindowIframeDestination.errMsgs = {
  NO_TARGET_URL: 'Target URL is not provided',
  NO_TARGET_IFRAME_ID: 'Target iframe ID is not provided',
  NO_RECEIVER_CB: 'A receiver callback must be provided for a destination in the RECEIVE communication mode'
}


/***/ }),

/***/ "./src/messages/message.js":
/*!*********************************!*\
  !*** ./src/messages/message.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Message)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/**
 * @module Message
 */


/** A base class for all types of messages */
class Message {
  /**
   * @param {object} [body={}] - A plain JS object (with no methods) representing a body of the message.
   */
  constructor (body = {}) {
    /**
     * A message's role (@see {@link Message.roles}). Will be defined in descendants.
     *
     * @type {string | undefined}
     */
    this.role = undefined

    /**
     * A type of the message. Used to distinguish one kind of message from the other (@see {@link Message.types}).
     *
     * @type {string | undefined}
     */
    this.type = Message.types.GENERIC

    /**
     * A unique identifier of the message.
     *
     * @type {string}
     */
    this.ID = (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])()

    /**
     * An object with no methods representing a message body.
     *
     * @type {object}
     */
    this.body = body
  }

  static isKnownType (typeValue) {
    return Object.values(Message.types).includes(typeValue)
  }
}

/**
 * Specifies whether a message is request or response.
 */
Message.roles = {
  REQUEST: 'Request',
  RESPONSE: 'Response'
}

/**
 * Specifies a message type: what kind of message it is and what purpose it serves.
 * Message types are used to distinguish different types of messages from each other
 * and to distinguish Alpheios from non-Alpheios messages. All Alpheios messages
 * must start from an `ALPHEIOS_` prefix.
 */
Message.types = {
  GENERIC: 'ALPHEIOS_MESSAGE' // A generic message of general purpose
}


/***/ }),

/***/ "./src/messages/request-message.js":
/*!*****************************************!*\
  !*** ./src/messages/request-message.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RequestMessage)
/* harmony export */ });
/* harmony import */ var _messServ_messages_message_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @messServ/messages/message.js */ "./src/messages/message.js");
/**
 * @module RequestMessage
 */


/** A request message */
class RequestMessage extends _messServ_messages_message_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * @param {object} [body={}] - A plain JS object (with no methods) representing a body of the message.
   */
  constructor (body = {}) {
    super(body)
    this.role = _messServ_messages_message_js__WEBPACK_IMPORTED_MODULE_0__["default"].roles.REQUEST

    /**
     * A message header. Will contain routing information usually.
     *
     * @type {object}
     */
    this.header = {}
  }
}


/***/ }),

/***/ "./src/messages/response-message.js":
/*!******************************************!*\
  !*** ./src/messages/response-message.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResponseMessage)
/* harmony export */ });
/* harmony import */ var _messServ_messages_message_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @messServ/messages/message.js */ "./src/messages/message.js");
/* harmony import */ var _messServ_messages_request_message_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @messServ/messages/request-message.js */ "./src/messages/request-message.js");
/**
 * @module ResponseMessage
 */



/** A response message that is sent as an answer to the request message. */
class ResponseMessage extends _messServ_messages_message_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * @param {RequestMessage} request - A request that initiated this response. Used to copy routing information mostly.
   * @param {object} [body={}] - A body of the response, a plain JS object with no methods.
   * @param {string} responseCode - A code to indicate results of the request handling: Success, Failure, etc.
   * @param {object} options - Additional non-obligatory parameters:
   * @param {number} options.errorCode - An error code indicating why request has failed.
   */
  constructor (request, body = {}, responseCode = ResponseMessage.responseCodes.UNDEFINED, { errorCode } = {}) {
    super(body)
    if (!request) throw new Error('Request is not provided')
    if (!request.ID) throw new Error('Request has no ID')
    this.role = _messServ_messages_message_js__WEBPACK_IMPORTED_MODULE_0__["default"].roles.RESPONSE
    this.requestHeader = request.header || {}
    this.requestID = request.ID // ID of the request to match request and response
    this.responseCode = responseCode

    /**
     * If request failed this prop will contain an error code indicating the reason of the failure.
     *
     * @type {number}
     */
    this.errorCode = 0

    if (responseCode === ResponseMessage.responseCodes.ERROR) {
      // Request has failed. An error code must be provided.
      if (!errorCode) {
        throw new Error('An error code must be provided for failed requests')
      }
      this.errorCode = errorCode
    }
  }

  /**
   * A builder for a response message with a SUCCESS response code.
   *
   * @param {RequestMessage} request - An original request.
   * @param {object} [body={}] - A body of response message.
   * @returns {ResponseMessage} - A newly created response message with the SUCCESS return code.
   * @class
   */
  static Success (request, body = {}) {
    return new this(request, body, ResponseMessage.responseCodes.SUCCESS)
  }

  /**
   * A builder for a message with an ERROR response code. Error information will be sent within the message body.
   *
   * @param {RequestMessage} request - An original request.
   * @param {Error} error - An error object containing error information.
   * @param {number} errorCode - An error code indicating why a request failed.
   * @returns {ResponseMessage} - A newly created response message with the SUCCESS return code.
   * @class
   */
  static Error (request, error, errorCode) {
    return new this(request, error, ResponseMessage.responseCodes.ERROR, { errorCode })
  }

  /**
   * Checks if this message is a response (i.e. if it follows a response message format and conventions).
   *
   * @param {RequestMessage | ResponseMessage} message - A request or response message to be tested.
   * @returns {boolean} - True if the message is a response, false otherwise.
   */
  static isResponse (message) {
    return message.role &&
      message.role === _messServ_messages_message_js__WEBPACK_IMPORTED_MODULE_0__["default"].roles.RESPONSE &&
      message.requestHeader &&
      message.requestID
  }
}

/**
 * Specifies whether a request was processed successfully or not.
 */
ResponseMessage.responseCodes = {
  // Request was processed successfully.
  // In this case a message body may contain a response data object or be empty.
  SUCCESS: 'Success',

  // There is no information about what was the outcome of a request.
  UNDEFINED: 'Undefined',

  // Request failed. A message will contain information about an error.
  ERROR: 'Error'
}

/**
 * If request failed, the error code will be used to indicate the reason of a failure.
 */
ResponseMessage.errorCodes = {
  // A remote service has not been initialized yet
  SERVICE_UNINITIALIZED: 1,
  // An error occurred during initialization of a remote service
  INITIALIZATION_ERROR: 2,
  // Request of unknown type is received by a remote service
  UNKNOWN_REQUEST: 3,
  // An unspecified error has occurred inside a remote service
  INTERNAL_ERROR: 4
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CedictDestinationConfig: () => (/* reexport safe */ _messServ_configurations_destinations_js__WEBPACK_IMPORTED_MODULE_4__.CedictDestinationConfig),
/* harmony export */   CedictDestinationDevConfig: () => (/* reexport safe */ _messServ_configurations_destinations_js__WEBPACK_IMPORTED_MODULE_4__.CedictDestinationDevConfig),
/* harmony export */   MessagingService: () => (/* reexport safe */ _messServ_core_messaging_service_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   RequestMessage: () => (/* reexport safe */ _messServ_messages_request_message_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   ResponseMessage: () => (/* reexport safe */ _messServ_messages_response_message_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   WindowIframeDestination: () => (/* reexport safe */ _messServ_destinations_window_iframe_destination_js__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _messServ_core_messaging_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @messServ/core/messaging-service.js */ "./src/core/messaging-service.js");
/* harmony import */ var _messServ_destinations_window_iframe_destination_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @messServ/destinations/window-iframe-destination.js */ "./src/destinations/window-iframe-destination.js");
/* harmony import */ var _messServ_messages_request_message_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @messServ/messages/request-message.js */ "./src/messages/request-message.js");
/* harmony import */ var _messServ_messages_response_message_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @messServ/messages/response-message.js */ "./src/messages/response-message.js");
/* harmony import */ var _messServ_configurations_destinations_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @messServ/configurations/destinations.js */ "./src/configurations/destinations.js");








})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=alpheios-messaging.js.map