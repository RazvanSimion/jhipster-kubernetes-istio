import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { UiSharedModule } from 'app/shared';
import {
  LeaveRequestComponent,
  LeaveRequestDetailComponent,
  LeaveRequestUpdateComponent,
  LeaveRequestDeletePopupComponent,
  LeaveRequestDeleteDialogComponent,
  leaveRequestRoute,
  leaveRequestPopupRoute
} from './';

const ENTITY_STATES = [...leaveRequestRoute, ...leaveRequestPopupRoute];

@NgModule({
  imports: [UiSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    LeaveRequestComponent,
    LeaveRequestDetailComponent,
    LeaveRequestUpdateComponent,
    LeaveRequestDeleteDialogComponent,
    LeaveRequestDeletePopupComponent
  ],
  entryComponents: [
    LeaveRequestComponent,
    LeaveRequestUpdateComponent,
    LeaveRequestDeleteDialogComponent,
    LeaveRequestDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LeaveLeaveRequestModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
