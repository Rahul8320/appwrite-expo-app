import { ID } from "react-native-appwrite";
import { account } from "../utils/appwrite.settings";

export class AuthService {
  // create a new appwrite account
  async createNewAccount(name, email, password) {
    try {
      const result = await account.create(ID.unique(), email, password, name);
      return result;
    } catch (err) {
      console.log("Failed to create new account: ", err);
      return null;
    }
  }

  // sign in with email and password
  async signInToAccount(email, password) {
    try {
      const result = await account.createEmailSession(email, password);

      // fetch sign in user details
      const userDetails = await account.get();
      return userDetails;
    } catch (err) {
      console.log("Failed to signIn: ", err);
      return null;
    }
  }

  // get user details
  async getUserDetails() {
    try {
      const userDetails = await account.get();
      return userDetails;
    } catch (err) {
      console.log("Failed to fetch user details: ", err);
      return null;
    }
  }

  // sign out
  async signOut() {
    try {
      const result = await account.deleteSessions();
      return result;
    } catch (err) {
      console.log("Failed to signOut: ", err);
      return null;
    }
  }
}
