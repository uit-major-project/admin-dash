/* eslint-disable unicorn/no-null */
import { makeVar } from '@apollo/client';

import { User, Tasker, Task, Admin } from '../utils/types';

export const userVar = makeVar<User | null>(null);

export const tasksVar = makeVar<Task[] | null>(null);

export const taskersVar = makeVar<Tasker[] | null>(null);

export const taskCategoryVar = makeVar<string | null>(null);

export const adminVar = makeVar<Admin | null>(null);
