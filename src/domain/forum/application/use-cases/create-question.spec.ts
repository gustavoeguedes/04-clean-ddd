import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase
beforeEach(() => {
  inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
  sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
})

describe('create Question', async () => {
  it('should be able to create a question', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      title: 'Título da pergunta',
      content: 'Nova pergunta',
    })

    console.log(question)
    expect(question.id).toBeTruthy()
  })
})
