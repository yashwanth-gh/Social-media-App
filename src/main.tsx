import { BrowserRouter} from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";

// import React from "react";
// import { RouterProvider,Route,createBrowserRouter, createRoutesFromElements } from "react-router-dom";

// const router = createBrowserRouter(
//     createRoutesFromElements(
//         <Route path="/" element={<App/>}>

//         </Route>
//     )
// )

// ReactDOM.createRoot(document.getElementById('root')!).render(
//     <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>,

// )

ReactDOM.createRoot(document.getElementById('root')!).render(
<BrowserRouter>
<Provider store={store}>
<App/>
</Provider>
</BrowserRouter>

)