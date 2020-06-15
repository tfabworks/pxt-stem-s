namespace stem_s {
    /**
     * TFW-DS1で距離[cm]を測定します。
     * @param format number format, eg: OutputNumberFormat.INTEGER
     */
    //% blockId=uds_s
    //% block="Distance[cm] || %format"
    //% group="DS1"
    //% weight=100
    export function getDistance(format: OutputNumberFormat_s = OutputNumberFormat_s.INTEGER):number {
        // calculate distance -> median filter -> return value
        let arr: number[] = [];
        let l;
        for(l = 0; l < 3; l++) {
            let pulseWidth;
            const MAX_DIST_CM = 300;
            pins.digitalWritePin(DigitalPin.P8, 0);
            control.waitMicros(60000);
            pins.digitalWritePin(DigitalPin.P8, 1);
            control.waitMicros(20);
            pins.digitalWritePin(DigitalPin.P8, 0);
            pulseWidth = pins.pulseIn(DigitalPin.P1, PulseValue.High);

            let distance_cm;
            if (pulseWidth == 0) {
                distance_cm = MAX_DIST_CM;
            }
            else if (pulseWidth >= MAX_DIST_CM / 153 * 29 * 2 * 100) {
                distance_cm = MAX_DIST_CM;
            }
            else{
                distance_cm = pulseWidth * 153 / 29 / 2 / 100;
            }

            if (format === OutputNumberFormat_s.INTEGER ){
                distance_cm = Math.round( distance_cm );
            }

            arr.push(distance_cm);
        }
        arr.sort((n1, n2) => n1 - n2);
        return arr[1];
    }
}
