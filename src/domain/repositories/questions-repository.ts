import { Question } from '../forum/enterprise/entities/question'

export interface QuestionsRepository {
  create(question: Question): Promise<void>
}
