import { Toaster } from "./components/ui/toaster";
import { RootRoutes } from "./routes";

function App() {
  return (
    <>
      <RootRoutes />
      <Toaster />
    </>
  );
}

export default App;
