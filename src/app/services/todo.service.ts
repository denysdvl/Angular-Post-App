import { HttpClient, HttpParams} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';

export interface Todo {
    completed: boolean
    title: string
    id?: number
    userId?: number
  }
export interface UserTodo{
    name: string
    title: string
    completed: boolean
    id?: number
}

@Injectable()
export class TodosService{
    constructor(private http: HttpClient) {}


        addTodo(todo: Todo): Observable<Todo>{
          return  this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', todo)
        }
    fetchTodos(): Observable<Todo[]>{
        return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos',
        {
            params: new HttpParams().set('_limit', '40')
        })
        .pipe(
            delay(500),
            catchError(error =>{
                return throwError(error)
            })
            )
    }
    removeTodo(id: number): Observable<void>{
      return  this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`)
        
      }
    completeTodo(id: number): Observable<Todo>{
    return  this.http.put<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`,{
        completed: true
      })
    }
}