import { useState, useLayoutEffect, useEffect } from "react";
import { nanoid } from "nanoid";
export default function QandA({
  questions,
  correct_answer,
  incorrect_answers,
  submit,
  handleClick,
  perfect,
  ownanswer,
}) {
  const [answers, setanswers] = useState([]);

  useLayoutEffect(() => {
    setanswers(
      [correct_answer, ...incorrect_answers].sort(() => Math.random() - 0.5),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submit]);
  // map the used effect that combined both answers
  // and shuffle the answers
  useEffect(() => {
    console.log(perfect);
  }, [ownanswer, perfect, submit]);
  console.log(answers);

  return (
    <div className="qanda">
      <h2 dangerouslySetInnerHTML={{ __html: questions }}></h2>
      <div className="ans--container">
        {answers.map((ans) => {
          return (
            <div>
              {!submit ? (
                <>
                  <button
                    key={nanoid()}
                    dangerouslySetInnerHTML={{ __html: ans }}
                    className="answer"
                    onClick={(e) => handleClick(e)}
                  ></button>
                </>
              ) : (
                <button
                  key={nanoid()}
                  className={`answer ${perfect ? "correct" : "incorrect"}`}
                  dangerouslySetInnerHTML={{ __html: ans }}
                ></button>
              )}
            </div>
          );
        })}
      </div>

      <hr />
    </div>
  );
}
