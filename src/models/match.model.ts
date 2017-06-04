export class Match {
    
    name: string;
    date: Date;
    local: string;
    numOfPlayers: number;

    constructor(name : string,date: Date,local : string,numOfPlayers : number){
        this.name = name;
        this.date = date;
        this.local = local;
        this.numOfPlayers = numOfPlayers;    
    }
}