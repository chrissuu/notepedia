// import { Path } from "./Whiteboard";
// import { useWhiteboardStore } from "./WhiteboardStore";

// const history: {
//     undoArr: Path[];
//     redoArr: Path[];

//   } = {
//     undoArr: [],
//     redoArr: [],

// };

// const undo = () => {
//     if (history.undoArr.length == 0) return;
//     let lastPath = history.undoArr.pop();
//     history.redoArr.push(lastPath);
//     useWhiteboardStore.getState().setPaths([...history.undoArr]);
    

// };

// const redo = () => {
//     if (history.redoArr.length == 0) return;
//     let lastPath = history.redoArr.pop();
//     history.undoArr.push(lastPath);
//     useWhiteboardStore.getState().setPaths([...history.undoArr]);

// };


// const clear = () => {
//     history.undoArr = [];
//     history.redoArr = [];
    
// };

// const push = (path: Path) => {
//     history.undoArr.push(path);
// };



// export default {history, undo, redo, clear, push};