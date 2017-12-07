import { TeamMember } from './team-member.model';
import { Comment } from './comment.model'

export interface WorkItem {
    id?: number;
    projectId: number;
    title: string;
    description: string;
    priority: string;
    complete: boolean;
    assignedUsers: TeamMember[];
    comments: Comment[];
}