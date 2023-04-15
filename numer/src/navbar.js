import React from 'react';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';



class NavBar extends Component
{
    render () {

        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                      <Navbar.Brand href="/">Numer</Navbar.Brand>
                      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                      <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="navKilm">
                        <Nav.Link href="/">HOME</Nav.Link>
                          <NavDropdown title="ROOT OF EQUATIONS" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/Bisection">Bisection Methods</NavDropdown.Item>
                                <NavDropdown.Item href="/FalsePosition">Flase-Position Methods</NavDropdown.Item>
                                <NavDropdown.Item href="/OnePointIteration">One-Point Iteration Methods</NavDropdown.Item>
                                <NavDropdown.Item href="/Taylor">Taylor Methods</NavDropdown.Item>
                                <NavDropdown.Item href="/NewtonRaphson">Newton Raphson Method</NavDropdown.Item>
                                <NavDropdown.Item href="/Secant">Secant Methods</NavDropdown.Item>
                                

                          </NavDropdown>
                          <NavDropdown title="LINEAR ALGEBRAIC" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/CramerRule">Cramer's Rule</NavDropdown.Item>
                                <NavDropdown.Item href="/GaussElimination">Gauss Elimination Method</NavDropdown.Item>
                                <NavDropdown.Item href="/GaussJordan">Gauss-Jordan Method</NavDropdown.Item>
                                <NavDropdown.Item href="/MaxtrixInversion">Maxtrix Inversion Method</NavDropdown.Item>
                                <NavDropdown.Item href="/LuDecomposition">LU Decomposition</NavDropdown.Item>
                                <NavDropdown.Item href="/CholeskyDecomposition">Cholesky Decomposition</NavDropdown.Item>
                                <NavDropdown.Item href="/JacobiIteration">Jacobi Method</NavDropdown.Item>
                                <NavDropdown.Item href="/GaussSeidel">Gauss-Seidel Method</NavDropdown.Item>
                                <NavDropdown.Item href="/ConjugateGradient">Conjugate Gradient Method</NavDropdown.Item>
                                <NavDropdown.Item href="/Testjs">test</NavDropdown.Item>
                          </NavDropdown>
                        </Nav>
                      </Navbar.Collapse>
                    </Container>
                  </Navbar>
            </div>
        );

    }
}

export default NavBar;