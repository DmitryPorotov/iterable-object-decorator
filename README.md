# Iterable Object Decorator

## Purpose:

To make JS/TS objects usable in _for (... of ...)_ loops in general and inside Angular's `*ngFor` directive in particular.

## Usage:

Install using npm `npm i iterable-object-decorator --save` or just download the `index.ts` file.

Import `Iterable` decorator and use it on component properties. Or import `IterableObjectDecorator` static class and call `IterableObjectDecorator.decorate()` in on any objects.

### Parameters:

**For the `@Iterable()` class property decorator**:

1. **_returnKvp?: boolean_** - an optional parameter that indicates that the iterator will return key-value pairs. A key-value pair is an object which look like this: `{key:"some string", value: "value of any type"}`. If this parameter is not provided or `false` then only the key will be returned.
2. **_dir?: 'desc' | 'asc'_** - an optional parameter that indicates the direction of sorting. If no direction is provided then keys are returned unsorted.

**For the `IterableObjectDecorator.decorate` static function**:

The first parameter is the object to be decorated then the 2 other parameters are the same as for `@Iterable`. The function returns back the decorated object.

### Example:
```typescript
import { Iterable, IterableObjectDecorator } from 'iterable-object-decorator';

@Component({
    selector: 'app-whatever',
    template: `
    <div *ngFor="let i of myObject">
        {{i}}
    </div>
    <div *ngFor="let i of myOtherObject">
        {{i.key}}: {{i.value}}
    </div>
    `
})
export class WhateverComponent implements OnInit {
    @Iterable(false, 'desc')
    public myObject;
    
    public myOtherObject;
        
    public ngOnInit() {
        const obj1 = {
            'b': 1,
            'c': 5,
            'a': 4
        };
        const obj2 = {
            'x': 5,
            'z': 'asd',
            'y': 10
        };
        this.myObject = obj1;
        this.myOtherObject = IterableObjectDecorator.decorate(obj2, true);
    }
}
```