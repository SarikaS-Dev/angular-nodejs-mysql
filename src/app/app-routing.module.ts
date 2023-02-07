import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { HomeComponent } from './components/home/home.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { NewUserComponent } from './components/new-user/new-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'add-user', component: NewUserComponent },
  { path: 'list-user', component: ListUserComponent },
  { path: 'update-user/:id', component: EditUserComponent },
  { path: 'delete-user/:id', component: ConfirmationDialogComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
