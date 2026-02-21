import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/auth';
import { Button } from '../components/ui/Button';
import { toast } from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export function Login() {
  const navigate = useNavigate();
  const { setUser, setSession } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    if (!supabase) {
      toast.error('Supabase is not configured. Please check environment variables.');
      setIsLoading(false);
      return;
    }

    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      if (authData.session) {
        setSession(authData.session);
        setUser({
          id: authData.user.id,
          email: authData.user.email!,
          full_name: authData.user.user_metadata?.full_name,
          role: authData.user.user_metadata?.role || 'customer'
        });
        toast.success('Welcome back!');
        navigate('/account');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 flex justify-center items-center min-h-[60vh]">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Sign in to access your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              {...register('email')}
              type="email"
              className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:ring-0 transition-colors"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              {...register('password')}
              type="password"
              className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:ring-0 transition-colors"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-black border-gray-300 focus:ring-black" />
              <span className="ml-2 text-gray-600">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-gray-600 hover:text-black underline">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Sign In
          </Button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-black hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
