console.log('I am adobe.');
var getId = function(id) {
    return document.getElementById(id);
};
window.onload = function() {
    // waterfall
    waterfall('main', 'box');
}

function getCla(parent, claName) {
    var oParent = getId(parent),
        oElements = oParent.getElementsByTagName('div'),
        len = oElements.length,
        bArr = [];
    for (var i = 0; i < len; i++) {
        if (oElements[i].className == claName) {
            bArr.push(oElements[i]);
        }
    }
    return bArr;
}

function getMinIndex(arr, minH) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        if (arr[i] == minH)
            return i;
    }
}

function waterfall(parent, child) {
    var hArr = [],
        oParent = getId(parent);
        boxsH = getCla(parent, child),
        len = boxsH.length,
        left = boxsH[0].offsetLeft;
    for (var i = 0; i < len; i++) {
        var boxH = boxsH[i].offsetHeight;
        if (i < 5) {
            hArr[i] = boxH;
        } else {
            var minHeight = Math.min.apply(null, hArr);
            var minIndex = getMinIndex(hArr, minHeight);
            boxsH[i].style.position = "absolute";
            boxsH[i].style.top = minHeight + 'px';
            boxsH[i].style.left = boxsH[minIndex].offsetLeft + 'px';
            hArr[minIndex] += boxsH[i].offsetHeight;
        }
        if (boxsH[i].offsetLeft == left) {
            boxsH[i].style.paddingLeft = 0;
        }
    }
    var maxH = Math.max.apply(null, hArr);
    oParent.style.height = maxH + 'px';
}
waterfall('main', 'box');