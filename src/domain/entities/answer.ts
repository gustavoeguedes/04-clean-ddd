import { randomUUID } from "node:crypto"

interface AnswerProps {
    content: string
    questionId: string
    authorId: string
}

export class Answer {
    public content: string
    public id: string
    public questionId: string
    public authorId: string

    constructor(props: AnswerProps, id?: string) {
        this.id = id ?? randomUUID()
        this.questionId = props.questionId
        this.authorId = props.authorId
        this.content = props.content
    }
}