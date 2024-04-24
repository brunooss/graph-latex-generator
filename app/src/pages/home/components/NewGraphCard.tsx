import { Plus } from "react-feather";
import { useNavigate } from "react-router-dom";

export const NewGraphCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="max-w-sm bg-white border border-gray-200 rounded-lg shadow flex flex-col justify-around cursor-pointer"
      onClick={() => navigate("../editor")}
    >
      <div className="h-64 w-full">
        <div className="w-full h-full flex flex-row justify-center items-center">
          <div className="rounded-full bg-gray-300 h-24 w-24 flex flex.row items-center justify-center">
            <Plus size={32} color="white" />
          </div>
        </div>
      </div>
      <div className="p-5 pt-0">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center">
            Crie um Novo Grafo
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center">
          Que tal criar algo novo? Crie um novo grafo de acordo com suas
          necessidades
        </p>
      </div>
    </div>
  );
};
