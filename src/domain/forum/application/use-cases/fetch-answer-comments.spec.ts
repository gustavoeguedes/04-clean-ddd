import { makeAnswerComment } from '../../../../../test/factories/make-answer-comment'
import { InMemoryAnswerCommentsRepository } from '../../../../../test/repositories/in-memory-answers-comments-repository'

import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments', async () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })
  it('should be able to fetch answer comments', async () => {
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-2') }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-3') }),
    )

    const { answerComments } = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    })

    expect(answerComments).toHaveLength(1)
  })

  it('should be able to fetch paginated answer comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityId('my-answer-id'),
        }),
      )
    }

    const { answerComments } = await sut.execute({
      page: 2,
      answerId: 'my-answer-id',
    })

    expect(answerComments).toHaveLength(2)
  })
})
