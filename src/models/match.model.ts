export class Match {
    
    name: string;
    date;
    local: string;
    numOfPlayers: number;
    currentNumOfPlayers: number;

    constructor(name : string,date ,local : string, numOfPlayers : number){
        this.name = name;
        this.date = date;
        this.local = local;
        this.numOfPlayers = numOfPlayers;
        this.currentNumOfPlayers = Math.floor(Math.random() * (numOfPlayers - 0 + 1)) + 0;
    }

    public getDate(){
        return this.date;
    }
}