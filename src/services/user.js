import {doc, getDoc, addDoc, setDoc, onSnapshot, query, collection, where} from "./firebase";
import {auth} from "@/firebase";
import { signInAnonymously } from "firebase/auth";

export const getUserById = async (id) => {
    const userDoc = await getDoc(doc("users", id));
    if (!userDoc.exists()) return null;
    return {uid: userDoc.id, ...userDoc.data()};
}

export const createAnonymousUser = async ({data}) => {
    const userCredential = await signInAnonymously(auth);
    const user = userCredential.user;
    await setDoc(doc("users", user.uid), {
        userName: data.userName,
        userSurname: data.userSurname,
        rooms: [data.roomId],
        role: "anonymous",
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    console.log("here");
    return user;
}
export const getUsersByRoomIdRealTime = (roomId, cb) => {
    return onSnapshot(query(collection("users"), where("rooms", "array-contains", roomId)), (snapshot) => {
        const users = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
        cb(users);
    })
}