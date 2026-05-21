import RouteContainer from "./components/RouteContainer"
import { AuthProvider } from "./configurations/useAuth"
import { ToasterProvider } from "./configurations/useToaster"

function App() {

  return (
    <>
      <ToasterProvider>
        <AuthProvider>
          <RouteContainer />
        </AuthProvider>
      </ToasterProvider>
    </>
  )
}

export default App
