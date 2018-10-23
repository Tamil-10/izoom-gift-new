import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewEncapsulation  } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product } from '../../../model/product';
import { ProductInst } from '../../../model/product_inst';
import { ProductService } from '../../../service/product.service';
import { SearchCriteria } from '../../../model/searchcriteria';
import { CartComponent } from '../../cart/cart.component';
import { DomSanitizer } from '@angular/platform-browser';
import { FiltersComponent } from '../../../product/searchproduct/filters/filters.component';
import { Url } from 'url';
import { CookieService } from 'ngx-cookie-service';
import { AddCartService } from '../../../service/add-cart.service';


@Component({
  selector: 'app-weddinggifts',
  templateUrl: './weddinggifts.component.html',
  styleUrls: ['./weddinggifts.component.css'],
  providers: [Product, SearchCriteria, ProductInst, CartComponent]
})
export class WeddinggiftsComponent implements OnInit {
  filterId:string;
  productList: Array<Product>;
  imgdatapreffix = "data:";
  imgdatasuffix = ";base64,";
  userId: number;
  cookieValue = 'UNKNOWN';
  userName: string;
  successMsg: string;
  filter: string;
  term:any;
  productType: number;
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

  constructor(private product: Product,private cookieService: CookieService,
    private addCartService: AddCartService, private searchCriteria: SearchCriteria, private productService: ProductService, private cartComponent: CartComponent, private router: Router, private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) { 
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('...................' + params);
      console.log(params);      
      this.filterId = params['id'];
      console.log(this.filterId); 
      this.userId = Number(this.cookieService.get('userId'));
      this.cookieValue = this.cookieService.get('LoggedUser');
      this.retrieveAllProducts();     
    });

  }

  ngOnInit() {
    this.searchCriteria.start = 0;
    this.searchCriteria.limit = 10;
    this.userId = 1;
    this.userName = 'pandian'
  }
  retrieveAllProducts() {
    console.log('djv------'+this.filterId)
    this.productService.retrieveProductsByFilter(this.filterId).subscribe(data => {
      if (data instanceof HttpResponse ) {
        console.log(data.body);
        this.productList = JSON.parse('' + data.body);
        console.log(this.productList);       
    }
    });
  }

  valuechange(selectedvalue:any){
  
    this.productService.retrieveProductsByFilter(this.filterId).subscribe(data => {
         if (data instanceof HttpResponse ) {
           console.log(data.body);
           this.productList = JSON.parse('' + data.body).filter((item) => item.gen_type_id == selectedvalue);
            console.log(this.productList);       
        }
        });
    
  }
  
  increment(product){if(this.counter < product.available_quantity)this.counter += 1;}
    decrement(product){if(this.counter >1){this.counter -= 1;}}
  public getCurrency(): string {  
    return 'Rs.';
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
  reset_filter(){
    this.retrieveAllProducts();   
    this.priceMinFilter=null;
   this.priceMaxFilter=null;
   this.term='';

  }
  proceedToOrderSummary() {
    this.router.navigateByUrl('ordersummary')
  }
}

interface  IProduct {
  name:string;
  price:number;
}
