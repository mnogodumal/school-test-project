import { Question } from "../types/Question"

export const questions: Question[] = [
  {
    id: "1",
    type: "single-choice",
    question: "Сколько будет 4 + 4?",
    options: ["6", "10", "8"],
  },
  {
    id: "2",
    type: "multiple-choice",
    question: "Какого цвета яблоко?",
    options: ["зеленое", "желтое", "красное", "голубое"],
  },
  {
    id: "3",
    type: "short-answer",
    question: "Какое самое высокое животное?",
  },
]
