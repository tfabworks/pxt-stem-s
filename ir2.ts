namespace stem_s {
    const ビットパターン_ON = [1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0]
    const ビットパターン_OFF = [1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0]
    const 繰り返し回数 = 30
    const 輸送波パルス幅 = 600
    const 輸送波周期 = 26

    function 輸送波送信ポート設定() {
        pins.analogWritePin(AnalogPin.P14, 輸送波パルス幅)
        //start_ir_carrier();
        pins.analogSetPeriod(AnalogPin.P14, 輸送波周期)
    }

    /**
     * TFW-IR2で赤外線リモコンコンセントOCR-05WをONします。
     */
    //% blockId=ir_on_s
    //% block="IR ON"
    //% group="S-M1"
    export function IR_ON() {
        輸送波送信ポート設定()

        for (let 送信回数 = 0; 送信回数 < 繰り返し回数; 送信回数++) {
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_ON[0])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_ON[1])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_ON[2])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_ON[3])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_ON[4])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_ON[5])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_ON[6])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_ON[7])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_ON[8])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_ON[9])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_ON[10])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_ON[11])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_ON[12])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_ON[13])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_ON[14])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_ON[15])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_ON[16])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_ON[17])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_ON[18])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_ON[19])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_ON[20])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_ON[21])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_ON[22])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_ON[23])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_ON[24])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_ON[25])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_ON[26])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_ON[27])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_ON[28])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_ON[29])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_ON[30])
            control.waitMicros(760)
        }
    }

    /**
     * TFW-IR2で赤外線リモコンコンセントOCR-05WをOFFします。
     */
    //% blockId=ir_off_s
    //% block="IR OFF"
    //% group="S-M1"
    export function IR_OFF() {
        輸送波送信ポート設定()

        for (let 送信回数 = 0; 送信回数 < 繰り返し回数; 送信回数++) {
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_ON[0])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_OFF[1])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_OFF[2])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_OFF[3])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_OFF[4])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_OFF[5])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_OFF[6])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_OFF[7])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_OFF[8])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_OFF[9])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_OFF[10])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_OFF[11])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_OFF[12])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_OFF[13])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_OFF[14])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_OFF[15])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_OFF[16])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_OFF[17])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_OFF[18])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_OFF[19])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_OFF[20])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_OFF[21])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_OFF[22])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_OFF[23])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_OFF[24])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_OFF[25])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_OFF[26])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_OFF[27])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_OFF[28])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_OFF[29])
            control.waitMicros(760)
            pins.digitalWritePin(DigitalPin.P15, ビットパターン_OFF[30])
            control.waitMicros(760)
        }
    }

    //% shim=stem_s::set_pulse_width_
    function set_pulse_width(degrees: number): void {
        return;
    }

}
