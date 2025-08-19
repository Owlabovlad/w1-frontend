
import React from 'react';
import { Modal } from '../../../components/ui';
import type { User } from '../../../types';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, user }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Account">
            <div className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        defaultValue={user.email}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
                        disabled
                    />
                </div>
                <div className="border-t border-gray-200 pt-6">
                    <h4 className="text-md font-semibold text-brand-black mb-4">Password</h4>
                    <div>
                        <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">Current Password</label>
                        <input
                            type="password"
                            id="current-password"
                            placeholder="Enter your password..."
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red"
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">New Password</label>
                        <input
                            type="password"
                            id="new-password"
                            placeholder="Enter your new password..."
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red"
                        />
                    </div>
                </div>
                <div className="flex justify-end pt-4">
                    <button
                        type="button"
                        className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-brand-red text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:text-sm"
                        onClick={onClose}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </Modal>
    );
};
