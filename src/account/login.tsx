import { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import  {useNavigate} from "react-router-dom"; 

interface LoginProps {
    onLogin: () => void;
  }

const LogIn : React.FC<LoginProps> = ({ onLogin }) =>{
    const navigate = useNavigate();
    const backgroundImageUrls  = [
        'url("/images/1.jpg")',
        'url("/images/2.jpg")',
        'url("/images/3.jpg")',
        'url("/images/4.jpg")',
        'url("/images/5.jpg")',
        'url("/images/6.jpg")',
        'url("/images/7.jpg")',
      ];
    const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);

    const backgroundImageStyle = {
        backgroundImage: backgroundImageUrls[currentBackgroundIndex],
        backgroundSize: 'contain',
        backgroundPosition: 'center',
      };

    const [user, setUser] =useState<UserData | null>(null);
    interface UserData {
        accessToken: string;
        expiresIn: number;
    }

    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            const userData = {
                accessToken: tokenResponse.access_token,
                expiresIn: tokenResponse.expires_in,
            };
            setUser(userData);
            onLogin();
            console.log('Login Succseeded:')
        },
        onError: (error) => console.log('Login Failed:', error)
    });
      
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * backgroundImageUrls.length);
        setCurrentBackgroundIndex(randomIndex);
      }, []); 

    return(
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-6 d-none d-lg-block" style={backgroundImageStyle}></div>
                            <div className="col-lg-6">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                    </div>
                                    <form className="user">
                                        <div className="form-group">
                                            <input type="email" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" />
                                        </div>
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox small">
                                                <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                <label className="custom-control-label" htmlFor="customCheck">Remember
                                                    Me</label>
                                            </div>
                                        </div>
                                        <a href="index.html" className="btn btn-primary btn-user btn-block">
                                            Login
                                        </a>
                                        <hr></hr>
                                        <button onClick={(e) => {e.preventDefault();login()}}>Sign in with Google 🚀 </button>
                                        <a href="index.html" className="btn btn-facebook btn-user btn-block">
                                            <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                        </a>
                                    </form>
                                    <hr></hr>
                                    <div className="text-center">
                                        <a className="small" href="forgot-password.html">Forgot Password?</a>
                                    </div>
                                    <div className="text-center">
                                        <a className="small" href="register.html">Create an Account!</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>
    )
}

export default LogIn;