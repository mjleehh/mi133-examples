#!/usr/bin/env sh

if [ ! -L node_modules/src ]
then
    ln -s ../src node_modules/src
fi

npx babel-watch src/backend/index.js &
backendPid=$!

npx webpack-dev-server --mode development --open &
devServerPid=$!

killBackend() {
    if kill -9 ${backendPid}
    then
        echo "stopped backend server"
    fi
}

killDevServer() {
    if kill -9 ${devServerPid}
    then
        echo "stopped webpack dev server"
    fi
}

onClose() {
    killDevServer
    killBackend
}


if ! kill -0 ${devServerPid}
then
    killBackend
    exit 1
fi

if ! kill -0 ${backendPid}
then
    killDevServer
    exit 1
fi

trap onClose 1 2 3 6
wait
