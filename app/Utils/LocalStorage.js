import { ProxyState } from "../AppState.js";
import { Item } from "../Models/Item.js";
import { Party } from "../Models/Party.js";




export function saveState(){
  console.log('saving');
  let data = {
    items : ProxyState.items,
    parties: ProxyState.parties
  }
  localStorage.setItem('big-cheese', JSON.stringify(data))

}

export function loadState(){
  console.log('loading');
  
  let rawData = localStorage.getItem('big-cheese')
  if(rawData){
    let data = JSON.parse(rawData)
    ProxyState.parties = data.parties.map(p => new Party(p))
    ProxyState.items = data.items.map(item => new Item(item))
  }
  


}