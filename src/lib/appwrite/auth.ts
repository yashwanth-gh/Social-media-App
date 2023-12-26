//^ ---- This way of creating authentication is platform(like appwrite,firebase) independent
//^ -- by creating class and creating objects you are not exposing how everything works in behind
//? -- refer this article (it is built using this article ) LINK:(  https://appwrite.io/docs/references/cloud/client-web/account  )


import { INewUser } from "@/types";
import { conf, conf as config } from "../../conf/conf";
import { ID, Client, Account, Avatars, Databases } from 'appwrite';
import { Url } from "url";


//^ ------------------------------------------Creating a new Class-----------------------------------------

export class AuthService {
    client = new Client();
    account;
    avatars;
    databases;
    //^ --this is a essential step while creating Auth serices using appwrite

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client)
        this.databases = new Databases(this.client);
        this.avatars = new Avatars(this.client);
    }

    //* -----------------------------------------------------------------------------

    //* --method to create new account

    async createAccount(user: INewUser) {
        try {
            const userAccount = await this.account.create(ID.unique(), user.email, user.password, user.name)
            if (userAccount) {
                //*& here after signUp we can directly login the user instead of telling them login again
                // return this.login(user);

                const avatarUrl = this.avatars.getInitials(user.name);

                //& saving this user to database collection-"Users" in appwrite
                const newUser = await this.saveUserToDatabase({
                    accountId: userAccount.$id,
                    name: userAccount.name,
                    email: userAccount.email,
                    username: user.username,
                    imageUrl: avatarUrl,
                });

                return newUser;
            } else {
                throw Error;
            }
        } catch (error) {
            console.log("Appwrite Auth :: createAccount :: Error ", error);
            //FIXME: i think error should be returned here. fix this if there is problem in future
        }
    }
    //* -----------------------------------------------------------------------------
    async saveUserToDatabase(user: {
        accountId: string,
        name: string,
        email: string,
        username: string,
        imageUrl: URL,
    }) {
        try {
            const newUser = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUserCollectionId,
                ID.unique(),
                user,
            )

            if (!newUser) throw Error;

            return newUser;
        } catch (error) {
            console.log("Appwrite Auth ::  saveUserToDatabase :: Error", error);
        }
    }
    //* -----------------------------------------------------------------------------

    //* --method to login into existing account

    async login(user) {
        try {
            return await this.account.createEmailSession(user.email, user.password)
        } catch (error) {
            console.log("Appwrite Auth :: login :: Error ", error);
        }
    }
    //* -----------------------------------------------------------------------------

    //* -----------------------------------------------------------------------------

    //* --method to check if the account exist if user is in home page of website

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite Auth :: getCurrentUser :: Error ", error);
        }
        return null;
    }
    //* -----------------------------------------------------------------------------

    //* -----------------------------------------------------------------------------

    //* --method to logout of existing account

    async logout({ }) {
        try {
            //^ for logout of just current device use [ this.account.deleteSession('current'); ]
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite Auth :: logout :: Error ", error);
        }
    }
};
//^ ----------------------------------------------------------------------------


//^ --Creating an object where all authentication happens :-
const authService = new AuthService();


//^ --Exporting object :-
export default authService;