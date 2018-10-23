import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewEncapsulation  } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product } from '../../model/product';
import { ProductInst } from '../../model/product_inst';
import { ProductService } from '../../service/product.service';
import { SearchCriteria } from '../../model/searchcriteria';
import { CartComponent } from '../cart/cart.component';
import { FiltersComponent } from '../../product/searchproduct/filters/filters.component';
import { CookieService } from 'ngx-cookie-service';
import { AddCartService } from '../../service/add-cart.service';


import { combineAll } from 'rxjs/operators';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-searchproduct',
  templateUrl: './searchproduct.component.html',
  styleUrls: ['./searchproduct.component.css'],
  providers: [Product, SearchCriteria, ProductInst, CartComponent]

})
export class SearchproductComponent implements OnInit {
    /* public get maxPriceOptions(): any[] { 
    return this.priceMinFilter ?  this._priceOptions.filter(p => p.productPrice > this.priceMinFilter) : this._priceOptions;
  } */
  model: any = {};

  productList: Array<Product>;
  imgdatapreffix = "data:";
  imgdatasuffix = ";base64,";
  userId: number;
  cookieValue = 'UNKNOWN';
  userName: string;
  successMsg: string;
  filter: string;
  public counter : number = 1;   
  public Count : number;

    
    //for price filter
  @Output() refreshShoppingCart = new EventEmitter();
  @Input() priceMinFilter: number | null;
  @Input() priceMaxFilter: number | null;

  filterPrice(filter: IProductPriceLimit) {
    this.priceMinFilter = filter.priceMin;
    this.priceMaxFilter = filter.priceMax;
  }
    //for gender filter
  /*brands = ["All", "yte", "dfgfd", "fgfs"];
  selectedBrand: "All";
   
  amounts = ["Below 100", "100 - 200", "200 - 300", "300 - 1000" ];
  selectedPrice: "Below 100"; */
  
  //products: Product[];
 // mainFilter: any;
  
  //@ViewChild('filtersComponent')
  //filtersComponent: FiltersComponent;

  
  constructor(private product: Product,
     private searchCriteria: SearchCriteria, 
     private productService: ProductService, 
     private cartComponent: CartComponent, 
     private router: Router, private activatedRoute: ActivatedRoute,
     private cookieService: CookieService,
     private addCartService: AddCartService
    ) { }

  ngOnInit() {
    this.searchCriteria.start = 0;
    this.searchCriteria.limit = 10;
    this.userId = Number(this.cookieService.get('userId'));
    console.log('product======'+this.userId);
    this.userName = 'Tamil'
    this.cookieValue = this.cookieService.get('LoggedUser');

    this.retrieveAllProducts();
    
  }
  increment(product){if(this.counter < product.available_quantity)this.counter += 1;}
  decrement(product){if(this.counter >1){this.counter -= 1;}}
  public getCurrency(): string {  
    return 'Rs.';
  }

  retrieveAllProducts() {
    this.productService.retrieveProductList(this.searchCriteria).subscribe(data => {
      if (data instanceof HttpResponse ) {
        console.log('sdf---'+data.body);
        this.productList = JSON.parse('' + data.body);
      }
    });
    
    
  }

  addToCart(product) {
    let qty = (<HTMLInputElement>document.getElementById("qty_" + product.id)).value;
    let productInst = new ProductInst();
    productInst.quantity = Number(qty);
    productInst.price = product.price;
    productInst.product_id = product.id;
    productInst.user_id = this.userId;
    productInst.created_by = this.userName;
    productInst.status = 'Draft';
    productInst.content=product.content;
    productInst.content_type=product.content_type;
    console.log(productInst);



    if(this.cookieValue=='UNKNOWN'||this.cookieValue==''||this.cookieValue==null)
    {

      this.addCartService.createLocalStorage(productInst)
            .subscribe(
                data => {

                //  alert("returned back");

                    // this.alertService.success('Registration successful', true);
                    // this.router.navigate(['login']);
                },
                error => {

                 // alert("error occured");
                    // this.alertService.error(error);
                    // this.loading = false;
                });
                this.successMsg = "Product Added Successfully";
                this.productService.cartSubject.next(true);
                setTimeout(() => {
                  this.successMsg = undefined;
                }, 3000);

    }

else
{

    this.productService.addProductInst(productInst).subscribe(data => {
      console.log(data);
      if (data.type == 4) {
        this.successMsg = "Product Added Successfully";
        console.log('reload cart');
        this.productService.cartSubject.next(true);
        setTimeout(() => {
          this.successMsg = undefined;
        }, 3000);
      }

    });
  }
    this.counter = 1;

  }
  
  proceedToOrderSummary() {
    this.router.navigateByUrl('ordersummary')
  }
   
}




interface  IProduct {
  name:string;
  price:number;
}

