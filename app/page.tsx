import { Container } from "@/components/shared";
import Link from "next/link";

export default function Home() {
  return (
    <Container className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 text-gray-800 px-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-3xl md:text-5xl font-bold text-indigo-900 mb-6 tracking-wide">
          Добро пожаловать на сервис
        </h1>
        {/* <p className="text-lg md:text-xl font-light text-gray-700 leading-relaxed mb-12">
          Используйте наш сервис для решения уравнений методами скалярного
          произведения, Рэлея и степенным методом.
        </p> */}
        <p className="text-lg md:text-xl font-mono  bg-gradient-to-b from-blue-50 to-indigo-100 text-gray-500 p-4 rounded-lg leading-relaxed mb-12 shadow-lg">
          Используйте наш сервис для освоения алгоритма интерполирования функции
          на основе использования нелокальных кубических сплайнов.
        </p>
        {/* <p className="text-lg md:text-xl font-mono bg-gray-900 text-green-400 p-4 rounded-lg leading-relaxed mb-12 shadow-lg">
          Используйте наш сервис для решения уравнений методами скалярного
          произведения, Рэлея и степенным методом.
        </p> */}
        <Link
          href="/equation/1"
          className="px-8 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-500 transition-transform transform hover:scale-105 active:scale-100 focus:outline-none focus:ring-4 focus:ring-indigo-300"
        >
          Перейти<span className="animate-none">!</span>
        </Link>
      </div>
    </Container>
  );
}
