export const GraphCard: React.FC<{ id: string; image: string }> = ({
  id,
  image,
}) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow flex flex-col justify-between">
      <a href={`/editor/${id}`}>
        <img
          className="rounded-t-lg"
          src={image ?? "https://flowbite.com/docs/images/blog/image-1.jpg"}
          alt=""
        />
      </a>
      <div className="p-5">
        <a href={`/editor/${id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Novo Grafo
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          4 vértices, 8 arestas
        </p>
        <a
          href={`/editor/${id}`}
          className="w-full flex flex-row justify-center items-center py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Abrir Grafo em Editor
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};
