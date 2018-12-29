/**
 * ES5 Interface for the NPM Module
 */

const { traceHook } = require('./lib/tracer')
const { createHook } = require('./lib/create-hook')
const { registerHook } = require('./lib/register-hook')
const { createHookApp } = require('./lib/create-hook-app')
const { createHookContext } = require('./lib/create-hook-context')

module.exports = {
    traceHook,
    createHook,
    registerHook,
    createHookApp,
    createHookContext,
}
