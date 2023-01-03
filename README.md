# react-pokerchip
A dependency-free, stateless React functional component rendering a poker/casino chip

[![react-autocomplete-input](https://github.com/yh54321/react-pokerchip/blob/main/example.png)](https://github.com/yh54321/react-pokerchip)

Chip design by [PMK](https://codepen.io/pmk) at https://codepen.io/pmk/pen/GgrJRq

# Usage Example
```JavaScript
import PokerChip from 'react-pokerchip';

<PokerChip value={1} />
<PokerChip value={5} color='#F00' />
<PokerChip value={10} color='#00F' currency='$' />
<PokerChip value={1000000} color='#FF0' currency='€' />
<PokerChip text='T' color='#40E0D0' lineColor='#51D3C6' /> 
```
# Installation
To install: `npm i react-pokerchip`

To build (for devs, runs automatically on install): `npx babel src --out-dir lib --copy-files`

# Styling
Styling can be added or modified through the `.pokerchip` CSS class

# Props
All props are optional and can be `undefined`.

## size : number
#### Default value: `151`
Size of chip in pixels

## value : number
#### Default value: `undefined`
Value to be displayed on chip. Must have no more than 3 significant digits

## text : string
#### Default value: `undefined`
Text to be displayed on chip. Must have no more than 6 characters. Overrides `value` prop

## currency : string
#### Default value: `undefined`
Currency to be displayed on chip. Must be 1 character

## color : string
#### Default value: `'#FFF'`
Color of chip. Must be `hex`, `rgb`, or `hsl`

## lineColor : string
#### Default value: `'#FFF'`
Color of chip 'edge spots'. Must be `hex`, `rgb`, or `hsl`

## onClick : function
#### Default value: `undefined`
Function to be invoked upon clicking chip. Sets `cursor` to `pointer`

## disabled : boolean
#### Default value: `undefined`
Styles chip as 'disabled', by making chip transparent and setting `cursor` to `not-allowed`. Does not affect `onClick` functionality
