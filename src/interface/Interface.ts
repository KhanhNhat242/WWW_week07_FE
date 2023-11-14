export interface Product {
    description: string,
    manufacturer: string,
    name: string,
    product_id: number,
    status: string,
    unit: string,
  }
  
export interface ProductImage {
    alternative: string,
    image_id: number,
    path: string,
    product: Product,
  }
  
export interface ProductPrice {
    note: string,
    price: number,
    price_date_time: string,
    product: Product,
  }