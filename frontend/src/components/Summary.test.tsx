import { render, screen } from '@testing-library/react';
import Summary from './Summary';

describe('Summary', () => {
  it('no muestra nada cuando el resumen es null', () => {
    const { container } = render(<Summary summary={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('muestra los cuatro valores del resumen', () => {
    render(
      <Summary
        summary={{
          active_products: 11,
          low_stock_products: 4,
          out_of_stock_products: 3,
          inventory_value: 1980000,
        }}
      />
    );

    expect(screen.getByText('11')).toBeInTheDocument();
    expect(screen.getByText('$1.980.000')).toBeInTheDocument();
  });
});