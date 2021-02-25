import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseNewProjectComponent } from './choose-new-project.component';

describe('ChooseNewProjectComponent', () => {
  let component: ChooseNewProjectComponent;
  let fixture: ComponentFixture<ChooseNewProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseNewProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseNewProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
