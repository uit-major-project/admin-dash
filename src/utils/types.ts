export type Themes = 'dark' | 'light';

export interface Admin {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;

  image?: string;
  phone?: string;
  permanentAddress?: string;
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  image?: string;
  phone?: string;
  permanentAddress?: string;

  bookings?: [any];

  tasks: any;
}

export enum TaskType {
  cleaning = 'cleaning',
  moving = 'moving',
  electrician = 'electrician',
  painter = 'painter',
  cook = 'cook',
  mechanic = 'mechanic',
  plumber = 'plumber',
  driver = 'driver',
  technician = 'technician',
  // mounting = 'mounting',
}
export enum TaskSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export enum TaskStatus {
  open = 'open',
  in_progress = 'in_progress',
  done = 'done',
  cancelled = 'cancelled',
}

export enum Stars {
  one = 'one',
  two = 'two',
  three = 'three',
  four = 'four',
  five = 'five',
}

export interface Tasker {
  id: string;
  createdAt: any;
  updatedAt: any;

  firstname: string;
  lastname: string;
  email: string;
  image: string;
  pincode?: string;
  phone?: string;
  permanentAddress?: string;

  pricePerHourInRs?: number;
  ratings?: any;
  experience?: string;
  category?: TaskType;

  isVerified?: boolean;
  hasPaidOneTimeFee?: boolean;
  isActive?: boolean;

  inContact?: any;
  assigned?: any;
}

interface Rating {
  id: string;
  createdAt: string;
  updatedAt: string;

  userId: string;
  taskId: string;
  stars: Stars;
  userComment?: string;
  task: Task[];
}

export interface Task {
  id: string;
  createdAt: string;
  updatedAt: string;

  description: string;
  dueDate?: string;
  location: string;
  pincode: string;
  userEmail: string;

  taskerInContactId?: string;
  taskerAssignedId?: string;
  taskerInContactEmail: string;
  taskerAssigned?: Tasker;

  size: TaskSize;
  status: TaskStatus;

  rating?: Rating;

  userId?: string;
  ratingId?: string;
  category: TaskType;
}
