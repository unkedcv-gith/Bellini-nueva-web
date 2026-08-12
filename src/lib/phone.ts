/**
 * Cleans and formats Argentine phone numbers to the correct WhatsApp international format.
 * Correct format: 549 + area code (without leading 0) + subscriber number (without leading 15).
 * Example: +54 9 2494 573917 -> 5492494573917
 * Example: +54 9 0249 15 457-3917 -> 5492494573917
 * Example: 02494 15-573917 -> 5492494573917
 */
export function cleanArgentinePhoneNumber(phone: string): string {
  // 1. Keep only digits
  let digits = phone.replace(/[^0-9]/g, '');

  // 2. Handle cases where the country code '54' is present
  if (digits.startsWith('54')) {
    // Remove '54' prefix temporarily to clean the rest
    let rest = digits.slice(2);

    // If it has the mobile '9' prefix after country code, remove it temporarily
    if (rest.startsWith('9')) {
      rest = rest.slice(1);
    }

    // Remove leading '0' if any (e.g., '0221' -> '221')
    if (rest.startsWith('0')) {
      rest = rest.slice(1);
    }

    // Remove '15' mobile indicator if present right after common area codes
    if (rest.startsWith('22115')) {
      rest = '221' + rest.slice(5);
    } else if (rest.startsWith('249415')) {
      rest = '2494' + rest.slice(6);
    } else if (rest.startsWith('24915')) {
      rest = '249' + rest.slice(5);
    } else if (rest.startsWith('1115')) {
      rest = '11' + rest.slice(4);
    } else if (rest.startsWith('34115')) {
      rest = '341' + rest.slice(5);
    } else if (rest.startsWith('35115')) {
      rest = '351' + rest.slice(5);
    } else if (rest.startsWith('26115')) {
      rest = '261' + rest.slice(5);
    } else if (rest.startsWith('15')) {
      rest = rest.slice(2);
    }

    // Reconstruct with '549' prefix
    return '549' + rest;
  }

  // 3. Handle cases where the country code '54' is NOT present
  // Remove leading '0' if any
  if (digits.startsWith('0')) {
    digits = digits.slice(1);
  }

  // Remove '15' prefix or mobile indicator
  if (digits.startsWith('22115')) {
    digits = '221' + digits.slice(5);
  } else if (digits.startsWith('249415')) {
    digits = '2494' + digits.slice(6);
  } else if (digits.startsWith('24915')) {
    digits = '249' + digits.slice(5);
  } else if (digits.startsWith('1115')) {
    digits = '11' + digits.slice(4);
  } else if (digits.startsWith('34115')) {
    digits = '341' + digits.slice(5);
  } else if (digits.startsWith('35115')) {
    digits = '351' + digits.slice(5);
  } else if (digits.startsWith('26115')) {
    digits = '261' + digits.slice(5);
  } else if (digits.startsWith('15')) {
    digits = digits.slice(2);
  }

  // Prepend '549' to the clean number
  return '549' + digits;
}
