/*jshint esversion: 7 */

import React from 'react';
import './PokerChip.css';

/* Chip design by PMK: https://codepen.io/pmk/pen/GgrJRq */

const DEFAULTS = Object.freeze({
    size: 151,
    color: "#FFF",
    lineColor: "#FFF",
    disabledOpacity: 0.4
});

const getValueText = (value, currency) => { // Converts value to string that can fit on chip (max 3 significant digits)
    if (value === undefined) {return "";}
    let val = value.toString();
    if (val.length > 3) { // If string needs modification to fit on chip
        const trail = val.substring(3); // Get digits, from 4th to last
        if (Number(trail) !== 0) { // If trail has a non-zero digit
            throw new Error("PokerChip value has too many significant digits");
        }
        const start = val.slice(0, 3); // Get first 3 digits
        if (trail.length < 4) {  // 999 < val < 1000000
            val = Number(start) / (100 / (10 ** (trail.length - 1))); // Place decimal point if needed. Decimal position determined from length of trail
            val = val.toString() + "k";
        } else { // 999999 < val < 1000000000
            val = Number(start) / (100 / (10 ** (trail.length - 4))); // Place decimal point if needed. Decimal position determined from length of trail
            val = val.toString() + "M";
        }
    }
    return currency + val;
};

const getFontSize = value => {
    if (value.length === 4) {
        return "48px";
    }
    if (value.length === 5) {
        return "39px";
    }
    if (value.length === 6) {
        return "32px";
    }
};

const checkProps = props => {
    if (props.value !== undefined && (props.value < 1 || props.value > 999999999)) {throw new Error("PokerChip value cannot be less than 1 or greater than 999,999,999");}
    if (props.size !== undefined && !Number.isFinite(props.size)) {throw new Error("PokerChip size must be a number");}
    if (props.text !== undefined && props.text.length > 6) {throw new Error("Max PokerChip text length is 6");}
    if (props.onClick !== undefined && typeof props.onClick !== "function") {throw new Error("PokerChip 'onClick' prop must be a function");}
    if (props.disabled !== undefined && typeof props.disabled !== "boolean") {throw new Error("PokerChip 'disabled' prop must be a boolean");}
    if (props.currency !== undefined && (typeof props.currency !== "string" || props.currency.length > 1)) {throw new Error("PokerChip currency is not valid. Provide a one character string");}
};

const PokerChip = props => {
    checkProps(props);
    const size = props.size || DEFAULTS.size;
    const sizeScale = size / DEFAULTS.size;
    const color = props.color || DEFAULTS.color;
    const lineColor = props.lineColor || DEFAULTS.color;
    const currency = props.currency || "";
    
    const value = getValueText(props.value, currency);
    const fontSize = getFontSize(props.text || value);

    const outerColor = darken(color, 25); // Outer color, inner color
    const innerLineColor = darken(lineColor, 8); // Light inner ring color
    const innerLineGapColor = darken(color, 32); // Light inner ring color gap color, text color

    const outerBackgroundImage = `linear-gradient(0deg, transparent 0, transparent 67.5px, ${lineColor} 67.5px, ${lineColor} 83.5px, transparent 83.5px, transparent 151px), linear-gradient(60deg, transparent 0, transparent 97.4304px, ${lineColor} 97.4304px, ${lineColor} 113.4304px, transparent 113.4304px, transparent 151px), linear-gradient(120deg, ${outerColor} 0, ${outerColor} 97.4304px, ${lineColor} 97.4304px, ${lineColor} 113.4304px, ${outerColor} 113.4304px, ${outerColor} 151px)`;
    const innerBackgroundImage = `linear-gradient(0deg, transparent 0, transparent 69.5px, ${innerLineColor} 69.5px, ${innerLineColor} 81.5px, transparent 81.5px, transparent 151px), linear-gradient(30deg, transparent 0, transparent 98.7104px, ${innerLineColor} 98.7104px, ${innerLineColor} 110.7104px, transparent 110.7104px, transparent 151px), linear-gradient(60deg, transparent 0, transparent 98.7104px, ${innerLineColor} 98.7104px, ${innerLineColor} 110.7104px, transparent 110.7104px, transparent 151px), linear-gradient(90deg, transparent 0, transparent 69.5px, ${innerLineColor} 69.5px, ${innerLineColor} 81.5px, transparent 81.5px, transparent 151px), linear-gradient(120deg, transparent 0, transparent 98.7104px, ${innerLineColor} 98.7104px, ${innerLineColor} 110.7104px, transparent 110.7104px, transparent 151px), linear-gradient(150deg, ${innerLineGapColor} 0, ${innerLineGapColor} 98.7104px, ${innerLineColor} 98.7104px, ${innerLineColor} 110.7104px, ${innerLineGapColor} 110.7104px, ${innerLineGapColor} 151px)`;
    
    return (
        <div className="pokerchip" style={{width: size, height: size}}> {/* Fixes margins when scaled */}
            <div className="pokerchipOuter" style={{backgroundImage: outerBackgroundImage, transform: `scale(${sizeScale})`, opacity: props.disabled && DEFAULTS.disabledOpacity, cursor: props.disabled ? "not-allowed" : props.onClick ? "pointer" : "default"}} onClick={props.onClick}>
                <div className="innerChipBorder" style={{backgroundImage: innerBackgroundImage, border: `8px solid ${outerColor}`}} />
                <div className="chipContent" style={{background: outerColor, color: innerLineGapColor, fontSize}}>{props.text || value}</div>
            </div>
        </div>
    );
}

export default PokerChip;

/* Utility Functions, start */

const darken = (color, percent) => { // Darkens rbg color by given percent
    const c = isColor(color);
    let rgb = c.match(/\d+/g).map(Number);
    rgb = rgb.map(el => Math.round(el - el * percent / 100));
    return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
};

const isColor = strColor => { // Adapted from: https://stackoverflow.com/questions/48484767/javascript-check-if-string-is-valid-css-color, Lee Goddard, 2019
    const s = new Option().style;
    s.color = strColor;
    if (!s.color) {
        throw new Error("Invalid poker chip color or line color. Must be hex, rgb, or hsl");
    }
    return s.color;
};

/* Utility Functions, end */