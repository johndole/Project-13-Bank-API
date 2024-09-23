import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./layouts/Header"
import Footer from "./layouts/Footer"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"
import ProtectedRoute from "./components/ui/ProtectedRoute"

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
