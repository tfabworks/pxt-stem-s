#include "pxt.h"
#include "mbed.h"
#include <cstdint>
#include <math.h>

using namespace pxt;

namespace DS18B20 {

class microbitp : public MicroBitComponent
{
  public:
    void *pin;
    int id;
    int status;
    int val;
    PinCapability capability;
    uint8_t pullMode;
    PinName name;

    microbitp(int id, PinName name, PinCapability capability){
        this->id = id;
        this->name = name;
        this->capability = capability;
        this->pullMode = 1;
        this->status = 0x00;
        this->pin = NULL;
        this->val = 0;
    }
    void deletep(){
        val -= 1;
        //printf("val = %d\n",val);
        if (status & 0x01)
            delete ((DigitalIn *)pin);
        if (status & 0x02)
            delete ((DigitalOut *)pin);
    }

    void disconnect(){
        
        if (status & 0x01){
            delete ((DigitalIn *)pin);
            val -= 1;
        }
        if (status & 0x02){
            delete ((DigitalOut *)pin);
            val -= 1;
        }
    }

    int setDigitalValue(int value){
        if (!(status & 0x02)){
            disconnect();
            val += 1;
            pin = new DigitalOut(name);
            status = 0x02;
        }
        // Write the value.
        ((DigitalOut *)pin)->write(value);
        return 0;
    }

    int getDigitalValue(){
        ((DigitalIn *)pin)->mode(PullNone);
        status = 0x01;
        return ((DigitalIn *)pin)->read();
    }
};

    microbitp  pin8(15, MICROBIT_PIN_P8, PIN_CAPABILITY_STANDARD);

    microbitp  pin = pin8;

    uint8_t init() {
        pin.setDigitalValue(0);
	sleep_us(500);
        pin.setDigitalValue(1);
	sleep_us(30);
        int b = pin.getDigitalValue();
	sleep_us(500);
        return b;
    }

    void writeBit(int b) {
        int delay1, delay2;
        if (b == 1) {
            pin.setDigitalValue(0);
	    sleep_us(1);
            pin.setDigitalValue(1);
	    sleep_us(80);
        } else {
            pin.setDigitalValue(0);
	    sleep_us(80);
            pin.setDigitalValue(1);
	    sleep_us(8);
        }
    }

    void writeByte(int byte) {
        int i;
        for (i = 0; i < 8; i++) {
            if (byte & 1) {
                writeBit(1);
            } else {
                writeBit(0);
            }
            byte = byte >> 1;
        }
    }

    int readBit() {
        volatile int i;
        pin.setDigitalValue(0);
        pin.setDigitalValue(1);
        int b = pin.getDigitalValue();
	sleep_us(80);
        return b;
    }

    void convert() {
        volatile int i;
        int j;
        writeByte(0x44);
	sleep_ms(800);
    }

    int readByte() {
        int byte = 0;
        int i;
        for (i = 0; i < 8; i++) {
            byte = byte | readBit() << i;
        };
        return byte;
    }

    uint8_t crc8( uint8_t *addr, uint8_t len)
    {
        uint8_t crc = 0;
        while (len--) {
            uint8_t inbyte = *addr++;
            for (uint8_t i = 8; i; i--) {
                uint8_t mix = (crc ^ inbyte) & 0x01;
                crc >>= 1;
                if (mix) crc ^= 0x8C;
                inbyte >>= 1;
            }
        }
        return crc;
    }

#define RETRY_NUMBER 4
    //%
    int16_t Temperature() {
        static int retry = RETRY_NUMBER;
        pin = pin8;
        init();
        writeByte(0xCC);
        convert();
        init();
        writeByte(0xCC);
        writeByte(0xBE);

        uint8_t data[9];
        for(int i=0; i<9; i++) {
            data[i] = readByte();
        }

        int b1 = data[0];
        int b2 = data[1];
        pin.deletep();
        int16_t temp = (b2 << 8 | b1);
        if ( crc8(data, 8) != data[8] ) {
            if ( --retry <= 0 ) {
                retry = 0;
                return -10000;
            }
            return Temperature();
        }
        retry = RETRY_NUMBER;
        return temp * 100 / 16;
    }
}
