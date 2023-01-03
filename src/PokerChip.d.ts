declare module 'react-pokerchip' {
    import * as React from 'react';

    type PokerChipProps = {
        size?: number,
        value?: number,
        text?: string,
        currency?: string,
        color?: string,
        lineColor?: string,
        onClick?: Function,
        disabled?: boolean
    };

    const PokerChip: React.FC<PokerChipProps>;
    export default PokerChip;
}