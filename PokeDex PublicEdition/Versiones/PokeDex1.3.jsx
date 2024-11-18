import { useFetch } from "../Hooks/useFetch"
import { Loader } from './Loader';
import { useState, useCallback, useEffect } from "react";
import {usePokemonTypeColor} from '../Hooks/CSSHooks/useTypePokColor';
import { BackGroundeffect1 } from "../Hooks/CSSHooks/useBg1";
import 'animate.css';

export const PokeDex = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const maxPages = 10;
    const maxPagesVisible = 10;
    const [pokemon, setPokemon] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    
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
                        Altura: pokemonData.height, // Información adicional
                        Anchura: pokemonData.weight, // Información adicional
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

    const searchPokemon = async () => {
        if (searchTerm === '') {
            setSearchResult(null);
            fetchPokemon();
            return;
        }
        setIsLoading(true);
        setHasError(false);
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
            if (!response.ok) {
                throw new Error('Pokémon not found');
            }
            if(response.value === "") {
                setSearchResult(null);
            }
            const pokemonData = await response.json();
            const result = {
                name: pokemonData.name,
                id: pokemonData.id,
                Image: pokemonData.sprites.front_default,
                Image2: pokemonData.sprites.other['official-artwork'].front_default,
                elemento: pokemonData.types.map((typeInfo) => typeInfo.type.name)
            };
            setSearchResult(result);
        } catch (error) {
            setHasError(true);
            console.error('Error searching Pokémon:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPokemon();
    }, [fetchPokemon]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const canGoNext = pokemon.length === itemsPerPage;
    const totalPages = Math.ceil(1118 / itemsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= maxPages; i++) {
        pageNumbers.push(i);
    }
     const getPageRange = () => {
        const startPage = Math.max(1, currentPage - Math.floor(maxPagesVisible / 2));
        const endPage = Math.min(totalPages, startPage + maxPagesVisible - 1);
        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };
    return (
        <>
            <nav className="fixed left-0 w-full bg-gradient-to-r from-gray-950 to-red-900 p-3 z-10 top-0">
                    <div className="flex justify-between">
                        <div className="justify-normal">
                            <h2 className="text-white text-2xl font-bold">PokeDex 1.3</h2>
                        </div>
                        <div className="justify-end">
                            <input
                            type="text"
                            placeholder="Buscar Pokémon"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="p-2 rounded-lg mr-2"
                        />
                        <button onClick={searchPokemon} className="bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold p-2 rounded-lg">Buscar</button>
                        </div>
                    </div>
                </nav>
            <main className="h-screen bg- bg-gradient-to-t from-gray-200 to-white">
            {BackGroundeffect1()}
            {isLoading ? (
                <Loader />
            ) : hasError ? (
                <p>Error fetching Pokémon data.</p>
            ) : (
                <>
        
                {searchResult ? (
                <section className="flex justify-center p-4 pt-20 pb-16">
                    <div
                        key={searchResult.id}
                        onClick={() => setSelectedPokemon(searchResult)}
                        className={`bg-gradient-to-b from-white to-gray-300 rounded-lg shadow-lg p-4 
                        bg-opacity-75
                        animate__animated animate__zoomIn cursor-pointer max-w-4xl m-2 h-auto items-center flex flex-col`}
                        >
                        <img src={searchResult.Image} className="h-20 w-20 mx-auto" alt={searchResult.name} />
                            <p className="text-center text-lg font-bold">{searchResult.name}</p>
                            <div className="flex justify-between w-full">
                            <p className={`flex-1 ${usePokemonTypeColor(searchResult.elemento[0])} p-1 rounded-lg text-center m-1`}>{searchResult.elemento[0]}</p>
                            {searchResult.elemento[1] && (
                            <p className={`flex-1 ${usePokemonTypeColor(searchResult.elemento[1])} p-1 rounded-lg text-center m-1`}>{searchResult.elemento[1]}</p>
                            )}
                        </div>
                    </div>
                </section>
                ) : (
                <>
                <section className="grid grid-cols-3 py-16">
                     {pokemon.map(index => {
                        const colorClass = usePokemonTypeColor(index.elemento[0]);
                        const colorClass2 = usePokemonTypeColor(index.elemento[1]);
                        return (
                        <div
                        key={index.id}
                        onClick={() => setSelectedPokemon(index)}
                        className={`bg-gradient-to-bl from-red-200 to-red-400 bg-fixed bg-cover rounded-lg shadow-lg p-1
                        opacity-80 transition-opacity duration-300 hover:opacity-100
                        animate__animated animate__zoomIn cursor-pointer max-w-4xl m-3 h-auto items-center flex flex-col`}
                        >
                        {!index.Image ? 
                        <>
                            <div className="flex justify-between w-full mt-2">
                            <div className="flex-1 p-1 rounded-lg text-center m-1 h-4 bg-gray-200"></div>
                            <div className="flex-1 p-1 rounded-lg text-center m-1 h-4 bg-gray-200"></div>
                            </div>
                            </> : 
                        <>
                        <img src={index.Image} className="h-20 w-18 mx-auto animate__animated animate__flipInX animate__slow" alt={index.name} />
                        <p className="text-center text-lg font-bold">{index.name}</p>
                        <div className="flex justify-between w-full">
                        <p className={`flex-1 ${colorClass} p-1 rounded-lg text-center m-1`}>{index.elemento[0]}</p>
                        {index.elemento[1] && (
                        <p className={`flex-1 ${colorClass2} p-1 rounded-lg text-center m-1`}>{index.elemento[1]}</p>
                        )}
                        </div>                   
                        </> }
                        </div>
                    );
                    })}
                </section>
                <footer className="flex justify-center fixed bottom-2 left-1/2 transform -translate-x-1/2 z-10">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-800 m-1"
                >
                    Anterior
                </button>
                {getPageRange().map(page => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`${
                            page === currentPage ? 'bg-red-600 text-white' : 'bg-gray-200 text-black'
                        } font-bold py-2 px-4 rounded-full shadow-lg m-1`}
                    >
                        {page}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!canGoNext}
                    className="bg-gradient-to-l from-red-500 to-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-800 m-1"
                >
                    Siguiente
                </button>
            </footer>
            </>
                ) }
                    
                </>
            )}
            {selectedPokemon && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-20">
                <div className="bg-gradient-to-b from-white to-gray-300 bg-fixed bg-cover  p-6 rounded-lg shadow-lg relative max-w-sm w-full">
                    <h2 className="text-2xl font-bold mb-2">{selectedPokemon.name}</h2>
                    <img src={selectedPokemon.Image2} alt={selectedPokemon.name} className="mx-auto mb-4" />
                    <div className="grid grid-cols-2">
                    <p><strong>Height:</strong> {selectedPokemon.height} decimetres</p>
                    <p><strong>Weight:</strong> {selectedPokemon.weight} hectograms</p>
                    </div>
                    <p className={`${usePokemonTypeColor(selectedPokemon.elemento[0])}`}>{selectedPokemon.elemento[0]}</p>
                    {selectedPokemon.elemento[1] && <p><strong>Type 2:</strong> {selectedPokemon.elemento[1]}</p>}
                    
                    <button
                        onClick={() => setSelectedPokemon(null)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                        Cerrar
                    </button>
                    </div>
                    </div>
                    )}
        </main>
        </>
    );
};
