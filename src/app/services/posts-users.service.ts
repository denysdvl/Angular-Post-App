import { HttpClient, HttpParams} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';

export interface Post {
  userId: number
  title: string
  body: string
  id?: number
}
export interface User {
  name: string
  id: number
}
export interface Comments {
  name: string
  body: string
}
export interface PostUser {
  name: string
  title: string
  id: number
  body: string
}


@Injectable({
  providedIn: 'root'
})
export class PostsUsersService {

  constructor(private http: HttpClient) { }

  fetchPosts(): Observable<Post[]>{
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
  }
  fetchUsers(): Observable<User[]>{
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
  }
  fetchComments(id: number): Observable<Comments[]>{
    let params = new HttpParams()
        params = params.append('postId', id.toString())
    return this.http.get<Comments[]>('https://jsonplaceholder.typicode.com/comments',{
      params
    })
  }
}
