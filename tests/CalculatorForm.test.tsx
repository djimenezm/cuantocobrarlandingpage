import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import CalculatorForm from '@/components/CalculatorForm';
import { track } from '@vercel/analytics';

vi.mock('@vercel/analytics', () => ({
  track: vi.fn(),
}));

describe('CalculatorForm', () => {
  beforeEach(() => {
    vi.mocked(track).mockClear();
  });

  it('shows an error and blocks results when billable hours are 0', async () => {
    const user = userEvent.setup();

    render(<CalculatorForm />);

    const hoursInput = screen.getByRole('spinbutton', {
      name: /horas facturables al mes/i,
    });

    await user.clear(hoursInput);
    await user.type(hoursInput, '0');
    await user.click(screen.getByRole('button', { name: /calcular precio de la landing/i }));

    expect(screen.getByText('Las horas facturables deben ser mayores que 0.')).toBeInTheDocument();
    expect(screen.getByText('Revisa los campos marcados antes de calcular.')).toBeInTheDocument();
    expect(track).not.toHaveBeenCalled();
    expect(
      screen.queryByRole('heading', {
        name: /tu precio recomendado para esta landing page/i,
      }),
    ).not.toBeInTheDocument();
  });

  it('shows an error when the monthly target is 0', async () => {
    const user = userEvent.setup();

    render(<CalculatorForm />);

    const targetInput = screen.getByRole('spinbutton', {
      name: /objetivo mensual neto/i,
    });

    await user.clear(targetInput);
    await user.type(targetInput, '0');
    await user.click(screen.getByRole('button', { name: /calcular precio de la landing/i }));

    expect(screen.getByText('El objetivo mensual debe ser mayor que 0.')).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', {
        name: /tu precio recomendado para esta landing page/i,
      }),
    ).not.toBeInTheDocument();
  });

  it('rejects a tax reserve above the supported limit', async () => {
    const user = userEvent.setup();

    render(<CalculatorForm />);

    const taxReserveInput = screen.getByRole('spinbutton', {
      name: /reserva fiscal orientativa/i,
    });

    await user.clear(taxReserveInput);
    await user.type(taxReserveInput, '100');
    await user.click(screen.getByRole('button', { name: /calcular precio de la landing/i }));

    expect(screen.getByText('La reserva fiscal debe ser como máximo 99.')).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: /tu precio recomendado para esta landing page/i }),
    ).not.toBeInTheDocument();
  });

  it('renders the result card when the form is valid', async () => {
    const user = userEvent.setup();

    render(<CalculatorForm />);

    await user.click(screen.getByRole('button', { name: /calcular precio de la landing/i }));

    const resultCardHeading = await screen.findByRole('heading', {
      name: /tu precio recomendado para esta landing page/i,
    });
    const resultCard = resultCardHeading.closest('section');

    expect(resultCard).not.toBeNull();
    await waitFor(() => {
      expect(track).toHaveBeenCalledWith('landing_page_quote_calculated', {
        hasIVA: 'yes',
        includesCopywriting: 'yes',
      });
    });
    expect(resultCardHeading).toBeInTheDocument();
    expect(within(resultCard!).getByText(/referencia base por hora/i)).toBeInTheDocument();
    expect(within(resultCard!).getByText(/^precio mínimo defendible$/i)).toBeInTheDocument();
    expect(within(resultCard!).getByText(/precio recomendado sin iva/i)).toBeInTheDocument();
    expect(within(resultCard!).getByText(/colchón entre mínimo y recomendado/i)).toBeInTheDocument();
    expect(within(resultCard!).getAllByText(/total final con iva/i).length).toBeGreaterThan(0);
  });

  it('moves focus to the result card after a successful calculation', async () => {
    const user = userEvent.setup();

    render(<CalculatorForm />);

    await user.click(screen.getByRole('button', { name: /calcular precio de la landing/i }));

    const resultCardHeading = await screen.findByRole('heading', {
      name: /tu precio recomendado para esta landing page/i,
    });
    const resultCard = resultCardHeading.closest('section');

    expect(resultCard).not.toBeNull();
    expect(resultCard).toHaveAttribute('tabindex', '-1');
    await waitFor(() => {
      expect(resultCard).toHaveFocus();
    });
  });

  it('copies a concise landing page summary', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);

    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText,
      },
    });

    render(<CalculatorForm />);

    await user.click(screen.getByRole('button', { name: /calcular precio de la landing/i }));
    await user.click(await screen.findByRole('button', { name: /copiar resumen/i }));

    expect(writeText).toHaveBeenCalledWith(expect.stringContaining('Precio recomendado'));
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining('Alcance estimado'));
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining('Colchón de negociación'));
    expect(screen.getByText('Resumen copiado.')).toBeInTheDocument();
  });

  it('compares a client budget with the landing scope and copies the comparison', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });

    render(<CalculatorForm />);
    await user.click(screen.getByRole('button', { name: /calcular precio de la landing/i }));
    const budget = await screen.findByRole('textbox', {
      name: /qué presupuesto tiene el cliente/i,
    });

    await user.type(budget, '800');
    expect(screen.getByRole('status')).toHaveTextContent(/revisa secciones, integraciones/i);

    await user.click(screen.getByRole('button', { name: /copiar resumen/i }));
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining('Precio propuesto por el cliente'));
    await waitFor(() => expect(track).toHaveBeenCalledWith('landing_offer_compared', {
      outcome: expect.any(String),
    }));
    expect(vi.mocked(track).mock.calls.filter(([name]) => name === 'landing_offer_compared'))
      .toHaveLength(1);

    await user.click(budget);
    await user.tab();
    expect(vi.mocked(track).mock.calls.filter(([name]) => name === 'landing_offer_compared'))
      .toHaveLength(1);

    await user.clear(budget);
    await user.type(budget, 'abc');
    expect(budget).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Escribe un importe válido de 0 o más.')).toBeInTheDocument();
  });

  it('tracks a valid budget even if the user keeps focus in the field', async () => {
    const user = userEvent.setup();
    render(<CalculatorForm />);
    await user.click(screen.getByRole('button', { name: /calcular precio de la landing/i }));
    await user.type(screen.getByRole('textbox', { name: /qué presupuesto tiene el cliente/i }), '900');

    await waitFor(() => expect(track).toHaveBeenCalledWith('landing_offer_compared', {
      outcome: expect.any(String),
    }), { timeout: 2000 });
  });

  it('keeps fractional billable hours visible for correction', async () => {
    const user = userEvent.setup();

    render(<CalculatorForm />);

    const hoursInput = screen.getByRole('spinbutton', {
      name: /horas facturables al mes/i,
    });

    await user.clear(hoursInput);
    await user.type(hoursInput, '80.4');
    await user.tab();

    expect(hoursInput).toHaveValue(80.4);
  });

  it('preserves an invalid cost and focuses it after submission', async () => {
    const user = userEvent.setup();
    render(<CalculatorForm />);

    const costsInput = screen.getByRole('spinbutton', { name: /costes fijos mensuales/i });
    await user.clear(costsInput);
    await user.type(costsInput, '-100');
    await user.click(screen.getByRole('button', { name: /calcular precio de la landing/i }));

    expect(costsInput).toHaveValue(-100);
    expect(screen.getByText('Los costes fijos no pueden ser negativos.')).toBeInTheDocument();
    await waitFor(() => expect(costsInput).toHaveFocus());
    expect(screen.queryByRole('heading', { name: /tu precio recomendado para esta landing page/i })).not.toBeInTheDocument();
  });

  it('asks for whole numbers of sections', async () => {
    const user = userEvent.setup();
    render(<CalculatorForm />);

    const sectionsInput = screen.getByRole('spinbutton', { name: /número de secciones/i });
    await user.clear(sectionsInput);
    await user.type(sectionsInput, '2.5');
    await user.click(screen.getByRole('button', { name: /calcular precio de la landing/i }));

    expect(sectionsInput).toHaveValue(2.5);
    expect(screen.getByText('Introduce un número entero.')).toBeInTheDocument();
    await waitFor(() => expect(sectionsInput).toHaveFocus());
  });

  it('normalizes a pasted Spanish currency amount', async () => {
    const user = userEvent.setup();

    render(<CalculatorForm />);

    const targetInput = screen.getByRole('spinbutton', {
      name: /objetivo mensual neto/i,
    });

    await user.click(targetInput);
    await user.paste('2.500,50 €');

    expect(targetInput).toHaveValue(2500.5);
  });

  it('tracks the conversion only once per visit even if the user recalculates', async () => {
    const user = userEvent.setup();

    render(<CalculatorForm />);

    const submitButton = screen.getByRole('button', { name: /calcular precio de la landing/i });

    await user.click(submitButton);
    await user.click(submitButton);

    await waitFor(() => {
      expect(track).toHaveBeenCalledTimes(1);
    });
  });
});
