import {getEnvVar} from "./utils/getEnvVar";

function App() {

    return (
        <div className="App">
            <h1>Hello there 😀</h1>
            <h1>{"Backend: " + getEnvVar('FRONTEND_URL')}</h1>
        </div>
    );
}

export default App;
