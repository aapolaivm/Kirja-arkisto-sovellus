const chai = require('chai');
const chaihttp = require('chai-http');
const server = require('../app.js');
const { Kirja, SarjanKirja} = require('../models/sarja.js');
const assert = reqire('assert');
const mongoose = require('mongoose');
//const { describe } = require('node:test');

chai.should();
chai.use(chaihttp);

describe("")