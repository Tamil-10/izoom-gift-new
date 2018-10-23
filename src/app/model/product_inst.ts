export class ProductInst {
    id: number;
    user_id: number;
    product_id: number;
    quantity: number;
    price: number;
    status: string;
    address_id: number;
    order_id: number;
    created_date: Date;
    created_by: string;
    modified_date: Date;
    modified_by: string;
    file:File; 
    content_type:string;
    content:any;
    ordered_date: Date;
}
