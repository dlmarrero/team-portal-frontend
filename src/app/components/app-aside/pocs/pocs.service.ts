import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Poc } from 'app/components/app-aside/pocs/pocs.model';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';

@Injectable()
export class PocsService {
  private apiUrl = environment.apiUrl + '/api/Pocs'

  private _pocs: BehaviorSubject<Poc[]> = new BehaviorSubject<Poc[]>([]);
  public pocs: Observable<Poc[]> = this._pocs.asObservable();

  constructor(private http: HttpClient) { this.getPocs() }

  getPocs() {
    let obs = this.http.get<Poc[]>(this.apiUrl);
    obs.subscribe(pocs => this._pocs.next(pocs));
    return obs;
  }

  save(poc: Poc) {
    let pocs: Poc[] = this._pocs.getValue();
    let obs = this.http.post<Poc>(this.apiUrl, poc);
    obs.subscribe(poc => {
      pocs.push(poc);
      this._pocs.next(pocs);
    });
    return obs;
  }

  update(poc: Poc) {
    let pocs: Poc[] = this._pocs.getValue();
    let index = pocs.indexOf(poc);
    let obs = this.http.put<Poc>(this.apiUrl + `/${poc.id}`, poc);
    obs.subscribe(poc => {
      pocs[index] = poc;
      this._pocs.next(pocs);
    });
    return obs;
  }

  delete(poc: Poc) {
    let obs = this.http.delete<Poc>(this.apiUrl + `/${poc.id}`);
    obs.subscribe(poc => {
      this._pocs.next(this._pocs.getValue().filter(iPoc => iPoc !== poc));
    });
    return obs;
  }

}
