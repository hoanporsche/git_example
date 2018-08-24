import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[infiniteScroll]',
})
export class InfiniteScrollDirective {

  @Input() scrollThreshold = 5; // px

  constructor(private element: ElementRef) {}

  @Input('infiniteScroll') loadMore;

  @HostListener('scroll')
  public onScroll() {
    const scrolled = this.element.nativeElement.scrollTop;
    const height = this.element.nativeElement.offsetHeight;
    console.log("scrolled", scrolled);
    console.log("height", height);

    // if we have reached the threshold and we scroll down
    if (height - scrolled < this.scrollThreshold) {
      this.loadMore();
    }

  }

}
