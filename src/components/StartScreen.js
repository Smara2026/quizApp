import { useEffect, useRef, useState } from "react";
import CheckboxSelect from "./SelectTabs";

const placeholderNumber = "Select Number Of Questions...";

const placeholderDifficulty = "Select Difficulty Levels Of Questions...";
const placeholderCategories = "Select Categories Of Questions...";

export default function StartScreen({
  dispatch,
  difficultyLevels,
  categories,
  questionQuant,
}) {
  return (
    <div className="start">
      <h2>Welcome to The Quiz </h2>
      <div className="options">
        <CheckboxSelect
          options={questionQuant}
          isMulti={false}
          placeholder={placeholderNumber}
          dispatch={dispatch}
          type="selectQuantity"
        />
        <CheckboxSelect
          options={difficultyLevels}
          isMulti={true}
          placeholder={placeholderDifficulty}
          dispatch={dispatch}
          type="selectDifficulty"
        />
        <CheckboxSelect
          options={categories}
          isMulti={true}
          placeholder={placeholderCategories}
          dispatch={dispatch}
          type="selectCategory"
        />
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "startQuiz" })}
        >
          Test Now!!
        </button>
      </div>
    </div>
  );
}
