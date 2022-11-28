import React, { useEffect, useState } from 'react'
import Timeline from './Timeline';

function QuizFinish( {props} ) {
  const [scores, questions, answers, time, streaks, categoryId] = props;
  let color = '#fff';
  const highestStreak = Math.max(...streaks);

  const [res, setRes] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/category/${categoryId}/submit`, {
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({questions, answers})
    }).then(data => data.json())
    .then(data => setRes(data));
  }, [])

  return (
    <div>
      <Timeline props={props} />
      <div>Completed! Your score {scores[scores.length-1]}</div>
      <div>Highest Streak: {highestStreak}</div>
      <ul>{questions.map((q, index) => {
        color = (answers[index].answer === q.wrongAnswers[0].answer) ? '#0f0': '#f00';
        let difficulty = 0;
        if (res){
          let i = res.questions.map(q => q.questionId).indexOf(q.questionId);
          let correct = res.questions[i].correctAnswersGiven;
          let total = res.questions[i].totalAnswersGiven;
          difficulty = (correct/total)*100;
        }

        return (
          <li key={index} style={{background: color}}>
            <div>
              Q: {q.question}
            </div>
            <div>
              Your Answer: {answers[index].answer}
            </div>
            <div>
              Correct Answer: {q.wrongAnswers[0].answer}
            </div>
            <div>
              Difficulty: {difficulty}%
            </div>
            <div>
              Time Remaining: {time[index]}
            </div>
          </li>)
      })}</ul>
    <a href="/quizzes"> Another test? </a>
    </div>
  )
  
}

export default QuizFinish