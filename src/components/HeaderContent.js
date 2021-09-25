import React from 'react';
import styled from 'styled-components';
import homeimage from '../components/img/homeimage.png';

function HeaderContent() {
    return (
        <HeaderContentStyled>
            
            <div className="left-content">
                <div className="left-text-container">
                <h1>FIGHT AGAINST COVID-19</h1>
                    <p className="black">
                        Get latest covid-19 updates, news and health guidlines.<br/>
                        Stay with us!
                    </p>
                </div>    
                
            </div>
            
            <div className="right-content">
                <img src={homeimage} alt='' className="homeimage"/>
            </div>
            
        </HeaderContentStyled>
    )
}

const HeaderContentStyled = styled.div`
    position: absolute;
    margin-left: 7%;
    margin-top: 15%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    .homeimage{
        display: flex;
        @media screen and (max-width: 768px){
                display: none;
            }
    }
    .left-content{
        display: flex;
        align-items: center;
        padding-right: 5rem;
        .black{
            color:black;
            font-size: 1.5rem;
        }
        h1{
            font-size: 3rem;
            font-weight: 600;
            @media screen and (max-width: 768px){
                font-size: 2rem;
            }
        }

        .black{
            padding: 1.4rem 0;
            line-height: 1.8rem;
        }
        @media screen and (max-width: 768px){
                padding-right: 2rem;
            }
    }
`;

export default HeaderContent;
