// Auto-generated. Do not edit.


    /** DS1820 Dallas 1-Wire Temperature Probe
     *
     * Example:
     * @code
     * #include "mbed.h"
     * #include "DS1820.h"
     *
     * DS1820 probe(DATA_PIN);
     *  
     * int main() {
     *     while(1) {
     *         probe.convertTemperature(true, DS1820::all_devices);         //Start temperature conversion, wait until ready
     *         printf("It is %3.1foC\r\n", probe.temperature());
     *         wait(1);
     *     }
     * }
     * @endcode
     */

    declare const enum devices {
    this_device = 0,
    }

// Auto-generated. Do not edit. Really.
