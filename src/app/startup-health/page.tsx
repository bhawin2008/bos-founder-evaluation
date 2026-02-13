"use client";

import { useState, useCallback } from "react";
import { questions } from "./_data/questions";
import LandingScreen from "./_components/LandingScreen";
import QuestionScreen from "./_components/QuestionScreen";
import ResultsScreen from "./_components/ResultsScreen";

type Screen = "landing" | "questions" | "results";

export default function StartupHealthPage() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(
    () => new Array(questions.length).fill(-1)
  );

  const handleStart = useCallback(() => {
    setCurrentQuestion(0);
    setAnswers(new Array(questions.length).fill(-1));
    setScreen("questions");
  }, []);

  const handleSelectOption = useCallback(
    (optionIndex: number) => {
      setAnswers((prev) => {
        const next = [...prev];
        next[currentQuestion] = optionIndex;
        return next;
      });
    },
    [currentQuestion]
  );

  const handleNext = useCallback(() => {
    if (answers[currentQuestion] === -1) return;

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setScreen("results");
    }
  }, [currentQuestion, answers]);

  const handlePrev = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  }, [currentQuestion]);

  const handleRestart = useCallback(() => {
    setCurrentQuestion(0);
    setAnswers(new Array(questions.length).fill(-1));
    setScreen("landing");
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0a0a0f] text-gray-100 flex justify-center items-center font-sans">
      <div className="w-full max-w-[720px] px-5 min-h-[calc(100vh-4rem)] flex items-center justify-center">
        {screen === "landing" && <LandingScreen onStart={handleStart} />}

        {screen === "questions" && (
          <QuestionScreen
            question={questions[currentQuestion]}
            currentIndex={currentQuestion}
            totalQuestions={questions.length}
            selectedAnswer={answers[currentQuestion]}
            onSelectOption={handleSelectOption}
            onNext={handleNext}
            onPrev={handlePrev}
            isFirst={currentQuestion === 0}
            isLast={currentQuestion === questions.length - 1}
          />
        )}

        {screen === "results" && (
          <ResultsScreen answers={answers} onRestart={handleRestart} />
        )}
      </div>
    </div>
  );
}
