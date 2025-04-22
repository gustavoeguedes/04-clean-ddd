import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Question } from '../../enterprise/entities/question'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase
beforeEach(() => {
  inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
  sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
})

describe('Get Question By Slug', async () => {
  it('should be able to get a question by slug', async () => {
    const newQuestion = Question.create({
      authorId: new UniqueEntityId(),
      title: 'Título da pergunta',
      content: 'Nova pergunta',
      slug: Slug.createFromText('titulo-da-pergunta'),
    })
    await inMemoryQuestionsRepository.create(newQuestion)
    const { question } = await sut.execute({
      slug: 'titulo-da-pergunta',
    })
    expect(question.id).toBeTruthy()
    expect(question.title).toEqual(newQuestion.title)
  })
})
