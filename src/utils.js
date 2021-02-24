import {userRoles} from "./constants"
import {Admin, User} from "./users/users"

export function createUserClass(user) {
    if (user.role === userRoles.admin) {
        return new Admin(user.name)
    }
    return new User(user.name)
}