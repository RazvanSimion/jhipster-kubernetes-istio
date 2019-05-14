import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { UiSharedModule } from 'app/shared';
import {
  MeetingRoomComponent,
  MeetingRoomDetailComponent,
  MeetingRoomUpdateComponent,
  MeetingRoomDeletePopupComponent,
  MeetingRoomDeleteDialogComponent,
  meetingRoomRoute,
  meetingRoomPopupRoute
} from './';

const ENTITY_STATES = [...meetingRoomRoute, ...meetingRoomPopupRoute];

@NgModule({
  imports: [UiSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MeetingRoomComponent,
    MeetingRoomDetailComponent,
    MeetingRoomUpdateComponent,
    MeetingRoomDeleteDialogComponent,
    MeetingRoomDeletePopupComponent
  ],
  entryComponents: [MeetingRoomComponent, MeetingRoomUpdateComponent, MeetingRoomDeleteDialogComponent, MeetingRoomDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MeetingMeetingRoomModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
