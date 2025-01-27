import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [loading1, setLoading1] = useState(false);
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [credit, setCredit] = useState(null);  // Use null for better state management
    const backendUrl = import.meta.env.BACKEND_URL;
    const navigate=useNavigate();

    // Effect hook to load credit data when token is available or changed
    useEffect(() => {
        if (token) {
            loadCreditData();
        } else {
            // Clear user and credit data if token is removed
            setUser(null);
            setCredit(null);
        }
    }, [token,]);  // Re-run when token changes

    // Load user credits and data from backend
    const loadCreditData = async () => {
        setLoading1(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/credits`, {
                method: "GET",
                headers: { token },
            });

            if (!res.ok) {
                toast.error(res.statusText);
                return;
            }

            const data = await res.json();  // Await the .json() method to get the actual data
            if (!data) {
                toast.error("Failed to load user data");
                return;
            }

            setCredit(data.credits);
            setUser(data.user);
            setLoading1(false);

        } catch (error) {
            toast.error("An error occurred while fetching credit data");
            console.error(error);
            setLoading1(false);

        } finally {
            setLoading1(false);
        }
    };

    // Logout function to remove token from localStorage and reset the state
    const logout = async () => {
        try {
            
            localStorage.removeItem('token');
            setToken(null);  // Use null instead of empty string for better state management
            setUser(null);
            setCredit(null);

            toast.success("Logged out successfully");
        } catch (error) {
            toast.error("An error occurred while logging out");
        }
    };

    const generateImage=async(prompt)=>{
    // console.log("prompt is ",prompt)
    try {
        const res=await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/image/generate`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "token":token,
            },
            body:JSON.stringify({prompt})
        })
        if(!res.ok){
            const errordata=await res.json();
            toast.error(errordata.message);
            loadCreditData();
            if(errordata.creditBalance<=0){
                navigate('/buycredit');
            }

        }
        else{

            
            const data=await res.json();
            toast.success("Image generated successfully");
            
            loadCreditData();
            return {image:data.resultImage,success:data.success};
        }

    } catch (error) {
        toast.error("An error occurred while generating image");
        console.log(error);
    }
    }

    const value = {
        loading1,
        setLoading1,
        user,
        setUser,
        showLogin,
        setShowLogin,
        token,
        setToken,
        backendUrl,
        credit,
        setCredit,
        loadCreditData,
        logout,
        generateImage
        
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
