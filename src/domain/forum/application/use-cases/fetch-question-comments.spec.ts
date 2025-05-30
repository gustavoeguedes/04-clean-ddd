import { makeQuestionComment } from '../../../../../test/factories/make-question-comment'
import { InMemoryQuestionCommentsRepository } from '../../../../../test/repositories/in-memory-question-comments-repository'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Question Comments', async () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })
  it('should be able to fetch question comments', async () => {
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId('question-1') }),
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId('question-2') }),
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId('question-3') }),
    )

    const { value } = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(value?.questionComments).toHaveLength(1)
  })

  it('should be able to fetch paginated question comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityId('my-question-id'),
        }),
      )
    }

    const { value } = await sut.execute({
      page: 2,
      questionId: 'my-question-id',
    })

    expect(value?.questionComments).toHaveLength(2)
  })
})
