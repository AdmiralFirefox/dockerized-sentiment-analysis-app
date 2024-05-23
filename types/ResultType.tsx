export interface ResultType {
  id: string;
  user_input: string;
  word_length: string;
  predicted_class: string[];
  probabilities: {
    id: string;
    class: string;
    probability: number;
  }[];
  added?: boolean;
}
