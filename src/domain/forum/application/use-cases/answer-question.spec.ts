import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Answer question', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })
  it('should be able create an answer', async () => {
    const { value } = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'Nova resposta',
    })

    expect(value?.answer.content).toEqual('Nova resposta')
    expect(inMemoryAnswersRepository.items[0].id).toEqual(value?.answer.id)
  })
})
