import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function AdminRootPage() {
  // Check if user is authenticated
  const cookieStore = await cookies();
  const session = cookieStore.get('admin-session');
  const isAuthenticated = session?.value === 'authenticated';

  // Redirect based on authentication status
  if (isAuthenticated) {
    redirect('/admin/dashboard');
  } else {
    redirect('/admin/login');
  }
}
