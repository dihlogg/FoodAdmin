
import { FoodInfoApiServiceService } from './../api-services/food-info-api-service.service';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Food } from './food.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrl: './food.component.css'
})
export class FoodComponent {
  constructor(private service: FoodInfoApiServiceService) { }

  public dataSource: MatTableDataSource<any> = new MatTableDataSource<Food>()
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    if(this.foods.length === 0){
      this.refreshFoodInfo();
    }
  }
  foodInfoParrent: Food;
  foods: Food[] = [];
  searchFood = '';
  showPopup = false;

  refreshFoodInfo() {
    this.service.getFoodInfos().subscribe(data => {
      this.foods = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  filteredFoods(searchFood: string) {
    this.dataSource.filter = searchFood.trim().toLocaleLowerCase();
    const filterValue = searchFood;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onMatSortChange() {
    this.dataSource.sort = this.sort;
  }

  openPopup() {
    this.foodInfoParrent = {
      id: null,
      imageMenu: "",
      name: "",
      price: 0,
      description: "",
      ingredient: "",
      imageDetail:""
    };
    this.showPopup = true;
  }

  openEditPopup(foodInfoEdit: Food) {
    this.foodInfoParrent = foodInfoEdit;
    this.showPopup = true;
  }

  closePopup(result: boolean) {
    console.log("Close pupup");
    this.showPopup = result;
    if(result){
      this.refreshFoodInfo();
    }
  }

  // addNewFood(result: boolean) {
  //   this.refreshFoodInfo();
  //   this.closePopup();
  // }

  // editFood() {
  //   this.refreshFoodInfo();
  // }

  deleteFood(idFood: any) {
    const confirmDelete = confirm('Do you want to delete this food?');
    if (confirmDelete) {
      this.service.deleteFoodInfo(idFood).subscribe(() => {
        this.refreshFoodInfo();
      });
    }
  }
}
