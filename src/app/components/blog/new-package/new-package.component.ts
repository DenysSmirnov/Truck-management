import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { ToastrService} from 'ngx-toastr';
import { Truck } from '../../../models/post';

@Component({
  selector: 'app-new-package',
  templateUrl: './new-package.component.html',
  styleUrls: ['./new-package.component.scss']
})
export class NewPackageComponent implements OnInit {
  postList: Truck[];
  @Input() isEdit: Boolean;
  @Output() editDone = new EventEmitter<boolean>();
  @ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(private postService: PostService, private tostr: ToastrService) {}

  ngOnInit() {
    const x = this.postService.getTrucks();
    x.snapshotChanges().subscribe(item => {
      this.postList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.postList.push(y as Truck);
      });
    });
  }

  onSubmit(packageForm: NgForm) {
    if (packageForm.value.$key == null) {
      this.postService.insertPackage(packageForm.value);
      this.tostr.success('Submitted Successfully', 'Package Registered');
    } else {
      this.postService.updatePackage(packageForm.value);
      this.tostr.success('Submitted Successfully', 'Package Updated');
    }
    this.resetForm(packageForm);
    this.closeBtn.nativeElement.click();
  }

  resetForm(packageForm?: NgForm) {
    this.onEdit(false);

    if (packageForm != null) {
      packageForm.reset();
    }
    this.postService.selectedPackage = {
      $key: null,
      id: null,
      serial: '',
      description: '',
      firstName: '',
      lastName: '',
      date: null,
      truck: null
    };
  }

  onEdit(bool: boolean) {
    this.editDone.emit(bool);
  }
}
