import Navbar from "../components/Navbar"
function Home(){
    return(
        <>
            <div className="flex items-center justify-center min-h-screen bg-black">
                <div className="bg-black flex flex-col items-center justify-center p-40">
                    <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-5xl text-white">
                        WELCOME TO VAXBOOKER
                    </h1>
                    <p className="scroll-m-20 text-xl text-sky-200 font-semibold tracking-tight pt-5">
                        Simplify Covid Vaccination Booking!
                    </p>
                    <div className="flex p-10">
                        <a href="/login" className="mr-4 px-6 py-3 bg-white hover:bg-cyan-200 text-black font-semibold rounded-md">LOGIN</a>
                        <a href="/signup" className="px-6 py-3 bg-white hover:bg-cyan-200 text-black font-semibold rounded-md">SIGNUP</a>
                    </div>

                                        
            </div>
        </div>

        </>
    )
}

export default Home;