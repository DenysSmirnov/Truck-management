import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-new-package',
  templateUrl: './new-package.component.html',
  styleUrls: ['./new-package.component.scss']
})
export class NewPackageComponent implements OnInit {

  trucks: string[] = [
    'Truck1',
    'Truck2',
    'Truck3',
  ];

  constructor(
    private postService: PostService,
    private tostr: ToastrService
  ) { }

  ngOnInit() {
    this.postService.getData();
    this.resetForm();
  }

  onSubmit(packageForm: NgForm) {
    if (packageForm.value.$key == null) {
      this.postService.insertPackage(packageForm.value);
      this.resetForm(packageForm);
      this.tostr.success('Submitted Successfully', 'Package Register');


    } else {
      this.postService.updatePackage(packageForm.value);
      this.resetForm(packageForm);
      this.tostr.success('Submitted Successfully', 'Package Update');
    }
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
      date: null
    };
  }

}
