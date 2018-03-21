# jquery.cartoAccordion
JQuery Plugin - Accordion widget.

This is a very simple accordion widget. It can be used for nested accordions (accordion elements can be accordions themselves).

## Usage 
Include the files dist/jquery.cartoAccordion.min.js and dist/jquery.cartoAccordion.css in your HTML header.

Use the following HTML code:
```html
<div id="my-accordion">
 ... <!-- some intermediate nesting possible -->
  <h3 class="accordion-toggle">Heading 1</h3><!-- any tag allowed - class is important -->
  <div class="accordion-content"><!-- any tag allowed - class is important -->
   ...
  </div>

  <h3 class="accordion-toggle">Heading 2</h3>
  <div class="accordion-content">
   ...
  </div>
 ...
</div>
```

```javascript
const options = {}; // init with default options
$('#my-accordion').cartoAccordion(options);
```

### Options
* `openInitial`: The .accordion-content (stating at 1) that should be initially expanded (defaults to 1). If set to 0, only .accordion-content elements that have class "active" will be expanded.
* `stayOpen`: Whether an .accordion-content element should be closed when some other is expanded (defaults to false).
* `animationDuration`: Speed of the open/close animation (defaults to "fast"). See the Documentation of jQuery.animate for more info - http://api.jquery.com/animate/
* `onToggle`: Callback function that is invoked, when an accordion element is opened or closed.

## Development
Run `npm install` to install the necessary dependencies.

Run `npm run deploy` to create the minified dist files.
