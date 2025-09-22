import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customersAPI, CustomerCreateData } from '../api/customers';

// Query keys
export const customerKeys = {
    all: ['customers'],
    lists: () => [...customerKeys.all, 'list'],
    list: (filters: any) => [...customerKeys.lists(), filters],
    details: () => [...customerKeys.all, 'detail'],
    detail: (id: string) => [...customerKeys.details(), id],
};

// Hook to get all customers
export const useCustomers = (params = {}) => {
    return useQuery({
        queryKey: customerKeys.list(params),
        queryFn: () => customersAPI.getAll(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Hook to get a single customer
export const useCustomer = (id: string) => {
    return useQuery({
        queryKey: customerKeys.detail(id),
        queryFn: () => customersAPI.getById(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Hook to search customers
export const useCustomerSearch = (query: string, params = {}) => {
    return useQuery({
        queryKey: [...customerKeys.lists(), 'search', query, params],
        queryFn: () => customersAPI.search(query, params),
        enabled: !!query,
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
};

// Hook to create a customer
export const useCreateCustomer = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (customerData: CustomerCreateData) => customersAPI.create(customerData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
        },
    });
};

// Hook to delete a customer
export const useDeleteCustomer = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => customersAPI.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
        },
    });
};


