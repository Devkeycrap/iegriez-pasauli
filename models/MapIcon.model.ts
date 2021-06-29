export default interface IMapIcon {
  id: number;
  statement: string;
  answers: { id: number; answer: string }[]
  position: number[]
  isCorrect: boolean | null
  answerMessage: string | null
}