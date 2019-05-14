import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { UiSharedModule } from 'app/shared';
import {
  ParticipantComponent,
  ParticipantDetailComponent,
  ParticipantUpdateComponent,
  ParticipantDeletePopupComponent,
  ParticipantDeleteDialogComponent,
  participantRoute,
  participantPopupRoute
} from './';

const ENTITY_STATES = [...participantRoute, ...participantPopupRoute];

@NgModule({
  imports: [UiSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ParticipantComponent,
    ParticipantDetailComponent,
    ParticipantUpdateComponent,
    ParticipantDeleteDialogComponent,
    ParticipantDeletePopupComponent
  ],
  entryComponents: [ParticipantComponent, ParticipantUpdateComponent, ParticipantDeleteDialogComponent, ParticipantDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MeetingParticipantModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
