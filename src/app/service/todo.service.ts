import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todosSubject.asObservable();
  private storageKey = 'todos';
  
  constructor() {
    this.loadTodos();
  }
  
  private loadTodos(): void {
    this.todosSubject.next([]); // Clear todos initially to trigger loading state
    setTimeout(() => {
      try {
        const savedTodos = localStorage.getItem(this.storageKey);
        this.todosSubject.next(savedTodos ? JSON.parse(savedTodos) : []);
      } catch (error) {
        console.error('Error loading todos from localStorage:', error);
        this.todosSubject.next([]);
      }
    }, this.getRandomDelay());
  }
  
addTodo(todo: Todo): void { 
  setTimeout(() => {
    // Check if the task title already exists
    const taskExists = this.todosSubject.value.some(existingTodo => 
      existingTodo.title.toLowerCase() === todo.title.toLowerCase()
    );

    if (taskExists) {
      console.warn('Task with this title already exists!');
      return; // Prevent adding the duplicate task
    }
    
    const newTodo: Todo = { 
      id: Date.now(),
      title: todo.title, // Using all properties
      description: todo.description,
      status: todo.status,
      priority: todo.priority,
      due_date: todo.due_date,
      completed: false // Default value
    };
    const updatedTodos = [...this.todosSubject.value, newTodo];
    this.updateStorage(updatedTodos);
  }, this.getRandomDelay());
}

deleteTodo(id: number): void {
  setTimeout(() => {
    const updatedTodos = this.todosSubject.value.filter(todo => todo.id !== id);
    this.updateStorage(updatedTodos);
  }, this.getRandomDelay());
}

updateTodo(id: number, completed: boolean): void {
  setTimeout(() => {
    const updatedTodos = this.todosSubject.value.map(todo =>
      todo.id === id ? { 
        ...todo, 
        completed, 
        status: completed ? 'completed' : 'open' // ✅ Update status based on completion
      } : todo
    );
    this.updateStorage(updatedTodos);
  }, this.getRandomDelay());
}

private updateStorage(todos: Todo[]): void {
  localStorage.setItem(this.storageKey, JSON.stringify(todos));
  this.todosSubject.next(todos);
}

private getRandomDelay(): number {
  return Math.floor(Math.random() * (2000 - 500 + 1)) + 500;
}
}




