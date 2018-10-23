import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductconfigComponent } from './product/productconfig/productconfig.component';
import { ManageproductconfigComponent } from './product/manageproductconfig/manageproductconfig.component';
import { SearchproductComponent } from './product/searchproduct/searchproduct.component';
import { PollconfigComponent } from './poll/pollconfig/pollconfig.component';
import { ManagepollconfigComponent } from './poll/managepollconfig/managepollconfig.component';
import { PublishedpollsComponent } from './poll/publishedpolls/publishedpolls.component';
import { OrdersummaryComponent } from './product/ordersummary/ordersummary.component';
import { PaymentgatwayComponent } from './payment/paymentgatway/paymentgatway.component';
import { GiftsComponent } from './gifts/gifts.component';
import { GiftsCarouselComponent } from './giftscarousel/giftscarousel.component';
import { PricefilterComponent } from './pricefilter/pricefilter.component';
import { CategoryComponent } from './product/searchproduct/category/category.component';
import { WeddinggiftsComponent } from './product/searchproduct/weddinggifts/weddinggifts.component';
import { ProductDetailComponent } from './product/searchproduct/product-detail/product-detail.component';
import { CheckoutComponent } from './product/searchproduct/checkout/checkout.component';
import { RegisterComponent } from './register/index';
import { LoginComponent } from './login/index';
import { ShippingaddressComponent } from './shippingaddress/shippingaddress.component';
import { EditshippingComponent } from './shippingaddress/editshipping/editshipping.component';
import { ReceiptComponent } from './shippingaddress/receipt/receipt.component';
import { HeaderComponent } from './header/header.component';
import { AddPostComponent } from './add-post/add-post.component';
import { AdminComponent } from './admin/admin.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/gifts', pathMatch: 'full' },
  { path: 'productconfig', component: ProductconfigComponent },
  { path: 'ProductDetailComponent/:id',component: ProductDetailComponent },
  { path: 'manageproductconfig', component: ManageproductconfigComponent },
  { path: 'searchproduct', component: SearchproductComponent },
  { path: 'pollconfigcreate', component: PollconfigComponent },
  { path: 'pollconfigupdate', component: PollconfigComponent },
  { path: 'managepollconfig', component: ManagepollconfigComponent },
  { path: 'publishedpolls', component: PublishedpollsComponent },
  { path: 'ordersummary', component: OrdersummaryComponent },
  { path: 'paymentgatway', component: PaymentgatwayComponent },
  { path: 'gifts', component: GiftsComponent },
  { path: 'giftscarousel', component: GiftsCarouselComponent },
  { path: 'pricefilter', component: PricefilterComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'weddinggifts', component: WeddinggiftsComponent },
  { path: 'CheckoutComponent', component:CheckoutComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'shippingaddress', component : ShippingaddressComponent },
  { path: 'editshipping', component : EditshippingComponent },
  { path: 'receipt', component : ReceiptComponent },
  { path : 'header', component: HeaderComponent},
  { path : 'admin', component: AdminComponent},
  { path : 'add-post', component: AddPostComponent},
  { path : 'thankyou', component: ThankyouComponent},
  { path : 'my-orders', component : MyOrdersComponent}
  
      



];

export const AppRoutingModule = RouterModule.forRoot(appRoutes, { useHash: true });

