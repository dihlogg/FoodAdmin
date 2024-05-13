import { User } from './user.model';
import { FoodInfoApiServiceService } from './../api-services/user-info-api-service.service';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  constructor(private service: FoodInfoApiServiceService) { }

  public dataSource: MatTableDataSource<any> = new MatTableDataSource<User>()
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    if (this.users.length === 0) {
      this.refreshUserInfo();
    }
  }
  userInfoParrent: User;
  users: User[] = [];
  searchUser = '';
  showPopup = false;

  refreshUserInfo() {
    this.service.getUserInfos().subscribe(data => {
      this.users = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  filteredUsers(searchUser: string) {
    this.dataSource.filter = searchUser.trim().toLocaleLowerCase();
    const filterValue = searchUser;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onMatSortChange() {
    this.dataSource.sort = this.sort;
  }

  openPopup() {
    this.userInfoParrent = {
      id: null,
      userName: "",
      userPassword: "",
      userFullName: "",
      userAddress: "",
      userPhone: ""
    };
    this.showPopup = true;
  }

  openEditPopup(userInfoEdit: User) {
    this.userInfoParrent = userInfoEdit;
    this.showPopup = true;
  }

  closePopup(result: boolean) {
    console.log("Close pupup");
    this.showPopup = result;
    if (result) {
      this.refreshUserInfo();
    }
  }

  deleteUser(idUser: any) {
    const confirmDelete = confirm('Do you want to delete this user?');
    if (confirmDelete) {
      this.service.deleteUserInfo(idUser).subscribe(() => {
        this.refreshUserInfo();
      });
    }
  }
}
