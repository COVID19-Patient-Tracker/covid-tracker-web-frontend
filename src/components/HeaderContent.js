import React from 'react';
import styled from 'styled-components';
import homeimage from '../components/img/homeimage.png';


export const HeaderContent =()=> {
    return (
        <HeaderContentStyled>
            <div className="left-content">
                <div className="left-text-container">
                <h1>FIGHT AGAINST COVID-19</h1>
                    <p className="black">
                        The corona virus pandemic has upended people's lives and put a tremendous strain on the community across Sri Lanka.<br/> 
                        We pay our heartfelt gratitude for all the healthcare workers on the front-line of this pandemic.
                    </p>
                </div>    
            </div> 
            <div className="right-content"><img src={homeimage} alt='' className="homeimage"/></div> 
        </HeaderContentStyled>
    )
}

export const HeaderContentGuideline =() => {
    return (
        <HeaderContentStyled>
            <div className="left-content">
                <div className="left-text-container">
                <h1>FIGHT AGAINST COVID-19</h1>
                    <p className="black">
                        The corona virus pandemic has upended people's lives and put a tremendous strain on the community across Sri Lanka.<br/> 
                        We pay our heartfelt gratitude for all the healthcare workers on the front-line of this pandemic.
                    </p>
                </div>    
            </div> 
            <div className="right-content"><img src='/assets/guidelineimage.png' alt='' className="homeimage"/></div> 
        </HeaderContentStyled>
    )
}

export const HeaderContentVaccine =() => {
    return (
        <HeaderContentStyled>
            <div className="left-content">
                <div className="left-text-container">
                <h1>FIGHT AGAINST COVID-19</h1>
                    <p className="black">
                        The corona virus pandemic has upended people's lives and put a tremendous strain on the community across Sri Lanka.<br/> 
                        We pay our heartfelt gratitude for all the healthcare workers on the front-line of this pandemic.
                    </p>
                </div>    
            </div> 
            <div className="right-content"><img src='/assets/vaccineimage.png' alt='' className="homeimage"/></div> 
        </HeaderContentStyled>
    )
}

export const HeaderContentNews =() => {
    return (
        <HeaderContentStyled>
            <div className="left-content">
                <div className="left-text-container">
                <h1>FIGHT AGAINST COVID-19</h1>
                    <p className="black">
                        The corona virus pandemic has upended people's lives and put a tremendous strain on the community across Sri Lanka.<br/> 
                        We pay our heartfelt gratitude for all the healthcare workers on the front-line of this pandemic.
                    </p>
                </div>    
            </div> 
            <div className="right-content"><img src='/assets/newsimageheader.png' alt='' className="homeimage"/></div> 
        </HeaderContentStyled>
    )
}

const HeaderContentStyled = styled.div`
    position: absolute;
    margin-left: 7%;
    margin-top: 15%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    @media screen and (max-width: 768px){
        margin-top: 20%;
    }
    .homeimage{
        display: flex;
        @media screen and (max-width: 768px){
                width: 80%;
            }
    }
    .left-content{
        display: flex;
        align-items: center;
        padding-right: 5rem;
        .black{
            color:black;
            font-size: 1.5rem;
            padding-right: 6rem;
        }
        h1{
            font-size: 3rem;
            font-weight: 600;
            
            @media screen and (max-width: 768px){
                font-size: 1.5rem;
            }
        }

        .black{
            padding: 1.4rem 0;
            font-size: 1.5rem;
            line-height: 1.8rem;
            display: flex;
            @media screen and (max-width: 768px){
                padding-right: 6rem;
                padding: 0rem 0;
                font-size: 1rem;
                display: none;
            }
        }
        
    }
`;

// export const HeaderContent;
// export const HeaderContentGuideline;

