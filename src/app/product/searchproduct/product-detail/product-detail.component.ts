import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product } from '../../../model/product';
import { SearchCriteria } from '../../../model/searchcriteria';
import { ProductService } from '../../../service/product.service';
import { ProductInst } from '../../../model/product_inst';
import { CartComponent } from '../../cart/cart.component';
import { HttpResponse, HttpRequest, HttpClient, HttpParams } from '@angular/common/http';
import { identifierModuleUrl } from "@angular/compiler";
import { CookieService } from 'ngx-cookie-service';
import { AddCartService } from '../../../service/add-cart.service';

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
  providers:[Product, SearchCriteria, ProductInst, CartComponent]
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  public counter : number = 1;   
  public Count : number;
  id:any;
  productId:number;
  proId:number=63;
  productList: Array<Product>;
  imgdatapreffix = "data:";
  imgdatasuffix = ";base64,";
  userId: number;
  userName: string;
  successMsg: string;
  cookieValue = 'UNKNOWN';
  constructor(private product:Product, private addCartService:AddCartService, private cookieService: CookieService,private http: HttpClient, private searchCriteria: SearchCriteria, private productService: ProductService, private cartComponent: CartComponent,private router: Router,
    private activatedRoute: ActivatedRoute) { }
   
  ngOnInit() {
    this.searchCriteria.start = 0;
    this.searchCriteria.limit = 10;
    this.userId = 1;
    this.userName = 'pandian'
    console.log(this.activatedRoute.snapshot);
    this.id=this.activatedRoute.snapshot.paramMap.get('id');
     this.productId = this.id;
     this.userId = Number(this.cookieService.get('userId'));
     this.cookieValue = this.cookieService.get('LoggedUser');
    console.log('dsjhbfdhjcb--------------'+this.productId);
    this.retrieveProductList();

    // this.activatedRoute.queryParams.subscribe(params => {
    //   console.log('...................' + params);
    //   console.log(params);
    //   this.productId = params['product'];
    //   console.log(this.productId);
      
    //  this.retrieveProductList(this.productId);
     
    // });
  }
  retrieveProductList(){
    this.productService.retrieveProductList(this.searchCriteria).subscribe(data => {
      console.log(data);
      if (data instanceof HttpResponse ) {
        console.log(data.body);
        this.productList = JSON.parse('' + data.body);        
      }
    });
  } 

  increment(product){if(this.counter < product.available_quantity)this.counter += 1;}
  decrement(product){if(this.counter >1){this.counter -= 1;}}
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
  ngOnDestroy() {
   
  }
}
