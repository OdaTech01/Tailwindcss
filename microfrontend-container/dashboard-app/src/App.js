import React, { Suspense } from 'react';
import './index.css';
const Header = React.lazy(() => import('headerApp/Header'));


function App() {

    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
            </Suspense>
        </div>
    );
}

export default App;
