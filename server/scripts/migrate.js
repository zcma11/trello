#!/usr/bin/env node
const execa = require('execa')
const { Command } = require('commander')

const create = async ({ type, name }) => {
  try {
    await execa('node', ['--version']).stdout.pipe(process.stdout)
    await execa('./node_modules/.bin/sequelize', [
      `${type}:create`,
      '--name',
      name
    ]).stdout.pipe(process.stdout)
  } catch (e) {
    console.log(e)
  }
}
const program = new Command()
program
  .option('--name <name>')
  .option('--type <type>')
  .action((a, b) => {
    if (a.type && a.name) {
      /**
       * migration
       * seed
       */
      create(a)
    }
  })
program.parse(process.argv)
