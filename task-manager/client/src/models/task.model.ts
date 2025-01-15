export class TaskModel {
  static ENDPOINT = "/tasks";
  id?: number;
  title?: string;
  description?: string | null;
  dueDate?: Date;
  status?: "backlog" | "todo" | "in-progress" | "done";
  categoryId?: number;
  userId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
