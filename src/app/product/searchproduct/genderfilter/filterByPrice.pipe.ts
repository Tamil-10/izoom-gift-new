import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterByPrice"
})
export class FilterByPricePipe implements PipeTransform {

    transform(items: any, select?: any): any {
    if (select !== "Below 100") {
      return select
        ? items.filter(item => item.price <= 100  === select)
        : items;
    } else {
      return items;
    } 
    
    
    /*transform(items: any, select:any):any{
    switch (select) {
      case Below 100:
        return "UN_PUBLISH";
      case 2:
        return "PUBLISH";
      default:
        return status
    }
  } */
  } 
    /* if (select !== "Below 100") {
      return select
        ? items.filter(item => (item.price <= 100) === select)
        : items;
    } else {
      return items;
    } */
    /* transform(opt: any, selectedPrice?: any): any {
        console.log('sel', selectedPrice);
        return (opt || opt === '0') ? opt.filter(sal => { return sal.price <= 100 == selectedPrice }) : opt;
    } */
    
   /* transform(list, minPrice: number | undefined, maxPrice:number | undefined) {
        // ES6 array destructuring
        let filter_list = list;
        if (minPrice) {
          filter_list = filter_list.filter(_item => {
            return _item.price >= +minPrice;
          });
        } 
        
        if (maxPrice) {
          filter_list = filter_list.filter(_item => {
            return _item.price <= +maxPrice;
          });
        }
        return  filter_list;
      } */
   
   /* 
    transform(value, args?) {
    // ES6 array destructuring
    let [minAge] = args;
    return value.filter(person => {
      return person.age >= +minAge;
    });
  }
    */
    /* transform(items: any, select?: any): any {
    if (select !== "Below 100") {
      return select
        ? items.filter(item => item["price"] === select)
        : items;
    } else {
      return items;
    }
  } */
}