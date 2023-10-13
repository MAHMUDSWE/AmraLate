import { BrowserRouter, Routes, Route } from "react-router-dom"

//pages
import IndexPage from '../pages/IndexPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import ErrorPage from '../pages/ErrorPage';
import MapShow from "../pages/MapShow";
import SocketPage from "../pages/SocketPage";
import ChatRoom from "../pages/ChatRoom";
import ChatPage from "../pages/ChatPage";



function PageRoutes() {

    return (
        <div>
            {/* <RouterProvider router={routes} /> */}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <IndexPage />
                    } >
                        <Route path="/" element={<LoginPage />} />

                        <Route path="signup" element={<SignupPage />} />


                    </Route>

                    <Route path="/login" element={
                        <LoginPage />
                    } />

                    <Route path="/mapshow" element={<MapShow />} />

                    <Route path="/socket" element={<SocketPage />} />

                    <Route path="/chatroom" element={<ChatRoom />} />

                    <Route path="/chatpage" element={<ChatPage />} />
                    {/*
                    <Route path="/signup" element={<LoggedOutMode>
                        <SignupPage />
                    </LoggedOutMode>} />

                    <Route path="/home" element={<GuestOrLoggedInMode>
                        <HomePage />
                    </GuestOrLoggedInMode>} />
                    <Route path="blog/:blogid" element={<GuestOrLoggedInMode>
                        <SingleBlog />
                    </GuestOrLoggedInMode>} />

                    <Route path="/write" element={<LoggedInMode>
                        <BlogWrite />
                    </LoggedInMode>} />

                    <Route path="/:username" element={<LoggedInMode>
                        <ProfilePage />
                    </LoggedInMode>} /> */}

                    <Route path="/*" element={<ErrorPage />} />

                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default PageRoutes;