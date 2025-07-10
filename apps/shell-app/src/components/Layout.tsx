import React, { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { useConfiguration } from "../contexts/ConfigurationContext";
import { useEventBus } from "../services/eventBus";
import LeftNav from "./LeftNav";

const RemoteHeader = React.lazy(() => import("headerMfe/Header"));

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { state, changePersona } = useConfiguration();

  // Listen for navigation events from Header MFE
  useEventBus("navigation:change", ({ path, module }) => {
    console.log("Navigation event received:", { path, module });
    navigate(path);
  });

  const handleCategoryClick = (category: string) => {
    console.log("Category clicked:", category);
    navigate(`/category/${category}`);
  };

  const handleCartClick = () => {
    console.log("Cart clicked");
    navigate("/cart");
  };

  const handleUserSwitch = (userId: string) => {
    console.log("User switch requested:", userId);
    changePersona(userId);
    // Navigate to home category when user switches
    navigate("/category/home");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Suspense fallback={<LoadingSpinner />}>
        <RemoteHeader
          title="Whatfix E-commerce"
          cartCount={3}
          onCategoryClick={handleCategoryClick}
          onCartClick={handleCartClick}
          onUserSwitch={handleUserSwitch}
          currentUser={state.currentPersona}
          personas={state.personas}
          permissions={state.permissions}
        />
      </Suspense>

      <div className="flex flex-1">
        <aside className="shadow-md bg-white">
          <LeftNav />
        </aside>

        <main className="flex-1 p-6 bg-gray-50">
          <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
        </main>
      </div>
    </div>
  );
};

export default Layout;
