import { Component,ViewChild, ElementRef, OnInit,OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params, RoutesRecognized  } from '@angular/router';
import {Product} from '../../model/product';
import {ProductService} from '../../service/product.service';
import { HttpResponse, HttpRequest, HttpClient, HttpParams } from '@angular/common/http';
import { SearchCriteria } from '../../model/searchcriteria';
import 'rxjs/add/operator/map'; // required by the .map method
import { findIndex } from 'rxjs/operators';
import { FilterByBrandPipe } from '../searchproduct/genderfilter/filterByBrand.pipe';
import { FilterConditionType } from 'ag-grid/dist/lib/filter/baseFilter';
import { filter } from 'rxjs/operator/filter';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-productconfig',
  templateUrl: './productconfig.component.html',
  styleUrls: ['./productconfig.component.css'],
  providers:[Product,ProductService, SearchCriteria]
  
})
export class ProductconfigComponent implements OnInit,OnDestroy {

  file: File;
  errorMsg: string;
  successMsg: string;
  productId:number = 0;
    type:number;
    products:object;
   proId=63;
   cookieValue = 'UNKNOWN';
    private productList: Array<Product> = [];
  @ViewChild('fileInput') fileInput: ElementRef;
  constructor(private product:Product, private productService:ProductService, private searchCriteria: SearchCriteria, private router: Router, private activatedRoute: ActivatedRoute, private cookieService: CookieService) { 
     console.log('ProductconfigComponent Constructor');
  }
   selectedproduct = [];
    dropdownSettings = {};
 
  selectedItems = [];

    productType = [
     { id: '1', name: 'Birthday Gifts', "isSelected": false },
      { id: '2', name: 'Wedding Gifts', "isSelected": false },
      { id: '3', name: 'Anniversary Gifts', "isSelected": false },
      { id: '4', name: 'personalized Gifts', "isSelected": false },
      { id: '5', name: 'Flowers & Cakes', "isSelected": false },
      { id: '6', name: 'special Gifts', "isSelected": false }
];
    
     genderType = [
     { id: '1', name: 'kids', "isSelected": false },
      { id: '2', name: 'Men', "isSelected": false },
      { id: '3', name: 'Women', "isSelected": false },
];
    
  
 
  ngOnInit() {
    console.log('ProductconfigComponent Init');

    let url = this.router.url;

    if (url === '/pollconfigcreate') {
     
    } else {

      this.activatedRoute.queryParams.subscribe(params => {
        console.log('...................' + params);
        console.log(params);
        
        this.productId = params['product'];
        console.log(this.productId);
        
       this.retrieveProductList();
       
      });
    }
     /*this.productType = [
     { id: 1, item_text: 'Birthday Gifts', "isSelected": false },
      { id: 2, item_text: 'Wedding Gifts', "isSelected": false },
      { id: 3, item_text: 'Anniversary Gifts', "isSelected": false },
      { id: 4, item_text: 'Flowers & Cakes', "isSelected": false },
      { id: 5, item_text: 'special Gifts', "isSelected": false },
      { id: 6, item_text: 'personalized Gifts', "isSelected": false }
];*/
  /* this.genderType = [
      { item_id: 1, item_text: 'Men' },
      { item_id: 2, item_text: 'Women' },
      { item_id: 3, item_text: 'Kids' },
    ];*/
      /*this.productType = [
      { id: 1, item_text: 'Birthday Gifts' },
      { id: 2, item_text: 'Wedding Gifts' },
      { id: 3, item_text: 'Anniversary Gifts' },
      { id: 4, item_text: 'Flowers & Cakes' },
      { id: 5, item_text: 'special Gifts' },
      { id: 6, item_text: 'personalized Gifts' }
    ];*/
  
    /*this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }; */
       
  }
  
    onItemSelect (item:any) {
    console.log(item);
  }
  onSelectAll (items: any) {
    console.log(items);
  } 

  onFileChange(event) {
  let reader = new FileReader();
  if (event.target.files && event.target.files.length > 0) {
    this.file = event.target.files[0];    
  }
  }
 
  onSubmit() {
    if (this.file === undefined) {
      this.errorMsg = "Select Product Image";
      setTimeout(() => {
        this.errorMsg = undefined;
      }, 3000);
    }
    var arr = this.genderType.filter(opt => opt.isSelected)
    .map(opt => opt.id);         
      this.product.gender_type= arr.join(', '); 
      var gentype = this.productType.filter(opt => opt.isSelected).map(opt => opt.id);
      
      this.product.type = gentype.join(', ');
    this.product.file=this.file;
   this.product.status='Active';
    console.log(this.product);
    this.productService.productConfiguration(this.product).subscribe(kv => {
      console.log(kv);
      if (kv.type == 4) {
       this.product = new Product();
        this.clearFile();
        this.successMsg = "Product Uploaded Successfully";
        setTimeout(() => {
          this.successMsg = undefined;
        }, 3000);
      }
    });


  }

 
  retrieveProductList() {
    
    console.log("retrieveProduct::" + this.productId);
    this.productService.retrieveProductList(this.searchCriteria).subscribe(data => {
      
      if (data instanceof HttpResponse ) {
        console.log("15414"+data.body);
        this.productList= JSON.parse('' + data.body);
        console.log("hszbd------------"+this.productList.filter((item) =>item.id === this.productId));
        console.log('ssssdsc------'+this.productList)
        
      }
    });

 }


  clearFile() {
    this.product.content=undefined;
    this.fileInput.nativeElement.value = '';
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  ngOnDestroy(){
    console.log('ProductconfigComponent Destroy');
  }
}
  /*
  interface  ProductList {
  id:number;
  item_text:string;        
  isSelected:boolean;
}
*/

