stem_s.led_set_brightness(LED_s.LED_ALL, 25)
stem_s.led_rgb(
LED_s.LED_ALL,
255,
58,
76
)
basic.forever(function () {
    stem_s.sw1_out(50)
    basic.pause(500)
    stem_s.sw1_out(0)
    basic.pause(500)
    stem_s.sw1_out(10)
    basic.pause(500)
    stem_s.sw1_out(0)
    basic.pause(500)
    stem_s.sw1_out(100)
    basic.pause(500)
})
