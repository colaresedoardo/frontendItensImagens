import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadItemComponent } from './cad-item.component';

describe('CadItemComponent', () => {
  let component: CadItemComponent;
  let fixture: ComponentFixture<CadItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
