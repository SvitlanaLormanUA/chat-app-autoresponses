import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
const SignUpPage = () => {
     const [showPassword, setShowPassword] = useState(false);
     const [formData, setFormData] = useState({ 
           fullname: "",
            email: "",
            password: "",
            
        });

    const { signup, isSigningup } = useAuthStore();
    const validateForm = () => {
       
    }
    const handleSubmit = (e) => {
        e.preventDefault();
       
    }
    return <>
    <div className="main-signup-page">
            <div className="right-section"></div>
            <div className="left-section"></div>
    </div>
    </>;
   };
   export default SignUpPage;