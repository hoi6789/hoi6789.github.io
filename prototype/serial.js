var port;
var reader;
var writer;
var locked = false;
var textDecoder = new TextDecoderStream();
var textEncoder = new TextEncoderStream();
var readableStreamClosed;
var writableStreamClosed;

var enableDecoder = false;
var enableEncoder = false;

var table;
var storedValues = [];
// stored values is array in array in array action! [[[[val, cnt] (P0.0), [] (P0.1)...] (P0.x), [] (P1.x)...] (mcu14), [...] (mcu3)...]
// outer arrays represents each mcu. order is always 14, 3, 4, 5...
// updating the value of P2.6 in MCU4 is equal to setting storedValues[2][2][6][0]
var loadedMCUs = 6;
var globalSource = 0;

var activityLog = [];

var MCUToStore = {
    14: 0,
    3: 1,
    4: 2,
    5: 3,
    6: 4,
    7: 5,
    8: 6,
    9: 7
}

var StoreToMCU = [14, 3, 4, 5, 6, 7, 8, 9]

var buffer = [];
var timeout;

for(j = 0; j < loadedMCUs; j++) {
    storedValues[j] = [];
    document.getElementById("mcuGrid").innerHTML += `<table><tbody id="feedbackTable${j}"></tbody></table>`
    for(i = 0; i < 16; i++) {
        var output = "<tr>";
        var maj = Math.floor(i / 8);
        var min;
        (i < 8) ? min = i % 8 : min = 7 - (i % 8); 
        output += `<td class="alignRight"> <label class="checkContainer">P${maj}.${min}<input onclick="togglePin(${StoreToMCU[j]},${maj},${min})" type="checkbox" id="check${j}.${maj}.${min}"> <span class="checklight"></span> </label> </td>`;
        if(i == 0) {
            output += `<td>MCU${StoreToMCU[j]}</td>`
        }
        if(i == 1) {
            output += `<td rowspan="16" style="width: 30%"> <img src="relayboard.png" alt="relayboard" height="400"> </td>`;
        }
        maj += 2;
        output += `<td class="alignLeft"> <label class="checkContainer"><input onclick="togglePin(${StoreToMCU[j]},${maj},${min})" type="checkbox" id="check${j}.${maj}.${min}"><span class="checklight"></span>P${maj}.${min} </label> </td>`;
        document.getElementById("feedbackTable" + j).innerHTML += output;
    }
    for(k = 0; k < 5; k++) {
        storedValues[j][k] = [];
        for(l = 0; l < 8; l++) {
            storedValues[j][k][l] = [0, 0];
        }
    }
}




if("serial" in navigator) {
    document.getElementById("output").innerHTML = "Awaiting Serial Device"

} else {
    document.getElementById("output").innerHTML = "Serial Not Supported"
}
// don't ask me what any of this does or how it works
// as far as i'm concerned it doesn't, and it's all black magic to me
async function getSerial() {
    var knownPorts = await navigator.serial.getPorts();
    for(item in knownPorts) {
        await item.forget();
    }
    port = await navigator.serial.requestPort();
    document.getElementById("output").innerHTML = "Connected to Serial Device";
    await port.open(document.getElementById("brate").value);
    reader = await port.readable.getReader();
    writer = await port.writable.getWriter();
    document.getElementById("mcuGrid").style.display = "grid";
    document.getElementById("startup").style.display = "none";
    locked = true;
    beginListening();
}

async function beginListening() {
    while(locked) {
        const { value, done } = await reader.read();
        if (done) {
            // Allow the serial port to be closed later.
            reader.releaseLock();
            break;
        }
        // value is a Uint8Array.
        buffer = buffer.concat(value);
        clearTimeout(timeout);
        if(buffer.length >= 8) {
            flushBuffer();
        } else {
            timeout = setTimeout(flushBuffer, 1000);
        }
    }
}

