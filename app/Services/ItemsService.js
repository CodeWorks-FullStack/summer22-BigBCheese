import { ProxyState } from "../AppState.js";
import { Item } from "../Models/Item.js";




class ItemsService{
  deleteItem(id) {
    console.log('deleteing', id);
    ProxyState.items = ProxyState.items.filter(item => item.id != id)
  }

  createItem(newItem){
    console.log('creating item in service', newItem);
    ProxyState.items = [...ProxyState.items, new Item(newItem)]
    console.log(ProxyState.items);
  }

}

export const itemsService = new ItemsService()