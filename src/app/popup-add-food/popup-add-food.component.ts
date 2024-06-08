import { Food } from './../food/food.model';
import { FoodInfoApiServiceService } from './../api-services/food-info-api-service.service';
import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-popup-add-food',
  templateUrl: './popup-add-food.component.html',
  styleUrl: './popup-add-food.component.css'
})
export class PopupAddFoodComponent {
  constructor(private service: FoodInfoApiServiceService) { }

  isEditMode:boolean = false;
  showPopup: boolean = false;

  @Output() close = new EventEmitter<void>();
  @Output() addFood = new EventEmitter<boolean>();
  @Output() editFood = new EventEmitter<boolean>();

  @Input() foodInfo: Food;
  id: string;
  imageMenu: string;
  name: string;
  price: number;
  description: string;
  ingredient: string;
  imageDetails: string;

  public ngOnInit(): void {

    this.isEditMode = !!this.foodInfo.id;
    this.id = this.foodInfo.id ?? "";
    this.imageMenu = this.foodInfo.imageMenu;
    this.name = this.foodInfo.name;
    this.price = this.foodInfo.price;
    this.description = this.foodInfo.description;
    this.ingredient = this.foodInfo.ingredient;
    this.imageDetails = this.foodInfo.imageDetail
  }

  submitForm() {
    this.foodInfo.imageMenu = this.imageMenu;
    this.foodInfo.name = this.name;
    this.foodInfo.price = this.price;
    this.foodInfo.description = this.description;
    this.foodInfo.ingredient = this.ingredient;
    this.foodInfo.imageDetail = this.imageDetails;

    if (this.isEditMode) {
      console.log("edit mode" + this.id);
      this.foodInfo.id = this.id;
      this.service.putFoodInfo(this.foodInfo).subscribe(res => {
        this.editFood.emit(res)
        this.closePopup()
      });
    } else {
      console.log("add mode");
      this.service.postFoodInfo(this.foodInfo).subscribe(res => {
        this.addFood.emit(res)
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
