

import { Pelada } from './../models/pelada.model'

export class FireBase{

    getNextMatches(){
        let pelada1 = new Pelada();
        pelada1.date = "24/02/2017"
        pelada1.name = "Macacos"

        let pelada2 = new Pelada();
        pelada2.date = "02/04/2017"
        pelada2.name = "Federal"
        
        let pelada3 = new Pelada();
        pelada3.date = "07/05/2017"
        pelada3.name = "Jockey"
        
        let nextMatches = new Array();
        nextMatches.push(pelada1);
        nextMatches.push(pelada2);
        nextMatches.push(pelada3);
        console.log(nextMatches);
        return nextMatches;
    }

    constructor(){

    }
}