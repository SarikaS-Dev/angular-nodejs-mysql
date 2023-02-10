import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Users } from 'src/app/shared/users';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { NewUserComponent } from '../new-user/new-user.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user: Users;
  @ViewChild(NewUserComponent, { static: false }) newUser: NewUserComponent;
  @ViewChild(EditUserComponent, { static: false }) editUser: EditUserComponent;
  data: any;
  constructor(private apiService: UserServiceService, private route: ActivatedRoute, private router: Router) { }

  // ngAfterViewInit() {
  //   this.data = this.newUser.userdata;
  //   console.log(this.newUser.userdata);
  // }

  ngOnInit(): void {

    // this.id = this.route.snapshot.params['id'];
    // this.apiService.get(this.id).subscribe((data: Users) => {
    //   this.user = data;
    //   console.log(this.user);
    // });
  }

}
