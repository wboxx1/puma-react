/************************************************************

 VISA32TEST.JS

visa32test.js is a prototype for using VISA ( Virtual Instrument Software Architechture)
library in node.js.

This is a wrapper for visa32.dll ( in your system32 folder).

I tested this code on Windows 7 (32bit), Keysight IO Library (17.1), node.js(0.10.26) .

Please test on your insturment (e.g. GPIB, RS232, LAN etc...) and fork me, and
develop complete VISA module. (like pyVISA)

to use...

> npm install ffi
> npm install ref
> npm install ref-array
> node visa32test.js

Author : 7M4MON
Date : 2015/04/24
Licence : MIT

*********************************************************** */

import { types, refType, alloc } from 'ref';
import { Library } from 'ffi-napi';
import ArrayType from 'ref-array';

// typedef
const ViError = types.int;
const ViSession = types.void;
const ViSessPtr = refType(ViSession);
const ViRsrc = types.CString;
const ViAccessMode = types.uint32;
const ViUint32 = types.uint32;
const ViPSession = refType(ViSessPtr);
const ViStatus = types.int;
const ViStatPtr = refType(ViStatus);
const ViPStatus = refType(ViStatPtr);

// for viScanf
const byte = types.byte;
const ByteArray = ArrayType(byte);
const ByteArrPtr = refType(ByteArray);
const ByteArrPtrPtr = refType(ByteArrPtr);

const getVisa = Library('visa32.dll', {
    viOpenDefaultRM: [ViError, [ViPSession]],
    viOpen: [ViError, [ViSessPtr, ViRsrc, ViAccessMode, ViUint32, ViPSession]],	// viOpen(sesn, rsrcName, accessMode, timeout, vi)
    viScanf: [ViError, [ViSessPtr, 'string', ByteArrPtrPtr]],
    viClose: [ViError, [ViSessPtr]],
    viStatusDesc: [ViError, [ViSession, ViStatus, ViPStatus]],
});

export default class Visa
{
    constructor(visaAddress)
    {
        this.visaAddress = visaAddress;
        this.visa = getVisa;
        this.session = alloc(ViPSession);
        this.pSession = alloc(ViPSession);
        this.ViError = types.int;
        this.errmsg = alloc(ViPStatus);
    }

    openDefaultRM()
    {
        console.log('Open RM');
        this.viError = this.visa.viOpenDefaultRM(this.session);
        if (this.viError < 0)
        {
            this.visa.viStatusDesc(this.session.deref(), this.viError, this.errmsg);
            throw new Error(this.errmsg.deref());
        }
        return this;
    }

    open()
    {
        console.log('Open');
        this.viError = this.visa.viOpen(this.session.deref(), this.visaAddress, 0, 0, this.pSession);
        if (this.viError < 0)
        {
            this.visa.viStatusDesc(this.session.deref(), this.viError, this.errmsg);
            throw new Error(this.errmsg.deref());
        }
        return this;
    }

    Visa32TestQuery(queryString)
    {
        let resourceManager = '0';
        let viError = 0;
        let session = alloc(ViPSession);
        let pSession = alloc(ViPSession);
        let replyString = '';
        let ByteArray = ArrayType(byte);

        // intialize Buffer
        let replyBuff = new ByteArray(256);
        let counter;
        for (counter = 0; counter < 256; counter += 1)
        {
            replyBuff[counter] = 0;
        }

        console.log('Open RM');
        viError = visa32.viOpenDefaultRM(session);
        console.log(viError);

        // var this.visaAdress;
        // this.visaAdress = 'GPIB0::22::INSTR'

        console.log('ADDR : ' + this.visaAdress);
        viError = visa32.viOpen(session.deref(), this.visaAdress, 0, 0, pSession);

        console.log(viError);

        // var queryString;
        // queryString = "*IDN?";
        viError = visa32.viPrintf(pSession.deref(), `${queryString  }\n`);

        console.log('SEND : ' + queryString);

        viError = visa32.viScanf(pSession.deref(), '%s', replyBuff.buffer);
        console.log(viError);

        console.log('Close session.');
        visa32.viClose(pSession.deref());

        // make reply string
        counter = 0;
        while (replyBuff[counter] !== 0)
        {
            replyString += String.fromCharCode(replyBuff[counter]);
            counter += 1;
        }

        console.log('RECV : ' + replyString);
        return replyString;
    }
}
