import React from 'react';
import Header from "../Web/Header";

function HeaderWrapper(props) {
    return (
        <>
        <Header isMobileScreen={props.isMobileScreen}/>
            {props.children}
        </>
    );
}

export default HeaderWrapper;
