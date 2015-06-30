module.exports = [
  {
    commands: ['init'],
    desc: 'Initialize an application',
    dest: 'main#init'
  },
  {
    commands: ['generate', 'documentation'],
    desc: 'Generate documentation',
    dest: 'generate#docs'
  },
  {
    commands: ['generate', 'resource'],
    desc: 'Generate new resource',
    dest: 'generate#resource'
  },
  {
    commands: ['generate'],
    desc: 'Generate commands',
    dest: 'generate#help'
  },
  {
    commands: [''],
    dest: 'default#help'
  }
]
