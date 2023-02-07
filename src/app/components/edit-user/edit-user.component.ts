import { error } from '@angular/compiler/src/util';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    
    this.id = this.route.snapshot.params['id'];
    this.apiService.get(this.id).subscribe((data: Users)=>{
      this.userForm .setValue({
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

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  ResetForm() {
    this.userForm.reset();
  }

  onSubmit(){

    console.log(this.userForm.value);
    this.apiService.update(this.id, this.userForm.value)
    .subscribe(
      (res:any) => {
        alert("User Updated Successfully!");
        console.log(this.userForm.value);
        this.router.navigate(['/home']);
      }, error => {
        alert("Failed to Update User!");
        console.log(error);
      });
  }
}

