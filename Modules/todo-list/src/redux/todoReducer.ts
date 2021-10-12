interface taskItem {
  id: Number,
  task: String,
  priority: String,
  star: Number,
  completed: Boolean
}
interface todoState {
  counter: Number,
  list: Array<taskItem>,
  duplicateItem: any,
  duplicateEditItem: any,
  duplicateEditItemId: any,
  duplicateItemIndex: any,
};


const initalState: todoState = {
  counter: 0,
  list: [{ id: 0, task: "list 1", priority: "high", star: 3, completed: false }],
  duplicateItem: '',
  duplicateEditItem: '',
  duplicateEditItemId: 0,
  duplicateItemIndex: ''
};

const addTodo = (state: todoState, action: any) => {
  //console.log(action);
  state.counter = Number(state.counter) + 1;
  state.list = [
    ...state.list,
    { id: state.counter, task: action.taskItem.task, priority: action.taskItem.priority, star: action.taskItem.star, completed: false }
  ];
  state.duplicateItem = false;
};
const updateTodo = (state: todoState, action: any) => {

  if (!!state.list.find((item: taskItem) => item.task === action.UpdatedTask)) {
    //fetch indexes of duplicate item

    let duplicateIndexes = state.list.map((item: taskItem, index: Number) => item.task === action.UpdatedTask ? Number(index) + 1 : undefined).filter(x => x);

    let index = state.list.findIndex((item: taskItem) => item.task === action.UpdatedTask);
    if (state.list[index].id !== action.id) {
      state.duplicateItemIndex = duplicateIndexes.toString();
      state.duplicateEditItem = action.UpdatedTask;
      state.duplicateEditItemId = action.id;
    }
    if (action.isUpdateDuplicate) {
      state.list[state.list.findIndex((item: taskItem) => item.id === Number(action.id))].task = action.UpdatedTask;
      state.duplicateEditItem = false;
    }
  } else {
    state.list[state.list.findIndex((item: taskItem) => item.id === Number(action.id))].task = action.UpdatedTask;
  }
}

const updateTodoRow = (state: todoState, action: any) => {

  //console.log(action.taskItem)
  state.list[state.list.findIndex((item: taskItem) => item.id === Number(action.id))].task = action.taskItem.task;
  state.list[state.list.findIndex((item: taskItem) => item.id === Number(action.id))].priority = action.taskItem.priority;
  state.list[state.list.findIndex((item: taskItem) => item.id === Number(action.id))].star = action.taskItem.star;
  state.duplicateItem = false;
}

const deleteTodo = (state: todoState, action: any): void => {
  state.list = state.list.filter(item => item.id !== Number(action.id));
  state.duplicateItem = false;
};

const toggleTodo = (state: todoState, action: any) => {
  state.list = state.list.map(todo =>
    todo.id === Number(action.id) ? { ...todo, completed: !todo.completed } : todo
  );
};

const clearTodoList = (state: todoState) => {
  state.list = [{ id: 0, task: "list 1", priority: 'high', star: 0, completed: false }];
  state.counter = 0;
  state.duplicateItem = '';
  state.duplicateEditItem = '';
  state.duplicateEditItemId = 0;
  state.duplicateItemIndex = '';
};

const todos = (state: todoState = initalState, action: any) => {

  switch (action.type) {
    case 'ADD_TODO':
      addTodo(state, action);
      return {
        ...state
      };
    case 'EDIT_TODO':
      updateTodo(state, action);
      return {
        ...state
      };
    case 'EDIT_TODO_ROW':
      updateTodoRow(state, action);
      return {
        ...state
      };
    case 'CLEAR_TODO_LIST':
      clearTodoList(state);
      return {
        ...state
      };
    case 'DELETE_TODO':
      deleteTodo(state, action);
      return {
        ...state
      };
    case 'TOGGLE_TODO':
      toggleTodo(state, action);
      return {
        ...state
      };
    case 'DUPLICATE_ITEM':
      return {
        ...state,
        duplicateItem: action.duplicateItem
      };
    case 'DUPLICATE_EDIT_ITEM':
      return {
        ...state,
        duplicateEditItem: action.duplicateEditItem
      };
    case 'DUPLICATE_EDIT_ITEM_ID':
      return {
        ...state,
        duplicateEditItemId: action.duplicateEditItemId
      };
    case 'DUPLICATE_ITEM_INDEX':
      return {
        ...state,
        duplicateItemIndex: action.duplicateItemIndex
      };
    default:
      return state;
  }
};

export default todos;