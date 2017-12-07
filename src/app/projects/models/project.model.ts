import { Attachment } from "./attachment.model";
import { Link } from "./link.model";
import { TeamMember } from "./team-member.model";
import { WorkItem } from "./work-item.model";

export interface Project {
    id?: number;
    progress?: number;
    categories?: string;
    description: string;
    priority: string;
    title: string;
    team: string;
    complete: boolean;
    attachments?: Attachment[];
    links?: Link[]
    teamMembers?: TeamMember[];
    workItems?: WorkItem[];
}