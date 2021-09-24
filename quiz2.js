(function () {
    var allQuestions = [{
        question: "HTML is what type of a language?",
        options: ["Scripting Language", "Markup Language", "Programming Language", "Network Protocol"],
        answer: 1
    }, {
        question: "Which of the following is used in HTML?",
        options: ["User defined tags", "Pre-specified tags", "Fixed tags defined by the language", "tags only for linking"],
        answer: 3
    }, {
        question: "What year was HTML first proposed?",
        options: ["1990", "1980", "1999", "1993"],
        answer: 3
    }, {
        question: "Fundamental HTML block is known as: ",
        options: ["HTML Tag", "HTML Body", "HTML Element", "HTML Attribute"],
        answer: 0
    }, {
        question: "Apart from <b> tag, what other tag is used to style bold?",
        options: ["fat", "strong", "black", "emp"],
        answer: 1
    }];

    var quesCounter = 0;
    var selectOptions = [];
    var quizSpace = $('#quiz');

    nextQuestion();

    $('#next').click(function () {
        chooseOption();
        if (isNaN(selectOptions[quesCounter])) {
            alert('Please select an option!');
        }
        else {
            quesCounter++;
            nextQuestion();
        }
    });

    $('#prev').click(function () {
        chooseOption();
        quesCounter--;
        nextQuestion();
    });

    function createElement(index) {
        var element = $('<div>', { id: 'question' });
        var header = $('<h2>Question No. ' + (index + 1) + ' :</h2>');
        element.append(header);

        var question = $('<p>').append(allQuestions[index].question);
        element.append(question);

        var radio = radioButtons(index);
        element.append(radio);

        return element;
    }

    function radioButtons(index) {
        var radioItems = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < allQuestions[index].options.length; i++) {
            item = $('<li>');
            input = '<input type="radio" name="answer" value=' + i + ' />';
            input += allQuestions[index].options[i];
            item.append(input);
            radioItems.append(item);
        }
        return radioItems;
    }

    function chooseOption() {
        selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
    }

    function nextQuestion() {
        quizSpace.fadeOut(function () {
            $('#question').remove();
            if (quesCounter < allQuestions.length) {
                var nextQuestion = createElement(quesCounter);
                quizSpace.append(nextQuestion).fadeIn();
                if (!(isNaN(selectOptions[quesCounter]))) {
                    $('input[value=' + selectOptions[quesCounter] + ']').prop('checked', true);
                }
                if (quesCounter === 1) {
                    $('#prev').show();
                }
                else if (quesCounter === 0) {
                    $('#prev').hide();
                    $('#next').show();
                }
            }
            else {
                var scoreRslt = displayResult();
                quizSpace.append(scoreRslt).fadeIn();
                $('#next').hide();
                $('#prev').hide();
            }
        });
    }

    function displayResult() {
        var score = $('<p>', { id: 'question' });
        var correct = 0;
        for (var i = 0; i < selectOptions.length; i++) {
            if (selectOptions[i] === allQuestions[i].answer) {
                correct++;
            }
        }
        score.append('You scored ' + correct + ' out of ' + allQuestions.length);
        return score;
    }
})();