export interface Transactions {
    dateOrder: string;
    status: string;
    totalPrice: number;
    cartDetails: CartDetails[];
  }
  
export interface CartDetails {
    image: string;
    foodName: string;
    price: number;
    quantity: number;
  }