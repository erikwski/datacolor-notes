import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  forwardRef,
  inject,
} from '@angular/core';
import { onPasteOnEl } from '../../shared/utils/onPaste';
import { NgIf } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'notes-editable',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditableComponent),
      multi: true,
    },
  ],
  template: `
    <div
      class="outline-none mb-4 h-full"
      (paste)="onPaste($event)"
      (keyup)="inputKeyUp($event)"
      contenteditable="true"
      role="textbox"
      (focus)="inputFocus = true"
      (focusout)="inputFocus = false"
      #textContainer
    >
      <ng-content></ng-content>
    </div>
    <span
      *ngIf="isViewInit && showPlaceholder()"
      class="absolute top-0 left-1 opacity-40 -z-10 block text-ellipsis whitespace-nowrap overflow-hidden w-full"
      >{{ placeholder }}
    </span>
  `,
  styles: `
    :host{
      @apply relative;
    }
  `,
})
export class EditableComponent implements AfterViewInit, ControlValueAccessor {
  @ViewChild('textContainer') textContainer!: ElementRef<HTMLElement>;
  @Input() placeholder: string = '';
  // Manage form component attributes
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();
  inputFocus = false;
  isViewInit = false;
  startValueFromForm: string | null = null;
  cdr = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
    this.isViewInit = true;
    if (this.startValueFromForm) {
      this.writeValue(this.startValueFromForm);
      this.startValueFromForm = null;
    }
    this.cdr.detectChanges();
  }

  get textContext() {
    return this.textContainer?.nativeElement.textContent ?? '';
  }

  showPlaceholder(): boolean {
    return !this.textContext.length && !this.inputFocus;
  }

  inputKeyUp(e: KeyboardEvent) {
    this.updateText((e.target as HTMLElement)?.innerText || '');
  }

  onPaste(e: any) {
    e.preventDefault();

    const clipboardData = e.clipboardData || window.Clipboard;
    const pastedText = clipboardData.getData('text/plain');

    try {
      onPasteOnEl(e.target, pastedText);
    } catch (error) {
      console.error("Errore nel parse del testo pre paste sull'input", error);
    }
  }

  // Manage form component methods
  private onChange = (fn: any) => {};
  private onTouched = (fn: any) => {};

  updateText(text: string) {
    this.onChange(text);
    this.valueChange.emit(text);
  }

  writeValue(value: any): void {
    // When the formGroup is init, view is not rendered and i'm not able to set
    // it to the element, i save it in a variable that will be setted on afterViewInit
    if (!this.isViewInit) {
      this.startValueFromForm = value;
    }
    if (this.textContainer) this.textContainer.nativeElement.innerHTML = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
