console.log('I am adobe.');
var getId = function(id) {
    return document.getElementById(id);
};
window.onload = function() {
    // waterfall
    waterfall('main', 'box');

    // cour figure
    var conTrols = getCla("cour", "cour_ctrl")[0].getElementsByTagName('li'),
        courImgs = getCla("cour", "cour_img")[0].getElementsByTagName('a'),
        ctrlLen = conTrols.length,
        opacity = 1;
    for (var i = 0; i < ctrlLen; i++) {
        conTrols[i].save = i;
        conTrols[i].onclick = function() {
            for (var j = 0; j < ctrlLen; j++) {
                conTrols[j].className = "";
            }
            conTrols[this.save].className = "slide_on";
            var timer = setTimeout(function() {
                opacity -= 0.05;
                if (opacity > 0) {
                    courImgs[i].style.opacity = opacity;
                } else {
                    courImgs[i].style.opacity = 0;
                    clearTimeout(timer);
                }
            }, 200);
        }
    };
}

function getCla(parent, claName) {
    var oParent = getId(parent),
        oElements = oParent.getElementsByTagName("*"),
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
        oParent = getId(parent),
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
    }
    for (var j = 0; j < len; j++) {
        if (boxsH[j].offsetLeft == left) {
            boxsH[j].style.paddingLeft = 0;
        }
    }
    var maxH = Math.max.apply(null, hArr);
    oParent.style.height = maxH + 'px';
}
waterfall('main', 'box');