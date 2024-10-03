import { useState ,useEffect} from "react";
import AppBar from "./components/AppBar.js";
import TransactionForm from "./components/TransactionForm.js";


// const InitialForm={
//           amount :0,
//           description:" ",
//           date:" ",}

function App() {
  // const[form,setForm] =useState(InitialForm)


  // async function handleSubmit(e){
  //   e.preventDefault();
  //   const req=await fetch("http://localhost:4000/transaction",{
  //         method:"POST",
  //         body: JSON.stringify(form),
  //         headers:{'content-type':"application/json"},
  //   });
  //     const data =await req.json();
    //  if(req.ok){
    //   // fetchTransactions();
    //   setForm(InitialForm);
    //  }

  //   console.log(data);
  // }
const [transactions,setTransactions]=useState([])



  useEffect(()=>{
     fetchTransactions();
  },[]);

  async function fetchTransactions()
    {
    const res=await fetch("http://localhost:4000/transaction");
    const {data} =await res.json();
    setTransactions(data);
    console.log(data);
    }
 
  
  return (
    <div >
      <AppBar/>
      <TransactionForm />

    <div>
          <section>
            <table>
              <thead>
                <th>Amount</th>
                <th>Description</th>
                {/* <th>Date</th> */}
              </thead>
              <tbody>
              {transactions.map((trx)=>(
               <tr key={trx._id}>
                <td>{trx.amount}</td>
                <td>{trx.description}</td>
                {/* <td>{trx.date}</td> */}
               </tr>
               ))}
              </tbody>
            </table>
          </section>
      </div>
     
      </div>
)};

export default App;
