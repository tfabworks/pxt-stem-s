stem_s.led_set_brightness(LED_s.LED_ALL, 25)
stem_s.led_rgb(
LED_s.LED3,
255,
58,
76
)
basic.forever(function () {
    stem_s.led_set_color(LED_s.LED_ALL, NeoPixelColors_s.Green)
})
