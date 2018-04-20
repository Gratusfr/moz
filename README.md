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

## Customization
There are various class which allow you to transform the world :

.mozExit : should be placed on figure element, which will be ignored by the script. 

.mozBut > .mozLeft/.active./.mozRight : this script generate these classes on buttons. Very useful if you want customize through CSS.

.mozErrorSrc : this script check if images and videos inside #moz really exist. If the HEAD request is not 200 (OK), it will add this class. This class prevent the user to open this through click or give the default brocken image if the access is through buttons (only the background will be visible) + console warning « src undefined » (will be removed in the future). This class in added on img and video elements directly.

## And in the futur ?
This script still in progress. In the TODO list :

* Still be "use strict" compatible ;

* Show figcaption as legend if exist ;
  
* More customization ;

* Support div instead of figure only

* [FIXED] Fix bug : the picture (or video) is currently cropped when the width of device is smaller than the auto's width of element. 

* [FIXED] Fix bug : It's currently possible to open an image or video which is out of the tree, the buttons can't be displayed.
