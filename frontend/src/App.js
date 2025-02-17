
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import RecursionVisualizer from './components/RecursionVisualizer/RecursionVisualizer';
import SortingVisualizer from './components/SortingVisualizer/SortingVisualizer';

function App() {
  return (
   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recursion-visualizer" element={<RecursionVisualizer />} />
          <Route path="/sorting-visualizer" element={<SortingVisualizer />} />
        </Routes>
      </BrowserRouter>

  );
}

export default App;