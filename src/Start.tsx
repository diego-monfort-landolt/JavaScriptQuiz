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
    <Button onClick={handleClick} variant="contained"  sx={{ border: 'none',borderRadius: '10px 0 10px 0', boxShadow: '0 5px 5px 1px red', bgcolor: 'blueviolet' }}>¡Let's Start!</Button>
    </>  
  ) 
}