interface Task {
  id?: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default Task;
