import { Pipe, PipeTransform } from '@angular/core';
import { List } from '@shared/models/list';

@Pipe({
  name: 'listConnectTo',
})
export class ListConnectToPipe implements PipeTransform {
  transform(lists: List[], idCurrentList: string): string[] {
    const newLists: List[] = lists.filter(
      (_list) => _list.id !== idCurrentList
    );

    if (!newLists) return [];

    return newLists.map((_list) => _list.id);
  }
}
