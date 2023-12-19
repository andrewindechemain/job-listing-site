import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchOptions',
  standalone: true
})
export class SearchOptionsPipe implements PipeTransform {
  
  transform (items: any [], filter: string): any[]  {
    if (!items || !filter || filter === 'all') {
      return items;
    }
    const sort: any = {
      location: 'all',
      date: 'all',
      type: 'all',
      relevance: 'all'
    };
    return items.sort ( (a, b) => {
      if (sort.location !== 'all') {
        if (a.location.display_name < b.location.display_name) {
          return -1;
        }
        if (a.location.display_name > b.location.display_name) {
          return 1;
        }
      }
      if (sort.date !== 'all') {
        if (a.created < b.created) {
          return -1;
        }
        if (a.created > b.created) {
          return 1;
        }
      }
      if (sort.type !== 'all') {
        if (a.type < b.type) {
          return -1;
        }
        if (a.type > b.type) {
          return 1;
        }
      }
      if (sort.relevance !== 'all') {
        if (a.relevance < b.relevance) {
          return -1;
        }
        if (a.relevance > b.relevance) {
          return 1;
        }
      }
      return 0;
    });
  }

  }
