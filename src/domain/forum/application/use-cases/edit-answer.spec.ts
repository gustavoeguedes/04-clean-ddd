import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from '../../../../../test/factories/make-answer'
import { EditAnswerUseCase } from './edit-answer'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase
beforeEach(() => {
  inMemoryAnswersRepository = new InMemoryAnswersRepository()
  sut = new EditAnswerUseCase(inMemoryAnswersRepository)
})

describe('Edit answer', async () => {
  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      authorId: 'author-1',
      answerId: newAnswer.id.toString(),
      content: 'Conteudo editado',
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Conteudo editado',
    })
  })
  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-id'),
      },
      new UniqueEntityId('answer-id'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    expect(() => {
      return sut.execute({
        authorId: 'author-2',
        answerId: newAnswer.id.toString(),
        content: 'Conteudo editado',
      })
    }).rejects.toThrow('Not aloowed.')
  })
})
