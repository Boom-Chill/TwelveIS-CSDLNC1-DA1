import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Invoice from './pages/Invoice/Invoice';
import './App.scss';
import AdminSideBar from './components/AdminSideBar/AdminSideBar';
import Summary from './pages/Summary/Summary';
import UploadInvoice from "./pages/UploadInvoice/UploadInvoice";

function App() {
  return (
    <div className="App">
        <Router>
          <AdminSideBar />
          <Route path='/' exact component={Invoice}/>
          <Route path='/upload' exact component={UploadInvoice}/>
          <Route path='/summary' exact component={Summary}/>
          
        </Router>
    </div>
  );
}

export default App;
