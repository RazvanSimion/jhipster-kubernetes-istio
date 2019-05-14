import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { UiSharedModule } from 'app/shared';
import {
  EmployeeLeaveComponent,
  EmployeeLeaveDetailComponent,
  EmployeeLeaveUpdateComponent,
  EmployeeLeaveDeletePopupComponent,
  EmployeeLeaveDeleteDialogComponent,
  employeeLeaveRoute,
  employeeLeavePopupRoute
} from './';

const ENTITY_STATES = [...employeeLeaveRoute, ...employeeLeavePopupRoute];

@NgModule({
  imports: [UiSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EmployeeLeaveComponent,
    EmployeeLeaveDetailComponent,
    EmployeeLeaveUpdateComponent,
    EmployeeLeaveDeleteDialogComponent,
    EmployeeLeaveDeletePopupComponent
  ],
  entryComponents: [
    EmployeeLeaveComponent,
    EmployeeLeaveUpdateComponent,
    EmployeeLeaveDeleteDialogComponent,
    EmployeeLeaveDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LeaveEmployeeLeaveModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
