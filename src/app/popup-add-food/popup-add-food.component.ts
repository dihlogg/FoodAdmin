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

  // @Output() addFood = new EventEmitter<void>();
  // @Output() editFood = new EventEmitter<void>();
  // @Output() submit = new EventEmitter<any>();
  @Output() close = new EventEmitter<boolean>();

  @Input() foodInfo: Food;
  imageMenu: string;
  name: string;
  price: number;
  description: string;
  ingredient: string;

  ngOnInit(): void {
    this.imageMenu = this.foodInfo.imageMenu;
    this.name = this.foodInfo.name;
    this.price = this.foodInfo.price;
    this.description = this.foodInfo.description;
    this.ingredient = this.foodInfo.ingredient;
  }

  submitForm() {
    this.foodInfo.imageMenu =  this.imageMenu;
    this.foodInfo.name =  this.name;
    this.foodInfo.price =  this.price;
    this.foodInfo.description =  this.description;
    this.foodInfo.ingredient =  this.ingredient;
    if (this.foodInfo.id !== null) {
      console.log("edit mode");
      this.service.putFoodInfo(this.foodInfo).subscribe(res => {    
        this.closePopup(res);
      });
    } else {
      console.log("add mode");
      this.service.postFoodInfo(this.foodInfo).subscribe(res => {       
        this.closePopup(res);
      });
    }
  }

  closePopup(result: boolean ) {
    console.log("Close pupup");
    this.close.emit();
  }
}
