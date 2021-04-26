export default interface IAnswers {
  transport: { isCorrect: boolean, answer: string, message: string } | null,
  food: { isCorrect: boolean, answer: string, message: string } | null,
  tourism: { isCorrect: boolean, answer: string, message: string } | null,
  power: { isCorrect: boolean, answer: string, message: string } | null,
  trash: { isCorrect: boolean, answer: string, message: string } | null,
}