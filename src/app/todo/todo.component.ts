import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Todo } from './todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule], // Add CommonModule here
})
export class TodoComponent {
  todos: Todo[] = [];
  newTodoTitle: string = '';

  addTodo() {
    if (this.newTodoTitle.trim()) {
      const newTodo = new Todo(this.todos.length + 1, this.newTodoTitle);
      this.todos.push(newTodo);
      this.newTodoTitle = '';
    }
  }
}
