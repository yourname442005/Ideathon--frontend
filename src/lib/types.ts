export interface Paper {
  id: string;
  title: string;
  authors: string;
  institution: string;
  year: string;
  journal: string;
  abstract: string;
  citations: number;
  tags: string[];
  pdfUrl: string;
  doi: string;
  saved?: boolean;
  bookmarked?: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  members: string[];
  papersCount: number;
  tasksCount: number;
  lastActive: string;
}

export interface Note {
  id: string;
  projectId?: string;
  title: string;
  content: string;
  author: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  status: "todo" | "in-progress" | "done";
  assignee: string;
  dueDate: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  papersCount: number;
  isShared: boolean;
  isPinned: boolean;
  parentId?: string;
  color?: string;
}

export interface Researcher {
  id: string;
  name: string;
  avatar: string;
  institution: string;
  field: string;
  followers: number;
  publications: number;
  isFollowing: boolean;
  bio?: string;
}

export interface FeedItem {
  id: string;
  author: {
    name: string;
    avatar: string;
    institution: string;
  };
  action: string;
  time: string;
  title: string;
  content: string;
  likes: number;
  comments: Comment[];
  paperId?: string;
}

export interface Comment {
  author: string;
  avatar: string;
  content: string;
}

export interface NotificationItem {
  id: string;
  type: string;
  sender: string;
  content: string;
  time: string;
  read: boolean;
}

export interface ChatMessage {
  id: string;
  sender: string;
  avatar: string;
  role: "user" | "ai" | "team";
  content: string;
  timestamp: string;
}
