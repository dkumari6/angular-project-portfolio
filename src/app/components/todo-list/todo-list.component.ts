import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Todo } from '../../models/todo';
import { TodoService } from '../../service/todo.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    TodoFormComponent,
    MatProgressSpinnerModule ,
    MatIconModule,
    MatButtonModule 
  ],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {
  @Input() todos: Todo[] = [];
  loading = true;
  private subscriptions = new Subscription();
  
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loading = true; // Indicate loading state initially
    this.subscriptions.add(
      this.todoService.todos$.subscribe(todos => {
        setTimeout(() => {
          this.todos = todos;
          this.loading = false; // Stop loading only after data is received
        }, 1000); // Adding a slight delay to make the spinner noticeable
      })
    );
  }

  addTodo(newTask: Todo): void {
    this.todoService.addTodo(newTask); // Delegates task creation to the service
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id); // Delegates deletion to the service
  }

  toggleCompletion(id: number, completed: boolean): void {
    this.todoService.updateTodo(id, completed); // Delegates update to the service
    this.todos = this.todos.map(todo =>
      todo.id === id ? { ...todo, completed } : todo
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Prevents memory leaks
  }
}