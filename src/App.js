import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishButton from "./components/FinishButton";
import FinishPage from "./components/FinishPage";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import { type } from "@testing-library/user-event/dist/type";

const SECS_PER_QUESTION = 30;
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  selectedAnswer: null,
  points: 0,
  highestScore: 0,
  secondRemaining: null,
  quantity: null,
  difficulty: [],
  category: [],
};
const difficultyLevels = [
  { value: "easy", label: "Easy (per question points - 10)" },
  { value: "medium", label: "Medium (per question points - 20)" },
  { value: "hard", label: "Hard (per question points - 30)" },
];
const categories = [
  { value: "history", label: "History" },
  { value: "science", label: "Science" },
  { value: "geography", label: "Geography" },
  { value: "music", label: "Music" },
  { value: "sport_and_leisure", label: "Sport and leisure" },
  { value: "film_and_tv", label: "Film and tv" },
  { value: "arts_and_literature", label: "Arts and literature" },
  { value: "society_and_culture", label: "Society and culture" },
  { value: "food_and_drink", label: "Food and drink" },
  { value: "general_knowledge", label: "General knowledge" },
];
const questionQuant = [
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "30", label: "30" },
];

function reducer(state, action) {
  switch (action.type) {
    case "dataFetched":
      return { ...state, status: "ready", questions: action.payload };
    case "dataFetchFailed":
      return { ...state, status: "failed" };
    case "startQuiz":
      return {
        ...state,
        status: "start",
        secondRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "selected":
      const index = state.index;
      const question = state.questions[index];
      let points;
      if (question.difficulty === "easy") points = 10;
      if (question.difficulty === "medium") points = 20;
      if (question.difficulty === "hard") points = 30;
      return {
        ...state,
        selectedAnswer: action.payload,
        points:
          action.payload === question.correctAnswer
            ? state.points + points
            : state.points,
      };
    case "showNextQuestion":
      return {
        ...state,
        index: state.index + 1,
        selectedAnswer: null,
      };
    case "showFinishPage":
      return {
        ...state,
        status: "finished",
        highestScore:
          state.highestScore < state.points ? state.points : state.highestScore,
      };
    case "restartQuiz":
      return {
        ...state,
        status: "ready",
        index: 0,
        points: 0,
        selectedAnswer: null,
        secondRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "tick":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "finished" : state.status,
      };
    case "selectQuantity":
      return {
        ...state,
        quantity: action.payload.value,
      };
    case "selectDifficulty":
      console.log(action.payload);
      return {
        ...state,
        difficulty: action.payload.map((data) => data.value),
      };
    case "selectCategory":
      return {
        ...state,
        category: action.payload.map((data) => data.value),
      };
    default:
      throw new Error("Unknown Error");
  }
}

export default function App() {
  const [
    {
      questions,
      status,
      index,
      selectedAnswer,
      points,
      highestScore,
      secondRemaining,
      quantity,
      difficulty,
      category,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  // console.log(category.toLocaleString());
  // console.log(quantity);
  const numQuestions = questions.length;
  const totalPoints = questions.reduce((prev, curr) => {
    if (curr.difficulty === "easy") return prev + 10;
    if (curr.difficulty === "medium") return prev + 20;
    if (curr.difficulty === "hard") return prev + 30;
  }, 0);
  // useEffect(function () {
  //   async function fetechData() {
  //     try {
  //       const res = await fetch("http://localhost:8000/questions");
  //       console.log(res);
  //       if (!res.ok) throw new Error("Unknown Error");
  //       const data = await res.json();
  //       dispatch({ type: "dataFetched", payload: data });
  //       // console.log(data);
  //     } catch (err) {
  //       dispatch({ type: "dataFetchFailed" });
  //       console.error(err.message);
  //     }
  //   }
  //   fetechData();
  // }, []);
  console.log(questions);

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchData() {
        try {
          const res = await fetch(
            `https://the-trivia-api.com/v2/questions?limit=${quantity}
            &difficulty=${difficulty.join(",")}&categories=${category.join(
              ","
            )}`,
            { signal: controller.signal }
          );
          console.log(res);
          // if (!res.ok) throw new Error("unidentified error");
          const data = await res.json();
          dispatch({ type: "dataFetched", payload: data });
        } catch (err) {
          dispatch({ type: "dataFetchFailed" });
        }
      }
      fetchData();
      return () => {
        controller.abort(); // Cancels the fetch when the component unmounts
      };
    },
    [quantity, difficulty, category]
  );
  return (
    <div className="background">
      <div className="app">
        {/* <Header /> */}
        <Main>
          {status === "loading" && <Loader />}
          {status === "failed" && <Error />}
          {status === "ready" && (
            <StartScreen
              numQuestions={numQuestions}
              dispatch={dispatch}
              difficultyLevels={difficultyLevels}
              categories={categories}
              questionQuant={questionQuant}
              quantity={quantity}
              difficulty={difficulty}
              category={category}
            />
          )}
          {status === "start" && (
            <>
              <Progress
                index={index}
                score={points}
                total={questions.length}
                totalPoints={totalPoints}
                selectedAnswer={selectedAnswer}
              />
              <Questions
                currentQuestion={questions[index]}
                selectedAnswer={selectedAnswer}
                dispatch={dispatch}
              />
              <Footer>
                <Timer dispatch={dispatch} secondRemaining={secondRemaining} />
                <NextButton
                  dispatch={dispatch}
                  selectedAnswer={selectedAnswer}
                  index={index}
                  total={numQuestions}
                />
                <FinishButton
                  dispatch={dispatch}
                  index={index}
                  total={numQuestions}
                  selectedAnswer={selectedAnswer}
                />
              </Footer>
            </>
          )}
          {status === "finished" && (
            <FinishPage
              score={points}
              totalScore={totalPoints}
              highestScore={highestScore}
              dispatch={dispatch}
              questions={questions}
            />
          )}
        </Main>
      </div>
    </div>
  );
}
