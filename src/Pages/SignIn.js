
import { useState } from "react"
import { LoginUser } from "../API/user";
//import { useHistory } from "react-router-dom";
export default function SignIn() {
    //let history = useHistory();
    const [email, setEmail] = useState(""); // State untuk menyimpan nilai input email
    const [password, setPassword] = useState(""); // State untuk menyimpan nilai input password

    const handleSignIn = async (event) => {
        event.preventDefault(); // Menghentikan perilaku bawaan dari form
        // Kirim data ke API untuk proses login
        try {
            const response = await LoginUser(email, password);
            // const response = await LoginUser('aquq1q1.farrukh@gmail.com','semogasukses');
            if (response.resultCode === "00047") {
                // Lakukan sesuatu jika resultCode sama dengan 47
                //history.push('/home');
                window.location.href = '/home';
            }
            else if (response.resultCode !== "00047") {
                window.alert('Invalid Email or Password');
            }
            // Lakukan penanganan respons dari API di sini, seperti menangani token, pesan kesalahan, dll.
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10">
            <div className="flex shadow-md">
                <div className="flex flex-wrap content-center justify-center rounded-l-md bg-white" style={{ width: "24rem", height: "32rem" }}>
                    <div className="w-72">
                        <h1 className="text-xl font-semibold">Welcome back</h1>
                        <small className="text-gray-400">Welcome back! Please enter your details</small>
                        <form className="mt-4" onSubmit={handleSignIn}>
                            <div className="mb-3">
                                <label className="mb-2 block text-xs font-semibold" htmlFor="email">Email</label>
                                <input id="email" type="email" placeholder="Enter your email" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="mb-2 block text-xs font-semibold">Password</label>
                                <input id="password" type="password" placeholder="*****" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <button type="submit" onClick={handleSignIn} className="mb-1.5 block w-full text-center text-white bg-purple-700 hover:bg-purple-900 px-2 py-1.5 rounded-md">Sign in</button>
                            </div>
                        </form>
                        <div className="text-center">
                            <span className="text-xs text-gray-400 font-semibold">Don't have account?</span>
                            <a href="/" className="text-xs font-semibold text-purple-700">Sign up</a>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap content-center justify-center rounded-r-md" style={{ width: "24rem", height: "32rem" }}>
                    <img className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md" src="https://i.imgur.com/9l1A4OS.jpeg" alt="Login Background" />
                </div>
            </div>

        </div>
    )
};
