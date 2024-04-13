import { ID } from "react-native-appwrite";
import { account } from "../utils/appwrite.settings";

export class AppWriteService {
  // create a new appwrite account
  async createNewAccount(name, email, password) {
    try {
      const result = await account.create(ID.unique(), email, password, name);
      console.log(`Account created successfully! ${result}`);
      return result;
    } catch (error) {
      console.error("Failed to create new account: ", error);
      return null;
    }
  }

  // sign in with email and password
  async signInToAccount(email, password) {
    try {
      const result = await account.createEmailSession(email, password);
      console.log(`Login successfully! ${result}`);

      // fetch sign in user details
      const userDetails = await account.get();
      console.log(`User Details: ${userDetails}`);
      return userDetails;
    } catch (error) {
      console.error("Failed to signIn: ", error);
      return null;
    }
  }

  // get user details
  async getUserDetails() {
    try {
      const userDetails = await account.get();
      return userDetails;
    } catch (error) {
      console.error("Failed to fetch user details: ", error);
      return null;
    }
  }

  // sign out
  async signOut() {
    try {
      const result = await account.deleteSessions();
      console.log(`Logout successfully! ${result}`);
      return result;
    } catch (error) {
      console.error("Failed to signOut: ", error);
      return null;
    }
  }
}
