$(document).ready(function () {
    // defining variables
    let letterCount = 0;
    let sentenceCount = 0;
    let mistakeCount = 0;
    let secondCount = 0;
    let numberOfWords = 54;
    let targetLetter = $("#target-letter");
    let responseBox = $("#feedback");

    //defining & appending sentences
    let sentenceArray = ['ten ate neite ate nee enet ite ate inet ent eate',
        'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean',
        'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
    let currentString = sentenceArray[sentenceCount];
    $("#sentence").text(currentString);

    //setting the timer (in seconds)
    let timerInt = setInterval(function () {
        secondCount = secondCount + 1;
    }, 1000);

    //setting up the paragraph to ask to play again
    let replayPar = $("<par></par>");
    replayPar.text("Play Again?");
    let yesBtn = $("<button>Yes</button>");
    yesBtn.addClass("btn-styling");
    let noBtn = $("<button>No</button>");
    noBtn.addClass("btn-styling");
    replayPar.append("<br>", yesBtn);
    replayPar.append(noBtn);

    //button event listeners
    yesBtn.click(function (e) {
        window.location.reload();
    });

    noBtn.click(function (e) {
        return;
    });

    //hide upper keyboard
    $("#keyboard-upper-container").ready(function () {
        $("#keyboard-upper-container").hide();

    });

    //hide/show upper and lower keyboards on shift
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
        //highlight key off
        $(`#${e.key.charCodeAt(0)}`).css({ "background-color": "", })
    });

    //keypress  events
    $(document).keypress(function (e) {
        //highlight key
        $(`#${e.keyCode}`).css({ "background-color": "#fff2ac", })
        //start timer 
        $(document).one("keypress", function () {
            timerInt();
        });
        //correct key sequence
        if (e.keyCode != 16 && e.which == sentenceArray[sentenceCount].charCodeAt(letterCount)) {
            //increasing the letter count per correct letter
            letterCount++;
            //putting next key target in its display
            if (sentenceArray[sentenceCount].charAt(letterCount) == " ") {
                targetLetter.text("space")
            } else {
                targetLetter.text(sentenceArray[sentenceCount].charAt(letterCount));
            };
            //animating the sentence highlight
            $("#yellow-block").animate({ marginLeft: '+=17.5px' }, 0, resetBlock());
            //tracking correct key press in feedback box
            responseBox.append("<span class='glyphicon glyphicon-ok'></span>");

            //reset sequence
            if (letterCount == sentenceArray[sentenceCount].length) {
                //increase sentence by 1 & appending text
                sentenceCount = sentenceCount + 1;
                $("#sentence").text(sentenceArray[sentenceCount]);
                //clearing feedback
                responseBox.empty();
                //reset letter count
                letterCount = 0;

                //endgame sequence
                if (sentenceCount == 5) {
                    //clearing feedback
                    responseBox.empty();
                    //timer math + wpm calculation
                    let seconds = secondCount;
                    let minutes = Math.floor(seconds / 60);
                    responseBox.text("Your WPM is " + (numberOfWords / minutes - 2 * mistakeCount));
                    //showing play again options
                    responseBox.append("<br>", replayPar);
                    $(replayPar).hide();
                    $(replayPar).show(3000);
                    //reset timer
                    clearInterval(timerInt);
                    return;
                };
            };

            //wrong keypress sequence
        } else if (e.keycode != 16 && e.keyCode != sentenceArray[sentenceCount].charCodeAt(letterCount)) {
            mistakeCount++;
            responseBox.append("<span class='glyphicon glyphicon-remove'></span>");
        };
    });

    //reset sentence highlight function
    function resetBlock() {
        if (letterCount == sentenceArray[sentenceCount].length) {
            $("#yellow-block").removeAttr("style");
        };
    };
});


