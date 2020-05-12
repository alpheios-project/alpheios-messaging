# Alpheios Messaging
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.org/alpheios-project/alpheios-core.svg?branch=master)](https://travis-ci.org/alpheios-project/alpheios-messaging)
[![Coverage Status](https://coveralls.io/repos/github/alpheios-project/alpheios-core/badge.svg?branch=master)](https://coveralls.io/github/alpheios-project/alpheios-messaging?branch=master)

Alpheios messaging is a messaging service component for Alpheios Tools.

## Service Overview
A messaging service uses destination objects to encapsulate knowledge about where and how messages are sent and received. Destination can have `SEND` and `RECEIVE` modes. A mode must be specified upon a creation of a destination object. A destination can be registered with both SEND and RECEIVE modes, but usually there is no need for that. In most cases, destination is in either `SEND` or `RECEIVE` mode.

`Destination` is a base class for all destinations. Because of this, `Destination` objects should never be instantiated directly; it's child classes that must be used to create specific destination object instances instead.

Depending on a mode, there could be some other obligatory parameters of a destination's constructor. Those are dependent on a destination type (i.e. what destination subclass is used) and on the mode of a destination. Each instance of a destination object must have a unique name by which a destination will be addressed within a messaging service.

Once created, destination needs to be registered with a messaging service. This can be done when a messaging service is just created:
```
// Initialize WindowIframeDestionation in a SEND mode
const destination = new WindowIframeDestionation({ 
    name: 'destName', // A name of a destination
    commModes: [Destination.commModes.SEND], // A communication mode
    targetURL: 'https://target.com', A URL of a document within an iframe
    targetIframeID: '#iframe-id' // An ID of an iframe where a target document is loaded
})

// Create an instance of a messaging service and register a destination
const msgService = new MessagingService('serviceName', [destination])
```
A destination can also be registered with an existing messaging service:
```
// Create an instance of a messaging service with no destinations registered
const msgService = new MessagingService('serviceName')
// Initialize WindowIframeDestionation in a RECIEVE mode, it has a different set of parameters from a SEND mode
const destination = new WindowIframeDestionation({ 
    name: 'destName', // A name of a destination
    commModes: [Destination.commModes.RECEIVE], // A communication mode
    receiverCB: (request, respCB) => {}  A function to be called when a request is received
})
msgService.registerDestination(destination)
```

Once a destination that is in a `SEND` mode is registered with a messaging service, it can be used to send messages:
```
msgService.sendRequestTo('destName', new RequestMessage({}))
``` 

Destination in a `RECEIVE` mode registers a callback that will have two data pieces passed into it: a request object and a function for sending a response. A callback that was registered will be called every time a new request comes in:
```
// Define a receiver callback function
const receiverCB = (request, responseFn) => {
  // Handle a request
  const data = request.body
  // Send a response back using a function provided by the messaging service
  responseFn(new ResponseMessage({ responseData })
}

// Initialize WindowIframeDestionation in a RECEIVE mode
const destination = new WindowIframeDestionation({ 
    name: 'destName',
    commModes: [Destination.commModes.RECEIVE],
    receiverCB: receiverCB
})

// Create an instance of a messaging service and register a destination
const msgService = new MessagingService('serviceName', [destination])

// Now, once a request comes in, a receiverCB() function will be called
```

## Messages

There are two type of messages: `RequestMessage` and `ResponsMessage`. They are for sending requests and responses.
Their base class, `Message`, should not be instantiated directly.

Each message consists of a header and a body. A header carries service information and helps to match request and response. A message body transfers a payload that should be passed to destination. A header is usually not manipulated directly. Values of its fields are usually set in a constructor.

This is how a creation of a `RequestMessage` looks like:
```
const payload = {
    fieldOne: 'fieldOneValue',
    fieldTwo: 'fieldTwoValue'
}

const requestMsg = new RequestMessage(payload) // payload object will be used as a message body

// A receiving side can access payload values as requestMsg.body.fieldOne, requestMsg.body.fieldTwo
```
It takes a request message to create a response. Messaging service uses message IDs to match request and response, and it uses a request data for that. A request data is stored in a header of a response message:
```
const responseData = {
    responseData: '...'
}

const responseMsg = new ResponseMessage(requestMsg, responseData, ResponseMessage.responseCodes.UNDEFINED) 
```
ResponseMessage also contains a response code (`SUCCESS`, `ERROR`, `UNDEFINED`) that indicates what was the request's outcome. If request resulted in an error, a response message may also include an error code and an error object:
```
const responseMsg = new ResponseMessage(
    requestMsg, 
    new Error('Service has not been initialized yet'), 
    ResponseMessage.responseCodes.ERROR, 
    { errorCode: ResponseMessage.errorCodes.SERVICE_UNAVAILABLE }
) 
```
It can be convenient to use builder functions to create response messages:
```
// A builder of an error response
const errResonse = ResponseMessage.Error(
    requestMsg, 
    new Error('Service has not been initialized yet'), 
    ResponseMessage.errorCodes.SERVICE_UNAVAILABLE
)

// A builder of a response to a successful request
const okResponse = ResponseMessage.Success(requestMsg, { responseData })
```

## A Messaging Service
If a messaging service needs to be a Singleton (only single instance of a messaging service with a unique name must exist), we can use a `createService` helper:
`const msgService = MessagingService.createService('serviceName', [destination])`.
We can check if a service with a given name exists:
`const exists = MessagingSercie.hasService('serviceName')`,
and we can retrieve an instance of a service with a given name:
`const msgService = MessagingSercie.getService('serviceName')`