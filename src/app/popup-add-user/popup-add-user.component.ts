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

  isEditMode: boolean = false;
  showPopup: boolean = false;

  @Output() close = new EventEmitter<void>();
  @Output() addUser = new EventEmitter<boolean>();
  @Output() editUser = new EventEmitter<boolean>();

  @Input() userInfo: User;
  id: string;
  userName: string;
  userPassword: string;
  userFullName: string;
  userAddress: string;
  userPhone: string;

  public ngOnInit(): void {
    this.isEditMode = !!this.userInfo.id;
    this.id = this.userInfo.id ?? ""
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

    if (this.isEditMode) {
      console.log("edit mode" + this.id);
      this.userInfo.id = this.id;
      this.service.putUserInfo(this.userInfo).subscribe(res => {
        this.editUser.emit(res)
        this.closePopup()
      });
    } else {
      console.log("add mode");
      this.service.postUserInfo(this.userInfo).subscribe(res => {
        this.addUser.emit(res)
        this.closePopup()
      });
    }
  }

  closePopup() {
    console.log("Close pupup");
    this.showPopup = false;
    this.close.emit();
  }
}
