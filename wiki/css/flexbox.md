# Flexbox

Flexbox is a one-dimensional layout method for arranging items in rows or columns.

## Enable Flexbox

```css
.container {
  display: flex;
}
```

## Direction

```css
flex-direction: row;        /* default */
flex-direction: column;
flex-direction: row-reverse;
```

## Alignment

```css
justify-content: flex-start | center | flex-end | space-between | space-around;
align-items: stretch | center | flex-start | flex-end;
```

## Flex Children

```css
.item {
  flex: 1;          /* grow and shrink equally */
  flex-grow: 2;     /* take twice as much space */
  flex-shrink: 0;   /* don't shrink */
}
```
