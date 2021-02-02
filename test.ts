stem_s.led_set_brightness(LED_s.LED_ALL, 25)
stem_s.led_rgb(
LED_s.LED_ALL,
255,
58,
76
)
basic.showIcon(IconNames.Heart)
basic.forever(function () {
    basic.showString("" + (stem_s.TP2_getTemperature(OutputNumberFormat_s.FLOAT)))
})
