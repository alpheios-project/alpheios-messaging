/* eslint-env jest */
import Message from '@messServ/messages/message.js'
import Destination from '@messServ/destinations/destination.js'
import WindowIframeDestination from '@messServ/destinations/window-iframe-destination.js'

describe('WindowIframeDestination class', () => {
  const configuration = {
    name: 'Destination name',
    targetURL: 'Target URL',
    targetIframeID: 'Target iframe ID'
  }

  it('Constructor: shall create an object in a default (SEND) mode', () => {
    const destination = new WindowIframeDestination(configuration)
    expect(destination).toMatchObject({
      name: configuration.name,
      _targetURL: configuration.targetURL,
      _targetIframeID: configuration.targetIframeID
    })
  })

  it('Constructor: shall create an object in a RECEIVE mode', () => {
    const configuration = {
      name: 'Destination name',
      targetURL: 'Target URL',
      targetIframeID: 'Target iframe ID',
      commModes: [Destination.commModes.RECEIVE],
      receiverCB: () => {}
    }
    const destination = new WindowIframeDestination(configuration)
    expect(destination.name).toBe(configuration.name)
  })

  it('Constructor: name must be provided', () => {
    const configuration = {
      targetURL: 'Target URL',
      targetIframeID: 'Target iframe ID'
    }
    expect(() => new WindowIframeDestination(configuration)).toThrowError('Destination name is missing')
  })

  it('Constructor: targetURL must be provided', () => {
    const configuration = {
      name: 'Destination name',
      targetIframeID: 'Target iframe ID'
    }
    expect(() => new WindowIframeDestination(configuration)).toThrowError('Target URL is not provided')
  })

  it('Constructor: target iframe ID must be provided', () => {
    const configuration = {
      name: 'Destination name',
      targetURL: 'Target URL'
    }
    expect(() => new WindowIframeDestination(configuration)).toThrowError('Target iframe ID is not provided')
  })

  it('Constructor: receiver callback must be provided when in RECEIVE mode', () => {
    const configuration = {
      name: 'Destination name',
      targetURL: 'Target URL',
      targetIframeID: 'Target iframe ID',
      commModes: [Destination.commModes.RECEIVE]
    }
    expect(() => new WindowIframeDestination(configuration)).toThrowError('A receiver callback must be provided for a destination in the RECEIVE communication mode')
  })

  it('registerResponseCallback: assign a callback function', () => {
    const callbackFn = jest.fn()
    const destination = new WindowIframeDestination(configuration)
    destination.registerResponseCallback(callbackFn)
    expect(destination._responseCallback).toBe(callbackFn)
  })

  it('_isSupportedEvent: fails if no event object is provided', () => {
    const event = undefined
    expect(WindowIframeDestination._isSupportedEvent(event)).toBeFalsy()
  })

  it('_isSupportedEvent: fails if an event object with no data is provided', () => {
    const event = {}
    expect(WindowIframeDestination._isSupportedEvent(event)).toBeFalsy()
  })

  it("_isSupportedEvent: fails if an event object's data is not an Alpheios message", () => {
    const event = {
      data: {}
    }
    expect(WindowIframeDestination._isSupportedEvent(event)).toBeFalsy()
  })

  it("_isSupportedEvent: succeeds if an event object's data is an Alpheios message", () => {
    const event = {
      data: new Message()
    }
    expect(WindowIframeDestination._isSupportedEvent(event)).toBeTruthy()
  })
})
