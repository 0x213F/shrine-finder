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

    // https://www.html5rocks.com/en/tutorials/file/dndfiles/
    var reader = new FileReader();
    reader.onload = (function(f) {
        return function(e) {
            console.log(idx);
            var img = new Image();
            img.onload = function() {
                var canvas     = document.createElement('canvas');             /* [1] */
                canvas.height  = img.height;
                canvas.width   = img.width;
                canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
                console.log(img.height)
                var pixels     = canvas.getContext("2d")
                                       .getImageData(trim.SIDE,
                                                     trim["TOP" + idx],
                                                     canvas.width - 2*trim.SIDE,
                                                     canvas.height - trim["TOP"+idx] - trim["BOT"+idx]);
                SYSTEMS["switch" + img.height].test[idx] = pixels;
            };
            console.log(e.target)
            img.src = e.target.result;
        }
    })(file);
    reader.readAsDataURL(file);

    // TODO input validation
    displaySuccess();

}

function generateMap() {
    highlightShrines("map1", 0);
    highlightShrines("map2", 1);
}

// TODO impliment comparison with master image
// paint unvisited shrines red
function highlightShrines(canvasId, half) {

        // iterate through each pixel
        for(var idx = 0 ; idx < SYSTEMS.switch720.test[half].data.length ; idx += 4) {        /* [2] */

            /* NOTE: ignore the opacity parameter */

            var rt = SYSTEMS.switch720.test[half].data[idx+0],
                gt = SYSTEMS.switch720.test[half].data[idx+1],
                bt = SYSTEMS.switch720.test[half].data[idx+2],
                ra = SYSTEMS.switch720.answers[half].data[idx+0],
                ga = SYSTEMS.switch720.answers[half].data[idx+1],
                ba = SYSTEMS.switch720.answers[half].data[idx+2];

            if(isBlue(ra, ga, ba) && !isBlue(rt, gt, bt)) {
                drawBluePixel(SYSTEMS.switch720.answers[half].data, idx);
            } else {
                desaturatePixel(SYSTEMS.switch720.answers[half].data, idx);
            }

        }

        var canvas     = document.getElementById(canvasId);             /* [1] */
        // repaint the image on the canvas
        canvas.height    = 720 - trim["TOP" + half] - trim["BOT" + half];
        canvas.width     = 1280 - trim.SIDE*2;
        canvas.getContext('2d').putImageData(SYSTEMS.switch720.answers[half], 0, 0);
        canvas.className = '';
                                             /* [4] */

    // approximate range of color values for shrine icons
    function isBlue(r, g, b) {
        return (r > 36 && r < 156) && (b > 150 && b < 256);
    }

    // make pixel at index red
    function drawBluePixel(pixels, idx) {
        pixels[idx+0] = 0;
        pixels[idx+1] = 0;
        pixels[idx+2] = 255;
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
 */
