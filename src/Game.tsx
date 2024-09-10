// import { IconButton, Stack } from "@mui/material"
import { Card, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { useQuestionsStore } from "./Store/questions"
import SyntaxHighLighter from "react-syntax-highlighter"
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { type Question as QuestionType } from "./types"


const Question = ( { info }: {info: QuestionType}) => {
  const selectAnswer = useQuestionsStore(state => state.selectAnswer)

  const createHandleClick = (answerIndex: number) => () =>{
    selectAnswer(info.id, answerIndex)
  }
  return (
    <>
    <Card variant='outlined' sx={{ 
      textAlign: 'left',
      padding: '5px',
      borderRadius:'10px',
      boxShadow: '0px 0px 20px rgba(255, 0, 0, 0.5)',
      marginTop: '15px'}}
      >

      <Typography variant="h5">
        {info.question}
      </Typography>
      <SyntaxHighLighter language="javascript" style={gradientDark}>
        {info.code}
      </SyntaxHighLighter>
      <List sx={{bgcolor: '#333'}} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} divider disablePadding >
            <ListItemButton onClick={createHandleClick(index)}>
              <ListItemText primary={answer}  sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
    </>
  )
}

export const Game = () => {
  const questions = useQuestionsStore(state => state.questions)
  const currentQuestion = useQuestionsStore(state => state.currentQuestion)

  const questionInfo = questions[currentQuestion]

  return ( 
    <>
    <Question info={questionInfo}/>
    </>
  )
}