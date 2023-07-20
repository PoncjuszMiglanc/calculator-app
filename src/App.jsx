import { useReducer } from "react";
import "./App.css";

const ACTIONS = {
  ADD_NUMBER: "add-number",
  ALL_CLEAR: "all-clear",
  DELETE_NUMBER: "delete-number",
  EVALUATE: "evaluate",
  ADD_OPERATOR: "add-operator",
};

//dodać jakieś formatowanie wyniku, zeby po kropce za duzo nie wyszlo liczb
function App() {
  const evaluate = (x, y, z) => {
    switch (z) {
      case "÷": {
        return (parseFloat(x) / parseFloat(y)).toString();
      }
      case "*": {
        return (parseFloat(x) * parseFloat(y)).toString();
      }
      case "+": {
        return (parseFloat(x) + parseFloat(y)).toString();
      }
      case "-": {
        return (parseFloat(x) - parseFloat(y)).toString();
      }
    }
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case ACTIONS.ADD_NUMBER: {
        if (!state.currOperand && action.payload === "0") {
          return { ...state };
        } else if (!state.currOperand && action.payload === ".") {
          return { ...state };
        } else if (!state.currOperand) {
          return { ...state, currOperand: action.payload };
        } else if (state.currOperand.includes(".") && action.payload === ".") {
          return { ...state };
        } else if (state.isOverride && action.payload === ".") {
          return { ...state };
        } else if (state.isOverride && action.payload === "0") {
          return { ...state };
        } else if (state.currOperand && state.isOverride) {
          return { ...state, currOperand: action.payload, isOverride: false };
        }
        return { ...state, currOperand: state.currOperand + action.payload };
      }
      case ACTIONS.ALL_CLEAR: {
        if (state.currOperand || state.prevOperand) {
          return {};
        }
        return {};
      }
      case ACTIONS.DELETE_NUMBER: {
        if (state.currOperand || isOverride) {
          return {
            ...state,
            currOperand: state.currOperand.slice(0, -1),
            isOverride: false,
          };
        } else if (state.prevOperand) {
          return { ...state, prevOperand: state.prevOperand.slice(0, -1) };
        } else if (state.operator) {
          return { ...state, operator: "" };
        }
        return { ...state };
      }
      case ACTIONS.EVALUATE: {
        if (state.prevOperand && state.currOperand && state.operator) {
          return {
            ...state,
            currOperand: evaluate(
              state.prevOperand,
              state.currOperand,
              state.operator
            ),
            prevOperand: "",
            operator: "",
            isOverride: true,
          };
        }
        return { ...state };
      }

      case ACTIONS.ADD_OPERATOR: {
        if (state.currOperand) {
          return {
            ...state,
            currOperand: "",
            prevOperand: state.currOperand,
            operator: action.payload,
          };
        }
        return { ...state, operator: action.payload };
      }
    }
  };

  const [{ currOperand, prevOperand, operator, isOverride }, dispatch] =
    useReducer(reducer, {});

  return (
    <>
      <div className="calculator">
        <div className="output">
          <div className="output__prev-operand">{`${prevOperand || ""} ${
            operator || ""
          }`}</div>
          <div className="output__curr-operand">{currOperand}</div>
        </div>
        <button
          onClick={() => dispatch({ type: ACTIONS.ALL_CLEAR })}
          className="span-two"
        >
          AC
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.DELETE_NUMBER })}>
          DEL
        </button>
        <button
          onClick={() => dispatch({ type: ACTIONS.ADD_OPERATOR, payload: "÷" })}
        >
          ÷
        </button>
        <button
          onClick={() => dispatch({ type: ACTIONS.ADD_NUMBER, payload: "1" })}
        >
          1
        </button>
        <button
          onClick={() => dispatch({ type: ACTIONS.ADD_NUMBER, payload: "2" })}
        >
          2
        </button>
        <button
          onClick={() => dispatch({ type: ACTIONS.ADD_NUMBER, payload: "3" })}
        >
          3
        </button>
        <button
          onClick={() => dispatch({ type: ACTIONS.ADD_OPERATOR, payload: "*" })}
        >
          *
        </button>
        <button
          onClick={() => dispatch({ type: ACTIONS.ADD_NUMBER, payload: "4" })}
        >
          4
        </button>
        <button
          onClick={() => dispatch({ type: ACTIONS.ADD_NUMBER, payload: "5" })}
        >
          5
        </button>
        <button
          onClick={() => dispatch({ type: ACTIONS.ADD_NUMBER, payload: "6" })}
        >
          6
        </button>
        <button
          onClick={() => dispatch({ type: ACTIONS.ADD_OPERATOR, payload: "+" })}
        >
          +
        </button>
        <button
          onClick={() => dispatch({ type: ACTIONS.ADD_NUMBER, payload: "7" })}
        >
          7
        </button>
        <button
          onClick={() => dispatch({ type: ACTIONS.ADD_NUMBER, payload: "8" })}
        >
          8
        </button>
        <button
          onClick={() => dispatch({ type: ACTIONS.ADD_NUMBER, payload: "9" })}
        >
          9
        </button>
        <button
          onClick={() => dispatch({ type: ACTIONS.ADD_OPERATOR, payload: "-" })}
        >
          -
        </button>
        <button
          onClick={() => dispatch({ type: ACTIONS.ADD_NUMBER, payload: "." })}
        >
          .
        </button>
        <button
          onClick={() => dispatch({ type: ACTIONS.ADD_NUMBER, payload: "0" })}
        >
          0
        </button>
        <button
          onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
          className="span-two"
        >
          =
        </button>
      </div>
    </>
  );
}

export default App;
