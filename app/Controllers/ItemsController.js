import { itemsService } from "../Services/ItemsService.js";

// NOTE items don't draw items, parties draw items

export class ItemsController{
  constructor(){
    console.log('items controller loaded');
  }

  createItem(partyId){
    window.event.preventDefault()
    console.log('creating an item for party', partyId);
    let form = window.event.target
    let newItem = {
      type: form.type.value,
      body: form.body.value,
      price: parseInt(form.price.value),
      partyId: partyId
    }
    console.log(newItem);
    itemsService.createItem(newItem)
  }

  deleteItem(id){
    if(window.confirm()){
      itemsService.deleteItem(id)
    }
  }
}