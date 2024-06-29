"use client";

import ChartInfo from "../components/ChartInfo";
import { useAppSelector, useAppDispatch } from "../hooks";
import { removeFromResults } from "@/features/results/ResultsSlice";
import { formatTime } from "@/utils/formatTime";
import { ResultType } from "@/types/ResultType";
import styles from "@/styles/SavedResults.module.scss";

export default function SavedResults() {
  const results = useAppSelector(
    (state: { results: ResultType[] }) => state.results
  );

  let reversedResults = [...results].reverse();

  const dispatch = useAppDispatch();

  return (
    <main>
      <ul className={styles["result-info-wrapper"]}>
        {reversedResults.map((result) => (
          <li key={result.id} className={styles["result-info-content"]}>
            <p className={styles["user-input"]}>Input: {result.user_input}</p>
            <p className={styles["word-length"]}>
              Word Count: {result.word_length}
            </p>
            <div className={styles["predicted-class"]}>
              <p>Predicted class: {result.predicted_class[0]}</p>
            </div>
            <div className={styles["pie-chart"]}>
              <ChartInfo
                resultData={result.probabilities.map(
                  (result) => Math.round(result.probability * 100) / 100
                )}
              />
            </div>
            <ul className={styles["probability-info"]}>
              {result.probabilities.map((info) => (
                <li key={info.id}>
                  <p>{info.class}</p>
                  <p>{Math.round(info.probability * 100)}%</p>
                </li>
              ))}
            </ul>
            <p className={styles["timestamp"]}>
              Date Analyzed: {formatTime(result.timestamp)}
            </p>
            <div className={styles["delete-results-button"]}>
              <button onClick={() => dispatch(removeFromResults(result.id))}>
                Delete Result
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
