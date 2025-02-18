import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../models/todo';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-todo-item',
  template: `
    <div [class.completed]="todo.completed">
      <input type="checkbox" [checked]="todo.completed" (change)="toggleCompletion()" />
      {{ todo.title }}
      <button (click)="deleteTodo()">Delete</button>
    </div>
  `,
  styles: ['.completed { text-decoration: line-through; }'],
  imports: [CommonModule, MatIconModule, MatButtonModule],
})
export class TodoItemComponent {
  @Input() todo!: Todo; // Ensures todo input is required
  @Output() delete = new EventEmitter<number>();
  @Output() toggle = new EventEmitter<{ id: number; completed: boolean }>();

  deleteTodo(): void {
    this.delete.emit(this.todo.id); // Emits delete event with todo ID
  }

  toggleCompletion(): void {
    this.toggle.emit({ id: this.todo.id, completed: !this.todo.completed }); //Emits completion toggle event
  }
}