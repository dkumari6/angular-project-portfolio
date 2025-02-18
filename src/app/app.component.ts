import { Component } from '@angular/core';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from './models/todo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TodoListComponent, 
    CommonModule, 
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  todos: Todo[] = [];
  title = 'todo-list-app';
  
  addTask(newTask: Todo) {  // Accept Todo instead of string
    this.todos.push(newTask);
    console.log('Task added:', newTask);
  }
}