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

// WARNING: this does not wait for image data to load and render.
//          should not be a problem; not worth the time to impliment.

// TODO clean up this mess...
// load all the images
SYSTEMS.switch720.answers[0].onload  = function() {
    var img        = SYSTEMS.switch720.answers[0];
    var canvas     = document.createElement('canvas');
    canvas.height  = img.height;
    canvas.width   = img.width;
    canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
    var pixels     = canvas.getContext("2d")
                           .getImageData(trim.SIDE,
                                         trim.TOP0,
                                         canvas.width - 2*trim.SIDE,
                                         canvas.height - trim.TOP0 - trim.BOT0);
    SYSTEMS["switch720"].answers[0] = pixels;

};
SYSTEMS.switch720.answers[1].onload  = function() {
    var img        = SYSTEMS.switch720.answers[1];
    var canvas     = document.createElement('canvas');
    canvas.height  = img.height;
    canvas.width   = img.width;
    canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
    var pixels     = canvas.getContext("2d")
                           .getImageData(trim.SIDE,
                                         trim.TOP1,
                                         canvas.width - 2*trim.SIDE,
                                         canvas.height - trim.TOP1 - trim.BOT1);
    SYSTEMS["switch720"].answers[1] = pixels;};
SYSTEMS.switch1080.answers[0].onload = function() {
    var img        = SYSTEMS.switch1080.answers[0];
    var canvas     = document.createElement('canvas');
    canvas.height  = img.height;
    canvas.width   = img.width;
    canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
    var pixels     = canvas.getContext("2d")
                           .getImageData(trim.SIDE,
                                         trim.TOP0,
                                         canvas.width - 2*trim.SIDE,
                                         canvas.height - trim.TOP0 - trim.BOT0);
    SYSTEMS["switch1080"].answers[0] = pixels;
};
SYSTEMS.switch1080.answers[1].onload = function() {
    var img        = SYSTEMS.switch1080.answers[1];
    var canvas     = document.createElement('canvas');
    canvas.height  = img.height;
    canvas.width   = img.width;
    canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
    var pixels     = canvas.getContext("2d")
                           .getImageData(trim.SIDE,
                                         trim.TOP1,
                                         canvas.width - 2*trim.SIDE,
                                         canvas.height - trim.TOP1 - trim.BOT1);
    SYSTEMS["switch1080"].answers[1] = pixels;
};

SYSTEMS.switch720.answers[0].src     = "./media/answers/first720.png";
SYSTEMS.switch720.answers[1].src     = "./media/answers/second720.png";
SYSTEMS.switch1080.answers[0].src    = "./media/answers/first1080.png";
SYSTEMS.switch1080.answers[1].src    = "./media/answers/second1080.png";

// two screenshots to highlight
