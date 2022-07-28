import { Item } from "./Models/Item.js"
import { Party } from "./Models/Party.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

class AppState extends EventEmitter {
  /** @type {import('./Models/Value').Value[]} */
  values = []


  /** @type {import('./Models/Party').Party[]} */
  parties = [
    new Party({
      name: 'Wade\'s awesome Birthday party',
      date: '03-12-2022',
      size: 12,
      accommodations: 'This better be special.',
      bringTheRat: true,
    })
  ]
  
    /** @type {import('./Models/Item').Item[]} */
  items = [
    new Item({
      type: 'staff',
      body: 'Stefinity',
      price: 30,
      partyId: '62e2cdf8de3691bbde7e24b7'
    })
  ]
}

export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
