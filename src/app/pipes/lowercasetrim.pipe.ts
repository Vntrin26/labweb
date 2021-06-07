import {
    Pipe,
    PipeTransform
} from '@angular/core';

@Pipe ({
    name: 'lowerTrim'
})

export class LowerTrimPipe implements PipeTransform {
    transform(value: string): string {
        let trimmed = value.toLowerCase();
        trimmed = trimmed.replace(/\s/g, "");
        return trimmed
    }
}