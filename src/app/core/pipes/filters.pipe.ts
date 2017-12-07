import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class PocsFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, filters: string[]): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    let filteredItems = [];
    items.forEach(item => {
      filters.forEach(filter => {
        if (item[filter] !== null && item[filter].toLowerCase().includes(searchText)) {
          filteredItems.push(item);
        }
      })
    })
    return filteredItems;
  }
}