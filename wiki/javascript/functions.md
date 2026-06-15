# Functions

Functions let you group reusable blocks of code.

## Declaration

```js
function greet(name) {
  return 'Hello, ' + name;
}
```

## Arrow Functions

```js
const greet = (name) => 'Hello, ' + name;
```

## Default Parameters

```js
function greet(name = 'World') {
  return `Hello, ${name}!`;
}
```

## Scope

Variables declared with `let` and `const` are block-scoped. `var` is function-scoped.
