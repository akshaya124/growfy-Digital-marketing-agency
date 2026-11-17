import { collection, doc, setDoc, deleteDoc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

// Collection for whitelisted team member emails
const WHITELIST_COLLECTION = "team_whitelist";

/**
 * Adds an email to the allowed team members list
 */
export const inviteTeamMember = async (email: string) => {
  try {
    const docRef = doc(db, WHITELIST_COLLECTION, email.toLowerCase());
    await setDoc(docRef, {
      email: email.toLowerCase(),
      addedAt: new Date().toISOString(),
    });
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
};

/**
 * Removes an email from the allowed team members list
 */
export const removeTeamMember = async (email: string) => {
  try {
    const docRef = doc(db, WHITELIST_COLLECTION, email.toLowerCase());
    await deleteDoc(docRef);
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
};

/**
 * Checks if a specific email is whitelisted
 */
export const isEmailWhitelisted = async (email: string): Promise<boolean> => {
  try {
    const docRef = doc(db, WHITELIST_COLLECTION, email.toLowerCase());
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  } catch (error) {
    console.error("Error checking whitelist:", error);
    return false;
  }
};

/**
 * Gets all whitelisted team members
 */
export const getWhitelistedMembers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, WHITELIST_COLLECTION));
    const members: any[] = [];
    querySnapshot.forEach((doc) => {
      members.push(doc.data());
    });
    return { members, error: null };
  } catch (error: any) {
    return { members: [], error: error.message };
  }
};
