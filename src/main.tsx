import App from './App'
import React from 'react'
import ReactDOM from 'react-dom/client'
;
(() => {
   if (document.getElementById(`clarityContainer`)) return

   const container = document.createElement('div')
   container.setAttribute('id', 'clarityContainer')
   document.querySelector('body')?.prepend(container)
})()

ReactDOM.createRoot(document.getElementById('clarityContainer')!).render(
   <React.StrictMode>
      <App />
   </React.StrictMode>
)
