import {
  Component,
  OnInit
} from '@angular/core';
import {
  PostUser,
  PostsUsersService
} from '../services/posts-users.service';
import {
  MatDialog
} from '@angular/material/dialog';
import {
  CardPostDialogComponent
} from '../card-post-dialog/card-post-dialog.component';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  postsUsers: PostUser[] = []
  loading: boolean = false
  constructor(
    private postsUsersService: PostsUsersService,
    public dialog: MatDialog) {}

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

  openDialog(id: number): void {
    const post = this.postsUsers.find(post => post.id === id)
    this.dialog.open(CardPostDialogComponent, {
      data: {
        name: post.name,
        title: post.title,
        body: post.body,
        id: post.id
      }
    });
  }
}
