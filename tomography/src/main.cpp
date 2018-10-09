#include <emscripten.h>
#include <stdint.h>
#include <stdio.h>

extern "C" {

EMSCRIPTEN_KEEPALIVE int fib(unsigned int x);

EMSCRIPTEN_KEEPALIVE int addArray(uint8_t nums[], unsigned int n);

extern void printInt(int i);

}

int fib(unsigned int x) {
    if (x == 0) {
        return 0;
    } else if (x == 1) {
        return 1;
    } else {
        return fib(x -1) + fib(x - 2);
    }
}


//
// https://becominghuman.ai/passing-and-returning-webassembly-array-parameters-a0f572c65d97
//
int addArray(uint8_t* nums, unsigned int n) {
    int retval = 0;
    for (int i = 0; i < n; ++i) {
        printInt(nums[i]);
        retval += nums[i];
    }
    return retval;
}
