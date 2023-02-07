import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, timer } from 'rxjs';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Users } from 'src/app/shared/users';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['name', 'email', 'age', 'gender', 'department', 'city', 'actions'];
  public dataSource: MatTableDataSource<Users>;
  subscription: Subscription;
  everyFiveSeconds: Observable<number> = timer(0, 30000); //60000
  public user: Users

  users: Users[] = [];
  constructor(
    private apiService: UserServiceService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog
  ) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngAfterViewInit() {

  }

  ngOnInit() {

    this.getAllUsers();

    // refresh the table every 30 secs
    this.subscription = this.everyFiveSeconds.subscribe(() => {
      console.log('Auto Refresh Every 30 Sec.');
      this.getAllUsers();
    });
  }

  // fetch the data from the database using service 
  getAllUsers() {
    this.apiService.getAll().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource<Users>(data); //pass the array you want in the table
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      return data
    })
  }

  // to delete the data from database using service
  deleteData(id: any) {
    if (window.confirm('Are sure you want to delete this student ?')) {
      this.apiService.delete(id).subscribe(res => {
        //this.users.splice(id, 1);
        this.users = this.users.filter(item => item.id !== id);
        alert('User deleted successfully!');
        console.log('User deleted successfully!');
      })
    }
  }
}
