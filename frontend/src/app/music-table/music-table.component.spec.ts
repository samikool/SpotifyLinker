import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicTableComponent } from './music-table.component';

describe('MusicTableComponent', () => {
  let component: MusicTableComponent;
  let fixture: ComponentFixture<MusicTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
