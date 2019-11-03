import { Component, OnInit } from '@angular/core';
import { PostsUsersService, PostUser } from './services/posts-users.service';
import {MatDialog} from '@angular/material/dialog';
import { CartPostComponent } from './cart-post/cart-post.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  postsUsers: PostUser[] = []
  loading: boolean = false
  constructor(
    private postsUsersService: PostsUsersService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchPostsUsers()
  }

  fetchPostsUsers(): void {
    this.loading = true
    this.postsUsersService.fetchPosts()
    .subscribe(post => {
      this.postsUsersService.fetchUsers()
      .subscribe(user => {
        this.postsUsers = post.map(valuePost => {
          const userName = user.find(valueUser => valueUser.id === valuePost.userId)
          return {
            name: userName.name,
            title: valuePost.title,
            id: valuePost.id,
            body: valuePost.body
          }
        })
      })
      this.loading = false
    })
  }

  openDialog(id: number): void{
    const post = this.postsUsers.find(post=>post.id === id)
    this.dialog.open(CartPostComponent,{
      data: {
        name: post.name,
        title: post.title,
        body: post.body,
        id: post.id
      }
    });
  }
}
