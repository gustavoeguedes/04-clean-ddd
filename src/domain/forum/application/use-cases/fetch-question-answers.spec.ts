import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from '../../../../../test/factories/make-answer'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch Question Answers', async () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })
  it('should be able to fetch question answers', async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityId('question-1') }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityId('question-2') }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityId('question-3') }),
    )

    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(answers).toHaveLength(1)
  })

  it('should be able to fetch paginated question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityId('my-question-id'),
        }),
      )
    }

    const { answers } = await sut.execute({
      page: 2,
      questionId: 'my-question-id',
    })

    expect(answers).toHaveLength(2)
  })
})
