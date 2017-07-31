import {User} from './user.model'

export class Match {
    
    $key: string;
    name: string;
    date;
    local: string;
    numOfPlayers: number;
    currentNumOfPlayers: number;
    createdBy: string;
    members: User[];
    

    constructor(name : string, date ,local : string, numOfPlayers : number, createdBy: string){
        this.name = name;
        this.date = date;
        this.local = local;
        this.numOfPlayers = numOfPlayers;
        this.currentNumOfPlayers = Math.floor(Math.random() * (numOfPlayers - 0 + 1)) + 0;
        this.createdBy = createdBy;
    }
    public getDate(){
        return this.date;
    }
}