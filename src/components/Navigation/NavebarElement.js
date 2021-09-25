import styled from "styled-components";
import { NavLink as Link} from 'react-router-dom'
import {FaBars} from 'react-icons/fa'

export const Nav = styled.nav` 
    background: #FFFFFF00;
    position: absolute;
    height: 80px;
    background-size: cover;
    display: flex;
    font-size: 1rem;
    justify-content: space-between;
    padding-left: 5%;
    padding-top: 2%;
    z-index: 10;
    
/* Third Nav */
  /* justify-content: flex-start; */

`;

export const NavLink = styled(Link)`
  color: #757575;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 3rem;
  height: 100%;
  cursor: pointer;
  justify-content: center;
  &.active {
    color: #0b99d1;
    font-weight: bolder;
  }
`;

export const Bars = styled(FaBars)` 
  display: none;
  fill: #0b99d1;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    margin-left: 15rem;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  right: -24px;
  margin: 0 auto;

  /* Second Nav */
  /* margin-right: 24px; */

  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */
  white-space: nowrap; 

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 20px;
  background: #0b99d1;
  padding: 8px 12px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  /* Second Nav */
  /* margin-left: 24px; */

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #bce8fa;
    color: #010606;
    font-weight: bold;
  }
`;
