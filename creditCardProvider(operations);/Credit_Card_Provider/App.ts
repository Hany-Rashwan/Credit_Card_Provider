const operations=[["Add", "Tom", "4111111111111111", "$1000"],
["Add", "Lisa", "5454545454545454", "$3000"],
["Add", "Quincy", "1234567890123456", "$2000"],
["Charge", "Tom", "$500"],
["Charge", "Tom", "$800"],
["Charge", "Lisa", "$7"],
["Credit", "Lisa", "$100"],
["Credit", "Quincy", "$200"]]


function creditCardProvider(operations) 
{
    let output = [];
    const Formated_Operations = Foramt_Operations(operations);
    
    const {operation_createCards} = Formated_Operations;
    const {operation_charge} = Formated_Operations;
    const {operation_credit} = Formated_Operations;
    //return Validate_Card_Number(operation_createCards);
    //return {operation_createCards, operation_credit, operation_charge};
    if(Add (operation_createCards))
    {
         //   console.log("ASD");
         if(Charge(operation_charge , operation_createCards))
         {
            Credit(operation_credit, operation_createCards)  
            operation_createCards.sort((a, b) => a.card_holder.localeCompare(b.card_holder))
            operation_createCards.map(element=>{
               output.push([element.card_holder,element.balance])
            })
         }
    }
    return output//.sort((a, b) => a.card_holder.localeCompare(b.card_holder))
}

// ================= Operations Functions =================================
 function Add(operation_createCards: any)  // add credit
    {
       if(operation_createCards)
       return true;
    }
    
    
 function Charge(operation_charge: string | any[],operation_createCards: any[])         
    {
        for (let i=0 ; i < operation_charge.length; i++)
        {
            const {card_holder,amount} = operation_charge[i];
           // console.log(card_holder,amount);
           // check validity of card ( igonore )
            // check limit > balance ( ignore)
            operation_createCards.forEach((element) => 
            {
                if(element.card_number_status== "Valid")
                {
                   // console.log(`${element.card_holder}------${card_holder}------${Number(amount.toString().slice(1,amount.length))+Number(element.limit.slice(1,element.limit.length))}----${element.balance}`)
                    if(element.card_holder === card_holder && Number(element.limit.slice(1,element.limit.length)) >= Number(element.balance) + Number(amount.toString().slice(1,amount.length)))
                    {
                       const  new_balance = (Number(element.balance) + Number(amount.toString().slice(1,amount.length)));
                     //  console.log(new_balance)
                      element.balance = '$'+new_balance
                    }
                }
                else {
                    element.card_number = "error";
                    element.balance = "error";
                }
            });
        }
        return true
     //  console.log(operation_createCards)
       // if card numner in invalied ignore operation
       // Charges that would raise the (balance) over the (limit) are ignored as if they were declined. 
    }
    
    
function Credit(operation_credit, operation_createCards)         
    {
      // balance drops to negative value  
      // if card numner in invalied ignore operation
      for (let i=0 ; i < operation_credit.length; i++)
      {
          const {card_holder,amount} = operation_credit[i];
         // console.log(card_holder,amount);
         // check validity of card ( igonore )
          // check limit > balance ( ignore)
          operation_createCards.forEach((element) => 
          {
              if(element.card_number_status== "Valid")
              {
                 // console.log(`${element.card_holder}------${card_holder}------${Number(amount.toString().slice(1,amount.length))+Number(element.limit.slice(1,element.limit.length))}----${element.balance}`)
                  if(element.card_holder === card_holder)
                  {
                    const  new_balance = Number(element.balance.slice(1,element.balance.length)) - Number(amount.toString().slice(1,amount.length));
                    //console.log(new_balance)
                    element.balance = '$'+new_balance
                  }
              }
              else {
                  element.card_number = "error";
                  element.balance = "error";
              }
          });
      }
     return operation_createCards
    }

    
// ============= format operations list ==========================
// input: array of operations
// output: create card operations objet , charges operation object , credits operation object
function Foramt_Operations(operations: string | any[])
 {
        let operation_createCards=[];
        let operation_credit = [];
        let operation_charge = [];
        let card_numbers = [];

    for (let i=0; i < operations.length; i++)
    {
        const op = operations[i];

        for ( let n=0; n< op.length; n++)
         {
            if ( op[n].includes("Add"))
            {
                const schema = {
                    card_holder: op[n+1],
                    card_number:  op[n+2],
                    card_number_status: Validate_Card_Number(op[n+2])? "Valid": "Not_Valid",
                    limit: op[n+3],
                    balance: 0
                  };
               // credit_cards_List.push(...op.splice(1,op.length))
               operation_createCards.push(schema);
            }
            else if ( op[n].includes("Charge"))
            {
                const schema = {
                    card_holder: op[n+1],
                    amount: op[n+2]
                  };
               // Ops.push(...op.splice(1,op.length));
               operation_charge.push(schema);
            }
            else if ( op[n].includes("Credit"))
            {
                const schema = {
                    card_holder: op[n+1],
                    amount: op[n+2]
                  };
               // Ops.push(...op.splice(1,op.length));
               operation_credit.push(schema);
            }
        }
     
    }
         return {operation_createCards, operation_charge, operation_credit}
    }
// ------------------------------------------------------------------------------
function Validate_Card_Number(card_number:string){      // Luhn algoritm
   
    let card_number_length = card_number.length
    let parity = card_number_length % 2   // even or odd
    let sum = 0

    for (let i = card_number_length-1; i >= 0; i--)
     {
        let digit = Number(card_number.charAt(i))

        if (i % 2 == parity)
             {
                digit *= 2 
             }

        if (digit > 9) 
             { 
                digit -= 9 
             }

        sum += digit
    }    
    return sum % 10 == 0? true:false
}


console.log(creditCardProvider(operations));
//creditCardProvider(operations);
