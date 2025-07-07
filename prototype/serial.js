var port;
var reader;
var writer;
var locked = false;
var textDecoder = new TextDecoderStream();
var textEncoder = new TextEncoderStream();
var readableStreamClosed;
var writableStreamClosed;

var enableDecoder = true;
var enableEncoder = true;

var table;

for(i = 0; i < 15; i++) {
    var output = ```<tr><td>P${Math.floor(i / 8)}.${i % 8}}</td></tr>```;
    document.getElementById("feedbackTable").innerHTML += output;

}

if("serial" in navigator) {
    document.getElementById("output").innerHTML = "Serial Supported"
} else {
    document.getElementById("output").innerHTML = "Serial Not Supported"
}
// don't ask me what any of this does or how it works
// as far as i'm concerned it doesn't, and it's all black magic to be
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
    var locked = true;
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
        document.getElementById("outputStream").innerHTML += value;
        document.getElementById("outputStream").innerHTML += "<br>";
    }
}

async function sendMessage() {
    await writer.write(document.getElementById("input").value);
}