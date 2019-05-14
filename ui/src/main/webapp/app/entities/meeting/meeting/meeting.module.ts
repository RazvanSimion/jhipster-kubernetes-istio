import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { UiSharedModule } from 'app/shared';
import {
  MeetingComponent,
  MeetingDetailComponent,
  MeetingUpdateComponent,
  MeetingDeletePopupComponent,
  MeetingDeleteDialogComponent,
  meetingRoute,
  meetingPopupRoute
} from './';

const ENTITY_STATES = [...meetingRoute, ...meetingPopupRoute];

@NgModule({
  imports: [UiSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MeetingComponent,
    MeetingDetailComponent,
    MeetingUpdateComponent,
    MeetingDeleteDialogComponent,
    MeetingDeletePopupComponent
  ],
  entryComponents: [MeetingComponent, MeetingUpdateComponent, MeetingDeleteDialogComponent, MeetingDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MeetingMeetingModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
