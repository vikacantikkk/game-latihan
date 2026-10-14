import { useState } from 'react'
import './App.css'

const questions = [
  { question: 'Berapakah 7 + 5?', answers: ['10', '11', '12', '13'], correct: '12' },
  { question: 'Berapakah 9 × 3?', answers: ['18', '21', '27', '36'], correct: '27' },
  { question: 'Berapakah 20 − 8?', answers: ['10', '12', '14', '16'], correct: '12' },
  { question: 'Berapakah 36 ÷ 6?', answers: ['4', '5', '6', '7'], correct: '6' },
  { question: 'Berapakah 15 + 14?', answers: ['27', '28', '29', '30'], correct: '29' },
]

function App() {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const isFinished = questionIndex >= questions.length
  const currentQuestion = questions[questionIndex]

  function chooseAnswer(answer) {
    if (selectedAnswer !== null) return

    setSelectedAnswer(answer)
    if (answer === currentQuestion.correct) {
      setScore((currentScore) => currentScore + 1)
    }
  }

  function goToNextQuestion() {
    setQuestionIndex((currentIndex) => currentIndex + 1)
    setSelectedAnswer(null)
  }

  function restartGame() {
    setQuestionIndex(0)
    setScore(0)
    setSelectedAnswer(null)
  }

  return (
    <main className="game-page">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Game Latihan, beranda">
          <span className="brand-icon" aria-hidden="true">✦</span>
          Game Latihan
        </a>
        <span className="topbar-label">Belajar sambil bermain</span>
      </header>

      <section className="game-card" aria-labelledby="game-title">
        <div className="game-heading">
          <span className="eyebrow">TANTANGAN HARI INI</span>
          <h1 id="game-title">Asah kemampuanmu!</h1>
          <p>Jawab soal matematika dan kumpulkan poin.</p>
        </div>

        {isFinished ? (
          <div className="result" aria-live="polite">
            <span className="result-icon" aria-hidden="true">
              {score === questions.length ? '🏆' : '🎉'}
            </span>
            <h2>Permainan selesai!</h2>
            <p>
              Kamu menjawab benar <strong>{score} dari {questions.length}</strong> soal.
            </p>
            <button className="primary-button" type="button" onClick={restartGame}>
              Main lagi
            </button>
          </div>
        ) : (
          <>
            <div className="game-progress">
              <span>Soal {questionIndex + 1} dari {questions.length}</span>
              <span className="score">★ {score} poin</span>
            </div>
            <div
              className="progress-track"
              role="progressbar"
              aria-label="Progres permainan"
              aria-valuenow={questionIndex + 1}
              aria-valuemin={1}
              aria-valuemax={questions.length}
            >
              <span style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} />
            </div>

            <div className="question-area">
              <span className="question-number">SOAL {String(questionIndex + 1).padStart(2, '0')}</span>
              <h2>{currentQuestion.question}</h2>
              <div className="answer-grid">
                {currentQuestion.answers.map((answer, index) => {
                  const isSelected = selectedAnswer === answer
                  const isCorrect = answer === currentQuestion.correct
                  const answerClass = selectedAnswer === null
                    ? ''
                    : isCorrect
                      ? ' answer-correct'
                      : isSelected
                        ? ' answer-incorrect'
                        : ''

                  return (
                    <button
                      className={`answer-button${answerClass}`}
                      type="button"
                      key={answer}
                      onClick={() => chooseAnswer(answer)}
                      disabled={selectedAnswer !== null}
                    >
                      <span className="answer-letter">{String.fromCharCode(65 + index)}</span>
                      {answer}
                    </button>
                  )
                })}
              </div>
            </div>

            {selectedAnswer !== null && (
              <div className="answer-feedback" aria-live="polite">
                <span>{selectedAnswer === currentQuestion.correct ? 'Hebat, jawabanmu benar!' : `Belum tepat. Jawaban yang benar: ${currentQuestion.correct}.`}</span>
                <button className="primary-button" type="button" onClick={goToNextQuestion}>
                  {questionIndex === questions.length - 1 ? 'Lihat hasil' : 'Soal berikutnya'}
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <footer className="page-footer">Terus berlatih, kamu pasti bisa! <span aria-hidden="true">✦</span></footer>
    </main>
  )
}

export default App
