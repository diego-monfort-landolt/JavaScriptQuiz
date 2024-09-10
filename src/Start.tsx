import { Button } from "@mui/material"
import { useQuestionsStore } from "./Store/questions"

const LIMIT_QUESTIONS  = 15

export const Start = () => {
  const fetchQuestions = useQuestionsStore(state => state.fetchQuestions)

  const handleClick = () => {
    fetchQuestions(LIMIT_QUESTIONS)
  }
  
  return(
    <>
    <Button onClick={handleClick} variant="contained"  sx={{ border: 'none', bgcolor: 'blueviolet' }}>¡Let's Start!</Button>
    </>  
  ) 
}