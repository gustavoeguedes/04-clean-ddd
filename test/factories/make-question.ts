import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'
import { UniqueEntityId } from '../../src/core/entities/unique-entity-id'
import { Slug } from '../../src/domain/forum/enterprise/entities/value-objects/slug'
import { faker } from '@faker-js/faker'

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityId,
) {
  const question = Question.create(
    {
      authorId: new UniqueEntityId(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      slug: Slug.createFromText('titulo-da-pergunta'),
      ...override,
    },
    id,
  )

  return question
}
