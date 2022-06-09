import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// Uygulamanızın çevrimdışı çalışmasını ve daha hızlı yüklenmesini istiyorsanız, değiştirebilirsiniz.

serviceWorker.unregister();
