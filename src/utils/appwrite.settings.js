import { Client, Account, Databases } from "react-native-appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("661aab8b5b33bd6284e6")
  .setPlatform("com.android.expo_app");

export const account = new Account(client);
export const database = new Databases(client);