async function sendMessage() { // BAD BAD BAD BAD BAD
    // 9600 baud by default
    // each message is 8 bytes (8 groups of 2 hex digits) long
    // byte 1: header (fixed at 7c) 
    // byte 2: length (fixed at 06 since 6 info bytes, 1 header, 1 footer)
    // byte 3: address 1 (address of the receiver MCU)
    // byte 4: command code (check command code table)
    // byte 5: parameter (check command code table)
    // byte 6: address 2 (address of the sender MCU)
    // byte 7: checksum (XOR of bytes 2-6)
    // byte 8: footer (fixed at cf)
    // byte 6, 2 is basically like MCU0 -> 3? something like that. not that i know how it works
    // command code has 2 nibbles: nibble 1 is the PX value (1-indexed), nibble 2 is 1 or 0 depending
    // parameter is 8 bits, where every bit is the inverse of the set value except bit N which corresponds to the pin being set
    // Px.7 = 0 -> 01111111; Px.6 = 0 -> 10111111
    // Px.7 = 1 -> 10000000; Px.6 = 1 -> 01000000

    // after receiving a command you should send a return message back
    // command code is used as a return code which is just the command code + 80 
    // parameter is always 0 in return messages
    // remember to change checksum

    // i want the input schema to look like:
    // MCUX -> Y   Pn.m = Z  [Tx]
    // and hopefully i can store inputs I receive? idk i want to make sure I'm reading a return value properly i think
    // whateverrr
    compileSend(document.getElementById("hostMCU").value, document.getElementById("targetMCU").value, document.getElementById("pMajor").value, document.getElementById("pMinor").value, document.getElementById("setOnOff").value);
    
}

async function compileSend(host, target, major, minor, val) {
    var txArray = [0x7c, 0x06, Number(target), 0, 0, Number(host), 0, 0xcf];
    txArray[3] = ((Number(major) + 1) * 16) + Number(val);
    txArray[4] = Math.pow(2, Number(minor));
    if(Number(val) == 0 ) txArray[4] = ~Number(txArray[4]);
    txArray[6] = txArray[2] ^ txArray[3] ^ txArray[4] ^ txArray[5];
    var hexArray = [];
    var outArray = new Uint8Array(txArray);
    for(i = 0; i < 8; i++) {
        hexArray[i] = outArray[i].toString(16);
    }
    console.log(hexArray);
    console.log(txArray);


    activityWrite(hexArray);
    await writer.write(outArray);
}

function togglePin(target, major, minor) {
    compileSend(document.getElementById("hostMCU").value, target, major, minor, Number(!storedValues[MCUToStore[target]][major][minor][0]))
}

async function flushBuffer() {
    for(i = 0; i < buffer.length; i++) {
        buffer[i] = Number(buffer[i]).toString(16);
    }
    activityWrite(buffer);
    buffer = [];
    clearTimeout(timeout);
}

async function activityWrite(data) {
    // data is an array with 8 bytes in it. please find a way to make it look normal
    var onOff = parseInt(data[3], 16) % 16;
    var parameter = parseInt(data[4], 16);
    var _major = Math.floor(parseInt(data[3], 16) / 16 - 1)
    if(!onOff) parameter = 255 - parameter;
    parameter = Math.log2(parameter);
    var simplify = `MCU${data[5]}->${data[2]}: P${_major}.${parameter} = ${onOff}`;
    var currentDate = new Date(Date.now());
    var currentTime = currentDate.toString().substring(4, 24) + ":" + currentDate.getMilliseconds();
    
    if(storedValues[MCUToStore[parseInt(data[2], 16)]][_major][parameter][0] != onOff) {
        storedValues[MCUToStore[parseInt(data[2], 16)]][_major][parameter][0] = onOff;
        storedValues[MCUToStore[parseInt(data[2], 16)]][_major][parameter][1]++;
    }

    document.getElementById(`check${MCUToStore[parseInt(data[2], 16)]}.${_major}.${parameter}`).checked = Boolean(onOff);

    activityLog.push([currentTime, simplify]);
    document.getElementById("outputStream").innerHTML += `${currentTime}: ${simplify}`;
    document.getElementById("outputStream").innerHTML += ` (raw: ${data})`;
    document.getElementById("outputStream").innerHTML += "<br>";
}

async function saveLog() {
    var processedLog = activityLog.join("\n");
    var outBlob = new Blob([processedLog], {type: "text/plain", endings: "native"})
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    url = window.URL.createObjectURL(outBlob);
    a.href = url;
    a.download = String(Date.now()) + ".txt";
    a.click();
    window.URL.revokeObjectURL(url);
    //do thing where it creates an <a> and clicks it and it downloads waowoaoawa 
}