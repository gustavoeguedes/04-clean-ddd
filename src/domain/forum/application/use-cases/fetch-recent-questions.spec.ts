import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from '../../../../../test/factories/make-question'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions', async () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date('2023-10-01') }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date('2023-10-02') }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date('2023-10-03') }),
    )

    const { value } = await sut.execute({
      page: 1,
    })

    expect(value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date('2023-10-03') }),
      expect.objectContaining({ createdAt: new Date('2023-10-02') }),
      expect.objectContaining({ createdAt: new Date('2023-10-01') }),
    ])
  })

  it('should be able to fetch paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion())
    }

    const { value } = await sut.execute({
      page: 2,
    })

    expect(value?.questions).toHaveLength(2)
  })
})
