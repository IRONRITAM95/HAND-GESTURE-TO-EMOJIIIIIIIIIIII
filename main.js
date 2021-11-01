guess_1 = ""

guess_2 = ""

Webcam.set({
   width:350 ,
   height:300 ,
   image_format: "png" ,
   png_quality: 90  
});

camera = document.getElementById("camera");

Webcam.attach("#camera") ;

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>' ; 
    });
}

 console.log('ml5 version',ml5.version);

 trained = ml5.imageClassifier("https://storage.googleapis.com/tm-model/wVK6is1Bf/model.json",Model_Loaded);

 function Model_Loaded(){
     console.log("MODEL LOADED !!!");
 }

 
 function speak(){
    var synth = window.speechSynthesis  ;
     
    speak_data_1 = "THE 1ST GUESS IS" + guess_1 ;
    speak_data_2 = "THE 2ND GUESS IS" + guess_2 ;

    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);

    synth.speak(utterThis) ;
}

function check(){
    img = document.getElementById("captured_image") ;
    trained.classify(img, gotResult);
}

function gotResult(error, results){
   if(error){
   console.error(error);
        }else{     console.log(results);
          document.getElementById("gesture1").innerHTML = results[0].label ;
          document.getElementById("gesture2").innerHTML = results[1].label ;
          
          guess_1 = results[0].label ;
          guess_2 = results[1].label ;
          speak() ;

          if(guess_1 == "V.BAD"){
           document.getElementById("emoji1").innerHTML = "&#128078;"
        }
        if(guess_1 == "VICTORY/PEACE"){
            document.getElementById("emoji1").innerHTML = "&#9996;"
        }
        if(guess_1 == "BEAUTIFUL"){
           document.getElementById("emoji1").innerHTML = "&#128076;"
        }
        if(guess_1 == "V.GOOD"){
            document.getElementById("emoji1").innerHTML = "&#128077;"
        }

        if(guess_2 == "V.BAD"){
           document.getElementById("emoji2").innerHTML = "&#128078;"
        }
        if(guess_2 == "VICTORY/PEACE"){
            document.getElementById("emoji2").innerHTML = "&#9996;"
        }
        if(guess_2 == "BEAUTIFUL"){
           document.getElementById("emoji2").innerHTML = "&#128076;"
        }
        if(guess_2 == "V.GOOD"){
            document.getElementById("emoji2").innerHTML = "&#128077;"
        }
}}