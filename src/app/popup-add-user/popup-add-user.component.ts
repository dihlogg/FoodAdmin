import { User } from './../user/user.model';
import { FoodInfoApiServiceService } from './../api-services/user-info-api-service.service';
import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-popup-add-user',
  templateUrl: './popup-add-user.component.html',
  styleUrl: './popup-add-user.component.css'
})
export class PopupAddUserComponent {
  constructor(private service: FoodInfoApiServiceService) { }

  @Output() close = new EventEmitter<boolean>();

  @Input() userInfo: User;
  userName: string;
  userPassword: string;
  userFullName: string;
  userAddress: string;
  userPhone: string;
  

  ngOnInit(): void {
    this.userName = this.userInfo.userName;
    this.userPassword = this.userInfo.userPassword;
    this.userFullName = this.userInfo.userFullName;
    this.userAddress = this.userInfo.userAddress;
    this.userPhone = this.userInfo.userPhone;
  }

  submitForm() {
    this.userInfo.userName = this.userName;
    this.userInfo.userPassword = this.userPassword;
    this.userInfo.userFullName = this.userFullName;
    this.userInfo.userAddress = this.userAddress;
    this.userInfo.userPhone = this.userPhone;

    if (this.userInfo.id !== null) {
      console.log("edit mode");
      this.service.putUserInfo(this.userInfo).subscribe(res => {
        this.closePopup(res);
      });
    } else {
      console.log("add mode");
      this.service.postUserInfo(this.userInfo).subscribe(res => {
        this.closePopup(res);
      });
    }
  }

  closePopup(result: boolean) {
    console.log("Close pupup");
    this.close.emit();
  }
}
