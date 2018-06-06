import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  events: string[] = [];

  constructor() { }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(event.value.toLocaleDateString('en-US'));
    console.log(this.events);

  }

  ngOnInit() {
  }

}
