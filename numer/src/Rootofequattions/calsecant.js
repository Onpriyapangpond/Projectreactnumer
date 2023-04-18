import { evaluate } from 'mathjs'
 export function Seca(Func,X0,X1){
    let Er = 100.0
    let Err = 0.00001
    let xnew = 0
    let i=0
    let obj ={}
    let data =[]
    let round =[]
    let anser = [] //Arary eror
    let ansx1 = [] //Array x1
    let ansx =[] //Array xold
    
    do{
     ansx.push(X0.toFixed(7))
    let scope = {x:X0}
    let fxx0 = evaluate(Func,scope)
      
    let scope1 = {x:X1}
    let fxx1 = evaluate(Func,scope1)
      

      xnew = X0-((fxx0*(X0-X1))/(fxx0-fxx1))
      Er = Math.abs((xnew-X1)/xnew)*100.0
      X0=X1
      X1=xnew
      ansx1.push(X1)
      anser.push(Er)

      obj = {
        iteration:i,
        Xold:X0,
        X1:xnew,
        Er:Er,
        
      }
      i++
      round.push(i)
      data.push(obj);
      
    }while(Er>Err)

    console.log("error",anser)
    
    return{x1new:X1,datanew:data,roundnew:round,ansernew:anser,ansx1new:ansx1,ansxnew:ansx }

  }

  