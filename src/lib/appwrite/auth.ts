//^ ---- This way of creating authentication is platform(like appwrite,firebase) independent
//^ -- by creating class and creating objects you are not exposing how everything works in behind
//? -- refer this article (it is built using this article ) LINK:(  https://appwrite.io/docs/references/cloud/client-web/account  )


import { INewPost, INewUser } from "@/types";
import { conf, conf as config } from "../../conf/conf";
import { ID, Client, Account, Avatars, Databases, Query, Storage } from 'appwrite';
// import { Url } from "url";


//^ ------------------------------------------Creating a new Class-----------------------------------------

export class AuthService {
    client = new Client();
    account;
    avatars;
    databases;
    storage;
    //^ --this is a essential step while creating Auth serices using appwrite

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client)
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
        this.avatars = new Avatars(this.client);
    }

    //* -----------------------------------------------------------------------------


    async createAccount(user: INewUser) {
        //* --method to create new account
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


    async login(user: { email: string, password: string }) {
        //* --method to login into existing account
        try {
            const session = await this.account.createEmailSession(user.email, user.password)
            return session;
        } catch (error) {
            console.log("Appwrite Auth :: login :: Error ", error);
        }
    }
    //* -----------------------------------------------------------------------------

    //* -----------------------------------------------------------------------------


    async getCurrentUser() {
        //* --method to check if the account exist if user is in home page of website
        try {
            //* account.get will return you  : User(which has property called $id)
            const currentAccount = await this.account.get();
            // console.log("currentAccount ", currentAccount);
            if (!currentAccount) throw Error;
            const currentUser = await this.listUserDocumect(currentAccount);
            // console.log(currentUser)
            return currentUser?.documents[0];
        } catch (error) {
            console.log("Appwrite Auth :: getCurrentUser :: Error ", error);
            return null;
        }
    }
    //* -----------------------------------------------------------------------------

    async listUserDocumect(currentAccount: { $id: string }) {
        try {
            const currentUser = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteUserCollectionId,
                [Query.equal("accountId", currentAccount.$id)]
            );
            if (!currentUser) throw Error;

            return currentUser;
        } catch (error) {
            console.log("Appwrite Auth :: listUserDocument :: Error ", error)
        }
    }
    //* -----------------------------------------------------------------------------


    async logout() {
        //* --method to logout of existing account
        try {
            //^ for logout of just current device use [ this.account.deleteSession('current'); ]
            //^ for logout of just all devices use [ this.account.deleteSessions(); ]
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite Auth :: logout :: Error ", error);
        }
    }

    async createPost(post: INewPost) {
        //~ Upload image received to storage i.e.bucket
        const uploadedFile = await this.uploadFile(post.file[0]);
        // console.log(uploadedFile);
        if (!uploadedFile) throw Error;

        //~ get file URL
        //! this getFilePreview returns promise if that is resolved then get href
        //* i learnt this by console loging fileUrl and then figured it out
        const fileUrl = await this.getFilePreview(uploadedFile.$id)
            .then(res => res?.href)
        // console.log(fileUrl);

        if (!fileUrl) {
            //may be file is corrupted so delete it 
            await this.deleteFile(uploadedFile.$id);
            throw Error;
        }

        //Convert the tags to array
        const tags = post.tags?.replace(/ /g, '').split(",") || [];

        const newPost = await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwritePostCollectionId,
            ID.unique(),
            {
                creator: post.userId,
                caption: post.caption,
                imageUrl: fileUrl,
                imageId: uploadedFile.$id,
                location: post.location,
                tags: tags,
            }
        )

        if (!newPost) {
            await this.deleteFile(uploadedFile.$id);
            throw Error;
        }

        return newPost;
    }

    async uploadFile(file: File) {
        try {
            const uploadedFile = await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
            return uploadedFile;

        } catch (error) {
            console.log("Appwrite Auth :: uploadFile :: Error ", error)
        }
    }

    async getFilePreview(fileId: string) {
        try {
            const fileUrl = this.storage.getFilePreview(
                conf.appwriteBucketId,
                fileId,
                2000,
                2000,
                "top",
                100
            )
            if (!fileUrl) throw Error;
            return fileUrl;
        } catch (error) {
            console.log("Appwrite Auth :: getFilePreview :: Error ", error)
        }
    }

    async deleteFile(fileId: string) {
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )

            return { status: "ok" }
        } catch (error) {
            console.log("Appwrite Auth :: deleteFile :: Error ", error);
        }

    }

   async getRecentPosts() {
        try {
            const posts = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwritePostCollectionId,
                [Query.orderDesc(""), Query.limit(20)]
            )
            // console.log(posts);
            if (!posts) throw Error;

            return posts;
        } catch (error) {
            console.log("Appwrite Auth :: getRecentPosts :: Error ", error);
           
        }
    } 
    // async getRecentPosts() {
    //     try {
    //         console.log("Attempting to get recent posts...");
            
    //         if (!this.databases) {
    //             console.error("Databases or listDocuments function is undefined.");
    //             throw Error("Databases or listDocuments function is undefined.");
    //         }
    
    //         const posts = await this.databases.listDocuments(
    //             conf.appwriteDatabaseId,
    //             conf.appwritePostCollectionId,
    //             [Query.orderDesc(""), Query.limit(20)]
    //         );
    
    //         if (!posts) {
    //             console.error("No posts retrieved.");
    //             throw Error("No posts retrieved.");
    //         }
    
    //         console.log("Recent posts retrieved successfully:", posts);
    //         return posts;
    //     } catch (error) {
    //         console.log("Appwrite Auth :: getRecentPosts :: Error ", error);
    //         return null;
    //     }
    // }
    
};
//^ ----------------------------------------------------------------------------


//^ --Creating an object where all authentication happens :-
const authService = new AuthService();


//^ --Exporting object :-
export default authService;