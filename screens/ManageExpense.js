import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native"
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import ErrorOverLay from "../components/UI/ErrorOverlay";
import IconButton from "../components/UI/IconButton";
import LoadingOverLay from "../components/UI/LoadingOverlay";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import { deleteExpense, storeExpense, updateExpense } from "../Util/http";
function ManageExpense({route,navigation}){
    
    const[isSubmitting,setIsSubmitting]= useState(false);
    const [error,setError]=useState();

    const expneseCtx=useContext(ExpensesContext);
    const editedExpenseId= route.params?.expenseId
    const isEditing = !!editedExpenseId;
    const selectedExpense = expneseCtx.expenses.find(expense=> expense.id === editedExpenseId)
   
    useLayoutEffect(()=>{
    navigation.setOptions({
        title: isEditing ?'Edit Expense':'Add Expense'
    })
   },[navigation,isEditing]);
   

   async function deleteExpenseHandler(){
    setIsSubmitting(true)
    try{
        await deleteExpense(editedExpenseId)
        expneseCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
    }
    catch(error){
     setError('Colud not delete expense -Please try agian later')
     setIsSubmitting(false)
    }
   }
   function cancelHandler(){

    navigation.goBack();
   }
    async function  confirmHandler(expenseData){
        setIsSubmitting(true);
       try{
           if(isEditing){
           expneseCtx.updateExpense(editedExpenseId,expenseData)
           await updateExpense(editedExpenseId,expenseData)
           }else{
             const id=  await storeExpense(expenseData);
           expneseCtx.addExpense({...expenseData,id:id})
           }
          
           navigation.goBack();
       }
       catch(error){
           setError('Could Not save Data -Please again later')
           setIsSubmitting(false)
        }
   
   }
   if(error&& !isSubmitting){
    return <ErrorOverLay message={error}
    OnConfirm={()=>setError(null)}
    />
   }

   if(isSubmitting){
    return <LoadingOverLay/>
   }
    return <View style={styles.container}>
       <ExpenseForm 
       submitButtonLabel={isEditing ? 'Update': 'Add'}
       onCancel={cancelHandler}
       onSubmit={confirmHandler}
       defaultValues={selectedExpense}/>
        <View style={styles.deleteContainer}>
        {isEditing && <IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler}/>}
        </View>
    </View>
}
export default ManageExpense

const styles= StyleSheet.create({
    container:{
        flex:1,
        padding:24,
        backgroundColor:GlobalStyles.colors.primary800
    },
    deleteContainer:{
marginTop:16,
paddingTop:8,
borderTopWidth:2,
borderTopColor: GlobalStyles.colors.primary200
,alignItems:'center'
    }
})