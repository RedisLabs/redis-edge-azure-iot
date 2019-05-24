#!/usr/bin/env sh

redis-server --save "" --port 6379 --daemonize yes \
    --loadmodule ${DST_LIB_PATH}/redistimeseries.so \
    --loadmodule ${DST_LIB_PATH}/redisai.so

exec /module/edge-hooks.js
