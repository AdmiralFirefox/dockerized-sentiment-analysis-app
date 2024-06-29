"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import Axios from "axios";
import ChartInfo from "./components/ChartInfo";
import Loading from "./components/Loading";
import Error from "./components/Error";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { addToResults } from "@/features/results/ResultsSlice";
import { formatTime } from "@/utils/formatTime";
import { ResultType } from "@/types/ResultType";
import styles from "@/styles/page.module.scss";

interface InputProps {
  id: string;
  timestamp: string;
  user_input: string;
  word_length: string;
  predicted_class: string[];
  probabilities: {
    id: string;
    class: string;
    probability: number;
  }[];
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  ? process.env.NEXT_PUBLIC_BACKEND_URL
  : "http://localhost:8000";

// Define the mutation function
const sendUserInput = async (userInput: string) => {
  const response = await Axios.post(
    `${backendUrl}/api/analyze_text`,
    { userInput },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export default function Home() {
  const [userInput, setUserInput] = useState("");

  const results = useAppSelector(
    (state: { results: ResultType[] }) => state.results
  );

  const dispatch = useAppDispatch();

  // Use the useMutation hook
  const mutation = useMutation<InputProps, Error, typeof userInput>({
    mutationFn: sendUserInput,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(userInput);
    setUserInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
    }
  };

  return (
    <main>
      <div className={styles["input-wrapper"]}>
        <form onSubmit={handleSubmit} className={styles["form-input"]}>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
          ></textarea>
          <button type="submit" disabled={userInput === ""}>
            Analyze
          </button>
        </form>
      </div>

      {mutation.isPending && <Loading />}
      {mutation.isError && <Error />}
      {mutation.isSuccess && (
        <div className={styles["result-info-wrapper"]}>
          <div className={styles["result-info-content"]}>
            <p className={styles["user-input"]}>
              Your input: {mutation.data.user_input}
            </p>
            <p className={styles["word-length"]}>
              Word Count: {mutation.data.word_length}
            </p>
            <div className={styles["predicted-class"]}>
              <p>Predicted class:</p>
              <div className={styles["image-wrapper"]}>
                <Image
                  src={
                    mutation.data.predicted_class[0] == "positive"
                      ? "/icons/positive.png"
                      : mutation.data.predicted_class[0] == "negative"
                      ? "/icons/negative.png"
                      : "/icons/neutral.png"
                  }
                  alt={mutation.data.predicted_class[0]}
                  width={100}
                  height={100}
                />
              </div>
              <p>{mutation.data.predicted_class[0]}</p>
            </div>
            <div className={styles["pie-chart"]}>
              <ChartInfo
                resultData={mutation.data.probabilities.map(
                  (result) => Math.round(result.probability * 100) / 100
                )}
              />
            </div>
            <ul className={styles["probability-info"]}>
              {mutation.data.probabilities.map((result) => (
                <li key={result.id}>
                  <p>{result.class}</p>
                  <p>{Math.round(result.probability * 100)}%</p>
                </li>
              ))}
            </ul>
            <p className={styles["timestamp"]}>
              Date Analyzed: {formatTime(mutation.data.timestamp)}
            </p>
            <div className={styles["save-results-button"]}>
              <button
                onClick={() => dispatch(addToResults(mutation.data))}
                disabled={results
                  .map((result) => result.id)
                  .includes(mutation.data.id)}
              >
                {results.map((result) => result.id).includes(mutation.data.id)
                  ? "Result Saved"
                  : "Save Result"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
