import { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";
function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true
        },
        date: {
            value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : '',
            isValid: true
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true
        }
    });
    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        }
        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date'
        const descriptionIsValid = expenseData.description.trim().length > 0
        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            // Alert.alert('Invalid Input', 'Please check your input values');
           setInputs((curInputs)=>{
               return{
                amount:{value:curInputs.amount.value,isValid:amountIsValid},
                date:{value:curInputs.date.value,isValid:dateIsValid},
                description:{value:curInputs.description.value,isValid:descriptionIsValid}
               }
           })
            return;
        }
        onSubmit(expenseData);
    }
    function inputChnagedHandler(inputIdentifier, enteredValue) {
        setInputs((curInputValues) => {
            return {
                ...curInputValues,
                [inputIdentifier]: {value:enteredValue,isValid:true},
            }
        });
    }
    const formIsInvalid =  !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input style={styles.rowInputItem}
                invalid={!inputs.amount.isValid}
                label="Amount" textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: inputChnagedHandler.bind(this, 'amount'),
                    value: inputs.amount.value
                }} />
                <Input style={styles.rowInputItem}
                 invalid={!inputs.date.isValid}
                label="Date" textInputConfig={{
                    placeholder: "YYYY-MM-DD",
                    maxLength: 10,
                    onChangeText: inputChnagedHandler.bind(this, 'date'),
                    value: inputs.date.value
                }} />
            </View>
            <Input
             invalid={!inputs.description.isValid}
            label="Description" textInputConfig={{
                multiline: true,
                onChangeText: inputChnagedHandler.bind(this, 'description'),
                value: inputs.description.value
            }} />
            {formIsInvalid && <Text style={styles.errorText}>Invalid Input Values - Please Check inputs</Text>}
            <View style={styles.buttons}>
                <Button style={styles.button} mode="flat" onPress={onCancel} >Cancel</Button>
                <Button style={styles.button} onPress={submitHandler} >{submitButtonLabel}</Button>

            </View>
        </View>
    )
}
export default ExpenseForm;

const styles = StyleSheet.create({
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInputItem: {
        flex: 1
    },
    form: {
        marginTop: 40,
        flex: 1
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: "center"
    },
    buttons: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    errorText:{
        textAlign:'center',
        color:GlobalStyles.colors.error500,
        margin:8
    }
})