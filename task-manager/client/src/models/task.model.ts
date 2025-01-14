export class TaskModel {
  static ENDPOINT = "/tasks";
  id?: number;
  title?: string;
  description?: string | null;
  dueDate?: Date;
  statusId?: number;
  categoryId?: number;
  userId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
