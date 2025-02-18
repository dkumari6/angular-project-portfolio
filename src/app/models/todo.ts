export interface Todo {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    due_date: string;
    completed?: boolean;
  }