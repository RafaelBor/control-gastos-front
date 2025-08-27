import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePassawordComponent } from './change-passaword.component';

describe('ChangePassawordComponent', () => {
  let component: ChangePassawordComponent;
  let fixture: ComponentFixture<ChangePassawordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePassawordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePassawordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
