import { UserModel as User } from "../models/user.model.js"

export default class UserManager {
    createUser = async (userPar) => {
        try {
            let user = await User.create(userPar)
            return {
                success: user ? user : false
            }
        } catch (error) {
            throw error
        }

    }
    findeUserByEmail = async (email) => {
        try {
            let user = await User.findOne({ email: email })
           
            return {
                success: user ? user : false
            }
        } catch (error) {
            throw error
        }

    }
}