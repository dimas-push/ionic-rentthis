import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabRegisterPage } from './tab-register.page';

describe('TabRegisterPage', () => {
  let component: TabRegisterPage;
  let fixture: ComponentFixture<TabRegisterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
