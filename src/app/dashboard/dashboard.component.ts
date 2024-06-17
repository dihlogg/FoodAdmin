import { Component } from '@angular/core';
import { faBarsStaggered, faL } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faKitchenSet } from '@fortawesome/free-solid-svg-icons';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { FoodInfoApiServiceService } from './../api-services/cart-info-api-service.service';
import { Transactions } from './transactions.model';
import { ConstEnv } from '../api-services/ConstEnv';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  transaction: any;

  
  constructor(private service: FoodInfoApiServiceService) { }

  userId: String = ""
  transactions: Transactions[] = [];
  selectedTransaction: Transactions | null = null;
  orderDetails: any[];

  ngOnInit(): void {
    this.refreshCartInfo();
  }

  refreshCartInfo() {
    this.service.getAllTransactions().subscribe(data => {
      this.transactions = data;
    });
  }

  setDefaultTransaction() {
    this.selectedTransaction = this.transactions.length > 0 ? this.transactions[0] : null;
  }

  selectTransaction(transaction: Transactions): void {
    this.selectedTransaction = transaction;
  }

  // func accept move order from new to delivery
  acceptOrder(cartId: String): void {
    if (this.selectedTransaction) {
      this.selectedTransaction.status = ConstEnv.deliveryConst;
      this.selectedTransaction = null
      var  orderStatus = {
        cartInfoId:  cartId,
        status: "Delivery"
      };
      this.service.updateStatusCartInfo(orderStatus).subscribe(data => {
        if(data == true){
          this.refreshCartInfo();
        }else{
          // erroe message
        }
      });
    }
  }

  // variable to control tabs
  new: boolean = true;
  completed: boolean = false
  delivery: boolean = false

  // function to control tabs
  onNewClick() {
    this.new = true
    this.completed = false
    this.delivery = false
  }

  onCompletedClick() {
    this.new = false
    this.completed = true
    this.delivery = false
  }

  onDeliveryClick() {
    this.new = false
    this.completed = false
    this.delivery = true
  }

  faBarsStaggered: any = faBarsStaggered
  faClock: any = faClock
  faKitchenSet: any = faKitchenSet
  faTruck: any = faTruck
}
