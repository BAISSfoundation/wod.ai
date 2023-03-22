#! /usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
const wod = require("../index")
const Web = require("./web/index")
let cmd = argv._[0]
if (argv._.length > 0) {
  let args = argv._.slice(1)
  let home = argv.home
  let fresh = argv.fresh
  if (cmd === "serve") {
    const port = (args.length > 0 ? args[0] : 3000)
    Web(port, home)
  } else if (cmd === "setup") {
    new wod(home).setup().then(() => {
      process.exit(0)
    }).catch((e) => {
      console.log("Error", e)
      process.exit(1)
    })
  } else {
    if (args.length > 0) {
      let core = cmd
      let [method, ...callparams] = args 
      let wod = new wod(home)
      console.log({ method, callparams })
      // 1. install => install the core module
      // 2. get => get models
      wod[method](core, ...callparams).then(() => {
        process.exit(0)
      }).catch((e) => {
        console.log("ERROR", e)
        process.exit(1)
      })
    } else {
      console.log("############################################")
      console.log("#")
      console.log("#  Supported Commands:")
      console.log("#")
      console.log("#  1. System command")
      console.log("#")
      console.log("#    wod serve <port (optional)>")
      console.log("#")
      console.log("#  2. Model command")
      console.log("#")
      console.log("#    wod llama get <model names>")
      console.log("#")
      console.log("############################################")
    }
  }
} else {
  console.log("ERROR: Please pass a command")
  process.exit(1)
}

//if (process.argv.length > 0) {
//  let [cmd, ...args] = process.argv.slice(2)
//  if (cmd === "serve") {
//    const port = (args.length > 0 ? parseInt(args[0]) : 3000)
//    Web(port)
//  } else if (cmd === "setup") {
//    new wod().setup().then(() => {
//      process.exit(0)
//    }).catch((e) => {
//      console.log("Error", e)
//      process.exit(1)
//    })
//  } else {
//    if (args.length > 0) {
//      let core = cmd
//      let [method, ...callparams] = args 
//      let wod = new wod()
//      console.log({ method, callparams })
//      // 1. install => install the core module
//      // 2. get => get models
//      wod[method](core, ...callparams).then(() => {
//        process.exit(0)
//      }).catch((e) => {
//        console.log("ERROR", e)
//        process.exit(1)
//      })
//    } else {
//      console.log("############################################")
//      console.log("#")
//      console.log("#  Supported Commands:")
//      console.log("#")
//      console.log("#  1. System command")
//      console.log("#")
//      console.log("#    wod serve <port (optional)>")
//      console.log("#")
//      console.log("#  2. Model command")
//      console.log("#")
//      console.log("#    wod llama get <model names>")
//      console.log("#")
//      console.log("############################################")
//    }
//  }
//} else {
//  console.log("ERROR: Please pass a command")
//  process.exit(1)
//}
