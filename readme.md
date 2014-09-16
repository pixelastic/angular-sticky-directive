# Angular Sticky Directive

Use this directive to make an element sticky, simulating the `position:sticky`
CSS rule for browsers that don't support it.

## How does it work ?

```html
<html>
  <body>
    <div sticky>This is my sticky menu</div>
    <div class="content">
      Yadaa Yadaa
    </div>
  </body>
</html>
```

Whenever the element with the `sticky` directive will be scrolled out of view,
it will be replaced with a placeholder element of exactly the same `height` and
the `.sticky` class will be applied to it instead.

This custom CSS class simulates a sticky positionning by simply using
a `position:fixed; top:0; right:0; left:0` definition.

## Notes

Scroll offset is calculated using the 

## Notes

Scroll offset is calculated using the [cross browser
method](https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY), as
explained in MDN.

The directive listens to the `onscroll` event, but tries to do as little as
possible in it in order not to cause performance issues.

The directive correctly listens to `resize` events to recalculate its position.

