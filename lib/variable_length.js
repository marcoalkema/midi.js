var util = require('util');
// read a variable length value from position offset

exports.readVariableLength = function(buffer,offset){
  var byte;
  var ret = {
    value: 0,
    length: 0
  };
  for(var i=0;i<4;i+=1){
    byte = buffer.readUInt8(offset + ret.length);
    //util.log('varlen: byte read is: ' + byte.toString(16) + ' at offset ' + (offset + ret.length).toString(16));
    ret.value = (ret.value << 7) + (byte & 0x7f);
    ret.length += 1;
    //util.log('topbit set? ' + (byte & 0x80));
    if((byte & 0x80) === 0){ // top bit not set, end of value
      i = 4; // force end      
    }
  }
  //util.log('varlen: varlen read from offset ' + offset.toString(16) + ' and value: ' + util.inspect(ret));
  return ret;
};