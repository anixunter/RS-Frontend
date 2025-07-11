export function getCSRFTokenFromCookie(): string | null {
  const name = 'csrftoken=';
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    if (cookie.startsWith(name)) {
      return decodeURIComponent(cookie.substring(name.length));
    }
  }

  return null;
}
