import { createContext, useReducer } from "react";


export const ExpensesContext=createContext({
expenses:[],
addExpense:({description,amount,date})=>{},
deleteExpense:(id)=>{},
setExpenses:(expenses)={},
updateExpense:(id,{description,amount,date})=>{}
});

function expenseReducer(state,action){
    switch(action.type){
        case "ADD":
            return [action.payload,...state]
        case 'UPDATE':
            const updateableExpenseIndex= state.findIndex((expense)=> expense.id === action.payload.id);
            const updateableExpense= state[updateableExpenseIndex];
            const updatedItem={...updateableExpense,...action.payload.data}
            const updatedExpenses=[...state];
            updatedExpenses[updateableExpenseIndex]= updatedItem
            return updatedExpenses;
        case 'DELETE':    
        return state.filter((expense)=> expense.id!==action.payload)
        case 'SET':
          const invertedArray=action.payload.reverse();
          return invertedArray;
        default:
            return state;
    }
}
function ExpensesContextProvider({children}){
   const [expensesState,dispatch]= useReducer(expenseReducer, [])
   function addExpense(expenseData){
    dispatch({type:'ADD',payload: expenseData});
   }
   function deleteExpense(id){
    dispatch({type:'DELETE',payload: id});
   }
   function setExpenses(expenses){
    dispatch({type:'SET',payload:expenses});
   }
   function updateExpense(id,expenseData){
    dispatch({type:'update',payload:{id:id,data:expenseData} });
   }

   const value={
    expenses: expensesState,
    addExpense:addExpense,
    deleteExpense:deleteExpense,
    updateExpense:updateExpense,
    setExpenses:setExpenses
   }
   return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}
export default ExpensesContextProvider