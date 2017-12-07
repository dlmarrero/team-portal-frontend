import { Component, OnInit } from '@angular/core';
import { Poc } from './pocs.model';
import { Observable } from 'rxjs/Observable';
import { PocsService } from './pocs.service';

@Component({
  selector: 'app-pocs',
  templateUrl: './pocs.component.html',
  styleUrls: ['./pocs.component.scss']
})
export class PocsComponent implements OnInit {
  showAdd: boolean = false;
  showEdit: boolean = false;
  pocs$: Observable<Poc[]>;
  newPoc: Poc = {
    office: undefined,
    name: undefined,
    number: undefined
  };
  updatedPoc: Poc = {
    id: undefined,
    office: undefined,
    name: undefined,
    number: undefined
  };
  searchText: string;

  // TODO:  confirmation messages
  // TODO:  fix having to click pencil twice for showEdit
  // TODO:  make tabs fill out (50% each)

  constructor(private pocsService: PocsService) { }

  ngOnInit() {
    this.pocs$ = this.pocsService.pocs
      .map(pocs => {
        return this.sortPocs(pocs);
      });
  }

  addPoc(poc: Poc) {
    this.pocsService.save(poc);
    this.showAdd = false;
  }

  updatePoc(poc: Poc) {
    this.pocsService.update(poc);
    this.showEdit = false;
  }

  deletePoc(poc: Poc) {
    this.pocsService.delete(poc);
    this.showEdit = false;
  }

  toggleEdit(poc: Poc) {
    this.showAdd = false;
    this.showEdit = true;
    this.updatedPoc = poc;
    document.getElementById("editPoc").scrollIntoView();
  }

  sortPocs(pocs: Poc[]) {
    return pocs.sort((p1, p2) => {
      if (p1.office > p2.office) {
        return 1;
      }
      else if (p1.office < p2.office) {
        return -1;
      } else {  
        return 0;
      }
    })
  }
}
