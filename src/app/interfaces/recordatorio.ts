import { Timestamp } from "firebase/firestore";

export interface Recordatorio {
    id?: string,
    title: string,
    notes: string,
    date: Timestamp
}
export interface HighlightedDate {
    date: string;
    textColor: string;
    backgroundColor: string;
  }