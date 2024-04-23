import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component, Input } from '@angular/core';

/**
 * @Description
 * Custom icon component that accept icon name and render an svg
 */
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
      <svg
        *ngSwitchCase="'cancel'"
        [class]="getClass()"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
        />
      </svg>
      <svg
        *ngSwitchCase="'italian'"
        [class]="getClass()"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path fill="#fff" d="M10 4H22V28H10z"></path>
        <path
          d="M5,4h6V28H5c-2.208,0-4-1.792-4-4V8c0-2.208,1.792-4,4-4Z"
          fill="#41914d"
        ></path>
        <path
          d="M25,4h6V28h-6c-2.208,0-4-1.792-4-4V8c0-2.208,1.792-4,4-4Z"
          transform="rotate(180 26 16)"
          fill="#bf393b"
        ></path>
        <path
          d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
          opacity=".15"
        ></path>
        <path
          d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
          fill="#fff"
          opacity=".2"
        ></path>
      </svg>
      <svg
        *ngSwitchCase="'delete'"
        [class]="getClass()"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-trash3"
        viewBox="0 0 16 16"
      >
        <path
          d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
        />
      </svg>
      <svg
        *ngSwitchCase="'english'"
        [class]="getClass()"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <rect
          x="1"
          y="4"
          width="30"
          height="24"
          rx="4"
          ry="4"
          fill="#071b65"
        ></rect>
        <path
          d="M5.101,4h-.101c-1.981,0-3.615,1.444-3.933,3.334L26.899,28h.101c1.981,0,3.615-1.444,3.933-3.334L5.101,4Z"
          fill="#fff"
        ></path>
        <path
          d="M22.25,19h-2.5l9.934,7.947c.387-.353,.704-.777,.929-1.257l-8.363-6.691Z"
          fill="#b92932"
        ></path>
        <path
          d="M1.387,6.309l8.363,6.691h2.5L2.316,5.053c-.387,.353-.704,.777-.929,1.257Z"
          fill="#b92932"
        ></path>
        <path
          d="M5,28h.101L30.933,7.334c-.318-1.891-1.952-3.334-3.933-3.334h-.101L1.067,24.666c.318,1.891,1.952,3.334,3.933,3.334Z"
          fill="#fff"
        ></path>
        <rect x="13" y="4" width="6" height="24" fill="#fff"></rect>
        <rect x="1" y="13" width="30" height="6" fill="#fff"></rect>
        <rect x="14" y="4" width="4" height="24" fill="#b92932"></rect>
        <rect
          x="14"
          y="1"
          width="4"
          height="30"
          transform="translate(32) rotate(90)"
          fill="#b92932"
        ></rect>
        <path
          d="M28.222,4.21l-9.222,7.376v1.414h.75l9.943-7.94c-.419-.384-.918-.671-1.471-.85Z"
          fill="#b92932"
        ></path>
        <path
          d="M2.328,26.957c.414,.374,.904,.656,1.447,.832l9.225-7.38v-1.408h-.75L2.328,26.957Z"
          fill="#b92932"
        ></path>
        <path
          d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
          opacity=".15"
        ></path>
        <path
          d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
          fill="#fff"
          opacity=".2"
        ></path>
      </svg>
      <svg
        *ngSwitchDefault
        [class]="getClass()"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_17_4)">
          <path
            d="M43 48H5C2.243 48 0 45.757 0 43V5C0 2.243 2.243 0 5 0H43C45.757 0 48 2.243 48 5V43C48 45.757 45.757 48 43 48ZM5 2C3.346 2 2 3.346 2 5V43C2 44.654 3.346 46 5 46H43C44.654 46 46 44.654 46 43V5C46 3.346 44.654 2 43 2H5Z"
            fill="currentColor"
          />
          <path
            d="M47 10H1C0.448 10 0 9.553 0 9C0 8.447 0.448 8 1 8H47C47.552 8 48 8.447 48 9C48 9.553 47.552 10 47 10ZM6 6C5.87 6 5.74 5.97 5.62 5.92C5.5 5.87 5.39 5.8 5.29 5.71C5.2 5.609 5.13 5.5 5.08 5.38C5.03 5.26 5 5.13 5 5C5 4.87 5.03 4.74 5.08 4.62C5.13 4.5 5.2 4.39 5.29 4.29C5.39 4.2 5.5 4.13 5.62 4.08C5.99 3.92 6.43 4.01 6.71 4.29C6.8 4.39 6.87 4.5 6.92 4.62C6.97 4.74 7 4.87 7 5C7 5.13 6.97 5.26 6.92 5.38C6.87 5.5 6.8 5.609 6.71 5.71C6.61 5.8 6.5 5.87 6.38 5.92C6.26 5.97 6.13 6 6 6ZM10 6C9.87 6 9.74 5.97 9.62 5.92C9.5 5.87 9.39 5.8 9.29 5.71C9.2 5.609 9.13 5.5 9.08 5.38C9.03 5.26 9 5.13 9 5C9 4.87 9.03 4.74 9.08 4.62C9.13 4.5 9.2 4.39 9.29 4.29C9.39 4.2 9.5 4.13 9.62 4.08C9.99 3.92 10.43 4.01 10.71 4.29C10.8 4.39 10.87 4.5 10.92 4.62C10.97 4.74 11 4.87 11 5C11 5.13 10.97 5.26 10.92 5.38C10.87 5.5 10.8 5.609 10.71 5.71C10.61 5.8 10.5 5.87 10.38 5.92C10.26 5.97 10.13 6 10 6ZM36 35H12C11.448 35 11 34.553 11 34C11 33.447 11.448 33 12 33H36C36.552 33 37 33.447 37 34C37 34.553 36.552 35 36 35ZM33 39H15C14.448 39 14 38.553 14 38C14 37.447 14.448 37 15 37H33C33.552 37 34 37.447 34 38C34 38.553 33.552 39 33 39ZM25 31H23C21.346 31 20 29.654 20 28V20C20 18.346 21.346 17 23 17H25C26.654 17 28 18.346 28 20V28C28 29.654 26.654 31 25 31ZM23 19C22.449 19 22 19.448 22 20V28C22 28.552 22.449 29 23 29H25C25.551 29 26 28.552 26 28V20C26 19.448 25.551 19 25 19H23ZM17 27H11C10.672 27 10.365 26.839 10.178 26.569C9.991 26.299 9.949 25.956 10.063 25.648L13.063 17.648C13.258 17.131 13.834 16.873 14.351 17.063C14.868 17.257 15.13 17.834 14.936 18.351L12.443 25H17C17.552 25 18 25.447 18 26C18 26.553 17.552 27 17 27Z"
            fill="currentColor"
          />
          <path
            d="M16 31C15.448 31 15 30.553 15 30V22C15 21.447 15.448 21 16 21C16.552 21 17 21.447 17 22V30C17 30.553 16.552 31 16 31ZM37 27H31C30.672 27 30.365 26.839 30.178 26.569C29.991 26.299 29.949 25.956 30.063 25.648L33.063 17.648C33.258 17.131 33.834 16.873 34.351 17.063C34.868 17.257 35.13 17.834 34.936 18.351L32.443 25H37C37.552 25 38 25.447 38 26C38 26.553 37.552 27 37 27Z"
            fill="currentColor"
          />
          <path
            d="M36 31C35.448 31 35 30.553 35 30V22C35 21.447 35.448 21 36 21C36.552 21 37 21.447 37 22V30C37 30.553 36.552 31 36 31Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_17_4">
            <rect width="48" height="48" fill="currentColor" />
          </clipPath>
        </defs>
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

  /** Classlist of the icon generate dinamically */
  getClass() {
    return `icon-${this.size}`;
  }
}
