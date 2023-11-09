import {doc, getDoc} from "./firebase";

export const getUserById = async (id) => {
    const userDoc = await getDoc(doc("users", id));
    if (!userDoc.exists()) return null;
    return {uid: userDoc.id, ...userDoc.data()};
}