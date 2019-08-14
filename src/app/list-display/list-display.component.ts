import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-list-display',
  templateUrl: './list-display.component.html',
  styleUrls: ['./list-display.component.css']
})
export class ListDisplayComponent implements OnInit {
  completeData1: any;
  completeData: any;
  activeTable: number = 0;
  constructor(private myService: UserService) { }

  ngOnInit() {
    this.fetchData()
  }

  fetchData() {
    this.myService.fetchCompleteData().subscribe(result => {
      this.completeData1 = result;
      if (this.completeData1.length != 0) {
        this.activeTable = 1
        this.completeData = this.completeData1;
        console.log(this.completeData);
      } else {
        alert("there is no complete Data to display");
      }
    });
  }

}
