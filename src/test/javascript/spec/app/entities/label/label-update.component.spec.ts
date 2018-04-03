/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterHazelcastSampleApplicationTestModule } from '../../../test.module';
import { LabelUpdateComponent } from 'app/entities/label/label-update.component';
import { LabelService } from 'app/entities/label/label.service';
import { Label } from 'app/shared/model/label.model';

import { OperationService } from 'app/entities/operation';

describe('Component Tests', () => {
  describe('Label Management Update Component', () => {
    let comp: LabelUpdateComponent;
    let fixture: ComponentFixture<LabelUpdateComponent>;
    let service: LabelService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterHazelcastSampleApplicationTestModule],
        declarations: [LabelUpdateComponent],
        providers: [OperationService, LabelService]
      })
        .overrideTemplate(LabelUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LabelUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LabelService);
    });

    describe('save', () => {
      it(
        'Should call update service on save for existing entity',
        fakeAsync(() => {
          // GIVEN
          const entity = new Label(123);
          spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
          comp.label = entity;
          // WHEN
          comp.save();
          tick(); // simulate async

          // THEN
          expect(service.update).toHaveBeenCalledWith(entity);
          expect(comp.isSaving).toEqual(false);
        })
      );

      it(
        'Should call create service on save for new entity',
        fakeAsync(() => {
          // GIVEN
          const entity = new Label();
          spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
          comp.label = entity;
          // WHEN
          comp.save();
          tick(); // simulate async

          // THEN
          expect(service.create).toHaveBeenCalledWith(entity);
          expect(comp.isSaving).toEqual(false);
        })
      );
    });
  });
});
