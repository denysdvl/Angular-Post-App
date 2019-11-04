import {
  Component,
  OnInit
} from '@angular/core';
import {
  TodosService,
  UserTodo
} from '../services/todo.service';
import {
  PostsUsersService
} from '../services/posts-users.service';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  providers: [TodosService]
})
export class TodosComponent implements OnInit {
  form: FormGroup

  userTodos: UserTodo[] = []
  loading = false
  id: number = 300

  constructor(
    private todosService: TodosService,
    private postsUsersService: PostsUsersService) {}

  ngOnInit() {
    this.fetchTodos()
    this.form = new FormGroup({
      name: new FormControl('',
        Validators.required),
      title: new FormControl('',
        Validators.required)
    })
  }

  submit() {
    if (this.form.valid) {
      const formData = {
        ...this.form.value
      }
      this.todosService.addTodo({
        title: formData.title,
        completed: false
      }).subscribe(todo => {
        this.id++
        this.userTodos.unshift({
          id: this.id,
          name: formData.name,
          title: formData.title,
          completed: false
        })
      })
      this.form.reset();
    }
  }

  fetchTodos() {
    this.loading = true
    this.todosService.fetchTodos()
      .subscribe(todos => {
        this.postsUsersService.fetchUsers()
          .subscribe(user => {
            this.userTodos = todos.map(valueTodo => {
              const userName = user.find(valueUser => valueUser.id === valueTodo.userId)
              return {
                name: userName.name,
                title: valueTodo.title,
                id: valueTodo.id,
                completed: valueTodo.completed
              }
            })
          })
        this.loading = false
      })
  }

  removeTodo(id: number) {
    this.todosService.removeTodo(id).subscribe(() => {
      this.userTodos = this.userTodos.filter(t => t.id !== id)
    })
  }

  completeTodo(id: number) {
    if (id > 200) {
      this.userTodos.find(t => t.id === id).completed = true
    } else {
      this.todosService.completeTodo(id)
        .subscribe(todo => {
          console.log(this.userTodos.find(t => t.id === todo.id))
          this.userTodos.find(t => t.id === todo.id).completed = true
        })
    }
  }
}
