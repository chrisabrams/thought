var chai   = require('chai'),
    expect = chai.expect

global.expect = expect

/*
Some junk to make testing SDK easier on Node
*/
global.window = {
  env: null
}
