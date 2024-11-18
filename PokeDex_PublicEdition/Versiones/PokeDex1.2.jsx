
import { Loader } from '../Loader';
import { useState, useCallback, useEffect } from "react";
import {usePokemonTypeColor} from '../../Hooks/CSSHooks/useTypePokColor';

export const PokeDex = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const [pokemon, setPokemon] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    
    const offset = (currentPage - 1) * itemsPerPage;

    const fetchPokemon = useCallback(async () => {
        setIsLoading(true);
        setHasError(false);
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`);
            const data = await response.json();
            const detailedPokemon = await Promise.all(
                data.results.map(async (index) => {
                    const res = await fetch(index.url);
                    const pokemonData = await res.json();
                    return {
                        name: pokemonData.name,
                        id: pokemonData.id,
                        Image: pokemonData.sprites.front_default,
                        Image2: pokemonData.sprites.other['official-artwork'].front_default,
                        elemento: pokemonData.types.map((typeInfo) => (
                        typeInfo.type.name
                        ),)
                    };
                })
            );
            setPokemon(detailedPokemon);
        } catch (error) {
            setHasError(true);
            console.error('Error fetching Pokémon:', error);
        } finally {
            setIsLoading(false);
        }
    }, [offset, itemsPerPage]);

    useEffect(() => {
        fetchPokemon();
    }, [fetchPokemon]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const canGoNext = pokemon.length === itemsPerPage;

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : hasError ? (
                <p>Error fetching Pokémon data.</p>
            ) : (
                <>
                <main className="align-baseline bg-gradient-to-b from-gray-400 to-gray-500 p-3 z-10">
                    <nav className="fixed left-0 w-full bg-gradient-to-r from-gray-950 to-red-900 p-3 z-10 top-0">
                        <div className="flex justify-between">
                            <h2 className="text-white text-2xl font-bold">PokeDex 1.2</h2>
                            <div className="text-white">Buscar</div>
                        </div>
                    </nav>
                    <section className="grid md:grid-cols-4 flex-1 p-4 pt-20 pb-16">
                     {pokemon.map(index => {
                            const colorClass = usePokemonTypeColor(index.elemento[0]);
                            const colorClass2 = usePokemonTypeColor(index.elemento[1]);
                            return (
                            <div
                                key={index.id}
                                onClick={() => setSelectedPokemon(index)}
                                className={`bg-gradient-to-b from-white to-gray-300 rounded-lg shadow-lg p-4 
                                    cursor-pointer max-w-4xl m-2 h-auto items-center flex flex-col`}
                            > 
                                <img src={index.Image} className="h-16 w-20 mx-auto" alt={index.name} />
                                <p className="text-center text-lg font-bold">{index.name}</p>
                                <div className="flex justify-between w-full">
                                    <p className={`flex-1 ${colorClass} p-1 rounded-lg text-center m-1`}>{index.elemento[0]}</p>
                                    {index.elemento[1] && (
                                        <p className={`flex-1 ${colorClass2} p-1 rounded-lg text-center m-1`}>{index.elemento[1]}</p>
                                    )}
                                </div>                   
                                

                            </div>
                            );
                        })}
                    </section>
                    <footer className="flex justify-center fixed bottom-2 left-1/2 transform -translate-x-1/2 z-10">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1} 
                            className="bg-gradient-to-r from-red-400 to-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-800 m-1">
                            Anterior
                        </button>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={!canGoNext}
                            className="bg-gradient-to-l from-red-400 to-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-800 m-1">
                            Siguiente
                        </button>
                    </footer>
                </main>
                </>
            )}
        </>
    );
};
