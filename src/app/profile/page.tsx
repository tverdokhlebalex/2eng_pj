"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useStore from "../../store/useStore";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Импортируем Image

type RecordFormData = {
  title: string;
  description: string;
  image: FileList;
};

const Profile = () => {
  const { user, setUser, records, addRecord, editRecord } = useStore();
  const { register, handleSubmit, reset } = useForm<RecordFormData>();
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Состояние для загрузки
  const [selectedFontSize, setSelectedFontSize] = useState("text-base"); // Размер шрифта

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user") || "null");
    if (!storedUser || !storedUser.username) {
      router.push("/register");
    } else {
      setUser(storedUser);
    }
    setLoading(false);
  }, [setUser, router]);

  const onSubmit = (data: RecordFormData) => {
    const file = data.image[0] ? URL.createObjectURL(data.image[0]) : "";
    addRecord({
      title: data.title,
      description: data.description,
      image: file,
      fontSize: selectedFontSize,
    });
    reset(); // Очищаем форму после добавления записи
  };

  const handleEdit = (index: number) => {
    const record = records[index];
    editRecord(index, {
      ...record,
      title: prompt("Измените заголовок", record.title) || record.title,
      description:
        prompt("Измените описание", record.description) || record.description,
    });
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFontSize(e.target.value);
  };

  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative backdrop-blur-lg bg-white/30 p-10 sm:p-10 rounded-3xl shadow-lg max-w-lg sm:max-w-md mx-auto w-full">
          <h1 className="text-2xl font-semibold text-center mb-6 text-blue-900">
            Профиль
          </h1>

          {user && (
            <div className="mb-6">
              <p className="text-lg font-medium">
                Имя пользователя: {user.username}
              </p>
              <p className="text-lg font-medium">Email: {user.email}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Название записи
              </label>
              <input
                {...register("title", { required: true })}
                placeholder="Введите название записи"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Описание записи
              </label>
              <textarea
                {...register("description", { required: true })}
                placeholder="Введите описание записи"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Прикрепить изображение
              </label>
              <input
                type="file"
                {...register("image")}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Размер шрифта
              </label>
              <select
                value={selectedFontSize}
                onChange={handleFontSizeChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm text-gray-900"
              >
                <option value="text-sm">Маленький</option>
                <option value="text-xl">Средний</option>
                <option value="text-2xl">Большой</option>
                <option value="text-4xl">Очень большой</option>
              </select>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              >
                Добавить запись
              </button>
            </div>
          </form>

          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Мои записи:
            </h2>
            <ul className="space-y-4">
              {records.map((record, index) => (
                <li key={index} className="bg-white p-4 rounded-lg shadow">
                  <h3 className={`font-bold ${record.fontSize} text-gray-900`}>
                    {record.title}
                  </h3>
                  <p className={`text-gray-900 ${record.fontSize}`}>
                    {record.description}
                  </p>
                  {record.image && (
                    <Image
                      src={record.image}
                      alt="Загруженное изображение"
                      className="mt-2 max-w-full rounded-lg"
                      width={500}
                      height={300}
                    />
                  )}
                  <button
                    onClick={() => handleEdit(index)}
                    className="mt-2 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded-lg"
                  >
                    Редактировать
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
