/**
 * @module WindowIframeDestination
 */
import Destination from '@messServ/destinations/destination.js'

/** WindowIframeDestination represents a content window within an iframe */
export default class WindowIframeDestination extends Destination {
  /**
   * @param {object} [configuration={}] - An object containing configuration parameters.
   * @param {string} configuration.name - A name of a destination (for addressing a destination in a messaging service).
   * @param {string} configuration.targetURL - A URL of a document within an iframe where messages will be sent.
   * @param {string} configuration.targetIframeID - An ID of an iframe element (without `#`).
   * @param {string[]} configuration.commModes - A list of communication modes that should be enabled for
   *        a destination. A list of available modes is defined in Destination.commModes.
   * @param {Function} configuration.receiverCB - A function that will be called when destination is in the
   *        RECEIVE mode and the incoming request has arrived. This function will receive two parameters:
   *        the message object and the function that will need to be called in order to send a response back.
   */
  constructor ({ name, targetURL, targetIframeID, commModes, receiverCB } = {}) {
    super({ name, commModes })

    if (!targetURL) {
      throw new Error('Target URL is not provided')
    }

    if (!targetIframeID) {
      throw new Error('Target iframe ID is not provided')
    }

    /**
     * A URL of a document within an iframe where messages will be sent.
     *
     * @type {string}
     * @private
     */
    this._targetURL = targetURL

    /**
     * An ID of an iframe element (without `#`).
     *
     * @type {string}
     * @private
     */
    this._targetIframeID = targetIframeID

    if (this.ableToReceive) {
      // Destination is initialized in the receive mode
      if (!receiverCB) {
        throw new Error('A receiver callback must be provided for a destination in the RECEIVE communication mode')
      }
      this._registeredRequestHandler = this._requestHandler.bind(this, receiverCB)
      window.addEventListener('message', this._registeredRequestHandler, false)
    }

    // The following two props will keep track of request and response handlers registered for this destination.
    this._registeredRequestHandler = null
    this._registeredResponseHandler = null
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
    iframeWindow.postMessage(requestMessage, this._targetURL)
  }

  /**
   * A function that is used to send a response from destination to origin.
   *
   * @param {ResponseMessage} responseMessage - A response message object.
   */
  sendResponse (responseMessage) {
    window.parent.postMessage(responseMessage, responseMessage.requestHeader.origin)
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
    // `data` prop of an event contains a request message object
    let request = event.data // eslint-disable-line prefer-const
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
    if (!event.data || !event.data.type) {
      /*
      Event does not have a data prop that contains a message object. We cannot handle such events and will ignore theml
      */
      return
    }

    // `data` prop of an event contains a response message object
    const responseMessage = event.data
    if (this._responseCallback) {
      this._responseCallback(responseMessage)
    }
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
}
