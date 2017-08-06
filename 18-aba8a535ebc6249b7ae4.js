webpackJsonp([18],{302:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),t.d(n,"sources",function(){return o});var o=[{filename:"component.ts",contents:t(738)},{filename:"template.html",contents:t(739)},{filename:"module.ts",contents:t(740)}]},738:function(e,n){e.exports="import { Component, ChangeDetectionStrategy } from '@angular/core';\nimport { CalendarEvent } from 'angular-calendar';\nimport { colors } from '../demo-utils/colors';\n\n@Component({\n  selector: 'mwl-demo-component',\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  templateUrl: 'template.html'\n})\nexport class DemoComponent {\n  view: string = 'month';\n\n  viewDate: Date = new Date();\n\n  events: CalendarEvent[] = [\n    {\n      title: 'Editable event',\n      color: colors.yellow,\n      start: new Date(),\n      actions: [\n        {\n          label: '<i class=\"fa fa-fw fa-pencil\"></i>',\n          onClick: ({ event }: { event: CalendarEvent }): void => {\n            console.log('Edit event', event);\n          }\n        }\n      ]\n    },\n    {\n      title: 'Deletable event',\n      color: colors.blue,\n      start: new Date(),\n      actions: [\n        {\n          label: '<i class=\"fa fa-fw fa-times\"></i>',\n          onClick: ({ event }: { event: CalendarEvent }): void => {\n            this.events = this.events.filter(iEvent => iEvent !== event);\n            console.log('Event deleted', event);\n          }\n        }\n      ]\n    },\n    {\n      title: 'Non editable and deletable event',\n      color: colors.red,\n      start: new Date()\n    }\n  ];\n}\n"},739:function(e,n){e.exports='<mwl-demo-utils-calendar-header\n  [(view)]="view"\n  [(viewDate)]="viewDate">\n</mwl-demo-utils-calendar-header>\n\n<div [ngSwitch]="view">\n  <mwl-calendar-month-view\n    *ngSwitchCase="\'month\'"\n    [viewDate]="viewDate"\n    [events]="events"\n    [activeDayIsOpen]="true">\n  </mwl-calendar-month-view>\n  <mwl-calendar-week-view\n    *ngSwitchCase="\'week\'"\n    [viewDate]="viewDate"\n    [events]="events">\n  </mwl-calendar-week-view>\n  <mwl-calendar-day-view\n    *ngSwitchCase="\'day\'"\n    [viewDate]="viewDate"\n    [events]="events">\n  </mwl-calendar-day-view>\n</div>'},740:function(e,n){e.exports="import { NgModule } from '@angular/core';\nimport { CommonModule } from '@angular/common';\nimport { RouterModule } from '@angular/router';\nimport { CalendarModule } from 'angular-calendar';\nimport { DemoUtilsModule } from '../demo-utils/module';\nimport { DemoComponent } from './component';\n\n@NgModule({\n  imports: [\n    CommonModule,\n    CalendarModule.forRoot(),\n    DemoUtilsModule,\n    RouterModule.forChild([{ path: '', component: DemoComponent }])\n  ],\n  declarations: [DemoComponent],\n  exports: [DemoComponent]\n})\nexport class DemoModule {}\n"}});
//# sourceMappingURL=18-aba8a535ebc6249b7ae4.js.map