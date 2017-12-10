import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PocsComponent } from './pocs.component';
import { FormsModule } from '@angular/forms';
import { ObjectFilterPipe } from 'app/core/pipes/object-filter.pipe';
import { PocsService } from 'app/components/app-aside/pocs/pocs.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PocsComponent', () => {
  let component: PocsComponent;
  let fixture: ComponentFixture<PocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, HttpClientTestingModule],
      declarations: [PocsComponent, ObjectFilterPipe],
      providers: [PocsService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
