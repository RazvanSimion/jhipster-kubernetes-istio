import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'employee',
        loadChildren: './organization/employee/employee.module#OrganizationEmployeeModule'
      },
      {
        path: 'department',
        loadChildren: './organization/department/department.module#OrganizationDepartmentModule'
      },
      {
        path: 'employee-leave',
        loadChildren: './leave/employee-leave/employee-leave.module#LeaveEmployeeLeaveModule'
      },
      {
        path: 'leave-request',
        loadChildren: './leave/leave-request/leave-request.module#LeaveLeaveRequestModule'
      },
      {
        path: 'notification',
        loadChildren: './notification/notification/notification.module#NotificationNotificationModule'
      },
      {
        path: 'meeting-room',
        loadChildren: './meeting/meeting-room/meeting-room.module#MeetingMeetingRoomModule'
      },
      {
        path: 'participant',
        loadChildren: './meeting/participant/participant.module#MeetingParticipantModule'
      },
      {
        path: 'meeting',
        loadChildren: './meeting/meeting/meeting.module#MeetingMeetingModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UiEntityModule {}
