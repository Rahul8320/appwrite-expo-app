import { database } from "../utils/appwrite.settings";
import { ID, Permission, Query, Role } from "react-native-appwrite";

export class IdeasService {
  IDEAS_DATABASE_ID = "661b5e7cb5fbb5d90d37";
  IDEAS_COLLECTION_ID = "661b5e9f417f995df689";

  // create new document
  async createNewDocument(idea) {
    try {
      const response = await database.createDocument(
        this.IDEAS_DATABASE_ID,
        this.IDEAS_COLLECTION_ID,
        ID.unique(),
        idea,
        [Permission.write(Role.user(idea.userId))]
      );
      return response;
    } catch (err) {
      console.log(`Failed to create new document: ${err}`);
      return null;
    }
  }

  // list all documents
  async listAllDocuments() {
    try {
      const response = await database.listDocuments(
        this.IDEAS_DATABASE_ID,
        this.IDEAS_COLLECTION_ID,
        [Query.orderDesc("$createdAt"), Query.limit(10)]
      );
      return response;
    } catch (err) {
      console.log(`Failed to list documents: ${err}`);
      return null;
    }
  }

  // remove an document by id
  async removeDocumentById(id) {
    try {
      await database.deleteDocument(
        this.IDEAS_DATABASE_ID,
        this.IDEAS_COLLECTION_ID,
        id
      );
      return true;
    } catch (err) {
      console.log(`Failed to remove document: ${err}`);
      return false;
    }
  }
}
