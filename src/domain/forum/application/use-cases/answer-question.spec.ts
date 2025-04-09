import { Answer } from '../../enterprise/entities/answer'
import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    console.log(answer.authorId)
  },
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    instructorId: '1',
    questionId: '1',
    content: 'Nova resposta',
  })

  expect(answer.content).toEqual('Nova resposta')
})
