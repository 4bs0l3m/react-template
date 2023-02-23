import AdminLayout from "./layouts/admin/admin.layout";
import ThemeProvider from "./theme";

function App() {
  return (
    <ThemeProvider>
      <AdminLayout></AdminLayout>
    </ThemeProvider>
  );
}

export default App;
