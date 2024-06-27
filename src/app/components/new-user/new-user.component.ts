import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Users } from 'src/app/shared/users';
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  public userForm: FormGroup;
  name = new FormControl("", Validators.required);
  email = new FormControl("", [Validators.required, Validators.email]);
  age = new FormControl("", Validators.required);
  gender = new FormControl("", Validators.required);
  department = new FormControl("", Validators.required);
  city = new FormControl("", Validators.required);
  userdata : any;
  @Input() User: Users;

  constructor(private apiService: UserServiceService, private fb: FormBuilder, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      "name": this.name,
      "email": this.email,
      "age": this.age,
      "gender": this.gender,
      "department": this.department,
      "city": this.city
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  /**
   * Marks the form group as touched.
   */
  private markFormGroupTouched() {
    (<any>Object).values(this.userForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  // to reset th form values
  ResetForm() {
    this.userForm.reset();
  }

  // to submit the form values in database using the service
  submitData() {
    this.spinner.show();
    if (this.userForm.invalid) {
      this.markFormGroupTouched();
      return;
    }
    console.log(this.userForm.value);
    this.apiService.create(this.userForm.value).subscribe({
      next: (data) => {
        setTimeout(() => {
          /** spinner ends after 2 seconds */
          this.spinner.hide();
        }, 2000);
        alert("User Added Successfully!");
        console.log(data);
        this.router.navigate(['/new-user']);
        this.userdata = data;
      }, error: (error) => {
        alert("Failed to Add New User!");
        console.log(error);
      }
    }
    );
    this.ResetForm();
  }
}
