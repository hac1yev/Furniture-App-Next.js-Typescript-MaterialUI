import { CssBaseline } from '@mui/material';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="p-3">
        <div className="row m-0">
            <div className="col-lg-4 col-md-6">
                <h1>HomeDecor</h1>
                <p className='footer-copyright'>©2022 All Right Reserved. Developed by Webcoder Agency</p>
            </div>
            <div className="col-lg-3 col-md-6 footer-col">
                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui </p>
            </div>
            <div className="col-lg-2 col-md-6 footer-col">
                <p>+994 50 555 55 55</p>
            </div>
            <div className="col-lg-3 col-md-6 footer-col">
                <p>youremailhere@gmail.com</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer