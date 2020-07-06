import {initializeBlock} from '@airtable/blocks/ui';
import React from 'react';
import App from './app.js';

function HelloWorldBlock() {
    // YOUR CODE GOES HERE
    return <App />;
}

initializeBlock(() => <HelloWorldBlock />);
