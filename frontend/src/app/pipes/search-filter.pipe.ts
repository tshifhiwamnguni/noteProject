import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(notes: any[], filterText: string): any {
    return notes ? notes.filter((item: any) => 
    item.note.search(new RegExp(filterText, 'i')) > -1) : [];
  }

}
