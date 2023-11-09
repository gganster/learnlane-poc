import {db} from "@/firebase";
import {
  doc          as fdoc,
  collection   as fcollection,
  getDoc       as fgetDoc,
  setDoc       as fsetDoc,
  onSnapshot   as fonSnapshot,
  where        as fwhere,
  orderBy      as forderBy,
  limit        as flimit,
} from "firebase/firestore";

export const doc = (...args) => fdoc(db, ...args);
export const setDoc = (...args) => fsetDoc(...args);
export const getDoc = (...args) => fgetDoc(...args);

export const collection = (...args) => fcollection(db, ...args);
export const onSnapshot = (...args) => fonSnapshot(...args);
export const where = (...args) => fwhere(...args);
export const orderBy = (...args) => forderBy(...args);
export const limit = (...args) => flimit(...args);