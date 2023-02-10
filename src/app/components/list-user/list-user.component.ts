import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subscription, timer } from 'rxjs';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Users } from 'src/app/shared/users';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = ['name', 'email', 'age', 'gender', 'department', 'city', 'actions'];
  public dataSource: MatTableDataSource<Users>;
  subscription: Subscription;
  everyFiveSeconds: Observable<number> = timer(0, 5000); //60000
  public user: Users;

  users: Users[] = [];
  constructor(
    private apiService: UserServiceService, private route: ActivatedRoute, private router: Router, private changeDetect: ChangeDetectorRef, private spinner: NgxSpinnerService
  ) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {

    // refresh the table
    this.refresh();
  }

  ngAfterViewInit() {
    
    this.getAllUsers();
  }

  // fetch the data from the database using service 
  getAllUsers() {

    /** spinner starts on init */
    this.spinner.show();
    this.apiService.getAll().subscribe((data: any) => {
      if(data){
        this.spinner.hide();
      }
      this.dataSource = new MatTableDataSource<Users>(data); //pass the array you want in the table
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      return data
    })
  }

  // refresh the table if any changes are done
  refresh() {
    this.changeDetect.detectChanges();
  }

  // to delete the data from database using service
  deleteData(id: any) {
    if (window.confirm('Are sure you want to delete this user ?')) {
      this.apiService.delete(id).subscribe({
        next: (res) => {
          this.users = this.users.filter(item => item.id !== id);
          alert('User deleted successfully!');
          console.log('User deleted successfully!');
        }, error: (error) => {
          alert("Failed to Delete User!");
          console.log(error);
        }
      });
    }
    this.subscription = this.everyFiveSeconds.subscribe(() => {
      console.log('Auto Refresh Every 5 Sec.');
      this.getAllUsers();
    });
  }
}
