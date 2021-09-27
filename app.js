$(document).ready(function () {

    let letterCount = 0;
    let sentenceCount = 0;
    let mistakeCount = 0;
    let secondCount = 0;
    let numberOfWords = 54;
    let targetLetter = $("#target-letter");
    let responseBox = $("#feedback");

    let sentenceArray = ['ten ate neite ate nee enet ite ate inet ent eate',
        'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean',
        'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
    let currentString = sentenceArray[sentenceCount];
    $("#sentence").text(currentString);

    let timerInt = setInterval(function () {
        secondCount = secondCount + 1;
    }, 1000);

    let replayPar = $("<par></par>");
    replayPar.text("Play Again?");
    let yesBtn = $("<button>Yes</button>");
    let noBtn = $("<button>No</button>");
    replayPar.append("<br>", yesBtn);
    replayPar.append(noBtn);

    yesBtn.click(function (e) {
        window.location.reload();
    });

    noBtn.click(function (e) {
        return;
    });


    $("#keyboard-upper-container").ready(function () {
        $("#keyboard-upper-container").hide();

    });

    $(document).keydown(function (e) {
        if (e.keyCode == 16) {
            $("#keyboard-upper-container").show();
            $("#keyboard-lower-container").hide();
        }
    });

    $(document).keyup(function (e) {
        if (e.keyCode == 16) {
            $("#keyboard-upper-container").hide();
            $("#keyboard-lower-container").show();
        }
        $(`#${e.key.charCodeAt(0)}`).css({ "background-color": "", })
    });

    $(document).keypress(function (e) {
        $(`#${e.keyCode}`).css({ "background-color": "#fff2ac", })

        $(document).one("keypress", function () {
            timerInt;
        });


        if (e.keyCode != 16 && e.which == sentenceArray[sentenceCount].charCodeAt(letterCount)) {
            console.log(letterCount++);
            targetLetter.text(sentenceArray[sentenceCount].charAt(letterCount));
            $("#yellow-block").animate({ marginLeft: '+=17.5px' }, 0, resetBlock());
            responseBox.append("<span class='glyphicon glyphicon-ok'></span>");

            if (letterCount == sentenceArray[sentenceCount].length) {
                console.log(sentenceCount = sentenceCount + 1);
                $("#sentence").text(sentenceArray[sentenceCount]);
                responseBox.empty();
                letterCount = 0;

                if (sentenceCount == 5) {
                    responseBox.empty();
                    endTime = Date.now();
                    let seconds = secondCount;
                    let minutes = Math.floor(seconds / 60);
                    responseBox.text("Your WPM is " + (numberOfWords / minutes - 2 * mistakeCount));
                    responseBox.append("<br>", replayPar);
                    $(replayPar).hide();
                    $(replayPar).show(3000);
                    clearInterval(timerInt);
                    return;
                };
            };

        } else if (e.keycode != 16 && e.keyCode != sentenceArray[sentenceCount].charCodeAt(letterCount)) {
            console.log(mistakeCount++);
            responseBox.append("<span class='glyphicon glyphicon-remove'></span>");
        };
    });

    function resetBlock() {
        if (letterCount == sentenceArray[sentenceCount].length) {
            $("#yellow-block").removeAttr("style");
        };
    };
});


