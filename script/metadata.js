window.onload = function() {
    function updateImageInfo() {
        var img = document.getElementById("myImage");
        EXIF.getData(img, function() {
            var allMetaData = EXIF.getAllTags(this);
            var allMetaDataSpan = document.getElementById("allMetaDataSpan");
            allMetaDataSpan.innerHTML = JSON.stringify(allMetaData, null, "\t");
        });
    }

    updateImageInfo();
}