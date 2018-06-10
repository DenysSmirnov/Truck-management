import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() changedDate = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.changedDate.emit(event.value.toLocaleDateString('en-US'));
  }

}
