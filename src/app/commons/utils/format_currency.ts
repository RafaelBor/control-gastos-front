import { CurrencyPipe } from "@angular/common";

export function formatCurrencyInput(
  event: Event,
  currencyPipe: CurrencyPipe,
  callback: (realValue: number | null, formatted: string) => void
): void {
  const input = event.target as HTMLInputElement;

  let value = input.value.replace(/[^0-9.]/g, '');
  const parts = value.split('.');
  if (parts.length > 2) {
    value = parts[0] + '.' + parts[1];
  }

  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) {
    input.value = '';
    callback(null, '');
    return;
  }

  const formatted = currencyPipe.transform(numericValue, '', '', '1.0-2') ?? '';
  input.value = formatted;
  callback(numericValue, formatted);
}