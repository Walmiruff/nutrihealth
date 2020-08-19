import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertTimestampDatePipe } from './convert-timestamp-date.pipe';
import { RoundPipe } from './round.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [
        ConvertTimestampDatePipe,
        RoundPipe
    ],
    exports: [
        ConvertTimestampDatePipe,
        RoundPipe
    ]
})
export class SharedPipesModule { }
