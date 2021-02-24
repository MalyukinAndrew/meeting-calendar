import { userRoles } from "../constants"

export class User {
    constructor(name){
        this.name = name
        this.role = userRoles.user
    }
}

export class Admin extends User{
    constructor(name){
        super(name)
        this.role = userRoles.admin
    }
}
