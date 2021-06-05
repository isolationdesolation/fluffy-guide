import {
    Directive,
    Input,
    Output,
    EventEmitter,
  } from "@angular/core";
  
  @Directive({
    selector: "[appPagination]",
    exportAs: "appPagination"
  })
  export class PaginationDirective  {
    @Input() pageNo = 1;
    @Input() totalPages = 1;
  
    @Output() pageChange = new EventEmitter<number>();
  
    constructor() {}
  
    get isFirst(): boolean {
      return this.pageNo === 1;
    }
  
    get isLast(): boolean {
      return this.pageNo === this.totalPages;
    }
  
    first() {
      this.setPage(1);
    }
  
    prev() {
      this.setPage(Math.max(1, this.pageNo - 1));
    }
  
    next() {
      this.setPage(Math.min(this.totalPages, this.pageNo + 1));
    }
  
    last() {
      this.setPage(this.totalPages);
    }
  
    private setPage(val: number) {
      this.pageNo = val;
      this.pageChange.emit(this.pageNo);
    }
  
  }