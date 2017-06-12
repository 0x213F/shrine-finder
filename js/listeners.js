document.getElementById("generate").addEventListener("click", generateMap);
document.getElementById("demo").addEventListener("click", loadDemoImages);

document.getElementById("uploadimg1ptr").addEventListener("click", function() {
    document.getElementById("uploadimg1").click();
});

document.getElementById("uploadimg2ptr").addEventListener("click", function() {
    document.getElementById("uploadimg2").click();
});

document.getElementById("uploadimg1").addEventListener("change", function() {
    verifyImage("uploadimg1ptr", "uploadimgicon1", this.files[0], 0);
});

document.getElementById("uploadimg2").addEventListener("change", function() {
    verifyImage("uploadimg2ptr", "uploadimgicon2", this.files[0], 1);
});

// toggle example images
document.getElementById("showeximg1").addEventListener("click", function() {
    if(document.getElementById("eximg1").className === "card-image hide") {
        document.getElementById("eximg1").className = "card-image";
    } else {
        document.getElementById("eximg1").className = "card-image hide";
    }
});

document.getElementById("showeximg2").addEventListener("click", function() {
    if(document.getElementById("eximg2").className === "card-image hide") {
        document.getElementById("eximg2").className = "card-image";
    } else {
        document.getElementById("eximg2").className = "card-image hide";
    }
});
