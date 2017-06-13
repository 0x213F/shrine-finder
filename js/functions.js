function loadDemoImages(idx) {

    function loadImage(idx) {

        if(idx > 1) {
            generateMap();
            return;
        }

        var img = new Image();
        img.onload = function() {
            var trim       = SWITCH720;
            var canvas     = document.createElement('canvas');
            canvas.height  = img.height;
            canvas.width   = img.width;
            canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
            var pixels     = canvas.getContext("2d")
                                   .getImageData(trim.SIDE,
                                                 trim["TOP" + idx],
                                                 canvas.width - 2*trim.SIDE,
                                                 canvas.height - trim["TOP"+idx] - trim["BOT"+idx]);
            SYSTEMS["switch" + img.height].test[idx] = pixels;
            loadImage(idx+1);
        };
        img.src = "./media/tests/test" + (idx + 1) + ".png";
    }

    document.getElementById("generate").firstChild.data = "🤔";
    document.getElementById("generate").className = "btn btn-primary disabled";
    setTimeout(function() {
        loadImage(0);
    });
}

function verifyImage(btnId, iconId, file, idx) {

    function displaySuccess() {
        var node = document.getElementById(btnId);
        node.style.backgroundColor = "#9cc657";
        node.style.borderColor = "#94c24c";

        node = document.getElementById(iconId);
        node.className = "icon icon-check";

        node = document.getElementById("generate");
        var cn1 = document.getElementById("uploadimgicon1").className,
            cn2 = document.getElementById("uploadimgicon2").className;

        if(cn1 === "icon icon-check" && cn2 === "icon icon-check") {
            node.className = "btn btn-primary";
        }

    }

    var reader = new FileReader();
    reader.onload = (function(f) {
        return function(e) {
            var img = new Image();
            img.onload = function() {
                var trim       = img.height === 720 ? SWITCH720 : SWITCH1080;
                var canvas     = document.createElement('canvas');
                canvas.height  = img.height;
                canvas.width   = img.width;
                canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
                var pixels     = canvas.getContext("2d")
                                       .getImageData(trim.SIDE,
                                                     trim["TOP" + idx],
                                                     canvas.width - 2*trim.SIDE,
                                                     canvas.height - trim["TOP"+idx] - trim["BOT"+idx]);
                SYSTEMS["switch" + img.height].test[idx] = pixels;
            };
            img.src = e.target.result;
        }
    })(file);
    reader.readAsDataURL(file);

    // TODO input validation
    displaySuccess();

}

function imageToCanvas(idx, resolution) {
    var trim = resolution === 720 ? SWITCH720 : SWITCH1080;
    var img        = SYSTEMS["switch" + resolution].answers[idx];
    var canvas     = document.createElement('canvas');
    canvas.height  = img.height;
    canvas.width   = img.width;
    canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
    var pixels     = canvas.getContext("2d")
                           .getImageData(trim.SIDE,
                                         trim["TOP"+idx],
                                         canvas.width - 2*trim.SIDE,
                                         canvas.height - trim["TOP"+idx] - trim["BOT"+idx]);
    SYSTEMS["switch" + resolution].answers[idx] = pixels;
}

function generateMap() {
    document.getElementById("generate").className = "btn btn-primary disabled";
    document.getElementById("generate").firstChild.data = "🤔";
    setTimeout(function() {
        highlightShrines("map1", 0);
        highlightShrines("map2", 1);
        document.getElementById("smiley").className = "";
        document.getElementById("source").className = "";
        document.getElementById("setup").className = "hide";
        document.getElementById("zoom").className = "zoom";
        document.body.style.backgroundColor = "#50596c";
        document.getElementById("map1").style.maxWidth = window.innerWidth - 20 + "px";
        document.getElementById("map2").style.maxWidth = window.innerWidth - 20 + "px";
    }, 100);
}

