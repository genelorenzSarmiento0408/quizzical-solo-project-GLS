import { useState, useEffect } from "react";
import Opening from "./components/Opening";
import QandA from "./components/QandA";
import { nanoid } from "nanoid";

function App() {
  /**
   * Variable declartions
   * @constant {array} question - Array of questions
   */
  const [score, setScore] = useState(
    parseInt(localStorage.getItem("count")) || 0,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [ownAnswers, setOwnAnswers] = useState([]);

  const [question, setQuestion] = useState(
    JSON.parse(localStorage.getItem("question")) || "",
  );

  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [perfect, setPerfect] = useState(false);
  const [hasFetch, setHasFetch] = useState(false);
  // logs
  // console.log("Correct answers:", correctAnswers);
  console.log("own answers:", ownAnswers);

  /**
   * When you click on the answer it will
   * - set the answer to the answer array
   * @function handleClick
   */
  function handleClick(event) {
    const { classList, parentNode, innerText } = event.target;
    // if the class contains "clicked"
    if (classList.contains("clicked")) {
      //then remove it
      classList.remove("clicked");
      setOwnAnswers((ownans) =>
        ownans.filter((answer) => answer !== innerText),
      );
    } else {
      // check the childNodes of the clicked element
      // if they have the class "clicked"
      parentNode.childNodes.forEach((child) => {
        child.classList.remove("clicked");
      });
      // add clicked class
      classList.add("clicked");

      setOwnAnswers((oldAns) => [...oldAns, innerText]);
    }
  }
  useEffect(() => {
    if (isOpen) {
      fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then((res) => res.json())
        .then((data) => {
          setHasFetch(true);
          setCorrectAnswers(
            data.results.map((question) => question.correct_answer),
          );

          setQuestion(
            data.results.map((item) => {
              return (
                <>
                  <QandA
                    questions={item.question}
                    key={nanoid()}
                    correct_answer={item.correct_answer}
                    incorrect_answers={item.incorrect_answers}
                    submitTo={submitTo}
                    submit={submit}
                    handleClick={handleClick}
                    ownanswers={ownAnswers}
                    perfect={perfect}
                  />
                </>
              );
            }),
          );
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  function submitTo() {
    if (!submit) {
      if (correctAnswers.every((item) => ownAnswers.includes(item))) {
        console.log("perfect");
        setScore(5);
        setPerfect(true);
      }

      setSubmit(true);
    } else {
      setIsOpen(false);
      setSubmit(false);
      setOwnAnswers([]);
      setQuestion([]);
    }
  }
  return (
    <div className="App">
      <div className="container">
        {isOpen ? hasFetch ? <h1>Questions</h1> : "" : ""}
      </div>
      {isOpen ? (
        hasFetch ? (
          <>
            {question}
            <div className="sub-scoreContainer">
              {submit
                ? score === 5
                  ? `You scored 5/5 correct answers`
                  : "You scored less than 5/5 correct answers"
                : ""}
              <button
                onClick={() => {
                  submitTo();
                }}
              >
                {submit ? "Play again" : "Submit"}
              </button>
            </div>
          </>
        ) : (
          ""
        )
      ) : (
        <Opening isOpen={isOpen} handleClick={() => setIsOpen(true)} />
      )}
    </div>
  );
}

export default App;
