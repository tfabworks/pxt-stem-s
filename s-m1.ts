enum LED_s{
    //% block="LED1,2,3"
    LED_ALL,
    LED1,
    LED2,
    LED3
}

enum NeoPixelColors_s {
    //% block=white
    White = 0xFFFFFF,
    //% block=black
    Black = 0x000000,
    //% block=red
    Red = 0xFF0000,
    //% block=orange
    Orange = 0xFFA500,
    //% block=yellow
    Yellow = 0xFFFF00,
    //% block=green
    Green = 0x00FF00,
    //% block=blue
    Blue = 0x0000FF,
    //% block=indigo
    Indigo = 0x4b0082,
    //% block=violet
    Violet = 0x8a2be2,
    //% block=purple
    Purple = 0xFF00FF
}

namespace stem_s {

    /**
     * TFW-S-M1の人感センサーが反応しているとき真を返します。
     */
    //% blockId=human_detection_s block="Is Human moving"
    //% group="S-M1"
    //% weight=100
    export function humanDetection(): boolean {
        if (pins.digitalReadPin(DigitalPin.P13) == 1) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * micro:bit本体の明るさセンサーが、しきい値より暗い、かつ TFW-S-M1の人感センサーが反応しているとき真を返します。
     * @param lightThreshold number of brightness - threshold, eg: 15
     */
    //% block="%lightThreshold|より暗いときに人が動いた"
    //% group="S-M1"
    //% blockId=isHumanDetectionAndDark_s
    //% lightThreshold.min=0 lightThreshold.max=255
    //% weight=95
    export function isHumanDetectionAndDark(lightThreshold:number): boolean {
        if (humanDetection() && brightnessDetermination(lightThreshold, DarkOrBrightSpecified_s.IS_DARK ) ) {
            return true;
        }
        return false;
    }

    /**
     * TFW-S-M1のスイッチをONします。
     */
    //% blockId=turn_on_s block="Switch Turn ON"
    //% group="S-M1"
    //% weight=80
    export function turnON(): void {
        pins.digitalWritePin(DigitalPin.P12,1);
    }

    /**
     * TFW-S-M1のスイッチをOFFします。
     */
    //% blockId=turn_off_s block="Switch Turn OFF"
    //% group="S-M1"
    //% weight=75
    export function turnOFF(): void {
        pins.digitalWritePin(DigitalPin.P12, 0);
    }

    /**
     * TFW-S-M1のスイッチの出力をコントロールします。
     * @param duty_percent set the duty-ratio, eg: 50
     */
    //% blockId=sw1_out_s
    //% block="Output %duty\\%"
    //% duty_percent.min=0 duty_percent.max=100
    //% group="S-M1"
    //% weight=70
    export function sw1_out(duty_percent: number): void {
        if ( duty_percent >= 100 ) {
            turnON();
            return;
        }
        else if ( duty_percent <= 0 ) {
            turnOFF();
            return;
        }
        set_pulse_width_p12( duty_percent / 100.0 * 20000 )
    }
    //% shim=stem_s::set_pulse_width_p12
    function set_pulse_width_p12(pw_us: number): void {
        return;
    }

    /**
     * TFW-S-M1の温度センサー温度が、しきい値より高い（または低い）場合に真を返します。
     * @param temperatureThreshold number of brightness-threshold, eg: 30
     */
    //% blockId=gt_temperature_high_s
    //% block="Than %temperatureThreshold|degC, %settingHotOrCold"
    //% group="S-M1"
    //% weight=65
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
    //% weight=60
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
    //% weight=55
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
    //% weight=50
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
    //% weight=45
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

    const DEFAULT_BRIGHTNESS_PERCENT = 100;
    let led1: neopixel.Strip = null
    let led2: neopixel.Strip = null
    let led3: neopixel.Strip = null
    let strip2: neopixel.Strip = null
    let led_on_firsttime=true;
    let led1_brightness_percent: number = DEFAULT_BRIGHTNESS_PERCENT;
    let led2_brightness_percent: number = DEFAULT_BRIGHTNESS_PERCENT;
    let led3_brightness_percent: number = DEFAULT_BRIGHTNESS_PERCENT;
    let led1_color = NeoPixelColors.Black;
    let led2_color = NeoPixelColors.Black;
    let led3_color = NeoPixelColors.Black;


    function led_show_color() {
        if ( led_on_firsttime == true) {
            strip2 = neopixel.create(DigitalPin.P16, 3, NeoPixelMode.RGB)
            led1 = strip2.range(0, 1)
            led2 = strip2.range(1, 1)
            led3 = strip2.range(2, 1)
            led_on_firsttime = false;
        }

        led1.setBrightness( led1_brightness_percent);
        led1.showColor(led1_color)
        basic.pause(1)
        led2.setBrightness( led2_brightness_percent);
        led2.showColor(led2_color)
        basic.pause(1)
        led3.setBrightness( led3_brightness_percent);
        led3.showColor(led3_color)
        basic.pause(1)
    }

    /**
     * TFW-S-M1のフルカラーLEDの色を設定します。
     */
    //% blockId=stem_s_led_set_color
    //% block="%led|を%color|にする"
    //% group="S-M1"
    //% weight=40
    export function led_set_color(led: LED_s, color_s: NeoPixelColors_s) {

        let color = NeoPixelColors.Black
        if ( color_s == NeoPixelColors_s.Black ) {
            color = NeoPixelColors.Black
        }
        else if ( color_s == NeoPixelColors_s.Blue) {
            color = NeoPixelColors.Blue
        }
        else if (color_s == NeoPixelColors_s.Green) {
            color = NeoPixelColors.Green
        }
        else if (color_s == NeoPixelColors_s.Indigo) {
            color = NeoPixelColors.Indigo
        }
        else if (color_s == NeoPixelColors_s.Orange) {
            color = NeoPixelColors.Orange
        }
        else if (color_s == NeoPixelColors_s.Purple) {
            color = NeoPixelColors.Purple
        }
        else if (color_s == NeoPixelColors_s.Red) {
            color = NeoPixelColors.Red
        }
        else if (color_s == NeoPixelColors_s.Violet) {
            color = NeoPixelColors.Violet
        }
        else if (color_s == NeoPixelColors_s.White) {
            color = NeoPixelColors.White
        }
        else if (color_s == NeoPixelColors_s.Yellow) {
            color = NeoPixelColors.Yellow
        }

        if (led == LED_s.LED1) {
            led1_color = neopixel.colors(color)
        }
        else if (led == LED_s.LED2) {
            led2_color = neopixel.colors(color)
        }
        else if (led == LED_s.LED3) {
            led3_color = neopixel.colors(color)
        }
        else if (led == LED_s.LED_ALL) {
            led_set_color(LED_s.LED1, color_s);
            led_set_color(LED_s.LED2, color_s);
            led_set_color(LED_s.LED3, color_s);
        }
        led_show_color()
    }
    
    /**
     * TFW-S-M1のフルカラーLEDの明るさを設定します。
     * @param brightness_percent number of brightness, eg: 25
     */
    //% blockId=stem_s_set_brightness
    //% block="%led|を明るさ%brightness_percent|\\%にする"
    //% group="S-M1"
    //% brightness_percent.min=0 brightness_percent.max=100
    //% weight=35
    export function led_set_brightness(led: LED_s, brightness_percent:number ) {
        if ( led == LED_s.LED1 ) {
            led1_brightness_percent = brightness_percent
        }
        else if ( led == LED_s.LED2 ) {
            led2_brightness_percent = brightness_percent
        }
        else if ( led == LED_s.LED3 ) {
            led3_brightness_percent = brightness_percent
        }
        else if ( led == LED_s.LED_ALL ) {
            led1_brightness_percent = brightness_percent
            led2_brightness_percent = brightness_percent
            led3_brightness_percent = brightness_percent
        }
        led_show_color()
    }

    /**
     * TFW-S-M1のフルカラーLEDを赤・緑・青の明るさを0-255で指定して点灯させます。
     * @param color_r number, eg: 255
     * @param color_g number, eg: 255
     * @param color_b number, eg: 255
     */
    //% blockId=stem_s_led_rgb
    //% block="%led 赤%colog_r 緑%colog_g 青%colog_b"
    //% group="S-M1"
    //% color_r.min=0 color_r.max=255
    //% color_g.min=0 color_g.max=255
    //% color_b.min=0 color_b.max=255
    //% weight=30
    export function led_rgb(led: LED_s, color_r: number, color_g: number, color_b: number ) {
        if (led_on_firsttime == true) {
            strip2 = neopixel.create(DigitalPin.P16, 3, NeoPixelMode.RGB)
            led1 = strip2.range(0, 1)
            led2 = strip2.range(1, 1)
            led3 = strip2.range(2, 1)
            led_on_firsttime = false;
        }
        led_set_color(led, neopixel.colors(neopixel.rgb(color_r, color_g, color_b)) )
    }
}
