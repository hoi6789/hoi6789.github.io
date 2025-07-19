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

var buffer = [];
var timeout;

for(i = 0; i < 16; i++) {
    var output = "<tr>";
    var maj = Math.floor(i / 8);
    var min;
    (i < 8) ? min = i % 8 : min = 7 - (i % 8); 
    output += `<td> <label for="p${maj}${min}">P${maj}.${min}</label><input onclick="" type="checkbox" id="p${maj}${min}"> </td>`;
    if(i == 0) {
        output += `<td rowspan="16"> <img src="relayboard.png" alt="relayboard" height="500"> </td>`;
    }
    maj += 2;
    output += `<td> <label for="p${maj}${min}">P${maj}.${min}</label><input onclick="" type="checkbox" id="p${maj}${min}"> </td>`;
    document.getElementById("feedbackTable").innerHTML += output;
}


if("serial" in navigator) {
    document.getElementById("output").innerHTML = "Serial Supported"
} else {
    document.getElementById("output").innerHTML = "Serial Not Supported"
}
// don't ask me what any of this does or how it works
// as far as i'm concerned it doesn't, and it's all black magic to me
async function getSerial() {
    port = await navigator.serial.requestPort();
    document.getElementById("output").innerHTML = "Connected to: " + await port;
    return 1;
}

async function openSerial() {
    await port.open({ baudRate: 9600 });

    if(enableDecoder) {
        readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
        reader = textDecoder.readable.getReader();
    } else {
        reader = await port.readable.getReader();
    }

    if(enableEncoder) {
        writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
         writer = textEncoder.writable.getWriter();
    } else {
        writer = await port.writable.getWriter();
    }
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

    await writer.write(document.getElementById("input").value);
    
}

async function flushBuffer() {
    for(i = 0; i < buffer.length; i++) {
        buffer[i] = Number(buffer[i]).toString(16);
    }
    document.getElementById("outputStream").innerHTML += buffer;
    document.getElementById("outputStream").innerHTML += "<br>";
    buffer = [];
    clearTimeout(timeout);
}