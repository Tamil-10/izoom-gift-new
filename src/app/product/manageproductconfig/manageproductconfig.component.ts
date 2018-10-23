import { Component, OnInit, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../model/product';
import { SearchCriteria } from '../../model/searchcriteria';
import { ProductService } from '../../service/product.service';
//import { AgGridModule, AgGridNg2 } from 'ag-grid-angular';
import { HttpResponse, HttpRequest, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import "ag-grid-enterprise";
import { ItemsControl } from '../../giftscarousel/carousel/ngu-carousel/ngu-carousel';
@Component({
  selector: 'app-manageproductconfig',
  templateUrl: './manageproductconfig.component.html',
  styleUrls: ['./manageproductconfig.component.css'],
  providers: [Product, SearchCriteria, ProductService, HttpClient]
})
export class ManageproductconfigComponent implements OnInit {
  private errorMsg: string;
  private successMsg: string;
  private productList: Array<Product> = [];
proId:any=63;
  constructor(private http: HttpClient, private searchCriteria: SearchCriteria, private product: Product, private productService: ProductService) {
    searchCriteria.start = 0;
    searchCriteria.limit = 10;

  }


  ngOnInit() {
    this.retrieveProductList();

  }

  retrieveProductList() {
    this.productService.retrieveProductList(this.searchCriteria).subscribe(data => {
      console.log(data);
      console.log(data);
      if (data instanceof HttpResponse ) {
        console.log(data.body);
        this.productList = JSON.parse('' + data.body);
        console.log('dsf------'+this.productList.find((item) => item.id === this.proId));
        
      }
    });
     
  }



  remove(product) {
    product.status = "Deleted"
    this.productService.deleteProduct(product).subscribe(kv => {
      if (kv.type == 4) {
        this.successMsg = "Deleted Successfully";
        this.retrieveProductList();
        setTimeout(() => {
          this.successMsg = undefined;
        }, 3000);
      }


    });
  } 

}
