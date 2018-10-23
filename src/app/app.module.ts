import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NguCarouselModule } from './giftscarousel/carousel/ngu-carousel.module';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { NgxStripeModule } from 'ngx-stripe';
import { AppComponent } from './app.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {NgxPaginationModule} from 'ngx-pagination';
import { MaterialModule } from './material.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { ProductconfigComponent } from './product/productconfig/productconfig.component';
import { ManageproductconfigComponent } from './product/manageproductconfig/manageproductconfig.component';
import { AppRoutingModule } from './app.routing';
import { SearchproductComponent } from './product/searchproduct/searchproduct.component';
import { PollconfigComponent } from './poll/pollconfig/pollconfig.component';
import { ManagepollconfigComponent } from './poll/managepollconfig/managepollconfig.component';
import { PublishedpollsComponent } from './poll/publishedpolls/publishedpolls.component';
import { PaymentgatwayComponent } from './payment/paymentgatway/paymentgatway.component';
import { CartComponent } from './product/cart/cart.component';
import { OrdersummaryComponent } from './product/ordersummary/ordersummary.component';
import { ProductService } from './service/product.service';
import { GiftsComponent } from './gifts/gifts.component';
import { GiftsCarouselComponent } from './giftscarousel/giftscarousel.component';
import { PricefilterComponent } from './pricefilter/pricefilter.component';
import { PriceFilterPipe } from './pricefilter/filter/filter.pipe';
import { FilterComponent } from './pricefilter/filter/filter.component';
import { GenderfilterComponent } from './product/searchproduct/genderfilter/genderfilter.component';
import { FilterByBrandPipe } from './product/searchproduct/genderfilter/filterByBrand.pipe';
import { FilterByPricePipe } from './product/searchproduct/genderfilter/filterByPrice.pipe';
import { FiltersComponent } from './product/searchproduct/filters/filters.component';
import { SortFiltersComponent } from './product/searchproduct/sort-filters/sort-filters.component';
import { CategoryComponent } from './product/searchproduct/category/category.component';
import { WeddinggiftsComponent } from './product/searchproduct/weddinggifts/weddinggifts.component';
import { FilterByPipe } from './product/searchproduct/weddinggifts/filterBy';
import { ProductDetailComponent } from './product/searchproduct/product-detail/product-detail.component';
import { SafehtmlPipe } from './product/searchproduct/weddinggifts/safehtml.pipe';
import { QuantityControlComponent } from './product/ordersummary/quantity-control/quantity-control.component';
import { MatIconModule } from "@angular/material/icon";
import { CheckoutComponent } from './product/searchproduct/checkout/checkout.component';
import { RegisterComponent } from './register/index';
import { UserService } from './service/user.service';
import { LoginComponent } from './login/index';
import {  AuthenticationService } from './service/authentication.service';
import { AlertService } from './service/alert.service';
import { AlertComponent } from './_directives/index';
import { CookieService } from 'ngx-cookie-service';
import { FacebookSigninService  } from './service/facebook-signin.service';
import { AddCartService  } from './service/add-cart.service';
import {
  SocialLoginModule,
  AuthServiceConfig,

  FacebookLoginProvider,
} from "angular5-social-login";
import { ShippingaddressComponent } from './shippingaddress/shippingaddress.component';
import { EditshippingComponent } from './shippingaddress/editshipping/editshipping.component';
import { ReceiptComponent } from './shippingaddress/receipt/receipt.component';

import { AddressService } from './service/address.service';
import { HeaderComponent } from './header/header.component';
import { AddPostComponent } from './add-post/add-post.component';
import { AdminComponent } from './admin/admin.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { AddPostService } from './service/add-post.service';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { fakeBackendProvider } from './_helpers/index';


export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("961711580688174")
        }
      ]);
  // );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    ProductconfigComponent,
    ManageproductconfigComponent,
    SearchproductComponent,
    PollconfigComponent,
    ManagepollconfigComponent,
    PublishedpollsComponent,
    AlertComponent,
    PaymentgatwayComponent,
    CartComponent,
    OrdersummaryComponent,
    GiftsComponent,
    GiftsCarouselComponent,
    PricefilterComponent,
    PriceFilterPipe,
    FilterByPipe,
    FilterByBrandPipe,
    FilterByPricePipe,
    FilterComponent,
    GenderfilterComponent,
    FiltersComponent,
    SortFiltersComponent,
    CategoryComponent,
    WeddinggiftsComponent,
    ProductDetailComponent,
    SafehtmlPipe,
    QuantityControlComponent,
    CheckoutComponent,
    RegisterComponent,
    LoginComponent,
    ShippingaddressComponent,
    EditshippingComponent,
    ReceiptComponent,
    HeaderComponent,
    AddPostComponent,
    AdminComponent,
    ThankyouComponent,
    MyOrdersComponent,
    

  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    NguCarouselModule,
    NgxPaginationModule,
    HttpClientModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
    SocialLoginModule,
    AgGridModule.withComponents([]),
    NgMultiSelectDropDownModule.forRoot(),
    NgxStripeModule.forRoot('***your-stripe-publishable key***'),
  ],
  exports:[
    QuantityControlComponent,
    MaterialModule
  ],
  providers: [ProductService,AddPostService,fakeBackendProvider, UserService,AuthenticationService,AlertService,CookieService,FacebookSigninService,AddressService,AddCartService,
  
  {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }
  ],
  bootstrap: [AppComponent]
})





export class AppModule {



 }



