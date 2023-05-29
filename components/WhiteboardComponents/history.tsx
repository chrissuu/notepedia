import useWhiteboardStore, { CurrentPath } from "./WhiteboardStore";

const history: {
    undoArr: CurrentPath[];
    redoArr: CurrentPath[];
  } = {
    undoArr: [],
    redoArr: [],
  };

const undo = () => {
    if (history.undoArr.length == 0) return;
    let lastPath = history.undoArr.pop();
    history.redoArr.push(lastPath);
    useWhiteboardStore.getState().removePath();

};

const redo = () => {
    if (history.redoArr.length == 0) return;
    let lastPath = history.redoArr.pop();
    history.undoArr.push(lastPath);
    useWhiteboardStore.getState().addPath(lastPath);

};


const clear = () => {
    history.undoArr = [];
    history.redoArr = [];
};

const push = (path: CurrentPath) => {
    history.undoArr.push(path);
    console.log(history.undoArr.length);
};

export default {history, undo, redo, clear, push};