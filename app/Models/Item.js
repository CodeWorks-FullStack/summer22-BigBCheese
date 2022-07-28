import { generateId } from "../Utils/generateId.js"



export class Item{
  constructor(data){
    this.id = data.id || generateId()
    this.type = data.type,
    this.body = data.body,
    this.price = data.price,
    // NOTE this partyId ties it to the party
    this.partyId = data.partyId
  }

  get Template(){
    return `
  <div class="col-12 d-flex justify-content-between">
    <p>${this.type}</p>
    <p class="w-50">${this.body}</p>
    <p>$${this.price}</p>
    <i class="mdi mdi-delete-forever selectable px-2" onclick="app.itemsController.deleteItem('${this.id}')"></i>
  </div>
    `
  }
}