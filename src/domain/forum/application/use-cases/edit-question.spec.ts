import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from '../../../../../test/factories/make-question'
import { EditQuestionUseCase } from './edit-question'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase
beforeEach(() => {
  inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
  sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
})

describe('Edit question', async () => {
  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId: 'author-1',
      questionId: newQuestion.id.toString(),
      title: 'Pergunta editada',
      content: 'Conteudo editado',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Pergunta editada',
      content: 'Conteudo editado',
    })
  })
  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-id'),
      },
      new UniqueEntityId('question-id'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    expect(() => {
      return sut.execute({
        authorId: 'author-2',
        questionId: newQuestion.id.toString(),
        title: 'Pergunta editada',
        content: 'Conteudo editado',
      })
    }).rejects.toThrow('Not aloowed.')
  })
})
