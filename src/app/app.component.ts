import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Todo {
  id: number;
  task: string;
  completed: boolean;
  createdAt: Date;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Todo App';
  todos: Todo[] = [];
  newTask = '';
  filter: 'all' | 'active' | 'completed' = 'all';
  currentYear = new Date().getFullYear(); // Add this property

  ngOnInit() {
    // Load todos from localStorage
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos).map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
      }));
    }
  }

  addTodo() {
    if (this.newTask.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        task: this.newTask,
        completed: false,
        createdAt: new Date(),
      };

      this.todos.unshift(newTodo);
      this.saveTodos();
      this.newTask = '';
    }
  }

  toggleComplete(todo: Todo) {
    todo.completed = !todo.completed;
    this.saveTodos();
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.saveTodos();
  }

  clearCompleted() {
    this.todos = this.todos.filter((todo) => !todo.completed);
    this.saveTodos();
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  get filteredTodos(): Todo[] {
    switch (this.filter) {
      case 'active':
        return this.todos.filter((todo) => !todo.completed);
      case 'completed':
        return this.todos.filter((todo) => todo.completed);
      default:
        return this.todos;
    }
  }

  get activeTodosCount(): number {
    return this.todos.filter((todo) => !todo.completed).length;
  }

  get completedTodosCount(): number {
    return this.todos.filter((todo) => todo.completed).length;
  }
}
