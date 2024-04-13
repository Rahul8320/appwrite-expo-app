import { createContext, useContext, useState, useEffect } from "react";
import { AppWriteService } from "../services/appwrite.service";
import { toast } from "../utils/toast";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [userDetails, setUserDetails] = useState(null);
  const appwriteService = new AppWriteService();

  async function login(email, password) {
    const loggedIn = await appwriteService.signInToAccount(email, password);
    if (loggedIn !== null) {
      setUserDetails(loggedIn);
      toast("Welcome back, You are logged in.");
    } else {
      toast("Invalid Credentials!");
    }
  }

  async function logout() {
    const result = await appwriteService.signOut();
    if (result !== null) {
      setUserDetails(null);
      toast("Logged out");
    } else {
      toast("Logged out failed!");
    }
  }

  async function register(name, email, password) {
    const result = await appwriteService.createNewAccount(
      name,
      email,
      password
    );
    if (result !== null) {
      toast("Account created");
    } else {
      toast("Register failed!");
    }
  }

  async function init() {
    try {
      const loggedIn = await appwriteService.getUserDetails();
      if (loggedIn !== null) {
        setUserDetails(loggedIn);
        toast("Welcome back. You are logged in");
      }
    } catch (err) {
      console.error(err);
      setUserDetails(null);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider
      value={{ current: userDetails, login, logout, register, toast }}
    >
      {children}
    </UserContext.Provider>
  );
}
