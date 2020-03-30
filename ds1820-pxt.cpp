 /*
  * Based on:
  * https://github.com/Tinkertanker/pxt-ds1820-temperature-sensor/
  * 
*/
#include "pxt.h"
#include "source/DS1820_s.h"

using namespace pxt;

enum class Pins_s{
  P0=  3,
  P1=  2,
  P2=  1,
  P3=  4,
  P4=  5,
  P5=  17,
  P6=  12,
  P7=  11,
  P8=  18,
  P9=  10,
  P10= 6,
  P11= 26,
  P12= 20,
  P13= 23,
  P14= 22,
  P15= 21,
  P16= 16,
  P19= 0,
  P20= 30
};

namespace DS1820pxt_s { 

  DS1820_s *probe;
  //%
  void cpp_init(){
    Pins_s pin = Pins_s::P0;
    if (probe != NULL) delete(probe);
    probe = new DS1820_s((PinName)pin);
    probe->convertTemperature(true, DS1820_s::all_devices);
  }

  //%
  float cpp_temp1dp() {
    probe->convertTemperature(true, DS1820_s::all_devices);
    uBit.sleep(20);
//    return ((int)(probe->temperature() * 10.0));
    return probe->temperature();
  }
}