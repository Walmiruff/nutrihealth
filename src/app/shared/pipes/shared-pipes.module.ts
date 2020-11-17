import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertTimestampDatePipe } from './convert-timestamp-date.pipe';
import { RoundPipe } from './round.pipe';
import { PrimOrSecOpPipe } from './prim-or-sec-op.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [
        ConvertTimestampDatePipe,
        RoundPipe,
        PrimOrSecOpPipe
    ],
    exports: [
        ConvertTimestampDatePipe,
        RoundPipe,
        PrimOrSecOpPipe
    ]
})
export class SharedPipesModule { }
