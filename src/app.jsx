import React from 'react';
import Container from 'react-bootstrap/lib/Container';
import Main from './main/main';

export default class App extends React.Component
{
    render()
    {
        return (
            <Container className={'main-background'} fluid={true}>
                <Main />
            </Container>
        );
    }
}
