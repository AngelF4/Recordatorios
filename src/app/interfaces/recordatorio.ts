import { Timestamp } from "firebase/firestore";

export interface Recordatorio {
    id?: string,
    title: string,
    notes: string,
    date: Timestamp
}