// TODO impliment comparison with master image
// paint unvisited shrines red
function highlightShrines(canvasId, half) {

        var h = SYSTEMS.switch720.test.length === 2 ? 720 : 1080,
            w = SYSTEMS.switch720.test.length === 2 ? 1280 : 1920,
            trim = SYSTEMS.switch720.test.length === 2 ? SWITCH720 : SWITCH1080;


        // iterate through each pixel
        for(var idx = 0 ; idx < SYSTEMS["switch"+h].test[half].data.length ; idx += 4) {        /* [2] */

            /* NOTE: ignore the opacity parameter */

            var rt = SYSTEMS["switch"+h].test[half].data[idx+0],
                gt = SYSTEMS["switch"+h].test[half].data[idx+1],
                bt = SYSTEMS["switch"+h].test[half].data[idx+2],
                ra = SYSTEMS["switch"+h].answers[half].data[idx+0],
                ga = SYSTEMS["switch"+h].answers[half].data[idx+1],
                ba = SYSTEMS["switch"+h].answers[half].data[idx+2];

            if(isBlue(ra, ga, ba) && isOrange(rt, gt, bt)) {
                drawOrangePixel(SYSTEMS["switch"+h].answers[half].data, idx);
            } else if(isBlue(ra, ga, ba) && !isBlue(rt, gt, bt)) {
                drawBluePixel(SYSTEMS["switch"+h].answers[half].data, idx);
            } else {
                desaturatePixel(SYSTEMS["switch"+h].answers[half].data, idx);
            }

        }

        var canvas     = document.getElementById(canvasId);             /* [1] */
        // repaint the image on the canvas
        canvas.height    = h - trim["TOP" + half] - trim["BOT" + half];
        canvas.width     = w - trim.SIDE*2;
        canvas.getContext('2d').putImageData(SYSTEMS["switch"+h].answers[half], 0, 0);
        canvas.className = 'photo center';
                                             /* [4] */

    // approximate range of color values for shrine icons
    function isBlue(r, g, b) {
        return (r > 36 && r < 156) && (b > 150 && b < 256);
    }

    // approximate range of color values for shrine icons
    function isOrange(r, g, b) {
        var t = 50;
        return (r > 219-t && r < 219+t) && (g > 178-t && g < 178+t) && (b > 108-t && b < 108+t);
    }

    // make pixel at index red
    function drawBluePixel(pixels, idx) {
        pixels[idx+0] = 0;
        pixels[idx+1] = 0;
        pixels[idx+2] = 255;
        pixels[idx+3] = 255;
    }

    // make pixel at index red
    function drawOrangePixel(pixels, idx) {
        pixels[idx+0] = 255;
        pixels[idx+1] = 215;
        pixels[idx+2] = 0;
        pixels[idx+3] = 255;
    }

    // make pixel at index desaturated
    function desaturatePixel(pixels, idx) {
        var avg = (pixels[idx+0] + pixels[idx+1] + pixels[idx+2]) / 3;
        pixels[idx+0] = avg;
        pixels[idx+1] = avg;
        pixels[idx+2] = avg;
        pixels[idx+3] = 255;
    }
}

/*
 *      [1] - http://www.phpied.com/photo-canvas-tag-flip/
 *      [2] - https://stackoverflow.com/questions/17714742/looping-through-pixels-in-an-image
 *      [3] - https://stackoverflow.com/questions/19338032/canvas-indexsizeerror-index-or-size-is-negative-or-greater-than-the-allowed-a
 *      [4] - https://stackoverflow.com/questions/15504370/html5-canvas-drawimage-not-always-drawing-the-image
 *      [5] - https://stackoverflow.com/questions/5281430/how-to-change-choose-file-into-browse
 *      [6] - https://www.html5rocks.com/en/tutorials/file/dndfiles/
 *      [7] - https://stackoverflow.com/questions/12679813/how-to-change-button-text-or-link-text-in-javascript
 */
