import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PostsUsersService, Comments } from '../services/posts-users.service';

@Component({
  selector: 'app-cart-post',
  templateUrl: './cart-post.component.html',
  styleUrls: ['./cart-post.component.scss']
})
export class CartPostComponent implements OnInit {

comments: Comments[] = []
loading: boolean = false

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private postsUsersService: PostsUsersService
  ) { }

ngOnInit(): void {
this.fetchComments()
  }
  fetchComments(){
    this.loading = true
this.postsUsersService.fetchComments(this.data.id)
.subscribe(comments=>{
  this.comments = comments
  this.loading = false
})
  }
}
