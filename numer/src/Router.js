import {  Routes, Route } from "react-router-dom";
import Home from './Home';
import Bisection  from "./Rootofequattions/Bisection";
import FalsePosition from "./Rootofequattions/FalsePosition"
import NewtonRaphson from "./Rootofequattions/Newton"
import OnePointIteration from "./Rootofequattions/Onepointiteration"
import CramerRu from "./Linear/Conju"
import Secant  from "./Rootofequattions/Secant";
import CramerRule from "./Linear/Carmerule.js"
import GaussElimination from "./Linear/Guass"
import Taylor  from "./Rootofequattions/Taylor";
import GaussJordan from "./Linear/Guassjrdan"
import LuDecomposition from "./Linear/Ludecom"
import MaxtrixInversion from "./Linear/MaxtrixInversion"
import JacobiIteration from "./Linear/Jacobi"
import CholeskyDecomposition from "./Linear/Choelosky"
import GaussSeidel from "./Linear/Guassseidel"
import ConjugateGradient from "./Linear/Conjugate"
import Testjs  from "./Linear/testjs";

function Router() {
  return (
    <div >
      
      <Routes>
            <Route path= "/" element= {<Home/>} />
            <Route path= "/Bisection" element= {<Bisection/>} />
            <Route path= "/FalsePosition" element= {<FalsePosition/>} />
            <Route path= "/NewtonRaphson" element= {<NewtonRaphson/>} />
            <Route path= "/OnePointIteration" element= {<OnePointIteration/>} />
            <Route path= "/Secant" element= {<Secant/>} />
            <Route path= "/CramerRule" element= {<CramerRule/>} />
            <Route path= "/conju" element= {<CramerRu/>} />
            <Route path= "/GaussElimination" element= {<GaussElimination/>} />
            <Route path= "/Taylor" element= {<Taylor/>} />
            <Route path= "/GaussJordan" element= {<GaussJordan/>} />
            <Route path= "/LuDecomposition" element= {<LuDecomposition/>} />
            <Route path= "/MaxtrixInversion" element= {<MaxtrixInversion/>} />
            <Route path= "/CholeskyDecomposition" element= {<CholeskyDecomposition/>} />
            <Route path= "/JacobiIteration" element= {<JacobiIteration/>} />
            <Route path= "/GaussSeidel" element= {<GaussSeidel/>} />
            <Route path= "/ConjugateGradient" element= {<ConjugateGradient/>} />
            <Route path= "/Testjs" element= {<Testjs/>} />
       
            
           
            
      </Routes>

      
    </div>

  );
}

export default Router;