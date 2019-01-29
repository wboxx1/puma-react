//const crypto = require('crypto');
import Visa from './node-visa';

// this usually takes a few seconds
export default function work(limit = 100000)
{
    const visa = new Visa('TCPIP0::192.168.100.2::INSTR');
    visa.openDefaultRM().open();
    // const start = Date.now();
    // let n = 0;
    // while (n < limit)
    // {
    //     crypto.randomBytes(2048);
    //     n += 1;
    // }
    // return {
    //     timeElapsed: Date.now() - start,
    // };
}
