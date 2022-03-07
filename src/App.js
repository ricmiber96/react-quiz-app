import logo from './logo.svg';
import './App.css';
import questions from './assets/questions.json'
import { useEffect, useState } from 'react';

function App() {

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [points, setPoints] = useState(0)
  const [scoreVisible, setScoreVisible] = useState(false)
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(true)
  
  const handleClick = (isCorrect) => {
      isCorrect && setPoints(points + 1)
      setCurrentQuestion(currentQuestion + 1)
      currentQuestion + 1  === questions.length && setScoreVisible(true)
  }

  const renderTimer = () => {
    let totalSeconds = 30
    totalSeconds = totalSeconds - time 
    console.log(totalSeconds);
    return <span>⏳{totalSeconds}s</span>
  }

  useEffect(()=>{
    setInterval(()=>{
      setTime((time) => time + 1)
    },1000)
    if(time === 0){
      setCurrentQuestion(currentQuestion + 1)
    }
  },[isRunning])

  return (
    <main className="w-screen h-screen flex content-center justify-center justify-items-center items-center bg-gray-700">
      <div className="w-1/2 flex flex-row border-2  border-blue-600 p-6 rounded-xl bg-white">
        {
          scoreVisible ? (
            <div className='w-full text-3xl p-4'>
					    You scored {points} out of {questions.length}
				    </div>
          ) : (
            <div className="w-full flex flex-row justify-around">
              <div className="w-2/3 flex flex-col text-2xl">
              <h3>Question {currentQuestion + 1} / {questions.length} {renderTimer()}</h3>
              <p>{questions[currentQuestion].questionText}</p>
              </div>
              <div className="w-1/3 flex flex-col">
                {
                  questions[currentQuestion].answerOptions.map((question,i)=>(
                    <button className="w-full border-2 hover:bg-blue-400 border-blue-600 rounded-lg m-2 p-2" onClick={()=> handleClick(question.isCorrect)}>{question.answerText}</button>
                  ))
                } 
              </div>
          </div>
          )
        }
      </div>
    </main>
  );
}

export default App;
