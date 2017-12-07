export interface Comment {
    id?: number;
    workItemId: number;
    author: string;
    body: string;
    created: Date;
    stuck: boolean;
}