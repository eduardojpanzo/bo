import { TaskModel } from "./task.model";

export class ProfileModel {
  static ENDPOINT = "/profile";
  email?: string;
  id?: number;
  tasks?: TaskModel[];
}
