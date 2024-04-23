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

/**
 * @Description
 * Editable element where the user can write as a textarea and reactive form compatible
 */
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
      class="content-editable content-editable-{{
        scrollable && 'scrollable'
      }} outline-none mb-4 h-full"
      [class.overflow-y-auto]="scrollable"
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
    @if(isViewInit && showPlaceholder()){
    <span class="absolute top-0 left-1 opacity-40 -z-10 truncate"
      >{{ placeholder }}
    </span>
    }
  `,
  styles: `
    :host{
      @apply relative;

      .content-editable.content-editable-scrollable{
        @apply max-h-[2em] pr-2;
      }
    }
  `,
})
export class EditableComponent implements AfterViewInit, ControlValueAccessor {
  /** Viewchild to content written as contenteditable */
  @ViewChild('textContainer') textContainer!: ElementRef<HTMLElement>;
  /** Text show if element is not focused and empty */
  @Input() placeholder: string = '';
  /** Set a max-height and after the div will be scrollable */
  @Input() scrollable = false;
  /** When rendered, get the focus of the page */
  @Input() focusOnViewInit = false;
  // Manage form component attributes
  @Input() value: any;
  /** maxLength of the text, if null the limit will not be setted */
  @Input() maxLength: number | null = null;
  @Output() valueChange = new EventEmitter<any>();
  /** Is the element focus */
  inputFocus = false;
  /** After the afterViewInit will be setted to true */
  isViewInit = false;
  /** Get the first value from reactiveForm and set after the view init */
  startValueFromForm: string | null = null;
  /** Change detection manually after the view init */
  cdr = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
    this.isViewInit = true;
    if (this.startValueFromForm) {
      this.writeValue(this.startValueFromForm);
      this.startValueFromForm = null;
    }
    if (this.focusOnViewInit) {
      // Set the cursor at the end of the content and focus
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(this.textContainer.nativeElement);
      range.collapse(false); // Set the range to the end
      selection?.removeAllRanges();
      selection?.addRange(range);
      this.textContainer.nativeElement.focus();
    }
    this.cdr.detectChanges();
  }

  /** Get the text of the contenteditable using viewchild */
  get textContext() {
    return this.textContainer?.nativeElement.textContent ?? '';
  }

  /** Return true if input is not in focus and is empty */
  showPlaceholder(): boolean {
    return !this.textContext.length && !this.inputFocus;
  }

  /** keyup event use for update formControl value */
  inputKeyUp(e: KeyboardEvent) {
    this.updateText((e.target as HTMLElement)?.innerText || '');
  }

  /** on paste, prevent the direct paste but parse the value for prevent HTML inside the contenteditable */
  onPaste(e: any) {
    e.preventDefault();

    const clipboardData = e.clipboardData || window.Clipboard;
    const pastedText = clipboardData.getData('text/plain');

    try {
      onPasteOnEl(e.target, pastedText);
    } catch (error) {
      console.error('Error on parse the pasted text', error);
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
