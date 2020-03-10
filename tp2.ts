namespace stem_s {
    let TP2_init_done: boolean = false;

    /**
     * TFW-TP2の温度[℃]を返します。
     * @param format number format, eg: OutputNumberFormat.INTEGER
     */
    //% blockId = TP2_getTemperature_s
    //% block="Temperature[degC] (TP2) || %format"
    //% group="TP2"
    export function TP2_getTemperature(format: OutputNumberFormat_s = OutputNumberFormat_s.INTEGER): number {
        TP2_init_if_firsttime();
        if (format === OutputNumberFormat_s.INTEGER) {
            return Math.round(DS1820pxt_s.temp1dp());
        }
        return DS1820pxt_s.temp1dp();
    }

    function TP2_init_if_firsttime(): void {
        if (TP2_init_done == false) {
            DS1820pxt_s.init();
            TP2_init_done = true;
        }
    }
}