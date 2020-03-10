namespace stem_s {

    /**
     * TFW-S-M1の人感センサーが反応しているとき真を返します。
     */
    //% blockId=human_detection_s block="Is Human moving"
    //% group="S-M1"
    export function humanDetection(): boolean {
        if (pins.digitalReadPin(DigitalPin.P14) == 1) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * micro:bit本体の明るさセンサーが暗い場合（20未満）、かつ TFW-S-M1の人感センサーが反応しているとき真を返します。
     */
    //% blockId=is_human_detection_and_dark_s
    //% block="Is Dark and Human Moving"
    //% group="S-M1"
    export function isHumanDetectionAndDark(): boolean {
        if (humanDetection() && isDark()) {
            return true;
        }
        return false;
    }

    /**
     * TFW-S-M1のスイッチをONします。
     */
    //% blockId=turn_on_s block="Switch Turn ON"
    //% group="S-M1"
    export function turnON(): void {
        pins.digitalWritePin(DigitalPin.P8,1);
    }

    /**
     * TFW-S-M1のスイッチをOFFします。
     */
    //% blockId=turn_off_s block="Switch Turn OFF"
    //% group="S-M1"
    export function turnOFF(): void {
        pins.digitalWritePin(DigitalPin.P8, 0);
    }

    /**
     * TFW-S-M1のスイッチの出力をコントロールします。
     * @param duty set the duty-ratio, eg: 100
     */
    //% blockId=sw1_out_s
    //% block="Output %duty\\%"
    //% duty.min=0 duty.max=100
    //% group="S-M1"
    export function sw1_out(duty: number): void {
        pins.analogWritePin(AnalogPin.P8, (duty / 100 * 1023));
    }


    /**
     * TFW-S-M1の温度センサーが熱い場合（30℃超）に真を返します。
     */
    //% blockId=is_temperature_high_s
    //% block="is hot"
    //% group="S-M1"
    export function isTemperatureHigh(): boolean {
        if (getTemperature(OutputNumberFormat_s.FLOAT) > 30) {
            return true;
        }
        return false;
    }

    /**
     * TFW-S-M1の温度センサーが、閾値より熱い（または冷たい）場合に真を返します。
     * @param temperatureThreshold number of brightness-threshold, eg: 30
     */
    //% blockId=gt_temperature_high_s
    //% block="Than %temperatureThreshold|degC, %settingHotOrCold"
    //% group="S-M1"
    export function gtTemperatureHigh(temperatureThreshold: number, settingHotCold: SettingHotCold_s): boolean {
        if (settingHotCold === SettingHotCold_s.HOT) {
            if (getTemperature(OutputNumberFormat_s.FLOAT) > temperatureThreshold) {
                return true;
            }
            return false;
        }
        if (settingHotCold === SettingHotCold_s.COLD) {
            if (getTemperature(OutputNumberFormat_s.FLOAT) < temperatureThreshold) {
                return true;
            }
            return false;
        }
        return false;
    }


    let EN1_init_done: boolean = false;

    /**
     * TFW-S-M1で温度[℃]を測定します。
     * @param format number format, eg: OutputNumberFormat.INTEGER
     */
    //% blockId=get_temperature_s block="Temperature[degC] (S-M1) || %format"
    //% group="S-M1"
    export function getTemperature(format: OutputNumberFormat_s = OutputNumberFormat_s.INTEGER): number {
        EN1_init_if_firsttime();
        if (format === OutputNumberFormat_s.INTEGER) {
            return Math.round(BME280_I2Cs.Temperature());
        }
        return BME280_I2Cs.Temperature();
    }

    /**
     * TFW-S-M1で湿度[%]を測定します。
     * @param format number format, eg: OutputNumberFormat.INTEGER
     */
    //% blockId=get_humidity_s block="Humidity[\\%] || %format"
    //% group="S-M1"
    export function getHumidity(format: OutputNumberFormat_s = OutputNumberFormat_s.INTEGER): number {
        EN1_init_if_firsttime();
        if (format === OutputNumberFormat_s.INTEGER) {
            return Math.round(BME280_I2Cs.Humidity());
        }
        return BME280_I2Cs.Humidity();
    }

    /**
     * TFW-S-M1で気圧[hPa]を測定します。
     * @param format number format, eg: OutputNumberFormat.INTEGER
     */
    //% blockId=get_pressure_s block="Pressure[hPa] || %format"
    //% group="S-M1"
    export function getPressure(format: OutputNumberFormat_s = OutputNumberFormat_s.INTEGER): number {
        EN1_init_if_firsttime();
        if (format === OutputNumberFormat_s.INTEGER) {
            return Math.round(BME280_I2Cs.Pressure());
        }
        return BME280_I2Cs.Pressure();
    }

    /**
     * TFW-S-M1で基準面の気圧との差から高度差[m]を計算します。
     * @param referencePressure 基準面の気圧[hPa], eg: 1013
     * @param format number format, eg: OutputNumberFormat.INTEGER
     */
    //% blockId=get_altitude_s block="Altitude[m] Pressure at reference level%referencePressure| || %format"
    //% group="S-M1"
    export function getAltitude(referencePressure: number = 1013, format: OutputNumberFormat_s = OutputNumberFormat_s.INTEGER): number {
        EN1_init_if_firsttime();
        if (format === OutputNumberFormat_s.INTEGER) {
            return Math.round(calcHeight(referencePressure, BME280_I2Cs.Pressure(), BME280_I2Cs.Temperature()));
        }
        return calcHeight(referencePressure, BME280_I2Cs.Pressure(), BME280_I2Cs.Temperature());
    }

    function calcHeight(P0: number, P: number, T: number) {
        let calcHeight_n = 0
        let calcHeight_xa = 0
        let calcHeight_fn = 0
        let calcHeight_kn = 0
        let calcHeight_a = 0
        let calcHeight_x = 0
        let calcHeight_Result = 0
        calcHeight_x = P0 / P
        calcHeight_a = 1 / 5.257
        calcHeight_kn = calcHeight_a
        calcHeight_fn = 1
        calcHeight_xa = 1
        for (let calcHeight_index = 0; calcHeight_index <= 4; calcHeight_index++) {
            calcHeight_n = calcHeight_index + 1
            calcHeight_xa = calcHeight_xa + calcHeight_kn * (calcHeight_x - 1) ** calcHeight_n / calcHeight_fn
            calcHeight_kn = calcHeight_kn * (calcHeight_a - calcHeight_n)
            calcHeight_fn = calcHeight_fn * (calcHeight_n + 1)
        }
        calcHeight_Result = (calcHeight_xa - 1) * (T + 273.15) / 0.0065;
        return calcHeight_Result;
    }

    function EN1_init_if_firsttime(): void {
        if (EN1_init_done == false) {
            BME280_I2Cs.Init(BME280_I2C_ADDRESS_s.e_0x76);
            EN1_init_done = true;
        }
    }
}