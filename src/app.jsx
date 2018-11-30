import React from 'react';
import Container from 'react-bootstrap/lib/Container';
import Main from './main/main';

export default class App extends React.Component
{
    render()
    {
        return (
            <Container fluid={true}>
                <Main />
            </Container>
        );
    }
}
