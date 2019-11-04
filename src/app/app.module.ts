import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './module/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { CardPostDialogComponent } from './card-post-dialog/card-post-dialog.component';
import { InfoComponent } from './info/info.component';
import { PostsListComponent } from './posts-list/posts-list.component'
import { AppRoutingModule } from './app-routing.module';
import { TodosComponent } from './todos/todos.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    CardPostDialogComponent,
    InfoComponent,
    PostsListComponent,
    TodosComponent,
    MainComponent
  ],
  entryComponents:[
    CardPostDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
