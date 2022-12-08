import { Timestamp } from "@angular/fire/firestore";

export interface Color {
    id: string;
    name: string;
    description: string;
    value: string;
    time: Timestamp;
}