//let audio = new Audio('sounds/testing.mp3');

if (navigator.requestMIDIAccess){
    navigator.requestMIDIAccess().then(success, failure);
}

function failure(){
    console.log('could not connect MIDI');
}

function updateDevices(event){
   console.log(event);
}

function success(midiAccess){
    midiAccess.addEventListener('statechange', updateDevices);
    const inputs = midiAccess.inputs;

    for (var output of midiAccess.outputs.values()){
        device = output;
        console.log('Output device selected', device);
    }

    inputs.forEach((input) => {
        input.addEventListener('midimessage', handleInput);
    })
}

function colorKeys(key, clr) {
    device && device.send([0x90, key, clr]); 
}


function clearAll() {
    for (let i = 0; i < 100; i++) {
        colorKeys(i, 0)
    }
}


function colorAll() {
    for (let i = 0; i < 100; i++) {
        colorKeys(i, i)
    }
}

function handleInput(input){
    const command = input.data[0];
    const note = input.data[1];
    const velocity = input.data[2];


    switch (command) {
        case 144:
        if (velocity > 0){
            noteOn(note);
        } else {
            noteOff(note);
        }
        break;
    }
}

function noteOn(note){
    console.log(`note: ${note} //on`);
    if (note == 64){
        lat = '41.8781';
        lon = '-87.6298';
        document.getElementById("testelm").innerHTML = "Note 64 is On";
        colorKeys(65,40);
    }

    if (note == 65){
        lat = '40.7128';
        lon = '-74.0060';
    }
    
    if (note == 96){
        lat = '45.6770';
        lon = '-111.0429';
        document.getElementById("testelm").style.backgroundColor = `rgba(0,0,0,1)`;
    }

    if (note == 99){
        audioplay();
    }


}

function noteOff(note){
    console.log(`note: ${note} //off`);
    if (note == 64){
        document.getElementById("testelm").innerHTML = "Back to Normal";
    }

    if (note == 65){
        clearAll();
    }

    if (note == 96){
        b = 10;
        document.getElementById("testelm").style.backgroundColor = `rgba(0,0,${b},1)`;
    }

    if (note == 97){
        lat = '25.0343';
        lon = '-77.3963';
        b = 100;
        document.getElementById("testelm").style.backgroundColor = `rgba(0,0,${b},1)`;
    }

    if (note == 98){
        lat = '43.0962';
        lon = '-79.0377';
        b = 175;
        document.getElementById("testelm").style.backgroundColor = `rgba(0,0,${b},1)`;
    }


    if (note == 99){
        lat ='';
        lon ='';
        audiopause();
        //b = 255;
        //let p5_ = new p5();
        //console.log(p5_.map(0.5,0,1,0,100));
        //document.getElementById("testelm").style.backgroundColor = `rgba(0,0,${b},1)`;
    }

}


function audioplay(){
    audio.play();
}

function audiopause(){
    audio.pause();
}
