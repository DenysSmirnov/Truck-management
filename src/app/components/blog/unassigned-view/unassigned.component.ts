import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Package } from '../../../models/post';

@Component({
  selector: 'app-unassigned',
  templateUrl: './unassigned.component.html',
  styleUrls: ['./unassigned.component.scss']
})
export class UnassignedComponent implements OnInit {
  @Input() packageList: Package[];
  // @Input() sortedPackList: any[];
  @Output() unChangedPack = new EventEmitter<Package>();
  @Output() unDeletedPack = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onEdit(pack: Package) {
    this.unChangedPack.emit(pack);
  }
  onDelete(key: string) {
    this.unDeletedPack.emit(key);
  }
}
