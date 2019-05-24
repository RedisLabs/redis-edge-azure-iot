#!/usr/bin/env node

"use strict"

const Promise = require("bluebird")

const Transport = require("azure-iot-device-mqtt").Mqtt
const Client = Promise.promisifyAll(require("azure-iot-device").ModuleClient)
const Message = require("azure-iot-device").Message

process.stdout.write("I am RedisEdge\n")

// Helper function to print results in the console
function printResultFor(op) {
  return function printResult(err, res) {
    if (err) {
      process.stdout.write(`${op} error: ${err.toString()}\n`)
    }
    if (res) {
      process.stdout.write(`${op} Status: ${res.constructor.name}\n`)
    }
  }
}

// This function just pipes the messages without any change.
function pipeMessage(client, inputName, msg) {
  client.complete(msg, printResultFor("Receiving message"))

  if (inputName === "input1") {
    const message = msg.getBytes().toString("utf8")
    if (message) {
      const outputMsg = new Message(message)
      client.sendOutputEvent(
        "output1",
        outputMsg,
        printResultFor(`Piping message ${JSON.stringify(outputMsg)}`),
      )
    }
  }
}

Client.fromEnvironment(Transport, (err, client) => {
  if (err) {
    throw err
  } else {
    client.on("error", (e) => {
      throw e
    })

    // connect to the Edge instance
    client.open((e) => {
      if (e) {
        process.stdout.write(`err = ${JSON.stringify(err)}\n`)
        throw e
      } else {
        process.stdout.write("IoT Hub module client initialized\n")

        // Act on input messages to the module.
        client.on("inputMessage", (inputName, msg) => {
          pipeMessage(client, inputName, msg)
        })
      }
    })
  }
})
