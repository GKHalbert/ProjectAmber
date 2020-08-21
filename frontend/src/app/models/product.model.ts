  
export interface ProductModelServer {
    id: Number;
    name: String;
    category: String;
    description: String;
    image: String;
    price: Number;
    quantity: Number;
    images: String;
  }
  
  
  export interface serverResponse  {
    count: number;
    products: ProductModelServer[]
  };

  export interface ProductResponseModel {
    id: Number;
    title: String;
    description: String;
    price: Number;
    quantity: Number;
    image: String;
  }