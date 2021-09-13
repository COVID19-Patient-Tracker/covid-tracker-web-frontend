import styled , {css}from 'styled-components';


const gradient = degs => css`
    background: 
        linear-gradient(
            ${degs || 130}deg,
            #59cec4 0%,
            #59a7a0 100%
        )
`;

export const Card = styled.div`
    position: relative;
    overflow: hidden;
    width: 300px;
    height: 200px;
    padding: 3rem 0 2rem;
    border-radius: 0.5rem;
    color: white;
    ${gradient()};
    box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.025),
    0 9px 46px 8px rgba(0, 0, 0, 0.025),
    0 11px 15px -7px rgba(0, 0, 0, 0.025);

    /* &::after {
        content: "";
        position: absolute;
        z-index: 0;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        ${gradient(-50)};
        transition: opacity 0.75s;

    }
    &:hover::after { opacity: 1;} */
`;

export const Content = styled.div`
    position: relative;
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Icon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    flex: 0 0 auto;
    margin-bottom: 2rem;
    border-radius: 50%;
    font-size: 40px;
    color: white;
    ${gradient()};
    box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.25);
`;

export const PlanTitle = styled.div`
        font-size: 1.25rem;
        font-style : normal;
        
`;

export const PlanCost = styled.div`
    width: 100px;
    font-size: 1rem;
`;

export const FeatureListItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.325rem;

    & > i {
        font-size: 20px;
        margin-right:0.5rem;
    }
`;

export const ActionButton = styled.div`
    height: 40px;
    flex: 0 0 auto;
    padding: 0 2rem;
    margin-top: 1rem;
    border:0;
    border-radius: 20px;
    font-size: 40px;
    color: rgba(0, 0, 0, 0.85);
    background: rgba(255, 255, 255, 0.85);
    box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.25);
    transition: background 0.25s;

    &:hover { background:rgba(255, 255, 255, 1)}
`;

export const BackgroundSquare = styled.div`
    position: absolute;
    z-index: 2;
    top: 52%;
    left: 0%;
    width: 200%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    transition: rotate(-3deg);
`;