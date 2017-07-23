webpackJsonp([3],{307:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),t.d(e,"sources",function(){return a});var a=[{filename:"component.ts",contents:t(754)},{filename:"template.html",contents:t(755)},{filename:"styles.css",contents:t(756)},{filename:"module.ts",contents:t(757)}]},754:function(n,e){n.exports="import {\n  Component,\n  ChangeDetectionStrategy,\n  ViewChild,\n  TemplateRef\n} from '@angular/core';\nimport {\n  startOfDay,\n  endOfDay,\n  subDays,\n  addDays,\n  endOfMonth,\n  isSameDay,\n  isSameMonth,\n  addHours\n} from 'date-fns';\nimport { Subject } from 'rxjs/Subject';\nimport { NgbModal } from '@ng-bootstrap/ng-bootstrap';\nimport {\n  CalendarEvent,\n  CalendarEventAction,\n  CalendarEventTimesChangedEvent\n} from 'angular-calendar';\n\nconst colors: any = {\n  red: {\n    primary: '#ad2121',\n    secondary: '#FAE3E3'\n  },\n  blue: {\n    primary: '#1e90ff',\n    secondary: '#D1E8FF'\n  },\n  yellow: {\n    primary: '#e3bc08',\n    secondary: '#FDF1BA'\n  }\n};\n\n@Component({\n  selector: 'mwl-demo-component',\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  styleUrls: ['styles.css'],\n  templateUrl: 'template.html'\n})\nexport class DemoComponent {\n  @ViewChild('modalContent') modalContent: TemplateRef<any>;\n\n  view: string = 'month';\n\n  viewDate: Date = new Date();\n\n  modalData: {\n    action: string;\n    event: CalendarEvent;\n  };\n\n  actions: CalendarEventAction[] = [\n    {\n      label: '<i class=\"fa fa-fw fa-pencil\"></i>',\n      onClick: ({ event }: { event: CalendarEvent }): void => {\n        this.handleEvent('Edited', event);\n      }\n    },\n    {\n      label: '<i class=\"fa fa-fw fa-times\"></i>',\n      onClick: ({ event }: { event: CalendarEvent }): void => {\n        this.events = this.events.filter(iEvent => iEvent !== event);\n        this.handleEvent('Deleted', event);\n      }\n    }\n  ];\n\n  refresh: Subject<any> = new Subject();\n\n  events: CalendarEvent[] = [\n    {\n      start: subDays(startOfDay(new Date()), 1),\n      end: addDays(new Date(), 1),\n      title: 'A 3 day event',\n      color: colors.red,\n      actions: this.actions\n    },\n    {\n      start: startOfDay(new Date()),\n      title: 'An event with no end date',\n      color: colors.yellow,\n      actions: this.actions\n    },\n    {\n      start: subDays(endOfMonth(new Date()), 3),\n      end: addDays(endOfMonth(new Date()), 3),\n      title: 'A long event that spans 2 months',\n      color: colors.blue\n    },\n    {\n      start: addHours(startOfDay(new Date()), 2),\n      end: new Date(),\n      title: 'A draggable and resizable event',\n      color: colors.yellow,\n      actions: this.actions,\n      resizable: {\n        beforeStart: true,\n        afterEnd: true\n      },\n      draggable: true\n    }\n  ];\n\n  activeDayIsOpen: boolean = true;\n\n  constructor(private modal: NgbModal) {}\n\n  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {\n    if (isSameMonth(date, this.viewDate)) {\n      if (\n        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||\n        events.length === 0\n      ) {\n        this.activeDayIsOpen = false;\n      } else {\n        this.activeDayIsOpen = true;\n        this.viewDate = date;\n      }\n    }\n  }\n\n  eventTimesChanged({\n    event,\n    newStart,\n    newEnd\n  }: CalendarEventTimesChangedEvent): void {\n    event.start = newStart;\n    event.end = newEnd;\n    this.handleEvent('Dropped or resized', event);\n    this.refresh.next();\n  }\n\n  handleEvent(action: string, event: CalendarEvent): void {\n    this.modalData = { event, action };\n    this.modal.open(this.modalContent, { size: 'lg' });\n  }\n\n  addEvent(): void {\n    this.events.push({\n      title: 'New event',\n      start: startOfDay(new Date()),\n      end: endOfDay(new Date()),\n      color: colors.red,\n      draggable: true,\n      resizable: {\n        beforeStart: true,\n        afterEnd: true\n      }\n    });\n    this.refresh.next();\n  }\n}\n"},755:function(n,e){n.exports='<ng-template #modalContent let-close="close">\n  <div class="modal-header">\n    <h5 class="modal-title">Event action occurred</h5>\n    <button type="button" class="close" (click)="close()">\n      <span aria-hidden="true">&times;</span>\n    </button>\n  </div>\n  <div class="modal-body">\n    <div>\n      Action:\n      <pre>{{ modalData?.action }}</pre>\n    </div>\n    <div>\n      Event:\n      <pre>{{ modalData?.event | json }}</pre>\n    </div>\n  </div>\n  <div class="modal-footer">\n    <button type="button" class="btn btn-secondary" (click)="close()">OK</button>\n  </div>\n</ng-template>\n\n<div class="row text-center">\n  <div class="col-md-4">\n    <div class="btn-group">\n      <div\n        class="btn btn-primary"\n        mwlCalendarPreviousView\n        [view]="view"\n        [(viewDate)]="viewDate">\n        Previous\n      </div>\n      <div\n        class="btn btn-secondary"\n        mwlCalendarToday\n        [(viewDate)]="viewDate">\n        Today\n      </div>\n      <div\n        class="btn btn-primary"\n        mwlCalendarNextView\n        [view]="view"\n        [(viewDate)]="viewDate">\n        Next\n      </div>\n    </div>\n  </div>\n  <div class="col-md-4">\n    <h3>{{ viewDate | calendarDate:(view + \'ViewTitle\'):\'en\' }}</h3>\n  </div>\n  <div class="col-md-4">\n    <div class="btn-group">\n      <div\n        class="btn btn-primary"\n        (click)="view = \'month\'"\n        [class.active]="view === \'month\'">\n        Month\n      </div>\n      <div\n        class="btn btn-primary"\n        (click)="view = \'week\'"\n        [class.active]="view === \'week\'">\n        Week\n      </div>\n      <div\n        class="btn btn-primary"\n        (click)="view = \'day\'"\n        [class.active]="view === \'day\'">\n        Day\n      </div>\n    </div>\n  </div>\n</div>\n<br>\n<div [ngSwitch]="view">\n  <mwl-calendar-month-view\n    *ngSwitchCase="\'month\'"\n    [viewDate]="viewDate"\n    [events]="events"\n    [refresh]="refresh"\n    [activeDayIsOpen]="activeDayIsOpen"\n    (dayClicked)="dayClicked($event.day)"\n    (eventClicked)="handleEvent(\'Clicked\', $event.event)"\n    (eventTimesChanged)="eventTimesChanged($event)">\n  </mwl-calendar-month-view>\n  <mwl-calendar-week-view\n    *ngSwitchCase="\'week\'"\n    [viewDate]="viewDate"\n    [events]="events"\n    [refresh]="refresh"\n    (eventClicked)="handleEvent(\'Clicked\', $event.event)"\n    (eventTimesChanged)="eventTimesChanged($event)">\n  </mwl-calendar-week-view>\n  <mwl-calendar-day-view\n    *ngSwitchCase="\'day\'"\n    [viewDate]="viewDate"\n    [events]="events"\n    [refresh]="refresh"\n    (eventClicked)="handleEvent(\'Clicked\', $event.event)"\n    (eventTimesChanged)="eventTimesChanged($event)">\n  </mwl-calendar-day-view>\n</div>\n\n<br><br><br>\n\n<h3>\n  Edit events\n  <button\n    class="btn btn-primary pull-right"\n    (click)="addEvent()">\n    Add new\n  </button>\n  <div class="clearfix"></div>\n</h3>\n\n<table class="table table-bordered">\n\n  <thead>\n    <tr>\n      <th>Title</th>\n      <th>Primary color</th>\n      <th>Secondary color</th>\n      <th>Starts at</th>\n      <th>Ends at</th>\n      <th>Remove</th>\n    </tr>\n  </thead>\n\n  <tbody>\n    <tr *ngFor="let event of events; let index = index">\n      <td>\n        <input\n          type="text"\n          class="form-control"\n          [(ngModel)]="event.title"\n          (keyup)="refresh.next()">\n      </td>\n      <td>\n        <input\n          type="color"\n          [(ngModel)]="event.color.primary"\n          (change)="refresh.next()">\n      </td>\n      <td>\n        <input\n          type="color"\n          [(ngModel)]="event.color.secondary"\n          (change)="refresh.next()">\n      </td>\n      <td>\n        <mwl-demo-utils-date-time-picker\n          [(date)]="event.start"\n          (dateChange)="refresh.next()"\n          placeholder="Not set">\n        </mwl-demo-utils-date-time-picker>\n      </td>\n      <td>\n        <mwl-demo-utils-date-time-picker\n          [(date)]="event.end"\n          (dateChange)="refresh.next()"\n          placeholder="Not set">\n        </mwl-demo-utils-date-time-picker>\n      </td>\n      <td>\n        <button\n          class="btn btn-danger"\n          (click)="events.splice(index, 1); refresh.next()">\n          Delete\n        </button>\n      </td>\n    </tr>\n  </tbody>\n\n</table>'},756:function(n,e){n.exports="h3 {\n  margin: 0 0 10px;\n}\n\npre {\n  background-color: #f5f5f5;\n  padding: 15px;\n}"},757:function(n,e){n.exports="import { NgModule } from '@angular/core';\nimport { CommonModule } from '@angular/common';\nimport { FormsModule } from '@angular/forms';\nimport { CalendarModule } from 'angular-calendar';\nimport { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';\nimport { DemoUtilsModule } from '../demo-utils/module';\nimport { DemoComponent } from './component';\n\n@NgModule({\n  imports: [\n    CommonModule,\n    FormsModule,\n    NgbModalModule.forRoot(),\n    CalendarModule.forRoot(),\n    DemoUtilsModule\n  ],\n  declarations: [DemoComponent],\n  exports: [DemoComponent]\n})\nexport class DemoModule {}\n"}});
//# sourceMappingURL=3-d477da3b70af710bd345.js.map