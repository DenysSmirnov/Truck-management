import { Component, EventEmitter, Input, Output, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Truck, Package } from '../../../models/post';

@Component({
  selector: 'app-truck-view',
  templateUrl: './truck-view.component.html',
  styleUrls: ['./truck-view.component.scss']
})
export class TruckViewComponent implements OnInit, AfterViewInit {
  @Input() postList: Truck[];
  @Input() sortedPostList: any[];
  @Input() packageList: Package[];
  @Output() changed = new EventEmitter<Truck>();
  @Output() deleted = new EventEmitter<string>();
  @Output() changedPackage = new EventEmitter<Package>();
  @Output() deletedPackage = new EventEmitter<string>();
  @ViewChild('truckKey') truckKey: ElementRef;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    // console.log(this.truckKey);
  }

  onEdit(post: Truck) {
    this.changed.emit(post);
  }
  onDelete(key: string) {
    this.deleted.emit(key);
  }
  onEditPack(pack: Package) {
    this.changedPackage.emit(pack);
  }
  onDeletePack(key: string) {
    this.deletedPackage.emit(key);
  }

}
