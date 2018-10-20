#include <emscripten.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

extern "C" {

EMSCRIPTEN_KEEPALIVE int fib(unsigned int x);

EMSCRIPTEN_KEEPALIVE int addArray(uint8_t nums[], int n);

EMSCRIPTEN_KEEPALIVE uint8_t* gc(uint8_t* pixels, int numPixels);

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
int addArray(uint8_t* nums, int n) {
    if (n < 1) {
        return 0;
    }
    printInt(12000000);
    printInt(n);

    int retval = nums[0];
    for (int i = 1; i < n; ++i) {
        retval = retval + (nums[i] - retval) / (i + 1);
    }
    return retval;
}

uint8_t pixelToGrayscale(uint8_t* pixel) {
    const float rCoeff = 0.2126;
    const float gCoeff = 0.7152;
    const float bCoeff = 0.0722;
    return rCoeff * pixel[0] + gCoeff * pixel[1] + bCoeff * pixel[2];
}

//
// https://becominghuman.ai/passing-and-returning-webassembly-array-parameters-a0f572c65d97
//
uint8_t* gc(uint8_t* pixels, int numPixels) {
    uint8_t* res = (uint8_t*)malloc(numPixels * sizeof(uint8_t) * 4);
    for (int i = 0; i < numPixels; ++i) {
        uint8_t* pixel = res + i * 4;
        uint8_t value = pixelToGrayscale(pixels + i * 4);
        for (int j = 0; j < 3; ++j) {
            pixel[j] = value;
        }
        pixel[3] = 255;
    }
    return res;
}