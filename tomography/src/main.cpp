#include <emscripten.h>

extern "C" {

EMSCRIPTEN_KEEPALIVE int fib(unsigned int x);

EMSCRIPTEN_KEEPALIVE int manyFib(unsigned int x[], unsigned int n);

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
int manyFib(unsigned int x[], unsigned int n) {
    int retval = 0;
    for (int i = 0; i < n; ++i) {
        retval += fib(x[n]);
    }
    return retval;
}