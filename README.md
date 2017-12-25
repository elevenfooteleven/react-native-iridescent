# react-native-iridescence
A react-native component to next level your UI with gyroscope based iridescence.

![Preview](https://raw.githubusercontent.com/elevenfooteleven/react-native-iridescent/master/preview.gif)

## Usage

```javascript
import Iridescent from 'react-native-iridescent';
```

```javascript
<Iridescent
  zoomScale={3}
  onScrollOrZoom={(e) => alert('did that thing!')}
  tapToZoomOut="double"
>
  <Image source={{ uri }} style={{ width: 50, height: 50 }} />
</Zoomable>
```

## Properties
| Property | Type | Description |
|-----------------|----------|--------------------------------------------------------------|
| onScrollOrZoom | function | called when scrolled or zoomed, sent an event as a param |
| zoomScale | number | zoom scale. (default: 4) |
| zoomInTrigger | string | can be 'singletap' or 'doubletap'. (default: 'doubletap') |
| zoomOutTrigger | string | can be 'singletap' or 'doubletap'. (default: 'singletap') |

## Copyright
Copyright (c) 2017 Chris LeBlanc. Licensed under the MIT license.
