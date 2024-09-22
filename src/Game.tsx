import { Card, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material"
import { useQuestionsStore } from "./Store/questions"
import SyntaxHighLighter from "react-syntax-highlighter"
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { type Question as QuestionType } from "./types"
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material"
import IconButton from '@mui/material/IconButton';
import { Footer } from "./Footer"

const Question = ( { info }: {info: QuestionType}) => {
  const selectAnswer = useQuestionsStore(state => state.selectAnswer)

  const createHandleClick = (answerIndex: number) => () =>{
    selectAnswer(info.id, answerIndex)
  }

  const getBackgroundColor = (info: QuestionType, index: number) => {
    const { userSelectedAnswer, correctAnswer } = info
    //si user no ha marcado nada todavia
    if (userSelectedAnswer == null) return 'transparent'
    // si la solucion es incorecta
    if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
    // si es la solucion corecta
    if (index === correctAnswer) return 'green'
    //si esta es la selecion del usuario pero no es la correcta
    if (index === userSelectedAnswer) return 'red'
    //si es ninguna de las amnteriores
    return 'transparent'
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
            <ListItemButton
            disabled={info.userSelectedAnswer != null}
            onClick={createHandleClick(index)}
            sx={{ backgroundColor: getBackgroundColor(info, index)}}
            >
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
  const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
  const goPreviousQuestion = useQuestionsStore(state => state.goPreviousQuestion)

  const questionInfo = questions[currentQuestion]

  return ( 
    <>
    <Stack 
    direction='row' 
    gap={2} 
    alignItems='center' 
    justifyContent='center'
    >
      <IconButton 
      onClick={goPreviousQuestion} 
      disabled={currentQuestion === 0 }
      sx={{border: '1px solid red', boxShadow: '0 0 10px orange'}}
      >
        <ArrowBackIosNew />
      </IconButton>
      { currentQuestion + 1 } / { questions.length }

      <IconButton 
       onClick={goNextQuestion}
       disabled={currentQuestion >= questions.length - 1}
       sx={{border: '1px solid red', boxShadow: '0 0 10px orange'}}
       >

        <ArrowForwardIos />
      </IconButton>
    </Stack>

    <Question info={questionInfo} />
    <Footer  />
    </>
  )
}