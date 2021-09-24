(function() 
 {
  var allQuestions = [{
    question: "Which one of the below is a way to instantiate an array in Java?",
    options: ["int myArray[]={1,3,5};", "int myArray[] []= {1,2,3,4};", "int[] myArray = (5,4,3);", "int[] myArray = {'1','2','3','4'};"],
    answer: 3
  }, {
    question: "Which of the following is not a reserved keyword in Java?",
    options: ["array", "goto", "null", "int"],
    answer: 1
  }, {
    question: "What will happen if we try and compile the below program?",
    options: ["Prints 10 ", "Prints 20 ", "Compile Time Error","Runtime error because Foo.x is final"],
    answer: 3
  },{
    question: "What will be the output of the following program?",
    options: ["Compile time error", "Prints c = A ", "Runtime error", "Prints c = 65"],
    answer: 1
  }, {
      question: "What will be the output of the following code?",
    options: ["Runtime error", "Prints 180", "Prints 0", "Compile Time error"],
    answer: 1
  },{
      question: "What are the valid statements for static keyword in Java?",
    options: ["We can have a static block", "The static block in a class is executed everytime an object of class is created.", "We can have static method implementations in interface", "We can define a static block inside a method"],
    answer: 0
  },{
    question: "Select the core concept of OOPs: ",
    options: ["Interface", "Concatenation", "Polymorphism", "Generics"],
    answer: 0
  },{
    question: "Which of the following is true for inheritance in Java?",
    options: ["The 'extend' keyword is used to extend a class", "You can extend multiple classes", "Private members of the superclass are accessible to the subclass", "We can't extend Final classes"],
    answer: 2
  }];
  
  var quesCounter = 0;
  var selectOptions = [];
  var quizSpace = $('#quiz');
    
  nextQuestion();
    
  $('#next').click(function () 
    {
        chooseOption();
        if (isNaN(selectOptions[quesCounter])) 
        {
            alert('Please select an option!');
        } 
        else 
        {
          quesCounter++;
          nextQuestion();
        }
    });
  
  $('#prev').click(function () 
    {
        chooseOption();
        quesCounter--;
        nextQuestion();
    });
  
  function createElement(index) 
    {
        var element = $('<div>',{id: 'question'});
        var header = $('<h2>Question No. ' + (index + 1) + ' :</h2>');
        element.append(header);

        var question = $('<p>').append(allQuestions[index].question);
        element.append(question);

        var radio = radioButtons(index);
        element.append(radio);

        return element;
    }
  
  function radioButtons(index) 
    {
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
  
  function chooseOption() 
    {
        selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
    }
   
  function nextQuestion() 
    {
        quizSpace.fadeOut(function() 
            {
              $('#question').remove();
              if(quesCounter < allQuestions.length)
                {
                    var nextQuestion = createElement(quesCounter);
                    quizSpace.append(nextQuestion).fadeIn();
                    if (!(isNaN(selectOptions[quesCounter]))) 
                    {
                      $('input[value='+selectOptions[quesCounter]+']').prop('checked', true);
                    }
                    if(quesCounter === 1)
                    {
                      $('#prev').show();
                    } 
                    else if(quesCounter === 0)
                    {
                      $('#prev').hide();
                      $('#next').show();
                    }
                }
              else 
                {
                    var scoreRslt = displayResult();
                    quizSpace.append(scoreRslt).fadeIn();
                    $('#next').hide();
                    $('#prev').hide();
                }
        });
    }
  
  function displayResult() 
    {
        var score = $('<p>',{id: 'question'});
        var correct = 0;
        for (var i = 0; i < selectOptions.length; i++) 
        {
          if (selectOptions[i] === allQuestions[i].answer) 
          {
            correct++;
          }
        }
        score.append('You scored ' + correct + ' out of ' +allQuestions.length);
        return score;
  }
})();