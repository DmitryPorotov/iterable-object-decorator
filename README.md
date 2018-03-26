# Iterable Object Decorator

## Purpose:

To make JS/TS objects usable in _for (... of ...)_ loops in general and inside Angular's `*ngFor` directive in particular.

## Usage:

Install using npm `npm i iterable-object-decorator --save` or just download the `index.ts` file from the github repo.

Import `Iterable` decorator and use it on component properties. Or import `decorateIterableObject` function and use it on any object.

### Parameters:

**For the `@Iterable()` class property decorator**:

1. **_dir?: 'desc' | 'asc'_** - an optional parameter that indicates the direction of sorting. If no direction is provided then keys are returned unsorted.
2. **_returnKvp?: boolean_** - an optional parameter that indicates that the iterator will return key-value pairs.
If this parameter is not provided or is `false` then only the key is returned. 
A key-value pair is an object which has the following signature `{ key: string; value: any; }`.

**For the `decorateIterableObject()` function**:

The first parameter is the object to be decorated then the 2 other parameters are the same as for `@Iterable()`. The function returns back the decorated object.

### Example:
```typescript
import { Component, OnInit } from '@angular/core';
import { Iterable, decorateIterableObject } from 'iterable-object-decorator';

@Component({
    selector: 'app-whatever',
    template: `
    <div *ngFor="let i of myObject">
        {{i}}: {{myObject[i]}}
    </div>
    <div *ngFor="let i of myOtherObject">
        {{i.key}}: {{i.value}}
    </div>
    `
})
export class WhateverComponent implements OnInit {
    @Iterable('desc')
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
        this.myOtherObject = decorateIterableObject(obj2, null, true);
    }
}
```