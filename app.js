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
    var img = document.createElement("img");
    if (note == 64){
        lat = '41.8781';
        lon = '-87.6298';
        document.getElementById("testelm").style.color = `purple`;
        document.getElementById("temp").style.color = `purple`;
        document.getElementById("testelm").innerHTML = "Chicago";
        document.getElementById("imagechange").src = "https://interactive.wttw.com/sites/default/files/explore-chicago-from-the-air-hero_02.jpg";
        
    }

    var old = console.log;
    var logger = document.getElementById('temp');
    console.temp = function (message) {
        if (typeof message == 'object') {
            logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
        } else {
            logger.innerHTML += message + '<br />';
        }
    }


    if (note == 65){
        lat = '40.7128';
        lon = '-74.0060';
        document.getElementById("testelm").style.color = `yellow`;
        document.getElementById("temp").style.color = `yellow`;
        document.getElementById("testelm").innerHTML = "New York";
        document.getElementById("imagechange").src ="https://blog-www.pods.com/wp-content/uploads/2019/04/MG_1_1_New_York_City-1.jpg";
    }

    if (note == 66){
        lat = '45.6770';
        lon = '-111.0429';
        document.getElementById("testelm").style.color = `green`;
        document.getElementById("temp").style.color = `green`;
        document.getElementById("testelm").innerHTML = "Bozeman";
        document.getElementById("imagechange").src ="https://www.visittheusa.com/sites/default/files/styles/hero_l/public/images/hero_media_image/2017-03/GallatinNatlForest_Bozeman_shutterstock_15145891_Web72DPI.jpg?itok=4mDrLDin";
    }
    
    if (note == 67){
        lat = '25.0343';
        lon = '-77.3963';
        document.getElementById("testelm").style.color = `orange`;
        document.getElementById("temp").style.color = `orange`;
        document.getElementById("testelm").innerHTML = "Bahamas";
        document.getElementById("imagechange").src = "https://e291f1206726d700191b-d0cedd1cc05016668dc83bc2742129e5.ssl.cf1.rackcdn.com/windsong/media/photo-intro-5fbfa58f5f0cf.jpg";
    }

    if (note == 60){
        lat = '43.0962';
        lon = '-79.0377';
        document.getElementById("testelm").style.color = `green`;
        document.getElementById("temp").style.color = `green`
        document.getElementById("testelm").innerHTML = "Niagara Falls";
        document.getElementById("imagechange").src = "https://upload.wikimedia.org/wikipedia/commons/a/ab/3Falls_Niagara.jpg";
    }

    if (note == 61){
        lat = '20.6597';
        lon = '-103.3496';
        document.getElementById("testelm").style.color = `red`;
        document.getElementById("temp").style.color = `red`;
        document.getElementById("testelm").innerHTML = "Guadalajara";
        document.getElementById("imagechange").src = "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2021%2F11%2F09%2Fguadalajara-city-guide-FT-BLOG1121-4.jpg";
    }

    if (note == 62){
        lat = '36.0544';
        lon = '-112.1401';
        document.getElementById("testelm").style.color = `yellow`;
        document.getElementById("temp").style.color = `yellow`;
        document.getElementById("testelm").innerHTML = "Grand Canyon";
        document.getElementById("imagechange").src = "https://www.undercanvas.com/wp-content/uploads/2021/07/Grand-Canyon-scaled.jpg";
    }

    if (note == 63){
        lat = '27.6648';
        lon = '-81.5158';
        document.getElementById("testelm").style.color = `red`;
        document.getElementById("temp").style.color = `red`;
        document.getElementById("testelm").innerHTML = "Florida";
        document.getElementById("imagechange").src = "https://media.cntraveler.com/photos/5cc23e267a570ff0cdde82c6/master/w_4000,h_2667,c_limit/BAHIA_EBFR4G.jpg";
    }

    if (note == 56){
        lat = '45.5152';
        lon = '-122.6784';
        document.getElementById("testelm").style.color = `blue`;
        document.getElementById("temp").style.color = `blue`;
        document.getElementById("testelm").innerHTML = "Portland";
        document.getElementById("imagechange").src = "https://www.gonext.com/wp-content/uploads/2019/10/Portland-Oregon_iS_994318522_web.jpg";
    }


    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=${units}`,
        async: false,
        crossDomain: true,


        complete: function (response) {
            if (response.readyState === 4 && response.status === 200){
                console.log(response);

                temp = response.responseJSON.main.temp;
                desc = response.responseJSON.weather[0].description;
                country = response.responseJSON.sys.country;
                city = response.responseJSON.name;
                feels_like = response.responseJSON.main.feels_like;

                console.log(`country: ${country}`);
                console.log(`city: ${city}`);
                console.log(`description: ${desc}`);
                console.temp(`temp: ${temp}`);
                console.log(`feels_like: ${feels_like}`);

            }
        }
    })

    


}

function noteOff(note){
    console.log(`note: ${note} //off`);
    if (note == 64){
        document.getElementById("temp").innerHTML = ``;
    }


    if (note == 65){
        document.getElementById("temp").innerHTML = ``;
    }

    if (note == 66){
        document.getElementById("temp").innerHTML = ``;
    }

    if (note == 67){
        document.getElementById("temp").innerHTML = ``;
    }

    if (note == 60){
        document.getElementById("temp").innerHTML = ``;
    }


    if (note == 61){
        document.getElementById("temp").innerHTML = ``;
    }

    if (note == 62){
        document.getElementById("temp").innerHTML = ``;
    }

    if (note == 63){
        document.getElementById("temp").innerHTML = ``;
    }

    if (note == 56){
        document.getElementById("temp").innerHTML = ``;
    }

    

}


function audioplay(){
    audio.play();
}

function audiopause(){
    audio.pause();
}
