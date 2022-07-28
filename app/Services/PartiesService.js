import { ProxyState } from "../AppState.js";
import { Party } from "../Models/Party.js";



class PartiesService{

  createParty(newParty){
    console.log('creating party in service', newParty);
    ProxyState.parties = [...ProxyState.parties, new Party(newParty)]
    console.log(ProxyState.parties);
  }

  deleteParty(id){
    console.log('delete P in service', id);
    ProxyState.parties = ProxyState.parties.filter(p => p.id != id)
  }

  editParty(id, newText){
    // NOTE find party to edit by id
    let party = ProxyState.parties.find(p => p.id == id)
    // NOTE change property to the new info also being passed
    party.accommodations = newText
    // NOTE trick the proxy state party listeners to run saving and drawing the new info
    ProxyState.parties = ProxyState.parties
    console.log(ProxyState.parties);
  }

}

export const partiesService = new PartiesService()