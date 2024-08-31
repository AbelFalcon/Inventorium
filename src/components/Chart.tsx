"use client"

import { useEffect, useState } from "react"

export default function Chart() {
  const [data, setData] = useState({
    products: 1240,
    sales: 15300,
    productChange: 5,
    salesChange: -2,
  })

  useEffect(() => {
    // Simulación de una llamada a una API (puedes reemplazar esto con tu llamada real)
    // fetch('/api/data')
    //   .then(response => response.json())
    //   .then(data => {
    //     setData(data);
    //   });
  }, [])

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div className="p-6 bg-white shadow-md m-6 rounded-xl border border-gray-200 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              Total de Productos
            </h2>
            <p className="mt-2 text-4xl font-bold text-gray-900">
              {data.products}
            </p>
            <p
              className={`mt-2 flex items-center text-sm ${
                data.productChange > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {data.productChange > 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19.5v-15m7.5 7.5h-15"
                  />
                </svg>
              )}
              {Math.abs(data.productChange)}%{" "}
              {data.productChange > 0 ? "Subida" : "Bajada"}
            </p>
          </div>
          <div
            className={`text-${data.productChange > 0 ? "green" : "red"}-500`}
          >
            {data.productChange > 0 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-12 h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-12 h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 19.5v-15m7.5 7.5h-15"
                />
              </svg>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 bg-white shadow-md mr-6 rounded-xl border border-gray-200 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              Ventas Totales
            </h2>
            <p className="mt-2 text-4xl font-bold text-gray-900">
              ${data.sales}
            </p>
            <p
              className={`mt-2 flex items-center text-sm ${
                data.salesChange > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {data.salesChange > 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19.5v-15m7.5 7.5h-15"
                  />
                </svg>
              )}
              {Math.abs(data.salesChange)}%{" "}
              {data.salesChange > 0 ? "Subida" : "Bajada"}
            </p>
          </div>
          <div className={`text-${data.salesChange > 0 ? "green" : "red"}-500`}>
            {data.salesChange > 0 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-12 h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-12 h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 19.5v-15m7.5 7.5h-15"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
