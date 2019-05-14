import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IParticipant } from 'app/shared/model/meeting/participant.model';

@Component({
  selector: 'jhi-participant-detail',
  templateUrl: './participant-detail.component.html'
})
export class ParticipantDetailComponent implements OnInit {
  participant: IParticipant;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ participant }) => {
      this.participant = participant;
    });
  }

  previousState() {
    window.history.back();
  }
}
