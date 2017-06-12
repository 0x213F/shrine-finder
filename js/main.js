// these variables names are confusing, see clarifcation below
//
// SYSTEMS ~  https://en.wikipedia.org/wiki/Video_game_console
// switch   ~  https://en.wikipedia.org/wiki/Nintendo_Switch
var SYSTEMS = {
        "switch720" : {
            "answers" : [
                new Image(),
                new Image()
            ],
            "test" : [],
        },
        "switch1080" : {
            "answers" : [
                new Image(),
                new Image()
            ],
            "test" : [],
        }
    };

// load all the images
SYSTEMS.switch720.answers[0].onload  = function() {
    imageToCanvas(0, 720);
};
SYSTEMS.switch720.answers[1].onload  = function() {
    imageToCanvas(1, 720);
};
SYSTEMS.switch1080.answers[0].onload = function() {
    imageToCanvas(0, 1080);
};
SYSTEMS.switch1080.answers[1].onload = function() {
    imageToCanvas(1, 1080);
};

// WARNING: this does not wait for image data to load and render.
//          should not be a problem; not worth the time to impliment.
SYSTEMS.switch720.answers[0].src     = "./media/answers/first720.png";
SYSTEMS.switch720.answers[1].src     = "./media/answers/second720.png";
SYSTEMS.switch1080.answers[0].src    = "./media/answers/first1080.png";
SYSTEMS.switch1080.answers[1].src    = "./media/answers/second1080.png";
