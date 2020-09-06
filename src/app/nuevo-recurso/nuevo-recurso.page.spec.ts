import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NuevoRecursoPage } from './nuevo-recurso.page';

describe('NuevoRecursoPage', () => {
  let component: NuevoRecursoPage;
  let fixture: ComponentFixture<NuevoRecursoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoRecursoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NuevoRecursoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
