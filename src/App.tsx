import { Container, Stack, Typography } from '@mui/material'
import './App.css'
import { JavaScriptLogo } from './JavaScriptLogo'
import { Start } from './Start'
import { useQuestionsStore } from './Store/questions'
import { Game } from './Game'

function App() {
  const questions = useQuestionsStore(state => state.questions )

  return (
    <>
    <main>
      <Container maxWidth='sm'>
          <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>     
            <JavaScriptLogo />
            <Typography variant='h2' component='h1' sx={{ marginBottom: '10px'}}>
            JavaScript Quiz 
            </Typography>
          </Stack> 
           
          {questions.length === 0 && <Start /> }
          {questions.length > 0 && <Game />}
      </Container>   
    </main>   
    </>
  )
}

export default App