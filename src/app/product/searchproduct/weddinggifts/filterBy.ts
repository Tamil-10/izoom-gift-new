import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterBy'
})

@Injectable()
export class FilterByPipe implements PipeTransform {
    // transform( array: Array<any>, filterField: string, filterValue: string ): Array<any> {
    //     if (!array) return [];
    //     return array.filter(item => item.indexOf[filterField] == filterValue);
    // }


    // transform(value:string, [separator]):string {
    //     let splits = value.split(separator);
    //     if(splits.length > 1) {
    //       return splits.pop();
    //     } else {
    //       return '';
    //     }
    //   }
    transform(value: any, args?: any): any {
    
        if(value.length === null){
            return value;
        }
        
        // Remove the duplicate elements
        let uniqueArray = value.filter(function (el, index, array) { 
          return array.indexOf (el) == index;
        });
        
        // Loop the array with uniq elements
        let resultArray = [];
        for(let item of uniqueArray)
        {
            // Validate only these elements that starts with the passed string
            if(item.match("^"+args[0]))
            {
              resultArray.push(item);
            }
        }
        return resultArray;
      }

    // transform(val:string, params:string[]):string[] {
    //     return val.split(params[0]);
    //   }
}