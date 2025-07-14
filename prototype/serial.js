var port;
var reader;
var writer;
var locked = false;
var textDecoder = new TextDecoderStream();
var textEncoder = new TextEncoderStream();
var readableStreamClosed;
var writableStreamClosed;

var enableDecoder = true;
var enableEncoder = false;

var table;

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

openSerial().then(console.log);

async function beginListening() {
    while(locked) {
        const { value, done } = await reader.read();
        if (done) {
            // Allow the serial port to be closed later.
            reader.releaseLock();
            break;
        }
        // value is a Uint8Array.
        document.getElementById("outputStream").innerHTML += value.toHex();
        document.getElementById("outputStream").innerHTML += "<br>";
    }
}

async function sendMessage() {
    await writer.write(document.getElementById("input").value);
}