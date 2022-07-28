import { ProxyState } from "../AppState.js";
import { partiesService } from "../Services/PartiesService.js";
import { loadState, saveState } from "../Utils/LocalStorage.js";
import { Pop } from "../Utils/Pop.js";


function _draw(){
  let template = ''
  let parties = ProxyState.parties.sort((a, b) => a.date - b.date)
  console.log(parties);
  parties.forEach(p => template += p.Template)
  // console.log(template);
  document.getElementById('parties').innerHTML = template
}


export class PartiesController{
  constructor(){
    console.log('party controller loaded');
    // NOTE register the listener on parties, so when parties changes '_draw' will happen
    ProxyState.on('parties', _draw)
    ProxyState.on('items', _draw)
    ProxyState.on('parties', saveState)
    ProxyState.on('items', saveState)
    // NOTE on load methods to run
    loadState()
    _draw()
  }

  createParty(){
    window.event.preventDefault()
    console.log('creating party');
    let form = window.event.target
    let newParty = {
      name: form.name.value,
      // NOTE good practice to turn string number from form back to number
      size: parseInt(form.size.value),
      date: form.date.value,
      // NOTE for checkboxes, we don't want value
      bringTheRat: form.bringTheRat.checked,
      accommodations: form.accommodations.value
    }
    console.log(newParty);
    partiesService.createParty(newParty)
    Pop.toast('Party Created', 'success')


    // don't forget to clear form
  }

// NOTE async makes the code run asynchronously 
// NOTE await tells the code to pause until confirm comes back with a result
  async deleteParty(id){
    if(await Pop.confirm()){
      console.log('deleting party', id);
      partiesService.deleteParty(id)
    }
  }


  editParty(id){
    console.log('editing', id);
    console.log(window.event.target.value)
    let newText = window.event.target.value
    partiesService.editParty(id, newText)
  }
}