import * as Yup from 'yup'

import React from 'react'
import { useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

import type { SubmitHandler } from 'react-hook-form'
import { API_Endpoints } from '@renderer/config/endpoints'
import { useMutationQuery } from '@renderer/hooks/react-query/useReactQuery'
import { ControlledTextField } from '../form/controlled-text-field'
import { Lock, UserIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Form } from '../ui/form'
import { useAuth } from '@renderer/hooks/useAuth'
import { toast } from 'sonner'
import { COMMON_ERROR_MESSAGE } from '@renderer/data/messages'

const schema = Yup.object().shape({
  email: Yup.string().required('This field is required'),
  password: Yup.string()
    .required('This field is required')
    .min(5, 'Password must be at least 5 characters long')
})

type FormData = Yup.InferType<typeof schema>

const LoginPage: React.FC = () => {
  const form = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { isPending, mutate, error } = useMutationQuery({
    endPoint: API_Endpoints.LOGIN,
    method: 'POST'
  })

  const { login } = useAuth()

  console.log('forms.f', form.formState.errors)

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const adjustedData = {
      usr: data.email,
      pwd: data.password
    }
    mutate(
      {
        data: adjustedData,
        params: {}
      },
      {
        onSuccess: (res) => {
          login(res)
        },
        onError: (err) => {
          toast.error(COMMON_ERROR_MESSAGE)
          console.error('Login failed:', err)
        }
      }
    )
  }

  return (
    <div>
      <div className="bg-gradient-to-br from-slate-50 to-gray-100 min-h-screen flex items-center justify-center p-6 font-sans relative w-screen">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-4000"></div>
        </div>

        {/* Login Card */}
        <div className="glass-effect rounded-3xl modern-shadow w-full max-w-md p-8 z-10 relative">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-[#334155] to-[#0f172a] rounded-2xl mx-auto mb-4 flex items-center justify-center modern-shadow">
              <i className="fas fa-cash-register text-white text-2xl"></i>
            </div>
            <h1 className="text-3xl font-bold text-primary mb-2">CentroERP POS</h1>
            <p className="text-gray-600 text-sm">Point of Sale for Traders</p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error.message}</p>
              </div>
            )}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <ControlledTextField
                  name="email"
                  leftIcon={<UserIcon />}
                  label={'Email or Username'}
                  required
                  control={form.control}
                />
                <ControlledTextField
                  type="password"
                  name="password"
                  label={'Password'}
                  required
                  control={form.control}
                  leftIcon={<Lock />}
                />

                <Button type="submit" disabled={isPending}>
                  Submit
                </Button>
              </form>
            </Form>
          </div>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">or continue with</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <div className="space-y-3"></div>

          <div className="text-center mt-8 space-y-3">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?
              <span className="text-accent hover:text-accent/80 font-medium transition-all">
                {' '}
                Sign up here
              </span>
            </p>
            <div className="flex justify-center space-x-6 text-xs text-gray-500">
              <span className="hover:text-gray-700 transition-all cursor-pointer">
                Privacy Policy
              </span>
              <span className="hover:text-gray-700 transition-all cursor-pointer">
                Terms of Service
              </span>
              <span className="hover:text-gray-700 transition-all cursor-pointer">Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
