import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertTimestampDatePipe } from './convert-timestamp-date/convert-timestamp-date.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [ConvertTimestampDatePipe],
    exports: [ConvertTimestampDatePipe]
})
export class SharedPipesModule { }
