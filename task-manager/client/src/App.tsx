import { Toaster } from "./components/ui/toaster";
import { DialogContextProvider } from "./contexts/dialog-context";
import { RootRoutes } from "./routes";

function App() {
  return (
    <DialogContextProvider>
      <>
        <RootRoutes />
        <Toaster />
      </>
    </DialogContextProvider>
  );
}

export default App;
