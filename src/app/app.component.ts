import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  menuDisplay: boolean = true

  constructor() {}
  ngOnInit(){

  }
  disActive(){
    this.menuDisplay = false
  }
  active(){
    this.menuDisplay = true
  }
}
