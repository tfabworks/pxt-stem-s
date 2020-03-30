#include "pxt.h"
#include "mbed.h"
using namespace pxt;

namespace stem_s {

    Ticker tk_ir_carrier;

	void start_ir_carrier();
    void generate_ir_carrier();
        
    /**
     * start ir carrier
     */
    //%
    void start_ir_carrier(){
//        tk_ir_carrier.attach(&generate_ir_carrier, 0.00002631578947368421);
        tk_ir_carrier.attach(&generate_ir_carrier, 0.000001);

    }

    /**
     * generate pwm waveform on P14
     */
    void generate_ir_carrier(){
            DigitalOut pin_ir_carrier(MICROBIT_PIN_P14);
            pin_ir_carrier = 1;
            wait_us(5);
//            wait(0.00001331578947368421);
            pin_ir_carrier = 0;
    }
}
