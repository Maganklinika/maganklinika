import { Route, Routes } from "react-router-dom";
import "./App.css";
import VendegLayout from "./layouts/VendegLayout";
import Fooldal from "./pages/Fooldal";
import useAuthContext from "./contexts/AuthContext";
import { ComponentsMap } from "./components/componentsmap/ComponentsMap";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/profiles/Profile";
import SelectedTreatment from "./pages/treatment/SelectedTreatment";
import DisabledUser from "./pages/disabledUser/DisabledUser";
import VerifyEmailPage from "./pages/verify_email/VerifyEmailPage";
import ResetPassword from "./pages/reset_password/ResetPassword";

function App() {
  const { navigation } = useAuthContext();

  const urls = [];
  navigation.forEach((e) => {
    urls.push(e.url.replace("/", ""));
  });

  return (
    <Routes>
      <Route path="/" element={<VendegLayout />}>
        <Route path="/disabled-user" element={<DisabledUser />} />
        <Route path="/verify-email/*" element={<VerifyEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password-reset/*" element={<ResetPassword />} />
        <Route path="/selected-treatment" element={<SelectedTreatment />} />
        <Route path="/profile" element={<Profile />} />
        <Route index element={<Fooldal />} />
        {navigation ? (
          navigation.map((e, index) => {
            const Component = ComponentsMap[e.component_name];

            if (!Component) {
              console.error(`Component ${e.component_name} not found.`);
              return null;
            }

            return (
              <Route
                key={index}
                path={urls[index]}
                element={<Component />}
              />
            );
          })
        ) : (
          <h1>Loading</h1>
        )}
      </Route>
    </Routes>
  );
}

export default App;
