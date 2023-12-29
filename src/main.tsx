import { BrowserRouter} from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { QueryProvider } from "./lib/react-query/QueryProvider";

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
<QueryProvider>
<Provider store={store}>
<App/>
</Provider>
</QueryProvider>
</BrowserRouter>

)