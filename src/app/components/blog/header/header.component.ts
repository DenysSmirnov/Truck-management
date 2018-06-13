import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() changedDate = new EventEmitter<any>();
  @Output() truckFilter = new EventEmitter<any>();
  @Output() packageFilter = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.changedDate.emit(event.value.toLocaleDateString('en-US'));
  }
  onTruckFilter(value: string) {
    // if (value.length) {
      this.truckFilter.emit(value);
    // }
  }
  onPackageFilter(value: string) {
    if (value.length) {
      this.packageFilter.emit(value);
    }
  }
}
