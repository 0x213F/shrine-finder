// TODO write descriptive comment here
// TODO impliment function
function determinePlatform() {
    return SWITCH720;
}

// TODO impliment comparison with master image
// paint unvisited shrines red
function highlightShrines(canvasId, imgSrc, half) {

    // paint the image on the canvas
    var img = new Image();                                              /* [3] */
    img.onload = function() {
        var canvas     = document.getElementById(canvasId);             /* [1] */
        canvas.height  = img.height;
        canvas.width   = img.width;
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);

        // trim the image to just show the map
        var pixels     = canvas.getContext("2d")
                               .getImageData(trim.SIDE,
                                             trim["TOP" + half],
                                             canvas.width - 2*trim.SIDE,
                                             canvas.height - trim["TOP"+half] - trim["BOT"+half]);

        // iterate through each pixel
        for(var idx = 0 ; idx < pixels.data.length ; idx += 4) {        /* [2] */

            var r = pixels.data[idx+0],
                g = pixels.data[idx+1],
                b = pixels.data[idx+2];  /* NOTE: ignore the opacity parameter */

            if(isBlue(r, g, b)) {
                drawBluePixel(pixels.data, idx);
            } else {
                desaturatePixel(pixels.data, idx);
            }

        }

        // repaint the image on the canvas
        canvas.height    = img.height - trim["TOP" + half] - trim["BOT" + half];
        canvas.width     = img.width - trim.SIDE*2;
        canvas.getContext('2d').putImageData(pixels, 0, 0);
        canvas.className = '';
    };
    img.src = imgSrc;                                                   /* [4] */

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
