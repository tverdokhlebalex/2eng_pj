"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type FormData = {
  username: string;
  email: string;
  password: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = (data: FormData) => {
    sessionStorage.setItem("user", JSON.stringify(data));
    router.push("/profile");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative backdrop-blur-lg bg-white/30 p-10 rounded-3xl shadow-lg max-w-lg mx-auto">
          <h1 className="text-2xl font-semibold text-center mb-6 text-blue-900">
            Регистрация
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Имя пользователя
              </label>
              <input
                {...register("username", { required: true })}
                placeholder="Введите имя пользователя"
                className="mt-1 block w-96 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
              />
              {errors.username && (
                <span className="text-red-500 text-sm">
                  Это поле обязательно
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                {...register("email", {
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                })}
                placeholder="Введите email"
                className="mt-1 block w-96 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  Введите корректный email
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Пароль
              </label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                placeholder="Введите пароль"
                className="mt-1 block w-96 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  Пароль должен быть минимум 6 символов
                </span>
              )}
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              >
                Зарегистрироваться
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
