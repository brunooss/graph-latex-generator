import { useAuthState } from "react-firebase-hooks/auth";
import { BsPerson } from "react-icons/bs";
import { VscLoading } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase-config";
import { GraphCard } from "./components/GraphCard";
import { NewGraphCard } from "./components/NewGraphCard";
import { useList, useObject } from "react-firebase-hooks/database";
import { get, limitToFirst, query, ref } from "firebase/database";
import React from "react";

export const HomePage: React.FC = () => {
  const [authState, loadingAuthState, errorAuthState] = useAuthState(auth);

  const [query, loadingQuery, errorQuery] = useObject(
    ref(db, `users/${authState?.uid}/`)
  );

  const navigate = useNavigate();

  const [graps, setGraphs] = React.useState<
    {
      id: string;
      image: string;
      edgeList: {
        i: number;
        j: number;
      }[];
      nodeList: {
        idx: number;
        x: number;
        y: number;
      }[];
    }[]
  >([]);
  React.useEffect(() => {
    const x = async () => {
      if (!query) return;
      const graphsList = [];

      if (!query.val()?.graphs) return [];

      for (const graphId in query.val()?.graphs) {
        graphsList.push({ ...query.val().graphs[graphId], id: graphId } as {
          id: string;
          image: string;
          edgeList: { i: number; j: number }[];
          nodeList: { idx: number; x: number; y: number }[];
        });
      }
      setGraphs(graphsList);
    };

    x();
  }, [authState, query]);

  return (
    <div className="h-screen">
      <header className="absolute flex flex-wrap sm:justify-start sm:flex-nowrap z-[100] w-full bg-blue-600 text-sm py-3 sm:py-0">
        <nav
          className="relative max-w-[85rem] z-50 w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex items-center justify-between">
            <a
              className="flex-none text-xl font-semibold text-white"
              href="#"
              aria-label="Brand"
            >
              Editor de grafo
            </a>
            <div className="sm:hidden">
              <button
                type="button"
                className="hs-collapse-toggle size-9 flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-white/20 text-white hover:border-white/40 disabled:opacity-50 disabled:pointer-events-none"
                data-hs-collapse="#navbar-collapse-with-animation"
                aria-controls="navbar-collapse-with-animation"
                aria-label="Toggle navigation"
              >
                <svg
                  className="hs-collapse-open:hidden flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
                <svg
                  className="hs-collapse-open:block hidden flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div
            id="navbar-collapse-with-animation"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
          >
            <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:ps-7">
              <a
                className="font-medium text-white/80 hover:text-white sm:py-6"
                href="#"
              >
                Seus Grafos
              </a>
              <a
                className="font-medium text-white/80 hover:text-white sm:py-6"
                href="/editor"
              >
                Editor de Grafos
              </a>

              <a
                className="flex items-center gap-x-2 font-medium text-white/80 hover:text-white sm:border-s sm:border-white/30 sm:my-6 sm:ps-6"
                href="./login"
              >
                {loadingAuthState ? (
                  <div role="status">
                    <VscLoading className="animate-spin" />
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : authState ? (
                  <div className="flex items-center gap-4">
                    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                      <span className="font-medium text-gray-300">
                        {authState.displayName
                          ?.split(" ")
                          .map((s) => s.substring(0, 1))
                          .join("")
                          .substring(0, 2)
                          .toUpperCase()}
                      </span>
                    </div>

                    <div className="font-medium">
                      <div>
                        <p className="line-clamp-1">{authState.displayName}</p>
                      </div>
                      <div className="text-sm text-gray-300">
                        {authState.email}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <BsPerson /> Log In
                  </>
                )}
              </a>
            </div>
          </div>
        </nav>
      </header>
      <main id="content" className="">
        <div className="h-full w-full mx-auto">
          <div className="p-48">
            <div className="mb-16">
              <h1 className="text-3xl font-bold">
                Bem-vindo,{" "}
                {authState?.displayName?.substring(
                  0,
                  authState?.displayName.indexOf(" ")
                )}
              </h1>
              <h3 className="text-lg text-gray-400 font-medium">
                Qual grafo você quer gerar hoje?
              </h3>
            </div>
            {!loadingQuery && (
              <div className="grid md:grid-cols-1 lg:grid-cols-4 gap-4">
                {graps.map((graph) => (
                  <GraphCard id={graph.id} image={graph.image} />
                ))}
                <NewGraphCard />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
