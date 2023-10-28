import { useContext, useEffect, useState } from "react"
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput"
import ErrorOverLay from "../components/UI/ErrorOverlay";
import LoadingOverLay from "../components/UI/LoadingOverlay";
import { ExpensesContext } from "../store/expenses-context"
import { getDateMiusDays } from "../Util/date";
import { fetchExpenses } from "../Util/http";
function RecentExpenses(){
   const expensesCtx=  useContext(ExpensesContext);
   const [isFetching,setIsFetching]=useState(true);
   const [error,setError]=useState();

   useEffect(()=>{
   async function getExpenses(){
    try{
      setIsFetching(true)
      const expenses= await fetchExpenses();
      expensesCtx.setExpenses(expenses)
    }
    catch(error){
      setError('Colud not fetch Expenses');
    }
   
     setIsFetching(false)
    }
    getExpenses()
  },[]);
  if(error && !isFetching){
    return <ErrorOverLay message={error} OnConfirm={()=>setError(null)}/>
  }
  if(isFetching){
    return <LoadingOverLay/>
  }
  
  const recentExpenses = expensesCtx.expenses.filter((expense)=>{
    const today= new Date()
    const date7DaysAgo= getDateMiusDays(today,7);
    return expense.date > date7DaysAgo;
  })
    return <ExpensesOutput fallbackText="No expenses registered for Last 7 days" expenses={recentExpenses} expensesPeriod="Last 7 days"/>
}
export default RecentExpenses