interface Task {
  id?: string;
  title: string;
  description: string;
  is_completed: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export default Task;
