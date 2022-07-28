import { ProxyState } from "../AppState.js"
import { generateId } from "../Utils/generateId.js"



export class Party{
  constructor(data){
    // NOTE the || will try to use an id if one is present on 'data' but will generate one if there is not
    this.id = data.id || generateId()
    this.name = data.name,
    this.date = new Date(data.date),
    this.size = data.size,
    this.accommodations = data.accommodations,
    this.bringTheRat = data.bringTheRat
  }
  // constructor({name, date, size ,accommodations, bringTheRat}){
  //   this.name = name,
  //   this.date = date,
  //   this.size = size,
  //   this.accommodations = accommodations,
  //   this.bringTheRate = bringTheRat
  // }

  get Template(){
    return `
      <div class="col-12 px-4 mt-2">
        <div class="bg-white elevation-2 rounded">
          <section class="d-flex justify-content-between px-4 py-2 bg-warning rounded-top">
            <h3>${this.name}</h3>
            <h4>${this.date.toLocaleDateString('en-US')}</h4>
            <h4><i class="mdi mdi-account-group"></i>${this.size}</h4>
            <i class="mdi mdi-delete text-danger p-2 selectable" onclick="app.partiesController.deleteParty('${this.id}')"></i>
          </section>
          <section class="row px-4 py-2">
           
            ${this.Items}

          </section>
          <form class="row px-4 py-2" onsubmit="app.itemsController.createItem('${this.id}')">
          <div class="col-2 p-1">
          <select class="form-control" name="type" id="type" required>
                      <option value="👥">👥 staff</option>
                      <option value="🍕">🍕 food</option>
                      <option value="🎈">🎈 misc</option>
                    </select>
          </div>
          <div class="col-5 p-1">
          <input class="form-control" type="text" name="body" id="body">
          </div>
          <div class="col-3 p-1">
          <input class="form-control" type="number" name="price" , id="price">
          </div>
          <button class="col-2  btn btn-primary">+</button>
        </form>
          <section class="row px-4 py-2">
          <label class="form-label fw-bold">Custom Accommodations</label>
            <textarea rows="3" class="form-control" onblur="app.partiesController.editParty('${this.id}')">${this.accommodations}</textarea>
          </section>
          <section class="row px-3">
          <div class="col-12 text-end fw-bold">
          Party Total: $${this.PartyTotal}
          </div>
          </section>
        </div>
      </div>
    `
  }

  get Items(){
    let template = ''
    // NOTE only get items that exist for this party, by matching the items partyId to this party's id
    let items = ProxyState.items.filter(item => item.partyId == this.id)
    items.forEach(item => template += item.Template)
    if(template){
      return template
    } else {
      return '<p> no items yet </p>'
    }
  }

  get PartyTotal(){
    let total = 0
    let items = ProxyState.items.filter(item => item.partyId == this.id)
    items.forEach(item => total += item.price)
    return total
  }
}