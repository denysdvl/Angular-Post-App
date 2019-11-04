import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router'
import { InfoComponent } from './info/info.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { TodosComponent } from './todos/todos.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
    {path: '', component: MainComponent},
    {path: 'info', component: InfoComponent},
    {path: 'main', component: MainComponent},
    {path: 'main/todo', component: TodosComponent},
    {path: 'main/posts', component: PostsListComponent},

]

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule{

}