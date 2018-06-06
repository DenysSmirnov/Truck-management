import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { ToastrService} from 'ngx-toastr';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Truck } from '../../../models/post';

@Component({
  selector: 'app-new-package',
  templateUrl: './new-package.component.html',
  styleUrls: ['./new-package.component.scss']
})
export class NewPackageComponent implements OnInit {
  postList: Truck[];

  constructor(
    private postService: PostService,
    private tostr: ToastrService
  ) {}

  ngOnInit() {
    // this.postService.getPackages();
    const x = this.postService.getData();
    x.snapshotChanges().subscribe(item => {
      this.postList = [];
      item.forEach(element => {
        // console.log(element);
        const y = element.payload.toJSON();
        // console.log(y);
        y['$key'] = element.key;
        this.postList.push(y as Truck);
      });
      console.log(this.postList);
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
  }
  resetForm(packageForm?: NgForm) {
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

}
