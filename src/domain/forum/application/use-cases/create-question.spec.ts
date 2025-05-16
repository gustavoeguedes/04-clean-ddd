import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('create Question', async () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to create a question', async () => {
    const { isLeft, value } = await sut.execute({
      authorId: '1',
      title: 'Título da pergunta',
      content: 'Nova pergunta',
      attachmentsIds: ['1', '2'],
    })
    expect(isLeft()).toBe(false)
    expect(inMemoryQuestionsRepository.items[0].title).toEqual(
      value?.question.title,
    )
    expect(inMemoryQuestionsRepository.items[0].attachments).toEqual([
      expect.objectContaining({
        attachmentId: new UniqueEntityId('1'),
      }),
      expect.objectContaining({
        attachmentId: new UniqueEntityId('2'),
      }),
    ])
  })
})
