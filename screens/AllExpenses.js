import { useContext } from "react"
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput"
import { ExpensesContext } from "../store/expenses-context";

function AllExpenses(){
   const ExpensesCtx= useContext(ExpensesContext);
return <ExpensesOutput expenses={ExpensesCtx.expenses} expensesPeriod="Total"/>
}
export default AllExpenses