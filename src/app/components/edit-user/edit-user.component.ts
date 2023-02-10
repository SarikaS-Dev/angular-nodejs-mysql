import { error } from '@angular/compiler/src/util';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Users } from 'src/app/shared/users';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  public userForm: FormGroup;
  id: any;
  public user: Users;

  constructor(private apiService: UserServiceService, private fb: FormBuilder,
    private route: ActivatedRoute, private router: Router, private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.apiService.get(this.id).subscribe((data: Users) => {
      this.userForm.setValue({
        name: data['name'],
        email: data['email'],
        age: data['age'],
        gender: data['gender'],
        department: data['department'],
        city: data['city']
      });
      this.user = data;
      console.log(this.user);
    });

    this.userForm = new FormGroup({
      name: new FormControl(this.user?.name, Validators.required),
      email: new FormControl(this.user?.name, [Validators.required, Validators.email]),
      age: new FormControl(this.user?.name, Validators.required),
      gender: new FormControl(this.user?.name, Validators.required),
      department: new FormControl(this.user?.name, Validators.required),
      city: new FormControl(this.user?.name, Validators.required)
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  ResetForm() {
    this.userForm.reset();
  }

  // submit the updated form 
  onSubmit() {
    this.spinner.show();
    if (!this.userForm.valid) {
      alert('Please fill all the required fields!');
    } else {
      console.log(this.userForm.value);
      this.apiService.update(this.id, this.userForm.value)
        .subscribe({
          next:
            (res: any) => {
              setTimeout(() => {
                /** spinner ends after 2 seconds */
                this.spinner.hide();
              }, 2000);
              console.log(res);
              alert("User Updated Successfully!");
              this.router.navigate(['/list-user']);
            }, error: (error) => {
              alert("Failed to Update User!");
              console.log(error);
            }
        });
    }
  }

  // don't make any changes and route back to list user 
  onCancel() {
    this.router.navigate(['/list-user']);
  }
}

