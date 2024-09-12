import { create } from "zustand"
import { type Question  } from "../types"
import confetti from 'canvas-confetti'
import { persist, devtools } from 'zustand/middleware'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPreviousQuestion: () => void
  reset: () => void
}

//()(devtools(persist
export const useQuestionsStore = create<State>()(devtools(persist((set, get) => {
  return {
    loading: false,
    questions: [],
    currentQuestion: 0,

    fetchQuestions: async (limit: number) => {
     const res = await fetch('http://localhost:5173/JavaScriptQuiz/data.json')
     const json = await res.json()

     const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
     set({ questions })
    },
    selectAnswer: (questionId: number, answerIndex: number) => {
      const { questions } = get()
      // usar el structuredclone para clonar el objecto
      const newQuestions = structuredClone(questions)
      // encontramos el indice de la pregunta
      const questionIndex = newQuestions.findIndex(q => q.id === questionId)
      // obtenemos la informacion de la pregunta
      const questionInfo = newQuestions[questionIndex]
      // averiguamos si el usuario ha selecionado la respuesta correcta
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
      if (isCorrectUserAnswer) confetti()
      // cambiar esta info en la copia de la pregunta
      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answerIndex
      }
      // actualizamos estado
      set({ questions: newQuestions })

    },

    goNextQuestion: () => {
     const { currentQuestion, questions } = get()
     const nexstQuestion = currentQuestion + 1 

     if (nexstQuestion < questions.length) {
      set({ currentQuestion: nexstQuestion})
     }
    },
    goPreviousQuestion:  () => {
      const { currentQuestion } = get()
      const previusQuestion = currentQuestion - 1 
 
      if (previusQuestion >= 0) {
       set({ currentQuestion: previusQuestion})
      }
     },
     reset: () => {
      set({ currentQuestion: 0, questions: [] }, false, 'RESET')
    }
  }
}, {
  name: 'questions'
})))