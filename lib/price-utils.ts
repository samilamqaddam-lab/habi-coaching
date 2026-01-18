/**
 * Price utility functions for automatic price calculation
 * Used for collective yoga classes: 150 DH per hour
 */

export const PRICE_PER_HOUR_DHS = 150;

/**
 * Format a price in Moroccan Dirhams
 * @param price - The price in DHS
 * @returns Formatted string (e.g., "450 DH")
 */
export function formatPrice(price: number): string {
  return `${price} DH`;
}

/**
 * Get the display price, preferring calculated price over fallback
 * @param calculatedPrice - Price calculated from session minutes (null if not applicable)
 * @param fallbackPrice - Static price from translation files
 * @returns The price to display
 */
export function getDisplayPrice(
  calculatedPrice: number | null,
  fallbackPrice: string
): string {
  return calculatedPrice && calculatedPrice > 0
    ? formatPrice(calculatedPrice)
    : fallbackPrice;
}

/**
 * Calculate total price based on minutes
 * @param totalMinutes - Total minutes across all sessions
 * @returns Calculated price in DHS
 */
export function calculatePriceFromMinutes(totalMinutes: number): number {
  return Math.round((totalMinutes / 60) * PRICE_PER_HOUR_DHS);
}

/**
 * Format duration in minutes as "Xh Ymin"
 * @param minutes - Total minutes
 * @returns Formatted string (e.g., "1h30min")
 */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}min`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h${mins}min`;
}

/**
 * Get the first session date from an edition's sessions
 * @param sessions - Array of sessions with date_options
 * @returns First date or null
 */
export function getFirstSessionDate(
  sessions: Array<{ date_options?: Array<{ date_time: string }> }>
): Date | null {
  const allDates: Date[] = [];

  sessions.forEach(session => {
    session.date_options?.forEach(option => {
      if (option.date_time) {
        allDates.push(new Date(option.date_time));
      }
    });
  });

  if (allDates.length === 0) return null;

  return new Date(Math.min(...allDates.map(d => d.getTime())));
}

/**
 * Format edition date for badge display (e.g., "Fév 2026")
 * @param sessions - Array of sessions with date_options
 * @param locale - Locale for formatting ('fr' or 'en')
 * @returns Formatted date string
 */
export function formatEditionBadgeDate(
  sessions: Array<{ date_options?: Array<{ date_time: string }> }>,
  locale: string = 'fr'
): string {
  const firstDate = getFirstSessionDate(sessions);
  if (!firstDate) return '';

  return firstDate.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'Africa/Casablanca',
  });
}

/**
 * Format edition date for tab label (e.g., "Février 2026")
 * @param sessions - Array of sessions with date_options
 * @param locale - Locale for formatting ('fr' or 'en')
 * @returns Formatted date string
 */
export function formatEditionTabLabel(
  sessions: Array<{ date_options?: Array<{ date_time: string }> }>,
  locale: string = 'fr'
): string {
  const firstDate = getFirstSessionDate(sessions);
  if (!firstDate) return '';

  return firstDate.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'Africa/Casablanca',
  });
}

/**
 * Format a date range from sessions (e.g., "22 janv. - 30 janv. 2026")
 * @param sessions - Array of sessions with date_options
 * @param locale - Locale for formatting ('fr' or 'en')
 * @returns Formatted date range string
 */
export function formatEditionDateRange(
  sessions: Array<{ date_options?: Array<{ date_time: string }> }>,
  locale: string = 'fr'
): string | null {
  const allDates: Date[] = [];

  sessions.forEach(session => {
    session.date_options?.forEach(option => {
      if (option.date_time) {
        allDates.push(new Date(option.date_time));
      }
    });
  });

  if (allDates.length === 0) return null;

  const sortedDates = allDates.sort((a, b) => a.getTime() - b.getTime());
  const firstDate = sortedDates[0];
  const lastDate = sortedDates[sortedDates.length - 1];

  const formatDate = (date: Date) =>
    date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
      day: 'numeric',
      month: 'short',
      timeZone: 'Africa/Casablanca',
    });

  const startDateStr = formatDate(firstDate);
  const endDateStr = lastDate.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Africa/Casablanca',
  });

  return `${startDateStr} - ${endDateStr}`;
}
