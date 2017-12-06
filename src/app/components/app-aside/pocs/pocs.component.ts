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

  // TODO:  sort pocs by office
  // TODO:  search filter
  
  constructor(private pocsService: PocsService) { }

  ngOnInit() {
    this.pocs$ = this.pocsService.pocs;
  }

  addPoc(poc: Poc) {
    this.pocsService.save(poc);
  }

  updatePoc(poc: Poc) {
    this.pocsService.update(poc);
  }

  deletePoc(poc: Poc) {
    this.pocsService.delete(poc);
  }

  toggleEdit(poc: Poc) {
    this.showEdit = true;
    this.updatedPoc = poc;
  }
}
