import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'
import { UniqueEntityId } from '../../src/core/entities/unique-entity-id'
import { Slug } from '../../src/domain/forum/enterprise/entities/value-objects/slug'

export function makeQuestion(override: Partial<QuestionProps> = {}) {
  const question = Question.create({
    authorId: new UniqueEntityId(),
    title: 'Título da pergunta',
    content: 'Nova pergunta',
    slug: Slug.createFromText('titulo-da-pergunta'),
    ...override,
  })

  return question
}
