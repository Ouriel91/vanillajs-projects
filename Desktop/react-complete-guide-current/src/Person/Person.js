import React from 'react';
import styled from 'styled-components';

//that is a react component!
const StyledDiv = styled.div`

        text-align: center;
        border: 1px solid #eee;
        width: 60%;
        box-shadow: 0 2px 3px #ccc;
        margin: 16px auto;
        padding: 16px;
        
        @media (min-width: 500px){
        
        width: '450px'
          
        }
        `

const person = ( props ) => {

    return (
        //<div className='Person' style={style}>
        <StyledDiv>
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name} />
        </StyledDiv>
            
        //</div>
    )
};

export default person;