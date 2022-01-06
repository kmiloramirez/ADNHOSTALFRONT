import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './../../services/http.service';
import { TrmService } from './../../../shared/services/trm/trm.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrmComponent } from './trm.component';
import { of } from 'rxjs';

describe('TrmComponent', () => {
  let component: TrmComponent;
  let fixture: ComponentFixture<TrmComponent>;
  let trmServico: TrmService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrmComponent ],
      imports:[ 
        HttpClientModule
      ],
      providers:[
        TrmService,
        HttpService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrmComponent);
    component = fixture.componentInstance;
    trmServico = TestBed.inject(TrmService);
    spyOn(trmServico,'consultar').and.returnValue(of(4000))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
