import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthcallbackComponent } from './authcallback.component';

describe('AuthcallbackComponent', () => {
  let component: AuthcallbackComponent;
  let fixture: ComponentFixture<AuthcallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthcallbackComponent ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthcallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
