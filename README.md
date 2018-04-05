# moz
JQuery plugin which create slider from images grid (mosaic).

## Requirement
This plugin has been tested with JQuery 3.3.1, others versions not tested.

Your page must have this tree : 

Element#moz > figure+ > img or video

## Use

1/ Link the moz.js plugin in your page (after JQuery).

2/ Call the plugin with « $('body').moz(); », you can choose any element if it's the element with #moz or is one of his parents. The element must be already in the DOM when the plugin is called.

You can custom the backgroung-color with the optional parameter « bgColor ». The background-color must be written under hexadecimal form (if you want black : #000 or #000000). If the format isn't correct, an error is dropped.

$('body').moz({"bgColor": '#000000'});

## And in the futur ?
This script still in progress. In the TODO list :

* Still be "use strict" compatible ;

* Show figcaption as legend if exist ;
  
* More customization ;

* Support div instead of figure only

* Fix bug : the picture (or video) is currently cropped when the width of device is smaller than the auto's width of element.

* Fix bug : It's currently possible to open an image or video which is out of the tree, the buttons can't be displayed.
