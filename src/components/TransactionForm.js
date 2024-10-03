import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import { useState } from 'react';

const InitialForm={
    amount :0,
    description:" ",
    date: new Date(),}

export default function TransactionForm() {
    
    // const [value, setValue] = useState(dayjs(Date.now()));
    const value= Date.now();
    const[form,setForm] =useState(InitialForm)
    
    function handleInput(e){
    
        setForm({...form,[e.target.name]:e.target.value});
      }
       function handleDate(newValue){
        setForm({...form,date:newValue})
       }

    async function handleSubmit(e){
        e.preventDefault();
        const req=await fetch("http://localhost:4000/transaction",{
              method:"POST",
              body: JSON.stringify(form),
              headers:{'content-type':"application/json"},
        });
          const data =await req.json();
         if(req.ok){
           //fetchTransactions();
          setForm(InitialForm);
         }
    
        console.log(data);
      }
      
    return (

    <Card sx={{ minWidth: 275 , marginTop:10}}>
      <CardContent>
       
      <Typography variant="h6"> Add New Transaction</Typography>
       
       <form onSubmit={handleSubmit}>
        <TextField sx={{marginRight:5}} name ="amount" value ={form.amount} onChange={handleInput}size='small' id="outlined-basic" label="Amount" variant="outlined" />
        <TextField id="outlined-basic" name ="description" value ={form.description} onChange={handleInput}size='small' sx={{marginRight:5}} label="Description" variant="outlined" />

       <LocalizationProvider dateAdapter={AdapterDayjs}>
        
        <DatePicker
          label="Transaction Date"
          value={value}
        //   onChange={(newValue) => setValue(newValue)}
          onChange={handleDate}
          sx={{marginRight:5}}
         
        />
         {/* console.log({DatePicker.newValue}) */}
        </LocalizationProvider>
        <Button type= "submit" variant="contained" sx={{marginTop:1}} size='small'>Submit</Button>

        </form>
      </CardContent>
      
    </Card>
  );
}
