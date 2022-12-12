import { Timestamp } from "@angular/fire/firestore";

export interface Color {
    id: string;
    userId: string;
    name: string;
    description?: string;
    value: string;
    time: Timestamp;
}