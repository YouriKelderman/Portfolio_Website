let script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.4.min.js'; // Check https://jquery.com/ for the current version
document.getElementsByTagName('head')[0].appendChild(script);

window.addEventListener('load', init);


let background;
let heightToUse;

function init() {
    carousel(carouselText, "#span")
    background = document.getElementById("land");
    heightToUse = document.getElementById('land').clientHeight;

}

async function typeSentence(sentence, eleRef, delay = 100) {
    const letters = sentence.split("");
    let i = 0;
    while (i < letters.length) {
        await waitForMs(delay);
        $(eleRef).append(letters[i]);
        i++
    }
    return;
}

async function deleteSentence(eleRef) {
    const sentence = $(eleRef).html();
    const letters = sentence.split("");
    let i = 0;
    while (letters.length > 0) {
        await waitForMs(100);
        letters.pop();
        $(eleRef).html(letters.join(""));
    }
}

function waitForMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const carouselText = [
    {text: "Front End", color: "red"},
    {text: "YouTube Management", color: "orange"},
    {text: "YouTube Strategies", color: "yellow"}
]

async function carousel(carouselList, eleRef) {
    let i = 0;
    while (true) {
        updateFontColor(eleRef, carouselList[i].color)
        await typeSentence(carouselList[i].text, eleRef);
        await waitForMs(1500);
        await deleteSentence(eleRef);
        await waitForMs(500);
        i++
        if (i >= carouselList.length) {
            i = 0;
        }
    }
}

function updateFontColor(eleRef, color) {
    $(eleRef).css('color', color);
}

window.addEventListener("scroll", function () {
    if (window.scrollY <= heightToUse) {

        let percentage =  ((window.scrollY +100 ) / heightToUse);
        background.style.opacity = 1 - percentage;

    }
    else {
        percentage = 1;
        background.style.opacity = 1 - percentage;

    }

})
