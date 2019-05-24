# RedisEdge for Azure IoT Edge

In Azure IoT Edge speak, this is a solution that consists of a single module: the RedisEdge module.

The Redis module is a Docker image initialized from [docker-library/redis/5.0](https://github.com/docker-library/redis/tree/master/5.0). It then needs a bit of NodeJS to support the hooks for the Azure IoT Edge runtime.

## Prerequisites

`.env`

``` sh
CONTAINER_REGISTRY_USERNAME="USERXXX"
CONTAINER_REGISTRY_PASSWORD="PASSXXX"
CONTAINER_REGISTRY_ADDRESS="HOSTXXX"
```
