
import React, { useState } from 'react';
import type { Page } from '../App';
import { CompanyLogo } from '../constants';

interface AuthPageProps {
  page: Page;
  onNavigate: (page: Page) => void;
  onLogin: () => void;
}

const SignInForm: React.FC<{ onNavigate: (page: Page) => void; onLogin: () => void; }> = ({ onNavigate, onLogin }) => {
  return (
    <>
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-red focus:border-brand-red sm:text-sm" placeholder="you@example.com" defaultValue="front@owlab.com" />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" id="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-red focus:border-brand-red sm:text-sm" placeholder="••••••••" defaultValue="password" />
      </div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-brand-red focus:ring-brand-red border-gray-300 rounded" />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
        </div>
        <div className="text-sm">
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('forgot-password'); }} className="font-medium text-brand-red hover:text-red-500">
            Forgot your password?
          </a>
        </div>
      </div>
      <div>
        <button onClick={onLogin} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red">
          Sign In
        </button>
      </div>
    </>
  );
};

const ForgotPasswordForm: React.FC<{ onNavigate: (page: Page) => void; }> = ({ onNavigate }) => {
    const [step, setStep] = useState(1);
    
    return (
        <>
            {step === 1 ? (
                <>
                    <p className="text-center text-gray-600 mb-6">Enter your email to receive a password reset link.</p>
                    <div className="mb-6">
                        <label htmlFor="email-forgot" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email-forgot" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-red focus:border-brand-red sm:text-sm" placeholder="you@example.com" />
                    </div>
                    <div>
                        <button onClick={() => setStep(2)} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red">
                            Send Reset Link
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <p className="text-center text-gray-600 mb-6">Create a new password.</p>
                    <div className="mb-4">
                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">New Password</label>
                        <input type="password" id="new-password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-red focus:border-brand-red sm:text-sm" />
                    </div>
                     <div className="mb-6">
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                        <input type="password" id="confirm-password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-red focus:border-brand-red sm:text-sm" />
                    </div>
                    <div>
                        <button onClick={() => onNavigate('dashboard')} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red">
                            Reset Password
                        </button>
                    </div>
                </>
            )}
            <div className="text-center mt-4">
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('signin'); }} className="font-medium text-sm text-brand-red hover:text-red-500">
                    Back to Sign In
                </a>
            </div>
        </>
    );
};

export const AuthPage: React.FC<AuthPageProps> = ({ page, onNavigate, onLogin }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-auto flex justify-center"><CompanyLogo /></div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-brand-black">
            {page === 'signin' ? 'Sign in to your account' : 'Reset your password'}
          </h2>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
            {page === 'signin' && <SignInForm onNavigate={onNavigate} onLogin={onLogin} />}
            {page === 'forgot-password' && <ForgotPasswordForm onNavigate={onNavigate} />}
        </div>
      </div>
    </div>
  );
};
