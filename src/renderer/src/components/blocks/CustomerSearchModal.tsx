import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useCustomers, useCreateCustomer } from '../../hooks/useCustomers';


// Default walking customer
const walkingCustomer = { name: 'Walking Customer', gst: 'Not Applicable' };

interface CustomerSearchModalProps {
    open: boolean;
    onClose: () => void;
    onSelect: (customer: any) => void;
}

const CustomerSearchModal: React.FC<CustomerSearchModalProps> = ({ open, onClose, onSelect }) => {
    const [search, setSearch] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [mounted, setMounted] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newCustomer, setNewCustomer] = useState({
        name: '',
        email: '',
        phone: '',
        gst: '',
        address: '',
        city: '',
        state: '',
        pincode: ''
    });

    // Fetch customers from API
    const { data: apiCustomers, isLoading, error } = useCustomers();
    const createCustomerMutation = useCreateCustomer();

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Combine walking customer with API customers
    // API now returns normalized customer data
    const customersFromAPI = apiCustomers || [];

    // Transform normalized customers to match our expected format
    const transformedCustomers = customersFromAPI.map(customer => ({
        name: customer.name,
        gst: customer.gst || 'Not Available'
    }));

    const allCustomers = [walkingCustomer, ...transformedCustomers];

    // Filter customers based on search
    const filtered = allCustomers.filter(c =>
        c.name && c.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = () => {
        if (selectedIndex >= 0 && filtered[selectedIndex]) {
            onSelect(filtered[selectedIndex]);
        }
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleCreateCustomer = async () => {
        try {
            // Validate required field
            if (!newCustomer.name.trim()) {
                alert('Customer name is required');
                return;
            }

            console.log('Creating customer:', newCustomer);

            const createdCustomer = await createCustomerMutation.mutateAsync(newCustomer);

            console.log('Customer created successfully:', createdCustomer);

            // Show success message
            alert(`Customer "${newCustomer.name}" created successfully!`);

            // Close form and reset
            setShowCreateForm(false);
            setNewCustomer({
                name: '',
                email: '',
                phone: '',
                gst: '',
                address: '',
                city: '',
                state: '',
                pincode: ''
            });

            // Auto-select the newly created customer
            const newCustomerForSelection = {
                name: createdCustomer.name || createdCustomer.name || newCustomer.name,
                gst: 'Not Available'
            };

            // Close modal and pass the new customer
            onSelect(newCustomerForSelection);
            onClose();

        } catch (error: any) {
            console.error('Error creating customer:', error);
            alert('Failed to create customer. Please try again.');
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setNewCustomer(prev => ({
            ...prev,
            [field]: value
        }));
    };

    if (!open || !mounted) return null;

    const modalContent = (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99999] flex items-center justify-center p-4"
            onClick={handleBackdropClick}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
            <div
                className={`bg-white rounded-2xl shadow-2xl flex flex-col ${showCreateForm ? 'w-[500px] max-h-[700px]' : 'w-96 max-h-[600px]'
                    }`}
                style={{
                    maxWidth: showCreateForm ? '500px' : '24rem',
                    maxHeight: showCreateForm ? '700px' : '600px'
                }}
            >
                {/* Header */}
                <div className="p-4 border-b border-gray-200 flex-shrink-0">
                    <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-lg font-semibold text-gray-800 flex-1">
                            {showCreateForm ? 'Create New Customer' : 'Select Customer'}
                        </h3>
                        {!showCreateForm && (
                            <button
                                onClick={() => setShowCreateForm(true)}
                                className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center hover:bg-accent/90 transition-all"
                                title="Create New Customer"
                            >
                                <i className="fas fa-plus text-sm"></i>
                            </button>
                        )}
                        {showCreateForm && (
                            <button
                                onClick={() => setShowCreateForm(false)}
                                className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 transition-all"
                                title="Back to Search"
                            >
                                <i className="fas fa-arrow-left text-sm"></i>
                            </button>
                        )}
                    </div>

                    {!showCreateForm ? (
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search customers..."
                                className="w-full p-3 pl-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === 'ArrowDown') setSelectedIndex(i => Math.min(i + 1, filtered.length - 1));
                                    if (e.key === 'ArrowUp') setSelectedIndex(i => Math.max(i - 1, 0));
                                    if (e.key === 'Enter') handleSelect();
                                    if (e.key === 'Escape') onClose();
                                }}
                                autoFocus
                            />
                            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        </div>
                    ) : null}
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-hidden">
                    {!showCreateForm ? (
                        /* Search Results */
                        <div className="overflow-y-auto p-2 h-full max-h-[400px]">
                            {isLoading ? (
                                <div className="flex items-center justify-center h-32">
                                    <div className="text-gray-500">Loading customers...</div>
                                </div>
                            ) : error ? (
                                <div className="flex items-center justify-center h-32">
                                    <div className="text-red-500 text-center">
                                        <div>Error loading customers.</div>
                                        <div className="text-xs mt-1">Status: {(error as any)?.response?.status || 'Unknown'}</div>
                                        <div className="text-xs"> {(error as any)?.response?.data?.message || (error as any)?.message || 'Unknown error'}</div>
                                    </div>
                                </div>
                            ) : filtered.length === 0 ? (
                                <div className="flex items-center justify-center h-32">
                                    <div className="text-gray-500">No customers found.</div>
                                </div>
                            ) : (
                                filtered.map((c, idx) => (
                                    <div
                                        key={c.name}
                                        className={`p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-all ${selectedIndex === idx ? 'bg-accent text-white' : ''}`}
                                        onClick={() => { setSelectedIndex(idx); handleSelect(); }}
                                        onMouseEnter={() => setSelectedIndex(idx)}
                                    >
                                        <div className="font-semibold text-sm">{c.name}</div>
                                        <div className={`text-xs ${selectedIndex === idx ? 'text-white/80' : 'text-gray-600'}`}>
                                            GST: {c.gst || 'Not Available'}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    ) : (
                        /* Create Form */
                        <div className="overflow-y-auto h-full">
                            <div className="p-4 space-y-4 pb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                                    <input
                                        type="text"
                                        value={newCustomer.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                                        placeholder="Enter customer name"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            value={newCustomer.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                                            placeholder="email@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                        <input
                                            type="tel"
                                            value={newCustomer.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                                            placeholder="Phone number"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                                    <input
                                        type="text"
                                        value={newCustomer.gst}
                                        onChange={(e) => handleInputChange('gst', e.target.value)}
                                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                                        placeholder="GST number (optional)"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                    <textarea
                                        value={newCustomer.address}
                                        onChange={(e) => handleInputChange('address', e.target.value)}
                                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                                        placeholder="Enter address"
                                        rows={3}
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                        <input
                                            type="text"
                                            value={newCustomer.city}
                                            onChange={(e) => handleInputChange('city', e.target.value)}
                                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                                            placeholder="City"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                        <input
                                            type="text"
                                            value={newCustomer.state}
                                            onChange={(e) => handleInputChange('state', e.target.value)}
                                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                                            placeholder="State"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                                        <input
                                            type="text"
                                            value={newCustomer.pincode}
                                            onChange={(e) => handleInputChange('pincode', e.target.value)}
                                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                                            placeholder="Pincode"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 flex justify-end gap-3 flex-shrink-0">
                    {!showCreateForm ? (
                        <>
                            <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all">Cancel</button>
                            <button onClick={handleSelect} className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-all">Select</button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setShowCreateForm(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateCustomer}
                                className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!newCustomer.name.trim() || createCustomerMutation.isPending}
                            >
                                {createCustomerMutation.isPending ? (
                                    <span className="flex items-center gap-2">
                                        <i className="fas fa-spinner fa-spin"></i>
                                        Creating...
                                    </span>
                                ) : (
                                    'Create Customer'
                                )}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

export default CustomerSearchModal;