import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css'
})
export class TodoFormComponent {
  newTask: string = '';
  @Output() newTaskAdded = new EventEmitter<Todo>(); // Emitting event to parent component
  
 onSubmit() {
  if (!this.newTask.trim()) return; // Prevents empty tasks

  const newTodo: Todo = {
    id: Date.now(), // Unique ID using timestamp
    title: this.newTask,
    description: '',
    status: 'open',
    priority: 'low',
    due_date: new Date().toISOString(),
    completed: false
  };

  this.newTaskAdded.emit(newTodo); //  Emit event to parent component
  this.newTask = ''; // Clear input field after submission
}
}