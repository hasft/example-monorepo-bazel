import * as React from 'react';
import { NextPage } from 'next';
import Composed from 'mm/fe/next/src/hoc/Composed';
import {Provider as AuthProvider} from 'mm/fe/next/src/contexts/auth';

export interface ComposedProps {

}

export default function withBase(ComposedComponent: NextPage<ComposedProps>) {
    function WithBaseWrapper() {
        return <Composed components={[AuthProvider]}><ComposedComponent  /></Composed>
    }

    WithBaseWrapper.getInitialProps = ComposedComponent.getInitialProps;
    
    return WithBaseWrapper;
}


