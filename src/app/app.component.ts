import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { TodoComponent } from './todo/todo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [FormsModule, TodoComponent], // Add FormsModule here
})
export class AppComponent {
  title = 'To-Do List';
}
