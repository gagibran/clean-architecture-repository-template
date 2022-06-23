import { render, screen } from '@testing-library/react';
import App from './App';

test('renders an element', () => {
    render(<App />);
    const element = screen.getByText(/put your text in here/i);
    expect(element).toBeInTheDocument();
});
