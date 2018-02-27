#Iterable Object Decorator
##Purpose:
To make JS/TS objects usable in _for (... of ...)_ loops in general and inside Angular's `*ngFor` directive in particular.
##Usage
Import `Iterable` decorator and use in on component properties. Or Import `IterableObjectDecorator` static class and call `IterableObjectDecorator.decorate()` in on any objects.