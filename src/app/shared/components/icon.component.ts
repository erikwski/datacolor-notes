import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'notes-icon',
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault],
  template: `
    <ng-container [ngSwitch]="icon">
      <svg
        *ngSwitchCase="'toggle'"
        [class]="getClass()"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path
          d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"
        />
      </svg>
      <svg
        *ngSwitchCase="'write'"
        [class]="getClass()"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path
          d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
        />
        <path
          fill-rule="evenodd"
          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
        />
      </svg>
    </ng-container>
  `,
  styles: `
    svg{
      &.icon-sm{
        width: 24px;
        height: 24px;
      }

      &.icon-md{
        width: 32px;
        height: 32px;
      }

      &.icon-lg{
        width: 40px;
        height: 40px;
      }

      &.icon-xl{
        width: 64px;
        height: 64px;
      }
    }
  `,
})
export class IconComponent {
  /** Icon key, if not exist render a default icon */
  @Input({ required: true }) icon!: string;

  /** Set the width and height of svg, if setted to 'default' get the original svg size */
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' | 'default' = 'md';

  getClass() {
    return `icon-${this.size}`;
  }
}
