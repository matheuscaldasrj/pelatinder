export class User {
    
    name: string;
    email: string;
    photo: string;
    uid: string;
    matches: string[];


    constructor(name? : string, email? : string, photo? : string, uid ? : string, matches ?: string[] ){
        this.name = name;
        this.email = email;
        this.photo = photo;
        this.uid = uid;
        this.matches = matches;
      
    }

}