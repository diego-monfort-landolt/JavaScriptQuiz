import { Button } from '@mui/material'
import { useQuestionsData } from './hooks/useQuestionData'
import { useQuestionsStore } from './Store/questions'

export const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionsData()
  const reset = useQuestionsStore(state => state.reset)
  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>{`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❓ ${unanswered} sin responder`}</strong>
      <div style={{ marginTop: '16px' }}>
        <Button style={{ boxShadow: '0 0px 5px 1px red', marginTop: '10px', border: '1px solid red', borderRadius: '15px 0 15px 0'}} onClick={() => reset()}>
          New Game
        </Button>
      </div>
    </footer>
  )
}