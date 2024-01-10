import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customSort',
  standalone: true
})
export class CustomSortPipe implements PipeTransform {
  transform(items: any[], expressions: string[]): any[] {
    return items.sort((a, b) => {
      for (let expression of expressions) {
        let reverse = false;
        if (expression.startsWith('-')) {
          reverse = true;
          expression = expression.substring(1);
        }
        let aValue = a[expression];
        let bValue = b[expression];
        if (typeof aValue === 'string') {
          aValue = aValue.toUpperCase();
          bValue = bValue.toUpperCase();
        }
        if (aValue < bValue) {
          return reverse ? 1 : -1;
        }
        if (aValue > bValue) {
          return reverse ? -1 : 1;
        }
      }
      return 0;
    });
  }
}
