enum DarkOrBrightSpecified_s {
    //% block="暗い"
    IS_DARK,
    //% block="明るい"
    IS_BRIGHT,
}

enum SettingHotCold_s {
    //% block="高い"
    HOT,
    //% block="低い"
    COLD,
}

enum OutputNumberFormat_s {
    //% block="整数"
    INTEGER = 0,
    //% block="小数"
    FLOAT = 1
}

//% groups='["micro:bit本体", "S-M1", "TP2", "DS1"]'
//% weight=71 icon="\uf0c3" color=#c13300 block="STEM-S"
namespace stem_s {
    let _今まで暗い: boolean = false;
    const _暗い判定閾値: number = 20;
    const _明るい判定閾値: number = 25;
    const _HYSTERESIS: number = _明るい判定閾値 - _暗い判定閾値;

    /**
     * micro:bit本体の明るさセンサーが暗い場合（20未満）に真を返します。
     */
    /*
    //% blockId=is_dark_s block="is dark"
    //% group="micro:bit本体"
    export function isDark(): boolean {
        return _isDark(_暗い判定閾値, _明るい判定閾値);

    }
    */

    /* 明るさの平均を取る */
    function _lightLevelSampling(): number {
        const CYCLE_SAMPLE_NUM: number = 50
        let accum明るさ: number = 0;
        for (let i = 0; i < CYCLE_SAMPLE_NUM; i++) {
            accum明るさ += input.lightLevel();
            basic.pause(1);
        }
        let 明るさ = accum明るさ / CYCLE_SAMPLE_NUM;
        return 明るさ;
    }

    /* 暗い判定本体 */
    function _isDark(暗い判定閾値: number, 明るい判定閾値: number): boolean {
        if ((暗い判定閾値 > 明るい判定閾値)
            || (暗い判定閾値 < 0)
            || (暗い判定閾値 > 255)
            || (明るい判定閾値 < 0)
            || (明るい判定閾値 > 255)) {
            control.assert(false, "threshold is abnormal");
        }

        let 現在の明るさ = _lightLevelSampling();

        const 暗い: boolean = true;
        const 明るい: boolean = false;

        if (_今まで暗い) { //現在まで暗い環境だったとき。明るいかを判定
            if (現在の明るさ > 明るい判定閾値) {
                _今まで暗い = 明るい;
                return 明るい; //現在は明るい
            }
            else {
                _今まで暗い = 暗い;
                return 暗い; //現在は暗い
            }
        }
        else { // 現在まで明るい環境だったとき。暗いかを判定
            if (現在の明るさ < 暗い判定閾値) {
                _今まで暗い = 暗い;
                return 暗い; //現在は暗い
            }
            else {
                _今まで暗い = 明るい;
                return 明るい; //現在は明るい
            }
        }
        control.assert(false);
    }

    /**
     * micro:bit本体の明るさセンサーが、しきい値より暗い（または明るい）場合に真を返します。
     * @param lightThreshold number of brightness-threshold, eg: 15
     */
    //% blockId=brightness_determination_s
    //% block="%lightThreshold|より%settingDarkOrBright|"
    //% lightThreshold.min=0 lightThreshold.max=255
    //% group="micro:bit本体"
    //% weight=100
    export function brightnessDetermination(lightThreshold: number, settingDarkOrBright: DarkOrBrightSpecified_s): boolean {
        if (_HYSTERESIS < 0) { control.assert(false); }
        if (lightThreshold < 0) {
            lightThreshold = 0;
        }
        if (lightThreshold > 255) {
            lightThreshold = 255;
        }

        if (settingDarkOrBright === DarkOrBrightSpecified_s.IS_DARK) {
            let 暗い判定閾値: number = lightThreshold;
            let 明るい判定閾値: number = lightThreshold + _HYSTERESIS;
            if (明るい判定閾値 > 255) { 明るい判定閾値 = 255; }
            return _isDark(暗い判定閾値, 明るい判定閾値);
        }
        else if (settingDarkOrBright === DarkOrBrightSpecified_s.IS_BRIGHT) {
            let 暗い判定閾値: number = lightThreshold - _HYSTERESIS;
            let 明るい判定閾値: number = lightThreshold;
            if (暗い判定閾値 < 0) { 暗い判定閾値 = 0; }
            return !_isDark(暗い判定閾値, 明るい判定閾値);
        }
        control.assert(false); return false;
    }



    let is_acc_first_time: boolean = true;
    let prev_accelaration: number;
    let acceleration: number;
    const MOVING_THRESHOLD: number = 25;

    /**
     * micro:bit本体が揺り動かされた場合に真を返します。
     */
    //% blockId=is_move_s
    //% block="micro:bitが動いた"
    //% group="micro:bit本体"
    //% weight=90
    export function isMove(): boolean {
        if (is_acc_first_time) {
            acceleration = input.acceleration(Dimension.Strength)
            is_acc_first_time = false;
            return false;
        }
        prev_accelaration = acceleration;
        acceleration = input.acceleration(Dimension.Strength);

        if (Math.abs((acceleration - prev_accelaration)) > MOVING_THRESHOLD) {
            return true;
        }
        return false;
    }

    
     /**
     * グラフを表示します。
     */
    //% blockId=stem_s_showGraph
    //% block="%data|をグラフで表示"
    //% group="micro:bit本体"
    //% weight=80
    export function showGraph( data :number ) {
        serial.redirectToUSB();
        serial.writeLine(data.toString());
    }
    
    /**
     * 指定された秒数の間、一時停止します。
     * @param sec 秒, eg: 1
     */
    //% blockId=pause_sec
    //% block="一時停止（秒）%sec"
    //% group="micro:bit本体"
    //% weight=75
    export function pause_sec(sec: number) {
        basic.pause(1000 * sec);
    }

}
