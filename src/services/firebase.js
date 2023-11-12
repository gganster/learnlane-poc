import {db} from "@/firebase";
import {
  doc          as fdoc,
  collection   as fcollection,
  getDoc       as fgetDoc,
  setDoc       as fsetDoc,
  addDoc       as faddDoc,
  deleteDoc    as fdeleteDoc,
  onSnapshot   as fonSnapshot,
  where        as fwhere,
  orderBy      as forderBy,
  limit        as flimit,
  query        as fquery,
} from "firebase/firestore";

export const doc = (...args) => fdoc(db, ...args);
export const setDoc = (...args) => fsetDoc(...args);
export const getDoc = (...args) => fgetDoc(...args);
export const addDoc = (...args) => faddDoc(...args);
export const deleteDoc = (...args) => fdeleteDoc(...args);

export const collection = (...args) => fcollection(db, ...args);
export const onSnapshot = (...args) => fonSnapshot(...args);
export const where = (...args) => fwhere(...args);
export const orderBy = (...args) => forderBy(...args);
export const limit = (...args) => flimit(...args);
export const query = (...args) => fquery(...args);