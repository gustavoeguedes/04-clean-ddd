import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

beforeEach(() => {
  inMemoryAnswersRepository = new InMemoryAnswersRepository()
  sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
})

describe('Answer question', () => {
  it('should be able create an answer', async () => {
    const { answer } = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'Nova resposta',
    })

    console.log(inMemoryAnswersRepository)

    expect(answer.content).toEqual('Nova resposta')
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
  })
})
